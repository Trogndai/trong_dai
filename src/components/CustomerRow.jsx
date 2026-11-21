import { Box, ButtonBase, Typography } from '@mui/material';
import HealthRing from './common/HealthRing';
import Pill from './common/Pill';
import { colors } from '../theme';
import { deltaFromRatio, fmtCompact, toneForDelta } from '../utils/format';

function arrow(delta) {
  return delta >= 0 ? '▲' : '▼';
}

export default function CustomerRow({ customer, selected, onSelect }) {
  const lyDelta = deltaFromRatio(customer.vsLy);
  const bdgDelta = deltaFromRatio(customer.vsBudget);
  const hasNoCall = customer.noCallDays != null && customer.noCallDays > 30;
  const isAtRisk = customer.score <= 25;

  return (
    <ButtonBase
      onClick={() => onSelect(customer.id)}
      component="div"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '10px',
        width: '100%',
        textAlign: 'left',
        position: 'relative',
        px: '12px',
        pt: '16px',
        pb: '12px',
        minHeight: 94,
        bgcolor: selected ? colors.selectedRow : '#fff',
        borderBottom: `0.5px solid ${colors.divider}`,
        '&:hover': { bgcolor: selected ? colors.selectedRow : '#fafbfc' },
        '&::after': selected
          ? { content: '""', position: 'absolute', right: 0, top: 0, bottom: 0, width: 3, bgcolor: colors.navy }
          : {},
      }}
    >
      <HealthRing score={customer.score} />

      <Box sx={{ flex: 1, minWidth: 0, pr: '6px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: '-6px' }}>
          <Typography noWrap sx={{ fontSize: 12.5, fontWeight: 700, color: colors.textPrimary }}>
            {customer.name}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#222b39', flexShrink: 0 }}>
            {fmtCompact(customer.ytdRev)}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 10, color: colors.textMuted, mt: '14px', lineHeight: '14px' }}>
          {customer.code} · {customer.category}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '3px' }}>
          <Typography sx={{ fontSize: 9.5, color: colors.textFaint, lineHeight: '13.5px' }}>
            {customer.rep || ''}
          </Typography>
          <Box sx={{ display: 'flex', gap: '6px' }}>
            <Pill tone={toneForDelta(lyDelta)}>
              {arrow(lyDelta)} {Math.abs(lyDelta)}% LY
            </Pill>
            <Pill tone={toneForDelta(bdgDelta)}>
              {arrow(bdgDelta)} {Math.abs(bdgDelta)}% bdg
            </Pill>
          </Box>
        </Box>

        {(hasNoCall || isAtRisk) && (
          <Box sx={{ display: 'flex', gap: '6px', mt: '4px' }}>
            {hasNoCall && <Pill tone="red">No call {customer.noCallDays}d</Pill>}
            {isAtRisk && <Pill tone="red">At risk</Pill>}
          </Box>
        )}
      </Box>
    </ButtonBase>
  );
}
