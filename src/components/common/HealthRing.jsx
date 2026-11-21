import { Box, Typography } from '@mui/material';
import { getHealthBand } from '../../utils/health';

export default function HealthRing({ score, size = 46, scoreSize = 17, labelSize = 8 }) {
  const band = getHealthBand(score);
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        border: `1.5px solid ${band.ring}`,
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}
    >
      <Typography sx={{ fontSize: scoreSize, fontWeight: 700, color: band.text, lineHeight: 1.15 }}>
        {score}
      </Typography>
      <Typography sx={{ fontSize: labelSize, fontWeight: 700, color: band.text, lineHeight: 1.1 }}>
        {band.label}
      </Typography>
    </Box>
  );
}
