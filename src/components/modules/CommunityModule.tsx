import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  CheckCircle2,
  Star,
  Plus,
  Filter,
  Search,
  RotateCcw,
  ChevronDown,
  Eye,
  ThumbsUp,
  Clock,
  Flame,
  Award,
  ArrowRight,
  Check,
  Share2,
  Sparkles,
} from 'lucide-react';
import { DiscussionItem } from '../../types';

interface CommunityModuleProps {
  discussions: DiscussionItem[];
  onOpenNewModal: () => void;
  onSelectDiscussion?: (item: DiscussionItem) => void;
}

export const CommunityModule: React.FC<CommunityModuleProps> = ({
  discussions,
  onOpenNewModal,
  onSelectDiscussion,
}) => {
  const [activeTopic, setActiveTopic] = useState('all');
  const [activeSort, setActiveSort] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const [deviceModel, setDeviceModel] = useState('Tất cả');
  const [vendor, setVendor] = useState('Tất cả');

  return (
    <div className="space-y-3.5 select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a2c75] via-[#0f3d9c] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
        <div className="relative z-10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-[460px]">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              Cộng đồng kỹ thuật
            </h1>
            <p className="text-[#bfd6ff] text-xs font-normal mt-1.5 leading-relaxed">
              Hỏi đáp • Thảo luận • Chia sẻ kinh nghiệm • Giải quyết vấn đề cùng chuyên gia
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 min-w-[420px]">
            {/* Stat 1 */}
            <div className="bg-[#123e93]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#2368ee] text-white flex items-center justify-center mb-1">
                <MessageSquare className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                2,846
              </div>
              <div className="text-[11px] text-[#a9c7ff] font-medium mt-1">
                Bài thảo luận
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#094c45]/85 border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#10b981] text-white flex items-center justify-center mb-1">
                <Users className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                5,320
              </div>
              <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
                Thành viên
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#19326e]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#3b82f6] text-white flex items-center justify-center mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                1,982
              </div>
              <div className="text-[11px] text-[#bfdbfe] font-medium mt-1">
                Đã giải quyết
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#4d1421]/85 border border-red-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#ef4444] text-white flex items-center justify-center mb-1">
                <Star className="w-3.5 h-3.5 stroke-[2.4] fill-white" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                98%
              </div>
              <div className="text-[11px] text-[#fecaca] font-medium mt-1">
                Đánh giá hữu ích
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subnav Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'qa', label: 'Hỏi & Đáp' },
            { id: 'repair', label: 'Kinh nghiệm sửa chữa' },
            { id: 'improve', label: 'Cải tiến & tối ưu' },
            { id: 'sharing', label: 'Chia sẻ kỹ thuật' },
            { id: 'notice', label: 'Thông báo' },
          ].map((cat) => {
            const isActive = activeTopic === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTopic(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1864f3] text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2 bg-[#1864f3] hover:bg-[#1456d8] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm shadow-blue-500/25 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Đăng thảo luận</span>
        </button>
      </div>

      {/* 3. Main Grid: Filter (Left), Discussions Stream (Center), Widgets (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* Left Filter */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3.5 select-none">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Bộ lọc thảo luận
              </h3>
              <Filter className="w-3.5 h-3.5 text-[#1864f3]" />
            </div>

            {/* Từ khóa */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Từ khóa</label>
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Nhập từ khóa..."
                  className="w-full h-8 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs pl-8 pr-2.5 rounded-lg outline-none"
                />
              </div>
            </div>

            {/* Chủ đề */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[11px] font-semibold text-slate-700 block">Chủ đề</label>
              <div className="space-y-1 text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Hỏi & Đáp (892)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Kinh nghiệm sửa chữa (746)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Cải tiến & tối ưu (328)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Chia sẻ kỹ thuật (412)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Thông báo (68)</span>
                </label>
              </div>
            </div>

            {/* Thiết bị / Model */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Thiết bị / Model</label>
              <div className="relative">
                <select
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full h-8 bg-slate-50 border border-slate-200 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="EDM-04">EDM-04 (M-V800)</option>
                  <option value="CNC-02">CNC-02 (GENOS)</option>
                  <option value="EDM-05">EDM-05 (ALN400G)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Vendor/Hãng */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Vendor/Hãng</label>
              <div className="relative">
                <select
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full h-8 bg-slate-50 border border-slate-200 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="KHV">KHV</option>
                  <option value="KTECH">KTECH</option>
                  <option value="HSTEC">HSTEC</option>
                  <option value="DREAM TECH">DREAM TECH</option>
                  <option value="HOJEONGB">HOJEONGB</option>
                  <option value="HOJEONG VINA">HOJEONG VINA</option>
                  <option value="DAAL">DAAL</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Trạng thái */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[11px] font-semibold text-slate-700 block">Trạng thái</label>
              <div className="space-y-1 text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Đang thảo luận (486)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-900 font-medium">
                  <span className="w-4 h-4 rounded bg-[#10b981] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Đã có giải pháp (1,982)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Chờ xác nhận (228)</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 space-y-2">
              <button className="w-full h-8 bg-[#1864f3] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                <Search className="w-3.5 h-3.5" />
                <span>Tìm kiếm</span>
              </button>
              <button className="w-full h-8 bg-white text-slate-700 font-medium text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Đặt lại</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center: Discussions Feed */}
        <div className="xl:col-span-6 space-y-3">
          {/* Sorting Tabs */}
          <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-slate-200/80 shadow-2xs">
            {[
              { id: 'latest', label: 'Mới nhất' },
              { id: 'popular', label: 'Được quan tâm' },
              { id: 'active', label: 'Nhiều tương tác' },
              { id: 'solved', label: 'Đã giải quyết' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSort(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSort === tab.id
                    ? 'bg-[#1864f3] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Discussion Cards */}
          <div className="space-y-3">
            {discussions.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectDiscussion && onSelectDiscussion(item)}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all cursor-pointer flex gap-3.5"
              >
                {/* Thumbnail */}
                <div className="w-[84px] h-[72px] rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                  <img
                    src={item.thumbnail || '/extracted/thumb_spindle.png'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.topicText}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ml-auto ${
                          item.status === 'solved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.status === 'pending_confirm'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {item.statusText}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-1">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-200">
                        <img src={item.author.avatar} alt={item.author.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-slate-800">{item.author.name}</span>
                      <span>•</span>
                      <span className="text-[11px] text-slate-400">{item.timeAgo}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        {item.repliesCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                        {item.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Widgets */}
        <div className="xl:col-span-3 space-y-3.5">
          {/* Widget 1: Thảo luận nổi bật tuần */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h3 className="font-bold text-slate-900 text-xs tracking-tight">
                Thảo luận nổi bật tuần
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { rank: 1, title: 'Cách xử lý lỗi E210 hiệu quả dòng EDM', likes: 106, comments: 48, img: '/extracted/thumb_spindle.png' },
                { rank: 2, title: 'Tối ưu hệ thống lọc dung dịch EDM', likes: 92, comments: 36, img: '/extracted/thumb_servo.png' },
                { rank: 3, title: 'Giải pháp gá đặt nhanh CNC', likes: 88, comments: 28, img: '/extracted/thumb_jig.png' },
              ].map((item) => (
                <div key={item.rank} className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                    {item.rank}
                  </span>
                  <div className="w-10 h-8 rounded overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={item.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-800 text-[11px] truncate">{item.title}</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>👍 {item.likes}</span>
                      <span>💬 {item.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Thành viên tích cực */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Award className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-xs tracking-tight">
                Thành viên tích cực
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { rank: 1, name: 'Nguyễn Quốc Hưng', points: '+326 điểm', avatar: '/extracted/avatar_user.png' },
                { rank: 2, name: 'Trần Văn Minh', points: '+298 điểm', avatar: '/extracted/avatar_author.png' },
                { rank: 3, name: 'Lê Anh Tuấn', points: '+276 điểm', avatar: '/extracted/avatar_author.png' },
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                      {user.rank}
                    </span>
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold text-slate-800 text-xs truncate">{user.name}</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">
                    {user.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 3: Từ thảo luận đến tri thức chính thức */}
          <div className="bg-gradient-to-br from-amber-500/10 via-blue-500/10 to-indigo-500/10 border border-blue-200/80 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-700">
              <Sparkles className="w-4 h-4" />
              <span>Từ thảo luận đến tri thức chính thức</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Những chủ đề có giá trị thực tiễn sẽ được đề xuất chuyển thành bài xử lý sự cố, tài liệu kỹ thuật hoặc bài cải tiến.
            </p>
            <div className="pt-1 flex items-center gap-1 text-[#1864f3] font-semibold text-xs cursor-pointer hover:underline">
              <span>Xem hướng dẫn đề xuất</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
