/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { IncidentModule } from './components/modules/IncidentModule';
import { ImprovementModule } from './components/modules/ImprovementModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';
import { CommunityModule } from './components/modules/CommunityModule';
import { AISearchModule } from './components/modules/AISearchModule';
import { ApprovalModule } from './components/modules/ApprovalModule';
import { RankingModule } from './components/modules/RankingModule';
import { DocumentModule } from './components/modules/DocumentModule';
import { MobileFieldModule } from './components/modules/MobileFieldModule';
import { LifecycleModule } from './components/modules/LifecycleModule';
import { NewIncidentModal } from './components/NewIncidentModal';
import { AIChatBox } from './components/AIChatBox';

import {
  CURRENT_USER,
  INCIDENTS_DATA,
  IMPROVEMENTS_DATA,
  DISCUSSIONS_DATA,
  TECHNICAL_DOCUMENTS_DATA,
  VENDOR_RANKINGS_DATA,
  INDIVIDUAL_RANKINGS_DATA,
  APPROVAL_QUEUE_DATA,
  AUDIT_LOGS_DATA,
} from './data/mockData';

import {
  IncidentItem,
  ImprovementItem,
  DiscussionItem,
  TechnicalDocumentItem,
  ApprovalQueueItem,
  UserRole,
} from './types';

export default function App() {
  const [activeNav, setActiveNav] = useState('incidents');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIncidentData, setInitialIncidentData] = useState<Partial<IncidentItem> | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('technical_expert');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('edm_smartguard_theme_mode') === 'dark';
    } catch {
      return false;
    }
  });

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('edm_smartguard_theme_mode', next ? 'dark' : 'default');
      } catch {}
      return next;
    });
  };

  // Core Data States
  const [incidents, setIncidents] = useState<IncidentItem[]>(INCIDENTS_DATA);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('inc-01');

  const [improvements, setImprovements] = useState<ImprovementItem[]>(IMPROVEMENTS_DATA);
  const [selectedImprovementId, setSelectedImprovementId] = useState<string>('imp-01');

  const [discussions] = useState<DiscussionItem[]>(DISCUSSIONS_DATA);
  const [documents] = useState<TechnicalDocumentItem[]>(TECHNICAL_DOCUMENTS_DATA);
  const [approvalQueue, setApprovalQueue] = useState<ApprovalQueueItem[]>(APPROVAL_QUEUE_DATA);

  // Current selected incident
  const currentIncident =
    incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  // Handlers for approval actions
  const handleApproveItem = (id: string, notes?: string) => {
    setApprovalQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRequestEdit = (id: string, notes: string) => {
    // Keeps in queue or marks as revision
  };

  const handleRejectItem = (id: string, notes: string) => {
    setApprovalQueue((prev) => prev.filter((item) => item.id !== id));
  };

  // Handler for creating incident
  const handleCreateIncident = (newInc: Partial<IncidentItem>) => {
    const newItem: IncidentItem = {
      id: `inc-${Date.now()}`,
      title: newInc.title || 'Sự cố mới ghi nhận',
      code: newInc.code || 'ERR',
      machineId: newInc.machineId || 'CNC-04',
      vendor: newInc.vendor || 'Mitsubishi',
      model: newInc.model || 'M-V800',
      status: 'pending',
      statusText: 'Chờ duyệt',
      likes: 1,
      commentsCount: 0,
      thumbnail: '/extracted/thumb_spindle.png',
      updatedAt: 'Hôm nay',
      views: 1,
      category: 'cnc',
      phenomenon: newInc.phenomenon?.length
        ? newInc.phenomenon
        : ['Đang cập nhật hiện tượng'],
      rootCauses: newInc.rootCauses?.length
        ? newInc.rootCauses
        : ['Đang điều tra nguyên nhân'],
      steps: [
        {
          number: 1,
          title: 'Kiểm tra sơ bộ hiện trường',
          image: '/extracted/photo_step1.png',
        },
      ],
      author: {
        name: CURRENT_USER.name,
        role: CURRENT_USER.roleTitle,
        avatar: CURRENT_USER.avatar,
        postDate: 'Hôm nay',
        confirmDate: 'Chờ duyệt',
        confirmedBy: 'Đang chờ',
      },
      documents: [],
      similar: [],
    };

    setIncidents([newItem, ...incidents]);
    setSelectedIncidentId(newItem.id);
  };

  return (
    <div
      className={`min-h-screen bg-[#091738] text-slate-800 flex flex-col font-sans select-none antialiased ${
        isDarkMode ? 'high-contrast-dark' : ''
      }`}
    >
      {/* Top Header Bar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        isMobileView={isMobileView}
        onToggleMobileView={() => setIsMobileView(!isMobileView)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-x-hidden">
        {/* Left Dark Sidebar (hidden in Mobile Field mode) */}
        {!isMobileView && (
          <Sidebar
            activeNav={activeNav}
            onSelectNav={(id) => {
              if (id === 'home') setActiveNav('analytics');
              else setActiveNav(id);
            }}
            pendingCount={approvalQueue.length}
            lifecycleAlertCount={3}
          />
        )}

        {/* Content Canvas */}
        <main
          className={`flex-1 overflow-y-auto min-w-0 transition-all ${
            isMobileView
              ? 'bg-[#091738] p-4 flex items-center justify-center'
              : 'bg-[#edf2f9] rounded-tl-2xl p-3.5 lg:p-4'
          }`}
        >
          {isMobileView ? (
            /* Dedicated Mobile Field Troubleshooting Mode */
            <MobileFieldModule
              incident={currentIncident}
              onBackToDesktop={() => setIsMobileView(false)}
            />
          ) : (
            <div className="max-w-[1580px] mx-auto space-y-3.5">
              {/* Module: Vòng đời tri thức (Knowledge Lifecycle Control Center) */}
              {activeNav === 'lifecycle' && (
                <LifecycleModule
                  currentRole={currentRole}
                  onOpenNewIncidentModal={() => setIsModalOpen(true)}
                  onNavigateTab={(tab) => setActiveNav(tab)}
                />
              )}

              {/* Module 1: Xử lý sự cố (Incident Troubleshooting) */}
              {activeNav === 'incidents' && (
                <IncidentModule
                  incidents={incidents}
                  selectedId={selectedIncidentId}
                  onSelectIncident={(item) => setSelectedIncidentId(item.id)}
                  onOpenNewModal={() => setIsModalOpen(true)}
                  searchQuery={searchQuery}
                />
              )}

              {/* Module 2: Cải tiến kỹ thuật (Technical Improvement) */}
              {activeNav === 'improvement' && (
                <ImprovementModule
                  improvements={improvements}
                  selectedId={selectedImprovementId}
                  onSelect={(item) => setSelectedImprovementId(item.id)}
                  onOpenNewModal={() => setIsModalOpen(true)}
                />
              )}

              {/* Module 3: Tổng hợp tri thức / Trang chủ tri thức (Analytics & Overview) */}
              {(activeNav === 'analytics' || activeNav === 'home') && (
                <AnalyticsModule
                  onNavigateTab={(tab) => setActiveNav(tab)}
                  onOpenNewModal={() => setIsModalOpen(true)}
                />
              )}

              {/* Module 4: Cộng đồng kỹ thuật (Technical Community) */}
              {activeNav === 'community' && (
                <CommunityModule
                  discussions={discussions}
                  onOpenNewModal={() => setIsModalOpen(true)}
                />
              )}

              {/* Module 5: Tìm kiếm AI (AI Knowledge Search) */}
              {activeNav === 'ai-search' && (
                <AISearchModule onNavigateTab={(tab) => setActiveNav(tab)} />
              )}

              {/* Module 6: Phê duyệt nội dung (Content Approval) */}
              {activeNav === 'approval' && (
                <ApprovalModule
                  queueItems={approvalQueue}
                  onApproveItem={handleApproveItem}
                  onRequestEdit={handleRequestEdit}
                  onRejectItem={handleRejectItem}
                />
              )}

              {/* Module 7: Đóng góp & Xếp hạng (Ranking & Gamification) */}
              {activeNav === 'contributions' && (
                <RankingModule
                  currentUser={CURRENT_USER}
                  vendorRankings={VENDOR_RANKINGS_DATA}
                  individualRankings={INDIVIDUAL_RANKINGS_DATA}
                  onOpenNewModal={() => setIsModalOpen(true)}
                />
              )}

              {/* Module 8: Thư viện tài liệu (Document Library) */}
              {activeNav === 'docs' && (
                <DocumentModule
                  documents={documents}
                  onOpenUploadModal={() => setIsModalOpen(true)}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Creation Modal */}
      <NewIncidentModal
        isOpen={isModalOpen}
        initialData={initialIncidentData}
        onClose={() => {
          setIsModalOpen(false);
          setInitialIncidentData(null);
        }}
        onSubmit={handleCreateIncident}
      />

      {/* Industrial AI Assistant Chat Box */}
      <AIChatBox
        onNavigateTab={(tab) => setActiveNav(tab)}
        onConvertAiToIncident={(data) => {
          setInitialIncidentData(data);
          setActiveNav('incidents');
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}
