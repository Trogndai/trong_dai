import { Box, Button, Typography } from '@mui/material';
import PersonOutline from '@mui/icons-material/PersonOutline';
import Add from '@mui/icons-material/Add';
import { colors } from '../../theme';

export default function ContactsTab() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '14px' }}>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: colors.textStrong, letterSpacing: 0.3 }}>0 CONTACTS</Typography>
        <Button size="small" startIcon={<Add sx={{ fontSize: '15px !important' }} />} sx={{ color: colors.navy, fontSize: 12 }}>
          Add Contact
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: '#fff',
          border: `0.5px solid ${colors.border}`,
          borderRadius: '10px',
          py: 7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <PersonOutline sx={{ fontSize: 38, color: '#c5cad3' }} />
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.textStrong }}>No contacts on record</Typography>
        <Button
          variant="contained"
          startIcon={<Add sx={{ fontSize: '15px !important' }} />}
          sx={{ height: 40, px: 3, borderRadius: '8px', fontSize: 13 }}
        >
          Create Contact
        </Button>
      </Box>
    </Box>
  );
}
