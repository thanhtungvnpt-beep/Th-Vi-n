import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Database,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  Eye,
  FileText,
  AlertOctagon,
  Clock,
  UserCheck,
} from 'lucide-react';
import { LifecycleCase, UserRole, AiRecommendationRecord } from '../../../types';
import { AI_RECOMMENDATION_RECORDS } from '../../../data/mockData';

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

  const [aiRecords, setAiRecords] = useState<AiRecommendationRecord[]>(AI_RECOMMENDATION_RECORDS);
  const [selectedRecordId, setSelectedRecordId] = useState<string>('REC-AI-9021');
  const [filterInsufficientOnly, setFilterInsufficientOnly] = useState<boolean>(false);

  const filteredRecords = aiRecords.filter((r) => {
    if (filterInsufficientOnly && !r.insufficientEvidenceFlag) return false;
    return true;
  });

  const selectedRecord = aiRecords.find((r) => r.id === selectedRecordId) || aiRecords[0];

  const handleToggleReviewStatus = (recId: string) => {
    setAiRecords((prev) =>
      prev.map((r) =>
        r.id === recId
          ? {
              ...r,
              humanReviewStatus: r.humanReviewStatus === 'reviewed_valid' ? 'pending_review' : 'reviewed_valid',
            }
          : r
      )
    );
  };

  const handleToggleFeedback = (recId: string, feedback: 'helpful' | 'not_helpful') => {
    setAiRecords((prev) =>
      prev.map((r) => (r.id === recId ? { ...r, userFeedback: feedback } : r))
    );
  };

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
              Giám sát chất lượng đề xuất của trợ lý AI, 100% trích dẫn xuất phát từ SOP chuẩn hóa, phát hiện thiếu bằng chứng (Insufficient Evidence).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterInsufficientOnly(!filterInsufficientOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              filterInsufficientOnly
                ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                : 'bg-[#122858] border-[#22448a] text-slate-300 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Lọc ca cần bổ sung chứng cứ</span>
          </button>
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

      {/* TRACEABLE AI RECOMMENDATION LOG TABLE (SECTION 8 DELIVERABLE) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-0">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Nhật ký kiểm toán truy vấn & Đề xuất AI thời gian thực (Traceable AI Audit Log)
            </h3>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
              {filteredRecords.length} phiên truy vấn
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Giám sát độ tin cậy, gắn cờ thiếu bằng chứng & duyệt thủ công của chuyên gia
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#091738] text-slate-300 text-[11px] font-semibold">
              <tr>
                <th className="p-3 pl-4">Mã truy vấn & Máy</th>
                <th className="p-3">Câu hỏi kỹ thuật viên</th>
                <th className="p-3">SOP trích dẫn nguồn</th>
                <th className="p-3">Độ tin cậy</th>
                <th className="p-3">Cảnh báo an toàn</th>
                <th className="p-3">Duyệt chuyên gia</th>
                <th className="p-3 pr-4 text-right">Phản hồi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRecords.map((rec) => {
                const isSelected = rec.id === selectedRecordId;
                return (
                  <tr
                    key={rec.id}
                    onClick={() => setSelectedRecordId(rec.id)}
                    className={`hover:bg-purple-50/40 transition cursor-pointer ${
                      isSelected ? 'bg-purple-50/60' : ''
                    }`}
                  >
                    <td className="p-3 pl-4">
                      <div className="space-y-0.5">
                        <span className="font-mono font-bold text-purple-700 block">{rec.id}</span>
                        <div className="text-[11px] text-slate-600 font-semibold">
                          {rec.machineId} <span className="text-slate-400 font-normal">({rec.machineModel})</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{rec.timestamp}</span>
                      </div>
                    </td>

                    <td className="p-3 max-w-xs">
                      <p className="font-semibold text-slate-800 line-clamp-2">{rec.userQuestion}</p>
                      <p className="text-[11px] text-purple-700 mt-0.5 line-clamp-1 italic">
                        ↳ Đề xuất: {rec.recommendationText}
                      </p>
                    </td>

                    <td className="p-3">
                      <div className="space-y-1">
                        {rec.referencedArticles.map((art, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {art.articleId} ({art.version})
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="space-y-0.5">
                        <span className={`font-mono font-black text-xs ${
                          rec.confidenceScore >= 90
                            ? 'text-emerald-600'
                            : rec.confidenceScore >= 80
                            ? 'text-blue-600'
                            : 'text-amber-600'
                        }`}>
                          {rec.confidenceScore}%
                        </span>
                        {rec.insufficientEvidenceFlag && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-100 px-1 rounded block">
                            <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                            Thiếu chứng cứ
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3 max-w-xs">
                      {rec.safetyAlertInjected ? (
                        <div className="p-1.5 bg-rose-50 border border-rose-200 rounded text-[10px] text-rose-800 line-clamp-2 flex items-start gap-1">
                          <ShieldAlert className="w-3 h-3 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span>{rec.safetyAlertInjected}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400">Không có</span>
                      )}
                    </td>

                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleReviewStatus(rec.id)}
                        className={`px-2 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 ${
                          rec.humanReviewStatus === 'reviewed_valid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 animate-pulse'
                        }`}
                      >
                        <UserCheck className="w-3 h-3" />
                        <span>{rec.humanReviewStatus === 'reviewed_valid' ? 'Đã duyệt' : 'Chờ duyệt'}</span>
                      </button>
                    </td>

                    <td className="p-3 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleToggleFeedback(rec.id, 'helpful')}
                          className={`p-1 rounded hover:bg-emerald-50 ${
                            rec.userFeedback === 'helpful' ? 'text-emerald-600' : 'text-slate-400'
                          }`}
                          title="Hữu ích"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleFeedback(rec.id, 'not_helpful')}
                          className={`p-1 rounded hover:bg-rose-50 ${
                            rec.userFeedback === 'not_helpful' ? 'text-rose-600' : 'text-slate-400'
                          }`}
                          title="Chưa hữu ích"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
