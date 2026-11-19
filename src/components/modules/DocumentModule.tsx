import React, { useState, useEffect, useMemo } from 'react';
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
  Library,
  FileCode,
  AlertTriangle,
  Sparkles,
  Users,
  X,
  Command,
  History,
  BookPlus,
} from 'lucide-react';
import {
  BookSpineTheme,
  BookWeeklyPage,
  CrossPlantSosItem,
  FiveWhySolution,
  KaizenContributionEntry,
  MachineBook,
  OemCabinetId,
  TechnicalDocumentItem,
  UserRole,
  WeeklyIncidentEntry,
  WeeklyLeaderboardEntry,
} from '../../types';
import {
  INITIAL_CROSS_PLANT_SOS,
  INITIAL_MACHINE_BOOKS,
  OEM_CABINETS,
  WEEKLY_LEADERBOARD_DATA,
  buildInitialWeeklyPagesForBook,
} from '../../data/libraryData';
import { BookshelfCabinetSection } from '../library/BookshelfCabinetSection';
import { AddBookModal } from '../library/AddBookModal';
import { MachineLogbookReader } from '../library/MachineLogbookReader';
import { SpotlightLocatorModal } from '../library/SpotlightLocatorModal';
import { CommunitySosLeaderboard } from '../library/CommunitySosLeaderboard';

interface DocumentModuleProps {
  documents: TechnicalDocumentItem[];
  onOpenUploadModal: () => void;
  currentRole?: UserRole;
  globalSearchQuery?: string;
}

type LibraryViewTab = 'bookshelf' | 'reader' | 'sos_leaderboard' | 'edocs';

const STORAGE_KEYS = {
  books: 'edm_library_books_v1',
  pages: 'edm_library_pages_v1',
  sos: 'edm_library_sos_v1',
  leaderboard: 'edm_library_leaderboard_v1',
};

function buildInitialPagesMap(books: MachineBook[]): Record<string, BookWeeklyPage[]> {
  const map: Record<string, BookWeeklyPage[]> = {};
  for (const b of books) {
    map[b.id] = buildInitialWeeklyPagesForBook(b);
  }
  return map;
}

export const DocumentModule: React.FC<DocumentModuleProps> = ({
  documents,
  onOpenUploadModal,
  currentRole = 'technical_expert',
  globalSearchQuery = '',
}) => {
  // Primary Library Tab
  const [activeView, setActiveView] = useState<LibraryViewTab>('bookshelf');

  // Persistent Bookshelf & Logbook States
  const [machineBooks, setMachineBooks] = useState<MachineBook[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.books);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_MACHINE_BOOKS;
  });

  const [pagesByBookId, setPagesByBookId] = useState<Record<string, BookWeeklyPage[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.pages);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {}
    return buildInitialPagesMap(INITIAL_MACHINE_BOOKS);
  });

  const [sosItems, setSosItems] = useState<CrossPlantSosItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.sos);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_CROSS_PLANT_SOS;
  });

  const [leaderboard, setLeaderboard] = useState<WeeklyLeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.leaderboard);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return WEEKLY_LEADERBOARD_DATA;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(machineBooks));
    } catch {}
  }, [machineBooks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.pages, JSON.stringify(pagesByBookId));
    } catch {}
  }, [pagesByBookId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.sos, JSON.stringify(sosItems));
    } catch {}
  }, [sosItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(leaderboard));
    } catch {}
  }, [leaderboard]);

  // Bookshelf Navigation & Highlighting States
  const [selectedCabinetId, setSelectedCabinetId] = useState<OemCabinetId | 'all'>('all');
  const [shelfSearch, setShelfSearch] = useState('');
  const [highlightedBookId, setHighlightedBookId] = useState<string | null>('book-dmg-dmu50');
  const [activeBookId, setActiveBookId] = useState<string>('book-dmg-dmu50');
  const [activeWeek, setActiveWeek] = useState<number>(41);
  const [lastReadBookId, setLastReadBookId] = useState<string>('book-mzk-800');

  // Modals
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [addBookCabinetId, setAddBookCabinetId] = useState<OemCabinetId>('dmg_mori');
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  // Legacy E-Docs States (Preserved 100%)
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [vendor, setVendor] = useState('Tất cả');
  const [format, setFormat] = useState('Tất cả');
  const [viewingDoc, setViewingDoc] = useState<TechnicalDocumentItem | null>(null);

  // Cmd+K / Ctrl+K Spotlight Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync top-bar global search query smoothly when typed
  useEffect(() => {
    if (globalSearchQuery.trim()) {
      setShelfSearch(globalSearchQuery);
      setKeyword(globalSearchQuery);
    }
  }, [globalSearchQuery]);

  const activeBook = useMemo(
    () => machineBooks.find((b) => b.id === activeBookId) || machineBooks[0],
    [machineBooks, activeBookId]
  );

  const lastReadBook = useMemo(
    () => machineBooks.find((b) => b.id === lastReadBookId) || machineBooks[0],
    [machineBooks, lastReadBookId]
  );

  const activeBookPages = useMemo(() => {
    if (!activeBook) return [];
    return pagesByBookId[activeBook.id] || buildInitialWeeklyPagesForBook(activeBook);
  }, [pagesByBookId, activeBook]);

  // Dynamic Live Library Strip Metrics (grounded in 600-asset portfolio)
  const extraBooksAdded = Math.max(0, machineBooks.length - INITIAL_MACHINE_BOOKS.length);
  const totalBooksLive = 600 + extraBooksAdded;
  const totalSolutionPages = useMemo(() => {
    const initialSum = INITIAL_MACHINE_BOOKS.reduce((s, b) => s + b.solutionPagesCount, 0);
    const currentSum = machineBooks.reduce((s, b) => s + b.solutionPagesCount, 0);
    return 1420 + (currentSum - initialSum);
  }, [machineBooks]);

  const totalAdminChallenges = useMemo(() => {
    const initialErrs = INITIAL_MACHINE_BOOKS.reduce((s, b) => s + b.adminErrorCount, 0);
    const currentErrs = machineBooks.reduce((s, b) => s + b.adminErrorCount, 0);
    return Math.max(0, 285 + (currentErrs - initialErrs));
  }, [machineBooks]);

  const totalBlankBooks = useMemo(() => {
    const initialBlanks = INITIAL_MACHINE_BOOKS.filter((b) => b.isBlankBook).length;
    const currentBlanks = machineBooks.filter((b) => b.isBlankBook).length;
    return Math.max(0, 98 + (currentBlanks - initialBlanks));
  }, [machineBooks]);

  // Filtered Cabinets & Books for Bookshelf
  const visibleCabinets = useMemo(() => {
    return OEM_CABINETS.filter((cab) =>
      selectedCabinetId === 'all' ? true : cab.id === selectedCabinetId
    );
  }, [selectedCabinetId]);

  const getFilteredBooksForCabinet = (cabId: OemCabinetId) => {
    const q = shelfSearch.trim().toLowerCase();
    return machineBooks.filter((b) => {
      if (b.vendorId !== cabId) return false;
      if (!q) return true;
      return (
        b.assetCode.toLowerCase().includes(q) ||
        b.machineName.toLowerCase().includes(q) ||
        b.vendorName.toLowerCase().includes(q) ||
        b.specSubtitle.toLowerCase().includes(q) ||
        b.footerTag.toLowerCase().includes(q)
      );
    });
  };

  // Actions
  const handleOpenBook = (book: MachineBook, weekNumber?: number) => {
    setActiveBookId(book.id);
    setLastReadBookId(book.id);
    setActiveWeek(weekNumber || 41);
    setActiveView('reader');
  };

  const handleLocateOnShelf = (book: MachineBook) => {
    setSelectedCabinetId('all');
    setShelfSearch('');
    setHighlightedBookId(book.id);
    setActiveView('bookshelf');
    setTimeout(() => {
      const el = document.getElementById(`library-book-${book.id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleCreateBook = (payload: {
    assetCode: string;
    machineName: string;
    vendorId: OemCabinetId;
    plant: 'SEV' | 'P1' | 'P2';
    specSubtitle: string;
    footerTag: string;
    spineTheme: BookSpineTheme;
  }) => {
    const cabinet = OEM_CABINETS.find((c) => c.id === payload.vendorId);
    const existingInCab = machineBooks.filter((b) => b.vendorId === payload.vendorId);
    const newBook: MachineBook = {
      id: `book-custom-${Date.now()}`,
      assetCode: payload.assetCode,
      machineName: payload.machineName,
      vendorId: payload.vendorId,
      vendorName: cabinet?.shortName || 'OEM',
      cabinetShelfNo: OEM_CABINETS.findIndex((c) => c.id === payload.vendorId) + 1 || 1,
      positionIndex: existingInCab.length + 1,
      completionRate: 12.0,
      specSubtitle: payload.specSubtitle,
      footerTag: payload.footerTag,
      spineTheme: payload.spineTheme,
      iconName: 'precision',
      badgeTopRight: '+50 PTS',
      adminErrorCount: 0,
      isBlankBook: true,
      solutionPagesCount: 1,
      plant: payload.plant,
    };

    setMachineBooks((prev) => [...prev, newBook]);
    setPagesByBookId((prev) => ({
      ...prev,
      [newBook.id]: buildInitialWeeklyPagesForBook(newBook),
    }));
    setHighlightedBookId(newBook.id);
  };

  const handleCreateWeeklyIncident = (
    bookId: string,
    weekNumber: number,
    incident: WeeklyIncidentEntry
  ) => {
    setPagesByBookId((prev) => {
      const currentPages = prev[bookId] || [];
      const updated = currentPages.map((p) =>
        p.weekNumber === weekNumber
          ? {
              ...p,
              status: 'incident_alert' as const,
              isSignedOff: false,
              incidents: [incident, ...p.incidents],
            }
          : p
      );
      return { ...prev, [bookId]: updated };
    });

    setMachineBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              adminErrorCount: b.adminErrorCount + 1,
              footerTag: `${b.adminErrorCount + 1} MÃ LỖI ADMIN`,
              isBlankBook: false,
            }
          : b
      )
    );
  };

  const handleSubmitFiveWhySolution = (
    bookId: string,
    weekNumber: number,
    incidentId: string,
    solution: FiveWhySolution
  ) => {
    setPagesByBookId((prev) => {
      const currentPages = prev[bookId] || [];
      const updated = currentPages.map((p) => {
        if (p.weekNumber !== weekNumber) return p;
        return {
          ...p,
          incidents: p.incidents.map((inc) =>
            inc.id === incidentId ? { ...inc, status: 'RESOLVED' as const, solution } : inc
          ),
        };
      });
      return { ...prev, [bookId]: updated };
    });

    setMachineBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              solutionPagesCount: b.solutionPagesCount + 1,
              completionRate: Math.min(100, Number((b.completionRate + 2.4).toFixed(1))),
              isBlankBook: false,
            }
          : b
      )
    );

    // Award +25 weekly points to submitting technician on leaderboard
    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.name === solution.submittedBy
          ? {
              ...entry,
              weeklyPoints: entry.weeklyPoints + 25,
              pagesAuthored: entry.pagesAuthored + 1,
              incidentsResolvedOnTime: entry.incidentsResolvedOnTime + 1,
            }
          : entry
      )
    );
  };

  const handleSignOffWeekPage = (bookId: string, weekNumber: number, adminName: string) => {
    setPagesByBookId((prev) => {
      const currentPages = prev[bookId] || [];
      const updated = currentPages.map((p) => {
        if (p.weekNumber !== weekNumber) return p;
        return {
          ...p,
          status: 'signed_off' as const,
          isSignedOff: true,
          signedOffBy: adminName,
          signedOffAt: 'Vừa nghiệm thu',
          incidents: p.incidents.map((inc) => ({ ...inc, status: 'VERIFIED' as const })),
        };
      });
      return { ...prev, [bookId]: updated };
    });

    setMachineBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              adminErrorCount: Math.max(0, b.adminErrorCount - 1),
              completionRate: Math.min(100, Number((b.completionRate + 3.5).toFixed(1))),
              footerTag:
                Math.max(0, b.adminErrorCount - 1) === 0
                  ? 'ĐẠT CHUẨN ISO'
                  : `${Math.max(0, b.adminErrorCount - 1)} MÃ LỖI ADMIN`,
            }
          : b
      )
    );
  };

  const handleCreateKaizen = (
    bookId: string,
    weekNumber: number,
    kaizen: KaizenContributionEntry
  ) => {
    setPagesByBookId((prev) => {
      const currentPages = prev[bookId] || [];
      const updated = currentPages.map((p) =>
        p.weekNumber === weekNumber
          ? {
              ...p,
              status: p.isSignedOff ? p.status : ('kaizen_highlight' as const),
              kaizens: [kaizen, ...p.kaizens],
            }
          : p
      );
      return { ...prev, [bookId]: updated };
    });

    setMachineBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              solutionPagesCount: b.solutionPagesCount + 1,
              completionRate: Math.min(100, Number((b.completionRate + 1.8).toFixed(1))),
              isBlankBook: false,
            }
          : b
      )
    );

    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.name.toLowerCase() === kaizen.authorName.toLowerCase()
          ? {
              ...entry,
              weeklyPoints: entry.weeklyPoints + kaizen.pointsAwarded,
              kaizensApproved: entry.kaizensApproved + 1,
              pagesAuthored: entry.pagesAuthored + 1,
            }
          : entry
      )
    );
  };

  // SOS Handlers
  const handleCreateSos = (payload: {
    title: string;
    machineAssetCode: string;
    oemName: string;
    errorCode: string;
    plant: 'SEV' | 'P1' | 'P2';
    description: string;
  }) => {
    const newSos: CrossPlantSosItem = {
      id: `sos-${Date.now()}`,
      title: payload.title,
      machineAssetCode: payload.machineAssetCode,
      oemName: payload.oemName,
      errorCode: payload.errorCode,
      plant: payload.plant,
      askedBy: 'Lê Hoàng Minh',
      askedByRole: 'Kỹ sư Vận hành',
      createdAt: 'Vừa đăng',
      status: 'open',
      bountyPoints: 45,
      description: payload.description,
      answers: [],
    };
    setSosItems((prev) => [newSos, ...prev]);
  };

  const handleAddSosAnswer = (
    sosId: string,
    content: string,
    authorName: string,
    plant: 'SEV' | 'P1' | 'P2'
  ) => {
    setSosItems((prev) =>
      prev.map((item) =>
        item.id === sosId
          ? {
              ...item,
              answers: [
                ...item.answers,
                {
                  id: `ans-${Date.now()}`,
                  authorName,
                  authorPlant: plant,
                  authorGrade: 'Kỹ sư Bậc cao (Grade IV)',
                  content,
                  isAccepted: false,
                  pointsEarned: 0,
                  createdAt: 'Vừa gửi',
                },
              ],
            }
          : item
      )
    );
  };

  const handleAcceptSosAnswer = (sosId: string, answerId: string) => {
    let awardedAuthor = '';
    let awardedPts = 0;

    setSosItems((prev) =>
      prev.map((item) => {
        if (item.id !== sosId) return item;
        awardedPts = item.bountyPoints;
        return {
          ...item,
          status: 'solved',
          answers: item.answers.map((ans) => {
            if (ans.id !== answerId) return ans;
            awardedAuthor = ans.authorName;
            return { ...ans, isAccepted: true, pointsEarned: item.bountyPoints };
          }),
        };
      })
    );

    if (awardedAuthor && awardedPts > 0) {
      setLeaderboard((prev) =>
        prev.map((row) =>
          row.name === awardedAuthor
            ? { ...row, weeklyPoints: row.weeklyPoints + awardedPts }
            : row
        )
      );
    }
  };

  // Legacy E-Docs Filtering
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

  const openSosCount = sosItems.filter((s) => s.status === 'open').length;

  return (
    <div className="space-y-3.5 select-none">
      {/* 1. INDUSTRIAL DIGITAL BOOKSHELF HEADER BANNER */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#091738] via-[#0e2d78] to-[#1249be] text-white shadow-md border border-[#1e4ea8]/50">
        <div className="relative z-10 px-5 sm:px-6 py-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-[11px] font-mono uppercase tracking-wider text-blue-100">
              <Library className="w-3.5 h-3.5 text-amber-300" />
              <span>HỆ THỐNG THƯ VIỆN KỸ THUẬT SỐ • TỦ 600 THIẾT BỊ NẶNG</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-blue-100">
              <span>CHỈ SỐ SỐ HÓA XƯỞNG: 87.4%</span>
              <button
                type="button"
                onClick={() => setIsSpotlightOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Command className="w-3 h-3" />
                <span>Tra cứu nhanh ⌘K</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Thư Viện Sổ Tay Thiết Bị
              </h1>
              <p className="text-[#bfd6ff] text-xs sm:text-sm mt-1 leading-relaxed">
                Quản lý 600 cuốn sổ tay kỹ thuật phân loại trực quan theo Tủ Nhà Cung Cấp Máy
                (OEM / Machine Vendors) • Cấu trúc 1 trang = 1 tuần (W01–W52).
              </p>
            </div>

            {/* Phiên đọc gần nhất */}
            {lastReadBook && (
              <button
                type="button"
                onClick={() => handleOpenBook(lastReadBook, 41)}
                className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer shrink-0"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1864f3] flex items-center justify-center shrink-0">
                  <History className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-blue-200">
                    Phiên đọc gần nhất
                  </div>
                  <div className="text-xs font-bold text-white">{lastReadBook.machineName}</div>
                  <div className="font-mono text-[10px] text-amber-300">
                    {lastReadBook.lastReadAt || 'Cách đây 12 phút'} •{' '}
                    {lastReadBook.lastReadBy || 'KTV. Nam'}
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* 4 Live Library Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="bg-[#0e2d74]/85 border border-blue-400/30 rounded-xl px-3.5 py-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-blue-200 uppercase">
                <span>Tổng Sách Máy</span>
                <Library className="w-4 h-4 text-blue-300" />
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-white">
                  {totalBooksLive}
                </span>
                <span className="text-[11px] text-blue-200">cuốn live</span>
              </div>
              <span className="text-[11px] text-blue-300 mt-0.5">Toàn bộ 6 tủ OEM &amp; 3 xưởng</span>
            </div>

            <div className="bg-[#0b3e42]/85 border border-emerald-400/30 rounded-xl px-3.5 py-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-200 uppercase">
                <span>Trang Giải Pháp</span>
                <BookOpen className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-white">
                  {totalSolutionPages.toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-200">trang</span>
              </div>
              <span className="text-[11px] text-emerald-300 mt-0.5">+42 trang tuần W41</span>
            </div>

            <div className="bg-[#4b2513]/85 border border-amber-400/35 rounded-xl px-3.5 py-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-amber-200 uppercase">
                <span>Thử Thách Admin</span>
                <AlertTriangle className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-amber-200">
                  {totalAdminChallenges}
                </span>
                <span className="text-[11px] text-amber-100">cuốn cần giải</span>
              </div>
              <span className="text-[11px] text-amber-300 font-semibold mt-0.5">
                Cần báo cáo 5-Why đúng hạn
              </span>
            </div>

            <div className="bg-[#182c5c]/85 border border-blue-400/30 rounded-xl px-3.5 py-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-blue-200 uppercase">
                <span>Sách Trắng Chờ Mở</span>
                <BookPlus className="w-4 h-4 text-blue-300" />
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-white">
                  {totalBlankBooks}
                </span>
                <span className="text-[11px] text-blue-200">chưa có trang</span>
              </div>
              <span className="text-[11px] text-blue-300 mt-0.5">+50 Điểm khai bút đầu tiên</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MODULE VIEW NAVIGATION BAR */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveView('bookshelf')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeView === 'bookshelf'
                ? 'bg-[#1864f3] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>Kệ Sách Thiết Bị (OEM)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('reader')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeView === 'reader'
                ? 'bg-[#1864f3] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sổ Tay Đang Đọc ({activeBook?.assetCode || 'W41'})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('sos_leaderboard')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeView === 'sos_leaderboard'
                ? 'bg-[#1864f3] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Cộng Đồng SOS &amp; Vinh Danh</span>
            {openSosCount > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-red-500 text-white font-mono text-[10px] font-bold">
                {openSosCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveView('edocs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeView === 'edocs'
                ? 'bg-[#1864f3] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Kho E-Docs Kỹ Thuật (1,248)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSpotlightOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Định vị trên kệ (⌘K)</span>
          </button>

          {activeView === 'bookshelf' && (
            <button
              type="button"
              onClick={() => {
                setAddBookCabinetId(
                  selectedCabinetId === 'all' ? 'dmg_mori' : selectedCabinetId
                );
                setIsAddBookOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#091738] hover:bg-[#13295c] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Sách Mới</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. VIEW 1: DIGITAL BOOKSHELF BY OEM CABINETS */}
      {activeView === 'bookshelf' && (
        <div className="space-y-4">
          {/* Toolbar & OEM Cabinet Filters */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/85 shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={shelfSearch}
                  onChange={(e) => setShelfSearch(e.target.value)}
                  placeholder="Lọc nhanh sách máy trên kệ (VD: BK-DMU-50, MZK-800, 20k RPM, HSK-A63)..."
                  className="w-full h-9 pl-9 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                />
                {shelfSearch && (
                  <button
                    type="button"
                    onClick={() => setShelfSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <span className="font-mono text-[11px] text-slate-500">
                Nhấp vào gáy sách bất kỳ để mở nhật ký 52 tuần (W01–W52)
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                Lọc tủ nhà cung cấp:
              </span>

              <button
                type="button"
                onClick={() => setSelectedCabinetId('all')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-semibold whitespace-nowrap cursor-pointer border ${
                  selectedCabinetId === 'all'
                    ? 'bg-[#1864f3] text-white border-[#1864f3]'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70'
                }`}
              >
                Tất cả Tủ Nhà Cung Cấp ({totalBooksLive} cuốn)
              </button>

              {OEM_CABINETS.map((cab) => (
                <button
                  key={cab.id}
                  type="button"
                  onClick={() => setSelectedCabinetId(cab.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-semibold whitespace-nowrap cursor-pointer border ${
                    selectedCabinetId === cab.id
                      ? 'bg-[#091738] text-white border-[#091738]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cab.shortName} ({cab.totalAssets} máy)
                </button>
              ))}
            </div>
          </div>

          {/* Render OEM Cabinets */}
          <div className="space-y-5">
            {visibleCabinets.map((cabinet) => {
              const cabBooks = getFilteredBooksForCabinet(cabinet.id);
              if (shelfSearch.trim() && cabBooks.length === 0) return null;

              return (
                <BookshelfCabinetSection
                  key={cabinet.id}
                  cabinet={cabinet}
                  books={cabBooks}
                  highlightedBookId={highlightedBookId}
                  onSelectBook={(b) => handleOpenBook(b, 41)}
                  onOpenAddBook={(cabId) => {
                    setAddBookCabinetId(cabId);
                    setIsAddBookOpen(true);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 4. VIEW 2: MACHINE LOGBOOK 52-WEEK READER */}
      {activeView === 'reader' && activeBook && (
        <MachineLogbookReader
          book={activeBook}
          pages={activeBookPages}
          activeWeek={activeWeek}
          currentRole={currentRole}
          onSelectWeek={setActiveWeek}
          onBackToShelf={() => setActiveView('bookshelf')}
          onCreateWeeklyIncident={handleCreateWeeklyIncident}
          onSubmitFiveWhySolution={handleSubmitFiveWhySolution}
          onSignOffWeekPage={handleSignOffWeekPage}
          onCreateKaizen={handleCreateKaizen}
        />
      )}

      {/* 5. VIEW 3: CROSS-PLANT SOS & WEEKLY LEADERBOARD */}
      {activeView === 'sos_leaderboard' && (
        <CommunitySosLeaderboard
          sosItems={sosItems}
          leaderboard={leaderboard}
          onCreateSos={handleCreateSos}
          onAddSosAnswer={handleAddSosAnswer}
          onAcceptSosAnswer={handleAcceptSosAnswer}
        />
      )}

      {/* 6. VIEW 4: LEGACY TECHNICAL E-DOCS CATALOG (PRESERVED) */}
      {activeView === 'edocs' && (
        <div className="space-y-3.5">
          {/* Category Filters & Upload Action */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
              type="button"
              onClick={onOpenUploadModal}
              className="px-4 py-2 bg-[#1864f3] hover:bg-[#1456d8] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm shadow-blue-500/25 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Tải lên tài liệu</span>
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
            {/* Left Filter */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                    Bộ lọc tài liệu E-Docs
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
                    type="button"
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

            {/* Right: Documents Grid */}
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

                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-lg inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã duyệt ({doc.version})
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
                      <div className="flex items-center gap-3 text-[11px] font-mono tabular-nums">
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
                          type="button"
                          onClick={() => setViewingDoc(doc)}
                          className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1864f3] font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Xem chi tiết
                        </button>
                        <button
                          type="button"
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
        </div>
      )}

      {/* Add New Book Modal */}
      <AddBookModal
        isOpen={isAddBookOpen}
        defaultCabinetId={addBookCabinetId}
        cabinets={OEM_CABINETS}
        onClose={() => setIsAddBookOpen(false)}
        onCreateBook={handleCreateBook}
      />

      {/* Cmd+K Spotlight Machine Locator */}
      <SpotlightLocatorModal
        isOpen={isSpotlightOpen}
        books={machineBooks}
        pagesByBookId={pagesByBookId}
        onClose={() => setIsSpotlightOpen(false)}
        onLocateOnShelf={handleLocateOnShelf}
        onOpenLogbook={handleOpenBook}
      />

      {/* Legacy E-Doc Detail Preview Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-5 py-3.5 bg-[#091738] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm truncate max-w-md">{viewingDoc.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
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
                <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-lg text-[10px]">
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
                  <span className="text-slate-500 block text-[11px]">
                    Tác giả / Nhà phát hành:
                  </span>
                  <strong className="text-slate-900">{viewingDoc.author}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Ngày cập nhật:</span>
                  <strong className="text-slate-900">{viewingDoc.updatedAt}</strong>
                </div>
              </div>

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
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="px-5 py-2 bg-[#1864f3] hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
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
