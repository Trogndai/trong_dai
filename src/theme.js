import { createTheme } from '@mui/material/styles';

export const colors = {
  navy: '#1d3b59',
  sidebar: '#102438',
  sidebarDivider: '#294052',
  sidebarText: '#e3e9f0',
  sidebarActiveBg: '#294735',
  sidebarActiveText: '#a3d56c',
  brandGreen: '#80c13d',
  pageBg: '#f1f2f6',
  panelHeader: '#f8f9fb',
  selectedRow: '#f0f7ff',
  border: '#e5e7eb',
  divider: '#eceef1',
  metricDivider: '#e8ebef',
  textPrimary: '#151c2b',
  textStrong: '#374151',
  textBody: '#4b5563',
  textMuted: '#687587',
  textFaint: '#87909e',
  red: '#bc2327',
  redText: '#991b1b',
  redBg: '#fff3f3',
  redBar: '#f87171',
  green: '#188241',
  greenBg: '#effcf3',
  greenBar: '#4ade80',
  amber: '#a85c09',
  amberBg: '#fff4c8',
};

export const theme = createTheme({
  palette: {
    primary: { main: colors.navy },
    error: { main: colors.red },
    success: { main: colors.green },
    background: { default: colors.pageBg, paper: '#ffffff' },
    text: { primary: colors.textPrimary, secondary: colors.textMuted },
    divider: colors.border,
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: 0,
          minHeight: 47,
          fontSize: 12.5,
          fontWeight: 400,
          color: colors.textStrong,
          '&.Mui-selected': { fontWeight: 700, color: colors.navy },
        },
      },
    },
  },
});
