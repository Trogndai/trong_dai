import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import { EMPTY_FILTERS, FILTER_OPTIONS } from '../data/mockData';
import useFilterDraft from '../hooks/useFilterDraft';
import { colors } from '../theme';

function SectionTitle({ children, trailing }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '22px', mb: '6px' }}>
      <Typography sx={{ fontSize: 11, fontWeight: 500, color: colors.textMuted, letterSpacing: 0.4 }}>{children}</Typography>
      {trailing}
    </Box>
  );
}

function CheckGroup({ options, selected, onToggle }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {options.map((opt) => {
        const label = typeof opt === 'string' ? opt : opt.label;
        const key = typeof opt === 'string' ? opt : opt.key;
        return (
          <FormControlLabel
            key={key}
            sx={{ m: 0, height: 28, '& .MuiFormControlLabel-label': { fontSize: 12.5, color: colors.textStrong } }}
            control={
              <Checkbox
                size="small"
                checked={selected.includes(key)}
                onChange={() => onToggle(key)}
                sx={{ p: '4px', mr: '6px', color: '#9ca3af' }}
              />
            }
            label={label}
          />
        );
      })}
    </Box>
  );
}

export default function FilterDrawer({ open, onClose, filters, onApply }) {
  const { draft, setDraft, toggle } = useFilterDraft(open, filters);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 329, display: 'flex', flexDirection: 'column' } }}
    >
      <Box sx={{ height: 45, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '19px', borderBottom: `0.7px solid ${colors.border}` }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary }}>Filter Customers</Typography>
        <IconButton size="small" onClick={onClose} aria-label="Close customer filters">
          <Close sx={{ fontSize: 18, color: colors.textFaint }} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: '19px', pb: 2 }}>
        <SectionTitle
          trailing={
            <Box
              component="button"
              type="button"
              onClick={() => setDraft((d) => ({ ...d, myCustomers: !d.myCustomers }))}
              sx={{
                all: 'unset',
                cursor: 'pointer',
                px: '8px',
                height: 19,
                borderRadius: '10px',
                fontSize: 10.5,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                bgcolor: draft.myCustomers ? colors.navy : '#e8f0fe',
                color: draft.myCustomers ? '#fff' : '#1d4ed8',
              }}
            >
              My Customers
            </Box>
          }
        >
          <Box component="span" sx={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary, letterSpacing: 0 }}>
            Sales Rep
          </Box>
        </SectionTitle>
        <Box sx={{ maxHeight: 180, overflowY: 'auto', mt: '4px' }}>
          <CheckGroup options={FILTER_OPTIONS.salesReps} selected={draft.salesReps} onToggle={toggle('salesReps')} />
        </Box>

        <SectionTitle>CHANNEL</SectionTitle>
        <CheckGroup options={FILTER_OPTIONS.channels} selected={draft.channels} onToggle={toggle('channels')} />

        <SectionTitle>CUSTOMER SIZE (ROLLING 12 MONTHS)</SectionTitle>
        <CheckGroup options={FILTER_OPTIONS.sizes} selected={draft.sizes} onToggle={toggle('sizes')} />

        <SectionTitle>SENTIMENT</SectionTitle>
        <CheckGroup options={FILTER_OPTIONS.sentiments} selected={draft.sentiments} onToggle={toggle('sentiments')} />

        <SectionTitle>CATEGORY</SectionTitle>
        <Box sx={{ maxHeight: 180, overflowY: 'auto' }}>
          <CheckGroup options={FILTER_OPTIONS.categories} selected={draft.categories} onToggle={toggle('categories')} />
        </Box>
      </Box>

      <Box sx={{ borderTop: `0.5px solid ${colors.border}`, px: '23px', py: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: colors.textStrong }}>Show zero-spend accounts</Typography>
          <Typography sx={{ fontSize: 10, color: colors.textFaint }}>Include customers with $0 revenue this year</Typography>
        </Box>
        <Switch
          checked={draft.showZeroSpend}
          onChange={(e) => setDraft((d) => ({ ...d, showZeroSpend: e.target.checked }))}
          inputProps={{ 'aria-label': 'Show zero-spend accounts' }}
        />
      </Box>

      <Box sx={{ borderTop: `0.5px solid ${colors.border}`, px: '19px', py: '12px', display: 'flex', gap: '12px' }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setDraft(EMPTY_FILTERS)}
          sx={{ height: 42, borderRadius: '10px', color: colors.textStrong, borderColor: colors.border, fontSize: 13 }}
        >
          Clear All
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            onApply(draft);
            onClose();
          }}
          sx={{ height: 42, borderRadius: '10px', fontSize: 13 }}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
}
