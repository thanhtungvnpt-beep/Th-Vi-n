import React, { useState } from 'react';
import {
  Trophy,
  Layers,
  CheckCircle2,
  TrendingUp,
  Star,
  Award,
  BookOpen,
  Wrench,
  Lightbulb,
  Users,
  Send,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import {
  UserProfile,
  VendorRankingItem,
  IndividualRankingItem,
} from '../../types';

interface RankingModuleProps {
  currentUser: UserProfile;
  vendorRankings: VendorRankingItem[];
  individualRankings: IndividualRankingItem[];
  onOpenNewModal: () => void;
}

export const RankingModule: React.FC<RankingModuleProps> = ({
  currentUser,
  vendorRankings,
  individualRankings,
  onOpenNewModal,
}) => {
  const [activeSubnav, setActiveSubnav] = useState('overview');

  return (
    <div className="space-y-3.5 select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a2c75] via-[#0f3d9c] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
        <div className="relative z-10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-[460px]">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              Đóng góp & Xếp hạng
            </h1>
            <p className="text-[#bfd6ff] text-xs font-normal mt-1.5 leading-relaxed">
              Ghi nhận tri thức • Lan tỏa kinh nghiệm • Tôn vinh đóng góp
            </p>
          </div>

          {/* 3 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 min-w-[360px]">
            {/* Stat 1 */}
            <div className="bg-[#123e93]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#2368ee] text-white flex items-center justify-center mb-1">
                <Layers className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                5,320
              </div>
              <div className="text-[11px] text-[#a9c7ff] font-medium mt-1">
                Tổng bài đóng góp
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#094c45]/85 border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#10b981] text-white flex items-center justify-center mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                4,218
              </div>
              <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
                Đã được duyệt
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#163a82]/85 border border-indigo-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#6366f1] text-white flex items-center justify-center mb-1">
                <TrendingUp className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                +32%
              </div>
              <div className="text-[11px] text-[#c7d2fe] font-medium mt-1">
                Tăng so với tháng trước
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subnav Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'overview', label: 'Tổng quan' },
          { id: 'individual', label: 'Xếp hạng cá nhân' },
          { id: 'vendor', label: 'Xếp hạng Vendor' },
          { id: 'badges', label: 'Thành tích & Huy hiệu' },
          { id: 'history', label: 'Lịch sử đóng góp' },
          { id: 'rules', label: 'Quy tắc tính điểm' },
        ].map((tab) => {
          const isActive = activeSubnav === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubnav(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#1864f3] text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. ROW 1: Profile & Points, My Contributions, Monthly Target */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Card 1: Profile & Points */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-full ring-3 ring-blue-100 overflow-hidden bg-slate-100 flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">{currentUser.name}</div>
              <div className="text-xs text-slate-500 leading-tight mt-0.5">
                {currentUser.roleTitle} • Vendor: <strong>{currentUser.vendor}</strong>
              </div>
              <span className="inline-block mt-2 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                ⭐ Top Contributor
              </span>
            </div>
          </div>

          {/* Points summary */}
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {currentUser.points.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-600">điểm</span>
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
              ▲ +{currentUser.monthlyPoints} điểm (Tháng này)
            </div>

            {/* Level progress */}
            <div className="w-36 mt-2">
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold mb-1">
                <span>Cấp độ: <strong className="text-blue-600">{currentUser.level}</strong></span>
                <span>{currentUser.levelProgress} / {currentUser.levelTarget}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  style={{
                    width: `${(currentUser.levelProgress / currentUser.levelTarget) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Đóng góp của tôi */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h4 className="font-bold text-xs text-slate-900">Đóng góp của tôi</h4>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs my-auto py-1">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">Tài liệu kỹ thuật:</span>
              <strong className="text-slate-900">{currentUser.contributionsCount.documents}</strong>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">Xử lý sự cố:</span>
              <strong className="text-slate-900">{currentUser.contributionsCount.incidents}</strong>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">Cải tiến kỹ thuật:</span>
              <strong className="text-slate-900">{currentUser.contributionsCount.improvements}</strong>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">Hỗ trợ cộng đồng:</span>
              <strong className="text-slate-900">{currentUser.contributionsCount.community}</strong>
            </div>
          </div>
        </div>

        {/* Card 3: Mục tiêu tháng */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between text-center">
          <div className="flex items-center justify-center gap-1.5 border-b border-slate-100 pb-2">
            <Award className="w-4 h-4 text-blue-600" />
            <h4 className="font-bold text-xs text-slate-900">Mục tiêu tháng</h4>
          </div>

          <div className="my-auto flex flex-col items-center">
            {/* Circular Progress */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="transparent"
                  stroke="#1864f3"
                  strokeWidth="3.5"
                  strokeDasharray="72 28"
                  strokeDashoffset="0"
                />
              </svg>
              <span className="absolute font-black text-sm text-slate-900">82%</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-600 mt-1">
              1,860 / 2,250 điểm
            </span>
          </div>
        </div>
      </div>

      {/* 4. ROW 2: Personal Leaderboard, Vendor Leaderboard, Recent Contributions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left: Bảng xếp hạng cá nhân */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-xs text-slate-900">
                Bảng xếp hạng cá nhân <span className="text-slate-400 font-normal">(Tháng này)</span>
              </h4>
            </div>
            <button className="text-[11px] font-semibold text-blue-600 hover:underline">
              Xem tất cả →
            </button>
          </div>

          <div className="space-y-2 my-1 text-xs">
            {individualRankings.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                      user.rank === 1
                        ? 'bg-amber-100 text-amber-800'
                        : user.rank === 2
                        ? 'bg-slate-200 text-slate-800'
                        : user.rank === 3
                        ? 'bg-amber-50 text-amber-900'
                        : 'bg-slate-50 text-slate-500'
                    }`}
                  >
                    {user.rank}
                  </span>
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 text-[11px] truncate">{user.name}</div>
                    <div className="text-[9px] text-slate-400 truncate">{user.role}</div>
                  </div>
                </div>

                <div className="text-right flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    {user.vendor}
                  </span>
                  <span className="font-bold text-xs text-slate-900">
                    {user.points.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Bảng xếp hạng 7 Vendor */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-xs text-slate-900">
                Bảng xếp hạng Vendor <span className="text-slate-400 font-normal">(Tháng này)</span>
              </h4>
            </div>
            <button className="text-[11px] font-semibold text-blue-600 hover:underline">
              Xem tất cả →
            </button>
          </div>

          <div className="space-y-1.5 my-1 text-xs">
            {vendorRankings.map((v) => (
              <div
                key={v.rank}
                className="flex items-center justify-between p-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                      v.rank === 1
                        ? 'bg-amber-100 text-amber-800'
                        : v.rank === 2
                        ? 'bg-slate-200 text-slate-800'
                        : v.rank === 3
                        ? 'bg-amber-50 text-amber-900'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {v.rank}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">{v.vendor}</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-slate-900">
                    {v.totalPoints.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500">{v.contributionsCount} bài</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {v.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hoạt động đóng góp gần đây */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h4 className="font-bold text-xs text-slate-900">Hoạt động đóng góp gần đây</h4>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 my-1">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Đăng tài liệu: SOP vệ sinh spindle</span>
                <span className="text-[10px] text-slate-400">30 phút trước</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded inline-block mt-1">
                ✓ Đã duyệt
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Chia sẻ xử lý sự cố: Lỗi E210 Spindle</span>
                <span className="text-[10px] text-slate-400">2 giờ trước</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded inline-block mt-1">
                ✓ Đã duyệt
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Đăng cải tiến: Tối ưu hệ lọc dung dịch</span>
                <span className="text-[10px] text-slate-400">1 ngày trước</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded inline-block mt-1">
                ✓ Đã áp dụng
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Trả lời thảo luận: Cách giảm rung máy</span>
                <span className="text-[10px] text-slate-400">1 ngày trước</span>
              </div>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.2 rounded inline-block mt-1">
                👍 Được đánh giá hữu ích
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ROW 3: Achievement Badges, Next Milestone, Action Button */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left: Huy hiệu thành tích */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Award className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-xs text-slate-900">Huy hiệu thành tích</h4>
          </div>

          <div className="grid grid-cols-5 gap-2 my-2 text-center">
            {/* Badge 1 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-semibold text-slate-700 mt-1 leading-tight">
                Người đóng góp tri thức
              </span>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-semibold text-slate-700 mt-1 leading-tight">
                Chuyên gia xử lý sự cố
              </span>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
                <Lightbulb className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-semibold text-slate-700 mt-1 leading-tight">
                Nhà cải tiến xuất sắc
              </span>
            </div>

            {/* Badge 4 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-semibold text-slate-700 mt-1 leading-tight">
                Cố vấn kỹ thuật
              </span>
            </div>

            {/* Badge 5 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-semibold text-slate-700 mt-1 leading-tight">
                Top Contributor
              </span>
            </div>
          </div>
        </div>

        {/* Center: Mốc tiếp theo */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <h4 className="font-bold text-xs text-slate-900">Mốc tiếp theo</h4>
          </div>

          <div className="flex items-center gap-3 my-2">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
              <Shield className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-xs text-slate-900">Chuyên gia cao cấp</div>
              <div className="text-[11px] text-slate-500">Cần thêm 140 điểm để nâng cấp</div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-1.5">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '93%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Nút hành động Đóng góp ngay */}
        <div className="lg:col-span-3 flex items-center justify-center">
          <button
            onClick={onOpenNewModal}
            className="w-full h-full min-h-[90px] bg-gradient-to-r from-[#1864f3] to-[#0d4fe0] hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer p-4 text-center"
          >
            <Send className="w-5 h-5" />
            <span>Đóng góp tri thức ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
