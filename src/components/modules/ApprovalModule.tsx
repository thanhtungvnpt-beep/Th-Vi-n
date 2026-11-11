import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  RotateCcw,
  XCircle,
  Filter,
  History,
  Home,
  ChevronRight,
  Clock,
  Check,
  X,
  Star,
  ArrowRight,
  Eye,
  ThumbsUp,
  FileText,
  AlertTriangle,
  Cog,
  Wrench,
  ChevronDown,
} from 'lucide-react';
import { ApprovalQueueItem } from '../../types';

interface ApprovalModuleProps {
  queueItems: ApprovalQueueItem[];
  onApproveItem: (id: string, notes?: string) => void;
  onRequestEdit: (id: string, notes: string) => void;
  onRejectItem: (id: string, notes: string) => void;
}

export const ApprovalModule: React.FC<ApprovalModuleProps> = ({
  queueItems,
  onApproveItem,
  onRequestEdit,
  onRejectItem,
}) => {
  const [selectedId, setSelectedId] = useState(queueItems[0]?.id || 'appr-01');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('content');
  const [rating, setRating] = useState(5);
  const [checklist, setChecklist] = useState({
    clearAndFull: true,
    safeAndFeasible: true,
    evidenceAttached: true,
    practicalUsability: true,
  });
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const currentItem =
    queueItems.find((item) => item.id === selectedId) || queueItems[0];

  const handleApprove = () => {
    if (!currentItem) return;
    onApproveItem(currentItem.id, reviewerNotes);
    setActionNotice(`Đã phê duyệt và xuất bản: "${currentItem.title}"`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleRequestEdit = () => {
    if (!currentItem) return;
    onRequestEdit(currentItem.id, reviewerNotes || 'Vui lòng bổ sung thêm thông số kỹ thuật đo kiểm');
    setActionNotice(`Đã gửi yêu cầu chỉnh sửa cho ${currentItem.author}`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleReject = () => {
    if (!currentItem) return;
    onRejectItem(currentItem.id, reviewerNotes || 'Nội dung không đạt tiêu chuẩn an toàn');
    setActionNotice(`Đã từ chối bài: "${currentItem.title}"`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="space-y-3.5 select-none">
      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="p-3 bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Top Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a2c75] via-[#0f3d9c] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
        <div className="relative z-10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-[460px]">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              Phê duyệt nội dung
            </h1>
            <p className="text-[#bfd6ff] text-xs font-normal mt-1.5 leading-relaxed">
              Kiểm duyệt • Xác nhận chất lượng • Xuất bản tri thức
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 min-w-[420px]">
            {/* Stat 1 */}
            <div className="bg-[#123e93]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#2368ee] text-white flex items-center justify-center mb-1">
                <ClipboardCheck className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                56
              </div>
              <div className="text-[11px] text-[#a9c7ff] font-medium mt-1">
                Chờ phê duyệt
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#094c45]/85 border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#10b981] text-white flex items-center justify-center mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                1,248
              </div>
              <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
                Đã phê duyệt
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#4d360d]/85 border border-amber-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#f59e0b] text-white flex items-center justify-center mb-1">
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                18
              </div>
              <div className="text-[11px] text-[#fde68a] font-medium mt-1">
                Yêu cầu chỉnh sửa
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#4d1421]/85 border border-red-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#ef4444] text-white flex items-center justify-center mb-1">
                <XCircle className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                6
              </div>
              <div className="text-[11px] text-[#fecaca] font-medium mt-1">
                Đã từ chối
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subnav Pills & Right Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Tất cả (56)' },
            { id: 'document', label: 'Tài liệu (12)' },
            { id: 'incident', label: 'Xử lý sự cố (18)' },
            { id: 'improvement', label: 'Cải tiến (14)' },
            { id: 'discussion', label: 'Bài thảo luận (8)' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1864f3] text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/90 flex items-center gap-1.5 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Bộ lọc nâng cao</span>
          </button>
          <button className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/90 flex items-center gap-1.5 shadow-2xs">
            <History className="w-3.5 h-3.5 text-blue-600" />
            <span>Lịch sử phê duyệt</span>
          </button>
        </div>
      </div>

      {/* 3. 3-Column Content Layout: Left Queue, Center Detail Review, Right Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* Left Queue List */}
        <div className="xl:col-span-3 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-bold text-xs text-slate-800 tracking-tight">
              Danh sách chờ phê duyệt (56)
            </span>
            <button className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-2 py-1">
              <span>Mới nhất</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          <div className="space-y-2">
            {queueItems.map((item) => {
              const isSelected = item.id === selectedId;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer flex gap-2.5 relative ${
                    isSelected
                      ? 'bg-white border-2 border-[#1864f3] shadow-md shadow-blue-500/10'
                      : 'bg-white border border-slate-200/80 hover:border-blue-300'
                  }`}
                >
                  {/* Urgent / New indicator dot */}
                  {item.isUrgent && (
                    <span className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                  )}

                  {/* Thumbnail */}
                  <div className="w-[62px] h-[52px] rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <img
                      src={
                        item.type === 'incident'
                          ? '/extracted/thumb_spindle.png'
                          : item.type === 'improvement'
                          ? '/extracted/thumb_servo.png'
                          : '/extracted/thumb_hydraulic.png'
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="bg-purple-100 text-purple-700 text-[9px] font-bold px-1.5 py-0.2 rounded inline-block mb-1">
                        {item.typeText}
                      </span>
                      <h5 className="font-bold text-xs text-slate-900 leading-tight line-clamp-1">
                        {item.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span className="truncate">{item.author} | {item.vendor}</span>
                      <span className="text-slate-400 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" /> 2h
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Detailed Content Review */}
        <div className="xl:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4 select-none">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span>Phê duyệt nội dung</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-800 font-semibold">Chi tiết nội dung</span>
          </div>

          {/* Title Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Wrench className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {currentItem?.title}
              </h2>
            </div>

            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Chờ phê duyệt</span>
            </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded">
              {currentItem?.typeText}
            </span>
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700">
              Thiết bị: <strong className="text-slate-900">{currentItem?.equipment}</strong>
            </span>
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700">
              Model: <strong className="text-slate-900">{currentItem?.model}</strong>
            </span>
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700">
              Vendor: <strong className="text-slate-900">{currentItem?.vendor}</strong>
            </span>
          </div>

          {/* Author line */}
          <div className="flex items-center justify-between text-xs text-slate-500 py-1 border-y border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                <img src={currentItem?.authorAvatar} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-slate-800">{currentItem?.author}</span>
              <span className="text-[11px] text-slate-400">({currentItem?.authorRole})</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span>Gửi: {currentItem?.submittedAt}</span>
              <span>Phiên bản: {currentItem?.version}</span>
              <span>👁 {currentItem?.views}</span>
              <span>👍 {currentItem?.ratingsCount}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2">
            {[
              { id: 'content', label: 'Nội dung' },
              { id: 'attachments', label: 'Tài liệu đính kèm (3)' },
              { id: 'history', label: 'Lịch sử chỉnh sửa' },
              { id: 'comments', label: 'Bình luận (2)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1864f3] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Body */}
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-3 text-xs">
                <div>
                  <h4 className="flex items-center gap-1.5 font-bold text-red-600">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>1. Hiện tượng</span>
                  </h4>
                  <ul className="mt-1 space-y-1 pl-2 text-slate-700">
                    {currentItem?.phenomenon.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-1.5 font-bold text-blue-700">
                    <Cog className="w-3.5 h-3.5" />
                    <span>2. Nguyên nhân xác định</span>
                  </h4>
                  <ul className="mt-1 space-y-1 pl-2 text-slate-700">
                    {currentItem?.rootCauses.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                  <img src="/extracted/spindle_monitor.png" alt="" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>

            {/* 3. Cách xử lý (4 steps with arrows) */}
            <div>
              <h4 className="flex items-center gap-1.5 font-bold text-blue-700 text-xs mb-2">
                <Wrench className="w-3.5 h-3.5" />
                <span>3. Cách xử lý</span>
              </h4>
              <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
                {currentItem?.steps.map((st, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="flex-1 min-w-[95px] max-w-[120px] bg-slate-50 border border-slate-200 rounded-xl p-1.5 flex flex-col items-center text-center">
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-1.5">
                        <img src={st.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                          {st.number}
                        </div>
                      </div>
                      <p className="text-[10px] font-medium text-slate-800 leading-tight line-clamp-2">
                        {st.title}
                      </p>
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 4. Kết quả */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-2.5 text-xs">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5 mb-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
                4. Kết quả
              </span>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                {currentItem?.expectedResult}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Approval Process, Quality Checklist, Actions */}
        <div className="xl:col-span-3 space-y-3.5">
          {/* Quy trình phê duyệt */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
              Quy trình phê duyệt
            </h4>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Người gửi nội dung</div>
                  <div className="text-[11px] text-slate-500">{currentItem?.author}</div>
                  <div className="text-[10px] text-slate-400">{currentItem?.submittedAt}</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-semibold text-blue-700">Phê duyệt bởi</div>
                  <div className="text-[11px] text-slate-700 font-medium">Chuyên gia kỹ thuật (Bạn)</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-semibold text-slate-500">Xuất bản</div>
                  <div className="text-[11px] text-slate-400">Vào thư viện tri thức</div>
                </div>
              </div>
            </div>
          </div>

          {/* Đánh giá chất lượng */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
              Đánh giá chất lượng
            </h4>

            {/* 5-Star Rating */}
            <div className="flex items-center gap-1.5 justify-center py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 text-slate-700 text-[11px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.clearAndFull}
                  onChange={(e) =>
                    setChecklist({ ...checklist, clearAndFull: e.target.checked })
                  }
                  className="rounded text-emerald-600"
                />
                <span>Nội dung rõ ràng, đầy đủ</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.safeAndFeasible}
                  onChange={(e) =>
                    setChecklist({ ...checklist, safeAndFeasible: e.target.checked })
                  }
                  className="rounded text-emerald-600"
                />
                <span>Giải pháp phù hợp, an toàn</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.evidenceAttached}
                  onChange={(e) =>
                    setChecklist({ ...checklist, evidenceAttached: e.target.checked })
                  }
                  className="rounded text-emerald-600"
                />
                <span>Hình ảnh / tài liệu minh họa</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.practicalUsability}
                  onChange={(e) =>
                    setChecklist({ ...checklist, practicalUsability: e.target.checked })
                  }
                  className="rounded text-emerald-600"
                />
                <span>Có thể áp dụng thực tế</span>
              </label>
            </div>

            <textarea
              rows={2}
              value={reviewerNotes}
              onChange={(e) => setReviewerNotes(e.target.value)}
              placeholder="Ghi chú thẩm định của chuyên gia..."
              className="w-full p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
            />

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleApprove}
                className="w-full py-2.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Phê duyệt & Xuất bản</span>
              </button>

              <button
                onClick={handleRequestEdit}
                className="w-full py-2 bg-white hover:bg-slate-50 text-[#1864f3] border border-[#1864f3] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Yêu cầu chỉnh sửa</span>
              </button>

              <button
                onClick={handleReject}
                className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Từ chối</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
