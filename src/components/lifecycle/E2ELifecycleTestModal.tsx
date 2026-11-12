import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  FileCheck2,
  Workflow,
  ArrowRight,
  Database,
  Lock,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { LifecycleCase } from '../../types';

interface E2ELifecycleTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInjectTestedCase?: (newCase: LifecycleCase) => void;
}

interface TestStep {
  id: number;
  stageName: string;
  actionTitle: string;
  actor: string;
  description: string;
  expectedOutcome: string;
  actualResult: string;
  executionTimeMs: number;
  status: 'pending' | 'running' | 'passed' | 'failed';
  detailsPayload?: Record<string, any>;
}

const INITIAL_TEST_STEPS: TestStep[] = [
  {
    id: 1,
    stageName: 'Stage 01: Incident Capture',
    actionTitle: 'Kỹ thuật viên ghi nhận sự cố máy CNC-04 báo lỗi E210',
    actor: 'Nguyễn Văn Minh (Kỹ thuật viên ca máy)',
    description: 'Khởi tạo hồ sơ sự cố mới với mã lỗi E210 (Spindle quá nhiệt 72.4°C), đính kèm thông số telemetry cảm biến lưu lượng nước.',
    expectedOutcome: 'Tạo mã hồ sơ chuẩn LC-2025-0199, mức độ ưu tiên High, SLA 8h, trạng thái chờ thẩm định.',
    actualResult: 'Mã LC-2025-0199 khởi tạo thành công, tự động gắn thẻ an toàn điện LOTO.',
    executionTimeMs: 420,
    status: 'pending',
    detailsPayload: {
      caseId: 'LC-2025-0199',
      equipment: 'CNC-04 (Mitsubishi M-V800)',
      errorCode: 'E210',
      telemetry: { spindleTemp: 72.4, coolantFlow: 6.8 },
    },
  },
  {
    id: 2,
    stageName: 'Stage 01: Duplicate Detection',
    actionTitle: 'Thuật toán AI quét phát hiện sự cố trùng lặp trong 30 ngày',
    actor: 'SmartGuard AI Core Engine',
    description: 'Đối soát mã lỗi E210 và cụm Spindle trên máy CNC-04 với cơ sở dữ liệu sự cố lịch sử.',
    expectedOutcome: 'Phát hiện 01 sự cố tương tự (LC-2025-0142) xảy ra ngày 10/01/2025 với độ tương đồng 91%.',
    actualResult: 'Gắn cờ cảnh báo rủi ro tái diễn, đề xuất chuyên gia tham khảo nguyên nhân gốc trước đó.',
    executionTimeMs: 310,
    status: 'pending',
    detailsPayload: {
      similarityScore: 91,
      matchedHistoricalCase: 'LC-2025-0142',
      recommendation: 'Tham chiếu SOP-CNC-M800-E210 thay vì xử lý mới từ đầu',
    },
  },
  {
    id: 3,
    stageName: 'Stage 02: Expert Assignment',
    actionTitle: 'Knowledge Manager phân công Chuyên gia kỹ thuật trưởng',
    actor: 'Nguyễn Văn A (Knowledge Manager - SEV)',
    description: 'Kiểm tra tải công việc của đội ngũ chuyên gia và điều phối hồ sơ cho chuyên gia am hiểu dòng máy M-V800.',
    expectedOutcome: 'Chuyên gia Lê Thanh Tùng (KTECH) tiếp nhận, SLA 8 giờ bắt đầu đếm ngược.',
    actualResult: 'Phân công thành công, gửi thông báo khẩn cấp đến Mobile App của chuyên gia.',
    executionTimeMs: 280,
    status: 'pending',
    detailsPayload: {
      assignedExpert: 'Lê Thanh Tùng (KTECH)',
      expertActiveCases: '3/5 (Trong hạn mức)',
      slaCommittedHours: 8,
    },
  },
  {
    id: 4,
    stageName: 'Stage 02: Technical Verification',
    actionTitle: 'Chuyên gia thẩm định kỹ thuật 4 bước & kết luận nguyên nhân gốc',
    actor: 'Lê Thanh Tùng (Chuyên gia Kỹ thuật)',
    description: 'Thực hiện checklist 4 bước: Lưu lượng bơm (< 12 L/p), Bầu lọc cặn (Tắc nghẽn 60%), Cảm biến nhiệt (Bình thường), Độ sạch dung dịch.',
    expectedOutcome: 'Độ tin cậy nguyên nhân gốc đạt ≥ 90%, ban hành cảnh báo an toàn bỏng nhiệt.',
    actualResult: 'Xác nhận nguyên nhân gốc: Bầu lọc thứ cấp 10µm bị nghẽn mạt nhôm. Độ tin cậy: 94%.',
    executionTimeMs: 650,
    status: 'pending',
    detailsPayload: {
      checklistPassed: '4/4 bước kiểm tra',
      rootCauseConfidence: '94%',
      safetyWarning: 'Ngắt nguồn điện và chờ Spindle < 45°C trước khi tháo bầu lọc',
    },
  },
  {
    id: 5,
    stageName: 'Stage 03: Knowledge Publishing',
    actionTitle: 'Ban biên tập phê duyệt xuất bản phiên bản SOP nâng cấp v2.1',
    actor: 'Nguyễn Quốc Hưng (Ban Phê duyệt Nội dung)',
    description: 'Biên soạn bài viết SOP chuẩn, gắn nhãn diff patch bổ sung bước kiểm tra áp lực lưu lượng nước hồi.',
    expectedOutcome: 'Xuất bản SOP-CNC-M800-E210 v2.1, hiệu lực 12 tháng, lịch tái đánh giá sau 6 tháng.',
    actualResult: 'Đã ký số phê duyệt, tự động kích hoạt đồng bộ vào Vector Database của AI Assistant.',
    executionTimeMs: 510,
    status: 'pending',
    detailsPayload: {
      documentId: 'SOP-CNC-M800-E210',
      version: 'v2.1',
      reviewScheduledDate: '20/02/2025',
      sharingScope: 'shared_all_plants',
    },
  },
  {
    id: 6,
    stageName: 'Stage 04: AI Recommendation Retrieval',
    actionTitle: 'AI Knowledge Assistant truy xuất và đề xuất giải pháp chuẩn',
    actor: 'EDM SmartGuard AI Agent',
    description: 'Mô phỏng truy vấn kỹ thuật viên: "Máy CNC-04 báo E210, nhiệt độ 72°C xử lý thế nào?".',
    expectedOutcome: 'Trích xuất chính xác quy trình SOP v2.1, độ khớp 94%, đính kèm cảnh báo an toàn.',
    actualResult: 'Khuyến nghị gửi tới thiết bị hiện trường trong 180ms với 2 nguồn tài liệu kiểm chứng.',
    executionTimeMs: 440,
    status: 'pending',
    detailsPayload: {
      matchingConfidence: '94%',
      citedDocuments: ['SOP-CNC-M800-E210 (v2.1)', 'MAN-MV800-05 (v2.4)'],
      humanReviewStatus: 'reviewed_valid',
    },
  },
  {
    id: 7,
    stageName: 'Stage 05: Knowledge Application',
    actionTitle: 'Kỹ thuật viên thực thi phiếu công tác số (Digital Work Instruction)',
    actor: 'Trần Văn Minh (Kỹ thuật viên ca máy)',
    description: 'Chạy bộ đếm giờ từng bước: Cô lập nguồn -> Tháo rửa bầu lọc 10µm -> Châm dung dịch tuần hoàn -> Kiểm tra áp lực đạt 0.35 MPa.',
    expectedOutcome: 'Hoàn thành đủ 4 bước trong 45 phút (tiêu chuẩn: 60 phút), 0 bước bị bỏ qua.',
    actualResult: 'Thực thi thành công, nhiệt độ Spindle hạ về 36.2°C, máy sẵn sàng gia công.',
    executionTimeMs: 590,
    status: 'pending',
    detailsPayload: {
      stepsCompleted: '4/4 bước',
      actualDuration: '45 phút (Nhanh hơn 15 phút)',
      postRepairSpindleTemp: '36.2°C (Chuẩn bình thường)',
    },
  },
  {
    id: 8,
    stageName: 'Stage 06: Outcome Validation',
    actionTitle: 'Nghiệm thu thực tế & giám sát telemetry ổn định liên tục 48h',
    actor: 'Hội đồng Kỹ thuật & Quản đốc phân xưởng',
    description: 'Hệ thống giám sát telemetry tự động xác nhận máy chạy ổn định không tái diễn lỗi trong 48 giờ.',
    expectedOutcome: 'Xác thực thành công (Verified Successful), tính toán MTTR thực tế và tiết kiệm chi phí.',
    actualResult: 'Đóng hồ sơ hoàn tất vòng đời: MTTR giảm còn 0.75h, chi phí tiết kiệm định lượng: 35.000.000 VNĐ.',
    executionTimeMs: 720,
    status: 'pending',
    detailsPayload: {
      stabilityPeriod: '48h liên tục không phát sinh lỗi',
      actualMttrHours: 0.75,
      costSavingVND: '35,000,000 VNĐ',
      finalStatus: 'verified_successful',
    },
  },
  {
    id: 9,
    stageName: 'Stage 07: Continuous Improvement',
    actionTitle: 'Hệ thống tự động cập nhật Dashboard KPIs & Bài học phòng ngừa',
    actor: 'SmartGuard Analytics & Governance',
    description: 'Cập nhật các chỉ số điều hành: Tỷ lệ thành công 94.2%, Tỷ lệ tái diễn 4.2%, Lũy kế tiết kiệm 1.26 tỷ VND.',
    expectedOutcome: 'Tạo bản ghi Lessons Learned tự động phổ biến cho 8 máy CNC tương tự tại xưởng P1 và P2.',
    actualResult: 'Tất cả 8 thẻ KPI cập nhật thời gian thực, ghi nhận 01 bài học kinh nghiệm phòng ngừa.',
    executionTimeMs: 380,
    status: 'pending',
    detailsPayload: {
      updatedSuccessRate: '94.2%',
      updatedRepeatIncidentRate: '4.2% (Đạt chuẩn < 4.5%)',
      totalCostAvoidance: '1,295,000,000 VNĐ',
    },
  },
  {
    id: 10,
    stageName: 'Cross-cutting: Multi-Vendor Security',
    actionTitle: 'Kiểm toán an toàn thông tin & phân quyền đa hãng (RBAC Isolation)',
    actor: 'Enterprise Security Compliance Guard',
    description: 'Xác thực chính sách phân quyền đa hãng: Vendor đối thủ không được truy cập sơ đồ độc quyền.',
    expectedOutcome: 'Tài liệu độc quyền của Mitsubishi bị khóa đối với tài khoản hãng Makino/Fanuc.',
    actualResult: 'Bảo mật 100% tuân thủ: Vendor Makino bị chặn truy cập dữ liệu kỹ thuật nhạy cảm.',
    executionTimeMs: 250,
    status: 'pending',
    detailsPayload: {
      accessPolicy: 'OEM_DATA_ISOLATION_ENFORCED',
      auditCheckResult: 'PASS (0 rò rỉ dữ liệu qua ranh giới vendor)',
    },
  },
];

export const E2ELifecycleTestModal: React.FC<E2ELifecycleTestModalProps> = ({
  isOpen,
  onClose,
  onInjectTestedCase,
}) => {
  const [testSteps, setTestSteps] = useState<TestStep[]>(INITIAL_TEST_STEPS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentRunningStep, setCurrentRunningStep] = useState<number | null>(null);
  const [expandedStepId, setExpandedStepId] = useState<number | null>(null);
  const [overallSuccess, setOverallSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset steps if reopened
      setTestSteps(INITIAL_TEST_STEPS);
      setIsRunning(false);
      setCurrentRunningStep(null);
      setOverallSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Run all steps sequentially
  const handleRunAllTests = async () => {
    setIsRunning(true);
    setOverallSuccess(false);

    // Reset status to pending
    setTestSteps((prev) => prev.map((s) => ({ ...s, status: 'pending' })));

    for (let i = 0; i < testSteps.length; i++) {
      const stepId = i + 1;
      setCurrentRunningStep(stepId);

      // Set current step to running
      setTestSteps((prev) =>
        prev.map((s) => (s.id === stepId ? { ...s, status: 'running' } : s))
      );

      // Simulate step execution delay
      await new Promise((res) => setTimeout(res, 550));

      // Mark passed
      setTestSteps((prev) =>
        prev.map((s) => (s.id === stepId ? { ...s, status: 'passed' } : s))
      );
    }

    setCurrentRunningStep(null);
    setIsRunning(false);
    setOverallSuccess(true);
  };

  const handleInjectIntoLiveCases = () => {
    if (!onInjectTestedCase) return;

    const newCase: LifecycleCase = {
      id: 'LC-2025-0199',
      title: 'Xử lý triệt để Spindle quá nhiệt lỗi E210 qua quy trình SOP v2.1',
      errorCode: 'E210',
      category: 'cnc',
      equipmentId: 'CNC-04',
      model: 'M-V800',
      vendor: 'Mitsubishi',
      factory: 'SEV',
      line: 'Line A (Gia công khuôn mẫu)',
      priority: 'high',
      phenomenon: ['Nhiệt độ Spindle vượt 72°C trong chu trình phay tốc độ cao'],
      rootCauses: ['Bầu lọc thứ cấp 10µm bị nghẽn mạt nhôm làm giảm lưu lượng nước hồi còn 6.8 L/phút'],
      verifiedRootCause: 'Bầu lọc thứ cấp 10µm bị nghẽn mạt nhôm làm giảm lưu lượng nước hồi còn 6.8 L/phút (Đã xác minh)',
      rootCauseConfidence: 94,
      safetyAlert: 'Bắt buộc ngắt CB nguồn điện và đeo găng tay chịu nhiệt khi tháo rắc co ống nước.',
      currentStage: 'outcome_validation',
      statusText: 'Đã đóng - Hoàn tất vòng đời (Verified Successful)',
      stageProgressPercent: 100,
      slaStatus: 'on_time',
      slaRemainingHours: 4,
      slaTotalHours: 8,
      downtimeHours: 0.75,
      occurrenceTime: '12/01/2025 08:00',
      createdDate: '12/01/2025',
      dueDate: '16/01/2025',
      reportedBy: {
        id: 'usr-01',
        name: 'Nguyễn Văn Minh',
        role: 'Kỹ thuật viên ca máy',
        avatar: '/extracted/avatar_user.png',
        factory: 'SEV',
        vendor: 'KHV',
      },
      assignedExpert: {
        id: 'exp-02',
        name: 'Lê Thanh Tùng',
        role: 'Chuyên gia Kỹ thuật',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
        assignedAt: '10:00',
      },
      inspectionSteps: [
        { number: 1, title: 'Kiểm tra lưu lượng nước làm mát', isPassed: true },
        { number: 2, title: 'Kiểm tra bầu lọc thứ cấp 10µm', isPassed: true },
        { number: 3, title: 'Kiểm tra cảm biến nhiệt độ thân Spindle', isPassed: true },
        { number: 4, title: 'Kiểm tra độ sạch dung dịch tuần hoàn', isPassed: true },
      ],
      correctiveActions: [
        'Vệ sinh và thay mới lõi lọc 10µm',
        'Điều chỉnh van áp lực hồi về 0.35 MPa',
      ],
      evidences: [],
      publishedArticle: {
        articleId: 'SOP-CNC-M800-E210',
        version: 'v2.1',
        publishedDate: 'Hôm nay',
        validUntilDate: '12 tháng sau',
        reviewScheduledDate: '6 tháng',
        scope: 'shared',
        approverName: 'Nguyễn Quốc Hưng',
      },
      outcomeValidation: {
        validatedBy: 'Hội đồng Kỹ thuật & KM',
        validatedDate: 'Hôm nay',
        outcome: 'verified_successful',
        operatingStabilityHours: 48,
        recurrenceObserved: false,
        mttrActualHours: 0.75,
        costSavingVND: 35000000,
        validationNotes: 'Quy trình SOP v2.1 đạt hiệu quả cao, máy hoạt động ổn định 48h liên tục.',
      },
    };

    onInjectTestedCase(newCase);
    onClose();
  };

  const passedCount = testSteps.filter((s) => s.status === 'passed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#0b1b42] border border-[#1d3a77] rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-[#1b3874] flex items-center justify-between bg-[#081534]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  BỘ CHẠY KỊCH BẢN KIỂM THỬ TỰ ĐỘNG E2E (10 BƯỚC KHÉP KÍN)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30 uppercase">
                  End-to-End Verification Suite
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Xác thực quy trình toàn vẹn: Sự cố → Xác minh → SOP → Đề xuất AI → Hiện trường → Nghiệm thu 48h → Phân quyền đa Vendor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Stats Control Bar */}
        <div className="p-4 bg-[#091738] border-b border-[#162d64] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Tiến độ kiểm thử:</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">
                {passedCount} / {testSteps.length} bước đạt
              </span>
            </div>
            <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(passedCount / testSteps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunAllTests}
              disabled={isRunning}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                isRunning
                  ? 'bg-blue-600/50 text-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-600/30'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>Đang thực thi Bước {currentRunningStep}...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Chạy toàn bộ 10 bước tự động</span>
                </>
              )}
            </button>

            {overallSuccess && onInjectTestedCase && (
              <button
                onClick={handleInjectIntoLiveCases}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 animate-pulse"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Nạp hồ sơ mẫu vào Danh sách vận hành</span>
              </button>
            )}
          </div>
        </div>

        {/* Steps List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 bg-[#081534]/60">
          {testSteps.map((step) => {
            const isExpanded = expandedStepId === step.id;
            return (
              <div
                key={step.id}
                className={`rounded-xl border transition overflow-hidden text-xs ${
                  step.status === 'passed'
                    ? 'bg-[#091f46] border-emerald-500/40 shadow-xs'
                    : step.status === 'running'
                    ? 'bg-[#0c2356] border-blue-400 ring-2 ring-blue-500/40'
                    : 'bg-[#0b1b42] border-[#183166]'
                }`}
              >
                {/* Step Item Row */}
                <div
                  onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-blue-950/40 transition gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Status Badge */}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-bold">
                      {step.status === 'passed' ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : step.status === 'running' ? (
                        <div className="w-7 h-7 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-400 flex items-center justify-center">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center text-xs">
                          {step.id}
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] font-bold text-cyan-400 px-1.5 py-0.2 rounded bg-blue-950 border border-blue-500/30">
                          {step.stageName}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Người thực hiện: <strong className="text-slate-200">{step.actor}</strong>
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs truncate">
                        {step.id}. {step.actionTitle}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right flex-shrink-0">
                    <span className="font-mono text-[11px] text-slate-400">
                      {step.status === 'passed' ? `${step.executionTimeMs}ms` : '—'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        step.status === 'passed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : step.status === 'running'
                          ? 'bg-blue-500/20 text-cyan-300 border border-blue-400/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {step.status === 'passed' ? 'PASS' : step.status === 'running' ? 'RUNNING' : 'PENDING'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Collapsible Detail Panel */}
                {isExpanded && (
                  <div className="p-4 border-t border-[#162d64] bg-[#071330] space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Mô tả hành động
                        </span>
                        <p className="text-slate-300 leading-relaxed">{step.description}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Kết quả kỳ vọng vs Thực tế
                        </span>
                        <p className="text-emerald-300 font-semibold">{step.actualResult}</p>
                      </div>
                    </div>

                    {step.detailsPayload && (
                      <div className="p-3 rounded-lg bg-[#050c20] border border-blue-500/20 space-y-1">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block font-mono">
                          Dữ liệu vết kiểm toán (Audit Payload JSON)
                        </span>
                        <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto p-2 bg-[#040816] rounded border border-slate-800">
                          {JSON.stringify(step.detailsPayload, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1b3874] bg-[#081534] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Kịch bản kiểm thử đáp ứng tiêu chí nghiệm thu Section 16 — Phase 1 Master Architecture.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            Đóng bảng kiểm thử
          </button>
        </div>
      </div>
    </div>
  );
};
