import React from 'react';
import {
  HelpCircle,
  Calendar,
  CheckCheck,
  FileText,
  Download,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { IncidentItem } from '../types';

interface RightSidebarProps {
  incident: IncidentItem;
  onSelectSimilar?: (id: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  incident,
  onSelectSimilar,
}) => {
  return (
    <div className="flex flex-col gap-3.5 w-full select-none">
      {/* Widget 1: Thông tin đóng góp */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-xs tracking-tight">
            Thông tin đóng góp
          </h3>
        </div>

        {/* Contributor Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full ring-2 ring-blue-100 overflow-hidden bg-slate-100 flex-shrink-0">
            <img
              src={incident.author.avatar}
              alt={incident.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900 leading-tight">
              {incident.author.name}
            </h4>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
              {incident.author.role}
            </p>
          </div>
        </div>

        {/* Date Details */}
        <div className="space-y-1.5 pt-1 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span>Ngày đăng: <strong className="text-slate-800">{incident.author.postDate}</strong></span>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <CheckCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <span>Xác nhận: <strong className="text-slate-800">{incident.author.confirmDate}</strong></span>
              <div className="text-[11px] text-slate-500 font-normal">
                ({incident.author.confirmedBy})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Widget 2: Tài liệu liên quan (3) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-xs tracking-tight">
            Tài liệu liên quan ({incident.documents.length})
          </h3>
        </div>

        <div className="space-y-2">
          {incident.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* PDF Badge Icon */}
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 ${
                    doc.color === 'red' ? 'bg-[#ef4444]' : 'bg-[#8b5cf6]'
                  }`}
                >
                  PDF
                </div>
                <span className="text-xs text-slate-800 group-hover:text-blue-600 transition-colors truncate font-medium">
                  {doc.name}
                </span>
              </div>

              <button
                className="text-blue-600 hover:text-blue-700 p-1 flex-shrink-0 transition-colors"
                title="Tải về tài liệu"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Widget 3: Ca sự cố tương tự */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-xs tracking-tight">
            Ca sự cố tương tự
          </h3>
        </div>

        <div className="space-y-2.5">
          {incident.similar.map((sim) => (
            <div
              key={sim.id}
              onClick={() => onSelectSimilar && onSelectSimilar(sim.id)}
              className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-[46px] h-[38px] rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                  <img
                    src={sim.thumbnail}
                    alt={sim.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {sim.title}
                  </h5>
                  <p className="text-[10px] text-blue-600 font-medium truncate mt-0.5">
                    {sim.machine} | {sim.vendor}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
