import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquarePlus,
  CheckCircle2,
  Award,
  Trophy,
  Send,
  Plus,
  X,
} from 'lucide-react';
import { CrossPlantSosItem, WeeklyLeaderboardEntry } from '../../types';

interface CommunitySosLeaderboardProps {
  sosItems: CrossPlantSosItem[];
  leaderboard: WeeklyLeaderboardEntry[];
  onCreateSos: (newSos: {
    title: string;
    machineAssetCode: string;
    oemName: string;
    errorCode: string;
    plant: 'SEV' | 'P1' | 'P2';
    description: string;
  }) => void;
  onAddSosAnswer: (sosId: string, content: string, authorName: string, plant: 'SEV' | 'P1' | 'P2') => void;
  onAcceptSosAnswer: (sosId: string, answerId: string) => void;
}

export const CommunitySosLeaderboard: React.FC<CommunitySosLeaderboardProps> = ({
  sosItems,
  leaderboard,
  onCreateSos,
  onAddSosAnswer,
  onAcceptSosAnswer,
}) => {
  const [plantFilter, setPlantFilter] = useState<'ALL' | 'SEV' | 'P1' | 'P2'>('ALL');
  const [showNewSosForm, setShowNewSosForm] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newAssetCode, setNewAssetCode] = useState('BK-DMU-50');
  const [newOem, setNewOem] = useState('DMG MORI');
  const [newErrorCode, setNewErrorCode] = useState('');
  const [newPlant, setNewPlant] = useState<'SEV' | 'P1' | 'P2'>('SEV');
  const [newDesc, setNewDesc] = useState('');

  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const filteredSos = sosItems.filter((item) =>
    plantFilter === 'ALL' ? true : item.plant === plantFilter
  );

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.weeklyPoints - a.weeklyPoints);

  const handleSubmitSos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newErrorCode.trim()) return;
    onCreateSos({
      title: newTitle.trim(),
      machineAssetCode: newAssetCode.trim().toUpperCase(),
      oemName: newOem.trim(),
      errorCode: newErrorCode.trim().toUpperCase(),
      plant: newPlant,
      description: newDesc.trim() || 'Cần KTV các nhà máy hỗ trợ kiểm tra nguyên nhân.',
    });
    setNewTitle('');
    setNewErrorCode('');
    setNewDesc('');
    setShowNewSosForm(false);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
      {/* Left: Cross-Plant Technical SOS */}
      <div className="xl:col-span-7 space-y-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#1864f3]" />
              <span>Cộng Đồng Kỹ Thuật Liên Nhà Máy (Cross-Plant Technical SOS)</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Hỗ trợ xử lý ca lỗi hiếm giữa SEV, P1, P2 — Cộng điểm đóng góp ngay khi xác nhận
              hiệu quả
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowNewSosForm((prev) => !prev)}
            className="px-3.5 py-2 rounded-xl bg-[#1864f3] hover:bg-[#1456d8] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Đăng ca SOS mới</span>
          </button>
        </div>

        {/* Plant Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {(['ALL', 'SEV', 'P1', 'P2'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlantFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                plantFilter === p
                  ? 'bg-[#091738] text-white border-[#091738]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {p === 'ALL' ? 'Tất cả nhà máy' : `Nhà máy ${p}`}
            </button>
          ))}
        </div>

        {/* Create SOS Form */}
        {showNewSosForm && (
          <form
            onSubmit={handleSubmitSos}
            className="bg-white rounded-2xl p-4 border-2 border-blue-200 shadow-sm space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Gửi yêu cầu hỗ trợ kỹ thuật SOS</h4>
              <button
                type="button"
                onClick={() => setShowNewSosForm(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <input
                type="text"
                value={newAssetCode}
                onChange={(e) => setNewAssetCode(e.target.value)}
                placeholder="Mã sách máy"
                className="h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono uppercase outline-none"
              />
              <input
                type="text"
                value={newOem}
                onChange={(e) => setNewOem(e.target.value)}
                placeholder="Hãng OEM"
                className="h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 outline-none"
              />
              <input
                type="text"
                value={newErrorCode}
                onChange={(e) => setNewErrorCode(e.target.value)}
                placeholder="Mã lỗi OEM *"
                className="h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono uppercase outline-none"
                required
              />
              <select
                value={newPlant}
                onChange={(e) => setNewPlant(e.target.value as 'SEV' | 'P1' | 'P2')}
                className="h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 outline-none"
              >
                <option value="SEV">Nhà máy SEV</option>
                <option value="P1">Nhà máy P1</option>
                <option value="P2">Nhà máy P2</option>
              </select>
            </div>

            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Tiêu đề câu hỏi SOS kỹ thuật *"
              className="w-full h-9 px-2.5 rounded-lg bg-slate-50 border border-slate-200 outline-none"
              required
            />

            <textarea
              rows={2}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Mô tả điều kiện chạy máy, vật liệu phôi và các bước đã thử..."
              className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 outline-none"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1864f3] hover:bg-[#1456d8] text-white font-semibold cursor-pointer"
              >
                Phát Tín Hiệu SOS Liên Nhà Máy
              </button>
            </div>
          </form>
        )}

        {/* SOS Thread Cards */}
        {filteredSos.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 text-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#091738] text-white font-mono text-[10px] font-bold">
                  {item.machineAssetCode}
                </span>
                <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-mono text-[10px] font-bold">
                  {item.errorCode}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold">
                  {item.plant} • {item.oemName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">
                  +{item.bountyPoints} PTS
                </span>
                {item.status === 'solved' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Đã giải quyết
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                    Đang chờ giải pháp
                  </span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">{item.description}</p>
              <div className="text-[11px] text-slate-500 mt-1">
                Người hỏi: <strong className="text-slate-800">{item.askedBy}</strong> (
                {item.askedByRole}) • {item.createdAt}
              </div>
            </div>

            {/* Answers */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {item.answers.map((ans) => (
                <div
                  key={ans.id}
                  className={`p-3 rounded-xl border ${
                    ans.isAccepted
                      ? 'bg-emerald-50/90 border-emerald-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{ans.authorName}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-700">
                        {ans.authorPlant}
                      </span>
                      <span className="text-[11px] text-slate-500">{ans.authorGrade}</span>
                    </div>

                    {ans.isAccepted ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-[10px] font-bold">
                        <Award className="w-3 h-3" />
                        Giải pháp hiệu quả (+{ans.pointsEarned} PTS)
                      </span>
                    ) : (
                      item.status !== 'solved' && (
                        <button
                          type="button"
                          onClick={() => onAcceptSosAnswer(item.id, ans.id)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-700 font-semibold text-[11px] cursor-pointer"
                        >
                          Xác nhận giải pháp hiệu quả
                        </button>
                      )
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{ans.content}</p>
                </div>
              ))}

              {/* Reply Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={replyDrafts[item.id] || ''}
                  onChange={(e) =>
                    setReplyDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                  placeholder="Chia sẻ giải pháp kỹ thuật của bạn cho ca lỗi này..."
                  className="flex-1 h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const text = (replyDrafts[item.id] || '').trim();
                    if (!text) return;
                    onAddSosAnswer(item.id, text, 'Lê Hoàng Minh', 'SEV');
                    setReplyDrafts((prev) => ({ ...prev, [item.id]: '' }));
                  }}
                  className="h-9 px-3.5 rounded-lg bg-[#091738] hover:bg-[#13285a] text-white font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Tư vấn</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Weekly Technical Leaderboard (Points & Engineer Grades Only) */}
      <div className="xl:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Bảng Vinh Danh &amp; Tích Điểm Tuần</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Xếp hạng minh bạch theo điểm cống hiến tri thức &amp; Bậc thợ / Hạng Kỹ sư
            </p>
          </div>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
            TUẦN W41
          </span>
        </div>

        <div className="space-y-2.5">
          {sortedLeaderboard.map((row, idx) => {
            const rankNum = idx + 1;
            return (
              <div
                key={row.technicianId}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  rankNum === 1
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 tabular-nums ${
                      rankNum === 1
                        ? 'bg-amber-500 text-white'
                        : rankNum === 2
                        ? 'bg-slate-700 text-white'
                        : rankNum === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    #{rankNum}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">{row.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[9px] font-bold text-slate-700">
                        {row.plant}
                      </span>
                    </div>
                    <div className="text-[11px] text-blue-700 font-medium truncate">{row.grade}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5 tabular-nums">
                      {row.pagesAuthored} trang • {row.incidentsResolvedOnTime} sự cố đúng hạn •{' '}
                      {row.kaizensApproved} Kaizen
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-bold text-[#1864f3] tabular-nums">
                    {row.weeklyPoints}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 uppercase">ĐIỂM TUẦN</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
