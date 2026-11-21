export function fmtCompact(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${Math.round(n / 1e3)}k`;
  return `$${Math.round(n)}`;
}

export function fmtMoney(n) {
  return `$${Number(n).toFixed(2)}`;
}

export function fmtDaysAgo(days) {
  if (days == null) return '—';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${(days / 365).toFixed(1)}yr ago`;
}

export function deltaFromRatio(ratio) {
  return Math.round(ratio - 100);
}

export function toneForDelta(delta) {
  if (delta >= 0) return 'green';
  if (delta > -25) return 'amber';
  return 'red';
}
