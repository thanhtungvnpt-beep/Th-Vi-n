import React, { useState, useMemo } from 'react';
import * as d3 from 'd3';

export interface CategoryDatum {
  id: string;
  label: string;
  count: number;
  pct: string;
  pctNum: number;
  color: string;
  trend: string;
  breakdown: string[];
  downloadsOrSolves: string;
}

export const CATEGORY_DATA: CategoryDatum[] = [
  {
    id: 'docs',
    label: 'Tài liệu kỹ thuật',
    count: 4320,
    pct: '34.6%',
    pctNum: 34.6,
    color: '#3b82f6',
    trend: '+12.4% MoM',
    breakdown: ['Manual & SOP: 3,120 file', 'Sơ đồ điện & Bản vẽ: 1,200 file'],
    downloadsOrSolves: '18,450 lượt tải trong tháng',
  },
  {
    id: 'incidents',
    label: 'Xử lý sự cố',
    count: 2648,
    pct: '21.2%',
    pctNum: 21.2,
    color: '#f59e0b',
    trend: '+15.8% MoM',
    breakdown: ['Đã xác nhận: 1,142 ca (43.1%)', 'Chờ duyệt: 152 ca (5.7%)'],
    downloadsOrSolves: 'Tỷ lệ xử lý dứt điểm: 96.0%',
  },
  {
    id: 'improvements',
    label: 'Cải tiến kỹ thuật',
    count: 1982,
    pct: '15.9%',
    pctNum: 15.9,
    color: '#10b981',
    trend: '+28.4% MoM',
    breakdown: ['Đã áp dụng: 278 sáng kiến', 'Đã xác nhận: 187 sáng kiến'],
    downloadsOrSolves: 'Tiết kiệm: 1.42 tỷ VNĐ',
  },
  {
    id: 'community',
    label: 'Bài thảo luận',
    count: 2846,
    pct: '22.8%',
    pctNum: 22.8,
    color: '#8b5cf6',
    trend: '+9.6% MoM',
    breakdown: ['Đã có giải pháp: 1,982 bài (69.6%)', 'Thời gian phản hồi TB: 14.5m'],
    downloadsOrSolves: 'Tỷ lệ hài lòng: 98.2%',
  },
  {
    id: 'others',
    label: 'Khác',
    count: 690,
    pct: '5.5%',
    pctNum: 5.5,
    color: '#94a3b8',
    trend: '+4.1% MoM',
    breakdown: ['Tiêu chuẩn 5S & An toàn: 380 mục', 'Chứng chỉ hiệu chuẩn: 310 mục'],
    downloadsOrSolves: 'Chuẩn hóa định kỳ 6 tháng',
  },
];

export const D3DonutChart: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryDatum | null>(null);

  const totalCount = useMemo(() => {
    return CATEGORY_DATA.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  const size = 116;
  const outerRadius = size / 2 - 2;
  const innerRadius = outerRadius - 10;
  const hoverOuterRadius = outerRadius + 3;

  const arcs = useMemo(() => {
    const pie = d3
      .pie<CategoryDatum>()
      .value((d) => d.count)
      .sort(null)
      .padAngle(0.02);

    const normalArc = d3.arc<d3.PieArcDatum<CategoryDatum>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(2);

    const expandedArc = d3.arc<d3.PieArcDatum<CategoryDatum>>()
      .innerRadius(innerRadius - 1)
      .outerRadius(hoverOuterRadius)
      .cornerRadius(3);

    const pieData = pie(CATEGORY_DATA);

    return pieData.map((d) => {
      const isHovered = hoveredCategory?.id === d.data.id;
      return {
        datum: d.data,
        path: (isHovered ? expandedArc(d) : normalArc(d)) || '',
        centroid: normalArc.centroid(d),
      };
    });
  }, [innerRadius, outerRadius, hoverOuterRadius, hoveredCategory]);

  return (
    <div className="flex items-center justify-between gap-4 my-2">
      {/* Interactive D3 Donut Visual */}
      <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            {arcs.map(({ datum, path }) => {
              const isHovered = hoveredCategory?.id === datum.id;
              return (
                <path
                  key={datum.id}
                  d={path}
                  fill={datum.color}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    filter: isHovered ? `drop-shadow(0 2px 6px ${datum.color}80)` : 'none',
                    opacity: hoveredCategory && !isHovered ? 0.45 : 1,
                  }}
                  onMouseEnter={() => setHoveredCategory(datum)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              );
            })}
          </g>
        </svg>

        {/* Center Text (Interactive on Hover) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none transition-all">
          <span className="font-bold text-sm text-slate-900 leading-tight">
            {hoveredCategory ? hoveredCategory.count.toLocaleString() : totalCount.toLocaleString()}
          </span>
          <span className="text-[9px] text-slate-500 font-medium">
            {hoveredCategory ? hoveredCategory.pct : 'Tri thức'}
          </span>
        </div>

        {/* D3 Hover Floating Tooltip */}
        {hoveredCategory && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-2.5 shadow-2xl shadow-blue-950/80 pointer-events-none z-50 text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-1 mb-1.5">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredCategory.color }} />
                {hoveredCategory.label}
              </span>
              <span className="text-[9.5px] font-bold text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                {hoveredCategory.trend}
              </span>
            </div>
            <div className="text-[10px] text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Số lượng:</span>
                <strong className="text-white font-semibold">
                  {hoveredCategory.count.toLocaleString()} mục ({hoveredCategory.pct})
                </strong>
              </div>
              {hoveredCategory.breakdown.map((item, idx) => (
                <div key={idx} className="text-slate-400 pl-1 text-[9px]">• {item}</div>
              ))}
              <div className="flex justify-between text-blue-300 pt-0.5 border-t border-blue-500/20 text-[9px]">
                <span>Thực tế áp dụng:</span>
                <span className="font-medium text-emerald-400">{hoveredCategory.downloadsOrSolves}</span>
              </div>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-5 border-x-transparent border-t-5 border-t-[#0a1936]/95" />
          </div>
        )}
      </div>

      {/* Legend with direct hover integration */}
      <div className="space-y-1.5 text-[11px] flex-1">
        {CATEGORY_DATA.map((cat) => {
          const isHovered = hoveredCategory?.id === cat.id;
          return (
            <div
              key={cat.id}
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`flex items-center justify-between p-1 rounded-lg transition-all cursor-pointer ${
                isHovered ? 'bg-blue-50/80 shadow-2xs scale-[1.02]' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform"
                  style={{
                    backgroundColor: cat.color,
                    transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                  }}
                />
                <span className={`transition-colors ${isHovered ? 'font-bold text-blue-700' : 'text-slate-700'}`}>
                  {cat.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900">
                  {cat.count.toLocaleString()} ({cat.pct})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
