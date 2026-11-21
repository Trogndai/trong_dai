import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import AssignmentOutlined from '@mui/icons-material/AssignmentOutlined';
import InsightsOutlined from '@mui/icons-material/InsightsOutlined';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import { colors } from '../theme';

const NAV_ITEMS = [
  { label: 'Home', icon: HomeOutlined },
  { label: 'Pipeline', icon: AccountTreeOutlined },
  { label: 'Customers', icon: PeopleAltOutlined },
  { label: 'Activities', icon: AssignmentOutlined },
  { label: 'Analytics', icon: InsightsOutlined },
  { label: 'Tasks', icon: CheckBoxOutlined },
  { label: 'Near Me', icon: PlaceOutlined },
];

function BrandLogo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: '15px',
        height: 62,
        bgcolor: '#0b1a2c',
        borderBottom: `0.6px solid ${colors.sidebarDivider}`,
      }}
    >
      <Box component="img" src="/logo.png" alt="YESMED" sx={{ height: 33, width: 190, maxWidth: '100%', objectFit: 'contain', display: 'block' }} />
    </Box>
  );
}

export default function Sidebar({ active = 'Customers', onNavigate }) {
  return (
    <Box
      component="nav"
      sx={{
        width: 225,
        flexShrink: 0,
        bgcolor: colors.sidebar,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BrandLogo />
      <List sx={{ px: '10px', pt: '16px' }}>
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const selected = label === active;
          return (
            <ListItemButton
              key={label}
              selected={selected}
              onClick={() => onNavigate?.(label)}
              sx={{
                position: 'relative',
                height: 40,
                borderRadius: '8px',
                px: '14px',
                color: selected ? colors.sidebarActiveText : colors.sidebarText,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                '&.Mui-selected': {
                  bgcolor: colors.sidebarActiveBg,
                  '&:hover': { bgcolor: colors.sidebarActiveBg },
                },
                '&.Mui-selected::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  borderRadius: '2px',
                  bgcolor: colors.brandGreen,
                },
                mb: '0px',
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
                <Icon sx={{ fontSize: 17 }} />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: 13, color: 'inherit' }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
