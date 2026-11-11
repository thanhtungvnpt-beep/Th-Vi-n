import React, { useState } from 'react';
import { BookOpen, Wrench, Layers, Users } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  count: number;
  pct: string;
  growth: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  details: string;
  pos: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'center';
  x: number;
  y: number;
}

const NODES: NetworkNode[] = [
  {
    id: 'center',
    name: 'Kho tri thức',
    count: 12486,
    pct: '100%',
    growth: '+18.4% MoM',
    color: '#1864f3',
    badgeBg: '',
    badgeBorder: '',
    badgeText: '',
    details: '10,238 mục chuẩn hóa • 18 Model thiết bị',
    pos: 'center',
    x: 140,
    y: 70,
  },
  {
    id: 'docs',
    name: 'Tài liệu (4,320)',
    count: 4320,
    pct: '34.6%',
    growth: '+12.4% MoM',
    color: '#3b82f6',
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-blue-700',
    details: '3,120 Manual/SOP • 1,200 sơ đồ kỹ thuật',
    pos: 'top-left',
    x: 52,
    y: 18,
  },
  {
    id: 'incidents',
    name: 'Sự cố (2,648)',
    count: 2648,
    pct: '21.2%',
    growth: '+15.8% MoM',
    color: '#f59e0b',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-700',
    details: '1,142 ca đã duyệt • 96% xử lý dứt điểm',
    pos: 'bottom-left',
    x: 52,
    y: 122,
  },
  {
    id: 'devices',
    name: 'Thiết bị (EDM/CNC)',
    count: 6328,
    pct: '50.7%',
    growth: '+16.8% MoM',
    color: '#10b981',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700',
    details: '18 dòng máy chính • Sodick, Fanuc, Makino',
    pos: 'top-right',
    x: 228,
    y: 18,
  },
  {
    id: 'vendors',
    name: 'Vendor (7 đơn vị)',
    count: 7,
    pct: '100% đối tác',
    growth: '+14.2% MoM',
    color: '#8b5cf6',
    badgeBg: 'bg-purple-50',
    badgeBorder: 'border-purple-200',
    badgeText: 'text-purple-700',
    details: '54,630 điểm cống hiến • KHV dẫn đầu',
    pos: 'bottom-right',
    x: 228,
    y: 122,
  },
];

export const D3KnowledgeNetwork: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  const centerNode = NODES.find((n) => n.id === 'center')!;
  const leafNodes = NODES.filter((n) => n.id !== 'center');

  return (
    <div className="py-3 flex items-center justify-center relative">
      <div className="relative w-full max-w-[280px] h-36 flex items-center justify-center select-none">
        {/* SVG Links */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {leafNodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id || hoveredNode?.id === 'center';
            return (
              <line
                key={`link-${node.id}`}
                x1={node.x}
                y1={node.y}
                x2={centerNode.x}
                y2={centerNode.y}
                stroke={isHovered ? node.color : '#bfdbfe'}
                strokeWidth={isHovered ? 2.5 : 1.25}
                strokeDasharray={isHovered ? 'none' : '3 3'}
                className="transition-all duration-200"
              />
            );
          })}
        </svg>

        {/* Center Core Node */}
        <div
          onMouseEnter={() => setHoveredNode(centerNode)}
          onMouseLeave={() => setHoveredNode(null)}
          className="relative cursor-pointer w-20 h-20 rounded-full bg-gradient-to-br from-[#1864f3] to-[#0d3fbd] text-white flex flex-col items-center justify-center z-20 shadow-lg text-center hover:scale-105 transition-transform"
        >
          <span className="text-[10px] font-medium leading-none">Kho tri thức</span>
          <span className="text-xs font-bold leading-tight mt-0.5">12,486</span>

          {hoveredNode?.id === 'center' && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-2.5 shadow-2xl pointer-events-none z-50 text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-1 mb-1">
                <span className="text-[10.5px] font-bold text-white">Trung tâm Tri thức</span>
                <span className="text-[9px] font-bold text-emerald-300 px-1 py-0.5 rounded bg-emerald-500/20">
                  {centerNode.growth}
                </span>
              </div>
              <div className="text-[9.5px] text-slate-300 space-y-0.5">
                <div>• {centerNode.count.toLocaleString()} bài viết kỹ thuật</div>
                <div>• {centerNode.details}</div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#0a1936]/95" />
            </div>
          )}
        </div>

        {/* Top Left: Tài liệu */}
        <div
          onMouseEnter={() => setHoveredNode(NODES[1])}
          onMouseLeave={() => setHoveredNode(null)}
          className="absolute top-0 left-0 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-2 py-1 text-[9px] font-semibold text-blue-700 flex items-center gap-1 shadow-2xs z-20 transition-all cursor-pointer"
        >
          <BookOpen className="w-3 h-3" />
          <span>Tài liệu (4,320)</span>

          {hoveredNode?.id === 'docs' && (
            <div className="absolute bottom-full mb-1.5 left-0 w-48 bg-[#0a1936]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-2 shadow-xl pointer-events-none z-50 text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center text-[10px] font-bold text-white border-b border-blue-500/20 pb-0.5 mb-1">
                <span>Tài liệu kỹ thuật</span>
                <span className="text-emerald-300 text-[8.5px]">{NODES[1].growth}</span>
              </div>
              <div className="text-[9px] text-slate-300">
                <div>{NODES[1].details}</div>
                <div className="text-blue-300 font-semibold mt-0.5">{NODES[1].pct} toàn kho</div>
              </div>
              <div className="absolute top-full left-4 w-0 h-0 border-x-3 border-x-transparent border-t-3 border-t-[#0a1936]/95" />
            </div>
          )}
        </div>

        {/* Bottom Left: Sự cố */}
        <div
          onMouseEnter={() => setHoveredNode(NODES[2])}
          onMouseLeave={() => setHoveredNode(null)}
          className="absolute bottom-0 left-0 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg px-2 py-1 text-[9px] font-semibold text-amber-700 flex items-center gap-1 shadow-2xs z-20 transition-all cursor-pointer"
        >
          <Wrench className="w-3 h-3" />
          <span>Sự cố (2,648)</span>

          {hoveredNode?.id === 'incidents' && (
            <div className="absolute top-full mt-1.5 left-0 w-48 bg-[#0a1936]/95 backdrop-blur-md border border-amber-400/40 rounded-xl p-2 shadow-xl pointer-events-none z-50 text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center text-[10px] font-bold text-white border-b border-amber-500/20 pb-0.5 mb-1">
                <span>Ca xử lý sự cố</span>
                <span className="text-emerald-300 text-[8.5px]">{NODES[2].growth}</span>
              </div>
              <div className="text-[9px] text-slate-300">
                <div>{NODES[2].details}</div>
                <div className="text-amber-300 font-semibold mt-0.5">{NODES[2].pct} toàn kho</div>
              </div>
              <div className="absolute bottom-full left-4 w-0 h-0 border-x-3 border-x-transparent border-b-3 border-b-[#0a1936]/95" />
            </div>
          )}
        </div>

        {/* Top Right: Thiết bị */}
        <div
          onMouseEnter={() => setHoveredNode(NODES[3])}
          onMouseLeave={() => setHoveredNode(null)}
          className="absolute top-0 right-0 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg px-2 py-1 text-[9px] font-semibold text-emerald-700 flex items-center gap-1 shadow-2xs z-20 transition-all cursor-pointer"
        >
          <Layers className="w-3 h-3" />
          <span>Thiết bị (EDM/CNC)</span>

          {hoveredNode?.id === 'devices' && (
            <div className="absolute bottom-full mb-1.5 right-0 w-48 bg-[#0a1936]/95 backdrop-blur-md border border-emerald-400/40 rounded-xl p-2 shadow-xl pointer-events-none z-50 text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center text-[10px] font-bold text-white border-b border-emerald-500/20 pb-0.5 mb-1">
                <span>18 Model thiết bị</span>
                <span className="text-emerald-300 text-[8.5px]">{NODES[3].growth}</span>
              </div>
              <div className="text-[9px] text-slate-300">
                <div>{NODES[3].details}</div>
                <div className="text-emerald-300 font-semibold mt-0.5">{NODES[3].pct} toàn kho</div>
              </div>
              <div className="absolute top-full right-4 w-0 h-0 border-x-3 border-x-transparent border-t-3 border-t-[#0a1936]/95" />
            </div>
          )}
        </div>

        {/* Bottom Right: Vendor */}
        <div
          onMouseEnter={() => setHoveredNode(NODES[4])}
          onMouseLeave={() => setHoveredNode(null)}
          className="absolute bottom-0 right-0 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg px-2 py-1 text-[9px] font-semibold text-purple-700 flex items-center gap-1 shadow-2xs z-20 transition-all cursor-pointer"
        >
          <Users className="w-3 h-3" />
          <span>Vendor (7 đơn vị)</span>

          {hoveredNode?.id === 'vendors' && (
            <div className="absolute top-full mt-1.5 right-0 w-48 bg-[#0a1936]/95 backdrop-blur-md border border-purple-400/40 rounded-xl p-2 shadow-xl pointer-events-none z-50 text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center text-[10px] font-bold text-white border-b border-purple-500/20 pb-0.5 mb-1">
                <span>7 Vendor đối tác</span>
                <span className="text-emerald-300 text-[8.5px]">{NODES[4].growth}</span>
              </div>
              <div className="text-[9px] text-slate-300">
                <div>{NODES[4].details}</div>
                <div className="text-purple-300 font-semibold mt-0.5">{NODES[4].pct}</div>
              </div>
              <div className="absolute bottom-full right-4 w-0 h-0 border-x-3 border-x-transparent border-b-3 border-b-[#0a1936]/95" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
