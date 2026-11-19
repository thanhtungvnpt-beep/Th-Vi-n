import React from 'react';
import {
  Cpu,
  Zap,
  Settings,
  Gauge,
  Wrench,
  Flame,
  RefreshCw,
  Layers,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { BookSpineTheme, MachineBook } from '../../types';

interface BookSpineCardProps {
  book: MachineBook;
  isHighlighted?: boolean;
  onSelectBook: (book: MachineBook) => void;
}

const SPINE_STYLES: Record<
  BookSpineTheme,
  {
    gradient: string;
    border: string;
    codeBg: string;
    codeText: string;
    footerBg: string;
    footerBorder: string;
    footerText: string;
    iconColor: string;
  }
> = {
  cobalt: {
    gradient: 'from-[#1d4ed8] to-[#1e3a8a]',
    border: 'border-[#60a5fa]/45',
    codeBg: 'bg-[#0f172a]/85',
    codeText: 'text-[#dbeafe]',
    footerBg: 'bg-[#172554]',
    footerBorder: 'border-[#93c5fd]/30',
    footerText: 'text-[#fde047]',
    iconColor: 'text-[#93c5fd]',
  },
  navy: {
    gradient: 'from-[#1e3a8a] to-[#0c1a40]',
    border: 'border-[#60a5fa]/40',
    codeBg: 'bg-[#0f172a]/85',
    codeText: 'text-[#dbeafe]',
    footerBg: 'bg-[#0f172a]',
    footerBorder: 'border-[#60a5fa]/30',
    footerText: 'text-[#bfdbfe]',
    iconColor: 'text-[#93c5fd]',
  },
  sky: {
    gradient: 'from-[#0284c7] to-[#0c4a6e]',
    border: 'border-[#38bdf8]/45',
    codeBg: 'bg-[#082f49]/85',
    codeText: 'text-[#e0f2fe]',
    footerBg: 'bg-[#082f49]',
    footerBorder: 'border-[#38bdf8]/35',
    footerText: 'text-[#bae6fd]',
    iconColor: 'text-[#7dd3fc]',
  },
  slate: {
    gradient: 'from-[#334155] to-[#0f172a]',
    border: 'border-[#94a3b8]/45',
    codeBg: 'bg-[#020617]/85',
    codeText: 'text-[#e2e8f0]',
    footerBg: 'bg-[#020617]',
    footerBorder: 'border-[#475569]/45',
    footerText: 'text-[#fde047]',
    iconColor: 'text-[#38bdf8]',
  },
  emerald: {
    gradient: 'from-[#065f46] to-[#022c22]',
    border: 'border-[#34d399]/45',
    codeBg: 'bg-[#022c22]/85',
    codeText: 'text-[#d1fae5]',
    footerBg: 'bg-[#044e3a]',
    footerBorder: 'border-[#34d399]/35',
    footerText: 'text-[#a7f3d0]',
    iconColor: 'text-[#6ee7b7]',
  },
  purple: {
    gradient: 'from-[#581c87] to-[#2e1065]',
    border: 'border-[#c084fc]/45',
    codeBg: 'bg-[#2e1065]/85',
    codeText: 'text-[#fae8ff]',
    footerBg: 'bg-[#3b0764]',
    footerBorder: 'border-[#a855f7]/40',
    footerText: 'text-[#f5d0fe]',
    iconColor: 'text-[#f5d0fe]',
  },
  crimson: {
    gradient: 'from-[#b81d1d] to-[#6b0808]',
    border: 'border-[#f87171]/45',
    codeBg: 'bg-[#450a0a]/85',
    codeText: 'text-[#fee2e2]',
    footerBg: 'bg-[#450a0a]',
    footerBorder: 'border-[#f87171]/35',
    footerText: 'text-[#fecaca]',
    iconColor: 'text-[#fca5a5]',
  },
  amber: {
    gradient: 'from-[#a15502] to-[#612f00]',
    border: 'border-[#fbbf24]/45',
    codeBg: 'bg-[#422006]/85',
    codeText: 'text-[#fef08a]',
    footerBg: 'bg-[#783c02]',
    footerBorder: 'border-[#eab308]/40',
    footerText: 'text-[#fef9c3]',
    iconColor: 'text-[#fef08a]',
  },
};

function renderMachineIcon(iconName: MachineBook['iconName'], className: string) {
  switch (iconName) {
    case 'precision':
      return <Cpu className={className} />;
    case 'bolt':
      return <Zap className={className} />;
    case 'settings':
      return <Settings className={className} />;
    case 'speed':
      return <Gauge className={className} />;
    case 'build':
      return <Wrench className={className} />;
    case 'flare':
      return <Flame className={className} />;
    case 'sync':
      return <RefreshCw className={className} />;
    case 'token':
    default:
      return <Layers className={className} />;
  }
}

export const BookSpineCard: React.FC<BookSpineCardProps> = ({
  book,
  isHighlighted = false,
  onSelectBook,
}) => {
  const theme = SPINE_STYLES[book.spineTheme] || SPINE_STYLES.cobalt;

  return (
    <button
      type="button"
      onClick={() => onSelectBook(book)}
      id={`library-book-${book.id}`}
      className={`group relative w-full text-left rounded-t-lg bg-gradient-to-b ${theme.gradient} text-white flex flex-col justify-between p-2.5 transition-all duration-200 cursor-pointer border-t-2 border-l-2 border-r-2 ${
        isHighlighted
          ? 'h-[256px] -translate-y-2.5 ring-4 ring-[#fde047] ring-offset-2 ring-offset-[#f7f2ea] border-[#fde047] shadow-2xl z-20'
          : `h-[250px] ${theme.border} shadow-md hover:shadow-xl hover:-translate-y-2`
      }`}
      title={`${book.machineName} — Nhấp để mở sổ tay 52 tuần`}
    >
      {/* Spotlight Found Locator Badge */}
      {isHighlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#fde047] text-[#0b1c30] font-mono text-[9px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1 whitespace-nowrap">
          <MapPin className="w-2.5 h-2.5 text-[#004ac6] stroke-[2.6]" />
          <span>ĐÃ TÌM THẤY • VỊ TRÍ NÀY</span>
        </div>
      )}

      {/* Top Row: Asset Code + Points Badge or Icon */}
      <div className={`flex items-center justify-between gap-1 ${isHighlighted ? 'pt-1' : ''}`}>
        <span
          className={`px-1.5 py-0.5 rounded ${theme.codeBg} text-[9px] font-mono font-bold tracking-wider ${theme.codeText} truncate max-w-[92px]`}
        >
          {book.assetCode}
        </span>

        {book.badgeTopRight ? (
          <span className="px-1.5 py-0.5 rounded bg-[#0284c7] text-white text-[9px] font-mono font-bold tracking-tight shrink-0 shadow-xs">
            {book.badgeTopRight}
          </span>
        ) : (
          renderMachineIcon(
            book.iconName,
            `w-4 h-4 shrink-0 ${isHighlighted ? 'text-[#fcd34d]' : theme.iconColor}`
          )
        )}
      </div>

      {/* Middle Spine Title & Metrics */}
      <div className="my-auto text-center flex flex-col items-center px-0.5 gap-1">
        {isHighlighted && (
          <span className="text-[9px] font-mono text-[#fde047] font-semibold uppercase tracking-wide">
            Kệ 0{book.cabinetShelfNo} • Vị trí #0{book.positionIndex}
          </span>
        )}

        <h3 className="text-[11px] leading-snug font-bold tracking-normal uppercase text-white drop-shadow-xs line-clamp-3">
          {book.machineName}
        </h3>

        <span
          className={`text-[10px] font-mono font-semibold tabular-nums mt-0.5 ${
            isHighlighted
              ? 'text-white bg-white/20 px-1.5 py-0.5 rounded'
              : 'text-[#fef08a]'
          }`}
        >
          Đạt: {book.completionRate.toFixed(1)}%
        </span>

        <span className="text-[9px] font-mono text-white/75 line-clamp-2 leading-tight">
          {book.specSubtitle}
        </span>

        <span className="text-[9px] font-mono text-white/60 uppercase">
          {book.plant} • {book.solutionPagesCount} trang
        </span>
      </div>

      {/* Bottom Spine Label Band */}
      <div
        className={`-mx-2.5 -mb-2.5 py-1.5 px-1.5 ${theme.footerBg} text-center border-t ${theme.footerBorder}`}
      >
        <span
          className={`text-[9px] font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-1 truncate ${
            book.adminErrorCount > 0 ? 'text-[#fde047]' : theme.footerText
          }`}
        >
          {book.adminErrorCount > 0 && (
            <CheckCircle2 className="w-3 h-3 shrink-0 text-[#fde047]" />
          )}
          <span className="truncate">{book.footerTag}</span>
        </span>
      </div>
    </button>
  );
};
