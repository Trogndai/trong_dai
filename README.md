# YESMED CRM – Customer (Desktop)

UI màn hình **Customer desktop** dựng bằng React 18 + Material UI (MUI v6) + Vite, theo file Figma "Yes Group CRM"
(frame `YESMED · Desktop customer workspace`, `Desktop customer activities`, `Desktop Switch & Save`, `Desktop customer filters`).

## Chạy thử

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Cấu trúc

```
src/
  theme.js                  design tokens + MUI theme (màu, font Roboto)
  App.jsx                   layout 3 cột + state (chọn khách hàng, tab, lọc, sắp xếp)
  data/mockData.js          dữ liệu mẫu lấy từ Figma (Allsports, 11 khách hàng, activities, switch & save)
  hooks/                    custom hooks: useCustomerFilters, useCustomerSelection, useToggle, useAnchorMenu, useFilterDraft
  utils/                    format tiền/ngày, thang điểm Health
  components/
    Sidebar.jsx             menu trái (Home, Pipeline, Customers, Activities, Analytics, Tasks, Near Me)
    AppHeader.jsx           thanh tiêu đề + nút Filter
    CustomerDirectory.jsx   danh sách khách hàng: search, chip lọc nhanh, sắp xếp, thu gọn
    CustomerRow.jsx         1 dòng khách hàng (Health ring, doanh thu, pill LY / budget / No call)
    CustomerProfile.jsx     header khách hàng: tên, nút hành động, thanh vs Budget/LY, metrics
    CustomerTabs.jsx        Info · Activities · CST History · Switch & Save · Pipeline · Contacts · Orders · Categories
    FilterDrawer.jsx        drawer "Filter Customers"
    tabs/                   InfoTab, ActivitiesTab, SwitchSaveTab, ContactsTab, PlaceholderTab
    common/                 Pill, HealthRing, DetailCard
```

## Tương tác đã làm

- Chọn khách hàng ở danh sách → hồ sơ bên phải cập nhật.
- Tìm kiếm theo tên/mã, chip lọc nhanh (Call due, Rev drop, At risk, Below/Above bdg, Lapsed).
- Sắp xếp (Urgency, YTD Rev, Health, Name) + đảo chiều; thu gọn/mở rộng danh sách.
- "Why this score?" mở bảng phân tích điểm Health.
- Chuyển tab Info / Activities / Switch & Save / Contacts.
- Drawer Filter Customers (Sales Rep, Channel, Size, Sentiment, Category, zero-spend) – Apply / Clear All.

## Lưu ý

- **Logo**: đang dùng logo tạm bằng SVG/text trong `Sidebar.jsx`. Xuất logo thật từ Figma (layer "YESMED CRM logo") rồi thay vào.
- Tab CST History, Pipeline, Orders, Categories chưa có thiết kế desktop trong Figma nên để placeholder.
- Dữ liệu của các khách hàng ngoài Allsports (email, website, địa chỉ…) là mock sinh tự động.
- Thiết kế mobile (danh sách, Near Me, Call queue, Sales order…) chưa được chuyển sang code ở bản này.
