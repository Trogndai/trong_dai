import { Box, Collapse, IconButton, LinearProgress, Link, Typography } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import MailOutline from '@mui/icons-material/MailOutline';
import Add from '@mui/icons-material/Add';
import LightbulbOutlined from '@mui/icons-material/LightbulbOutlined';
import HealthRing from './common/HealthRing';
import Pill from './common/Pill';
import useToggle from '../hooks/useToggle';
import { colors } from '../theme';
import { HEALTH_BANDS, getHealthBand } from '../utils/health';
import { fmtCompact, fmtDaysAgo } from '../utils/format';

const ACTION_BUTTON_SX = {
  width: 36,
  height: 36,
  color: '#fff',
  bgcolor: colors.navy,
  '&:hover': { bgcolor: '#14293f' },
};

function ProgressRow({ label, value }) {
  const good = value >= 100;
  const color = good ? colors.greenBar : colors.redBar;
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '70px minmax(0, 1fr) 47px', alignItems: 'center', columnGap: 0, height: 19 }}>
      <Typography sx={{ fontSize: 10.5, color: colors.textBody }}>{label}</Typography>
      <LinearProgress
        variant="determinate"
        value={Math.min(100, Math.max(0, value))}
        sx={{
          height: 7,
          borderRadius: '4px',
          bgcolor: '#f3f4f6',
          '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: '4px' },
        }}
      />
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, color, textAlign: 'right' }}>
        {Number.isInteger(value) ? value : value.toFixed(1)}%
      </Typography>
    </Box>
  );
}

function ScoreBreakdown({ customer }) {
  const band = getHealthBand(customer.score);
  const rows = [
    { label: 'Last contact', value: fmtDaysAgo(customer.noCallDays), delta: customer.noCallDays > 30 ? '-20' : '—', dot: customer.noCallDays > 30 ? '#f59e0b' : '#22c55e' },
    { label: 'Rev vs LY', value: `${Math.round(customer.vsLy)}%`, delta: '—', dot: customer.vsLy >= 100 ? '#22c55e' : '#ef4444' },
    { label: 'vs Budget', value: `${Math.round(customer.vsBudget)}%`, delta: '—', dot: customer.vsBudget >= 100 ? '#22c55e' : '#ef4444' },
    { label: 'Sentiment', value: customer.sentiment, delta: '+5', dot: '#22c55e' },
  ];
  return (
    <Box sx={{ mt: '10px', ml: '66px', maxWidth: 520 }}>
      {rows.map((r) => (
        <Box key={r.label} sx={{ display: 'grid', gridTemplateColumns: '14px 140px 1fr auto', alignItems: 'center', height: 20 }}>
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: r.dot }} />
          <Typography sx={{ fontSize: 11.5, color: colors.textBody }}>{r.label}</Typography>
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: colors.textPrimary }}>{r.value}</Typography>
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: r.delta.startsWith('-') ? '#f87171' : r.delta === '—' ? colors.textMuted : colors.green }}>
            {r.delta}
          </Typography>
        </Box>
      ))}
      <Box sx={{ display: 'flex', gap: '8px', mt: '8px' }}>
        {Object.values(HEALTH_BANDS).map((b) => (
          <Box
            key={b.key}
            sx={{
              px: '8px',
              height: 19,
              borderRadius: '10px',
              bgcolor: b.bg,
              color: b.text,
              fontSize: 10,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              outline: b.key === band.key ? `1.5px solid ${b.ring}` : 'none',
            }}
          >
            {b.range} {b.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function MetricCell({ label, children, sx }) {
  return (
    <Box sx={{ pl: '14px', pr: '18px', py: '9px', borderRight: `0.5px solid ${colors.metricDivider}`, minWidth: 0, ...sx }}>
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: colors.textMuted, letterSpacing: 0.2 }}>{label}</Typography>
      {children}
    </Box>
  );
}

function SubStat({ label, value, tone }) {
  const color = tone === 'red' ? '#c53630' : tone === 'green' ? colors.green : colors.textMuted;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        fontSize: 11,
        lineHeight: '15px',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color: colors.textMuted }}>{label}</span>
      <b style={{ color }}>{value}</b>
    </Box>
  );
}

// Ô tài chính (YTD REV / YTD GP): nhãn + số lớn bên trái, 2 dòng vs LY / vs Budget bên phải, không xuống dòng
function FinanceCell({ label, big, bigColor, stats, sx }) {
  return (
    <Box
      sx={{
        pl: '14px',
        pr: '18px',
        py: '9px',
        borderRight: `0.5px solid ${colors.metricDivider}`,
        minWidth: 0,
        display: 'grid',
        gridTemplateColumns: 'minmax(70px, 140px) minmax(0, 1fr)',
        gridTemplateRows: 'auto auto',
        ...sx,
      }}
    >
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: colors.textMuted, letterSpacing: 0.2, lineHeight: '14.5px' }}>
        {label}
      </Typography>
      <Typography
        sx={{ gridRow: 2, fontSize: 20, fontWeight: 700, color: bigColor, lineHeight: '24px', mt: '4px', whiteSpace: 'nowrap' }}
      >
        {big}
      </Typography>
      <Box sx={{ gridColumn: 2, gridRow: '1 / span 2', display: 'flex', flexDirection: 'column', gap: '8px', pt: '3px' }}>
        {stats.map((s) => (
          <SubStat key={s.label} {...s} />
        ))}
      </Box>
    </Box>
  );
}

export default function CustomerProfile({ customer, onBack }) {
  const [showWhy, toggleWhy] = useToggle(false);
  const lastCallOverdue = customer.noCallDays != null && customer.noCallDays > 30;
  const revTone = customer.vsLy >= 100 ? 'green' : 'red';
  const gpVsLy = customer.vsLyGp ?? customer.vsLy;

  return (
    <Box sx={{ bgcolor: '#fff', flexShrink: 0 }}>
      {/* Back link */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', height: 41, px: '18px', borderBottom: `0.5px solid ${colors.border}` }}
      >
        <Link
          component="button"
          type="button"
          underline="none"
          onClick={onBack}
          sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 12, color: colors.textMuted }}
        >
          <ChevronLeft sx={{ fontSize: 14 }} />
          Customers
        </Link>
      </Box>

      {/* Name + actions + ring */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '18px', py: '3px' }}>
        <Typography component="h1" sx={{ fontSize: 16, fontWeight: 700, color: colors.textPrimary }}>
          {customer.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconButton aria-label="Email customer" sx={ACTION_BUTTON_SX}>
            <MailOutline sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton aria-label="Add activity" sx={ACTION_BUTTON_SX}>
            <Add sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            aria-label="Customer insights"
            sx={{ ...ACTION_BUTTON_SX, bgcolor: '#7cbd3c', '&:hover': { bgcolor: '#6aa530' } }}
          >
            <LightbulbOutlined sx={{ fontSize: 16 }} />
          </IconButton>
          <Box sx={{ ml: '26px', mr: '7px', display: 'flex' }}>
            <HealthRing score={customer.score} size={56} scoreSize={22} labelSize={9} />
          </Box>
        </Box>
      </Box>

      {/* Progress rows */}
      <Box sx={{ pl: '84px', pr: '18px', pt: '3px' }}>
        <ProgressRow label="vs Budget" value={customer.vsBudget} />
        <ProgressRow label="vs LY Rev" value={customer.vsLy} />
        <ProgressRow label="vs LY GP" value={gpVsLy} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: '84px', pr: '18px', pt: '5px', pb: '15px' }}>
        <Link
          component="button"
          type="button"
          onClick={toggleWhy}
          underline="always"
          sx={{ fontSize: 11, fontWeight: 700, color: colors.navy }}
        >
          {showWhy ? 'Hide details' : 'Why this score?'}
        </Link>
        {customer.lastOrder && (
          <Typography sx={{ fontSize: 11, color: colors.textMuted }}>Last order {customer.lastOrder}</Typography>
        )}
      </Box>
      <Collapse in={showWhy} unmountOnExit>
        <Box sx={{ pb: '14px', mt: '-6px' }}>
          <ScoreBreakdown customer={customer} />
        </Box>
      </Collapse>

      {/* Metrics strip */}
      <Box
        sx={{
          display: 'grid',
          // Tỉ lệ cột theo Figma: 210 / 210 / 314 / 315 (= 2 : 2 : 3 : 3), luôn 1 hàng
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 2fr) minmax(0, 3fr) minmax(0, 3fr)',
          borderTop: `0.5px solid ${colors.metricDivider}`,
          borderBottom: `0.5px solid ${colors.metricDivider}`,
          minHeight: 66,
        }}
      >
        <MetricCell label="LAST F2F">
          <Typography sx={{ fontSize: 17, fontWeight: 700, color: colors.textMuted, lineHeight: '21px', mt: '8px' }}>—</Typography>
        </MetricCell>
        <MetricCell label="LAST CALL">
          <Typography sx={{ fontSize: 17, fontWeight: 700, color: colors.navy, lineHeight: '21px', mt: '3px' }}>
            {fmtDaysAgo(customer.noCallDays)}
          </Typography>
          {lastCallOverdue && (
            <Typography sx={{ fontSize: 10, fontWeight: 500, color: colors.red, lineHeight: '14px' }}>
              {customer.noCallDays}d overdue
            </Typography>
          )}
        </MetricCell>
        <FinanceCell
          label="YTD REV"
          big={fmtCompact(customer.ytdRev)}
          bigColor={revTone === 'red' ? '#c53630' : colors.green}
          stats={[
            { label: 'vs LY', value: `${Number(customer.vsLy).toFixed(1).replace(/\.0$/, '')}%`, tone: revTone },
            { label: 'vs Budget', value: `${Math.round(customer.vsBudget)}%`, tone: customer.vsBudget >= 100 ? 'green' : 'red' },
          ]}
        />
        <FinanceCell
          label="YTD GP"
          big={customer.ytdGp ? fmtCompact(customer.ytdGp) : '—'}
          bigColor={colors.navy}
          sx={{ borderRight: 'none' }}
          stats={[
            {
              label: 'vs LY',
              value: customer.lyGp ? `${gpVsLy}% · ${fmtCompact(customer.lyGp)} LY` : '—',
              tone: gpVsLy >= 100 ? 'green' : 'red',
            },
            { label: 'vs Budget', value: '—' },
          ]}
        />
      </Box>
    </Box>
  );
}
