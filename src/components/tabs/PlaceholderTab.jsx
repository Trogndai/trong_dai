import { Box, Typography } from '@mui/material';
import { colors } from '../../theme';

export default function PlaceholderTab({ title }) {
  return (
    <Box sx={{ bgcolor: '#fff', border: `0.5px solid ${colors.border}`, borderRadius: '10px', p: 5, textAlign: 'center' }}>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: colors.textStrong }}>{title}</Typography>
      <Typography sx={{ fontSize: 12, color: colors.textMuted, mt: 0.5 }}>
        Nothing to show yet.
      </Typography>
    </Box>
  );
}
