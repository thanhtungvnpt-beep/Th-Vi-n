import React, { useState, useEffect } from 'react';
import { X, Plus, Upload, Check, Sparkles, Wrench, AlertTriangle } from 'lucide-react';
import { IncidentItem } from '../types';

interface NewIncidentModalProps {
  isOpen: boolean;
  initialData?: Partial<IncidentItem> | null;
  onClose: () => void;
  onSubmit: (newIncident: Partial<IncidentItem>) => void;
}

export const NewIncidentModal: React.FC<NewIncidentModalProps> = ({
  isOpen,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [machineId, setMachineId] = useState('CNC-04');
  const [vendor, setVendor] = useState('Mitsubishi');
  const [model, setModel] = useState('M-V800');
  const [code, setCode] = useState('');
  const [phenomenon, setPhenomenon] = useState('');
  const [cause, setCause] = useState('');
  const [stepsText, setStepsText] = useState('');
  const [fromAi, setFromAi] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setTitle(initialData.title || '');
      setMachineId(initialData.machineId || 'CNC-04');
      setVendor(initialData.vendor || 'Mitsubishi');
      setModel(initialData.model || 'M-V800');
      setCode(initialData.code || '');
      setPhenomenon(
        Array.isArray(initialData.phenomenon)
          ? initialData.phenomenon.join('\n')
          : (initialData.phenomenon as any) || ''
      );
      setCause(
        Array.isArray(initialData.rootCauses)
          ? initialData.rootCauses.join('\n')
          : (initialData.rootCauses as any) || ''
      );
      if (initialData.steps && initialData.steps.length > 0) {
        setStepsText(
          initialData.steps.map((st) => `Bước ${st.number}: ${st.title}`).join('\n')
        );
      }
      setFromAi(true);
    } else if (isOpen && !initialData) {
      setTitle('');
      setMachineId('CNC-04');
      setVendor('Mitsubishi');
      setModel('M-V800');
      setCode('');
      setPhenomenon('');
      setCause('');
      setStepsText('');
      setFromAi(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedSteps = stepsText.split('\n').filter(Boolean).map((line, idx) => ({
      number: idx + 1,
      title: line.replace(/^Bước\s*\d+:\s*/i, '').trim(),
      image: '/extracted/photo_step1.png',
    }));

    onSubmit({
      title,
      code: code || 'ERR-01',
      machineId,
      vendor,
      model,
      phenomenon: phenomenon.split('\n').filter(Boolean),
      rootCauses: cause.split('\n').filter(Boolean),
      steps: parsedSteps.length > 0 ? parsedSteps : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#091738] via-[#0d2354] to-[#123175] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Đăng ca xử lý sự cố mới</h3>
              <p className="text-[10px] text-blue-200">Kho tri thức chuẩn hóa SOP xưởng cơ khí</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Pre-fill Banner if converted from AI */}
        {fromAi && (
          <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-200 flex items-start gap-2.5 text-blue-900 text-xs">
            <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <strong className="font-bold text-blue-800 block text-[11px]">
                ĐÃ TỰ ĐỘNG ĐIỀN DỮ LIỆU TỪ SMARTGUARD AI
              </strong>
              <span className="text-[10.5px] text-blue-700 leading-snug">
                Nội dung sự cố, nguyên nhân và các bước kiểm tra đã được trích xuất từ câu trả lời của AI. Vui lòng kiểm tra lại trước khi gửi phê duyệt.
              </span>
            </div>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Tiêu đề sự cố *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Spindle quá nhiệt (E210)"
              className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Mã lỗi
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="VD: E210, AL-03"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-slate-800"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Mã máy
              </label>
              <input
                type="text"
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                placeholder="CNC-04"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Vendor/Hãng
              </label>
              <select
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="w-full h-8 px-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-slate-800"
              >
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Makino">Makino</option>
                <option value="Okuma">Okuma</option>
                <option value="Sodick">Sodick</option>
                <option value="Fanuc">Fanuc</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Model máy
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="M-V800"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              1. Hiện tượng ghi nhận (mỗi dòng 1 ý)
            </label>
            <textarea
              rows={2}
              value={phenomenon}
              onChange={(e) => setPhenomenon(e.target.value)}
              placeholder="Máy dừng đột ngột, nhiệt độ tăng cao > 70°C..."
              className="w-full p-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-slate-800"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              2. Nguyên nhân xác định (mỗi dòng 1 ý)
            </label>
            <textarea
              rows={2}
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              placeholder="Tắc lọc nước làm mát, lưu lượng < 12 L/phút..."
              className="w-full p-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-slate-800"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              3. Quy trình kiểm tra & khắc phục (mỗi dòng 1 bước)
            </label>
            <textarea
              rows={3}
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              placeholder="Bước 1: Dừng xoay trục chính Spindle&#10;Bước 2: Vệ sinh cốc lọc thứ cấp&#10;Bước 3: Đo lưu lượng nước hồi đạt ≥ 12 L/phút"
              className="w-full p-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-slate-800 font-mono text-[11px]"
            />
          </div>

          <div className="border border-dashed border-slate-300 rounded-xl p-3 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors">
            <Upload className="w-5 h-5 text-blue-500 mb-1" />
            <span className="text-[11px] font-medium">Tải lên hình ảnh / video minh chứng (tùy chọn)</span>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1864f3] hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/25 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Gửi phê duyệt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
