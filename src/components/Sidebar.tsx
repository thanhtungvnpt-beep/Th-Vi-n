import React from 'react';
import {
  Home,
  FileText,
  Wrench,
  TrendingUp,
  Users,
  Award,
  ClipboardCheck,
  Sparkles,
  PieChart,
} from 'lucide-react';

interface SidebarProps {
  activeNav: string;
  onSelectNav: (id: string) => void;
  pendingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onSelectNav,
  pendingCount = 4,
}) => {
  const menuItems = [
    { id: 'home', label: 'Trang chủ tri thức', icon: Home },
    { id: 'docs', label: 'Thư viện tài liệu', icon: FileText },
    { id: 'incidents', label: 'Xử lý sự cố', icon: Wrench },
    { id: 'improvement', label: 'Cải tiến kỹ thuật', icon: TrendingUp },
    { id: 'community', label: 'Cộng đồng kỹ thuật', icon: Users },
    { id: 'contributions', label: 'Đóng góp & xếp hạng', icon: Award },
    {
      id: 'approval',
      label: 'Phê duyệt nội dung',
      icon: ClipboardCheck,
      badge: pendingCount,
    },
    { id: 'ai-search', label: 'Tìm kiếm AI', icon: Sparkles },
    { id: 'analytics', label: 'Tổng hợp tri thức', icon: PieChart },
  ];

  return (
    <aside className="w-[215px] bg-[#091738] border-r border-[#15254d] flex flex-col justify-between flex-shrink-0 min-h-[calc(100vh-60px)] select-none">
      {/* Top Menu Links */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeNav === item.id ||
            (item.id === 'home' && activeNav === 'home') ||
            (item.id === 'analytics' && activeNav === 'analytics');

          return (
            <button
              key={item.id}
              onClick={() => onSelectNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 text-left cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#1762f2] to-[#0d50db] text-white font-semibold shadow-lg shadow-blue-600/30 ring-1 ring-blue-400/30'
                  : 'text-[#94a9d4] hover:text-white hover:bg-[#132758]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-white stroke-[2.2]' : 'text-[#859fcb]'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && item.badge > 0 && (
                <span className="bg-[#ef4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Machine Graphic & Brand */}
      <div className="relative mt-auto pt-2 overflow-hidden">
        <div className="w-full relative">
          <img
            src="/extracted/sidebar_machine.png"
            alt="EDM Wire Machine"
            className="w-full object-contain brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091738] via-transparent to-transparent pointer-events-none opacity-40" />
        </div>
      </div>
    </aside>
  );
};
