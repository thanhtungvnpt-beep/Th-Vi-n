import React, { useState } from 'react';
import {
  Search,
  Bell,
  Settings,
  Smartphone,
  ChevronDown,
  Shield,
  UserCheck,
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isMobileView: boolean;
  onToggleMobileView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  currentRole,
  onRoleChange,
  isMobileView,
  onToggleMobileView,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roleLabels: Record<UserRole, { title: string; subtitle: string; color: string }> = {
    admin: { title: 'Quản trị viên', subtitle: 'Toàn quyền hệ thống', color: 'bg-purple-600' },
    knowledge_manager: { title: 'Quản lý tri thức', subtitle: 'Kiểm duyệt & Xuất bản', color: 'bg-blue-600' },
    technical_expert: { title: 'Chuyên gia kỹ thuật', subtitle: 'Thẩm định & Chấm điểm', color: 'bg-emerald-600' },
    technician: { title: 'Kỹ thuật viên', subtitle: 'Sàn xưởng & Đóng góp', color: 'bg-amber-600' },
    viewer: { title: 'Người xem', subtitle: 'Chỉ đọc', color: 'bg-slate-600' },
  };

  return (
    <header className="h-[60px] bg-[#091838] border-b border-[#16274e] flex items-center justify-between px-4 sticky top-0 z-40 select-none">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3 min-w-[240px]">
        <div className="w-9 h-9 rounded-xl bg-[#1a66ff] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Settings className="w-5 h-5 animate-spin-slow stroke-[2.2]" />
        </div>
        <div>
          <div className="text-white font-bold text-[15px] tracking-wide leading-tight">
            EDM SMARTGUARD AI
          </div>
          <div className="text-[#8ba7df] text-[11px] font-medium leading-tight">
            Technical Knowledge Hub
          </div>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-[560px] mx-4 hidden md:block">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#7c9cd6] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm toàn bộ tri thức: máy, lỗi, giải pháp, cải tiến..."
            className="w-full h-9 bg-[#11234f] border border-[#21376d] hover:border-[#2f4f9e] focus:border-[#2f74ff] text-white placeholder-[#7595d2] text-xs pl-9 pr-4 rounded-full outline-none transition-all duration-200 shadow-inner"
          />
        </div>
      </div>

      {/* Right Controls: Role Switcher, Mobile Field Toggle, LIVE status, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Mobile Field View Mode Toggle */}
        <button
          onClick={onToggleMobileView}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            isMobileView
              ? 'bg-blue-600 border-blue-400 text-white shadow'
              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
          }`}
          title="Bật/Tắt giao diện di động hiện trường (Mobile Mode)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {isMobileView ? 'Bản Mobile' : 'Hiện trường'}
          </span>
        </button>

        {/* Role Switcher Dropdown (RBAC) */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1.5 bg-[#11234f] hover:bg-[#1a3372] border border-[#21376d] text-white px-2.5 py-1 rounded-full text-xs font-medium transition-all"
            title="Đổi vai trò phân quyền (RBAC)"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline">{roleLabels[currentRole].title}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-1.5 z-50 text-xs">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Phân quyền người dùng (RBAC)
              </div>
              {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onRoleChange(r);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                    currentRole === r
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div className="leading-tight">{roleLabels[r].title}</div>
                    <div className="text-[10px] opacity-75">{roleLabels[r].subtitle}</div>
                  </div>
                  {currentRole === r && <span className="text-white text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LIVE Status Badge */}
        <div className="bg-[#042f1f] border border-[#10b981]/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          <span className="text-[#34d399] text-[11px] font-bold tracking-wider">LIVE</span>
        </div>

        {/* Notification Bell */}
        <button
          className="relative text-slate-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
          title="12 thông báo mới"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#091838]">
            12
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
          <div className="w-9 h-9 rounded-full ring-2 ring-[#2563eb]/60 overflow-hidden bg-slate-800 flex-shrink-0">
            <img
              src="/extracted/avatar_user.png"
              alt="Nguyễn Văn A"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-white text-xs font-semibold leading-tight group-hover:text-blue-300 transition-colors">
              Nguyễn Văn A
            </div>
            <div className="text-[#94a3b8] text-[11px] leading-tight mt-0.5">
              {roleLabels[currentRole].title}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
