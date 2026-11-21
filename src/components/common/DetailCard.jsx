import { Box, Typography } from '@mui/material';
import { colors } from '../../theme';

export default function DetailCard({ title, rows }) {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: `0.6px solid ${colors.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          bgcolor: colors.panelHeader,
          height: 44,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: `0.5px solid ${colors.divider}`,
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: colors.textStrong, letterSpacing: 0.2 }}>
          {title}
        </Typography>
      </Box>
      {rows.map((row, i) => (
        <Box
          key={row.label}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            minHeight: 42,
            px: 2,
            py: '12px',
            borderTop: i === 0 ? 'none' : `0.5px solid ${colors.divider}`,
          }}
        >
          <Typography sx={{ width: 144, flexShrink: 0, fontSize: 11.5, color: colors.textBody, lineHeight: '18px' }}>
            {row.label}
          </Typography>
          <Box sx={{ fontSize: 12, color: colors.textPrimary, lineHeight: '18px', wordBreak: 'break-word' }}>
            {Array.isArray(row.value)
              ? row.value.map((line) => <div key={line}>{line}</div>)
              : row.value}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
