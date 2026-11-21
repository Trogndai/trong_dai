import { useCallback, useMemo, useState } from 'react';
import { EMPTY_FILTERS, FILTER_OPTIONS, QUICK_FILTERS } from '../data/mockData';

const CURRENT_USER = 'Wade Degnan';

const COMPARATORS = {
  urgency: (a, b) => a.score - b.score,
  ytdRev: (a, b) => b.ytdRev - a.ytdRev,
  score: (a, b) => b.score - a.score,
  name: (a, b) => a.name.localeCompare(b.name),
};

function matchesDrawerFilters(c, f) {
  if (f.myCustomers && c.rep !== CURRENT_USER) return false;
  if (f.salesReps.length && !f.salesReps.includes(c.rep)) return false;
  if (f.channels.length && !f.channels.includes(c.channel)) return false;
  if (f.sizes.length) {
    const tests = FILTER_OPTIONS.sizes.filter((s) => f.sizes.includes(s.key));
    if (!tests.some((s) => s.test(c))) return false;
  }
  if (f.sentiments.length && !f.sentiments.includes(c.sentiment)) return false;
  if (f.categories.length && !f.categories.includes(c.category)) return false;
  if (!f.showZeroSpend && c.ytdRev <= 0) return false;
  return true;
}

function hasActiveDrawerFilters(f) {
  return (
    f.myCustomers ||
    f.salesReps.length > 0 ||
    f.channels.length > 0 ||
    f.sizes.length > 0 ||
    f.sentiments.length > 0 ||
    f.categories.length > 0 ||
    f.showZeroSpend
  );
}

export default function useCustomerFilters(customers, { initialChips = ['aboveBdg'] } = {}) {
  const [search, setSearch] = useState('');
  const [activeChips, setActiveChips] = useState(initialChips); // mặc định giống trạng thái trong Figma
  const [sortKey, setSortKey] = useState('urgency');
  const [sortDir, setSortDir] = useState('desc');
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const toggleChip = useCallback(
    (key) => setActiveChips((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key])),
    [],
  );
  const toggleSortDir = useCallback(() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc')), []);

  const visibleCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();
    const chipTests = QUICK_FILTERS.filter((f) => activeChips.includes(f.key));
    const list = customers.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q) && !c.code.toLowerCase().includes(q)) return false;
      if (!chipTests.every((f) => f.test(c))) return false;
      return matchesDrawerFilters(c, filters);
    });
    const sorted = [...list].sort(COMPARATORS[sortKey]);
    return sortDir === 'asc' ? sorted.reverse() : sorted;
  }, [customers, search, activeChips, filters, sortKey, sortDir]);

  const hasActiveFilters = hasActiveDrawerFilters(filters) || activeChips.length > 0;

  return {
    visibleCustomers,
    hasActiveFilters,
    search,
    setSearch,
    activeChips,
    toggleChip,
    sortKey,
    setSortKey,
    sortDir,
    toggleSortDir,
    filters,
    setFilters,
  };
}
