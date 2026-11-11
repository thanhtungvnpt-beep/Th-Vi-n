import React from 'react';
import { ThumbsUp, ArrowUpDown, ChevronDown } from 'lucide-react';
import { IncidentItem } from '../types';

interface IncidentListProps {
  incidents: IncidentItem[];
  selectedId: string;
  onSelect: (incident: IncidentItem) => void;
  totalCount?: number;
}

export const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  selectedId,
  onSelect,
  totalCount = 1376,
}) => {
  return (
    <div className="flex flex-col gap-2.5 w-full select-none">
      {/* Header with results count and sort */}
      <div className="flex items-center justify-between px-1">
        <span className="font-bold text-xs text-slate-800 tracking-tight">
          {totalCount.toLocaleString()} kết quả
        </span>

        <button className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200/90 rounded-lg px-2 py-1 shadow-2xs">
          <ArrowUpDown className="w-3 h-3 text-slate-500" />
          <span>Mới nhất</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      {/* Cards List */}
      <div className="space-y-2">
        {incidents.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`p-2.5 rounded-xl transition-all duration-150 cursor-pointer flex gap-2.5 relative ${
                isSelected
                  ? 'bg-white border-2 border-[#1864f3] shadow-md shadow-blue-500/10'
                  : 'bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xs'
              }`}
            >
              {/* Thumbnail */}
              <div className="w-[62px] h-[50px] rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200/60">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[12px] text-slate-900 leading-tight truncate">
                    {item.title}
                  </h4>
                  <div className="text-[10px] text-blue-600 font-medium leading-tight mt-1 truncate">
                    {item.machineId} | {item.vendor}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                  {/* Status Badge */}
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded-full inline-block ${
                      item.status === 'confirmed'
                        ? 'bg-[#10b981] text-white'
                        : item.status === 'pending'
                        ? 'bg-[#f59e0b] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.statusText}
                  </span>

                  {/* Likes / Popularity */}
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                    <ThumbsUp className="w-3 h-3 text-slate-400" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
