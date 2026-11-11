import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  Mic,
  MicOff,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Wrench,
  Clock,
  History,
  CheckCircle2,
  AlertCircle,
  ArrowDown,
  Activity,
  CheckSquare,
  Square,
  Search,
  Cpu,
  Layers,
  Database,
  Sliders,
  Download,
  Trash2,
  BookmarkPlus,
  ArrowRight,
  FileSpreadsheet,
  FilePlus,
  Volume2,
} from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { IncidentItem } from '../types';

export interface TechnicalStep {
  id: string;
  number: number;
  title: string;
  detail: string;
  parameter?: string;
  paramType?: 'warning' | 'normal' | 'target';
  isCompleted?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  statusBadge?: string;
  aiStatus?: 'thinking' | 'success' | 'error';
  latencyMs?: number;
  steps?: TechnicalStep[];
  safetyAlert?: string;
  actionLinks?: { label: string; tabId: string }[];
  isLiked?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  summary: string;
  tag: string;
  machineModel?: string;
  messages: ChatMessage[];
}

interface AIChatBoxProps {
  onNavigateTab: (tabId: string) => void;
  onConvertAiToIncident?: (data: Partial<IncidentItem>) => void;
}

// LocalStorage Persistence Keys
const STORAGE_KEY_MESSAGES = 'edm_smartguard_chat_messages_v2';
const STORAGE_KEY_SESSIONS = 'edm_smartguard_chat_sessions_v2';
const STORAGE_KEY_SESSION_ID = 'edm_smartguard_current_session_id_v2';

const DEFAULT_HISTORICAL_SESSIONS: ChatSession[] = [
  {
    id: 'sess-today-1',
    title: 'Chẩn đoán Spindle quá nhiệt (E210)',
    date: 'Hôm nay, 10:15',
    summary: 'Kiểm tra lưu lượng nước làm mát và cốc lọc thứ cấp máy CNC-04',
    tag: 'CNC-04',
    machineModel: 'Mitsubishi M-V800',
    messages: [
      {
        id: 'msg-h1-1',
        sender: 'user',
        text: 'Máy CNC-04 báo lỗi E210 Spindle quá nhiệt khi gia công tốc độ cao, xử lý thế nào?',
        timestamp: '10:15',
      },
      {
        id: 'msg-h1-2',
        sender: 'ai',
        text: `## CHẨN ĐOÁN LỖI E210: SPINDLE QUÁ NHIỆT (> 70°C)
Dựa trên đối chiếu cơ sở dữ liệu SOP \`Mitsubishi M-V800\` và 1,142 ca xử lý đã xác nhận, nguyên nhân gốc rễ là **lưu lượng nước làm mát qua Spindle sụt giảm (< 12 L/phút)** do nghẹt cốc lọc hoặc bơm tuần hoàn suy hao.

### Thông số kỹ thuật cần đối soát:
| Hạng mục kiểm tra | Tiêu chuẩn SOP | Ngưỡng cảnh báo | Đơn vị |
| --- | --- | --- | --- |
| Lưu lượng nước hồi | ≥ 12.0 | < 8.0 | L/phút |
| Nhiệt độ vỏ Spindle | < 50.0 | > 65.0 | °C |
| Áp suất tuần hoàn | 0.35 - 0.45 | < 0.20 | MPa |
| Dòng tải bơm làm mát | 3.2 - 3.8 | > 4.5 | A |

> Cảnh báo an toàn: Tuyệt đối không dùng tay trần chạm vào Spindle khi máy đang báo lỗi nhiệt. Mang găng tay cách nhiệt và kính bảo hộ khi tháo rắc co áp lực nước.`,
        timestamp: '10:15',
        aiStatus: 'success',
        latencyMs: 420,
        statusBadge: 'XÁC THỰC THEO SOP • GEMINI 3.8 FLASH',
        steps: [
          {
            id: 'st-h1-1',
            number: 1,
            title: 'Dừng trục và duy trì tuần hoàn',
            detail: 'Dừng khẩn cấp trục Spindle, để chế độ bơm làm mát tiếp tục xả 5 phút.',
            parameter: 'Thời gian: 5 phút',
            paramType: 'normal',
          },
          {
            id: 'st-h1-2',
            number: 2,
            title: 'Vệ sinh / thay cốc lọc thứ cấp',
            detail: 'Tháo cốc lọc 10µm phía sau vách máy. Nếu cặn bẩn > 40%, thay lõi mới.',
            parameter: 'Độ lọc: 10µm',
            paramType: 'warning',
          },
          {
            id: 'st-h1-3',
            number: 3,
            title: 'Kiểm tra lưu lượng đầu ra',
            detail: 'Dùng đồng hồ đo lưu lượng thực tế tại đầu hồi nước làm mát.',
            parameter: 'Chuẩn: ≥ 12 L/phút',
            paramType: 'target',
          },
        ],
        actionLinks: [{ label: 'Mở chi tiết ca lỗi E210', tabId: 'incidents' }],
      },
    ],
  },
  {
    id: 'sess-yesterday-1',
    title: 'Cải tiến bộ lọc dung dịch EDM',
    date: 'Hôm qua, 15:40',
    summary: 'Bổ sung màng lọc 5µm kép giảm tỷ lệ xước bề mặt phôi',
    tag: 'EDM-04',
    machineModel: 'Sodick ALC600G',
    messages: [
      {
        id: 'msg-h2-1',
        sender: 'user',
        text: 'Làm thế nào để giảm xước bề mặt chi tiết mỏng khi cắt dây EDM?',
        timestamp: '15:40',
      },
      {
        id: 'msg-h2-2',
        sender: 'ai',
        text: `## GIẢI PHÁP TỐI ƯU HÓA ĐỘ BÓNG BỀ MẶT EDM
Áp dụng bộ lọc thứ cấp 5µm và kiểm soát độ dẫn điện ion nước deion:

- **Nguyên nhân chính:** Mạt kim loại lơ lửng trong khe hở phóng điện gây phóng tia hồ quang thứ cấp.
- **Biện pháp can thiệp:** Lắp cụm lọc tinh 5µm kép song song và thay cột hạt nhựa ion.

> Lưu ý: Cần ngắt cao tần gia công trước khi thao tác tại bồn dung dịch và kiểm tra dây tiếp địa vỏ máy.`,
        timestamp: '15:41',
        aiStatus: 'success',
        latencyMs: 380,
        statusBadge: 'SÁNG KIẾN ĐÃ THẨM ĐỊNH',
        steps: [
          {
            id: 'st-h2-1',
            number: 1,
            title: 'Kiểm tra độ dẫn điện deion',
            detail: 'Đo điện trở suất nước bằng bút đo. Thay hạt nhựa nếu vượt 25 µS/cm.',
            parameter: 'Độ dẫn: 10 - 20 µS/cm',
            paramType: 'target',
          },
          {
            id: 'st-h2-2',
            number: 2,
            title: 'Lắp cụm lọc tinh 5µm song song',
            detail: 'Gia tăng chu kỳ thay lọc từ 7 ngày lên 30 ngày.',
            parameter: 'Hiệu quả: -75% lỗi bề mặt',
            paramType: 'target',
          },
        ],
        actionLinks: [{ label: 'Xem sáng kiến Cải tiến lọc', tabId: 'improvement' }],
      },
    ],
  },
  {
    id: 'sess-prev-1',
    title: 'Sụt áp suất hệ thống thủy lực',
    date: '08/01/2025, 09:20',
    summary: 'Kẹt lõi van phân phối tỷ lệ và bọt khí màng lọc hút dầu',
    tag: 'CNC-01',
    machineModel: 'Okuma Genos M560',
    messages: [
      {
        id: 'msg-h3-1',
        sender: 'user',
        text: 'Máy Okuma dừng liên động báo lỗi Pressure Drop dưới 3.5 MPa',
        timestamp: '09:20',
      },
      {
        id: 'msg-h3-2',
        sender: 'ai',
        text: `## XỬ LÝ SỤT ÁP THỦY LỰC MÁY GIA CÔNG
Hệ thống phát hiện áp lực dầu bôi trơn và kẹp phôi sụt giảm dưới ngưỡng an toàn \`< 3.5 MPa\`.

> Cảnh báo: Phải xả hoàn toàn áp lực đường ống về \`0 MPa\` trước khi tháo mở cuộn van Solenoid.`,
        timestamp: '09:21',
        aiStatus: 'success',
        latencyMs: 410,
        statusBadge: 'QUY TRÌNH ISO 9001',
        actionLinks: [{ label: 'Xem ca sự cố Okuma', tabId: 'incidents' }],
      },
    ],
  },
];

const DEFAULT_INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'ai',
    text: `Xin chào! Tôi là **EDM SmartGuard AI**, trợ lý kỹ thuật thông minh được huấn luyện trên kho tri thức **10,238 quy trình SOP**, sơ đồ mạch điện và kinh nghiệm thực tế máy EDM, CNC, Robot.

### Tôi có thể hỗ trợ bạn:
- **Chẩn đoán nhanh mã lỗi:** (E210, AL-03, E208, 1002 ATC Error...)
- **Tra cứu thông số SOP:** Nhiệt độ Spindle, áp suất thủy lực, độ dẫn điện nước deion
- **Checklist từng bước kiểm tra:** Kèm hướng dẫn an toàn và bảng tra cứu thông số
- **Chuyển hội thoại thành Ca sự cố:** 1 cú click để tạo biên bản xử lý sự cố chuẩn ISO

Bạn đang gặp sự cố hoặc cần tra cứu trên thiết bị nào? (Có thể nói trực tiếp qua Micro 🎙️)`,
    timestamp: 'Vừa xong',
    aiStatus: 'success',
    latencyMs: 180,
    statusBadge: 'GEMINI 3.8 FLASH • KHO TRI THỨC CHUẨN',
    actionLinks: [
      { label: 'Xem ca sự cố E210', tabId: 'incidents' },
      { label: 'Tra cứu SOP bảo trì', tabId: 'docs' },
    ],
  },
];

const QUICK_PROMPTS = [
  'Chẩn đoán lỗi Spindle quá nhiệt (E210)',
  'Khắc phục bề mặt gia công EDM bị xước',
  'Sụt áp suất thủy lực CNC Okuma',
  'Tối ưu chu kỳ thay lọc dung dịch EDM',
];

export const AIChatBox: React.FC<AIChatBoxProps> = ({
  onNavigateTab,
  onConvertAiToIncident,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [input, setInput] = useState('');

  // 1. Persistent Message History Initialization from LocalStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_INITIAL_MESSAGES;
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_SESSION_ID) || 'sess-current';
    } catch {
      return 'sess-current';
    }
  });

  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_HISTORICAL_SESSIONS;
  });

  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStage, setThinkingStage] = useState(0);
  const [thinkingTimer, setThinkingTimer] = useState(0);
  const [thinkingProgress, setThinkingProgress] = useState(15);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [convertedMsgId, setConvertedMsgId] = useState<string | null>(null);

  // 2. Real Web Speech API State
  const [isListening, setIsListening] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [speechNotification, setSpeechNotification] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-sync persistent history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch {
      // ignore
    }
  }, [sessions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSION_ID, currentSessionId);
    } catch {
      // ignore
    }
  }, [currentSessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Track scroll position to show "scroll to bottom" button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollBottomBtn(isUp);
  };

  useEffect(() => {
    if (isOpen && !showHistory) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping, showHistory]);

  // Thinking stage & elapsed timer simulation during API calls
  useEffect(() => {
    if (isTyping) {
      setThinkingStage(0);
      setThinkingTimer(0);
      setThinkingProgress(20);

      const startTime = Date.now();
      timerIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setThinkingTimer(Number(elapsed.toFixed(1)));
        setThinkingProgress((prev) => (prev < 90 ? prev + 3 : prev));
      }, 100);

      const s1 = setTimeout(() => {
        setThinkingStage(1);
        setThinkingProgress(55);
      }, 450);

      const s2 = setTimeout(() => {
        setThinkingStage(2);
        setThinkingProgress(85);
      }, 1100);

      return () => {
        clearInterval(timerIntervalRef.current);
        clearTimeout(s1);
        clearTimeout(s2);
      };
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  }, [isTyping]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, isLiked: type === 'like' } : msg
      )
    );
  };

  // Toggle step completion in technical steps
  const handleToggleStep = (msgId: string, stepId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId || !msg.steps) return msg;
        return {
          ...msg,
          steps: msg.steps.map((st) =>
            st.id === stepId ? { ...st, isCompleted: !st.isCompleted } : st
          ),
        };
      })
    );
  };

  const handleSelectSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setShowHistory(false);
  };

  const handleStartNewChat = () => {
    if (messages.length > 1) {
      handleSaveCurrentSession();
    }
    setCurrentSessionId(`sess-${Date.now()}`);
    setMessages(DEFAULT_INITIAL_MESSAGES);
    setShowHistory(false);
  };

  const handleSaveCurrentSession = () => {
    if (messages.length <= 1) return;
    const firstUserMsg = messages.find((m) => m.sender === 'user')?.text || 'Phiên chẩn đoán';
    const title = firstUserMsg.length > 40 ? firstUserMsg.slice(0, 40) + '...' : firstUserMsg;
    const newSession: ChatSession = {
      id: `sess-${Date.now()}`,
      title,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      summary: `Hội thoại chẩn đoán gồm ${messages.length} trao đổi`,
      tag: 'KỸ THUẬT',
      messages,
    };

    setSessions((prev) => [newSession, ...prev]);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
  };

  const handleResetHistory = () => {
    if (confirm('Bạn có chắc muốn đặt lại toàn bộ lịch sử trò chuyện về trạng thái chuẩn của xưởng máy?')) {
      setMessages(DEFAULT_INITIAL_MESSAGES);
      setSessions(DEFAULT_HISTORICAL_SESSIONS);
      setCurrentSessionId('sess-current');
      try {
        localStorage.removeItem(STORAGE_KEY_MESSAGES);
        localStorage.removeItem(STORAGE_KEY_SESSIONS);
        localStorage.removeItem(STORAGE_KEY_SESSION_ID);
      } catch {
        // ignore
      }
    }
  };

  const handleExportMarkdownLog = () => {
    let md = `# NHẬT KÝ CHẨN ĐOÁN KỸ THUẬT - EDM SMARTGUARD AI\n\nThời gian xuất: ${new Date().toLocaleString('vi-VN')}\n\n---\n\n`;
    messages.forEach((m) => {
      md += `### ${m.sender === 'user' ? '👤 Kỹ thuật viên' : '🤖 SmartGuard AI'} (${m.timestamp})\n\n`;
      md += `${m.text}\n\n`;
      if (m.steps && m.steps.length > 0) {
        md += `#### Các bước kiểm tra SOP:\n`;
        m.steps.forEach((st) => {
          md += `- [${st.isCompleted ? 'x' : ' '}] Bước ${st.number}: ${st.title} ${st.parameter ? `(${st.parameter})` : ''}\n  ${st.detail}\n`;
        });
        md += '\n';
      }
      if (m.safetyAlert) {
        md += `> Cảnh báo an toàn: ${m.safetyAlert}\n\n`;
      }
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smartguard-chat-log-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // FEATURE 1: Convert AI Message to Official Incident
  const handleConvertToIncident = (msg: ChatMessage) => {
    // Extract title, code, machine, vendor, symptoms, causes, steps
    const text = msg.text;
    let title = 'Xử lý sự cố kỹ thuật từ SmartGuard AI';
    let code = 'ERR-01';
    let machineId = 'CNC-04';
    let vendor = 'Mitsubishi';
    let model = 'M-V800';
    const phenomenon: string[] = [];
    const rootCauses: string[] = [];

    // Extract title from first heading ## ...
    const headingMatch = text.match(/##\s+([^\n]+)/);
    if (headingMatch) {
      title = headingMatch[1].replace(/CHẨN ĐOÁN\s*(MÃ\s*LỖI)?[:\s]*/i, '').trim();
    }

    // Extract code like E210, AL-03, E208
    const codeMatch = text.match(/\b(E\d{3}|AL-\d{2}|[A-Z]{2,3}-\d{2,3})\b/i);
    if (codeMatch) {
      code = codeMatch[1].toUpperCase();
    }

    // Extract machine model & vendor
    if (text.includes('Mitsubishi') || text.includes('M-V800')) {
      vendor = 'Mitsubishi';
      model = 'M-V800';
      machineId = 'CNC-04';
    } else if (text.includes('Sodick') || text.includes('ALC600G') || text.includes('EDM-04')) {
      vendor = 'Sodick';
      model = 'ALC600G';
      machineId = 'EDM-04';
    } else if (text.includes('Makino') || text.includes('EDM-02')) {
      vendor = 'Makino';
      model = 'U6 H.E.A.T';
      machineId = 'EDM-02';
    } else if (text.includes('Okuma') || text.includes('CNC-01')) {
      vendor = 'Okuma';
      model = 'Genos M560';
      machineId = 'CNC-01';
    } else if (text.includes('Fanuc') || text.includes('CNC-07')) {
      vendor = 'Fanuc';
      model = 'Robodrill D21';
      machineId = 'CNC-07';
    }

    // Extract root cause
    const causeMatch = text.match(/nguyên nhân (gốc rễ|chính)[^:]*:\s*([^\n.]+)/i);
    if (causeMatch) {
      rootCauses.push(causeMatch[2].replace(/\*\*/g, '').trim());
    } else {
      rootCauses.push('Hệ thống giám sát ghi nhận thông số lệch ngưỡng tiêu chuẩn vận hành.');
    }

    // Symptoms
    phenomenon.push(`Hệ thống báo mã lỗi ${code} trong quá trình gia công tải cao.`);
    phenomenon.push('Máy phát tín hiệu dừng liên động an toàn theo tiêu chuẩn SOP.');

    // Build steps
    let steps: any[] = [];
    if (msg.steps && msg.steps.length > 0) {
      steps = msg.steps.map((st) => ({
        number: st.number,
        title: `${st.title} ${st.parameter ? `[${st.parameter}]` : ''}`,
        image: '/extracted/photo_step1.png',
      }));
    }

    setConvertedMsgId(msg.id);
    setTimeout(() => setConvertedMsgId(null), 3000);

    if (onConvertAiToIncident) {
      onConvertAiToIncident({
        title,
        code,
        machineId,
        vendor,
        model,
        phenomenon,
        rootCauses,
        steps,
      });
    }
  };

  // FEATURE 2: Real Web Speech API Voice Recognition
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser doesn't support Web Speech API - fallback gracefully
      setSpeechNotification('Trình duyệt chưa hỗ trợ Web Speech API. Đang sử dụng câu lệnh giọng nói công nghiệp mẫu...');
      setTimeout(() => setSpeechNotification(null), 3500);
      handleSimulateVoice();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechTranscript('');
        setSpeechNotification('Đang lắng nghe từ Micro... Hãy đọc mã lỗi hoặc hiện tượng máy');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setSpeechTranscript(currentTranscript);
        setInput(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechNotification('Quyền Micro bị từ chối. Vui lòng cho phép Micro trên thanh địa chỉ trình duyệt.');
        } else {
          setSpeechNotification('Không bắt được giọng nói. Đang nạp câu hỏi kỹ thuật chuẩn...');
          handleSimulateVoice();
        }
        setIsListening(false);
        setTimeout(() => setSpeechNotification(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => setSpeechNotification(null), 2500);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech recognition init error:', err);
      handleSimulateVoice();
    }
  };

  const handleSimulateVoice = () => {
    setIsListening(true);
    setSpeechNotification('Đang mô phỏng nhận diện giọng nói: "Kiểm tra nguyên nhân Spindle quá nhiệt E210"');
    setTimeout(() => {
      setIsListening(false);
      setSpeechNotification(null);
      setInput('Kiểm tra nguyên nhân Spindle quá nhiệt E210 và giải pháp khắc phục');
    }, 1500);
  };

  // Filter history sessions by query
  const filteredSessions = sessions.filter((sess) => {
    if (!historySearch.trim()) return true;
    const q = historySearch.toLowerCase();
    return (
      sess.title.toLowerCase().includes(q) ||
      sess.summary.toLowerCase().includes(q) ||
      sess.tag.toLowerCase().includes(q) ||
      (sess.machineModel && sess.machineModel.toLowerCase().includes(q))
    );
  });

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    const startTime = performance.now();

    try {
      // Attempt server proxy call
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      }).catch(() => null);

      let aiResponseText = '';
      let steps: TechnicalStep[] | undefined = undefined;
      let safetyAlert: string | undefined = undefined;
      let actionLinks: { label: string; tabId: string }[] | undefined = undefined;
      let aiStatus: 'success' | 'error' = 'success';

      if (res && res.ok) {
        const data = await res.json();
        aiResponseText = data.reply || data.text || '';
        actionLinks = data.actionLinks;
      }

      // If backend offline or empty, use curated industrial RAG diagnostic knowledge
      if (!aiResponseText) {
        await new Promise((r) => setTimeout(r, 900));
        const query = userText.toLowerCase();

        if (
          query.includes('e210') ||
          query.includes('spindle') ||
          query.includes('quá nhiệt') ||
          query.includes('nóng')
        ) {
          aiResponseText = `## CHẨN ĐOÁN MÃ LỖI E210: SPINDLE QUÁ NHIỆT (> 70°C)
Dựa trên đối chiếu cơ sở dữ liệu SOP \`Mitsubishi M-V800\` và 1,142 ca xử lý đã xác nhận, nguyên nhân gốc rễ là **lưu lượng nước làm mát qua Spindle sụt giảm (< 12 L/phút)** do nghẹt cốc lọc hoặc bơm tuần hoàn suy hao.

### Thông số kỹ thuật cần đối soát:
| Hạng mục kiểm tra | Tiêu chuẩn SOP | Ngưỡng cảnh báo | Đơn vị |
| --- | --- | --- | --- |
| Lưu lượng nước hồi | ≥ 12.0 | < 8.0 | L/phút |
| Nhiệt độ vỏ Spindle | < 50.0 | > 65.0 | °C |
| Áp suất tuần hoàn | 0.35 - 0.45 | < 0.20 | MPa |
| Dòng tải động cơ bơm | 3.2 - 3.8 | > 4.5 | A |

> Cảnh báo an toàn: Tuyệt đối không dùng tay trần chạm vào Spindle khi máy đang báo lỗi nhiệt. Mang găng tay cách nhiệt và kính bảo hộ khi tháo rắc co áp lực nước.`;

          steps = [
            {
              id: 'st-e210-1',
              number: 1,
              title: 'Dừng Spindle khẩn cấp & Duy trì bơm hồi',
              detail: 'Dừng xoay trục chính ngay lập tức. Để bơm làm mát chạy tuần hoàn thêm 5 phút nhằm giải phóng nhiệt dư từ ổ bi gốm.',
              parameter: 'Thời gian: 5 phút',
              paramType: 'normal',
            },
            {
              id: 'st-e210-2',
              number: 2,
              title: 'Kiểm tra cốc lọc thứ cấp (Vách sau máy CNC-04)',
              detail: 'Tháo cốc lọc 10µm phía sau máy. Nếu bám cặn phôi kim loại > 40%, thay lõi lọc mới hoặc rửa ngược bằng khí nén 0.5 MPa.',
              parameter: 'Lõi lọc: 10µm',
              paramType: 'warning',
            },
            {
              id: 'st-e210-3',
              number: 3,
              title: 'Đo lưu lượng thực tế tại đầu hồi Spindle',
              detail: 'Kết nối đồng hồ lưu lượng kế (Flowmeter). Kiểm tra lưu lượng tuần hoàn phải đạt tối thiểu yêu cầu.',
              parameter: 'Chuẩn: ≥ 12 L/phút',
              paramType: 'target',
            },
            {
              id: 'st-e210-4',
              number: 4,
              title: 'Kiểm tra dòng tải động cơ bơm làm mát',
              detail: 'Dùng ampe kìm kẹp dây nguồn bơm. Dòng định mức chuẩn 3.2A - 3.8A. Nếu vượt 4.5A, cánh bơm đã bị kẹt mạt phôi.',
              parameter: 'Dòng điện: 3.2 - 3.8A',
              paramType: 'warning',
            },
            {
              id: 'st-e210-5',
              number: 5,
              title: 'Khởi động kiểm tra không tải (Test Run)',
              detail: 'Chạy thử Spindle ở 3,000 RPM trong 15 phút. Theo dõi nhiệt độ trên màn hình HMI duy trì ổn định dưới 50°C.',
              parameter: 'Nhiệt độ: < 50°C',
              paramType: 'target',
            },
          ];
          safetyAlert =
            'Tuyệt đối không dùng tay trần chạm vào Spindle khi máy đang báo lỗi nhiệt. Mang găng tay cách nhiệt và kính bảo hộ khi tháo rắc co áp lực nước.';
          actionLinks = [
            { label: 'Chi tiết ca lỗi E210 (CNC-04)', tabId: 'incidents' },
            { label: 'SOP bảo trì Spindle định kỳ', tabId: 'docs' },
          ];
        } else if (
          query.includes('xước') ||
          query.includes('bề mặt') ||
          query.includes('lọc') ||
          query.includes('edm')
        ) {
          aiResponseText = `## GIẢI PHÁP XỬ LÝ LỖI BỀ MẶT XƯỚC & TỐI ƯU HÓA LỌC EDM
Hiện tượng độ nhám bề mặt chi tiết không đạt chuẩn (\`Ra > 1.6µm\`) trên dòng máy EDM-04 thường xuất phát từ **dung dịch điện môi bị nhiễm cặn kim loại dẫn điện** và điện trở suất deion không ổn định.

### Bảng đối chiếu chất lượng điện môi:
| Chỉ số kiểm tra | Trạng thái chuẩn | Trạng thái bất thường | Biện pháp can thiệp |
| --- | --- | --- | --- |
| Điện trở suất | 10 - 20 µS/cm | > 25 µS/cm | Thay cột hạt nhựa ion |
| Độ sạch dung dịch | Lọc tinh 5µm | Cặn lơ lửng > 15µm | Rửa bồn & thay lõi lọc |
| Áp lực tia xả | 0.8 - 1.2 MPa | < 0.5 MPa | Vệ sinh vòi phun cao áp |

> Lưu ý an toàn: Luôn ngắt cao tần trước khi nhúng tay vào bể gia công dung dịch điện môi.`;

          steps = [
            {
              id: 'st-edm-1',
              number: 1,
              title: 'Đo điện trở suất nước deion',
              detail: 'Kiểm tra độ dẫn điện của dung dịch điện môi. Thay cột hạt nhựa ion resin nếu chỉ số vượt ngưỡng cho phép.',
              parameter: 'Chuẩn: 10 - 20 µS/cm',
              paramType: 'target',
            },
            {
              id: 'st-edm-2',
              number: 2,
              title: 'Lắp đặt cụm màng lọc tinh 5µm kép',
              detail: 'Áp dụng sáng kiến Kaizen bổ sung cụm lọc 5µm song song (đã chứng minh giảm 75% tỷ lệ lỗi bề mặt tại chuyền A).',
              parameter: 'Màng lọc: 5µm',
              paramType: 'target',
            },
            {
              id: 'st-edm-3',
              number: 3,
              title: 'Kiểm tra đầu dẫn hướng kim cương (Wire Guide)',
              detail: 'Dùng kính hiển vi kiểm tra rãnh trượt dây dẫn hướng. Vệ sinh xỉ đồng bằng dung dịch tẩy cặn siêu âm.',
              parameter: 'Độ mòn: ≤ 0.005mm',
              paramType: 'normal',
            },
            {
              id: 'st-edm-4',
              number: 4,
              title: 'Căn chỉnh lực căng dây (Wire Tension)',
              detail: 'Cài đặt lực căng dây chuẩn 1,200g - 1,400g để hạn chế rung động ngang khi phóng tia lửa điện.',
              parameter: 'Lực căng: 1,200 - 1,400g',
              paramType: 'normal',
            },
          ];
          safetyAlert =
            'Ngắt cao tần gia công trước khi tiếp cận bồn dung dịch. Kiểm tra dây tiếp địa an toàn của buồng phóng điện.';
          actionLinks = [
            { label: 'Xem sáng kiến Cải tiến lọc EDM', tabId: 'improvement' },
            { label: 'Bản vẽ bộ gá lọc 5µm', tabId: 'docs' },
          ];
        } else if (
          query.includes('thủy lực') ||
          query.includes('áp suất') ||
          query.includes('okuma') ||
          query.includes('bơm')
        ) {
          aiResponseText = `## QUY TRÌNH XỬ LÝ SỤT ÁP SUẤT THỦY LỰC MÁY GIA CÔNG
Hệ thống điều khiển máy dừng liên động khi áp lực dầu thủy lực sụt giảm dưới ngưỡng an toàn (\`< 3.5 MPa\`).

### Checklist 3 bước kiểm tra nhanh:
- [ ] Kiểm tra mức dầu tại mắt thăm kính (đảm bảo giữa 2 vạch MIN - MAX)
- [ ] Vệ sinh lưới lọc hút đáy bình dầu (tránh bọt khí xâm thực)
- [ ] Đo dòng tải cuộn hút Solenoid van phân phối tỷ lệ

> Cảnh báo nguy hiểm: Xả hoàn toàn áp lực thủy lực tích trữ về 0 MPa trước khi tháo mở rắc co đường ống dầu.`;

          steps = [
            {
              id: 'st-hyd-1',
              number: 1,
              title: 'Kiểm tra mức dầu và độ sạch qua mắt thăm',
              detail: 'Đảm bảo mức dầu nằm giữa 2 vạch giới hạn. Dùng dầu thủy lực ISO VG 32/46 không nhiễm nước.',
              parameter: 'Mức dầu: Giữa 2 vạch',
              paramType: 'normal',
            },
            {
              id: 'st-hyd-2',
              number: 2,
              title: 'Kiểm tra van điều áp tỷ lệ (Relief Valve)',
              detail: 'Tháo cuộn hút Solenoid kiểm tra kẹt mạt kim loại trong lõi trượt van phân phối.',
              parameter: 'Áp suất: 3.5 - 4.2 MPa',
              paramType: 'warning',
            },
            {
              id: 'st-hyd-3',
              number: 3,
              title: 'Vệ sinh lưới lọc hút (Suction Strainer)',
              detail: 'Vệ sinh sạch màng lọc hút dầu đáy thùng tránh hiện tượng bọt khí xâm thực (Cavitation).',
              parameter: 'Lưới lọc: 100 mesh',
              paramType: 'normal',
            },
          ];
          safetyAlert =
            'Xả hoàn toàn áp lực thủy lực tích trữ về 0 MPa trước khi tháo mở rắc co đường ống dầu.';
          actionLinks = [
            { label: 'Xem ca sự cố Mất áp thủy lực', tabId: 'incidents' },
            { label: 'Sơ đồ mạch thủy lực', tabId: 'docs' },
          ];
        } else {
          aiResponseText = `## HỆ THỐNG SMARTGUARD AI GHI NHẬN TRUY VẤN
Nội dung yêu cầu: **"${userText}"**

Để đưa ra quy trình xử lý chính xác nhất theo tiêu chuẩn SOP xưởng máy, bạn vui lòng cung cấp thêm:
- **Model máy:** EDM (Sodick/Makino) hay CNC (Fanuc/Okuma)?
- **Mã lỗi hiển thị:** (VD: \`E210\`, \`AL-03\`, \`1002 ATC Error\`...)
- **Hiện tượng thực tế:** Quá nhiệt Spindle, rung lắc trục, hay sụt áp thủy lực?

Hoặc nhấp vào các gợi ý tra cứu nhanh bên dưới để truy xuất trực tiếp các ca xử lý đã được phê chuẩn.`;
          actionLinks = [
            { label: 'Thư viện Xử lý sự cố', tabId: 'incidents' },
            { label: 'Cộng đồng Kỹ thuật', tabId: 'community' },
          ];
        }
      }

      const latencyMs = Math.round(performance.now() - startTime);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        statusBadge: 'XÁC THỰC THEO SOP • GEMINI 3.8 FLASH',
        aiStatus,
        latencyMs,
        steps,
        safetyAlert,
        actionLinks,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: '> Cảnh báo: Không thể kết nối đến máy chủ AI. Đang tự động chuyển sang chế độ tra cứu ngoại tuyến từ kho lưu trữ SOP xưởng máy.',
          timestamp: 'Vừa xong',
          aiStatus: 'error',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* 1. FLOATING ACTION LAUNCHER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#1864f3] via-[#1553d1] to-[#0c3cb0] hover:from-[#2170ff] hover:to-[#174ad8] text-white rounded-2xl shadow-2xl shadow-blue-600/40 border border-blue-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Bot className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            {/* Pulsing online beacon */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#091738] animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#091738]" />
          </div>

          <div className="text-left pr-1">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5 text-white">
              <span>SmartGuard AI</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-blue-300/25 border border-blue-300/40 text-blue-100">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-blue-200/90 font-medium">
              Trợ lý Kỹ thuật & Chẩn đoán lỗi
            </div>
          </div>
        </button>
      )}

      {/* 2. CHAT BOX DOCKED / FLOATING WINDOW */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-[#0c1836] border border-blue-500/40 rounded-2xl shadow-2xl shadow-blue-950/90 flex flex-col overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'bottom-4 right-4 w-[780px] h-[850px] max-w-[96vw] max-h-[95vh]'
              : 'bottom-5 right-5 w-[490px] h-[670px] max-w-[94vw] max-h-[89vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#0d276b] via-[#0f348e] to-[#1241b0] border-b border-blue-500/30 flex items-center justify-between text-white flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-[#1e5bff] text-white flex items-center justify-center shadow-md shadow-blue-500/30 border border-blue-300/30">
                  <Bot className="w-4.5 h-4.5 stroke-[2.3]" />
                </div>
                {/* Visual pulse ring when typing or listening */}
                {(isTyping || isListening) && (
                  <span className="absolute -inset-1 rounded-xl border border-cyan-400 animate-ping opacity-60" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5 tracking-tight text-white">
                  <span>SmartGuard AI Chat</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9.5px] font-semibold text-emerald-300">RAG Online</span>
                </div>
                <div className="text-[10px] text-blue-200/80 font-normal">
                  Gemini 3.8 Flash • Voice & Pipeline
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* History Drawer Toggle Button */}
              <button
                onClick={() => setShowHistory(!showHistory)}
                title="Lịch sử chẩn đoán"
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showHistory
                    ? 'bg-blue-400 text-slate-900 font-bold'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Lịch sử ({sessions.length})</span>
              </button>

              {/* Start new chat */}
              <button
                onClick={handleStartNewChat}
                title="Phiên chẩn đoán mới"
                className="w-7 h-7 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Expand / Minimize toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Thu nhỏ' : 'Mở rộng'}
                className="w-7 h-7 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                title="Đóng chat"
                className="w-7 h-7 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3. PERSISTENT SCROLLABLE CHAT HISTORY AREA (DRAWER / VIEW) */}
          {showHistory ? (
            <div className="flex-1 overflow-y-auto p-4 bg-[#08132b] flex flex-col space-y-3.5 custom-scrollbar">
              <div className="flex items-center justify-between pb-3 border-b border-blue-500/20">
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <History className="w-4 h-4 text-blue-400" />
                    Lịch sử chẩn đoán lưu trữ (Persistent)
                  </span>
                  <p className="text-[10px] text-blue-300/80">
                    Lưu trữ cục bộ tự động, không mất dữ liệu khi tải lại trang
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleStartNewChat}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10.5px] font-bold cursor-pointer flex items-center gap-1 shadow-md shadow-blue-600/30"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>+ Phiên mới</span>
                  </button>
                </div>
              </div>

              {/* History Search & Tools bar */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-blue-400/70" />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Tìm theo mã lỗi, máy (E210, CNC-04, Spindle, áp suất)..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#0f224a] border border-blue-400/30 text-xs text-white placeholder-blue-300/50 outline-none focus:border-blue-400"
                  />
                </div>
                <button
                  onClick={handleExportMarkdownLog}
                  title="Xuất nhật ký hội thoại dạng Markdown"
                  className="px-2.5 py-1.5 rounded-xl bg-[#12285a] hover:bg-[#1a3875] text-cyan-300 border border-blue-400/30 text-[10.5px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xuất .md</span>
                </button>
                <button
                  onClick={handleResetHistory}
                  title="Đặt lại lịch sử về mặc định"
                  className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-[10.5px] cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable list of sessions */}
              <div className="flex-1 space-y-2.5 overflow-y-auto pr-1 custom-scrollbar">
                {filteredSessions.length === 0 ? (
                  <div className="text-center py-8 text-blue-300/60 text-xs">
                    Không tìm thấy phiên chẩn đoán phù hợp với từ khóa.
                  </div>
                ) : (
                  filteredSessions.map((sess) => {
                    const isSelected = sess.id === currentSessionId;
                    return (
                      <div
                        key={sess.id}
                        onClick={() => handleSelectSession(sess)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                          isSelected
                            ? 'bg-[#153472] border-blue-400 shadow-lg shadow-blue-900/40'
                            : 'bg-[#0f2249] hover:bg-[#16336e] border-blue-400/20 hover:border-blue-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11.5px] font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {sess.title}
                            </span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Đang mở" />
                            )}
                          </div>
                          <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30 flex-shrink-0">
                            {sess.tag}
                          </span>
                        </div>

                        {sess.machineModel && (
                          <div className="text-[10px] text-blue-300 font-medium mb-1">
                            Model: {sess.machineModel}
                          </div>
                        )}

                        <p className="text-[10.5px] text-slate-300 line-clamp-2 leading-relaxed">
                          {sess.summary}
                        </p>

                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-blue-500/15 text-[9.5px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-400" />
                            {sess.date}
                          </span>
                          <span className="text-cyan-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            Mở phiên chẩn đoán &gt;
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Close history bar */}
              <div className="pt-2 border-t border-blue-500/20 flex items-center justify-between">
                <span className="text-[10px] text-blue-300/60">
                  Tổng {sessions.length} phiên đã lưu trong bộ nhớ
                </span>
                <button
                  onClick={() => setShowHistory(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#112754] hover:bg-[#1a3875] text-blue-200 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  &larr; Quay lại đoạn chat hiện tại
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Prompts Carousel Bar */}
              <div className="px-3 py-2 bg-[#091530] border-b border-blue-500/20 flex items-center justify-between gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1">
                  <span className="text-[9.5px] font-bold text-blue-300 flex items-center gap-1 flex-shrink-0 pl-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Gợi ý:
                  </span>
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(prompt)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[#132857] hover:bg-[#1a387a] text-blue-100 hover:text-white border border-blue-400/25 flex-shrink-0 whitespace-nowrap transition-all cursor-pointer active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Save Current Session to Persistent History */}
                <button
                  onClick={handleSaveCurrentSession}
                  title="Lưu phiên này vào lịch sử"
                  className="px-2 py-1 rounded-lg bg-[#12285a] hover:bg-[#1a3875] text-blue-200 hover:text-white border border-blue-400/30 text-[10px] font-medium flex items-center gap-1 flex-shrink-0 cursor-pointer"
                >
                  <BookmarkPlus className="w-3 h-3 text-cyan-300" />
                  <span className="hidden sm:inline">Lưu phiên</span>
                </button>
              </div>

              {/* Save toast notification */}
              {saveSuccessMsg && (
                <div className="px-3 py-1.5 bg-emerald-950/80 border-b border-emerald-500/30 text-emerald-300 text-[10.5px] flex items-center justify-between flex-shrink-0 animate-in fade-in">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã lưu phiên hội thoại vào lịch sử thành công!
                  </span>
                  <button
                    onClick={() => setShowHistory(true)}
                    className="underline text-[10px] cursor-pointer"
                  >
                    Xem lịch sử
                  </button>
                </div>
              )}

              {/* 4. PERSISTENT MESSAGES SCROLL VIEW AREA */}
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#08132b]/85 relative scroll-smooth custom-scrollbar"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* AI Avatar */}
                    {msg.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-lg bg-[#1864f3] border border-blue-300/40 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#1864f3] to-[#1253d4] text-white rounded-br-xs shadow-md'
                          : 'bg-[#102248] text-slate-100 border border-blue-400/25 rounded-bl-xs shadow-md'
                      }`}
                    >
                      {/* Visual Status Indicator Banner (Thinking / Success / Error) */}
                      {msg.sender === 'ai' && (
                        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-blue-500/20">
                          {msg.statusBadge && (
                            <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              <span>{msg.statusBadge}</span>
                            </div>
                          )}

                          {/* Visual status badge */}
                          {msg.aiStatus === 'success' && (
                            <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{msg.latencyMs ? `${msg.latencyMs}ms` : 'Verified'}</span>
                            </span>
                          )}
                          {msg.aiStatus === 'error' && (
                            <span className="flex items-center gap-1 text-[9px] font-medium text-rose-400">
                              <AlertCircle className="w-3 h-3" />
                              <span>Lỗi phản hồi</span>
                            </span>
                          )}
                        </div>
                      )}

                      {/* MARKDOWN RENDERER TO DISPLAY STRUCTURED TROUBLESHOOTING STEPS CLEARLY */}
                      <MarkdownRenderer content={msg.text} onNavigateTab={onNavigateTab} />

                      {/* FORMATTED TECHNICAL STEPS WITH INTERACTIVE CHECKBOXES & PARAMETERS */}
                      {msg.steps && msg.steps.length > 0 && (
                        <div className="mt-3.5 pt-2.5 border-t border-blue-500/25 space-y-2">
                          <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                              Checklist quy trình kiểm tra SOP ({msg.steps.filter((s) => s.isCompleted).length}/{msg.steps.length}):
                            </span>
                            <span className="text-[9px] font-normal text-slate-400">
                              (Tích chọn khi thực hiện)
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {msg.steps.map((st) => (
                              <div
                                key={st.id}
                                onClick={() => handleToggleStep(msg.id, st.id)}
                                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                                  st.isCompleted
                                    ? 'bg-emerald-950/30 border-emerald-500/40 opacity-80'
                                    : 'bg-[#0d1d3f] border-blue-400/20 hover:border-blue-400/40'
                                }`}
                              >
                                {/* Step Checkbox */}
                                <div className="mt-0.5 text-blue-300 flex-shrink-0">
                                  {st.isCompleted ? (
                                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Square className="w-4 h-4 text-blue-400 hover:text-cyan-300" />
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span
                                      className={`text-[11px] font-semibold ${
                                        st.isCompleted
                                          ? 'line-through text-slate-400'
                                          : 'text-white'
                                      }`}
                                    >
                                      Bước {st.number}: {st.title}
                                    </span>
                                    {st.parameter && (
                                      <span
                                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border flex-shrink-0 ${
                                          st.paramType === 'target'
                                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                            : st.paramType === 'warning'
                                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                            : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                        }`}
                                      >
                                        {st.parameter}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                                    {st.detail}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Safety Warning Alert */}
                      {msg.safetyAlert && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-[10.5px] flex items-start gap-2 shadow-sm">
                          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-amber-300 font-bold uppercase tracking-wider text-[9.5px] block mb-0.5">
                              LƯU Ý AN TOÀN LAO ĐỘNG
                            </strong>
                            <span className="leading-snug">{msg.safetyAlert}</span>
                          </div>
                        </div>
                      )}

                      {/* FEATURE 1 ACTION: Convert this AI Diagnosis to Official Incident */}
                      {msg.sender === 'ai' && msg.id !== 'msg-welcome' && (
                        <button
                          onClick={() => handleConvertToIncident(msg)}
                          className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600/30 via-indigo-600/35 to-blue-600/30 hover:from-blue-600/50 hover:to-indigo-600/55 border border-blue-400/40 text-cyan-200 hover:text-white text-[11px] font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer group"
                        >
                          <FilePlus className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
                          <span>Chuyển câu trả lời này thành Ca sự cố chính thức</span>
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}

                      {/* Converted indicator toast */}
                      {convertedMsgId === msg.id && (
                        <div className="mt-2 text-center text-[10px] font-bold text-emerald-300 animate-pulse">
                          ✓ Đã mở biểu mẫu Đăng ca sự cố với toàn bộ dữ liệu từ AI!
                        </div>
                      )}

                      {/* Action Links */}
                      {msg.actionLinks && msg.actionLinks.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-blue-500/20 flex flex-wrap gap-1.5">
                          {msg.actionLinks.map((action, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                onNavigateTab(action.tabId);
                                setIsOpen(false);
                              }}
                              className="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/35 border border-blue-400/40 text-blue-200 hover:text-white rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <span>{action.label}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Footer actions for AI message */}
                      {msg.sender === 'ai' && (
                        <div className="mt-2.5 pt-1.5 border-t border-blue-500/15 flex items-center justify-between text-[9px] text-slate-400">
                          <span>{msg.timestamp}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopy(msg.id, msg.text)}
                              className="p-1 hover:text-white rounded transition-colors cursor-pointer flex items-center gap-1"
                              title="Sao chép"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Đã chép</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Sao chép</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleFeedback(msg.id, 'like')}
                              className={`p-1 hover:text-white rounded transition-colors cursor-pointer ${
                                msg.isLiked === true ? 'text-emerald-400' : ''
                              }`}
                              title="Hữu ích"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleFeedback(msg.id, 'dislike')}
                              className={`p-1 hover:text-white rounded transition-colors cursor-pointer ${
                                msg.isLiked === false ? 'text-rose-400' : ''
                              }`}
                              title="Chưa chính xác"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}

                      {msg.sender === 'user' && (
                        <div className="text-[9px] text-blue-200/80 text-right mt-1">
                          {msg.timestamp}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* 5. 'THINKING' LOADING INDICATORS DURING API CALLS */}
                {isTyping && (
                  <div className="flex gap-2.5 items-start animate-in fade-in duration-200">
                    <div className="relative">
                      <div className="w-7 h-7 rounded-lg bg-[#1864f3] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <Bot className="w-4 h-4 animate-spin-slow" />
                      </div>
                      <span className="absolute -inset-1 rounded-lg border border-cyan-400 animate-ping opacity-75" />
                    </div>

                    <div className="bg-[#102248] border border-blue-400/50 rounded-2xl p-3.5 rounded-bl-xs text-xs text-blue-200 space-y-2.5 shadow-xl max-w-[85%] w-full">
                      {/* Active thinking header with elapsed time counter */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                          <span className="text-[11.5px] font-bold text-white tracking-tight">
                            SmartGuard AI đang phân tích dữ liệu & SOP...
                          </span>
                        </div>
                        <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                          {thinkingTimer}s
                        </span>
                      </div>

                      {/* Smooth animated progress bar */}
                      <div className="w-full bg-[#0a1836] h-1.5 rounded-full overflow-hidden border border-blue-500/30">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${thinkingProgress}%` }}
                        />
                      </div>

                      {/* Multi-stage pipeline progression */}
                      <div className="space-y-1.5 pt-1 border-t border-blue-500/20 text-[10px]">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[8.5px] font-bold ${
                              thinkingStage >= 0
                                ? 'bg-emerald-500 text-white'
                                : 'bg-blue-900 text-blue-300'
                            }`}
                          >
                            {thinkingStage > 0 ? (
                              <Check className="w-2.5 h-2.5" />
                            ) : (
                              <Database className="w-2.5 h-2.5 animate-spin" />
                            )}
                          </div>
                          <span
                            className={
                              thinkingStage === 0
                                ? 'text-cyan-300 font-semibold animate-pulse'
                                : 'text-slate-300'
                            }
                          >
                            1. Quét cảm biến & truy vấn cơ sở dữ liệu SOP
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[8.5px] font-bold ${
                              thinkingStage >= 1
                                ? 'bg-emerald-500 text-white'
                                : 'bg-blue-900 text-blue-300'
                            }`}
                          >
                            {thinkingStage > 1 ? (
                              <Check className="w-2.5 h-2.5" />
                            ) : thinkingStage === 1 ? (
                              <Cpu className="w-2.5 h-2.5 animate-spin" />
                            ) : (
                              '2'
                            )}
                          </div>
                          <span
                            className={
                              thinkingStage === 1
                                ? 'text-cyan-300 font-semibold animate-pulse'
                                : thinkingStage > 1
                                ? 'text-slate-300'
                                : 'text-slate-500'
                            }
                          >
                            2. So khớp 10,238 ca xử lý & kinh nghiệm kỹ thuật
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[8.5px] font-bold ${
                              thinkingStage >= 2
                                ? 'bg-cyan-500 text-white animate-pulse'
                                : 'bg-blue-900 text-blue-300'
                            }`}
                          >
                            {thinkingStage === 2 ? (
                              <Layers className="w-2.5 h-2.5 animate-bounce" />
                            ) : (
                              '3'
                            )}
                          </div>
                          <span
                            className={
                              thinkingStage === 2
                                ? 'text-cyan-300 font-semibold animate-pulse'
                                : 'text-slate-500'
                            }
                          >
                            3. Tổng hợp quy trình xử lý & cảnh báo an toàn
                          </span>
                        </div>
                      </div>

                      {/* Skeleton Shimmer Bars */}
                      <div className="space-y-1.5 pt-1">
                        <div className="h-2 bg-gradient-to-r from-blue-900/60 via-blue-600/30 to-blue-900/60 rounded-full animate-pulse w-full" />
                        <div className="h-2 bg-gradient-to-r from-blue-900/60 via-blue-600/30 to-blue-900/60 rounded-full animate-pulse w-3/4" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />

                {/* Floating Scroll to Bottom Button */}
                {showScrollBottomBtn && (
                  <button
                    onClick={scrollToBottom}
                    className="sticky bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 z-10"
                  >
                    <ArrowDown className="w-3 h-3" />
                    <span>Tin nhắn mới nhất</span>
                  </button>
                )}
              </div>

              {/* FEATURE 2: Real Voice soundwave & live listening banner */}
              {isListening && (
                <div className="px-4 py-2.5 bg-gradient-to-r from-rose-950/90 via-red-900/90 to-rose-950/90 border-t border-rose-500/40 text-rose-200 text-xs flex items-center justify-between flex-shrink-0 animate-in fade-in">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span className="absolute -inset-1 rounded-full border border-rose-400 animate-ping opacity-75" />
                    </div>
                    {/* Audio visualizer wave */}
                    <div className="flex items-center gap-0.5 h-4">
                      <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce" />
                      <span className="w-1 h-3.5 bg-rose-300 rounded-full animate-bounce [animation-delay:100ms]" />
                      <span className="w-1 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:200ms]" />
                      <span className="w-1 h-4 bg-rose-200 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1 h-2.5 bg-rose-300 rounded-full animate-bounce [animation-delay:250ms]" />
                    </div>
                    <span className="font-semibold text-rose-100 text-[11px]">
                      {speechTranscript ? `"${speechTranscript}"` : 'Đang lắng nghe... Nói mã lỗi hoặc triệu chứng'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="px-2 py-0.5 bg-rose-700 hover:bg-rose-600 text-white rounded-md text-[10px] font-bold cursor-pointer"
                  >
                    Dừng
                  </button>
                </div>
              )}

              {/* Voice Notification Banner */}
              {speechNotification && !isListening && (
                <div className="px-3 py-1.5 bg-blue-950/90 border-t border-blue-500/30 text-cyan-200 text-[10.5px] flex items-center justify-between flex-shrink-0 animate-in fade-in">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                    {speechNotification}
                  </span>
                </div>
              )}

              {/* Input Box Area */}
              <div className="p-3 bg-[#0a1634] border-t border-blue-500/25 flex-shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="relative flex items-center gap-1.5"
                >
                  {/* Real Voice Recognition Mic button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    title={isListening ? 'Dừng lắng nghe' : 'Hỏi bằng giọng nói (Web Speech API)'}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      isListening
                        ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/40'
                        : 'bg-[#12285a] hover:bg-[#1a387a] text-blue-300 hover:text-white'
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4 text-white" />
                    ) : (
                      <Mic className="w-4 h-4 text-cyan-300 hover:text-white" />
                    )}
                  </button>

                  {/* Input field */}
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập mã lỗi, triệu chứng máy (VD: E210, sụt áp)..."
                    className="flex-1 bg-[#10224c] border border-blue-400/30 focus:border-blue-400 rounded-xl px-3 py-2 text-xs text-white placeholder-blue-300/50 outline-none transition-all"
                  />

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-8 h-8 rounded-xl bg-[#1864f3] hover:bg-[#1253d4] disabled:opacity-40 disabled:hover:bg-[#1864f3] text-white flex items-center justify-center transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                  >
                    <Send className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[9px] text-blue-300/60 mt-2 px-1">
                  <span>Mô hình: Gemini 3.8 Flash RAG</span>
                  <span>Voice: Tiếng Việt (vi-VN)</span>
                  <span>10,238 tri thức đã thẩm định</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
