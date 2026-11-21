import {
  Box,
  Button,
  Chip,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PhoneInTalkOutlined from '@mui/icons-material/PhoneInTalkOutlined';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import CustomerRow from './CustomerRow';
import { QUICK_FILTERS, TOTAL_CUSTOMERS } from '../data/mockData';
import useAnchorMenu from '../hooks/useAnchorMenu';
import { colors } from '../theme';

export const SORT_OPTIONS = [
  { key: 'urgency', label: 'Urgency' },
  { key: 'ytdRev', label: 'YTD Rev' },
  { key: 'score', label: 'Health' },
  { key: 'name', label: 'Name' },
];

export default function CustomerDirectory({
  customers,
  selectedId,
  onSelect,
  search,
  onSearchChange,
  activeChips,
  onToggleChip,
  sortKey,
  onSortKeyChange,
  sortDir,
  onToggleSortDir,
  collapsed,
  onToggleCollapsed,
}) {
  const sortMenu = useAnchorMenu();
  const sortLabel = SORT_OPTIONS.find((o) => o.key === sortKey)?.label ?? 'Urgency';

  if (collapsed) {
    return (
      <Box
        sx={{
          width: 40,
          flexShrink: 0,
          bgcolor: '#fff',
          borderRight: `0.5px solid ${colors.divider}`,
          display: 'flex',
          justifyContent: 'center',
          pt: 1.5,
        }}
      >
        <IconButton size="small" onClick={onToggleCollapsed} aria-label="Expand customer directory">
          <ChevronRight fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 432,
        flexShrink: 0,
        bgcolor: '#fff',
        borderRight: `0.5px solid ${colors.divider}`,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      {/* Search + Generate */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '9px', px: '13px', height: 57, borderBottom: `0.5px solid ${colors.divider}` }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            bgcolor: colors.pageBg,
            borderRadius: '17px',
            height: 34,
            px: '11px',
          }}
        >
          <SearchIcon sx={{ fontSize: 15, color: colors.textFaint }} />
          <InputBase
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search customers..."
            inputProps={{ 'aria-label': 'Search customers' }}
            sx={{ flex: 1, fontSize: 12 }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PhoneInTalkOutlined sx={{ fontSize: '13px !important', color: '#f87171' }} />}
          sx={{ height: 32, borderRadius: '6px', fontSize: 11, px: '12px', minWidth: 0 }}
        >
          Generate
        </Button>
        <IconButton size="small" onClick={onToggleCollapsed} aria-label="Collapse customer directory">
          <ChevronLeft fontSize="small" sx={{ color: colors.textFaint }} />
        </IconButton>
      </Box>

      {/* Quick filter chips */}
      <Box
        sx={{
          display: 'flex',
          gap: '6px',
          px: '13px',
          height: 44,
          alignItems: 'center',
          overflowX: 'auto',
          flexShrink: 0,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {QUICK_FILTERS.map((f) => {
          const on = activeChips.includes(f.key);
          return (
            <Chip
              key={f.key}
              label={f.label}
              clickable
              onClick={() => onToggleChip(f.key)}
              variant={on ? 'filled' : 'outlined'}
              sx={{
                height: 27,
                fontSize: 11.5,
                fontWeight: on ? 700 : 400,
                borderRadius: '14px',
                bgcolor: on ? colors.navy : '#fff',
                color: on ? '#fff' : colors.textStrong,
                borderColor: colors.border,
                '&:hover': { bgcolor: on ? colors.navy : '#f3f4f6' },
              }}
            />
          );
        })}
      </Box>

      {/* Count + sort */}
      <Box
        sx={{
          height: 30,
          flexShrink: 0,
          bgcolor: colors.panelHeader,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '13px',
        }}
      >
        <Typography sx={{ fontSize: 10.5, color: colors.textMuted }}>
          {customers.length} of {TOTAL_CUSTOMERS} customers
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ButtonLikeSort label={sortLabel} onClick={sortMenu.openMenu} />
          <IconButton size="small" onClick={onToggleSortDir} aria-label="Toggle sort order" sx={{ p: '2px' }}>
            {sortDir === 'asc' ? (
              <ArrowUpward sx={{ fontSize: 13, color: colors.textMuted }} />
            ) : (
              <ArrowDownward sx={{ fontSize: 13, color: colors.textMuted }} />
            )}
          </IconButton>
          <Menu anchorEl={sortMenu.anchorEl} open={sortMenu.isOpen} onClose={sortMenu.closeMenu}>
            {SORT_OPTIONS.map((o) => (
              <MenuItem
                key={o.key}
                selected={o.key === sortKey}
                dense
                onClick={() => {
                  onSortKeyChange(o.key);
                  sortMenu.closeMenu();
                }}
              >
                {o.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* List */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {customers.length === 0 ? (
          <Typography sx={{ p: 3, fontSize: 12.5, color: colors.textMuted, textAlign: 'center' }}>
            No customers match your filters.
          </Typography>
        ) : (
          customers.map((c) => (
            <CustomerRow key={c.id} customer={c} selected={c.id === selectedId} onSelect={onSelect} />
          ))
        )}
      </Box>
    </Box>
  );
}

function ButtonLikeSort({ label, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        fontSize: 10.5,
        color: colors.textMuted,
      }}
    >
      Sort: {label}
      <KeyboardArrowDown sx={{ fontSize: 14 }} />
    </Box>
  );
}
