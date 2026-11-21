import { useCallback, useMemo, useState } from 'react';

// Khách hàng đang chọn + tab đang mở. Chọn khách hàng mới thì quay về tab Info.
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
