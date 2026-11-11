import React from 'react';
import { BookOpen, Settings, Bot, Share2, Plus, Sparkles } from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenNewModal: () => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenNewModal,
}) => {
  const categories = [
    { id: 'all', label: 'Tất cả (1,376)', icon: Sparkles },
    { id: 'edm', label: 'EDM (486)', icon: BookOpen },
    { id: 'cnc', label: 'CNC (532)', icon: Settings },
    { id: 'robot', label: 'Robot (98)', icon: Bot },
    { id: 'auxiliary', label: 'Hệ thống phụ trợ (260)', icon: Share2 },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 select-none">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-150 ${
                isActive
                  ? 'bg-[#1864f3] text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive ? 'text-white stroke-[2.2]' : 'text-slate-500'
                }`}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Post Incident Button */}
      <button
        onClick={onOpenNewModal}
        className="px-4 py-2 bg-[#1864f3] hover:bg-[#1456d8] active:bg-[#0f4ac2] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm shadow-blue-500/25 transition-all duration-150 cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Đăng ca sự cố</span>
      </button>
    </div>
  );
};
