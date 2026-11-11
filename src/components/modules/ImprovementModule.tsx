import React, { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Cog,
  Target,
  Clock,
  Coins,
  ShieldCheck,
  Grid,
  Plus,
  Filter,
  Search,
  RotateCcw,
  ChevronDown,
  ArrowUpDown,
  Home,
  ChevronRight,
  Star,
  Monitor,
  Building,
  Calendar,
  Eye,
  ThumbsUp,
  MessageSquare,
  ArrowRight,
  Download,
  Users,
  Check,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { ImprovementItem } from '../../types';

interface ImprovementModuleProps {
  improvements: ImprovementItem[];
  selectedId: string;
  onSelect: (item: ImprovementItem) => void;
  onOpenNewModal: () => void;
}

export const ImprovementModule: React.FC<ImprovementModuleProps> = ({
  improvements,
  selectedId,
  onSelect,
  onOpenNewModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [keyword, setKeyword] = useState('');
  const [factory, setFactory] = useState('Tất cả');
  const [vendor, setVendor] = useState('Tất cả');
  const [line, setLine] = useState('Tất cả');
  const [deviceType, setDeviceType] = useState('Tất cả');
  const [statusFilter, setStatusFilter] = useState<string>('applied');

  const currentItem =
    improvements.find((i) => i.id === selectedId) || improvements[0];

  const categories = [
    { id: 'all', label: 'Tất cả (326)', icon: Sparkles },
    { id: 'optimize', label: 'Tối ưu vận hành (98)', icon: Cog },
    { id: 'reduce_ng', label: 'Giảm lỗi NG (64)', icon: Target },
    { id: 'reduce_downtime', label: 'Giảm dừng máy (56)', icon: Clock },
    { id: 'cost', label: 'Tiết kiệm chi phí (42)', icon: Coins },
    { id: 'safety', label: 'An toàn (26)', icon: ShieldCheck },
    { id: 'other', label: 'Khác (40)', icon: Grid },
  ];

  return (
    <div className="space-y-3.5 select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a2c75] via-[#0f3d9c] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
        <div className="relative z-10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-[440px]">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              Cải tiến kỹ thuật
            </h1>
            <p className="text-[#bfd6ff] text-xs font-normal mt-1.5 leading-relaxed">
              Sáng kiến • Giải pháp • Hiệu quả thực tế • Lan tỏa kinh nghiệm
            </p>
          </div>

          {/* 4 Stat KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 min-w-[400px]">
            {/* Stat 1: Cải tiến */}
            <div className="bg-[#123e93]/85 hover:bg-[#1546a3] border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#2368ee] text-white flex items-center justify-center mb-1 shadow-inner">
                <Lightbulb className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                326
              </div>
              <div className="text-[11px] text-[#a9c7ff] font-medium mt-1">
                Cải tiến
              </div>
            </div>

            {/* Stat 2: Đã áp dụng */}
            <div className="bg-[#094c45]/85 hover:bg-[#0b5a51] border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#10b981] text-white flex items-center justify-center mb-1 shadow-inner">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                278
              </div>
              <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
                Đã áp dụng
              </div>
            </div>

            {/* Stat 3: Đã xác nhận hiệu quả */}
            <div className="bg-[#19326e]/85 hover:bg-[#203c7e] border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#3b82f6] text-white flex items-center justify-center mb-1 shadow-inner">
                <BarChart3 className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                187
              </div>
              <div className="text-[11px] text-[#bfdbfe] font-medium mt-1">
                Đã xác nhận hiệu quả
              </div>
            </div>

            {/* Stat 4: Cải tiến nổi bật */}
            <div className="bg-[#09462f]/85 hover:bg-[#0c5237] border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#059669] text-white flex items-center justify-center mb-1 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                12
              </div>
              <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
                Cải tiến nổi bật
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Pills Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#1864f3] text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
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

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2 bg-[#1864f3] hover:bg-[#1456d8] active:bg-[#0f4ac2] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm shadow-blue-500/25 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Đăng cải tiến</span>
        </button>
      </div>

      {/* 3. 4-Column Grid: Filter, List, Detail, Right Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* Col 1: Bộ lọc tìm kiếm */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3.5 select-none">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Bộ lọc tìm kiếm
              </h3>
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#1864f3] flex items-center justify-center">
                <Filter className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
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
                  className="w-full h-8 bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-800 placeholder-slate-400 text-xs pl-8 pr-2.5 rounded-lg outline-none"
                />
              </div>
            </div>

            {/* Nhà máy */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Nhà máy</label>
              <div className="relative">
                <select
                  value={factory}
                  onChange={(e) => setFactory(e.target.value)}
                  className="w-full h-8 bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Factory 1">Factory 1</option>
                  <option value="Factory 2">Factory 2</option>
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
                  className="w-full h-8 bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Makino">Makino</option>
                  <option value="Okuma">Okuma</option>
                  <option value="Sodick">Sodick</option>
                  <option value="Fanuc">Fanuc</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Line */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Line</label>
              <div className="relative">
                <select
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  className="w-full h-8 bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Line A">Line A</option>
                  <option value="Line B">Line B</option>
                  <option value="Line C">Line C</option>
                  <option value="Xưởng M&E">Xưởng M&E</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Loại thiết bị */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Loại thiết bị</label>
              <div className="relative">
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full h-8 bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="EDM">Máy xung / Cắt dây EDM</option>
                  <option value="CNC">Máy phay / tiện CNC</option>
                  <option value="Robot">Robot tự động</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Thời gian áp dụng */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Thời gian áp dụng</label>
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Từ ngày — Đến ngày</span>
              </div>
            </div>

            {/* Trạng thái */}
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-semibold text-slate-700">Trạng thái</label>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="w-4 h-4 rounded bg-[#10b981] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="font-medium text-slate-800">Đã áp dụng (278)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <span className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center" />
                  <span>Chờ duyệt (32)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <span className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center" />
                  <span>Đang triển khai (10)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <span className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center" />
                  <span>Lưu nháp (6)</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 space-y-2">
              <button className="w-full h-8 bg-[#1864f3] hover:bg-[#1355d1] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                <Search className="w-3.5 h-3.5" />
                <span>Tìm kiếm</span>
              </button>
              <button className="w-full h-8 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Đặt lại</span>
              </button>
            </div>
          </div>
        </div>

        {/* Col 2: Danh sách 326 cải tiến */}
        <div className="xl:col-span-2 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-bold text-xs text-slate-800 tracking-tight">
              326 cải tiến
            </span>
            <button className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200/90 rounded-lg px-2 py-1 shadow-2xs">
              <span>Mới nhất</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          <div className="space-y-2">
            {improvements.map((item) => {
              const isSelected = item.id === currentItem.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={`p-2.5 rounded-xl transition-all duration-150 cursor-pointer flex gap-2.5 relative ${
                    isSelected
                      ? 'bg-white border-2 border-[#1864f3] shadow-md shadow-blue-500/10'
                      : 'bg-white border border-slate-200/80 hover:border-blue-300'
                  }`}
                >
                  {/* Thumbnail with status badge */}
                  <div className="w-[62px] h-[52px] rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200/60 relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0.5 left-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white ${
                        item.status === 'applied'
                          ? 'bg-[#10b981]'
                          : 'bg-[#f59e0b]'
                      }`}
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-[11px] text-slate-900 leading-tight line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-blue-600 font-medium leading-tight mt-1">
                        <span className="bg-blue-50 px-1 py-0.5 rounded text-blue-700">
                          {item.machineCode}
                        </span>
                        <span>{item.line}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium mt-1">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-400" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-slate-400" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-slate-400" />
                        <span>{item.commentsCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Col 3: Chi tiết cải tiến */}
        <div className="xl:col-span-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col gap-4 select-none">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span>Cải tiến kỹ thuật</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-800 font-semibold">Chi tiết cải tiến</span>
            </div>

            {/* Title Header */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {currentItem.title}
                </h2>
                <span className="bg-[#10b981] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>{currentItem.statusText}</span>
                </span>
              </div>

              <Star className="w-5 h-5 fill-amber-400 text-amber-400 cursor-pointer" />
            </div>

            {/* Metadata badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                <span>Thiết bị: <strong className="text-slate-900">{currentItem.machineCode}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                <span>Line: <strong className="text-slate-900">{currentItem.line}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Nhà máy: <strong className="text-slate-900">{currentItem.factory}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Áp dụng: <strong className="text-slate-900">{currentItem.appliedDate}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg ml-auto text-slate-600">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentItem.views.toLocaleString()}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
              {[
                { id: 'overview', label: 'Tổng quan' },
                { id: 'steps', label: 'Triển khai' },
                { id: 'results', label: 'Kết quả' },
                { id: 'discuss', label: `Thảo luận (${currentItem.commentsCount})` },
                { id: 'docs', label: `Tài liệu (${currentItem.documents.length})` },
                { id: 'history', label: 'Lịch sử' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#1864f3] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="space-y-4 pt-1">
              {/* Problem / Solution and Before / After Visual */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Left Text */}
                <div className="lg:col-span-6 space-y-3 text-xs">
                  <div>
                    <h4 className="flex items-center gap-1.5 font-bold text-blue-700">
                      <Cog className="w-3.5 h-3.5 text-blue-600" />
                      <span>1. Hiện trạng & Vấn đề</span>
                    </h4>
                    <ul className="mt-1.5 space-y-1 pl-2 text-slate-700">
                      {currentItem.problemPoints.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-slate-400">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-1.5 font-bold text-blue-700">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>2. Giải pháp cải tiến</span>
                    </h4>
                    <ul className="mt-1.5 space-y-1 pl-2 text-slate-700">
                      {currentItem.solutionPoints.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-slate-400">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-1.5 font-bold text-blue-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>3. Triển khai</span>
                    </h4>
                    <ul className="mt-1.5 space-y-1 pl-2 text-slate-700">
                      {currentItem.implementationSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-slate-400">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Before / After Comparison */}
                <div className="lg:col-span-6">
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm flex items-center">
                    {/* Before Image */}
                    <div className="flex-1 relative aspect-[4/3] overflow-hidden">
                      <img
                        src={currentItem.beforeImage}
                        alt="Trước cải tiến"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-[#ef4444] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        Trước cải tiến
                      </span>
                    </div>

                    {/* Blue Arrow Circle Divider */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#1864f3] text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>

                    {/* After Image */}
                    <div className="flex-1 relative aspect-[4/3] overflow-hidden">
                      <img
                        src={currentItem.afterImage}
                        alt="Sau cải tiến"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        Sau cải tiến
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Kết quả thực tế (đã xác nhận) */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-[#10b981] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <h4 className="font-bold text-xs text-slate-900">
                    4. Kết quả thực tế (đã xác nhận)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Metric 1 */}
                  <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {currentItem.quantitativeResults.metric1.label}
                      </div>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">
                        {currentItem.quantitativeResults.metric1.before} → {currentItem.quantitativeResults.metric1.after}
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 font-bold text-xs px-2 py-1 rounded-md flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>{currentItem.quantitativeResults.metric1.diff}</span>
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {currentItem.quantitativeResults.metric2.label}
                      </div>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">
                        {currentItem.quantitativeResults.metric2.before} → {currentItem.quantitativeResults.metric2.after}
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 font-bold text-xs px-2 py-1 rounded-md flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{currentItem.quantitativeResults.metric2.diff}</span>
                    </span>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {currentItem.quantitativeResults.metric3.label}
                      </div>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">
                        {currentItem.quantitativeResults.metric3.before} → {currentItem.quantitativeResults.metric3.after}
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 font-bold text-xs px-2 py-1 rounded-md flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>{currentItem.quantitativeResults.metric3.diff}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 4: Right Sidebar Widgets */}
        <div className="xl:col-span-2 space-y-3.5">
          {/* Widget 1: Người đề xuất */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-xs tracking-tight">
                Người đề xuất
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full ring-2 ring-blue-100 overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={currentItem.proposer.avatar}
                  alt={currentItem.proposer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 leading-tight">
                  {currentItem.proposer.name}
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  {currentItem.proposer.role}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1.5">
              <span className="text-xs font-medium text-amber-800">Đóng góp</span>
              <span className="text-xs font-bold text-amber-700">
                +{currentItem.proposer.pointsAwarded} điểm
              </span>
            </div>
          </div>

          {/* Widget 2: Nhóm thực hiện */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-xs tracking-tight">
                Nhóm thực hiện
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {currentItem.team.map((t, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden bg-slate-200 shadow-2xs"
                  title={t.name}
                >
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center border border-slate-200">
                +{currentItem.additionalTeamCount}
              </div>
            </div>
          </div>

          {/* Widget 3: Phạm vi áp dụng */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-2.5 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Target className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-xs tracking-tight">
                Phạm vi áp dụng
              </h3>
            </div>

            <div className="space-y-1.5 text-slate-700">
              {currentItem.appliedScope.map((scope, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
                    ✓
                  </span>
                  <span>
                    <strong>{scope.machine}</strong> ({scope.statusText})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 4: Tài liệu liên quan */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-2.5 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Download className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-xs tracking-tight">
                Tài liệu liên quan
              </h3>
            </div>

            <div className="space-y-2">
              {currentItem.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0 ${
                        doc.color === 'red' ? 'bg-[#ef4444]' : 'bg-[#2563eb]'
                      }`}
                    >
                      {doc.type.toUpperCase()}
                    </span>
                    <span className="text-[11px] text-slate-800 group-hover:text-blue-600 truncate font-medium">
                      {doc.name}
                    </span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
