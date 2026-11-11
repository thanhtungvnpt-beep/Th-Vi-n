import React, { useState, useMemo } from 'react';
import { HeroBanner } from '../HeroBanner';
import { CategoryBar } from '../CategoryBar';
import { FilterPanel } from '../FilterPanel';
import { IncidentList } from '../IncidentList';
import { IncidentDetail } from '../IncidentDetail';
import { RightSidebar } from '../RightSidebar';
import { IncidentItem } from '../../types';

interface IncidentModuleProps {
  incidents: IncidentItem[];
  selectedId: string;
  onSelectIncident: (item: IncidentItem) => void;
  onOpenNewModal: () => void;
  searchQuery: string;
}

export const IncidentModule: React.FC<IncidentModuleProps> = ({
  incidents,
  selectedId,
  onSelectIncident,
  onOpenNewModal,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState<{
    keyword: string;
    vendor: string;
    model: string;
    errorCode: string;
    phenomenon: string;
    statuses: string[];
  }>({
    keyword: '',
    vendor: 'Tất cả',
    model: 'Tất cả',
    errorCode: '',
    phenomenon: 'Tất cả',
    statuses: ['confirmed'],
  });

  const filteredIncidents = useMemo(() => {
    return incidents.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.machineId.toLowerCase().includes(q) ||
          item.vendor.toLowerCase().includes(q) ||
          item.model.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      if (filters.keyword.trim()) {
        const k = filters.keyword.toLowerCase();
        if (
          !item.title.toLowerCase().includes(k) &&
          !item.code.toLowerCase().includes(k) &&
          !item.machineId.toLowerCase().includes(k)
        )
          return false;
      }

      if (filters.vendor !== 'Tất cả' && item.vendor !== filters.vendor) return false;
      if (filters.model !== 'Tất cả' && item.model !== filters.model) return false;
      if (filters.errorCode.trim() && !item.code.toLowerCase().includes(filters.errorCode.toLowerCase()))
        return false;

      return true;
    });
  }, [incidents, searchQuery, selectedCategory, filters]);

  const currentIncident = useMemo(() => {
    return (
      incidents.find((i) => i.id === selectedId) ||
      filteredIncidents[0] ||
      incidents[0]
    );
  }, [incidents, selectedId, filteredIncidents]);

  return (
    <div className="space-y-3.5 select-none">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Pills & Post Button */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenNewModal={onOpenNewModal}
      />

      {/* 4-Column Core Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* Col 1: Bộ lọc tìm kiếm */}
        <div className="xl:col-span-2">
          <FilterPanel
            onSearch={(newFilters) => setFilters(newFilters)}
            onReset={() =>
              setFilters({
                keyword: '',
                vendor: 'Tất cả',
                model: 'Tất cả',
                errorCode: '',
                phenomenon: 'Tất cả',
                statuses: ['confirmed'],
              })
            }
          />
        </div>

        {/* Col 2: Danh sách ca sự cố */}
        <div className="xl:col-span-2">
          <IncidentList
            incidents={filteredIncidents.length > 0 ? filteredIncidents : incidents}
            selectedId={currentIncident.id}
            onSelect={onSelectIncident}
            totalCount={1376}
          />
        </div>

        {/* Col 3: Chi tiết ca sự cố */}
        <div className="xl:col-span-6">
          <IncidentDetail incident={currentIncident} />
        </div>

        {/* Col 4: Right Sidebar Widgets */}
        <div className="xl:col-span-2">
          <RightSidebar
            incident={currentIncident}
            onSelectSimilar={(simId) => {
              const found = incidents.find((i) => i.id === simId);
              if (found) onSelectIncident(found);
            }}
          />
        </div>
      </div>
    </div>
  );
};
