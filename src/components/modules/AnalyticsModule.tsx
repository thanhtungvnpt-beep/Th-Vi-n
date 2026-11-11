import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Users,
  TrendingUp,
  ShieldCheck,
  Plus,
  ArrowRight,
  Eye,
  ThumbsUp,
  Bot,
  Wrench,
  Lightbulb,
  Clock,
} from 'lucide-react';
import { D3Sparkline } from './analytics/D3Sparkline';
import { D3DonutChart } from './analytics/D3DonutChart';
import { D3MachineBars } from './analytics/D3MachineBars';
import { D3TrendChart } from './analytics/D3TrendChart';
import { D3KnowledgeNetwork } from './analytics/D3KnowledgeNetwork';
import { D3Gauges } from './analytics/D3Gauges';

interface AnalyticsModuleProps {
  onNavigateTab: (tabId: string) => void;
  onOpenNewModal: () => void;
}

export const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({
  onNavigateTab,
  onOpenNewModal,
}) => {
  const [activeSubnav, setActiveSubnav] = useState('overview');

  return (
    <div className="space-y-3.5 select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a2c75] via-[#0f3d9c] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
        <div className="relative z-10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-[460px]">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              Tổng hợp tri thức
            </h1>
            <p className="text-[#bfd6ff] text-xs font-normal mt-1.5 leading-relaxed">
              Bức tranh toàn diện về tri thức kỹ thuật, sự cố, cải tiến và kinh nghiệm vận hành
            </p>
          </div>

          {/* 5 Stat KPI Cards with Custom D3 Interactive Tooltips */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 min-w-[500px]">
            {/* Stat 1: Tổng tri thức */}
            <div className="relative group/kpi cursor-pointer bg-[#123e93]/85 hover:bg-[#164bb3] transition-all duration-200 border border-blue-400/35 hover:border-blue-300 rounded-xl px-2.5 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#2368ee] text-white flex items-center justify-center mb-1 group-hover/kpi:scale-110 transition-transform">
                <BookOpen className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-base font-bold text-white tracking-tight leading-none mt-0.5">
                12,486
              </div>
              <div className="text-[10px] text-[#a9c7ff] font-medium mt-1">
                Tổng tri thức
              </div>

              {/* D3-Powered Tooltip Popup */}
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-68 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-3 shadow-2xl shadow-blue-950/80 pointer-events-none opacity-0 group-hover/kpi:opacity-100 group-hover/kpi:translate-y-0 translate-y-1 transition-all duration-200 z-50 text-left">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-1.5 mb-2">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    Tổng số tri thức số hóa
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    +18.4% MoM
                  </span>
                </div>

                {/* Embedded D3 Sparkline */}
                <div className="mb-2 bg-blue-950/40 rounded-lg p-1.5 border border-blue-400/20 flex items-center justify-between">
                  <span className="text-[9px] text-[#93c5fd]">Xu hướng 6 tháng:</span>
                  <D3Sparkline data={[10100, 10540, 11200, 11600, 12050, 12486]} width={110} height={24} color="#38bdf8" />
                </div>

                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between text-slate-300">
                    <span>Tài liệu kỹ thuật:</span>
                    <strong className="text-white font-semibold">4,320 (34.6%)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Ca xử lý sự cố:</span>
                    <strong className="text-white font-semibold">2,648 (21.2%)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Sáng kiến cải tiến:</span>
                    <strong className="text-white font-semibold">1,982 (15.9%)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Bài thảo luận diễn đàn:</span>
                    <strong className="text-white font-semibold">2,846 (22.8%)</strong>
                  </div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-blue-500/20 text-[9.5px] text-[#93c5fd] flex items-center justify-between">
                  <span>Chỉ tiêu Q4: 12,000</span>
                  <span className="text-emerald-400 font-bold">Đạt 104.1%</span>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#0a1936]/95" />
              </div>
            </div>

            {/* Stat 2: Đã phê duyệt */}
            <div className="relative group/kpi cursor-pointer bg-[#094c45]/85 hover:bg-[#0c5e55] transition-all duration-200 border border-emerald-400/35 hover:border-emerald-300 rounded-xl px-2.5 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#10b981] text-white flex items-center justify-center mb-1 group-hover/kpi:scale-110 transition-transform">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-base font-bold text-white tracking-tight leading-none mt-0.5">
                10,238
              </div>
              <div className="text-[10px] text-[#a7f3d0] font-medium mt-1">
                Đã phê duyệt
              </div>

              {/* D3-Powered Tooltip Popup */}
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-68 bg-[#062c26]/95 backdrop-blur-md border border-emerald-400/40 rounded-xl p-3 shadow-2xl shadow-emerald-950/80 pointer-events-none opacity-0 group-hover/kpi:opacity-100 group-hover/kpi:translate-y-0 translate-y-1 transition-all duration-200 z-50 text-left">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 mb-2">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Chuẩn hóa thẩm định
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    +22.5% MoM
                  </span>
                </div>

                {/* Embedded D3 Sparkline */}
                <div className="mb-2 bg-emerald-950/40 rounded-lg p-1.5 border border-emerald-400/20 flex items-center justify-between">
                  <span className="text-[9px] text-[#a7f3d0]">Tốc độ phê duyệt:</span>
                  <D3Sparkline data={[8200, 8600, 9100, 9450, 9800, 10238]} width={110} height={24} color="#34d399" />
                </div>

                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between text-slate-300">
                    <span>Tỷ lệ chuẩn hóa SOP:</span>
                    <strong className="text-emerald-300 font-semibold">82.0% tổng kho</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Thời gian duyệt TB:</span>
                    <strong className="text-white font-semibold">1.8 ngày (-35%)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Hàng đợi chờ duyệt:</span>
                    <strong className="text-amber-300 font-semibold">152 ca sự cố</strong>
                  </div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-emerald-500/20 text-[9.5px] text-[#a7f3d0] flex items-center justify-between">
                  <span>Thẩm định bởi Ban Kỹ thuật</span>
                  <span className="text-emerald-400 font-bold">Chất lượng 4.9★</span>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#062c26]/95" />
              </div>
            </div>

            {/* Stat 3: Thành viên */}
            <div className="relative group/kpi cursor-pointer bg-[#19326e]/85 hover:bg-[#20408d] transition-all duration-200 border border-blue-400/35 hover:border-blue-300 rounded-xl px-2.5 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#3b82f6] text-white flex items-center justify-center mb-1 group-hover/kpi:scale-110 transition-transform">
                <Users className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-base font-bold text-white tracking-tight leading-none mt-0.5">
                5,320
              </div>
              <div className="text-[10px] text-[#bfdbfe] font-medium mt-1">
                Thành viên
              </div>

              {/* D3-Powered Tooltip Popup */}
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-68 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-3 shadow-2xl shadow-blue-950/80 pointer-events-none opacity-0 group-hover/kpi:opacity-100 group-hover/kpi:translate-y-0 translate-y-1 transition-all duration-200 z-50 text-left">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-1.5 mb-2">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    Cơ cấu người dùng
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    +14.2% MoM
                  </span>
                </div>

                {/* Embedded D3 Sparkline */}
                <div className="mb-2 bg-blue-950/40 rounded-lg p-1.5 border border-blue-400/20 flex items-center justify-between">
                  <span className="text-[9px] text-[#bfdbfe]">Tăng trưởng User:</span>
                  <D3Sparkline data={[4200, 4450, 4680, 4920, 5100, 5320]} width={110} height={24} color="#60a5fa" />
                </div>

                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between text-slate-300">
                    <span>Kỹ thuật viên sàn xưởng:</span>
                    <strong className="text-white font-semibold">3,420 (64.3%)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Chuyên gia & Quản lý:</span>
                    <strong className="text-white font-semibold">1,280 (24.1%)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Kỹ sư 7 Vendor đối tác:</span>
                    <strong className="text-white font-semibold">620 (11.6%)</strong>
                  </div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-blue-500/20 text-[9.5px] text-[#93c5fd] flex items-center justify-between">
                  <span>Thành viên tích cực (MAU)</span>
                  <span className="text-blue-300 font-bold">4,180 (78.6%)</span>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#0a1936]/95" />
              </div>
            </div>

            {/* Stat 4: Tăng trưởng */}
            <div className="relative group/kpi cursor-pointer bg-[#163a82]/85 hover:bg-[#1d4aa6] transition-all duration-200 border border-indigo-400/35 hover:border-indigo-300 rounded-xl px-2.5 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#6366f1] text-white flex items-center justify-center mb-1 group-hover/kpi:scale-110 transition-transform">
                <TrendingUp className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-base font-bold text-white tracking-tight leading-none mt-0.5">
                +32%
              </div>
              <div className="text-[10px] text-[#c7d2fe] font-medium mt-1">
                Tăng trưởng
              </div>

              {/* D3-Powered Tooltip Popup */}
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-68 bg-[#111c44]/95 backdrop-blur-md border border-indigo-400/40 rounded-xl p-3 shadow-2xl shadow-indigo-950/80 pointer-events-none opacity-0 group-hover/kpi:opacity-100 group-hover/kpi:translate-y-0 translate-y-1 transition-all duration-200 z-50 text-left">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-1.5 mb-2">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                    Tốc độ số hóa tri thức
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Vượt mục tiêu
                  </span>
                </div>

                {/* Embedded D3 Sparkline */}
                <div className="mb-2 bg-indigo-950/40 rounded-lg p-1.5 border border-indigo-400/20 flex items-center justify-between">
                  <span className="text-[9px] text-[#c7d2fe]">Tốc độ Q3 -&gt; Q4:</span>
                  <D3Sparkline data={[18, 22, 25, 27, 29, 32]} width={110} height={24} color="#818cf8" />
                </div>

                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between text-slate-300">
                    <span>Mục tiêu quý IV:</span>
                    <strong className="text-slate-300 font-semibold">+23.5%</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Thực tế đạt được:</span>
                    <strong className="text-emerald-300 font-semibold">+32.0% (+8.5% Δ)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tăng trưởng mạnh nhất:</span>
                    <strong className="text-indigo-300 font-semibold">Cải tiến (+45.2%)</strong>
                  </div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-indigo-500/20 text-[9.5px] text-[#c7d2fe] flex items-center justify-between">
                  <span>Số ca mới/tuần TB</span>
                  <span className="text-indigo-300 font-bold">~285 bài đăng</span>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#111c44]/95" />
              </div>
            </div>

            {/* Stat 5: Tỷ lệ hữu ích */}
            <div className="relative group/kpi cursor-pointer bg-[#09462f]/85 hover:bg-[#0c593c] transition-all duration-200 border border-emerald-400/35 hover:border-emerald-300 rounded-xl px-2.5 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#059669] text-white flex items-center justify-center mb-1 group-hover/kpi:scale-110 transition-transform">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-base font-bold text-white tracking-tight leading-none mt-0.5">
                98%
              </div>
              <div className="text-[10px] text-[#a7f3d0] font-medium mt-1">
                Tỷ lệ hữu ích
              </div>

              {/* D3-Powered Tooltip Popup */}
              <div className="absolute bottom-full mb-2.5 right-0 sm:left-1/2 sm:-translate-x-1/2 w-68 bg-[#052b1e]/95 backdrop-blur-md border border-emerald-400/40 rounded-xl p-3 shadow-2xl shadow-emerald-950/80 pointer-events-none opacity-0 group-hover/kpi:opacity-100 group-hover/kpi:translate-y-0 translate-y-1 transition-all duration-200 z-50 text-left">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 mb-2">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Độ hài lòng kỹ thuật
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    +2.1% MoM
                  </span>
                </div>

                {/* Embedded D3 Sparkline */}
                <div className="mb-2 bg-emerald-950/40 rounded-lg p-1.5 border border-emerald-400/20 flex items-center justify-between">
                  <span className="text-[9px] text-[#a7f3d0]">Độ tín nhiệm kỹ thuật:</span>
                  <D3Sparkline data={[94, 95, 96, 96.5, 97.2, 98]} width={110} height={24} color="#10b981" />
                </div>

                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between text-slate-300">
                    <span>Lượt vote hữu ích:</span>
                    <strong className="text-emerald-300 font-semibold">14,280 / 14,570</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Đánh giá trung bình:</span>
                    <strong className="text-white font-semibold">4.9 / 5.0 ★</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tỷ lệ lỗi tái diễn:</span>
                    <strong className="text-emerald-300 font-semibold">&lt; 3.8% (-58%)</strong>
                  </div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-emerald-500/20 text-[9.5px] text-[#a7f3d0] flex items-center justify-between">
                  <span>Khảo sát 280 tổ kỹ thuật</span>
                  <span className="text-emerald-400 font-bold">Xác thực 100%</span>
                </div>
                <div className="absolute top-full right-4 sm:left-1/2 sm:-translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#052b1e]/95" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subnav Pills & Action */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'overview', label: 'Tổng quan' },
            { id: 'topics', label: 'Tri thức theo chủ đề' },
            { id: 'map', label: 'Bản đồ tri thức' },
            { id: 'trends', label: 'Xu hướng & phân tích' },
            { id: 'standard', label: 'Kho tri thức chuẩn' },
          ].map((tab) => {
            const isActive = activeSubnav === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubnav(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1864f3] text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2 bg-[#1864f3] hover:bg-[#1456d8] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm shadow-blue-500/25 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Đóng góp tri thức</span>
        </button>
      </div>

      {/* 3. ROW 1: 3 D3-POWERED ANALYTIC CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Box 1: Cơ cấu tri thức theo loại (D3 Donut Chart) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <h3 className="font-bold text-xs text-slate-900 tracking-tight">
                Cơ cấu tri thức theo loại
              </h3>
            </div>
            <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
              D3 Interactive
            </span>
          </div>

          {/* D3 Donut Chart with Hover Arc Expansion & Tooltip */}
          <D3DonutChart />
        </div>

        {/* Box 2: Tri thức theo thiết bị / dòng máy (D3 Machine Bars) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <h3 className="font-bold text-xs text-slate-900 tracking-tight">
                Tri thức theo thiết bị / dòng máy
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Chi tiết theo Model</span>
          </div>

          {/* D3-Scaled Machine Distribution Bars with Tooltips */}
          <D3MachineBars />
        </div>

        {/* Box 3: Xu hướng tri thức 6 tháng gần nhất (D3 Dual-Axis Chart) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <h3 className="font-bold text-xs text-slate-900 tracking-tight">
                Xu hướng tri thức (6 tháng gần nhất)
              </h3>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-sm bg-blue-600" />
                Số lượng
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Tỷ lệ áp dụng
              </span>
            </div>
          </div>

          {/* D3 Dual-Axis Spline + Bar Chart with Interactive Tooltip */}
          <D3TrendChart />
        </div>
      </div>

      {/* 4. ROW 2: Quick Topic Discovery, Featured Knowledge, AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left: Khám phá nhanh theo chủ đề */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h3 className="font-bold text-xs text-slate-900 tracking-tight">
              Khám phá nhanh theo chủ đề
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5 my-2">
            {/* Card 1: Tài liệu */}
            <div
              onClick={() => onNavigateTab('docs')}
              className="relative group/topic p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 hover:bg-blue-100/70 transition-all cursor-pointer flex flex-col justify-between"
            >
              <BookOpen className="w-5 h-5 text-blue-600 mb-1" />
              <div>
                <div className="text-[11px] font-semibold text-slate-700">Tài liệu</div>
                <div className="text-base font-bold text-blue-700 leading-tight">4,320</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-500 mt-1 group-hover/topic:translate-x-1 transition-transform" />

              {/* Tooltip */}
              <div className="absolute bottom-full mb-1.5 left-0 w-48 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-2 shadow-xl pointer-events-none opacity-0 group-hover/topic:opacity-100 transition-all duration-150 z-50 text-left">
                <div className="flex justify-between items-center text-[10px] font-bold text-white border-b border-blue-500/20 pb-0.5 mb-1">
                  <span>Thư viện tài liệu</span>
                  <span className="text-emerald-300 text-[8.5px]">+12.4% MoM</span>
                </div>
                <div className="text-[9px] text-slate-300">
                  <div>3,120 SOP/Manual chuẩn hóa</div>
                  <div>1,200 bản vẽ & sơ đồ điện</div>
                </div>
                <div className="absolute top-full left-4 w-0 h-0 border-x-3 border-x-transparent border-t-3 border-t-[#0a1936]/95" />
              </div>
            </div>

            {/* Card 2: Xử lý sự cố */}
            <div
              onClick={() => onNavigateTab('incidents')}
              className="relative group/topic p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100/70 transition-all cursor-pointer flex flex-col justify-between"
            >
              <Wrench className="w-5 h-5 text-amber-600 mb-1" />
              <div>
                <div className="text-[11px] font-semibold text-slate-700">Xử lý sự cố</div>
                <div className="text-base font-bold text-amber-700 leading-tight">2,648</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500 mt-1 group-hover/topic:translate-x-1 transition-transform" />

              {/* Tooltip */}
              <div className="absolute bottom-full mb-1.5 right-0 w-48 bg-[#0a1936]/95 backdrop-blur-md border border-amber-400/40 rounded-xl p-2 shadow-xl pointer-events-none opacity-0 group-hover/topic:opacity-100 transition-all duration-150 z-50 text-left">
                <div className="flex justify-between items-center text-[10px] font-bold text-white border-b border-amber-500/20 pb-0.5 mb-1">
                  <span>Sự cố kỹ thuật</span>
                  <span className="text-emerald-300 text-[8.5px]">+15.8% MoM</span>
                </div>
                <div className="text-[9px] text-slate-300">
                  <div>1,142 ca đã duyệt xác nhận</div>
                  <div>96.0% xử lý dứt điểm</div>
                </div>
                <div className="absolute top-full right-4 w-0 h-0 border-x-3 border-x-transparent border-t-3 border-t-[#0a1936]/95" />
              </div>
            </div>

            {/* Card 3: Cải tiến */}
            <div
              onClick={() => onNavigateTab('improvement')}
              className="relative group/topic p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-100/70 transition-all cursor-pointer flex flex-col justify-between"
            >
              <Lightbulb className="w-5 h-5 text-emerald-600 mb-1" />
              <div>
                <div className="text-[11px] font-semibold text-slate-700">Cải tiến</div>
                <div className="text-base font-bold text-emerald-700 leading-tight">1,982</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500 mt-1 group-hover/topic:translate-x-1 transition-transform" />

              {/* Tooltip */}
              <div className="absolute bottom-full mb-1.5 left-0 w-48 bg-[#0a1936]/95 backdrop-blur-md border border-emerald-400/40 rounded-xl p-2 shadow-xl pointer-events-none opacity-0 group-hover/topic:opacity-100 transition-all duration-150 z-50 text-left">
                <div className="flex justify-between items-center text-[10px] font-bold text-white border-b border-emerald-500/20 pb-0.5 mb-1">
                  <span>Sáng kiến Kaizen</span>
                  <span className="text-emerald-300 text-[8.5px]">+28.4% MoM</span>
                </div>
                <div className="text-[9px] text-slate-300">
                  <div>278 cải tiến đã áp dụng</div>
                  <div>1.42 tỷ VNĐ giá trị tiết kiệm</div>
                </div>
                <div className="absolute top-full left-4 w-0 h-0 border-x-3 border-x-transparent border-t-3 border-t-[#0a1936]/95" />
              </div>
            </div>

            {/* Card 4: Cộng đồng */}
            <div
              onClick={() => onNavigateTab('community')}
              className="relative group/topic p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 hover:bg-purple-100/70 transition-all cursor-pointer flex flex-col justify-between"
            >
              <Users className="w-5 h-5 text-purple-600 mb-1" />
              <div>
                <div className="text-[11px] font-semibold text-slate-700">Cộng đồng</div>
                <div className="text-base font-bold text-purple-700 leading-tight">2,846</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-purple-500 mt-1 group-hover/topic:translate-x-1 transition-transform" />

              {/* Tooltip */}
              <div className="absolute bottom-full mb-1.5 right-0 w-48 bg-[#0a1936]/95 backdrop-blur-md border border-purple-400/40 rounded-xl p-2 shadow-xl pointer-events-none opacity-0 group-hover/topic:opacity-100 transition-all duration-150 z-50 text-left">
                <div className="flex justify-between items-center text-[10px] font-bold text-white border-b border-purple-500/20 pb-0.5 mb-1">
                  <span>Hỏi đáp & Thảo luận</span>
                  <span className="text-emerald-300 text-[8.5px]">+9.6% MoM</span>
                </div>
                <div className="text-[9px] text-slate-300">
                  <div>1,982 bài đã có giải pháp</div>
                  <div>14.5 phút phản hồi trung bình</div>
                </div>
                <div className="absolute top-full right-4 w-0 h-0 border-x-3 border-x-transparent border-t-3 border-t-[#0a1936]/95" />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Tri thức nổi bật & được quan tâm */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h3 className="font-bold text-xs text-slate-900 tracking-tight">
              Tri thức nổi bật & được quan tâm
            </h3>
          </div>

          <div className="space-y-2.5 my-1">
            {/* Item 1 */}
            <div
              onClick={() => onNavigateTab('incidents')}
              className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src="/extracted/thumb_spindle.png" alt="Spindle" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    Xử lý lỗi E210 – Spindle quá nhiệt
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                    <span className="bg-purple-50 text-purple-700 font-semibold px-1.5 py-0.2 rounded">Xử lý sự cố</span>
                    <span>EDM-04</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-slate-500 font-medium flex-shrink-0">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 2,654</span>
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 328</span>
              </div>
            </div>

            {/* Item 2 */}
            <div
              onClick={() => onNavigateTab('improvement')}
              className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src="/extracted/thumb_servo.png" alt="Filter" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    Cải tiến hệ thống lọc dung dịch EDM
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                    <span className="bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.2 rounded">Cải tiến</span>
                    <span>EDM-04</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-slate-500 font-medium flex-shrink-0">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 2,031</span>
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 275</span>
              </div>
            </div>

            {/* Item 3 */}
            <div
              onClick={() => onNavigateTab('docs')}
              className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src="/extracted/thumb_hydraulic.png" alt="Maintenance" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    Quy trình bảo trì định kỳ EDM
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                    <span className="bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.2 rounded">Tài liệu</span>
                    <span>SOP</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-slate-500 font-medium flex-shrink-0">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 1,687</span>
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 246</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI – Tổng hợp & Gợi ý */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Bot className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-xs text-slate-900 tracking-tight">
              AI – Tổng hợp & Gợi ý
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-700 my-2">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span><strong>3 vấn đề sự cố lặp lại nhiều nhất:</strong> E210, AL-03, Overheat.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span><strong>5 cải tiến</strong> có thể mở rộng cho các line khác.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span><strong>2 tài liệu</strong> cần cập nhật phiên bản mới.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span>Đề xuất xây dựng thêm 3 bài hướng dẫn chi tiết.</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('ai-search')}
            className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-[#1864f3] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Xem chi tiết gợi ý AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. ROW 3: D3 Knowledge Network, D3 Gauges, Recent Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left: Bản đồ tri thức (D3 Knowledge Network) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <h3 className="font-bold text-xs text-slate-900 tracking-tight">
                Bản đồ tri thức (Knowledge Map)
              </h3>
            </div>
            <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
              D3 Network
            </span>
          </div>

          {/* D3 Visual Network Graph */}
          <D3KnowledgeNetwork />
        </div>

        {/* Center: Hiệu quả áp dụng tri thức (D3 Gauges) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <h3 className="font-bold text-xs text-slate-900 tracking-tight">
                Hiệu quả áp dụng tri thức
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Đo lường KPI thực tế</span>
          </div>

          {/* D3 Circular Arc Gauges with Detailed Tooltips */}
          <D3Gauges />
        </div>

        {/* Right: Hoạt động gần đây */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-xs text-slate-900 tracking-tight">
              Hoạt động gần đây
            </h3>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 my-1">
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium text-slate-800 line-clamp-1">
                Nguyễn Văn Minh đã đăng 1 bài xử lý sự cố
              </span>
              <span className="text-[10px] text-slate-400 flex-shrink-0">Vừa xong</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium text-slate-800 line-clamp-1">
                Bài "Cải tiến gá đặt CNC" đã được phê duyệt
              </span>
              <span className="text-[10px] text-slate-400 flex-shrink-0">10 phút trước</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium text-slate-800 line-clamp-1">
                Lê Anh Tuấn đã bình luận trong chủ đề "E210"
              </span>
              <span className="text-[10px] text-slate-400 flex-shrink-0">25 phút trước</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium text-slate-800 line-clamp-1">
                Cập nhật phiên bản SOP bảo trì EDM-04 (v2.3)
              </span>
              <span className="text-[10px] text-slate-400 flex-shrink-0">1 giờ trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
