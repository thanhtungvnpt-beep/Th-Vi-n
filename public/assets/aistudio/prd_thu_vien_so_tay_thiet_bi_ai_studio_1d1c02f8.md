# BẢN ĐẶC TẢ KỸ THUẬT & TÀI LIỆU YÊU CẦU PHẦN MỀM (PRD & TECHNICAL SPECIFICATION)
## HỆ THỐNG THƯ VIỆN SỔ TAY THIẾT BỊ SỐ HÓA (MACHINE DIGITAL LOGBOOK LIBRARY)
> **Mục đích:** Tài liệu kỹ thuật chi tiết dành cho Google AI Studio / Gemini / Đội ngũ Kỹ sư Phát triển Phần mềm để lập trình Backend, Frontend, CSDL và tích hợp AI.

---

### 1. TỔNG QUAN HỆ THỐNG (SYSTEM OVERVIEW)
- **Tên dự án:** Thư viện Sổ tay Kỹ thuật & Kho Tri thức Vận hành 600 Thiết bị Nặng (Machine Knowledge Bookshelf & Crowdsourced Maintenance Hub).
- **Mục tiêu cốt lõi:**
  1. Số hóa toàn bộ hồ sơ vận hành, lịch sử sự cố và kinh nghiệm sửa chữa của **hơn 600 máy công nghiệp**.
  2. Áp dụng mô hình trực quan: **Kệ sách gỗ công nghiệp (Digital Bookshelf)**. Mỗi cuốn sách là một mã máy cụ thể.
  3. Cấu trúc nội dung chuẩn hóa: **1 trang sách = 1 tuần làm việc (W01 đến W52 / 52 trang/năm)**.
  4. Quản trị phân quyền nghiêm ngặt:
     - **Admin/Quản đốc:** Đăng bài sự cố theo tuần, **chỉ định đích danh Kỹ thuật viên (KTV)** xử lý.
     - **Kỹ thuật viên chỉ định:** Phân tích nguyên nhân 5-Why, đề xuất và thực hiện đối sách triệt để.
     - **Cộng đồng KTV:** Tự do đóng góp ý tưởng cải tiến (Kaizen), tải lên bản vẽ CAD/3D/PDF.
     - **Tích điểm thi đua & Vinh danh:** Hệ thống tính điểm tuần, xếp hạng KTV toàn xưởng không thiên vị.
  5. **Trợ lý AI Kỹ thuật (AI Chatbox / Assistant):** Tra cứu nhanh 600 dòng máy, định vị chính xác vị trí cuốn sách trên kệ và gợi ý giải pháp sự cố theo mã lỗi OEM.

---

### 2. KIẾN TRÚC PHÂN LOẠI & MÔ HÌNH DỮ LIỆU TỦ SÁCH (TAXONOMY & INFORMATION ARCHITECTURE)

#### 2.1. Phân loại theo Tủ Nhà Cung Cấp Máy (OEM / Machine Vendors)
Hệ thống không chia theo phân xưởng chung chung mà tổ chức thành các Tủ Sách Kỹ Thuật chuyên biệt theo hãng chế tạo:
- **Tủ OEM: DMG MORI (Đức - Nhật Bản):** ~124 máy (Máy phay 5 trục DMU 50, tiện phay NTX 2000, tiện NLX 2500, phay đứng CMX 600V, CTX beta 800...).
- **Tủ OEM: MAZAK & MAKINO (Nhật Bản):** ~148 máy (Máy phay giường Mazak VTC-800, Integrex i-200, Quick Turn 250, Makino U6 H.E.A.T EDM cắt dây, Makino F5 High Speed, Bắn điện EDAF3, Variaxis i-700...).
- **Tủ OEM: TRUMPF (Đức):** ~96 máy (Laser cắt tấm Fiber TruLaser, máy chấn TruBend).
- **Tủ OEM: FANUC & ROBODRILL (Nhật Bản):** ~112 máy (Robot công nghiệp, Robodrill α-DiB series).
- **Tủ OEM: ATLAS COPCO & REXROTH:** ~78 máy (Hệ thống máy nén khí trục vít, trạm nguồn thủy lực công suất lớn).
- **OEM Khác:** ~42 máy.

#### 2.2. Quy chuẩn Kệ Sách (Bookshelf Grid UI Rules)
- **Tỷ lệ hiển thị chuẩn:** Mỗi hàng kệ chứa đúng **7 cuốn sách tiêu chuẩn + 1 ô chức năng thêm sách mới** (dành cho Admin).
- **Kích thước & Form dáng:** Đồng nhất kích thước đứng (250px chiều cao), giả lập gáy sách công nghiệp với màu gradient theo từng dòng máy, hiển thị:
  - Mã định danh sách (Asset Code: ví dụ `BK-DMU-50`, `MZK-800`, `MKN-U6-EDM`).
  - Tên đầy đủ của thiết bị.
  - Tỷ lệ hoàn thiện dữ liệu số (% hoàn thành tri thức: ví dụ `Đạt: 82.5%`).
  - Số trang giải pháp / Ghi chú kỹ thuật nhanh.
  - Trạng thái nổi bật (ví dụ: `+40 PTS`, `ĐÃ TÌM THẤY`, `3 MÃ LỖI ADMIN`).
- **Thanh đỡ kệ:** Mô phỏng kệ gỗ công nghiệp có nẹp kim loại mang nhãn định danh tủ/hãng.

---

### 3. QUY TRÌNH TÁC NGHIỆP TRONG CUỐN SỔ TAY (WORKFLOW SPECIFICATION: "1 TRANG = 1 TUẦN")

Mỗi cuốn sổ tay số được chia thành 52 trang (ứng với 52 tuần trong năm). Tại mỗi trang tuần:

#### 3.1. Luồng 1: Admin Đăng Sự Cố & Chỉ Định KTV (Bắt buộc)
1. **Khởi tạo:** Admin chọn mã tuần (ví dụ `W41`), nhập mã sự cố tự sinh (ví dụ `#W41-049`).
2. **Thiết lập thông số:**
   - Mức độ ưu tiên: `Khẩn cấp (Line Stop)` / `Cảnh báo sớm` / `Định kỳ`.
   - Thời hạn hoàn thành (Deadline): Thiết lập ngày giờ cụ thể.
   - Mã lỗi OEM & Tên cảnh báo: Ví dụ `AL-310 Spindle Vibration Error`.
   - Hiện tượng kỹ thuật chi tiết: Tốc độ vòng tua, giá trị rung động, hành vi dừng máy E-Stop.
3. **Chỉ định đích danh KTV:** Dropdown chọn KTV chịu trách nhiệm chính (ví dụ: `Kíp B: KTV Lê Hoàng Minh & KTV Trần Văn Bình`).
4. **Đính kèm tài liệu hiện trường:** Tải ảnh màn hình CNC, file telemetry log, bản vẽ CAD.
5. **Kích hoạt:** Nút `Đăng Bài & Phát Lệnh Chỉ Định KTV` gửi push notification đến máy tính bảng của KTV và khóa quyền phản hồi mục 5-Why cho KTV đó.

#### 3.2. Luồng 2: KTV Được Chỉ Định Nộp Nguyên Nhân 5-Why & Đối Sách Triệt Để
- KTV phân tích theo phương pháp 5-Why để tìm nguyên nhân gốc rễ (Root Cause).
- Ghi nhận đối sách tạm thời & đối sách triệt để phòng ngừa tái diễn.
- Đính kèm hình ảnh linh kiện thay thế, thông số xiết lực, kết quả chạy thử nghiệm.
- Gửi báo cáo để Admin / Quản đốc kiểm tra và **Đóng dấu nghiệm thu trang tuần (Sign-off)**.

#### 3.3. Luồng 3: Cộng Đồng Đóng Góp Sáng Kiến Cải Tiến (Kaizen - Tự do)
- Không giới hạn người đăng: Bất kỳ KTV nào trong xưởng có mẹo vận hành, giải pháp tối ưu đồ gá, giảm thời gian gá đặt đều có thể đăng bài.
- **Khu vực tải lên hồ sơ chuyên dụng (Industrial Dropzone):**
  - Chấp nhận các định dạng kỹ thuật: `.DWG`, `.STEP`, `.STL` (in 3D), `.PDF`, `.JPG/PNG` (Ảnh Before/After), `.XLSX`.
  - Giới hạn dung lượng: 50MB/tệp.
  - Tự động cộng điểm thi đua: +15 đến +50 điểm/sáng kiến được duyệt.

#### 3.4. Luồng 4: Popup Mục Lục Lưới 52 Tuần (52-Week Annual Calendar Index)
- Cửa sổ Modal hiển thị ma trận 52 tuần chia theo 4 Quý (Q1: W01-W13, Q2: W14-W26, Q3: W27-W39, Q4: W40-W52).
- Trực quan hóa trạng thái từng tuần bằng mã màu:
  - 🔵 **Đang xem (Active Week)**.
  - 🟢 **Đã đóng sổ / Nghiệm thu ISO 100%**.
  - 🔴 **Có sự cố khẩn cấp (Alarm/Line Stop)**.
  - 💡 **Có sáng kiến Kaizen (+ROI)**.
  - ⚪ **Tuần kế hoạch trong tương lai**.
- Thống kê lũy kế chân trang: Tiến độ ghi nhận năm, tổng sự cố đã xử lý, điểm OEE trung bình lũy kế.

---

### 4. CÁC TÍNH NĂNG VỆ TINH CỐT LÕI (SATELLITE MODULES)

1. **Bộ Tra Cứu & Trợ Lý AI Chatbox (Spotlight Machine Locator):**
   - Hỗ trợ phím tắt `⌘ + K`.
   - Tìm kiếm đa tiêu chí: Tên máy, mã sự cố, mã phụ tùng, thông số kỹ thuật (RPM, Bar, Spindle).
   - Trợ lý AI trả lời ngôn ngữ tự nhiên và cung cấp tọa độ vật lý: `Tủ OEM: [Hãng] > Kệ [Số] > Vị trí [Số]`.
2. **Cộng Đồng Kỹ Thuật Viên Liên Nhà Máy (Cross-Plant Technical SOS):**
   - Cho phép KTV đăng câu hỏi SOS khi gặp các ca lỗi hiếm, khó xử lý.
   - Kỹ sư/KTV tại các phân xưởng hoặc nhà máy khác vào tư vấn, chia sẻ giải pháp.
   - Hệ thống tự động ghi nhận điểm đóng góp cho người hỗ trợ khi giải pháp được xác nhận hiệu quả.
3. **Bảng Xếp Hạng & Tích Điểm Tuần (Weekly Technical Leaderboard):**
   - Không đưa cơ chế tiền thưởng bịa đặt; chỉ tập trung vào **Điểm cống hiến tri thức** và **Bậc thợ/Hạng Kỹ sư**.
   - Xếp hạng theo tuần/tháng/quý dựa trên: Số trang kinh nghiệm đã viết, số sự cố giải quyết đúng hạn, số Kaizen được áp dụng.

---

### 5. CƠ SỞ DỮ LIỆU ĐỀ XUẤT (DATABASE SCHEMA DRAFT FOR AI STUDIO)

```sql
-- 1. Bảng Nhà Cung Cấp / Hãng Chế Tạo (OEMs)
CREATE TABLE oem_vendors (
    vendor_id VARCHAR(50) PRIMARY KEY,
    vendor_name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    total_assets INT DEFAULT 0,
    cabinet_code VARCHAR(50)
);

-- 2. Bảng Cuốn Sách Máy (Machine Books)
CREATE TABLE machine_books (
    book_id VARCHAR(50) PRIMARY KEY,
    asset_code VARCHAR(50) UNIQUE NOT NULL, -- vd: DMG-DMU-50
    machine_name VARCHAR(255) NOT NULL,
    vendor_id VARCHAR(50) REFERENCES oem_vendors(vendor_id),
    cabinet_shelf_no INT NOT NULL,          -- Kệ 01, Kệ 02
    position_index INT NOT NULL,            -- Vị trí từ 1 đến 7 trên kệ
    completion_rate DECIMAL(5,2) DEFAULT 0, -- Tỷ lệ % hoàn thiện tri thức
    total_pages INT DEFAULT 52,
    active_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Trang Nhật Ký Tuần (Weekly Book Pages)
CREATE TABLE book_weekly_pages (
    page_id VARCHAR(50) PRIMARY KEY,
    book_id VARCHAR(50) REFERENCES machine_books(book_id),
    week_number INT NOT NULL CHECK (week_number BETWEEN 1 AND 52),
    year INT NOT NULL,
    is_signed_off BOOLEAN DEFAULT FALSE,    -- Đã đóng dấu nghiệm thu
    signed_off_by VARCHAR(100),             -- Admin ký duyệt
    signed_off_at TIMESTAMP,
    oee_rate DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(book_id, week_number, year)
);

-- 4. Bảng Sự Cố Tuần (Weekly Incidents - Admin tạo)
CREATE TABLE weekly_incidents (
    incident_id VARCHAR(50) PRIMARY KEY,    -- vd: #W41-049
    page_id VARCHAR(50) REFERENCES book_weekly_pages(page_id),
    priority VARCHAR(20) CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
    error_code VARCHAR(100),                -- vd: AL-310
    title VARCHAR(255) NOT NULL,
    technical_description TEXT,
    assigned_technician_ids JSONB,          -- Danh sách ID KTV được chỉ định
    deadline TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ASSIGNED',  -- ASSIGNED, IN_PROGRESS, RESOLVED, VERIFIED
    created_by_admin VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bảng Phân Tích 5-Why & Đối Sách (Incident Solutions - KTV nộp)
CREATE TABLE incident_solutions (
    solution_id VARCHAR(50) PRIMARY KEY,
    incident_id VARCHAR(50) REFERENCES weekly_incidents(incident_id),
    why_1 TEXT,
    why_2 TEXT,
    why_3 TEXT,
    why_4 TEXT,
    why_5_root_cause TEXT NOT NULL,
    immediate_countermeasure TEXT,
    permanent_countermeasure TEXT NOT NULL,
    submitted_by VARCHAR(100) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bảng Sáng Kiến Cải Tiến (Kaizen Contributions - Tự do)
CREATE TABLE kaizen_contributions (
    kaizen_id VARCHAR(50) PRIMARY KEY,
    page_id VARCHAR(50) REFERENCES book_weekly_pages(page_id),
    author_id VARCHAR(100) NOT NULL,
    category VARCHAR(100),                 -- Đồ gá, Chiller, Lập trình NC...
    title VARCHAR(255) NOT NULL,
    description TEXT,
    points_awarded INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bảng Tệp Kỹ Thuật Đính Kèm (Technical Attachments)
CREATE TABLE technical_attachments (
    attachment_id VARCHAR(50) PRIMARY KEY,
    reference_type VARCHAR(50),            -- INCIDENT, SOLUTION, KAIZEN
    reference_id VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_extension VARCHAR(10),            -- .step, .dwg, .pdf, .stl, .jpg
    file_size_bytes BIGINT,
    file_url TEXT NOT NULL,
    uploaded_by VARCHAR(100),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 6. GỢI Ý PROMPT KÍCH HOẠT DÀNH CHO GOOGLE AI STUDIO (SYSTEM PROMPT FOR GEMINI)

```text
Bạn là Trợ lý Kỹ sư Thư viện Máy Công nghiệp (Industrial Equipment Knowledge Assistant) phụ trách hệ thống 600 máy công cụ tại nhà máy sản xuất chính xác.
Hãy tuân thủ nghiêm ngặt các nguyên tắc sau:
1. Mô hình dữ liệu: Hệ thống được tổ chức theo Tủ Sách Nhà Cung Cấp (DMG Mori, Mazak, Makino, Trumpf, Fanuc, Atlas Copco). Mỗi cuốn sách đại diện cho một mã máy duy nhất.
2. Cấu trúc thời gian: Mỗi trang sách là một tuần làm việc (W01 đến W52).
3. Luồng nghiệp vụ:
   - Khi Admin hỏi: Hỗ trợ tạo mẫu sự cố theo tuần, chuẩn hóa mã lỗi OEM, đề xuất checklist chỉ định KTV.
   - Khi KTV hỏi: Hỗ trợ gợi ý các bước phân tích 5-Why đối với các hiện tượng rung động, quá nhiệt, sai số hành trình, kẹt dao, đồng thời tra cứu vị trí cuốn sách trên kệ thư viện ảo.
4. Phong cách ngôn ngữ: Chuẩn kỹ thuật cơ khí chính xác, ngắn gọn, súc tích, tuyệt đối không dùng từ ngữ phóng đại, tập trung vào OEE, thông số cắt gọt, áp suất thủy lực, mã lệnh G-code và dung sai.
```

---
*Tài liệu được kết xuất chuẩn Markdown sẵn sàng sao chép trực tiếp vào Google AI Studio, Claude Project hoặc Jira PRD.*
