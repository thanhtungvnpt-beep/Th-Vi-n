import React, { useState } from 'react';
import {
  X,
  Calculator,
  HelpCircle,
  FileCheck2,
  Zap,
  Award,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
  Clock,
  DollarSign,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';

interface KpiFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KpiDefinition {
  id: string;
  code: string;
  title: string;
  vietnameseTitle: string;
  formula: string;
  numerator: string;
  denominator: string;
  eligibilityRule: string;
  reportingPeriod: string;
  benchmarkTarget: string;
  actualCurrentValue: string;
  impactExplanation: string;
  category: 'efficiency' | 'quality' | 'compliance' | 'financial';
}

const KPI_DEFINITIONS: KpiDefinition[] = [
  {
    id: 'kpi-1',
    code: 'VCR-01',
    title: 'Verification Completion Rate',
    vietnameseTitle: 'Tỷ lệ hoàn thành xác minh kỹ thuật',
    formula: '(Số ca đã hoàn tất xác minh kỹ thuật / Tổng sự cố kỹ thuật ghi nhận) × 100%',
    numerator: 'Tổng số hồ sơ đã được Chuyên gia kỹ thuật ký xác nhận nguyên nhân gốc (Stage 02 Completed) trong kỳ báo cáo.',
    denominator: 'Tổng số hồ sơ sự cố phát sinh tại các dây chuyền thuộc phạm vi theo dõi trong cùng kỳ.',
    eligibilityRule: 'Hồ sơ có mức ưu tiên Critical/High/Medium phát sinh trên máy CNC/EDM/Robot. Bỏ qua các sự cố hủy do thao tác sai của người vận hành.',
    reportingPeriod: 'Chu kỳ trượt 30 ngày (Rolling 30-Day Window) hoặc lũy kế theo quý.',
    benchmarkTarget: '≥ 90.0% (Chuẩn nhà máy thông minh SEV)',
    actualCurrentValue: '92.8% (39/42 ca)',
    impactExplanation: 'Đảm bảo mọi sự cố kỹ thuật đều được chuyên gia thẩm định bài bản thay vì chỉ sửa tạm thời, tạo tiền đề để đúc kết SOP chất lượng cao.',
    category: 'compliance',
  },
  {
    id: 'kpi-2',
    code: 'KAR-02',
    title: 'Knowledge Application Rate',
    vietnameseTitle: 'Tỷ lệ áp dụng tri thức chuẩn hóa tại sàn máy',
    formula: '(Số ca kỹ thuật viên kích hoạt hướng dẫn số SOP / Tổng sự cố có bài viết đối sánh) × 100%',
    numerator: 'Số ca xử lý tại sàn máy có kích hoạt Digital Work Instruction hoặc trích dẫn SOP chuẩn từ EDM SMARTGUARD AI.',
    denominator: 'Tổng số ca sự cố phát sinh trên hệ thống mà cơ sở tri thức đã có sẵn bài viết SOP được phê duyệt.',
    eligibilityRule: 'Tính cho tất cả kỹ thuật viên ca máy vận hành tại SEV, P1, P2.',
    reportingPeriod: 'Hàng tháng (Monthly)',
    benchmarkTarget: '≥ 85.0%',
    actualCurrentValue: '88.5% (Tăng từ 52% sau 6 tháng áp dụng Hub)',
    impactExplanation: 'Đo lường mức độ tuân thủ quy trình chuẩn hóa của kỹ thuật viên ca máy, loại bỏ tình trạng sửa mò không theo tiêu chuẩn kỹ thuật.',
    category: 'efficiency',
  },
  {
    id: 'kpi-3',
    code: 'VASR-03',
    title: 'Verified Application Success Rate',
    vietnameseTitle: 'Tỷ lệ ứng dụng tri thức thành công sau 48h',
    formula: '(Số ca nghiệm thu thành công & máy chạy ổn định ≥ 48h / Tổng ca đã áp dụng tri thức) × 100%',
    numerator: 'Hồ sơ đạt tiêu chí: Máy hoạt động ổn định liên tục ≥ 48h, không phát sinh cảnh báo lỗi liên quan, do Chuyên gia KM nghiệm thu đóng hồ sơ.',
    denominator: 'Tổng số hồ sơ kỹ thuật viên đã hoàn thành sửa chữa theo hướng dẫn số SOP (Stage 05 Completed).',
    eligibilityRule: 'Bắt buộc qua thời gian theo dõi 48h tự động qua telemetry sensor và xác nhận ký số của Quản đốc/KM.',
    reportingPeriod: 'Hàng tháng / Quý',
    benchmarkTarget: '≥ 92.0%',
    actualCurrentValue: '94.2% (Vượt chỉ tiêu xuất sắc)',
    impactExplanation: 'Chỉ số cốt lõi chứng minh giá trị thực tế của tri thức: sửa xong máy phải chạy ổn định lâu dài, không chỉ dừng lại ở lý thuyết.',
    category: 'quality',
  },
  {
    id: 'kpi-4',
    code: 'RIR-04',
    title: 'Repeat Incident Rate (30 Days)',
    vietnameseTitle: 'Tỷ lệ tái diễn sự cố cùng mã lỗi trong 30 ngày',
    formula: '(Số sự cố lặp lại cùng mã lỗi trên cùng cụm máy trong 30 ngày / Tổng sự cố đã xử lý) × 100%',
    numerator: 'Số lượng sự cố ghi nhận mới có [Mã lỗi + Model máy + Cụm linh kiện] trùng với hồ sơ đã đóng trong vòng 30 ngày trước đó.',
    denominator: 'Tổng số ca sự cố kỹ thuật đã giải quyết đóng hồ sơ.',
    eligibilityRule: 'Tính theo định danh máy duy nhất (Equipment UUID) và mã lỗi chuẩn hóa ISO/OEM.',
    reportingPeriod: 'Chu kỳ trượt 30 ngày (Rolling 30-Day Window)',
    benchmarkTarget: '≤ 4.5% (Baseline ban đầu: 7.2%)',
    actualCurrentValue: '4.2% (Giảm 42% so với giai đoạn trước khi chuẩn hóa)',
    impactExplanation: 'Chỉ số vàng phản ánh chất lượng xác minh nguyên nhân gốc rễ và bài học phòng ngừa (Lessons Learned) có thực sự hiệu quả.',
    category: 'quality',
  },
  {
    id: 'kpi-5',
    code: 'OWR-05',
    title: 'Overdue Workflow Rate (SLA Breach)',
    vietnameseTitle: 'Tỷ lệ trễ hạn quy trình vòng đời (Vi phạm SLA)',
    formula: '(Số ca có thời gian xử lý tại công đoạn vượt ngưỡng SLA cam kết / Tổng số ca đang hoạt động) × 100%',
    numerator: 'Số hồ sơ có slaRemainingHours < 0 tại bất kỳ công đoạn nào (01 Tiếp nhận, 02 Xác minh, 03 Phê duyệt, v.v.).',
    denominator: 'Tổng số hồ sơ vòng đời tri thức đang trong trạng thái xử lý (In-Progress).',
    eligibilityRule: 'SLA tính theo mức ưu tiên: Critical: 4h, High: 8h, Medium: 24h, Low: 48h.',
    reportingPeriod: 'Thời gian thực (Real-time Continuous Monitoring)',
    benchmarkTarget: '< 5.0% (Ngưỡng cảnh báo đỏ)',
    actualCurrentValue: '4.8% (2/42 ca - Đang kích hoạt cơ chế leo thang Escalation)',
    impactExplanation: 'Ngăn ngừa hiện tượng tắc nghẽn hồ sơ, đùn đẩy trách nhiệm giữa các phòng ban Kỹ thuật - Bảo trì - Quản lý tri thức.',
    category: 'compliance',
  },
  {
    id: 'kpi-6',
    code: 'MTTR-06',
    title: 'Mean Time to Resolution Reduction',
    vietnameseTitle: 'Mức độ cắt giảm thời gian dừng máy trung bình (MTTR)',
    formula: 'ΔMTTR = ((MTTR_trước - MTTR_sau) / MTTR_trước) × 100%',
    numerator: 'Chênh lệch giữa thời gian phục hồi trung bình trước khi có Hub (4.8 giờ) trừ đi MTTR hiện tại (3.0 giờ).',
    denominator: 'MTTR cơ sở (Baseline MTTR = 4.8 giờ/ca).',
    eligibilityRule: 'Tính từ thời điểm máy dừng khẩn cấp (Alarm Trip) đến khi khôi phục sản xuất thành công.',
    reportingPeriod: 'Lũy kế 6 tháng gần nhất',
    benchmarkTarget: 'Cắt giảm ≥ 25.0%',
    actualCurrentValue: '-37.5% (Từ 4.8h giảm xuống còn 3.0h/ca)',
    impactExplanation: 'Tiết kiệm trực tiếp 1.8 giờ dừng chuyền cho mỗi ca sự cố, giải phóng công suất sản xuất cho toàn bộ phân xưởng phay CNC & cắt dây EDM.',
    category: 'financial',
  },
  {
    id: 'kpi-7',
    code: 'ROI-07',
    title: 'Total Cost Avoidance / Cost Saving',
    vietnameseTitle: 'Giá trị tiết kiệm chi phí & Tránh tổn thất sản xuất',
    formula: 'Tổng tiết kiệm = Σ (ΔDowntime × Đơn giá dừng chuyền/giờ) + Σ (Chi phí phụ tùng hỏng tránh được)',
    numerator: 'Tổng hợp số giờ downtime tiết kiệm được nhân với chi phí downtime định mức (18.5 triệu VND/giờ) cộng với chi phí phụ tùng thay mới tránh được nhờ khắc phục chuẩn.',
    denominator: 'Không có (Tổng giá trị tài chính tích lũy theo VNĐ).',
    eligibilityRule: 'Được phòng Tài chính & Kế toán Quản trị thẩm định đối soát chéo độc lập.',
    reportingPeriod: 'Năm tài chính hiện tại (YTD)',
    benchmarkTarget: '≥ 800 triệu VND/năm',
    actualCurrentValue: '1.26 tỷ VND (Đạt 157% kế hoạch năm)',
    impactExplanation: 'Bằng chứng kinh tế định lượng rõ ràng cho Ban Giám đốc về hiệu quả đầu tư hệ thống Quản trị tri thức công nghiệp thông minh.',
    category: 'financial',
  },
];

export const KpiFormulaModal: React.FC<KpiFormulaModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeKpiId, setActiveKpiId] = useState<string>('kpi-1');

  if (!isOpen) return null;

  const filteredKpis = KPI_DEFINITIONS.filter(
    (k) => selectedCategory === 'all' || k.category === selectedCategory
  );

  const activeKpi = KPI_DEFINITIONS.find((k) => k.id === activeKpiId) || KPI_DEFINITIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#0b1b42] border border-[#1d3a77] rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-[#1b3874] flex items-center justify-between bg-[#081534]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  ĐẶC TẢ CÔNG THỨC TOÁN HỌC & CHUẨN ĐO LƯỜNG KPI
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 uppercase">
                  Industrial KPI Spec v2.1
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Quy định chi tiết phương pháp tính toán: Tử số, Mẫu số, Tiêu chí đủ điều kiện và Chu kỳ báo cáo cho 8 chỉ số điều hành
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-5 py-2.5 bg-[#091738] border-b border-[#162d64] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium">Nhóm chỉ số:</span>
          {[
            { id: 'all', label: 'Tất cả (7 chỉ số chuẩn)' },
            { id: 'quality', label: 'Chất lượng tri thức & Ổn định' },
            { id: 'efficiency', label: 'Hiệu suất vận hành & MTTR' },
            { id: 'compliance', label: 'Tuân thủ SLA & Xác minh' },
            { id: 'financial', label: 'Tài chính & Tiết kiệm chi phí' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[#0f2352] text-slate-300 hover:text-white hover:bg-[#153272]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Body: Split View (List on left, detail on right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
          {/* Left Column: KPI Selector List */}
          <div className="p-3 bg-[#081534]/70 border-r border-[#162d64] overflow-y-auto space-y-2 max-h-[60vh] md:max-h-none">
            {filteredKpis.map((kpi) => {
              const isSelected = kpi.id === activeKpi.id;
              return (
                <div
                  key={kpi.id}
                  onClick={() => setActiveKpiId(kpi.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition text-xs space-y-1 ${
                    isSelected
                      ? 'bg-blue-600/30 border-blue-400 shadow-md ring-1 ring-blue-400 text-white'
                      : 'bg-[#0b1b42] border-[#18346c] hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[10px] text-cyan-300 px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-500/30">
                      {kpi.code}
                    </span>
                    <span className="font-mono font-black text-xs text-emerald-400">
                      {kpi.actualCurrentValue.split(' ')[0]}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-100 line-clamp-1">{kpi.vietnameseTitle}</h4>
                  <p className="text-[11px] text-slate-400 font-mono truncate">{kpi.title}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Mathematical Specification Detail */}
          <div className="p-5 md:col-span-2 overflow-y-auto space-y-4 max-h-[60vh] md:max-h-none bg-[#091738]/50">
            {/* Header of Active KPI */}
            <div className="space-y-1.5 pb-3 border-b border-[#1b3874]">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-blue-500/20 text-cyan-300 font-bold border border-cyan-400/30">
                  {activeKpi.code} — {activeKpi.title}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Mục tiêu chuẩn: {activeKpi.benchmarkTarget}
                </span>
              </div>
              <h2 className="text-lg font-black text-white">{activeKpi.vietnameseTitle}</h2>
            </div>

            {/* Formula Block */}
            <div className="p-4 rounded-xl bg-[#061026] border border-blue-500/40 space-y-2">
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" /> Công thức toán học chính thức
              </span>
              <div className="p-3 bg-[#0a1b40] rounded-lg border border-blue-400/30 text-center font-mono text-sm md:text-base font-black text-cyan-200 shadow-inner">
                {activeKpi.formula}
              </div>
            </div>

            {/* Mathematical Components Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Numerator */}
              <div className="p-3.5 rounded-xl bg-[#0b1f48] border border-[#1b3874] space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Tử số (Numerator)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{activeKpi.numerator}</p>
              </div>

              {/* Denominator */}
              <div className="p-3.5 rounded-xl bg-[#0b1f48] border border-[#1b3874] space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Mẫu số (Denominator)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{activeKpi.denominator}</p>
              </div>
            </div>

            {/* Eligibility & Reporting Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0b1f48] border border-[#1b3874] space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Tiêu chí tính toán (Eligibility Rules)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{activeKpi.eligibilityRule}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0b1f48] border border-[#1b3874] space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                  Chu kỳ báo cáo & Tần suất đo
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{activeKpi.reportingPeriod}</p>
              </div>
            </div>

            {/* Operational Impact */}
            <div className="p-3.5 rounded-xl bg-[#081736] border border-blue-500/20 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                Ý nghĩa vận hành & Tác động thực tế trong nhà máy
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeKpi.impactExplanation}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1b3874] bg-[#081534] flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Hệ thống tính toán tự động mỗi 15 phút từ luồng dữ liệu SCADA & Phiếu công tác số.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-600/30"
          >
            Đã hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
