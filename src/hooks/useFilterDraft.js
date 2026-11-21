import { useCallback, useEffect, useState } from 'react';

export default function useFilterDraft(open, appliedFilters) {
  const [draft, setDraft] = useState(appliedFilters);

  useEffect(() => {
    if (open) setDraft(appliedFilters);
  }, [open, appliedFilters]);

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
