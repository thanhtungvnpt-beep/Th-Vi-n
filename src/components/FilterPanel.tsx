import React, { useState } from 'react';
import { Filter, Search, RotateCcw, ChevronDown, Check } from 'lucide-react';

interface FilterPanelProps {
  onSearch: (filters: {
    keyword: string;
    vendor: string;
    model: string;
    errorCode: string;
    phenomenon: string;
    statuses: string[];
  }) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onSearch, onReset }) => {
  const [keyword, setKeyword] = useState('');
  const [vendor, setVendor] = useState('Tất cả');
  const [model, setModel] = useState('Tất cả');
  const [errorCode, setErrorCode] = useState('');
  const [phenomenon, setPhenomenon] = useState('Tất cả');
  const [statuses, setStatuses] = useState<string[]>(['confirmed']);

  const toggleStatus = (id: string) => {
    setStatuses((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setKeyword('');
    setVendor('Tất cả');
    setModel('Tất cả');
    setErrorCode('');
    setPhenomenon('Tất cả');
    setStatuses(['confirmed']);
    onReset();
  };

  const handleApply = () => {
    onSearch({
      keyword,
      vendor,
      model,
      errorCode,
      phenomenon,
      statuses,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3.5 select-none w-full">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <h3 className="font-bold text-slate-900 text-sm tracking-tight">
          Bộ lọc tìm kiếm
        </h3>
        <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#1864f3] flex items-center justify-center">
          <Filter className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>
      </div>

      {/* Field 1: Từ khóa */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Từ khóa</label>
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Nhập lỗi, hiện tượng, mã lỗi..."
            className="w-full h-8 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 text-slate-800 placeholder-slate-400 text-xs pl-8 pr-2.5 rounded-lg outline-none transition-colors"
          />
        </div>
      </div>

      {/* Field 2: Vendor/Hãng */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Vendor/Hãng</label>
        <div className="relative">
          <select
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="w-full h-8 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
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

      {/* Field 3: Model máy */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Model máy</label>
        <div className="relative">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full h-8 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="M-V800">M-V800</option>
            <option value="EDNC-65">EDNC-65</option>
            <option value="GENOS M560V">GENOS M560V</option>
            <option value="ALN400G">ALN400G</option>
            <option value="Robodrill D21LiB5">Robodrill D21LiB5</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Field 4: Mã lỗi */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Mã lỗi</label>
        <input
          type="text"
          value={errorCode}
          onChange={(e) => setErrorCode(e.target.value)}
          placeholder="VD: E210, AL-03..."
          className="w-full h-8 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 text-slate-800 placeholder-slate-400 text-xs px-2.5 rounded-lg outline-none transition-colors"
        />
      </div>

      {/* Field 5: Hiện tượng */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Hiện tượng</label>
        <div className="relative">
          <select
            value={phenomenon}
            onChange={(e) => setPhenomenon(e.target.value)}
            className="w-full h-8 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Quá nhiệt">Quá nhiệt</option>
            <option value="Lỗi servo">Lỗi servo</option>
            <option value="Mất áp thủy lực">Mất áp thủy lực</option>
            <option value="Bề mặt gia công xước">Bề mặt gia công xước</option>
            <option value="Lỗi thay dao tự động">Lỗi thay dao tự động</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Field 6: Trạng thái xác nhận */}
      <div className="space-y-2 pt-1">
        <label className="text-[11px] font-semibold text-slate-700">
          Trạng thái xác nhận
        </label>
        <div className="space-y-1.5">
          {/* Checkbox 1: Đã xác nhận */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
            <button
              type="button"
              onClick={() => toggleStatus('confirmed')}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                statuses.includes('confirmed')
                  ? 'bg-[#10b981] border-[#10b981] text-white'
                  : 'bg-white border-slate-300'
              }`}
            >
              {statuses.includes('confirmed') && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span className="font-medium text-slate-800">Đã xác nhận (1,142)</span>
          </label>

          {/* Checkbox 2: Chờ duyệt */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
            <button
              type="button"
              onClick={() => toggleStatus('pending')}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                statuses.includes('pending')
                  ? 'bg-[#1864f3] border-[#1864f3] text-white'
                  : 'bg-white border-slate-300'
              }`}
            >
              {statuses.includes('pending') && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span className="text-slate-600">Chờ duyệt (152)</span>
          </label>

          {/* Checkbox 3: Cần bổ sung */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
            <button
              type="button"
              onClick={() => toggleStatus('supplement')}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                statuses.includes('supplement')
                  ? 'bg-[#1864f3] border-[#1864f3] text-white'
                  : 'bg-white border-slate-300'
              }`}
            >
              {statuses.includes('supplement') && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span className="text-slate-600">Cần bổ sung (42)</span>
          </label>

          {/* Checkbox 4: Từ chối */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
            <button
              type="button"
              onClick={() => toggleStatus('rejected')}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                statuses.includes('rejected')
                  ? 'bg-[#1864f3] border-[#1864f3] text-white'
                  : 'bg-white border-slate-300'
              }`}
            >
              {statuses.includes('rejected') && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span className="text-slate-600">Từ chối (40)</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 space-y-2">
        <button
          onClick={handleApply}
          className="w-full h-8 bg-[#1864f3] hover:bg-[#1355d1] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Tìm kiếm</span>
        </button>

        <button
          onClick={handleReset}
          className="w-full h-8 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-xl border border-slate-200/90 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Đặt lại</span>
        </button>
      </div>
    </div>
  );
};
