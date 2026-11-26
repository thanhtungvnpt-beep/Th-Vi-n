import React, { useState, useEffect } from 'react';
import { X, FolderPlus, ShieldAlert, Layers } from 'lucide-react';
import { OemCabinetInfo, UserRole } from '../../types';

interface AddCabinetModalProps {
  isOpen: boolean;
  currentRole: UserRole;
  existingCabinetsCount: number;
  onClose: () => void;
  onCreateCabinet: (newCabinet: Omit<OemCabinetInfo, 'id'>) => void;
}

const ACCENT_COLORS = [
  { id: '#1d4ed8', label: 'Xanh Cobalt' },
  { id: '#784b00', label: 'Nâu Đồng' },
  { id: '#b91c1c', label: 'Đỏ Đô' },
  { id: '#065f46', label: 'Xanh Lục' },
  { id: '#0284c7', label: 'Xanh Sky' },
  { id: '#581c87', label: 'Tím Đậm' },
  { id: '#334155', label: 'Xám Thép' },
];

export const AddCabinetModal: React.FC<AddCabinetModalProps> = ({
  isOpen,
  currentRole,
  existingCabinetsCount,
  onClose,
  onCreateCabinet,
}) => {
  const isAdmin = currentRole === 'admin';
  const nextShelfNum = String(existingCabinetsCount + 1).padStart(2, '0');

  const [shelfCode, setShelfCode] = useState(`KỆ ${nextShelfNum}`);
  const [shortName, setShortName] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Nhật Bản');
  const [totalAssets, setTotalAssets] = useState('24');
  const [shelfLabel, setShelfLabel] = useState('');
  const [accentColor, setAccentColor] = useState('#1d4ed8');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      const nextNum = String(existingCabinetsCount + 1).padStart(2, '0');
      setShelfCode(`KỆ ${nextNum}`);
      setShortName('');
      setName('');
      setCountry('Nhật Bản');
      setTotalAssets('24');
      setShelfLabel('');
      setAccentColor('#1d4ed8');
      setErrorMsg('');
    }
  }, [isOpen, existingCabinetsCount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setErrorMsg(
        'Chỉ tài khoản Quản trị viên (Admin) mới có quyền tạo mới Kệ Sách Nhà Cung Cấp.'
      );
      return;
    }

    const cleanShort = shortName.trim().toUpperCase();
    const cleanCode = shelfCode.trim().toUpperCase() || `KỆ ${nextShelfNum}`;
    const cleanName = name.trim() || `Tủ Nhà Cung Cấp ${cleanShort}`;

    if (!cleanShort) {
      setErrorMsg('Vui lòng nhập Tên viết tắt nhà cung cấp máy (OEM).');
      return;
    }

    const parsedCapacity = Math.max(1, Number(totalAssets) || 12);
    const cleanLabel =
      shelfLabel.trim().toUpperCase() ||
      `${cleanCode} • TỦ NHÀ CUNG CẤP ${cleanShort} (${country.toUpperCase()} PORTFOLIO)`;

    onCreateCabinet({
      shelfCode: cleanCode,
      shortName: cleanShort,
      name: cleanName,
      country: country.trim() || 'Đa quốc gia',
      totalAssets: parsedCapacity,
      shelfLabel: cleanLabel,
      accentColor,
      isCustom: true,
      createdBy: 'Quản trị viên (Admin)',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 bg-[#091738] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1864f3] flex items-center justify-center">
              <FolderPlus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Tạo Kệ Sách Nhà Cung Cấp Máy Mới</h3>
              <p className="text-[11px] text-blue-200">
                Phân quyền Quản trị viên (Admin) • Mở rộng tủ lưu trữ sổ tay thiết bị OEM
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
          {!isAdmin && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Yêu cầu quyền Quản trị viên (Admin)</div>
                <p className="mt-0.5 text-[11px] leading-relaxed">
                  Vai trò hiện tại không có quyền tạo tủ OEM mới. Hãy chuyển sang{' '}
                  <strong>Quản trị viên</strong> ở góc phải thanh tiêu đề trên cùng để mở khóa thao
                  tác này.
                </p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Mã kệ tủ</label>
              <input
                type="text"
                value={shelfCode}
                onChange={(e) => setShelfCode(e.target.value)}
                placeholder={`KỆ ${nextShelfNum}`}
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono uppercase outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-slate-700 block">
                Tên hãng / Nhà cung cấp (OEM) *
              </label>
              <input
                type="text"
                value={shortName}
                onChange={(e) => {
                  const val = e.target.value;
                  setShortName(val);
                  if (!name.trim() || name.startsWith('Tủ Nhà Cung Cấp ')) {
                    setName(val.trim() ? `Tủ Nhà Cung Cấp ${val.trim().toUpperCase()}` : '');
                  }
                }}
                placeholder="VD: HAAS AUTOMATION, BROTHER, CHARMILLES..."
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 uppercase outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">
              Tiêu đề đầy đủ trên đầu kệ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Tủ Nhà Cung Cấp HAAS AUTOMATION (Trung tâm gia công CNC Mỹ)"
              className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Quốc gia / Xuất xứ OEM</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="VD: Mỹ, Thụy Sĩ, Nhật Bản, Đức..."
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">
                Sức chứa thiết bị dự kiến (Cuốn)
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={totalAssets}
                onChange={(e) => setTotalAssets(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono tabular-nums outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">
              Nhãn thanh gỗ dưới kệ (Tùy chọn)
            </label>
            <input
              type="text"
              value={shelfLabel}
              onChange={(e) => setShelfLabel(e.target.value)}
              placeholder="Tự động sinh từ Mã kệ & Tên nhà cung cấp nếu để trống"
              className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono uppercase outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Màu đánh dấu tủ OEM</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setAccentColor(c.id)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border cursor-pointer transition-all ${
                    accentColor === c.id
                      ? 'border-blue-600 bg-blue-50 text-blue-950 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-xs shrink-0"
                    style={{ backgroundColor: c.id }}
                  />
                  <span className="text-[11px]">{c.label}</span>
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
              Đóng
            </button>
            <button
              type="submit"
              disabled={!isAdmin}
              className="px-5 py-2 rounded-xl bg-[#1864f3] hover:bg-[#1456d8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Tạo Kệ Sách OEM</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
