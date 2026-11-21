import { Badge, Box, IconButton, Tooltip, Typography } from '@mui/material';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import { colors } from '../theme';

export default function AppHeader({ title = 'Customer', hasActiveFilters, onOpenFilters }) {
  return (
    <Box
      component="header"
      sx={{
        height: 50,
        flexShrink: 0,
        bgcolor: '#fff',
        borderBottom: `0.6px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
      }}
    >
      <Typography sx={{ fontSize: 15, fontWeight: 700, color: colors.navy }}>{title}</Typography>
      <Tooltip title="Filter customers">
        <IconButton onClick={onOpenFilters} aria-label="Filter customers" size="small">
          <Badge color="error" variant="dot" invisible={!hasActiveFilters}>
            <FilterAltOutlined sx={{ color: colors.textMuted }} />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
