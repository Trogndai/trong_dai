import { useCallback, useState } from 'react';

// Trạng thái bật/tắt: mở rộng/thu gọn, mở/đóng drawer...
// Trả về [giá trị, toggle, set]. Các hàm trả về có tham chiếu ổn định.
export default function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
}
