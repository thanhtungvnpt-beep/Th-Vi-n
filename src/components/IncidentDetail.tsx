import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ShieldAlert,
  Star,
  Monitor,
  Tag,
  Building2,
  Calendar,
  Eye,
  FileText,
  ListOrdered,
  Image as ImageIcon,
  BarChart2,
  MessageSquare,
  AlertTriangle,
  Search,
  Settings,
  ArrowRight,
  Check,
} from 'lucide-react';
import { IncidentItem } from '../types';

interface IncidentDetailProps {
  incident: IncidentItem;
}

export const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isStarred, setIsStarred] = useState(true);

  const tabs = [
    { id: 'details', label: 'Nội dung chi tiết', icon: FileText },
    { id: 'procedure', label: 'Quy trình xử lý', icon: ListOrdered },
    { id: 'media', label: 'Hình ảnh / Video', icon: ImageIcon },
    { id: 'evaluation', label: 'Kết quả & Đánh giá', icon: BarChart2 },
    {
      id: 'discussion',
      label: `Thảo luận (${incident.commentsCount})`,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col gap-4 select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="hover:text-blue-600 cursor-pointer">Xử lý sự cố</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-800 font-semibold">Chi tiết ca sự cố</span>
      </div>

      {/* Main Title Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {incident.title}
          </h2>
          <span className="bg-[#10b981] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>{incident.statusText}</span>
          </span>
        </div>

        {/* Favorite / Bookmark */}
        <button
          onClick={() => setIsStarred(!isStarred)}
          className="text-amber-400 hover:text-amber-500 transition-colors p-1"
          title="Yêu thích"
        >
          <Star
            className={`w-5 h-5 ${
              isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
            }`}
          />
        </button>
      </div>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg">
          <Monitor className="w-3.5 h-3.5 text-slate-400" />
          <span>Máy: <strong className="text-slate-900">{incident.machineId}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span>Model: <strong className="text-slate-900">{incident.model}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Hãng: <strong className="text-slate-900">{incident.vendor}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Cập nhật: <strong className="text-slate-900">{incident.updatedAt}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 text-slate-600 px-2.5 py-1 rounded-lg ml-auto">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium">{incident.views.toLocaleString()}</span>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[#1864f3] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1 Content: Nội dung chi tiết */}
      {activeTab === 'details' && (
        <div className="space-y-4 pt-1">
          {/* Top Split: Text bullets on left, Spindle Console on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Sections (1 & 2) */}
            <div className="lg:col-span-7 space-y-4">
              {/* 1. Hiện tượng */}
              <div>
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-red-600 tracking-tight">
                  <AlertTriangle className="w-4 h-4 fill-red-50 text-red-600" />
                  <span>1. Hiện tượng</span>
                </h3>
                <ul className="mt-2 space-y-1.5 pl-2 text-xs text-slate-700">
                  {incident.phenomenon.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Nguyên nhân xác định */}
              <div className="pt-1">
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-blue-700 tracking-tight">
                  <Search className="w-4 h-4 text-blue-600" />
                  <span>2. Nguyên nhân xác định</span>
                </h3>
                <ul className="mt-2 space-y-1.5 pl-2 text-xs text-slate-700">
                  {incident.rootCauses.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Spindle Monitor Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[345px] rounded-xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900 group">
                <img
                  src="/extracted/spindle_monitor.png"
                  alt="Spindle and E210 Console Alarm"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Quy trình kiểm tra & khắc phục */}
          <div className="pt-2">
            <h3 className="flex items-center gap-1.5 text-xs font-bold text-blue-700 tracking-tight mb-3">
              <Settings className="w-4 h-4 text-blue-600" />
              <span>3. Quy trình kiểm tra & khắc phục</span>
            </h3>

            {/* 5-Step Process Flow */}
            <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-2">
              {incident.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  {/* Step Card */}
                  <div className="flex-1 min-w-[105px] max-w-[130px] bg-white border border-slate-200/90 rounded-xl p-2 flex flex-col items-center text-center shadow-2xs hover:shadow-sm transition-all group">
                    {/* Step Image with Badge */}
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-2 border border-slate-100">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {/* Step Number Badge */}
                      <div
                        className={`absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${
                          step.isSuccess ? 'bg-[#10b981]' : 'bg-[#1864f3]'
                        }`}
                      >
                        {step.isSuccess ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : (
                          step.number
                        )}
                      </div>
                    </div>

                    {/* Step Title */}
                    <p className="text-[11px] font-medium text-slate-800 leading-snug line-clamp-2">
                      {step.title}
                    </p>
                  </div>

                  {/* Connecting Arrow */}
                  {idx < incident.steps.length - 1 && (
                    <div className="flex-shrink-0 text-[#1864f3] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Quy trình xử lý */}
      {activeTab === 'procedure' && (
        <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-3">
          <h4 className="font-bold text-slate-800">Quy trình chi tiết 5 bước chuẩn hóa (SOP):</h4>
          <ol className="list-decimal list-inside space-y-2 text-slate-700 leading-relaxed">
            <li><strong>Bước 1:</strong> Tắt spindle, ngắt chế độ gia công tự động. Kiểm tra cảm biến nhiệt và đồng hồ áp suất nước tuần hoàn.</li>
            <li><strong>Bước 2:</strong> Mở bầu lọc nước làm mát chiller trục chính, kiểm tra cặn phôi hoặc rong rêu bám tắc lưới lọc 50 micron.</li>
            <li><strong>Bước 3:</strong> Đo dòng làm việc của motor bơm ly tâm làm mát (chuẩn 1.2A - 1.5A). Kiểm tra quạt gió tản nhiệt.</li>
            <li><strong>Bước 4:</strong> Dùng lưu lượng kế kiểm tra lưu lượng hồi về bình chiller, đảm bảo tối thiểu ≥ 12 L/min.</li>
            <li><strong>Bước 5:</strong> Khởi động spindle chạy rà không tải ở 3,000 RPM trong 10 phút, kiểm tra nhiệt độ vỏ trục ≤ 45°C.</li>
          </ol>
        </div>
      )}

      {/* Tab 3: Hình ảnh / Video */}
      {activeTab === 'media' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-2">
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <img src="/extracted/spindle_monitor.png" alt="Console" className="w-full h-32 object-cover" />
            <div className="p-1.5 text-[11px] text-slate-700 bg-white">Màn hình báo lỗi E210</div>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <img src="/extracted/photo_step1.png" alt="Filter" className="w-full h-32 object-cover" />
            <div className="p-1.5 text-[11px] text-slate-700 bg-white">Cụm lọc nước làm mát</div>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <img src="/extracted/photo_step3.png" alt="Pump" className="w-full h-32 object-cover" />
            <div className="p-1.5 text-[11px] text-slate-700 bg-white">Motor bơm tuần hoàn</div>
          </div>
        </div>
      )}

      {/* Tab 4: Kết quả & Đánh giá */}
      {activeTab === 'evaluation' && (
        <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-2">
          <div className="flex justify-between items-center py-1 border-b border-slate-200">
            <span className="text-slate-600">Thời gian khắc phục:</span>
            <span className="font-semibold text-slate-900">35 phút</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200">
            <span className="text-slate-600">Chi phí vật tư thay thế:</span>
            <span className="font-semibold text-slate-900">Lõi lọc 250,000 VNĐ</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600">Hiệu quả sau xử lý:</span>
            <span className="font-semibold text-emerald-600">Nhiệt độ ổn định 42°C, không tái diễn</span>
          </div>
        </div>
      )}

      {/* Tab 5: Thảo luận */}
      {activeTab === 'discussion' && (
        <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
              HA
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex-1">
              <div className="font-semibold text-slate-800">Hoàng Anh (Ca 2)</div>
              <div className="text-slate-600 mt-1">Đã áp dụng SOP này tuần trước trên máy CNC-02, hiệu quả rất tốt!</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
