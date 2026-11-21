import { Chip } from '@mui/material';
import { colors } from '../../theme';

const TONES = {
  red: { bg: colors.redBg, fg: colors.red },
  green: { bg: colors.greenBg, fg: colors.green },
  amber: { bg: colors.amberBg, fg: colors.amber },
  gray: { bg: '#f3f4f6', fg: colors.textBody },
  lightGray: { bg: colors.panelHeader, fg: colors.textBody },
  doneGreen: { bg: '#f0fdf4', fg: '#397b45' },
  yellowAmber: { bg: '#fff2f3', fg: colors.red },
};

// Pill nhỏ dùng cho các nhãn: "No call 596d", "▼ 47% LY", "At risk", "Done"...
export default function Pill({ tone = 'gray', height = 16, fontSize = 9.5, bold = true, children, sx }) {
  const t = TONES[tone] || TONES.gray;
  return (
    <Chip
      size="small"
      label={children}
      sx={{
        height,
        borderRadius: `${height / 2}px`,
        bgcolor: t.bg,
        color: t.fg,
        fontSize,
        fontWeight: bold ? 700 : 500,
        '& .MuiChip-label': { px: '6px', py: 0 },
        ...sx,
      }}
    />
  );
}
