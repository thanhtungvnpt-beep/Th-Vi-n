import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Lock,
  Plus,
  UploadCloud,
  FileText,
  Lightbulb,
  Wrench,
  Clock,
  Paperclip,
  Award,
  X,
} from 'lucide-react';
import {
  BookWeeklyPage,
  FiveWhySolution,
  KaizenContributionEntry,
  MachineBook,
  OemCabinetInfo,
  TechnicalAttachmentItem,
  UserRole,
  WeeklyIncidentEntry,
} from '../../types';
import { DESIGNATED_TECHNICIANS, OEM_CABINETS } from '../../data/libraryData';
import { WeeklyIndexModal } from './WeeklyIndexModal';

interface MachineLogbookReaderProps {
  book: MachineBook;
  cabinets?: OemCabinetInfo[];
  pages: BookWeeklyPage[];
  activeWeek: number;
  currentRole: UserRole;
  onSelectWeek: (weekNumber: number) => void;
  onBackToShelf: () => void;
  onCreateWeeklyIncident: (
    bookId: string,
    weekNumber: number,
    incident: WeeklyIncidentEntry
  ) => void;
  onSubmitFiveWhySolution: (
    bookId: string,
    weekNumber: number,
    incidentId: string,
    solution: FiveWhySolution
  ) => void;
  onSignOffWeekPage: (bookId: string, weekNumber: number, adminName: string) => void;
  onCreateKaizen: (
    bookId: string,
    weekNumber: number,
    kaizen: KaizenContributionEntry
  ) => void;
}

const ALLOWED_EXTENSIONS = ['.DWG', '.STEP', '.STL', '.PDF', '.JPG', '.JPEG', '.PNG', '.XLSX'];
const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50MB

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export const MachineLogbookReader: React.FC<MachineLogbookReaderProps> = ({
  book,
  cabinets = OEM_CABINETS,
  pages,
  activeWeek,
  currentRole,
  onSelectWeek,
  onBackToShelf,
  onCreateWeeklyIncident,
  onSubmitFiveWhySolution,
  onSignOffWeekPage,
  onCreateKaizen,
}) => {
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [readerTab, setReaderTab] = useState<'incidents_5why' | 'kaizen'>('incidents_5why');

  // Flow 1: Admin Create Incident state
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incPriority, setIncPriority] = useState<WeeklyIncidentEntry['priority']>('HIGH');
  const [incErrorCode, setIncErrorCode] = useState('');
  const [incTitle, setIncTitle] = useState('');
  const [incDescription, setIncDescription] = useState('');
  const [incDeadline, setIncDeadline] = useState('22/11/2026 17:00');
  const [incTechId, setIncTechId] = useState(DESIGNATED_TECHNICIANS[0].id);
  const [incAttachments, setIncAttachments] = useState<TechnicalAttachmentItem[]>([]);
  const [incFeedback, setIncFeedback] = useState<string | null>(null);

  // Flow 2: 5-Why Solution editing state
  const [editingIncidentId, setEditingIncidentId] = useState<string | null>(null);
  const [why1, setWhy1] = useState('');
  const [why2, setWhy2] = useState('');
  const [why3, setWhy3] = useState('');
  const [why4, setWhy4] = useState('');
  const [why5RootCause, setWhy5RootCause] = useState('');
  const [immediateCountermeasure, setImmediateCountermeasure] = useState('');
  const [permanentCountermeasure, setPermanentCountermeasure] = useState('');
  const [sparePartsNotes, setSparePartsNotes] = useState('');
  const [torqueOrTestSpec, setTorqueOrTestSpec] = useState('');
  const [solAttachments, setSolAttachments] = useState<TechnicalAttachmentItem[]>([]);
  const [solError, setSolError] = useState('');

  // Flow 3: Open Kaizen + Dropzone state
  const [kzAuthorName, setKzAuthorName] = useState('Trần Văn Bình');
  const [kzCategory, setKzCategory] = useState('Đồ gá & Thời gian chuẩn bị (SMED)');
  const [kzTitle, setKzTitle] = useState('');
  const [kzDescription, setKzDescription] = useState('');
  const [kzRoi, setKzRoi] = useState('');
  const [kzAttachments, setKzAttachments] = useState<TechnicalAttachmentItem[]>([]);
  const [kzError, setKzError] = useState('');
  const [kzSuccess, setKzSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropzoneInputRef = useRef<HTMLInputElement | null>(null);

  const currentPage =
    pages.find((p) => p.weekNumber === activeWeek) || pages[Math.max(0, activeWeek - 1)];
  const cabinet = cabinets.find((c) => c.id === book.vendorId);

  const canAdminActions =
    currentRole === 'admin' ||
    currentRole === 'knowledge_manager' ||
    currentRole === 'technical_expert' ||
    currentRole === 'content_approver';
  const currentActorName =
    currentRole === 'admin' || currentRole === 'knowledge_manager'
      ? 'Nguyễn Quốc Hưng (Admin / Quản đốc)'
      : currentRole === 'technical_expert' || currentRole === 'content_approver'
      ? 'Lê Hoàng Minh (Chuyên gia Kỹ thuật)'
      : currentRole === 'technician'
      ? 'Trần Văn Bình (Kỹ thuật viên)'
      : 'Khách tham quan';

  const handleUploadAttachments = (
    files: FileList | null,
    refType: TechnicalAttachmentItem['referenceType'],
    setter: React.Dispatch<React.SetStateAction<TechnicalAttachmentItem[]>>,
    onError?: (msg: string) => void
  ) => {
    if (!files || files.length === 0) return;
    const validItems: TechnicalAttachmentItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const dotIdx = f.name.lastIndexOf('.');
      const ext = dotIdx >= 0 ? f.name.slice(dotIdx).toUpperCase() : '';
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        onError?.(
          `Định dạng ${ext || f.name} chưa hỗ trợ. Chỉ nhận: .DWG, .STEP, .STL, .PDF, .JPG/PNG, .XLSX.`
        );
        continue;
      }
      if (f.size > MAX_FILE_BYTES) {
        onError?.(`Tệp ${f.name} vượt quá giới hạn 50MB/tệp.`);
        continue;
      }
      const isImage = ['.JPG', '.JPEG', '.PNG'].includes(ext);
      validItems.push({
        id: `att-${Date.now()}-${i}`,
        fileName: f.name,
        fileExtension: ext,
        fileSizeLabel: formatFileSize(f.size),
        referenceType: refType,
        uploadedBy: currentActorName,
        uploadedAt: 'Vừa tải lên',
        previewUrl: isImage ? URL.createObjectURL(f) : undefined,
      });
    }
    if (validItems.length > 0) {
      onError?.('');
      setter((prev) => [...prev, ...validItems]);
    }
  };

  const handleSubmitIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incTitle.trim() || !incErrorCode.trim()) return;

    const tech =
      DESIGNATED_TECHNICIANS.find((t) => t.id === incTechId) || DESIGNATED_TECHNICIANS[0];
    const seq = 50 + currentPage.incidents.length + activeWeek;
    const autoId = `#W${String(activeWeek).padStart(2, '0')}-${String(seq).padStart(3, '0')}`;

    const priorityLabel: WeeklyIncidentEntry['priorityLabel'] =
      incPriority === 'HIGH'
        ? 'Khẩn cấp (Line Stop)'
        : incPriority === 'MEDIUM'
        ? 'Cảnh báo sớm'
        : 'Định kỳ';

    const newInc: WeeklyIncidentEntry = {
      id: autoId,
      weekNumber: activeWeek,
      priority: incPriority,
      priorityLabel,
      errorCode: incErrorCode.trim().toUpperCase(),
      title: incTitle.trim(),
      technicalDescription:
        incDescription.trim() || 'Cần KTV chỉ định kiểm tra thông số tại hiện trường.',
      assignedTechnicianId: tech.id,
      assignedTechnicianName: tech.name,
      deadline: incDeadline.trim() || 'Trong tuần',
      status: 'ASSIGNED',
      createdByAdmin: currentActorName,
      createdAt: 'Vừa phát lệnh',
      attachments: incAttachments,
    };

    onCreateWeeklyIncident(book.id, activeWeek, newInc);
    setIncFeedback(
      `Đã phát lệnh sự cố ${autoId} và chỉ định KTV ${tech.name}. Quyền phản hồi 5-Why đã khóa cho KTV chỉ định.`
    );
    setIncErrorCode('');
    setIncTitle('');
    setIncDescription('');
    setIncAttachments([]);
    setShowIncidentForm(false);
  };

  const openFiveWhyEditor = (inc: WeeklyIncidentEntry) => {
    setEditingIncidentId(inc.id);
    setSolError('');
    setWhy1(inc.solution?.why1 || '');
    setWhy2(inc.solution?.why2 || '');
    setWhy3(inc.solution?.why3 || '');
    setWhy4(inc.solution?.why4 || '');
    setWhy5RootCause(inc.solution?.why5RootCause || '');
    setImmediateCountermeasure(inc.solution?.immediateCountermeasure || '');
    setPermanentCountermeasure(inc.solution?.permanentCountermeasure || '');
    setSparePartsNotes(inc.solution?.sparePartsNotes || '');
    setTorqueOrTestSpec(inc.solution?.torqueOrTestSpec || '');
    setSolAttachments(inc.solution?.attachments || []);
  };

  const handleSaveFiveWhy = (e: React.FormEvent, inc: WeeklyIncidentEntry) => {
    e.preventDefault();
    if (!why5RootCause.trim() || !permanentCountermeasure.trim()) {
      setSolError('Bắt buộc nhập Why 5 (Nguyên nhân gốc rễ) và Đối sách triệt để.');
      return;
    }

    const sol: FiveWhySolution = {
      id: inc.solution?.id || `sol-${Date.now()}`,
      incidentId: inc.id,
      why1: why1.trim() || 'Hiện tượng ghi nhận trực tiếp tại thiết bị.',
      why2: why2.trim() || 'Sai lệch thông số vận hành vượt ngưỡng chuẩn OEM.',
      why3: why3.trim() || 'Linh kiện hoặc bộ lọc bị suy giảm hiệu năng.',
      why4: why4.trim() || 'Chưa có bước kiểm tra phòng ngừa theo chu kỳ tải.',
      why5RootCause: why5RootCause.trim(),
      immediateCountermeasure:
        immediateCountermeasure.trim() || 'Khắc phục tạm thời đưa máy trở lại vận hành an toàn.',
      permanentCountermeasure: permanentCountermeasure.trim(),
      sparePartsNotes: sparePartsNotes.trim() || undefined,
      torqueOrTestSpec: torqueOrTestSpec.trim() || undefined,
      submittedBy: inc.assignedTechnicianName,
      submittedAt: 'Vừa cập nhật',
      attachments: solAttachments,
    };

    onSubmitFiveWhySolution(book.id, activeWeek, inc.id, sol);
    setEditingIncidentId(null);
  };

  const handleSubmitKaizen = (e: React.FormEvent) => {
    e.preventDefault();
    setKzError('');
    setKzSuccess(null);

    if (!kzTitle.trim() || !kzDescription.trim()) {
      setKzError('Vui lòng nhập Tiêu đề và Mô tả giải pháp cải tiến Kaizen.');
      return;
    }

    const hasCadOr3d = kzAttachments.some((a) =>
      ['.DWG', '.STEP', '.STL'].includes(a.fileExtension)
    );
    const pointsAwarded = hasCadOr3d ? 50 : kzAttachments.length > 0 ? 35 : 20;

    const entry: KaizenContributionEntry = {
      id: `kz-${Date.now()}`,
      weekNumber: activeWeek,
      authorName: kzAuthorName.trim() || currentActorName,
      authorRole: 'Kỹ thuật viên Hiện trường',
      category: kzCategory,
      title: kzTitle.trim(),
      description: kzDescription.trim(),
      roiSummary: kzRoi.trim() || 'Chuẩn hóa thao tác & tăng độ ổn định thiết bị',
      pointsAwarded,
      isApproved: true,
      createdAt: 'Vừa đóng góp',
      attachments: kzAttachments,
    };

    onCreateKaizen(book.id, activeWeek, entry);
    setKzSuccess(
      `Đã ghi nhận sáng kiến Kaizen vào trang Tuần W${String(activeWeek).padStart(2, '0')} (+${pointsAwarded} điểm thi đua).`
    );
    setKzTitle('');
    setKzDescription('');
    setKzRoi('');
    setKzAttachments([]);
  };

  return (
    <div className="space-y-3.5">
      {/* Top Logbook Spine Reader Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToShelf}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại Kệ sách</span>
            </button>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#091738] text-white font-mono text-[11px] font-bold">
                  {book.assetCode}
                </span>
                <span className="font-mono text-[11px] text-blue-700 font-semibold">
                  Tủ {cabinet?.shortName || book.vendorName} &gt; Kệ 0{book.cabinetShelfNo} &gt; Vị
                  trí #0{book.positionIndex}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 truncate">
                {book.machineName}
              </h2>
            </div>
          </div>

          {/* Week Switcher & 52-Week Index Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
              <button
                type="button"
                disabled={activeWeek <= 1}
                onClick={() => onSelectWeek(Math.max(1, activeWeek - 1))}
                className="p-1.5 rounded-lg hover:bg-white disabled:opacity-40 text-slate-700 cursor-pointer"
                title="Tuần trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 font-mono text-xs font-bold text-slate-900 tabular-nums">
                Trang Tuần W{String(activeWeek).padStart(2, '0')} / 52
              </span>
              <button
                type="button"
                disabled={activeWeek >= 52}
                onClick={() => onSelectWeek(Math.min(52, activeWeek + 1))}
                className="p-1.5 rounded-lg hover:bg-white disabled:opacity-40 text-slate-700 cursor-pointer"
                title="Tuần sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsIndexOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#091738] hover:bg-[#112554] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <CalendarDays className="w-3.5 h-3.5 text-amber-300" />
              <span>Mục lục 52 tuần</span>
            </button>
          </div>
        </div>

        {/* Weekly Page Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono font-semibold tabular-nums">
              OEE Tuần: {currentPage.oeeRate > 0 ? `${currentPage.oeeRate}%` : 'Kế hoạch'}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono font-semibold tabular-nums">
              Hoàn thiện sổ tay: {book.completionRate.toFixed(1)}%
            </span>
            {currentPage.isSignedOff ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  Đã đóng dấu ISO 100% ({currentPage.signedOffBy} • {currentPage.signedOffAt})
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Trang tuần đang mở xử lý ({currentPage.incidents.length} sự cố)</span>
              </span>
            )}
          </div>

          {!currentPage.isSignedOff && (
            <button
              type="button"
              onClick={() => onSignOffWeekPage(book.id, activeWeek, currentActorName)}
              disabled={!canAdminActions}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              title={
                canAdminActions
                  ? 'Xác nhận nghiệm thu hoàn tất trang tuần theo chuẩn ISO'
                  : 'Chỉ Admin hoặc Chuyên gia kỹ thuật mới có quyền Sign-off'
              }
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đóng dấu nghiệm thu trang tuần (Sign-off ISO 100%)</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-navigation between Flow 1+2 and Flow 3 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => setReaderTab('incidents_5why')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              readerTab === 'incidents_5why'
                ? 'bg-[#1864f3] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>
              Luồng 1 &amp; 2: Sự cố &amp; 5-Why ({currentPage.incidents.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setReaderTab('kaizen')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              readerTab === 'kaizen'
                ? 'bg-[#1864f3] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>
              Luồng 3: Sáng kiến Kaizen Cộng đồng ({currentPage.kaizens.length})
            </span>
          </button>
        </div>

        {readerTab === 'incidents_5why' && (
          <button
            type="button"
            onClick={() => setShowIncidentForm((prev) => !prev)}
            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Đăng sự cố tuần &amp; Chỉ định KTV</span>
          </button>
        )}
      </div>

      {incFeedback && (
        <div className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between gap-2">
          <span>{incFeedback}</span>
          <button
            type="button"
            onClick={() => setIncFeedback(null)}
            className="text-emerald-700 hover:text-emerald-950 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* FLOW 1 & 2 TAB */}
      {readerTab === 'incidents_5why' && (
        <div className="space-y-3.5">
          {/* Flow 1: Admin Form */}
          {showIncidentForm && (
            <form
              onSubmit={handleSubmitIncident}
              className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-red-200 shadow-sm space-y-3.5 text-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <h3 className="font-bold text-sm text-slate-900">
                    Luồng 1 (Admin): Đăng Sự Cố Tuần W{String(activeWeek).padStart(2, '0')} &amp;
                    Chỉ Định Đích Danh KTV
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIncidentForm(false)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Mức độ ưu tiên</label>
                  <select
                    value={incPriority}
                    onChange={(e) =>
                      setIncPriority(e.target.value as WeeklyIncidentEntry['priority'])
                    }
                    className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                  >
                    <option value="HIGH">Khẩn cấp (Line Stop)</option>
                    <option value="MEDIUM">Cảnh báo sớm</option>
                    <option value="LOW">Định kỳ</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Mã lỗi OEM *</label>
                  <input
                    type="text"
                    value={incErrorCode}
                    onChange={(e) => setIncErrorCode(e.target.value)}
                    placeholder="VD: AL-310, SV-041..."
                    className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono uppercase outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">
                    Thời hạn hoàn thành (Deadline)
                  </label>
                  <input
                    type="text"
                    value={incDeadline}
                    onChange={(e) => setIncDeadline(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">
                    Tên cảnh báo &amp; Tiêu đề sự cố *
                  </label>
                  <input
                    type="text"
                    value={incTitle}
                    onChange={(e) => setIncTitle(e.target.value)}
                    placeholder="VD: Rung động trục chính bất thường ở > 12,000 RPM"
                    className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">
                    Chỉ định đích danh KTV xử lý (Khóa quyền 5-Why)
                  </label>
                  <select
                    value={incTechId}
                    onChange={(e) => setIncTechId(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 font-semibold outline-none"
                  >
                    {DESIGNATED_TECHNICIANS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} — {t.team} ({t.plant})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">
                  Hiện tượng kỹ thuật chi tiết (RPM, áp suất bar, hành vi dừng E-Stop)
                </label>
                <textarea
                  rows={2}
                  value={incDescription}
                  onChange={(e) => setIncDescription(e.target.value)}
                  placeholder="Mô tả thông số cảm biến, tần số rung hoặc điều kiện kích hoạt báo lỗi..."
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Đính kèm ảnh HMI / Telemetry ({incAttachments.length})</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      handleUploadAttachments(e.target.files, 'INCIDENT', setIncAttachments)
                    }
                  />
                </label>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer shadow-xs"
                >
                  Đăng Bài &amp; Phát Lệnh Chỉ Định KTV
                </button>
              </div>
            </form>
          )}

          {/* Incidents & 5-Why Cards */}
          {currentPage.incidents.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900">
                Tuần W{String(activeWeek).padStart(2, '0')} chưa ghi nhận sự cố dừng máy
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Admin có thể phát lệnh sự cố mới bất kỳ lúc nào, hoặc KTV có thể chuyển sang tab
                Kaizen Cộng đồng để đóng góp cải tiến tuần này.
              </p>
            </div>
          ) : (
            currentPage.incidents.map((inc) => {
              const isEditingThis = editingIncidentId === inc.id;

              return (
                <div
                  key={inc.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
                >
                  {/* Incident Header */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[11px] font-bold">
                          {inc.id}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            inc.priority === 'HIGH'
                              ? 'bg-red-100 text-red-700'
                              : inc.priority === 'MEDIUM'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {inc.priorityLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px] font-bold border border-blue-200">
                          OEM CODE: {inc.errorCode}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold">
                          <Lock className="w-3 h-3 text-blue-600" />
                          <span>KTV chỉ định: {inc.assignedTechnicianName}</span>
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                          Hạn: {inc.deadline}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900">{inc.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {inc.technicalDescription}
                    </p>

                    {inc.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {inc.attachments.map((att) => (
                          <div
                            key={att.id}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px]"
                          >
                            {att.previewUrl ? (
                              <img
                                src={att.previewUrl}
                                alt={att.fileName}
                                className="w-8 h-8 rounded object-cover border border-slate-200"
                              />
                            ) : (
                              <FileText className="w-4 h-4 text-blue-600" />
                            )}
                            <div>
                              <div className="font-mono font-semibold text-slate-800">
                                {att.fileName}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {att.fileExtension} • {att.fileSizeLabel}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Flow 2: 5-Why Solution Area */}
                  <div className="p-4 sm:p-5 bg-slate-50/70">
                    {isEditingThis ? (
                      <form
                        onSubmit={(e) => handleSaveFiveWhy(e, inc)}
                        className="space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                            <UserCheck className="w-4 h-4 text-blue-600" />
                            <span>
                              Luồng 2: Phân tích 5-Why &amp; Đối sách ({inc.assignedTechnicianName})
                            </span>
                          </h5>
                          <button
                            type="button"
                            onClick={() => setEditingIncidentId(null)}
                            className="text-slate-500 hover:text-slate-800 cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>

                        {solError && (
                          <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                            {solError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          <input
                            type="text"
                            value={why1}
                            onChange={(e) => setWhy1(e.target.value)}
                            placeholder="Why 1: Biểu hiện trực tiếp..."
                            className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none"
                          />
                          <input
                            type="text"
                            value={why2}
                            onChange={(e) => setWhy2(e.target.value)}
                            placeholder="Why 2: Nguyên nhân trung gian..."
                            className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none"
                          />
                          <input
                            type="text"
                            value={why3}
                            onChange={(e) => setWhy3(e.target.value)}
                            placeholder="Why 3: Yếu tố kỹ thuật tác động..."
                            className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none"
                          />
                          <input
                            type="text"
                            value={why4}
                            onChange={(e) => setWhy4(e.target.value)}
                            placeholder="Why 4: Điểm kiểm soát bị thiếu..."
                            className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={why5RootCause}
                          onChange={(e) => setWhy5RootCause(e.target.value)}
                          placeholder="Why 5 — Nguyên nhân gốc rễ (Root Cause) *"
                          className="w-full p-2.5 rounded-lg bg-white border border-blue-300 text-slate-900 outline-none"
                          required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          <textarea
                            rows={2}
                            value={immediateCountermeasure}
                            onChange={(e) => setImmediateCountermeasure(e.target.value)}
                            placeholder="Đối sách tạm thời khôi phục máy..."
                            className="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none"
                          />
                          <textarea
                            rows={2}
                            value={permanentCountermeasure}
                            onChange={(e) => setPermanentCountermeasure(e.target.value)}
                            placeholder="Đối sách triệt để phòng ngừa tái diễn *"
                            className="w-full p-2.5 rounded-lg bg-white border border-emerald-300 text-slate-900 outline-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          <input
                            type="text"
                            value={sparePartsNotes}
                            onChange={(e) => setSparePartsNotes(e.target.value)}
                            placeholder="Linh kiện thay thế (Mã OEM, số lượng)..."
                            className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none"
                          />
                          <input
                            type="text"
                            value={torqueOrTestSpec}
                            onChange={(e) => setTorqueOrTestSpec(e.target.value)}
                            placeholder="Thông số xiết lực / Kết quả chạy thử..."
                            className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none"
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium cursor-pointer">
                            <Paperclip className="w-3.5 h-3.5" />
                            <span>Ảnh linh kiện / Test chạy thử ({solAttachments.length})</span>
                            <input
                              type="file"
                              multiple
                              className="hidden"
                              onChange={(e) =>
                                handleUploadAttachments(
                                  e.target.files,
                                  'SOLUTION',
                                  setSolAttachments,
                                  setSolError
                                )
                              }
                            />
                          </label>

                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-[#1864f3] hover:bg-[#1456d8] text-white font-semibold cursor-pointer"
                          >
                            Nộp Báo Cáo 5-Why &amp; Đối Sách
                          </button>
                        </div>
                      </form>
                    ) : inc.solution ? (
                      <div className="space-y-3 text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                              ĐÃ NỘP 5-WHY
                            </span>
                            <span className="font-semibold text-slate-800">
                              Thực hiện: {inc.solution.submittedBy} • {inc.solution.submittedAt}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => openFiveWhyEditor(inc)}
                            className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
                          >
                            Cập nhật 5-Why
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                          {[
                            { label: 'Why 1', val: inc.solution.why1 },
                            { label: 'Why 2', val: inc.solution.why2 },
                            { label: 'Why 3', val: inc.solution.why3 },
                            { label: 'Why 4', val: inc.solution.why4 },
                            { label: 'Why 5 (Gốc rễ)', val: inc.solution.why5RootCause, highlight: true },
                          ].map((w) => (
                            <div
                              key={w.label}
                              className={`p-2.5 rounded-xl border ${
                                w.highlight
                                  ? 'bg-blue-50 border-blue-200 text-blue-950'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="font-mono text-[10px] font-bold uppercase text-blue-700 mb-1">
                                {w.label}
                              </div>
                              <p className="leading-snug">{w.val}</p>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          <div className="p-3 rounded-xl bg-white border border-slate-200">
                            <div className="font-bold text-slate-800 mb-1">Đối sách tạm thời:</div>
                            <p className="text-slate-600">{inc.solution.immediateCountermeasure}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
                            <div className="font-bold text-emerald-900 mb-1">
                              Đối sách triệt để phòng ngừa tái diễn:
                            </div>
                            <p className="text-emerald-950">{inc.solution.permanentCountermeasure}</p>
                          </div>
                        </div>

                        {(inc.solution.sparePartsNotes || inc.solution.torqueOrTestSpec) && (
                          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                            {inc.solution.sparePartsNotes && (
                              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
                                Vật tư: {inc.solution.sparePartsNotes}
                              </span>
                            )}
                            {inc.solution.torqueOrTestSpec && (
                              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
                                Thông số Test: {inc.solution.torqueOrTestSpec}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-slate-600">
                          Chưa có báo cáo 5-Why từ KTV chỉ định (
                          <strong className="text-slate-900">{inc.assignedTechnicianName}</strong>).
                        </div>
                        <button
                          type="button"
                          onClick={() => openFiveWhyEditor(inc)}
                          className="px-4 py-2 rounded-xl bg-[#1864f3] hover:bg-[#1456d8] text-white text-xs font-semibold cursor-pointer"
                        >
                          Nộp Phân Tích 5-Why &amp; Đối Sách
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* FLOW 3 TAB: OPEN KAIZEN & INDUSTRIAL DROPZONE */}
      {readerTab === 'kaizen' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
          {/* Left: Existing Kaizen Contributions */}
          <div className="xl:col-span-7 space-y-3">
            {currentPage.kaizens.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-xs text-slate-500">
                Tuần W{String(activeWeek).padStart(2, '0')} chưa có sáng kiến Kaizen nào. Hãy là
                người đầu tiên đóng góp giải pháp tối ưu cho {book.assetCode}.
              </div>
            ) : (
              currentPage.kaizens.map((kz) => (
                <div
                  key={kz.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2.5 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                        {kz.category}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">{kz.createdAt}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold tabular-nums">
                      <Award className="w-3.5 h-3.5" />+{kz.pointsAwarded} PTS
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{kz.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{kz.description}</p>

                  <div className="px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-medium">
                    Hiệu quả ROI: {kz.roiSummary}
                  </div>

                  {kz.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {kz.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200"
                        >
                          {att.previewUrl ? (
                            <img
                              src={att.previewUrl}
                              alt={att.fileName}
                              className="w-7 h-7 rounded object-cover"
                            />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-600" />
                          )}
                          <span className="font-mono font-semibold text-slate-800">
                            {att.fileName}
                          </span>
                          <span className="text-[10px] text-slate-500">{att.fileSizeLabel}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    Tác giả: <strong className="text-slate-800">{kz.authorName}</strong> (
                    {kz.authorRole})
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Open Kaizen Submission + Industrial Dropzone */}
          <form
            onSubmit={handleSubmitKaizen}
            className="xl:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">
                  Đóng Góp Sáng Kiến Kaizen (Tự Do)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                +15 → +50 PTS
              </span>
            </div>

            {kzError && (
              <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                {kzError}
              </div>
            )}
            {kzSuccess && (
              <div className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                {kzSuccess}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Kỹ thuật viên đóng góp</label>
                <input
                  type="text"
                  value={kzAuthorName}
                  onChange={(e) => setKzAuthorName(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Nhóm cải tiến</label>
                <select
                  value={kzCategory}
                  onChange={(e) => setKzCategory(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                >
                  <option>Đồ gá &amp; Thời gian chuẩn bị (SMED)</option>
                  <option>Chiller &amp; Làm mát trục chính</option>
                  <option>Tối ưu lập trình NC / G-code</option>
                  <option>Thủy lực &amp; Khí nén</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Tiêu đề sáng kiến *</label>
              <input
                type="text"
                value={kzTitle}
                onChange={(e) => setKzTitle(e.target.value)}
                placeholder="VD: Thiết kế cữ chặn phôi nhanh giảm 4 phút rà chuẩn..."
                className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">
                Chi tiết kỹ thuật &amp; cách áp dụng *
              </label>
              <textarea
                rows={3}
                value={kzDescription}
                onChange={(e) => setKzDescription(e.target.value)}
                placeholder="Mô tả thay đổi cơ khí, thông số dao cắt hoặc cách lắp đặt..."
                className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">
                Hiệu quả dự kiến (OEE / Thời gian / Chi phí)
              </label>
              <input
                type="text"
                value={kzRoi}
                onChange={(e) => setKzRoi(e.target.value)}
                placeholder="VD: Giảm 35% thời gian gá phôi · Tăng +3.8% OEE"
                className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none"
              />
            </div>

            {/* Industrial Dropzone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleUploadAttachments(
                  e.dataTransfer.files,
                  'KAIZEN',
                  setKzAttachments,
                  setKzError
                );
              }}
              onClick={() => dropzoneInputRef.current?.click()}
              className={`rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80'
              }`}
            >
              <input
                ref={dropzoneInputRef}
                type="file"
                multiple
                accept=".dwg,.step,.stl,.pdf,.jpg,.jpeg,.png,.xlsx"
                className="hidden"
                onChange={(e) =>
                  handleUploadAttachments(e.target.files, 'KAIZEN', setKzAttachments, setKzError)
                }
              />
              <UploadCloud className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
              <div className="font-bold text-slate-800">
                Kéo thả hoặc chọn hồ sơ kỹ thuật (Industrial Dropzone)
              </div>
              <div className="font-mono text-[10px] text-slate-500 mt-1">
                Hỗ trợ: .DWG, .STEP, .STL, .PDF, .JPG/PNG, .XLSX (Tối đa 50MB/tệp)
              </div>
            </div>

            {kzAttachments.length > 0 && (
              <div className="space-y-1.5">
                {kzAttachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200"
                  >
                    <span className="font-mono font-semibold text-blue-900 truncate">
                      {att.fileName} ({att.fileSizeLabel})
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setKzAttachments((prev) => prev.filter((item) => item.id !== att.id))
                      }
                      className="text-blue-700 hover:text-red-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#1864f3] hover:bg-[#1456d8] text-white font-semibold cursor-pointer shadow-xs"
            >
              Gửi Sáng Kiến Kaizen &amp; Nhận Điểm Thi Đua
            </button>
          </form>
        </div>
      )}

      {/* Flow 4 Modal */}
      <WeeklyIndexModal
        isOpen={isIndexOpen}
        book={book}
        pages={pages}
        activeWeek={activeWeek}
        onSelectWeek={onSelectWeek}
        onClose={() => setIsIndexOpen(false)}
      />
    </div>
  );
};
