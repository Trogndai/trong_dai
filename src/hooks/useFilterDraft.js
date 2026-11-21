import { useCallback, useEffect, useState } from 'react';

// Bản nháp bộ lọc trong drawer: chỉ áp dụng khi bấm "Apply Filters".
// Mỗi lần mở drawer, đồng bộ lại với bộ lọc đang áp dụng.
export default function useFilterDraft(open, appliedFilters) {
  const [draft, setDraft] = useState(appliedFilters);

  useEffect(() => {
    if (open) setDraft(appliedFilters);
  }, [open, appliedFilters]);

  // Bật/tắt một giá trị trong nhóm checkbox: toggle('channels')('Dental')
  const toggle = useCallback(
    (field) => (value) =>
      setDraft((d) => ({
        ...d,
        [field]: d[field].includes(value) ? d[field].filter((v) => v !== value) : [...d[field], value],
      })),
    [],
  );

  return { draft, setDraft, toggle };
}
