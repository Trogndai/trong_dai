import { Box, Tab, Tabs } from '@mui/material';
import { colors } from '../theme';

export const TAB_ITEMS = [
  { value: 'info', label: 'Info' },
  { value: 'activities', label: 'Activities' },
  { value: 'history', label: 'CST History' },
  { value: 'switchsave', label: 'Switch & Save' },
  { value: 'pipeline', label: 'Pipeline', badge: { text: '1', bg: '#84cc16', fg: '#16351e' } },
  { value: 'contacts', label: 'Contacts' },
  { value: 'orders', label: 'Orders' },
  { value: 'categories', label: 'Categories', badge: { text: '5', bg: '#facc15', fg: '#795e0c' } },
];

function TabLabel({ label, badge }) {
  if (!badge) return label;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {label}
      <Box
        component="span"
        sx={{
          width: 17,
          height: 17,
          borderRadius: '50%',
          bgcolor: badge.bg,
          color: badge.fg,
          fontSize: 10,
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {badge.text}
      </Box>
    </Box>
  );
}

export default function CustomerTabs({ value, onChange }) {
  return (
    <Box sx={{ bgcolor: '#fff', borderBottom: `0.5px solid ${colors.border}`, flexShrink: 0 }}>
      <Tabs
        value={value}
        onChange={(_, v) => onChange(v)}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { height: 2, backgroundColor: colors.navy } }}
        sx={{ minHeight: 47, px: '1.5px' }}
      >
        {TAB_ITEMS.map((t) => (
          <Tab
            key={t.value}
            value={t.value}
            label={<TabLabel label={t.label} badge={t.badge} />}
            disableRipple
            sx={{ pl: '16.5px', pr: t.badge ? '7.5px' : '16.5px' }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
