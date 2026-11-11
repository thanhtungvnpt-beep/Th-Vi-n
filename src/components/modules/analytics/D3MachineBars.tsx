import React, { useState } from 'react';
import * as d3 from 'd3';

export interface MachineDatum {
  id: string;
  code: string;
  name: string;
  fullName: string;
  count: number;
  pct: string;
  pctNum: number;
  trend: string;
  color: string;
  bgBadge: string;
  textBadge: string;
  models: { name: string; count: number; pct: string }[];
  note: string;
}

export const MACHINE_DATA: MachineDatum[] = [
  {
    id: 'edm',
    code: 'E',
    name: 'EDM',
    fullName: 'Máy cắt dây & xung điện EDM',
    count: 3486,
    pct: '27.9%',
    pctNum: 27.9,
    trend: '+16.8% MoM',
    color: '#3b82f6',
    bgBadge: 'bg-blue-100',
    textBadge: 'text-blue-700',
    models: [
      { name: 'Sodick (AQ, ALN, SLC)', count: 1420, pct: '40.7%' },
      { name: 'Makino (U3, U6, EDAF)', count: 1210, pct: '34.7%' },
      { name: 'Mitsubishi (MV, MP series)', count: 856, pct: '24.6%' },
    ],
    note: 'Số hóa 100% tài liệu vận hành & bảo dưỡng',
  },
  {
    id: 'cnc',
    code: 'C',
    name: 'CNC',
    fullName: 'Trung tâm gia công phay/tiện CNC',
    count: 2842,
    pct: '22.8%',
    pctNum: 22.8,
    trend: '+11.2% MoM',
    color: '#3b82f6',
    bgBadge: 'bg-blue-100',
    textBadge: 'text-blue-700',
    models: [
      { name: 'Fanuc Robodrill', count: 1180, pct: '41.5%' },
      { name: 'Okuma Genos / Millac', count: 940, pct: '33.1%' },
      { name: 'Mazak VTC / Integrex', count: 722, pct: '25.4%' },
    ],
    note: 'Mã lỗi Spindle E210, E208 chiếm 38% số ca',
  },
  {
    id: 'mold',
    code: 'M',
    name: 'MOLD',
    fullName: 'Khuôn mẫu chính xác (MOLD)',
    count: 1620,
    pct: '13.0%',
    pctNum: 13.0,
    trend: '+19.5% MoM',
    color: '#60a5fa',
    bgBadge: 'bg-blue-100',
    textBadge: 'text-blue-700',
    models: [
      { name: 'Khuôn ép nhựa kỹ thuật', count: 890, pct: '54.9%' },
      { name: 'Khuôn đột dập liên hoàn', count: 730, pct: '45.1%' },
    ],
    note: 'Tiêu chuẩn bề mặt đạt Ra ≤ 0.2µm',
  },
  {
    id: 'jig',
    code: 'J',
    name: 'JIG',
    fullName: 'Đồ gá & Chốt định vị (JIG)',
    count: 986,
    pct: '7.9%',
    pctNum: 7.9,
    trend: '+8.4% MoM',
    color: '#60a5fa',
    bgBadge: 'bg-blue-100',
    textBadge: 'text-blue-700',
    models: [
      { name: 'Đồ gá kẹp nhanh thủy lực', count: 540, pct: '54.8%' },
      { name: 'Đồ gá kiểm CMM tự động', count: 446, pct: '45.2%' },
    ],
    note: 'Rút ngắn 30% thời gian setup phôi CNC-02',
  },
  {
    id: 'others',
    code: 'K',
    name: 'Khác',
    fullName: 'Robot & Hệ thống phụ trợ',
    count: 3552,
    pct: '28.4%',
    pctNum: 28.4,
    trend: '+14.0% MoM',
    color: '#93c5fd',
    bgBadge: 'bg-slate-200',
    textBadge: 'text-slate-700',
    models: [
      { name: 'Hệ thống lọc & bơm làm mát', count: 1820, pct: '51.2%' },
      { name: 'Robot cấp phôi tự động', count: 980, pct: '27.6%' },
      { name: 'Máy nén khí & tủ biến tần', count: 752, pct: '21.2%' },
    ],
    note: 'Tối ưu chu kỳ bảo dưỡng lọc từ 7 -> 30 ngày',
  },
];

export const D3MachineBars: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<MachineDatum | null>(null);

  // D3 scale calculation
  const maxCount = d3.max(MACHINE_DATA, (d) => d.count) || 4000;
  const scale = d3.scaleLinear().domain([0, maxCount]).range([0, 100]);

  return (
    <div className="space-y-2.5 my-1 text-xs">
      {MACHINE_DATA.map((item) => {
        const isHovered = hoveredItem?.id === item.id;
        const widthPct = scale(item.count);

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative cursor-pointer space-y-1 p-1 -m-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-medium text-slate-800 flex items-center gap-1.5">
                <span
                  className={`w-3.5 h-3.5 rounded ${item.bgBadge} ${item.textBadge} flex items-center justify-center text-[9px] font-bold`}
                >
                  {item.code}
                </span>
                <span className={isHovered ? 'font-bold text-blue-700' : ''}>{item.name}</span>
              </span>
              <span className="font-semibold text-slate-900">
                {item.count.toLocaleString()}{' '}
                <span className="text-slate-400 font-normal">({item.pct})</span>
              </span>
            </div>

            {/* D3-scaled bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: isHovered ? '#1d4ed8' : item.color,
                  filter: isHovered ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' : 'none',
                }}
              />
            </div>

            {/* D3 Tooltip on Hover */}
            {isHovered && (
              <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 w-64 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-2.5 shadow-2xl pointer-events-none z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-1 mb-1.5">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    {item.fullName}
                  </span>
                  <span className="text-[9.5px] font-bold text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    {item.trend}
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Tổng số tri thức:</span>
                    <strong className="text-white">{item.count.toLocaleString()} mục ({item.pct})</strong>
                  </div>
                  <div className="pt-0.5 border-t border-blue-500/10 space-y-0.5">
                    {item.models.map((m, idx) => (
                      <div key={idx} className="flex justify-between text-[9px] text-slate-300">
                        <span>• {m.name}:</span>
                        <strong className="text-blue-200">{m.count.toLocaleString()} ({m.pct})</strong>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-1.5 pt-1 border-t border-blue-500/20 text-[9px] text-[#93c5fd]">
                  {item.note}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-5 border-x-transparent border-t-5 border-t-[#0a1936]/95" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
