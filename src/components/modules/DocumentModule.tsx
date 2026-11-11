import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  Eye,
  Filter,
  Search,
  RotateCcw,
  Plus,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  FileCode,
  HardDrive,
  X,
} from 'lucide-react';
import { TechnicalDocumentItem } from '../../types';

interface DocumentModuleProps {
  documents: TechnicalDocumentItem[];
  onOpenUploadModal: () => void;
}

export const DocumentModule: React.FC<DocumentModuleProps> = ({
  documents,
  onOpenUploadModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [vendor, setVendor] = useState('Tất cả');
  const [format, setFormat] = useState('Tất cả');
  const [viewingDoc, setViewingDoc] = useState<TechnicalDocumentItem | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả (1,248)' },
    { id: 'manual', label: 'Manual (342)' },
    { id: 'sop', label: 'SOP (418)' },
    { id: 'diagram', label: 'Sơ đồ điện (215)' },
    { id: 'drawing', label: 'Bản vẽ kỹ thuật (184)' },
    { id: 'spare_parts', label: 'Phụ tùng thay thế (89)' },
  ];

  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory !== 'all' && doc.type !== selectedCategory) return false;
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      if (!doc.title.toLowerCase().includes(q) && !doc.code.toLowerCase().includes(q))
        return false;
    }
    if (vendor !== 'Tất cả' && doc.vendor !== vendor) return false;
    if (format !== 'Tất cả' && doc.fileFormat !== format) return false;
    return true;
  });

  return (
    <div className="space-y-3.5 select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a2c75] via-[#0f3d9c] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
        <div className="relative z-10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-[460px]">
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              Thư viện tài liệu kỹ thuật
            </h1>
            <p className="text-[#bfd6ff] text-xs font-normal mt-1.5 leading-relaxed">
              Hướng dẫn vận hành • SOP chuẩn hóa • Sơ đồ mạch điện • Danh mục phụ tùng
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 min-w-[400px]">
            <div className="bg-[#123e93]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#2368ee] text-white flex items-center justify-center mb-1">
                <BookOpen className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                1,248
              </div>
              <div className="text-[11px] text-[#a9c7ff] font-medium mt-1">
                Tài liệu
              </div>
            </div>

            <div className="bg-[#094c45]/85 border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#10b981] text-white flex items-center justify-center mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                896
              </div>
              <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
                Đã duyệt
              </div>
            </div>

            <div className="bg-[#19326e]/85 border border-blue-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#3b82f6] text-white flex items-center justify-center mb-1">
                <Download className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                4,520
              </div>
              <div className="text-[11px] text-[#bfdbfe] font-medium mt-1">
                Lượt tải
              </div>
            </div>

            <div className="bg-[#09462f]/85 border border-emerald-400/35 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-5 h-5 rounded-md bg-[#059669] text-white flex items-center justify-center mb-1">
                <HardDrive className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                99%
              </div>
              <div className="text-[11px] text-[#a7f3d0] font-medium mt-1">
                Độ chính xác
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Pills & Action */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1864f3] text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={onOpenUploadModal}
          className="px-4 py-2 bg-[#1864f3] hover:bg-[#1456d8] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm shadow-blue-500/25 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tải lên tài liệu</span>
        </button>
      </div>

      {/* 3. Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* Left Filter */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3.5 select-none">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Bộ lọc tài liệu
              </h3>
              <Filter className="w-3.5 h-3.5 text-[#1864f3]" />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Tìm kiếm</label>
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Mã tài liệu, tên máy..."
                  className="w-full h-8 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs pl-8 pr-2.5 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Hãng / Vendor</label>
              <div className="relative">
                <select
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full h-8 bg-slate-50 border border-slate-200 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
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

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Định dạng file</label>
              <div className="relative">
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full h-8 bg-slate-50 border border-slate-200 text-slate-800 text-xs px-2.5 rounded-lg outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="PDF">PDF</option>
                  <option value="DXF">DXF (Bản vẽ CAD)</option>
                  <option value="DOCX">DOCX</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setKeyword('');
                  setVendor('Tất cả');
                  setFormat('Tất cả');
                  setSelectedCategory('all');
                }}
                className="w-full h-8 bg-white text-slate-700 font-medium text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Đặt lại</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center: Documents Grid/List */}
        <div className="xl:col-span-9 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-bold text-xs text-slate-800 tracking-tight">
              {filteredDocs.length} tài liệu kỹ thuật
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        doc.fileFormat === 'PDF'
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : doc.fileFormat === 'DXF'
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}
                    >
                      {doc.fileFormat} • {doc.fileSize}
                    </span>

                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ✓ Đã duyệt ({doc.version})
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {doc.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-slate-500 font-medium">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      Mã: {doc.code}
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      Thiết bị: {doc.machine} ({doc.vendor})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {doc.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      {doc.downloads.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewingDoc(doc)}
                      className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1864f3] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => setViewingDoc(doc)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Tải về"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Detail Preview Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-5 py-3.5 bg-[#091738] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm truncate max-w-md">{viewingDoc.title}</h3>
              </div>
              <button onClick={() => setViewingDoc(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-[10px]">
                  {viewingDoc.fileFormat}
                </span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                  Kích thước: {viewingDoc.fileSize}
                </span>
                <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  Phiên bản {viewingDoc.version}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Tóm tắt nội dung tài liệu:</h4>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {viewingDoc.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Tác giả / Nhà phát hành:</span>
                  <strong className="text-slate-900">{viewingDoc.author}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Ngày cập nhật:</span>
                  <strong className="text-slate-900">{viewingDoc.updatedAt}</strong>
                </div>
              </div>

              {/* Mock PDF document page frame */}
              <div className="border border-slate-300 rounded-xl p-4 bg-slate-100/50 flex flex-col items-center justify-center text-center space-y-2 min-h-[140px]">
                <FileCode className="w-8 h-8 text-blue-600" />
                <span className="font-semibold text-slate-800">
                  {viewingDoc.code} — Xem trước tài liệu kỹ thuật
                </span>
                <span className="text-[11px] text-slate-500">
                  Đã được số hóa và lập chỉ mục cho AI Knowledge Search
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setViewingDoc(null)}
                  className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setViewingDoc(null);
                  }}
                  className="px-5 py-2 bg-[#1864f3] hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải file ({viewingDoc.fileFormat})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
