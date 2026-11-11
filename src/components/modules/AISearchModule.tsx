import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Wrench,
  TrendingUp,
  ShieldCheck,
  Search,
  Mic,
  Bot,
  Info,
  ArrowRight,
  Check,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  ChevronDown,
  Eye,
  FileText,
  AlertCircle,
  Filter,
} from 'lucide-react';

interface AISearchModuleProps {
  onNavigateTab: (tabId: string) => void;
}

export const AISearchModule: React.FC<AISearchModuleProps> = ({ onNavigateTab }) => {
  const [query, setQuery] = useState(
    'Máy EDM-04 báo lỗi E210 Spindle quá nhiệt, nguyên nhân và cách xử lý?'
  );
  const [activeTab, setActiveTab] = useState('procedure');
  const [feedback, setFeedback] = useState<'useful' | 'incomplete' | null>('useful');
  const [isSaved, setIsSaved] = useState(false);

  const promptSuggestions = [
    'E210 spindle quá nhiệt',
    'Cách kiểm tra hệ thống làm mát',
    'Bảo trì spindle định kỳ',
    'Giảm nhiệt độ spindle',
    'Lỗi trục chính CNC',
  ];

  const searchResults = [
    {
      id: 1,
      title: 'Xử lý lỗi E210 – Spindle quá nhiệt trên máy EDM-04',
      type: 'Xử lý sự cố',
      status: 'Đã duyệt',
      views: 2654,
      likes: 328,
      comments: 46,
      img: '/extracted/thumb_spindle.png',
    },
    {
      id: 2,
      title: 'Quy trình kiểm tra hệ thống làm mát spindle',
      type: 'Bảo trì',
      status: 'Đã duyệt',
      views: 1892,
      likes: 275,
      comments: 38,
      img: '/extracted/thumb_servo.png',
    },
    {
      id: 3,
      title: 'SOP: Vệ sinh và bảo trì hệ thống làm mát EDM',
      type: 'SOP',
      status: 'Đã duyệt',
      views: 1210,
      likes: 186,
      comments: 21,
      img: '/extracted/thumb_hydraulic.png',
    },
    {
      id: 4,
      title: 'Cải tiến lưu lượng làm mát, giảm 30% lỗi E210',
      type: 'Cải tiến',
      status: 'Đã duyệt',
      views: 1763,
      likes: 201,
      comments: 27,
      img: '/extracted/thumb_surface.png',
    },
    {
      id: 5,
      title: 'Manual EDM-04 – Mã lỗi E210 và hướng dẫn kỹ thuật',
      type: 'Manual',
      status: 'Đã duyệt',
      views: 3420,
      likes: 522,
      comments: 64,
      img: '/extracted/spindle_monitor.png',
    },
  ];

  return (
    <div className="space-y-3.5 select-none">
      {/* 1. Top Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a2c75] via-[#0f3d9c] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
        <div className="relative z-10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-[460px]">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              Tìm kiếm tri thức với AI
            </h1>
            <p className="text-[#bfd6ff] text-xs font-normal mt-1.5 leading-relaxed">
              Hỏi bằng ngôn ngữ tự nhiên • Tìm giải pháp nhanh • Dựa trên tri thức đã được xác minh
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 min-w-[420px]">
            <div className="bg-[#123e93]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#2368ee] text-white flex items-center justify-center mb-1">
                <BookOpen className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                12,486
              </div>
              <div className="text-[11px] text-[#a9c7ff] font-medium mt-1">
                Tài liệu
              </div>
            </div>

            <div className="bg-[#19326e]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#3b82f6] text-white flex items-center justify-center mb-1">
                <Wrench className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                3,820
              </div>
              <div className="text-[11px] text-[#bfdbfe] font-medium mt-1">
                Ca sự cố
              </div>
            </div>

            <div className="bg-[#123e93]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#6366f1] text-white flex items-center justify-center mb-1">
                <TrendingUp className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                928
              </div>
              <div className="text-[11px] text-[#c7d2fe] font-medium mt-1">
                Cải tiến
              </div>
            </div>

            <div className="bg-[#09462f]/85 border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#059669] text-white flex items-center justify-center mb-1">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                98%
              </div>
              <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
                Nguồn đã duyệt
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Natural Language AI Search Box */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm space-y-2.5">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập câu hỏi kỹ thuật bằng ngôn ngữ tự nhiên..."
            className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-[#1864f3] text-slate-800 text-xs sm:text-sm pl-11 pr-32 rounded-xl outline-none"
          />
          <div className="absolute right-2 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100">
              <Mic className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-[#1864f3] hover:bg-[#1456d8] text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tìm kiếm AI</span>
            </button>
          </div>
        </div>

        {/* Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Gợi ý câu hỏi phổ biến:</span>
          {promptSuggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(s)}
              className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
            >
              <Search className="w-3 h-3 text-slate-400" />
              <span>{s}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 3-Column Content Layout: Left Results, Center AI Answer, Right Filters & Sources */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* Left Column: Kết quả tìm thấy (24) */}
        <div className="xl:col-span-3 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-bold text-xs text-slate-800 tracking-tight">
              Kết quả tìm thấy (24)
            </span>
            <button className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-2 py-1">
              <span>Phù hợp nhất</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          <div className="space-y-2">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-2.5 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer flex gap-2.5"
              >
                <div className="w-[62px] h-[52px] rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="bg-purple-100 text-purple-700 text-[9px] font-bold px-1.5 py-0.2 rounded">
                        {item.type}
                      </span>
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] font-semibold px-1.5 py-0.2 rounded ml-auto">
                        ✓ {item.status}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-900 leading-tight line-clamp-1">
                      {item.title}
                    </h5>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mt-1">
                    <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" /> {item.views}</span>
                    <span className="flex items-center gap-0.5"><ThumbsUp className="w-2.5 h-2.5" /> {item.likes}</span>
                    <span className="flex items-center gap-0.5"><MessageSquare className="w-2.5 h-2.5" /> {item.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column: Trả lời từ AI */}
        <div className="xl:col-span-6 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3.5 select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">
                Trả lời từ AI <span className="text-slate-500 font-normal text-xs">(dựa trên 8 nguồn tri thức đã duyệt)</span>
              </h3>
            </div>

            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Tri thức đã xác minh</span>
              <Info className="w-3 h-3 text-emerald-500 ml-0.5" />
            </span>
          </div>

          {/* Tóm tắt giải pháp */}
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3 text-xs leading-relaxed text-slate-700">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
              <span>Tóm tắt giải pháp</span>
            </div>
            <p>
              Lỗi E210 trên máy EDM-04 là cảnh báo nhiệt độ trục chính (Spindle) vượt ngưỡng cho phép (&gt; 70°C). Nguyên nhân chủ yếu do hệ thống làm mát kém hiệu quả, lưu lượng nước thấp hoặc bộ lọc bị tắc. Dưới đây là hướng dẫn kiểm tra và xử lý theo tiêu chuẩn.
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            {[
              { id: 'procedure', label: 'Quy trình xử lý', icon: Sparkles },
              { id: 'causes', label: 'Nguyên nhân chi tiết' },
              { id: 'sources', label: 'Tài liệu tham khảo (8)' },
              { id: 'similar', label: 'Ca tương tự (12)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1864f3] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 5-Step Process with arrows */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
            {[
              { num: 1, title: 'Xác nhận lỗi E210 trên màn hình', img: '/extracted/spindle_monitor.png' },
              { num: 2, title: 'Kiểm tra & vệ sinh lọc nước làm mát', img: '/extracted/photo_step2.png' },
              { num: 3, title: 'Kiểm tra bơm và lưu lượng', img: '/extracted/photo_step3.png' },
              { num: 4, title: 'Đo nhiệt độ và kiểm tra rò rỉ', img: '/extracted/photo_step4.png' },
              { num: 5, isSuccess: true, title: 'Chạy thử và xác nhận hết lỗi', img: '/extracted/photo_step5.png' },
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="flex-1 min-w-[95px] max-w-[115px] bg-slate-50 border border-slate-200 rounded-xl p-1.5 flex flex-col items-center text-center">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-1.5">
                    <img src={step.img} alt="" className="w-full h-full object-cover" />
                    <div
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
                        step.isSuccess ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                    >
                      {step.isSuccess ? '✓' : step.num}
                    </div>
                  </div>
                  <p className="text-[10px] font-medium text-slate-800 leading-tight line-clamp-2">
                    {step.title}
                  </p>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* 2 Callout Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            {/* Kết quả mong đợi */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
                <span>Kết quả mong đợi</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li className="flex items-start gap-1">
                  <Check className="w-3 h-3 text-emerald-600 mt-0.5" />
                  <span>Nhiệt độ spindle duy trì trong khoảng 40 – 55°C.</span>
                </li>
                <li className="flex items-start gap-1">
                  <Check className="w-3 h-3 text-emerald-600 mt-0.5" />
                  <span>Không còn cảnh báo lỗi E210, máy vận hành ổn định.</span>
                </li>
              </ul>
            </div>

            {/* Lưu ý quan trọng */}
            <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-800">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>Lưu ý quan trọng</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li>• Sử dụng nước làm mát đúng tiêu chuẩn.</li>
                <li>• Vệ sinh bộ lọc định kỳ (1 – 2 tuần).</li>
                <li>• Kiểm tra bơm làm mát khi lưu lượng &lt; 12 L/phút.</li>
              </ul>
            </div>
          </div>

          {/* Feedback & Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-600 font-medium">Bạn thấy câu trả lời này hữu ích?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFeedback('useful')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border transition-all ${
                  feedback === 'useful'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Hữu ích (328)</span>
              </button>

              <button
                onClick={() => setFeedback('incomplete')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border transition-all ${
                  feedback === 'incomplete'
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chưa đầy đủ (24)</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border transition-all ${
                  isSaved
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Đã lưu' : 'Lưu vào thư viện'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Bộ lọc & Nguồn tri thức */}
        <div className="xl:col-span-3 space-y-3.5">
          {/* Bộ lọc kết quả */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-slate-900">Bộ lọc kết quả</h4>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Loại tri thức</label>
              <select className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg px-2 text-xs">
                <option>Tất cả</option>
                <option>Xử lý sự cố</option>
                <option>Cải tiến kỹ thuật</option>
                <option>Tài liệu SOP</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Thiết bị / Model</label>
              <select className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg px-2 text-xs">
                <option>EDM-04</option>
                <option>CNC-02</option>
                <option>M-V800</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Trạng thái duyệt</label>
              <select className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg px-2 text-xs">
                <option>Đã duyệt</option>
                <option>Tất cả</option>
              </select>
            </div>
          </div>

          {/* Nguồn tri thức (8) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-2.5 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-slate-900">Nguồn tri thức (8)</h4>
            </div>

            <div className="space-y-1.5 text-slate-700">
              <div className="flex items-center justify-between">
                <span>Manual / Hướng dẫn</span>
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                  2
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>SOP / Quy trình</span>
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                  1
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ca xử lý sự cố</span>
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                  3
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bài cải tiến</span>
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                  1
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tài liệu kỹ thuật</span>
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
