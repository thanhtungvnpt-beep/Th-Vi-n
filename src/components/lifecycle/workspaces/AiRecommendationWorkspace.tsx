import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Database,
  ThumbsUp,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { LifecycleCase, UserRole } from '../../../types';

interface AiRecommendationWorkspaceProps {
  cases: LifecycleCase[];
  selectedCase: LifecycleCase | null;
  onSelectCase: (c: LifecycleCase) => void;
  onDeployToField: (caseId: string) => void;
  currentRole: UserRole;
}

export const AiRecommendationWorkspace: React.FC<AiRecommendationWorkspaceProps> = ({
  cases,
  selectedCase,
  onSelectCase,
  onDeployToField,
  currentRole,
}) => {
  const stageCases = cases.filter((c) => c.currentStage === 'ai_recommendation');
  const activeCase =
    selectedCase?.currentStage === 'ai_recommendation' ? selectedCase : stageCases[0] || cases[0];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                STAGE 04
              </span>
              <h2 className="font-bold text-base text-white">Đề xuất AI & Giám sát Trích dẫn RAG (AI Recommendation Monitor)</h2>
            </div>
            <p className="text-xs text-[#9eb6e2] mt-0.5">
              Giám sát chất lượng đề xuất của trợ lý AI, đảm bảo 100% trích dẫn xuất phát từ SOP đã được chuyên gia phê duyệt.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">Phụ trách: <strong className="text-purple-300">AI Administrator</strong></span>
        </div>
      </div>

      {/* Grid: Queue & AI Monitor Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Col: Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Ca kích hoạt gợi ý AI ({stageCases.length})
            </span>
            <span className="text-[11px] font-mono text-purple-600 font-bold">RAG Matching</span>
          </div>

          <div className="space-y-2">
            {stageCases.length > 0 ? (
              stageCases.map((c) => {
                const isSelected = activeCase?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => onSelectCase(c)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-xs space-y-1.5 ${
                      isSelected
                        ? 'bg-purple-50/80 border-purple-500 shadow-xs ring-1 ring-purple-400'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-purple-700">{c.id}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-bold">
                        {c.aiRecommendation?.confidenceScore || 94}% Match
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 line-clamp-1">{c.title}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{c.equipmentId}</span>
                      <span className="text-emerald-600 font-bold">14 ca tương đồng</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Không có ca đang ở khâu đối soát AI.
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Cols: AI Diagnostic Analysis */}
        {activeCase ? (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 lg:p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="font-bold text-base text-slate-800">{activeCase.title}</h3>
                  <span className="text-xs text-slate-500">
                    Đối chiếu với tri thức nguồn: <strong className="text-purple-700 font-mono">{activeCase.aiRecommendation?.sourceKnowledgeId || 'SOP-CNC-M800-E210'}</strong>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Độ tương quan Vector</span>
                <span className="font-mono font-bold text-base text-emerald-600">
                  {activeCase.aiRecommendation?.confidenceScore || 94}%
                </span>
              </div>
            </div>

            {/* AI Recommendation Card */}
            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Nội dung khuyến nghị tự động cho kỹ thuật viên ca máy
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                  Nguồn xác thực 100%
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {activeCase.aiRecommendation?.safetyNotice ||
                  'Kiểm tra cốc lọc 10µm phía sau vách máy CNC-04. Khi nhiệt độ vượt 70°C, lưu lượng nước tuần hoàn phải >= 12 L/phút.'}
              </p>
            </div>

            {/* Verified Citation Sources Badge */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-blue-500" /> Tài liệu trích dẫn nguồn
                </span>
                <span className="font-mono font-bold text-slate-700 block">
                  {activeCase.aiRecommendation?.sourceKnowledgeId || 'SOP-CNC-M800-E210 (v2.1)'}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" /> Đánh giá từ Kỹ thuật viên
                </span>
                <span className="font-bold text-emerald-700 block">
                  Hữu ích (100% tỷ lệ áp dụng thành công)
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => onDeployToField(activeCase.id)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/20 transition flex items-center gap-2"
              >
                <span>Chuyển giao hướng dẫn xuống sàn máy (Stage 05 Áp dụng)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
