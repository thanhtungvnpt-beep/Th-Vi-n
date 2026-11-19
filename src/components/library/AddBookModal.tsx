import React, { useState, useEffect } from 'react';
import { X, BookPlus, Layers } from 'lucide-react';
import { BookSpineTheme, MachineBook, OemCabinetId, OemCabinetInfo } from '../../types';

interface AddBookModalProps {
  isOpen: boolean;
  defaultCabinetId: OemCabinetId;
  cabinets: OemCabinetInfo[];
  onClose: () => void;
  onCreateBook: (newBook: {
    assetCode: string;
    machineName: string;
    vendorId: OemCabinetId;
    plant: 'SEV' | 'P1' | 'P2';
    specSubtitle: string;
    footerTag: string;
    spineTheme: BookSpineTheme;
  }) => void;
}

const SPINE_THEMES: { id: BookSpineTheme; label: string; swatch: string }[] = [
  { id: 'cobalt', label: 'Xanh Cobalt (CNC)', swatch: 'bg-[#1d4ed8]' },
  { id: 'navy', label: 'Xanh Navy (OEM)', swatch: 'bg-[#1e3a8a]' },
  { id: 'sky', label: 'Xanh Sky (Khí nén)', swatch: 'bg-[#0284c7]' },
  { id: 'slate', label: 'Xám Thép (Cơ khí)', swatch: 'bg-[#334155]' },
  { id: 'emerald', label: 'Xanh Lục (ISO Đạt)', swatch: 'bg-[#065f46]' },
  { id: 'purple', label: 'Tím (EDM / Wire)', swatch: 'bg-[#581c87]' },
  { id: 'crimson', label: 'Đỏ Đô (Laser / Cao tải)', swatch: 'bg-[#b81d1d]' },
  { id: 'amber', label: 'Vàng Đồng (Xung điện)', swatch: 'bg-[#a15502]' },
];

export const AddBookModal: React.FC<AddBookModalProps> = ({
  isOpen,
  defaultCabinetId,
  cabinets,
  onClose,
  onCreateBook,
}) => {
  const [assetCode, setAssetCode] = useState('');
  const [machineName, setMachineName] = useState('');
  const [vendorId, setVendorId] = useState<OemCabinetId>(defaultCabinetId);
  const [plant, setPlant] = useState<'SEV' | 'P1' | 'P2'>('SEV');
  const [specSubtitle, setSpecSubtitle] = useState('');
  const [footerTag, setFooterTag] = useState('SÁCH MỚI KHAI BÚT');
  const [spineTheme, setSpineTheme] = useState<BookSpineTheme>('cobalt');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setVendorId(defaultCabinetId);
      setErrorMsg('');
    }
  }, [isOpen, defaultCabinetId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetCode.trim() || !machineName.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Mã tài sản và Tên thiết bị.');
      return;
    }
    onCreateBook({
      assetCode: assetCode.trim().toUpperCase(),
      machineName: machineName.trim().toUpperCase(),
      vendorId,
      plant,
      specSubtitle: specSubtitle.trim() || '52 tuần nhật ký vận hành 2026',
      footerTag: footerTag.trim().toUpperCase() || 'CHỜ KHAI BÚT',
      spineTheme,
    });
    setAssetCode('');
    setMachineName('');
    setSpecSubtitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 bg-[#091738] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1864f3] flex items-center justify-center">
              <BookPlus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Thêm Cuốn Sổ Tay Thiết Bị Mới</h3>
              <p className="text-[11px] text-blue-200">
                Khởi tạo cuốn sách 52 tuần (W01–W52) lên tủ nhà cung cấp OEM
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {errorMsg && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">
                Mã định danh sách (Asset Code) *
              </label>
              <input
                type="text"
                value={assetCode}
                onChange={(e) => setAssetCode(e.target.value)}
                placeholder="VD: BK-DMU-85 hoặc MZK-VCN"
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono uppercase outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Nhà máy / Phân xưởng</label>
              <select
                value={plant}
                onChange={(e) => setPlant(e.target.value as 'SEV' | 'P1' | 'P2')}
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="SEV">SEV — Bắc Ninh</option>
                <option value="P1">P1 — Xưởng Gia công Chính</option>
                <option value="P2">P2 — Xưởng Khuôn mẫu & EDM</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">
              Tên đầy đủ thiết bị (In trên gáy sách) *
            </label>
            <input
              type="text"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              placeholder="VD: DMG MORI DMU 85 MONOBLOCK 5-AXIS"
              className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">
              Tủ Nhà Cung Cấp (OEM Cabinet)
            </label>
            <select
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value as OemCabinetId)}
              className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-500"
            >
              {cabinets.map((cab) => (
                <option key={cab.id} value={cab.id}>
                  {cab.shelfCode} • {cab.name} ({cab.totalAssets} máy)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">
                Thông số kỹ thuật nhanh
              </label>
              <input
                type="text"
                value={specSubtitle}
                onChange={(e) => setSpecSubtitle(e.target.value)}
                placeholder="VD: Trục chính 18k RPM · HSK-A63"
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Nhãn đáy gáy sách</label>
              <input
                type="text"
                value={footerTag}
                onChange={(e) => setFooterTag(e.target.value)}
                placeholder="VD: SÁCH TRẮNG +50 PTS"
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 uppercase outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Màu gáy sách theo nhóm công nghệ</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SPINE_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSpineTheme(t.id)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                    spineTheme === t.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded shrink-0 ${t.swatch}`} />
                  <span className="text-[11px] truncate">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1864f3] hover:bg-[#1456d8] text-white font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <BookPlus className="w-4 h-4" />
              <span>Đặt sách lên kệ tủ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
