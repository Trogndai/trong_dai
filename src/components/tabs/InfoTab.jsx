import { Box, Collapse, IconButton, Typography } from '@mui/material';
import AssignmentOutlined from '@mui/icons-material/AssignmentOutlined';
import Add from '@mui/icons-material/Add';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import DetailCard from '../common/DetailCard';
import { colors } from '../../theme';
import { getCustomerDetail } from '../../data/mockData';
import useToggle from '../../hooks/useToggle';
import { fmtMoney } from '../../utils/format';

function TasksSummary() {
  const [open, toggleOpen] = useToggle(false);
  return (
    <Box sx={{ bgcolor: '#fff', border: `0.5px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', height: 50, px: '16px', gap: '10px' }}>
        <AssignmentOutlined sx={{ fontSize: 16, color: colors.textStrong }} />
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: colors.textStrong }}>Tasks</Typography>
        <Typography sx={{ fontSize: 12, color: colors.textMuted }}>All clear</Typography>
        <Box sx={{ flex: 1 }} />
        <IconButton
          aria-label="Add task"
          size="small"
          sx={{ width: 24, height: 24, bgcolor: colors.navy, color: '#fff', '&:hover': { bgcolor: '#14293f' } }}
        >
          <Add sx={{ fontSize: 14 }} />
        </IconButton>
        <IconButton
          aria-label={open ? 'Collapse tasks' : 'Expand tasks'}
          size="small"
          onClick={toggleOpen}
          sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}
        >
          <KeyboardArrowDown sx={{ fontSize: 16, color: colors.textFaint }} />
        </IconButton>
      </Box>
      <Collapse in={open} unmountOnExit>
        <Typography sx={{ px: 2, py: 1.5, fontSize: 12, color: colors.textMuted, borderTop: `0.5px solid ${colors.divider}` }}>
          No open tasks for this customer.
        </Typography>
      </Collapse>
    </Box>
  );
}

export default function InfoTab({ customer }) {
  const d = getCustomerDetail(customer);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TasksSummary />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px', alignItems: 'start' }}>
        <DetailCard
          title="ACCOUNT DETAILS"
          rows={[
            { label: 'Account No', value: d.accountNo },
            { label: 'Lead Source', value: d.leadSource },
            { label: 'Category', value: d.category },
            { label: 'Account', value: d.account },
            { label: 'Grade', value: d.grade },
            { label: 'Professionals', value: d.professionals },
          ]}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <DetailCard
            title="CONTACT"
            rows={[
              { label: 'Email', value: d.email },
              { label: 'Website', value: d.website },
              { label: 'Address', value: d.address },
            ]}
          />
          <DetailCard
            title="SALES"
            rows={[
              { label: 'Sales Executive', value: d.salesExecutive },
              { label: 'Territory', value: d.territory },
              { label: 'Revenue YTD', value: fmtMoney(customer.ytdRev) },
              { label: 'Revenue LY', value: customer.lyRev ? fmtMoney(customer.lyRev) : '—' },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
}
