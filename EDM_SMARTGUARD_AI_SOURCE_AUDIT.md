# EDM SMARTGUARD AI — SOURCE CODE & ARCHITECTURAL AUDIT
**Tài liệu Thẩm định Kiến trúc & Mã nguồn Hệ thống Tri thức Kỹ thuật**

---

## 1. THÔNG TIN MÔI TRƯỜNG & PHIÊN BẢN CÔNG NGHỆ

- **Framework:** React 19.0.1 (Single Page Application trên nền Vite 8.3.0)
- **Styling Engine:** Tailwind CSS v4.3.3 (`@import "tailwindcss";`, `@tailwindcss/vite`)
- **Icon System:** Lucide React (`^0.546.0`)
- **Data Visualization Engine:** D3.js (`^7.9.0`, `@types/d3`) cho các biểu đồ Donut, Dual-Axis Spline, Linear Scale Bars, Arc Gauges & Sparklines
- **Animation & Motion:** Motion (`^12.23.24`)
- **Type Checking:** TypeScript 7.0.2 (`tsc --noEmit`)
- **Backend / Server:** Express 4.21.2 (`server.ts` full-stack ready), `@google/genai` 2.4.0
- **View Target Reference:** 1536 × 864 px (Chuẩn màn hình máy trạm công nghiệp xưởng máy)

---

## 2. HIỆN TRẠNG MÔ HÌNH VÀ CÁC MÀN HÌNH ĐÃ TỒN TẠI

Hệ thống trước khi nâng cấp đã hoàn thành khung dựng giao diện cho phân hệ **Xử lý sự cố** (Incident Troubleshooting). Các thành phần hiện có bao gồm:
- `src/components/Header.tsx`: Thanh điều hướng đen tối với bộ tìm kiếm trung tâm, trạng thái LIVE, thông báo và hồ sơ người dùng.
- `src/components/Sidebar.tsx`: Thanh menu 9 mục phân hệ kèm hình ảnh máy cắt dây EDM chiếu đèn neon xanh.
- `src/components/HeroBanner.tsx`: Banner xanh đậm với hiệu ứng tia lửa EDM và 4 thẻ KPI.
- `src/components/CategoryBar.tsx`: Hàng nút lọc EDM, CNC, Robot, Phụ trợ và nút thêm ca sự cố.
- `src/components/FilterPanel.tsx`: Bộ lọc 6 trường (Từ khóa, Hãng, Model, Mã lỗi, Hiện tượng, Trạng thái).
- `src/components/IncidentList.tsx`: Danh sách ca lỗi với thẻ ảnh và số liệu tương tác.
- `src/components/IncidentDetail.tsx`: Chi tiết ca lỗi E210 với ảnh chụp Spindle, màn hình HMI và sơ đồ 5 bước khắc phục.
- `src/components/RightSidebar.tsx`: Widget người đóng góp, 3 tài liệu PDF đính kèm và ca sự cố tương tự.
- `src/components/NewIncidentModal.tsx`: Hộp thoại tạo mới ca sự cố.

---

## 3. CÁC PHÂN HỆ CẦN HOÀN THIỆN THEO ĐẶC TẢ MASTER (PHASE 2 & 3)

Hệ thống được mở rộng thành một Nền tảng Tri thức Toàn diện với 8 phân hệ cốt lõi:

| Phân hệ (Module) | Đường dẫn / View ID | Trạng thái thẩm định | Nhiệm vụ nâng cấp |
| :--- | :--- | :--- | :--- |
| **1. Tổng hợp tri thức (Knowledge Analytics)** | `analytics` / `/analytics` | Cần triển khai mới theo Ảnh 3 | Biểu đồ cơ cấu tri thức, xu hướng 6 tháng, Bản đồ tri thức (Knowledge Map), AI tổng hợp & gợi ý |
| **2. Thư viện tài liệu kỹ thuật (Document Library)** | `docs` / `/documents` | Cần triển khai mới | Phân loại Manual, SOP, Sơ đồ điện, Bản vẽ kỹ thuật, viewer tài liệu, tải về và bộ lọc đa chiều |
| **3. Xử lý sự cố (Incident Troubleshooting)** | `incidents` / `/troubleshooting` | Đã có nền tảng (Ảnh 1) | Hoàn thiện liên kết dữ liệu, chuyển đổi ca lỗi tương tự, tích hợp quyền phê duyệt |
| **4. Cải tiến kỹ thuật (Technical Improvement)** | `improvement` / `/improvements` | Cần triển khai mới theo Ảnh 2 | So sánh ảnh Trước/Sau (Before/After), 3 chỉ số KPI định lượng, đội ngũ thực hiện, tài liệu kiểm chứng |
| **5. Cộng đồng kỹ thuật (Technical Community)** | `community` / `/community` | Cần triển khai mới theo Ảnh 4 | Diễn đàn hỏi đáp, phân loại chủ đề, đánh dấu giải pháp được chấp nhận, vinh danh chuyên gia |
| **6. Đóng góp & Xếp hạng (Ranking & Gamification)** | `contributions` / `/ranking` | Cần triển khai mới theo Ảnh 7 | BXH cá nhân, BXH 7 Vendor (KHV, KTECH, HSTEC, DREAM TECH, HOJEONGB, HOJEONG VINA, DAAL), điểm thưởng |
| **7. Phê duyệt nội dung (Content Approval)** | `approval` / `/approval` | Cần triển khai mới theo Ảnh 6 | Hàng đợi 56 bài chờ duyệt, checklist chất lượng 4 tiêu chí, nút Duyệt & Xuất bản, Yêu cầu sửa, Từ chối |
| **8. Tìm kiếm AI (AI Knowledge Search)** | `ai-search` / `/ai-search` | Cần triển khai mới theo Ảnh 5 | Tìm kiếm ngôn ngữ tự nhiên, tổng hợp 8 nguồn tri thức đã duyệt, quy trình 5 bước, lưu ý an toàn |
| **9. Chế độ Hiện trường Di động (Mobile Field Mode)** | `mobile` / `/mobile/troubleshoot-e210` | Cần bổ sung | Chế độ thao tác 1 tay trực tiếp tại sàn máy, checklist bước thực hiện, quét QR code và cứu hộ khẩn cấp |

---

## 4. TỔ CHỨC DỮ LIỆU & QUẢN TRỊ PHÂN QUYỀN (RBAC)

1. **Phân quyền người dùng (Role-Based Access Control):**
   - `Administrator` (Quản trị viên hệ thống): Toàn quyền cấu hình, phê duyệt và điều chỉnh điểm.
   - `Knowledge Manager` (Quản lý tri thức): Kiểm duyệt nội dung, xuất bản tri thức, quản lý danh mục.
   - `Technical Expert` (Chuyên gia kỹ thuật): Thẩm định chuyên sâu, chấm điểm sáng kiến, trả lời diễn đàn.
   - `Technician` (Kỹ thuật viên sàn xưởng): Đăng bài sự cố, đề xuất cải tiến, thảo luận, theo dõi quy trình.
   - `Viewer` (Người xem): Tra cứu tài liệu, xem hướng dẫn xử lý.

2. **Dữ liệu 7 Vendor kỹ thuật được hỗ trợ:**
   - KHV
   - DREAM TECH
   - HSTEC
   - KTECH
   - HOJEONGB
   - HOJEONG VINA
   - DAAL

3. **Nguyên tắc dữ liệu xác thực (Evidence-based):**
   - Chỉ các tri thức đã qua bước thẩm định và phê duyệt mới được gắn cờ `VERIFIED` và đưa vào kho tìm kiếm AI.
   - Dữ liệu demo được tách bạch rõ ràng thông qua tầng truy xuất dữ liệu `src/data/mockData.ts` sẵn sàng thay thế bằng API thực tế.
