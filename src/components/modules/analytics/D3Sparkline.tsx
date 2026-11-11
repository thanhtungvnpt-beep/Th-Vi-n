import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface D3SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
}

export const D3Sparkline: React.FC<D3SparklineProps> = ({
  data,
  width = 120,
  height = 32,
  color = '#38bdf8',
  fillColor = 'rgba(56, 189, 248, 0.15)',
}) => {
  const { linePath, areaPath, points } = useMemo(() => {
    if (!data || data.length < 2) return { linePath: '', areaPath: '', points: [] };

    const padding = 2;
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([padding, width - padding]);

    const yMin = d3.min(data) ?? 0;
    const yMax = d3.max(data) ?? 100;
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height - padding, padding]);

    const lineGenerator = d3
      .line<number>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3
      .area<number>()
      .x((_, i) => xScale(i))
      .y0(height)
      .y1((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    const pts = data.map((d, i) => ({
      x: xScale(i),
      y: yScale(d),
      val: d,
    }));

    return {
      linePath: lineGenerator(data) || '',
      areaPath: areaGenerator(data) || '',
      points: pts,
    };
  }, [data, width, height]);

  if (!linePath) return null;

  return (
    <svg width={width} height={height} className="overflow-visible pointer-events-none">
      <defs>
        <linearGradient id={`sparkline-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sparkline-grad-${color.replace('#', '')})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2.5"
          fill="#ffffff"
          stroke={color}
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
};
