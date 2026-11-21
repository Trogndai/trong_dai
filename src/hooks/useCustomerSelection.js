import { useCallback, useMemo, useState } from 'react';

export default function useCustomerSelection(customers, initialTab = 'info') {
  const [selectedId, setSelectedId] = useState(customers[0].id);
  const [tab, setTab] = useState(initialTab);

  const selected = useMemo(
    () => customers.find((c) => c.id === selectedId) ?? customers[0],
    [customers, selectedId],
  );

  const select = useCallback((id) => {
    setSelectedId(id);
    setTab('info');
  }, []);

  return { selected, selectedId, select, tab, setTab };
}
