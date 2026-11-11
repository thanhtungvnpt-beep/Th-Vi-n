import React, { useState } from 'react';
import {
  Check,
  Copy,
  Info,
  CheckCircle2,
  Wrench,
  Sliders,
  ShieldAlert,
  Terminal,
  ExternalLink,
} from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  onNavigateTab?: (tabId: string) => void;
}

// Regex helpers for inline parameters with engineering units
const UNIT_REGEX = /\b(\d+(\.\d+)?\s*(°C|L\/phút|L\/min|MPa|bar|RPM|µm|um|µS\/cm|A|V|kW|kgf|mm|sec|phút))\b/gi;

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onNavigateTab }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper to render inline formatting: bold, italic, inline code, parameter pills
  const renderInline = (text: string) => {
    // Split by bold (**text**), inline code (`code`), strikethrough (~~text~~), italic (*text*), parameter tags [Tham số: ...]
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|~~.*?~~|\*.*?\*|\[.*?\])/g);

    return parts.map((part, idx) => {
      if (!part) return null;

      // Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-white tracking-tight">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Inline Code / Machine parameters
      if (part.startsWith('`') && part.endsWith('`')) {
        const codeText = part.slice(1, -1);
        const isParam = /^[A-Z0-9\-_./]{2,18}$/.test(codeText) || UNIT_REGEX.test(codeText);
        return (
          <code
            key={idx}
            className={`px-1.5 py-0.5 rounded text-[11px] font-mono border ${
              isParam
                ? 'bg-blue-900/60 text-cyan-200 border-cyan-400/40 font-semibold shadow-xs'
                : 'bg-[#0d1c3a] text-blue-200 border-blue-400/30'
            }`}
          >
            {codeText}
          </code>
        );
      }

      // Parameter Badge in brackets: [Tiêu chuẩn: ...] or [Cảnh báo: ...]
      if (part.startsWith('[') && part.endsWith(']') && part.length > 3) {
        const badgeContent = part.slice(1, -1);
        const isWarning =
          badgeContent.toLowerCase().includes('cảnh báo') ||
          badgeContent.toLowerCase().includes('nguy') ||
          badgeContent.toLowerCase().includes('warning');
        const isTarget =
          badgeContent.toLowerCase().includes('chuẩn') ||
          badgeContent.toLowerCase().includes('mục tiêu') ||
          badgeContent.toLowerCase().includes('target');

        return (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 px-1.5 py-0.2 mx-1 rounded text-[10px] font-mono font-bold border ${
              isWarning
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : isTarget
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-blue-500/20 text-cyan-300 border-blue-400/40'
            }`}
          >
            {badgeContent}
          </span>
        );
      }

      // Strikethrough
      if (part.startsWith('~~') && part.endsWith('~~')) {
        return (
          <del key={idx} className="line-through text-slate-400">
            {part.slice(2, -2)}
          </del>
        );
      }

      // Italic
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return (
          <em key={idx} className="italic text-blue-200">
            {part.slice(1, -1)}
          </em>
        );
      }

      return part;
    });
  };

  // Split lines into blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let index = 0;
  let codeBlockCounter = 0;

  while (index < lines.length) {
    const line = lines[index];

    // 1. Fenced Code Block: ```lang ... ```
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim() || 'sh';
      const codeLines: string[] = [];
      index++;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index++;
      }
      index++; // skip closing ```
      const codeString = codeLines.join('\n');
      const blockId = codeBlockCounter++;

      elements.push(
        <div
          key={`code-${blockId}-${index}`}
          className="my-2.5 rounded-xl bg-[#061025] border border-blue-500/30 overflow-hidden shadow-md text-xs font-mono"
        >
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#0a1838] border-b border-blue-500/20 text-[10px] text-blue-300">
            <span className="font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>{lang}</span>
            </span>
            <button
              onClick={() => handleCopyCode(codeString, blockId)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedCodeIndex === blockId ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 text-[11px] text-cyan-100 overflow-x-auto leading-relaxed">
            <code>{codeString}</code>
          </pre>
        </div>
      );
      continue;
    }

    // 2. Blockquote / Safety Warning: > ...
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoteLines.push(lines[index].replace(/^>\s?/, ''));
        index++;
      }
      const quoteText = quoteLines.join(' ');
      const isWarning =
        quoteText.toLowerCase().includes('an toàn') ||
        quoteText.toLowerCase().includes('cảnh báo') ||
        quoteText.toLowerCase().includes('lưu ý') ||
        quoteText.toLowerCase().includes('nguy hiểm') ||
        quoteText.toLowerCase().includes('warning') ||
        quoteText.toLowerCase().includes('danger');

      elements.push(
        <div
          key={`quote-${index}`}
          className={`my-2 p-3 rounded-xl border flex items-start gap-2.5 shadow-sm ${
            isWarning
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-100'
              : 'bg-blue-950/40 border-blue-400/30 text-blue-100'
          }`}
        >
          {isWarning ? (
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-[11px] leading-relaxed">
            {isWarning && (
              <span className="block font-bold text-amber-300 uppercase tracking-wider text-[9.5px] mb-0.5">
                Lưu ý an toàn lao động & vận hành:
              </span>
            )}
            {renderInline(quoteText)}
          </div>
        </div>
      );
      continue;
    }

    // 3. Table: | col1 | col2 | ...
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (
        index < lines.length &&
        lines[index].trim().startsWith('|') &&
        lines[index].trim().endsWith('|')
      ) {
        tableLines.push(lines[index]);
        index++;
      }

      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        // Skip separator row (tableLines[1])
        const rowLines = tableLines.slice(2);

        elements.push(
          <div
            key={`table-${index}`}
            className="my-3 overflow-x-auto rounded-xl border border-blue-500/30 shadow-md bg-[#091530]"
          >
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#0f2452] border-b border-blue-500/30 text-blue-200">
                  {headerCells.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      className="px-3 py-2 font-bold tracking-tight text-white border-r border-blue-500/20 last:border-r-0"
                    >
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowLines.map((r, rIdx) => {
                  const cells = r
                    .split('|')
                    .slice(1, -1)
                    .map((c) => c.trim());
                  return (
                    <tr
                      key={rIdx}
                      className="border-b border-blue-500/15 hover:bg-[#122b61]/40 transition-colors"
                    >
                      {cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-3 py-1.5 text-slate-200 border-r border-blue-500/15 last:border-r-0"
                        >
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 4. Headings: #, ##, ###
    if (line.startsWith('### ')) {
      elements.push(
        <h4
          key={`h3-${index}`}
          className="text-xs font-bold text-cyan-300 mt-3 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide border-b border-blue-500/20 pb-1"
        >
          <Wrench className="w-3.5 h-3.5 text-cyan-400" />
          <span>{line.slice(4)}</span>
        </h4>
      );
      index++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3
          key={`h2-${index}`}
          className="text-[13px] font-extrabold text-white mt-3.5 mb-2 flex items-center gap-1.5 tracking-tight border-b border-blue-500/30 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-300"
        >
          <Sliders className="w-4 h-4 text-blue-400" />
          <span>{line.slice(3)}</span>
        </h3>
      );
      index++;
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h2
          key={`h1-${index}`}
          className="text-sm font-black text-white mt-4 mb-2 flex items-center gap-2 border-b border-blue-500/40 pb-1.5"
        >
          <span className="w-2 h-4 rounded-xs bg-blue-500" />
          <span>{line.slice(2)}</span>
        </h2>
      );
      index++;
      continue;
    }

    // 5. Checklist items: - [ ] or - [x]
    const checklistMatch = line.match(/^[-*]\s+\[([ xX])\]\s+(.*)$/);
    if (checklistMatch) {
      const isChecked = checklistMatch[1].toLowerCase() === 'x';
      const itemText = checklistMatch[2];
      const itemId = `chk-${index}`;
      const activeState = checkedItems[itemId] !== undefined ? checkedItems[itemId] : isChecked;

      elements.push(
        <div
          key={itemId}
          onClick={() => toggleCheckItem(itemId)}
          className={`my-1 p-2 rounded-xl border flex items-start gap-2.5 transition-all cursor-pointer ${
            activeState
              ? 'bg-emerald-950/30 border-emerald-500/40 opacity-80'
              : 'bg-[#0d1d3f] border-blue-400/20 hover:border-blue-400/40'
          }`}
        >
          <div className="mt-0.5 text-blue-400 flex-shrink-0">
            {activeState ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <div className="w-4 h-4 rounded border-2 border-blue-400/60 hover:border-blue-300" />
            )}
          </div>
          <span
            className={`text-[11.5px] leading-snug ${
              activeState ? 'line-through text-slate-400' : 'text-slate-100'
            }`}
          >
            {renderInline(itemText)}
          </span>
        </div>
      );
      index++;
      continue;
    }

    // 6. Numbered steps: 1. Bước 1:... or 1. ... (Structured troubleshooting steps)
    const stepMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (stepMatch) {
      const stepNum = stepMatch[1];
      const stepText = stepMatch[2];
      const stepId = `step-${index}`;
      const isCompleted = checkedItems[stepId] || false;

      elements.push(
        <div
          key={stepId}
          onClick={() => toggleCheckItem(stepId)}
          className={`my-1.5 p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
            isCompleted
              ? 'bg-emerald-950/25 border-emerald-500/35 opacity-75'
              : 'bg-[#0c1c3d] border-blue-400/25 hover:border-blue-400/50 shadow-sm'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 text-white shadow-xs'
            }`}
          >
            {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : stepNum}
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={`text-[11.5px] leading-snug font-medium ${
                isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
              }`}
            >
              {renderInline(stepText)}
            </div>
          </div>
        </div>
      );
      index++;
      continue;
    }

    // 7. Bullet list: - or *
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ')) {
      const bulletText = line.trim().slice(2);
      elements.push(
        <div key={`bullet-${index}`} className="flex items-start gap-2 my-1 pl-1 text-[11.5px] text-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0 shadow-xs shadow-cyan-400/50" />
          <span className="leading-snug">{renderInline(bulletText)}</span>
        </div>
      );
      index++;
      continue;
    }

    // 8. Empty lines
    if (!line.trim()) {
      elements.push(<div key={`empty-${index}`} className="h-1.5" />);
      index++;
      continue;
    }

    // 9. Standard paragraph text
    elements.push(
      <p key={`p-${index}`} className="text-[11.5px] text-slate-100 leading-relaxed my-1">
        {renderInline(line)}
      </p>
    );
    index++;
  }

  return <div className="space-y-0.5">{elements}</div>;
};
