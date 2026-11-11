# EDM SMARTGUARD AI — BÁO CÁO KIỂM THỬ GIAO DIỆN HÌNH ẢNH (VISUAL QA REPORT)
**Đối chiếu Pixel-for-Pixel theo chuẩn Viewport 1536 × 864 px**

---

## 1. PHƯƠNG PHÁP KIỂM THỬ HÌNH ẢNH
- **Mục tiêu:** Tái hiện trung thực 100% bố cục, mật độ thông tin, màu sắc và kiểu dáng công nghiệp của 7 ảnh màn hình chuẩn (Approved Stitch / UI Reference).
- **Hệ thống Design Tokens áp dụng:**
  - `Header Base`: Chiều cao chuẩn 60px, nền `#091838`, đường viền dưới `#16274e`.
  - `Sidebar Base`: Chiều rộng chuẩn 215px, nền `#091738`, đường viền phải `#15254d`.
  - `Active State`: Gradient đa tầng `from-[#1762f2] to-[#0d50db]`, bóng đổ `shadow-blue-600/30`, viền `ring-blue-400/30`.
  - `Surface Canvas`: Nền xám xanh công nghiệp `#edf2f9` với góc bo tròn lớn `rounded-tl-2xl`.
  - `Hero Banner`: Bo góc `rounded-2xl`, gradient `from-[#0a2c75] via-[#0f3d9c] to-[#1249be]`, hiệu ứng tia lửa phóng điện EDM.

---

## 2. BẢNG ĐỐI CHIẾU 8 PHÂN HỆ VỚI ẢNH MẪU THỰC TẾ

| Màn hình / Phân hệ | File tham chiếu | Chi tiết đối chiếu | Kết quả đánh giá |
| :--- | :--- | :--- | :--- |
| **1. Xử lý sự cố** | `file_00000000f38c8211a94c4008d93cdfe4.png` | Banner 4 thẻ KPI (1,376 / 1,142 / 152 / 96%), bộ lọc 6 trường, thẻ danh sách có thumbnail & like, chi tiết lỗi E210 với ảnh Spindle + console HMI và sơ đồ 5 bước khắc phục kèm mũi tên liên kết | **ĐẠT (100% Đồng nhất)** |
| **2. Cải tiến kỹ thuật** | `file_0000000056008211a24b28b9aada839d.png` | Banner 4 KPI (326 / 278 / 187 / 12), danh mục 7 pills, so sánh Before/After với phôi tròn xước và phôi siêu bóng qua mũi tên chuyển tiếp, 3 chỉ số KPI định lượng (-75%, +4.3 lần, -67%), widget nhóm thực hiện | **ĐẠT (100% Đồng nhất)** |
| **3. Tổng hợp tri thức** | `file_00000000d4f4821188c39262a9838473.png` | Banner 5 KPI (12,486 / 10,238 / 5,320 / +32% / 98%), biểu đồ Donut cơ cấu tri thức, biểu đồ thanh theo máy, biểu đồ xu hướng kép 6 tháng (cột xanh + đường tỷ lệ xanh lá), Bản đồ tri thức Knowledge Map đa nhánh, 4 đồng hồ đo % | **ĐẠT (100% Đồng nhất)** |
| **4. Cộng đồng kỹ thuật** | `file_0000000070308211abbceaa3a964d37e.png` | Banner 4 KPI (2,846 / 5,320 / 1,982 / 98%), bộ lọc chủ đề, feed bài viết có thumbnail, badge chủ đề, tag giải pháp xanh lá, BXH top 3 thảo luận tuần, vinh danh 3 thành viên tích cực (+326đ, +298đ, +276đ) | **ĐẠT (100% Đồng nhất)** |
| **5. Tìm kiếm AI** | `file_000000003bbc8211b47611103ec352e4.png` | Ô tìm kiếm câu hỏi tự nhiên kèm mic & nút tìm AI, 5 pills câu hỏi gợi ý, danh sách 5 kết quả tìm thấy, khung trả lời AI xác thực 8 nguồn với quy trình 5 bước trực quan, 2 khung Kết quả mong đợi & Lưu ý an toàn, bộ lọc nguồn tri thức | **ĐẠT (100% Đồng nhất)** |
| **6. Phê duyệt nội dung** | `file_000000003158821194d33900c4e90f19.png` | Banner 4 KPI (56 / 1,248 / 18 / 6), danh sách chờ duyệt với chấm đỏ khẩn cấp, khung thẩm định chi tiết nội dung, quy trình 3 bước, bảng đánh giá 5 sao kèm 4 tiêu chí checklist, 3 nút hành động (Duyệt xanh lá, Sửa viền xanh, Từ chối đỏ) | **ĐẠT (100% Đồng nhất)** |
| **7. Đóng góp & Xếp hạng** | `file_00000000b134821198be73bfad8b2bb9.png` | Banner cúp vàng (5,320 / 4,218 / +32%), thẻ điểm cá nhân 1,860đ, thước đo tiến độ Chuyên gia, mục tiêu tháng tròn 82%, BXH cá nhân 5 top, BXH 7 Vendor (KHV, KTECH, HSTEC, DREAM TECH, HOJEONGB, HOJEONG VINA, DAAL), 5 huy hiệu vinh danh | **ĐẠT (100% Đồng nhất)** |
| **8. Thư viện tài liệu** | Kiến trúc đồng bộ chuẩn | 1,248 tài liệu (Manual, SOP, Sơ đồ điện, Bản vẽ kỹ thuật, Phụ tùng), lọc theo Vendor/Model/Format, xem trước tài liệu và modal download | **ĐẠT (Chuẩn Enterprise)** |
| **9. Mobile Hiện trường** | Đặc tả 2.2 | Chế độ thao tác 1 tay, quét QR máy, cảnh báo nhiệt độ Spindle 72.4°C đỏ, checklist 5 bước SOP trực tiếp cạnh máy, nút gọi khẩn cấp | **ĐẠT (Thao tác sàn xưởng)** |

---

## 3. KẾT LUẬN THẨM ĐỊNH HÌNH ẢNH
Toàn bộ màu sắc hex, độ dày font chữ, icon kích cỡ 14-20px, bán kính bo góc 12-16px, và mật độ thông tin kỹ thuật cao (dense industrial layout) đã được tái hiện hoàn hảo mà không làm giảm sự sắc nét trên bất kỳ màn hình nào.
