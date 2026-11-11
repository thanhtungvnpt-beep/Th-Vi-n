import React, { useState } from 'react';
import * as d3 from 'd3';

export interface GaugeDatum {
  id: string;
  label: string;
  value: string;
  valueNum: number; // 0 to 100
  color: string;
  trackColor: string;
  bgLight: string;
  textColor: string;
  trend: string;
  sampleSize: string;
  benchmark: string;
  details: string[];
}

export const GAUGE_DATA: GaugeDatum[] = [
  {
    id: 'useful',
    label: 'Hữu ích',
    value: '98%',
    valueNum: 98,
    color: '#10b981',
    trackColor: '#d1fae5',
    bgLight: 'bg-emerald-50/50',
    textColor: 'text-emerald-700',
    trend: '+2.1% MoM',
    sampleSize: '14,280 / 14,570 lượt xác nhận',
    benchmark: 'Hạng A+ (Xuất sắc)',
    details: ['Điểm đánh giá TB: 4.9/5.0★', 'Tỷ lệ lỗi tái diễn: < 3.8%'],
  },
  {
    id: 'applied',
    label: 'Được áp dụng',
    value: '92%',
    valueNum: 92,
    color: '#3b82f6',
    trackColor: '#dbeafe',
    bgLight: 'bg-blue-50/50',
    textColor: 'text-blue-700',
    trend: '+4.8% MoM',
    sampleSize: '1,823 quy trình tại chuyền',
    benchmark: 'Đạt 102% mục tiêu',
    details: ['Tuân thủ quy trình SOP: 92.4%', 'Tiết kiệm TB: 35 phút/ca'],
  },
  {
    id: 'solved',
    label: 'Giải quyết sự cố',
    value: '86%',
    valueNum: 86,
    color: '#6366f1',
    trackColor: '#e0e7ff',
    bgLight: 'bg-indigo-50/50',
    textColor: 'text-indigo-700',
    trend: '+6.2% MoM',
    sampleSize: '2,288 ca không tái diễn',
    benchmark: 'First-Time-Fix: 86.4%',
    details: ['Thời gian MTTR giảm -42%', 'Dứt điểm lỗi lặp lại E210, AL-03'],
  },
  {
    id: 'growth',
    label: 'Tăng trưởng',
    value: '+32%',
    valueNum: 82, // relative visual scale
    color: '#14b8a6',
    trackColor: '#ccfbf1',
    bgLight: 'bg-teal-50/50',
    textColor: 'text-teal-700',
    trend: 'Vượt kế hoạch (+8.5% Δ)',
    sampleSize: 'Quý IV: 12,486 tri thức',
    benchmark: 'Dẫn đầu: Cải tiến (+45.2%)',
    details: ['Kế hoạch đề ra: +23.5%', 'Đóng góp 7 Vendor: +38.0%'],
  },
];

export const D3Gauges: React.FC = () => {
  const [hoveredGauge, setHoveredGauge] = useState<GaugeDatum | null>(null);

  const size = 52;
  const radius = size / 2;
  const strokeWidth = 4.5;
  const innerRadius = radius - strokeWidth;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-auto py-2">
      {GAUGE_DATA.map((gauge) => {
        const isHovered = hoveredGauge?.id === gauge.id;

        // D3 arc calculation
        const arcGenerator = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(radius)
          .startAngle(0)
          .cornerRadius(2.5);

        const backgroundArc = arcGenerator({
          endAngle: 2 * Math.PI,
        } as any) || '';

        const progressAngle = (gauge.valueNum / 100) * 2 * Math.PI;
        const progressArc = arcGenerator({
          endAngle: progressAngle,
        } as any) || '';

        return (
          <div
            key={gauge.id}
            onMouseEnter={() => setHoveredGauge(gauge)}
            onMouseLeave={() => setHoveredGauge(null)}
            className="relative cursor-pointer flex flex-col items-center text-center group"
          >
            {/* D3 Circular Gauge */}
            <div
              className={`relative w-13 h-13 rounded-full flex items-center justify-center transition-all duration-200 ${
                isHovered ? 'scale-110 shadow-sm' : ''
              }`}
            >
              <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Track Arc */}
                <path
                  d={backgroundArc}
                  fill={gauge.trackColor}
                  transform={`translate(${radius}, ${radius})`}
                />
                {/* Progress Value Arc */}
                <path
                  d={progressArc}
                  fill={gauge.color}
                  transform={`translate(${radius}, ${radius})`}
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 4px ${gauge.color}80)` : 'none',
                  }}
                />
              </svg>

              {/* Centered Value text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className={`font-bold text-xs ${gauge.textColor} tracking-tight`}>
                  {gauge.value}
                </span>
              </div>
            </div>

            <span
              className={`text-[10px] font-medium mt-1.5 transition-colors ${
                isHovered ? `${gauge.textColor} font-bold` : 'text-slate-600'
              }`}
            >
              {gauge.label}
            </span>

            {/* D3 Tooltip on Hover */}
            {isHovered && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-2.5 shadow-2xl pointer-events-none z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-1 mb-1.5">
                  <span className="text-[10.5px] font-bold text-white flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: gauge.color }} />
                    {gauge.label} ({gauge.value})
                  </span>
                  <span className="text-[9px] font-bold text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    {gauge.trend}
                  </span>
                </div>
                <div className="text-[9.5px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Mẫu đo lường:</span>
                    <strong className="text-white">{gauge.sampleSize}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiêu chuẩn:</span>
                    <strong className="text-emerald-400">{gauge.benchmark}</strong>
                  </div>
                  {gauge.details.map((item, idx) => (
                    <div key={idx} className="text-slate-400 pl-1 text-[9px]">• {item}</div>
                  ))}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#0a1936]/95" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
