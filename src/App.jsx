import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import CustomerDirectory from './components/CustomerDirectory';
import CustomerProfile from './components/CustomerProfile';
import CustomerTabs from './components/CustomerTabs';
import FilterDrawer from './components/FilterDrawer';
import InfoTab from './components/tabs/InfoTab';
import ActivitiesTab from './components/tabs/ActivitiesTab';
import SwitchSaveTab from './components/tabs/SwitchSaveTab';
import ContactsTab from './components/tabs/ContactsTab';
import PlaceholderTab from './components/tabs/PlaceholderTab';
import { customers } from './data/mockData';
import useCustomerFilters from './hooks/useCustomerFilters';
import useCustomerSelection from './hooks/useCustomerSelection';
import useToggle from './hooks/useToggle';
import { colors } from './theme';

const TAB_VIEWS = {
  info: (c) => <InfoTab customer={c} />,
  activities: (c) => <ActivitiesTab customer={c} />,
  switchsave: (c) => <SwitchSaveTab customer={c} />,
  contacts: (c) => <ContactsTab customer={c} />,
  history: () => <PlaceholderTab title="CST History" />,
  pipeline: () => <PlaceholderTab title="Pipeline" />,
  orders: () => <PlaceholderTab title="Orders" />,
  categories: () => <PlaceholderTab title="Categories" />,
};

export default function App() {
  const { selected, selectedId, select, tab, setTab } = useCustomerSelection(customers);
  const list = useCustomerFilters(customers);
  const [filterOpen, , setFilterOpen] = useToggle(false);
  const [directoryCollapsed, toggleDirectoryCollapsed, setDirectoryCollapsed] = useToggle(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh', minWidth: 1100, overflow: 'hidden', bgcolor: colors.pageBg }}>
      <Sidebar active="Customers" />

      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppHeader
          title="Customer"
          hasActiveFilters={list.hasActiveFilters}
          onOpenFilters={() => setFilterOpen(true)}
        />

        <Box sx={{ flex: 1, minHeight: 0, display: 'flex' }}>
          <CustomerDirectory
            customers={list.visibleCustomers}
            selectedId={selectedId}
            onSelect={select}
            search={list.search}
            onSearchChange={list.setSearch}
            activeChips={list.activeChips}
            onToggleChip={list.toggleChip}
            sortKey={list.sortKey}
            onSortKeyChange={list.setSortKey}
            sortDir={list.sortDir}
            onToggleSortDir={list.toggleSortDir}
            collapsed={directoryCollapsed}
            onToggleCollapsed={toggleDirectoryCollapsed}
          />

          <Box component="main" sx={{ flex: 1, minWidth: 0, overflowY: 'auto', bgcolor: colors.pageBg }}>
            <CustomerProfile customer={selected} onBack={() => setDirectoryCollapsed(false)} />
            <Box sx={{ position: 'sticky', top: 0, zIndex: 2 }}>
              <CustomerTabs value={tab} onChange={setTab} />
            </Box>
            <Box sx={{ p: '24px' }}>{TAB_VIEWS[tab]?.(selected) ?? null}</Box>
          </Box>
        </Box>
      </Box>

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={list.filters}
        onApply={list.setFilters}
      />
    </Box>
  );
}
