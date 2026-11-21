import { Box, Typography } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { colors } from '../../theme';
import { switchSaveByCustomer } from '../../data/mockData';
import { fmtMoney } from '../../utils/format';

function SummaryBanner({ summary }) {
  const stats = [
    { value: `$${summary.customerSaving}`, label: 'Customer saving/mo' },
    { value: `$${summary.gpUplift}`, label: 'GP uplift/mo' },
    { value: String(summary.switchableLines), label: 'Switchable lines' },
  ];
  return (
    <Box
      sx={{
        borderRadius: '10px',
        background: 'linear-gradient(90deg, #7bc143 0%, #16a34a 100%)',
        p: '12px 14px 10px',
        color: colors.navy,
      }}
    >
      <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>SWITCH &amp; SAVE OPPORTUNITY</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', mt: '4px' }}>
        {stats.map((s, i) => (
          <Box
            key={s.label}
            sx={{
              textAlign: 'center',
              borderLeft: i === 0 ? 'none' : '0.7px solid rgba(255,255,255,0.45)',
              py: '2px',
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: '24px', color: '#14293f' }}>{s.value}</Typography>
            <Typography sx={{ fontSize: 10, color: '#14293f', mt: '4px' }}>{s.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function SwitchLine({ line }) {
  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '10px', p: '12px 16px 12px' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', alignItems: 'start' }}>
        <Box>
          <Typography sx={{ fontSize: 9.5, fontWeight: 700, color: colors.textMuted }}>CURRENT</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: colors.textPrimary, mt: '4px', lineHeight: '16px' }}>
            {line.current}
          </Typography>
          <Typography sx={{ fontSize: 10.5, color: colors.textMuted, mt: '6px' }}>
            Qty {line.qty} · {fmtMoney(line.unit)}/unit
          </Typography>
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: colors.textPrimary, mt: '4px' }}>
            Total {fmtMoney(line.total)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: '14px' }}>
          <ArrowForward sx={{ fontSize: 14, color: '#84cc16' }} />
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: 9.5, fontWeight: 700, color: '#4d7c0f' }}>SWITCH &amp; SAVE</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: colors.textPrimary, mt: '4px', lineHeight: '16px' }}>
            {line.target}
          </Typography>
          <Typography sx={{ fontSize: 10.5, color: colors.textMuted, mt: '6px' }}>{fmtMoney(line.targetUnit)}/unit</Typography>
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: colors.textPrimary, mt: '4px' }}>
            Total {fmtMoney(line.targetTotal)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', mt: '14px' }}>
        <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '4px', height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#166534' }}>
            Customer saves {fmtMoney(line.customerSaves)}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: '#f3f4f6', borderRadius: '4px', height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: colors.navy }}>YES GP +{fmtMoney(line.gp)}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function SwitchSaveTab({ customer }) {
  const data = switchSaveByCustomer[customer.id];
  if (!data) {
    return (
      <Box sx={{ bgcolor: '#fff', borderRadius: '10px', p: 4, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 13, color: colors.textMuted }}>No switch &amp; save opportunities for this customer.</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <SummaryBanner summary={data.summary} />
      {data.lines.map((line) => (
        <SwitchLine key={line.id} line={line} />
      ))}
    </Box>
  );
}
