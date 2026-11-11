import React, { useState } from 'react';
import {
  Smartphone,
  QrCode,
  Mic,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Download,
  Check,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Flame,
  Thermometer,
  Gauge,
} from 'lucide-react';
import { IncidentItem } from '../../types';

interface MobileFieldModuleProps {
  incident: IncidentItem;
  onBackToDesktop: () => void;
}

export const MobileFieldModule: React.FC<MobileFieldModuleProps> = ({
  incident,
  onBackToDesktop,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [isScanningQR, setIsScanningQR] = useState(false);
  const [callAlert, setCallAlert] = useState(false);
  const [offlineSaved, setOfflineSaved] = useState(false);

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 text-slate-100 select-none pb-6">
      {/* Mobile Top Bar */}
      <div className="bg-[#091738] p-4 border-b border-slate-800 flex items-center justify-between">
        <button
          onClick={onBackToDesktop}
          className="flex items-center gap-1 text-xs text-blue-400 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Về Desktop</span>
        </button>

        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-white tracking-wider">
            HIỆN TRƯỜNG MOBILE
          </span>
        </div>

        <button
          onClick={() => setCallAlert(true)}
          className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow"
          title="Gọi khẩn cấp chuyên gia"
        >
          <PhoneCall className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Emergency Call Alert Banner */}
      {callAlert && (
        <div className="bg-red-600 p-3 text-white text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Đang kết nối Hotline Chuyên gia Trưởng ca (+84-909-xxx-888)...</span>
          </div>
          <button onClick={() => setCallAlert(false)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Sensor Monitor Warning Box */}
      <div className="p-4 bg-slate-800/80 border-b border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <div>
              <div className="font-bold text-xs text-white leading-tight">
                {incident.machineId} — {incident.title}
              </div>
              <div className="text-[10px] text-slate-400">
                Model: {incident.model} ({incident.vendor})
              </div>
            </div>
          </div>
          <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            CẤP 1 - KHẨN CẤP
          </span>
        </div>

        {/* Live Telemetry */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="bg-slate-900 p-2.5 rounded-xl border border-red-500/30 flex items-center gap-2.5">
            <Thermometer className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Nhiệt độ Spindle</div>
              <div className="text-sm font-black text-red-400">72.4°C <span className="text-[9px] font-normal text-red-300">(Ngưỡng &lt; 50°C)</span></div>
            </div>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-amber-500/30 flex items-center gap-2.5">
            <Gauge className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Lưu lượng nước</div>
              <div className="text-sm font-black text-amber-400">8.2 L/min <span className="text-[9px] font-normal text-amber-300">(Chuẩn ≥ 12)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tools */}
      <div className="px-4 py-3 flex items-center justify-between gap-2 border-b border-slate-800 text-xs">
        <button
          onClick={() => setIsScanningQR(!isScanningQR)}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow"
        >
          <QrCode className="w-4 h-4" />
          <span>{isScanningQR ? 'Đóng Camera' : 'Quét QR Máy'}</span>
        </button>

        <button
          onClick={() => setOfflineSaved(!offlineSaved)}
          className={`flex-1 py-2 font-semibold rounded-xl flex items-center justify-center gap-1.5 border transition-all ${
            offlineSaved
              ? 'bg-emerald-600 text-white border-emerald-500'
              : 'bg-slate-800 text-slate-200 border-slate-700'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>{offlineSaved ? 'Đã lưu Offline' : 'Lưu SOP Offline'}</span>
        </button>
      </div>

      {/* Simulated Camera View */}
      {isScanningQR && (
        <div className="mx-4 mt-3 p-4 bg-slate-950 border border-blue-500/50 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-32 h-32 border-2 border-dashed border-blue-400 rounded-xl flex items-center justify-center relative">
            <div className="absolute inset-x-2 top-1/2 h-0.5 bg-red-500 animate-pulse" />
            <QrCode className="w-16 h-16 text-blue-400/50" />
          </div>
          <span className="text-xs text-blue-300 font-semibold">
            Đã nhận diện: Mã máy CNC-04 (Line A)
          </span>
        </div>
      )}

      {/* Interactive Step-by-Step SOP Checklist for 1-hand operation */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs text-white uppercase tracking-wider">
            Checklist 5 bước khắc phục (SOP)
          </h4>
          <span className="text-[11px] font-semibold text-emerald-400">
            Đã xong: {completedSteps.length} / 5
          </span>
        </div>

        <div className="space-y-2.5">
          {incident.steps.map((step, idx) => {
            const stepNum = typeof step.number === 'number' ? step.number : idx + 1;
            const isDone = completedSteps.includes(stepNum);

            return (
              <div
                key={idx}
                onClick={() => toggleStep(stepNum)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/50'
                    : 'bg-slate-800/80 border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {isDone ? '✓' : stepNum}
                  </div>

                  <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                    <img src={step.image} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="min-w-0">
                    <div
                      className={`text-xs font-semibold leading-tight line-clamp-1 ${
                        isDone ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {stepNum === 1
                        ? 'Kiểm tra lưới lọc cặn'
                        : stepNum === 2
                        ? 'Thay lõi lọc 50µm'
                        : stepNum === 3
                        ? 'Đo dòng motor 1.4A'
                        : stepNum === 4
                        ? 'Đạt ≥ 12 L/min'
                        : 'Test spindle nhiệt ≤ 45°C'}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'border-slate-600'
                  }`}
                >
                  {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit completion */}
        <button
          onClick={() => {
            setCompletedSteps([1, 2, 3, 4, 5]);
          }}
          className="w-full mt-4 py-3 bg-[#1864f3] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Xác nhận đóng ca & Ghi nhận kết quả</span>
        </button>
      </div>
    </div>
  );
};
