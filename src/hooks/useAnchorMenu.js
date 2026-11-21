import { useCallback, useState } from 'react';

// Quản lý menu thả xuống của MUI (Menu cần anchorEl)
export default function useAnchorMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const closeMenu = useCallback(() => setAnchorEl(null), []);
  return { anchorEl, isOpen: Boolean(anchorEl), openMenu, closeMenu };
}
