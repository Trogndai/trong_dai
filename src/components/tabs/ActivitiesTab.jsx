import { Box, Typography } from '@mui/material';
import EventNoteOutlined from '@mui/icons-material/EventNoteOutlined';
import MailOutline from '@mui/icons-material/MailOutline';
import Pill from '../common/Pill';
import { colors } from '../../theme';
import { activitiesByCustomer } from '../../data/mockData';

const TYPE_STYLE = {
  Appointment: { circle: '#f3f4f6', icon: colors.textMuted, tagBg: '#f3f4f6', tagFg: colors.textBody, Icon: EventNoteOutlined },
  Email: { circle: '#dcfce7', icon: '#16a34a', tagBg: '#dcfce7', tagFg: '#15803d', Icon: MailOutline },
};

function ActivityCard({ activity }) {
  const s = TYPE_STYLE[activity.type] || TYPE_STYLE.Appointment;
  const Icon = s.Icon;
  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '10px', p: '17px 18px 14px 16px', display: 'flex', gap: '14px', position: 'relative' }}>
      <Box
        sx={{
          width: 34,
          height: 34,
          flexShrink: 0,
          borderRadius: '50%',
          bgcolor: s.circle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon sx={{ fontSize: 16, color: s.icon }} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box
            component="span"
            sx={{
              px: '10px',
              height: 17,
              borderRadius: '9px',
              bgcolor: s.tagBg,
              color: s.tagFg,
              fontSize: 9.5,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {activity.type}
          </Box>
          <Pill tone="lightGray" height={18} fontSize={9.5} bold={false}>
            {activity.date}
          </Pill>
        </Box>

        <Typography sx={{ fontSize: 14, fontWeight: 500, color: colors.textPrimary, mt: '9px', lineHeight: '18px' }}>
          {activity.customer}
        </Typography>
        <Typography sx={{ fontSize: 10.5, color: colors.textBody, mt: '4px', lineHeight: '14.5px' }}>
          {activity.outcome}
        </Typography>
        {activity.lines.map((line) => (
          <Typography key={line} sx={{ fontSize: 11.5, color: colors.textStrong, mt: '5px', lineHeight: '16px' }}>
            {line}
          </Typography>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px' }}>
          <Typography sx={{ fontSize: 10.5, color: colors.textBody }}>{activity.user}</Typography>
          <Pill tone="doneGreen" height={18} fontSize={10.5} bold={false} sx={{ fontWeight: 500 }}>
            {activity.status}
          </Pill>
        </Box>
      </Box>
    </Box>
  );
}

export default function ActivitiesTab({ customer }) {
  const items = activitiesByCustomer[customer.id] || [];
  if (items.length === 0) {
    return (
      <Box sx={{ bgcolor: '#fff', borderRadius: '10px', p: 4, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 13, color: colors.textMuted }}>No activities recorded for this customer.</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((a) => (
        <ActivityCard key={a.id} activity={a} />
      ))}
    </Box>
  );
}
