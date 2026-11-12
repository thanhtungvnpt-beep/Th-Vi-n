import React, { useState } from 'react';
import {
  X,
  GitCompare,
  History,
  FileCheck2,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Plus,
  Minus,
  Edit3,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { KNOWLEDGE_DOCUMENT_VERSIONS } from '../../data/mockData';
import { KnowledgeDocumentVersion } from '../../types';

interface VersionComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId?: string;
  onRollbackVersion?: (versionTag: string) => void;
}

export const VersionComparisonModal: React.FC<VersionComparisonModalProps> = ({
  isOpen,
  onClose,
  documentId = 'SOP-CNC-M800-E210',
  onRollbackVersion,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(documentId);
  const [baseVersionTag, setBaseVersionTag] = useState<string>('v2.0');
  const [targetVersionTag, setTargetVersionTag] = useState<string>('v2.1');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const versions: KnowledgeDocumentVersion[] = KNOWLEDGE_DOCUMENT_VERSIONS;
  const baseVer = versions.find((v) => v.versionTag === baseVersionTag) || versions[1];
  const targetVer = versions.find((v) => v.versionTag === targetVersionTag) || versions[0];

  const handleRollback = (verTag: string) => {
    if (onRollbackVersion) {
      onRollbackVersion(verTag);
    }
    setActionFeedback(`Đã chuyển phiên bản hoạt động về ${verTag}. Lịch sử được lưu vết.`);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#0b1b42] border border-[#1d3a77] rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-[#1b3874] flex items-center justify-between bg-[#081534]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  QUẢN LÝ PHIÊN BẢN & SO SÁNH NỘI DUNG SOP (DIFF COMPARISON)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-cyan-300 border border-cyan-400/30 uppercase">
                  Traceable Version Control
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Mã tài liệu: <strong className="text-blue-300">{selectedDocId}</strong> — Quy trình kiểm tra Spindle quá nhiệt
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Feedback Toast */}
        {actionFeedback && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-5 py-2 text-xs font-semibold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Version Selector Bar */}
        <div className="p-4 bg-[#091738] border-b border-[#162d64] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-semibold">So sánh phiên bản cơ sở:</span>
            <select
              value={baseVersionTag}
              onChange={(e) => setBaseVersionTag(e.target.value)}
              className="bg-[#0b1f48] border border-[#1d3a77] text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400 font-mono font-bold"
            >
              {versions.map((v) => (
                <option key={`base-${v.id}`} value={v.versionTag}>
                  {v.versionTag} ({v.publishedAt}) — {v.status === 'published' ? 'Đang áp dụng' : v.status}
                </option>
              ))}
            </select>

            <span className="text-cyan-400 font-bold">➔ Với phiên bản đích:</span>
            <select
              value={targetVersionTag}
              onChange={(e) => setTargetVersionTag(e.target.value)}
              className="bg-[#0b1f48] border border-[#1d3a77] text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400 font-mono font-bold"
            >
              {versions.map((v) => (
                <option key={`target-${v.id}`} value={v.versionTag}>
                  {v.versionTag} ({v.publishedAt}) — {v.status === 'published' ? 'Đang áp dụng' : v.status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRollback(baseVersionTag)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#142d62] hover:bg-[#1c3e86] text-amber-300 border border-amber-400/30 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục về {baseVersionTag}</span>
            </button>
          </div>
        </div>

        {/* Content Body: Side by Side Diff */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#162d64] overflow-y-auto flex-1">
          {/* Base Version Column */}
          <div className="p-4 space-y-3 bg-[#081534]/50">
            <div className="flex items-center justify-between pb-2 border-b border-[#1b3874]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {baseVer.versionTag}
                </span>
                <span className="text-xs font-bold text-slate-300">Phiên bản gốc / cũ</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                baseVer.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
              }`}>
                {baseVer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div>Tác giả: <strong className="text-slate-200">{baseVer.author || baseVer.authorId}</strong></div>
              <div>Người duyệt: <strong className="text-slate-200">{baseVer.approver || baseVer.approverId}</strong></div>
              <div>Hiệu lực: <strong className="text-slate-200">{baseVer.publishedAt}</strong></div>
              <div>Hết hạn: <strong className="text-slate-200">{baseVer.validUntil || 'Chưa định'}</strong></div>
            </div>

            <div className="p-3 rounded-xl bg-[#0b1b42] border border-[#162d64] space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tóm tắt thay đổi
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{baseVer.changeSummary}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#0b1b42] border border-[#162d64] space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Nội dung quy trình
              </span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed bg-[#061026] p-2.5 rounded-lg border border-slate-800">
                {baseVer.contentPayload}
              </p>
            </div>
          </div>

          {/* Target Version Column (with Highlighting) */}
          <div className="p-4 space-y-3 bg-[#081534]/50">
            <div className="flex items-center justify-between pb-2 border-b border-[#1b3874]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-blue-600 text-white">
                  {targetVer.versionTag}
                </span>
                <span className="text-xs font-bold text-white">Phiên bản mới / so sánh</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                targetVer.status === 'published' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-slate-700 text-slate-400'
              }`}>
                {targetVer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div>Tác giả: <strong className="text-slate-200">{targetVer.author || targetVer.authorId}</strong></div>
              <div>Người duyệt: <strong className="text-slate-200">{targetVer.approver || targetVer.approverId}</strong></div>
              <div>Hiệu lực: <strong className="text-slate-200">{targetVer.publishedAt}</strong></div>
              <div>Hết hạn: <strong className="text-slate-200">{targetVer.validUntil || 'Chưa định'}</strong></div>
            </div>

            <div className="p-3 rounded-xl bg-[#0b1b42] border border-[#162d64] space-y-1.5">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                Tóm tắt thay đổi bản nâng cấp
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">{targetVer.changeSummary}</p>
            </div>

            {/* Differential Changes Checklist */}
            <div className="p-3 rounded-xl bg-[#061026] border border-blue-500/30 space-y-2">
              <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <GitCompare className="w-3.5 h-3.5" /> Chi tiết các điểm khác biệt (Diff Patches)
              </span>

              {/* Added */}
              {targetVer.diffPatch && targetVer.diffPatch.added.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Plus className="w-3 h-3 text-emerald-400" /> Bổ sung mới ({targetVer.diffPatch.added.length})
                  </span>
                  {targetVer.diffPatch.added.map((item: string, i: number) => (
                    <div
                      key={`add-${i}`}
                      className="text-xs bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 p-2 rounded-lg flex items-start gap-1.5"
                    >
                      <span className="text-emerald-400 font-bold">+</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Modified */}
              {targetVer.diffPatch && targetVer.diffPatch.modified.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Edit3 className="w-3 h-3 text-amber-400" /> Điều chỉnh thông số ({targetVer.diffPatch.modified.length})
                  </span>
                  {targetVer.diffPatch.modified.map((item: string, i: number) => (
                    <div
                      key={`mod-${i}`}
                      className="text-xs bg-amber-950/40 border border-amber-500/40 text-amber-200 p-2 rounded-lg flex items-start gap-1.5"
                    >
                      <span className="text-amber-400 font-bold">~</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Removed */}
              {targetVer.diffPatch && targetVer.diffPatch.removed.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                    <Minus className="w-3 h-3 text-rose-400" /> Loại bỏ / Hủy bỏ ({targetVer.diffPatch.removed.length})
                  </span>
                  {targetVer.diffPatch.removed.map((item: string, i: number) => (
                    <div
                      key={`rem-${i}`}
                      className="text-xs bg-rose-950/40 border border-rose-500/40 text-rose-200 p-2 rounded-lg flex items-start gap-1.5"
                    >
                      <span className="text-rose-400 font-bold">-</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-[#0b1b42] border border-[#162d64] space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Nội dung hoàn chỉnh ({targetVer.versionTag})
              </span>
              <p className="text-xs text-slate-200 font-mono leading-relaxed bg-[#061026] p-2.5 rounded-lg border border-blue-500/30">
                {targetVer.contentPayload}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1b3874] bg-[#081534] flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Mọi thay đổi phiên bản SOP đều được ký số và đồng bộ tự động xuống trạm AI Assistant.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-600/30"
          >
            Đóng bảng so sánh
          </button>
        </div>
      </div>
    </div>
  );
};
