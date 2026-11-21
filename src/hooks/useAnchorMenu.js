import { useCallback, useState } from 'react';

export default function useAnchorMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const closeMenu = useCallback(() => setAnchorEl(null), []);
  return { anchorEl, isOpen: Boolean(anchorEl), openMenu, closeMenu };
}
