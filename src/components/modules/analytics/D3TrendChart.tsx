import React, { useState, useMemo } from 'react';
import * as d3 from 'd3';

export interface MonthTrendDatum {
  month: string;
  fullMonth: string;
  count: number;
  pct: string;
  pctNum: number;
  growth: string;
  growthNum: number;
  appliedCount: string;
  highlight: string;
}

export const MONTH_TREND_DATA: MonthTrendDatum[] = [
  {
    month: 'T5',
    fullMonth: 'Tháng 5/2024',
    count: 1100,
    pct: '78%',
    pctNum: 78,
    growth: '+8.2% MoM',
    growthNum: 8.2,
    appliedCount: '858 ca',
    highlight: 'Bắt đầu chuyển đổi số hóa tri thức',
  },
  {
    month: 'T6',
    fullMonth: 'Tháng 6/2024',
    count: 1250,
    pct: '82%',
    pctNum: 82,
    growth: '+13.6% MoM',
    growthNum: 13.6,
    appliedCount: '1,025 ca',
    highlight: 'Chuẩn hóa quy trình bảo trì SOP',
  },
  {
    month: 'T7',
    fullMonth: 'Tháng 7/2024',
    count: 1380,
    pct: '85%',
    pctNum: 85,
    growth: '+10.4% MoM',
    growthNum: 10.4,
    appliedCount: '1,173 ca',
    highlight: 'Áp dụng chấm điểm 7 Vendor đối tác',
  },
  {
    month: 'T8',
    fullMonth: 'Tháng 8/2024',
    count: 1520,
    pct: '88%',
    pctNum: 88,
    growth: '+10.1% MoM',
    growthNum: 10.1,
    appliedCount: '1,337 ca',
    highlight: 'Quy trình kiểm định chất lượng 3 bước',
  },
  {
    month: 'T9',
    fullMonth: 'Tháng 9/2024',
    count: 1680,
    pct: '92%',
    pctNum: 92,
    growth: '+10.5% MoM',
    growthNum: 10.5,
    appliedCount: '1,545 ca',
    highlight: 'Tích hợp Trợ lý AI chẩn đoán sự cố',
  },
  {
    month: 'T10',
    fullMonth: 'Tháng 10/2024',
    count: 1850,
    pct: '95%',
    pctNum: 95,
    growth: '+10.1% MoM',
    growthNum: 10.1,
    appliedCount: '1,757 ca',
    highlight: 'Kỷ lục số hóa: +170 tri thức mới',
  },
];

export const D3TrendChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 380;
  const height = 138;
  const margin = { top: 16, right: 12, bottom: 22, left: 12 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // D3 Scales
  const { xScale, yCountScale, yPctScale, linePath, areaPath } = useMemo(() => {
    const x = d3
      .scaleBand<string>()
      .domain(MONTH_TREND_DATA.map((d) => d.month))
      .range([0, innerWidth])
      .padding(0.38);

    const yCount = d3
      .scaleLinear()
      .domain([0, 2100])
      .range([innerHeight, 0]);

    const yPct = d3
      .scaleLinear()
      .domain([65, 100])
      .range([innerHeight, 0]);

    const lineGen = d3
      .line<MonthTrendDatum>()
      .x((d) => (x(d.month) ?? 0) + x.bandwidth() / 2)
      .y((d) => yPct(d.pctNum))
      .curve(d3.curveMonotoneX);

    const areaGen = d3
      .area<MonthTrendDatum>()
      .x((d) => (x(d.month) ?? 0) + x.bandwidth() / 2)
      .y0(innerHeight)
      .y1((d) => yPct(d.pctNum))
      .curve(d3.curveMonotoneX);

    return {
      xScale: x,
      yCountScale: yCount,
      yPctScale: yPct,
      linePath: lineGen(MONTH_TREND_DATA) || '',
      areaPath: areaGen(MONTH_TREND_DATA) || '',
    };
  }, [innerWidth, innerHeight]);

  const activeDatum = hoveredIdx !== null ? MONTH_TREND_DATA[hoveredIdx] : null;

  return (
    <div className="relative w-full select-none">
      {/* Dual Axis SVG Chart */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-34 overflow-visible"
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1864f3" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="barGradientHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="pctAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Horizontal Reference Grid lines */}
          <line x1="0" y1={yPctScale(75)} x2={innerWidth} y2={yPctScale(75)} stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="0" y1={yPctScale(85)} x2={innerWidth} y2={yPctScale(85)} stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="0" y1={yPctScale(95)} x2={innerWidth} y2={yPctScale(95)} stroke="#f1f5f9" strokeDasharray="3 3" />

          {/* Area under Adoption Rate curve */}
          <path d={areaPath} fill="url(#pctAreaGradient)" />

          {/* Bars for Volume (Số lượng tri thức) */}
          {MONTH_TREND_DATA.map((d, i) => {
            const barX = xScale(d.month) ?? 0;
            const barY = yCountScale(d.count);
            const barHeight = innerHeight - barY;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={d.month}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Transparent Hover Hitbox */}
                <rect
                  x={barX - 4}
                  y="0"
                  width={xScale.bandwidth() + 8}
                  height={innerHeight + 20}
                  fill="transparent"
                />

                {/* Actual Bar */}
                <rect
                  x={barX}
                  y={barY}
                  width={xScale.bandwidth()}
                  height={barHeight}
                  rx="3"
                  fill={isHovered ? 'url(#barGradientHover)' : 'url(#barGradient)'}
                  className="transition-all duration-150"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 2px 6px rgba(24, 100, 243, 0.4))' : 'none',
                    opacity: hoveredIdx !== null && !isHovered ? 0.6 : 1,
                  }}
                />

                {/* X-Axis Month Label */}
                <text
                  x={barX + xScale.bandwidth() / 2}
                  y={innerHeight + 14}
                  textAnchor="middle"
                  className={`text-[10px] font-semibold transition-colors ${
                    isHovered ? 'fill-blue-600 font-bold' : 'fill-slate-500'
                  }`}
                >
                  {d.month}
                </text>
              </g>
            );
          })}

          {/* Spline Path for Adoption Rate (Tỷ lệ áp dụng) */}
          <path
            d={linePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points on Adoption Rate Line */}
          {MONTH_TREND_DATA.map((d, i) => {
            const cx = (xScale(d.month) ?? 0) + xScale.bandwidth() / 2;
            const cy = yPctScale(d.pctNum);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={`pt-${d.month}`}
                className="cursor-pointer pointer-events-none"
              >
                {/* Value Label above point */}
                <text
                  x={cx}
                  y={cy - 6}
                  textAnchor="middle"
                  className={`text-[9px] font-bold ${
                    isHovered ? 'fill-emerald-700 font-extrabold text-[10px]' : 'fill-emerald-600'
                  }`}
                >
                  {d.pct}
                </text>

                {/* Outer halo when active */}
                {isHovered && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="6.5"
                    fill="rgba(16, 185, 129, 0.25)"
                    className="animate-pulse"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 4.5 : 3}
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* D3 Dynamic Tooltip on Hover */}
      {activeDatum && hoveredIdx !== null && (
        <div
          className="absolute bottom-full mb-1 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-2.5 shadow-2xl pointer-events-none z-50 text-left w-56 animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: `${((hoveredIdx + 0.5) / MONTH_TREND_DATA.length) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="flex items-center justify-between border-b border-blue-500/20 pb-1 mb-1.5">
            <span className="text-[11px] font-bold text-white">{activeDatum.fullMonth}</span>
            <span className="text-[9.5px] font-bold text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
              {activeDatum.growth}
            </span>
          </div>
          <div className="text-[10px] text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-blue-500" />
                Tri thức mới:
              </span>
              <strong className="text-white font-semibold">
                {activeDatum.count.toLocaleString()} bài
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Tỷ lệ áp dụng:
              </span>
              <strong className="text-emerald-300 font-semibold">
                {activeDatum.pct} ({activeDatum.appliedCount})
              </strong>
            </div>
          </div>
          <div className="mt-1.5 pt-1 border-t border-blue-500/20 text-[9px] text-[#93c5fd]">
            {activeDatum.highlight}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-5 border-x-transparent border-t-5 border-t-[#0a1936]/95" />
        </div>
      )}
    </div>
  );
};
