import React from 'react';
import { ClipboardCheck, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a2c75] via-[#0f3d9c] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
      {/* Background Machining Laser Visual */}
      <div className="absolute inset-y-0 right-[420px] left-[340px] pointer-events-none hidden md:block overflow-hidden">
        <img
          src="/extracted/banner_spark.png"
          alt="EDM Machining Spark"
          className="w-full h-full object-cover object-center opacity-85 mix-blend-screen scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2c75] via-transparent to-[#1249be] pointer-events-none" />
      </div>

      <div className="relative z-10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Title and Subtitle */}
        <div className="max-w-[420px]">
          <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
            Thư viện xử lý sự cố
          </h1>
          <p className="text-[#bfd6ff] text-xs font-normal mt-1.5 leading-relaxed">
            Kinh nghiệm thực tế • Nguyên nhân • Quy trình kiểm tra • Giải pháp khắc phục
          </p>
        </div>

        {/* 4 Stat KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 min-w-[400px]">
          {/* Stat 1: Ca sự cố */}
          <div className="bg-[#123e93]/85 hover:bg-[#1546a3] border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all shadow-sm">
            <div className="w-5 h-5 rounded-md bg-[#2368ee] text-white flex items-center justify-center mb-1 shadow-inner">
              <ClipboardCheck className="w-3.5 h-3.5 stroke-[2.4]" />
            </div>
            <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
              1,376
            </div>
            <div className="text-[11px] text-[#a9c7ff] font-medium mt-1">
              Ca sự cố
            </div>
          </div>

          {/* Stat 2: Đã xác nhận */}
          <div className="bg-[#094c45]/85 hover:bg-[#0b5a51] border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all shadow-sm">
            <div className="w-5 h-5 rounded-md bg-[#10b981] text-white flex items-center justify-center mb-1 shadow-inner">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
            </div>
            <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
              1,142
            </div>
            <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
              Đã xác nhận
            </div>
          </div>

          {/* Stat 3: Chờ duyệt */}
          <div className="bg-[#4d360d]/85 hover:bg-[#5c4010] border border-amber-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all shadow-sm">
            <div className="w-5 h-5 rounded-md bg-[#f59e0b] text-white flex items-center justify-center mb-1 shadow-inner">
              <Clock className="w-3.5 h-3.5 stroke-[2.4]" />
            </div>
            <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
              152
            </div>
            <div className="text-[11px] text-[#fde68a] font-medium mt-1">
              Chờ duyệt
            </div>
          </div>

          {/* Stat 4: Tỷ lệ áp dụng */}
          <div className="bg-[#331e67]/85 hover:bg-[#3d247b] border border-indigo-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all shadow-sm">
            <div className="w-5 h-5 rounded-md bg-[#8b5cf6] text-white flex items-center justify-center mb-1 shadow-inner">
              <TrendingUp className="w-3.5 h-3.5 stroke-[2.4]" />
            </div>
            <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
              96%
            </div>
            <div className="text-[11px] text-[#ddd6fe] font-medium mt-1">
              Tỷ lệ áp dụng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
