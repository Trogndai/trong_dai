export const HEALTH_BANDS = {
  atRisk: { key: 'atRisk', label: 'At Risk', range: '0–25', text: '#991b1b', main: '#bc2327', ring: '#f5a9ac', bg: '#fff1f2' },
  fair: { key: 'fair', label: 'Fair', range: '26–50', text: '#9a3412', main: '#c2410c', ring: '#fdba74', bg: '#fff7ed' },
  good: { key: 'good', label: 'Good', range: '51–75', text: '#a16207', main: '#a16207', ring: '#fde047', bg: '#fefce8' },
  excellent: { key: 'excellent', label: 'Excellent', range: '76–100', text: '#15803d', main: '#16a34a', ring: '#86efac', bg: '#f0fdf4' },
};

export function getHealthBand(score) {
  if (score <= 25) return HEALTH_BANDS.atRisk;
  if (score <= 50) return HEALTH_BANDS.fair;
  if (score <= 75) return HEALTH_BANDS.good;
  return HEALTH_BANDS.excellent;
}
