# EDM SMARTGUARD AI — KNOWLEDGE LIFECYCLE CONTROL CENTER
## PHASE 0: REPOSITORY AUDIT & MASTER ARCHITECTURAL IMPLEMENTATION PLAN

**Phiên bản:** 2.0 • **Ngày lập:** 11/11/2026  
**Nguyên tắc cốt lõi:**  
*ONE INCIDENT. ONE TRACEABLE KNOWLEDGE JOURNEY. VERIFIED BY PEOPLE. SUPPORTED BY AI. MEASURED BY REAL RESULTS.*

---

## I. HIỆN TRẠNG TOÀN DIỆN MÃ NGUỒN & HỆ THỐNG HIỆN HỮU (SOURCE CODE AUDIT)

### 1.1 Khung Công nghệ & Môi trường Thực thi
- **Frontend Core:** React 19.0.1, Single Page Application trên Vite 8.3.0.
- **Styling & Theme:** Tailwind CSS v4.3.3 (`@tailwindcss/vite`), hệ thống chuyển đổi Ca đêm/Ca ngày (`.high-contrast-dark`) đã hoạt động ổn định.
- **Biểu đồ & Trực quan hóa dữ liệu:** D3.js 7.9.0 (`@types/d3`), hỗ trợ Donut charts, Spline charts, Linear gauge bars, Arc progress.
- **Bộ Icon Công nghiệp:** Lucide React (`^0.546.0`).
- **Xử lý AI Server-side:** `@google/genai` (Gemini 3.8 Flash), Connect Middleware trong `vite.config.ts` (`/api/ai/chat`), Express 4.21.2 full-stack entry.
- **Voice & Speech:** Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition` `vi-VN`) với Audio Visualizer và cơ chế fallback.
- **Lưu trữ Cục bộ (Persistence):** LocalStorage cho Dark Mode (`edm_smartguard_theme_mode`), tin nhắn chat (`edm_smartguard_chat_messages_v2`) và các phiên hội thoại (`edm_smartguard_chat_sessions_v2`).
- **Độ phân giải chuẩn:** 1536 × 864 px (Chuẩn màn hình máy trạm công nghiệp xưởng gia công).

---

### 1.2 Kiểm kê 9 Phân hệ Đang Hoạt động (Zero-Disruption Baseline)

| Mã Module | Tên Phân Hệ | File Nguồn | Trạng Thái | Dữ Liệu Liên Kết Hiện Có |
| :--- | :--- | :--- | :---: | :--- |
| `incidents` | **Xử lý sự cố** | `src/components/modules/IncidentModule.tsx` | Hoàn thiện 100% | 1,376 ca lỗi, chi tiết E210 (CNC-04 Mitsubishi), 5 bước SOP, tài liệu PDF, ca tương tự |
| `improvement` | **Cải tiến kỹ thuật** | `src/components/modules/ImprovementModule.tsx` | Hoàn thiện 100% | 326 sáng kiến, Before/After slider, 3 chỉ số định lượng, đội ngũ thực hiện, phạm vi máy |
| `analytics` | **Tổng hợp tri thức** | `src/components/modules/AnalyticsModule.tsx` | Hoàn thiện 100% | 12,486 tri thức, biểu đồ D3 Donut, xu hướng 6 tháng, Knowledge Map trực quan, AI tổng hợp |
| `community` | **Cộng đồng kỹ thuật** | `src/components/modules/CommunityModule.tsx` | Hoàn thiện 100% | 2,846 thảo luận, phân loại 4 chủ đề, đánh dấu giải pháp đã giải quyết, vinh danh chuyên gia |
| `ai-search` | **Tìm kiếm AI** | `src/components/modules/AISearchModule.tsx` | Hoàn thiện 100% | Tìm kiếm ngữ nghĩa, đối chiếu 8 nguồn tri thức đã xác thực, quy trình kiểm tra và lưu ý an toàn |
| `approval` | **Phê duyệt nội dung** | `src/components/modules/ApprovalModule.tsx` | Hoàn thiện 100% | 152 ca chờ duyệt, checklist 4 tiêu chí SOP, xếp hạng 5 sao, Duyệt/Yêu cầu sửa/Từ chối |
| `contributions` | **Đóng góp & Xếp hạng** | `src/components/modules/RankingModule.tsx` | Hoàn thiện 100% | BXH cá nhân, BXH 7 Vendor (KHV, KTECH, HSTEC, DREAM TECH, HOJEONGB, HOJEONG VINA, DAAL) |
| `docs` | **Thư viện tài liệu** | `src/components/modules/DocumentModule.tsx` | Hoàn thiện 100% | 4,320 tài liệu (Manual, SOP, Sơ đồ điện, CAD), modal preview, tải về, bộ lọc model |
| `mobile` | **Hiện trường Di động** | `src/components/modules/MobileFieldModule.tsx` | Hoàn thiện 100% | Giao diện 1 tay, telemetry Spindle nhiệt độ (72.4°C) & áp suất nước, checklist 5 bước, hotline |

---

### 1.3 Phân Tích Phân Quyền Người Dùng Hiện Tại (RBAC Audit)
Hiện tại `src/types.ts` định nghĩa 5 vai trò:
- `admin` (Quản trị viên)
- `knowledge_manager` (Quản lý tri thức)
- `technical_expert` (Chuyên gia kỹ thuật)
- `technician` (Kỹ thuật viên)
- `viewer` (Người xem)

**Cần bổ sung & tách bạch cho Module Vòng đời Tri thức:**
1. **`knowledge_manager` (Chủ quản Vòng đời Tri thức):** Điều phối toàn trình, phân công hồ sơ, giám sát SLA, kiểm soát chất lượng, theo dõi điểm nghẽn (không tự ý phê duyệt chuyên môn nếu không kiêm nhiệm).
2. **`technical_expert` (Chuyên gia Kỹ thuật):** Thẩm định nguyên nhân, phương án xử lý, an toàn lao động, xác nhận kết quả kỹ thuật tại Stage 02 & Stage 06.
3. **`content_approver` (Kiểm duyệt Nội dung):** Chuẩn hóa nội dung, thẩm định đầy đủ, xuất bản tri thức, quản lý phiên bản tại Stage 03.
4. **`ai_admin` (Quản trị AI):** Giám sát nguồn tri thức cho phép AI gợi ý, theo dõi độ tin cậy trích dẫn, lỗi dữ liệu tại Stage 04.
5. **`technician` / `vendor`:** Báo sự cố, áp dụng tri thức, ghi nhận sai lệch và kết quả thực tế tại Stage 01 & Stage 05.
6. **`system_admin`:** Quản lý hạ tầng, bảo mật, tài khoản, không can thiệp nội dung kỹ thuật.

---

### 1.4 Kiểm kê Component Tái Sử Dụng (Reusable UI Assets)
- `Header.tsx`: Bộ lọc tìm kiếm toàn cục, chuyển đổi Ca đêm/Ca ngày, Menu đổi Role RBAC, nút Mobile Mode.
- `Sidebar.tsx`: Hệ thống menu bên trái với badge số lượng công việc chờ xử lý.
- `AIChatBox.tsx` & `MarkdownRenderer.tsx`: Trợ lý AI hội thoại, hiển thị bảng SOP, checklist tương tác, trích dẫn tài liệu.
- `NewIncidentModal.tsx`: Biểu mẫu đăng sự cố có khả năng pre-fill tự động từ AI.
- `src/data/mockData.ts`: 1,300+ dòng dữ liệu có cấu trúc về máy CNC-04 (Mitsubishi M-V800), EDM-04 (Sodick ALC600G), EDM-02 (Makino), Okuma Genos M560.

---

## II. THIẾT KẾ KIẾN TRÚC VÒNG ĐỜI TRI THỨC 6 CÔNG ĐOẠN (6-STAGE WORKFLOW ENGINE)

Hệ thống điều hành theo chu trình khép kín, truy xuất nguồn gốc 100%:

```
[01. INCIDENT CAPTURE]
   │ (Kỹ thuật viên phát hiện sự cố máy: Mã lỗi, hiện tượng, ảnh/video, thời gian dừng máy)
   ▼
[02. TECHNICAL VERIFICATION]
   │ (Knowledge Manager phân công Technical Expert thẩm định nguyên nhân gốc rễ & phương án)
   ▼
[03. KNOWLEDGE APPROVAL & PUBLISHING]
   │ (Content Approver chuẩn hóa nội dung, cấp Version, gắn nhãn Verified Knowledge & xuất bản)
   ▼
[04. AI RECOMMENDATION MONITOR]
   │ (AI Assistant chỉ sử dụng tri thức ĐÃ DUYỆT để đề xuất cho các sự cố tương tự)
   ▼
[05. KNOWLEDGE APPLICATION CENTER]
   │ (Kỹ thuật viên tại xưởng áp dụng quy trình, ghi nhận sai lệch thực tế nếu có)
   ▼
[06. OUTCOME VALIDATION WORKSPACE]
   │ (Technical Expert & KM xác nhận: Máy ổn định chưa? Có tái diễn không? Đo lường hiệu quả)
   │
   └──► Cập nhật KPI MTTR, giảm tái diễn, hoặc yêu cầu cập nhật lại Version tài liệu nếu thất bại!
```

---

## III. THIẾT KẾ CÁC KHU VỰC CHỨC NĂNG CỦA CONTROL CENTER

### 1. Header & Bộ Lọc Toàn Cục (Global Operations Header)
- **Tiêu đề:** `KNOWLEDGE LIFECYCLE CONTROL CENTER` • `Technical Knowledge Operations`
- **Bộ lọc đa chiều đồng bộ tức thời:**
  - Khoảng thời gian: Hôm nay, 7 ngày qua, Tháng này, Quý này.
  - Nhà máy (Factory): Tất cả, SEV (Trung tâm), Vệ tinh P1, Vệ tinh P2.
  - Đơn vị/Vendor: Tất cả, KHV, KTECH, HSTEC, DREAM TECH, HOJEONGB, HOJEONG VINA, DAAL.
  - Thiết bị & Model: EDM-04 (Sodick ALC600G), CNC-04 (Mitsubishi M-V800), Makino U6, Okuma Genos.
  - Chuyên mục: Gia công cắt dây, Phay CNC, Thủy lực, Điện khí nén, Spindle.
- **Nút thao tác chính:**
  - `+ Báo sự cố mới` (Mở Modal tạo sự cố có duplicate check).
  - `Xuất báo cáo SLA & Vòng đời` (Export XLSX/PDF).
  - `Làm mới dữ liệu` (Sync real-time).

---

### 2. Thẻ KPI Tổng Hợp Hoạt Động (8 Operational KPI Cards)
1. **Tổng sự cố tiếp nhận (Total Incidents):** Số ca ghi nhận trong kỳ kèm biến động so với kỳ trước.
2. **Chờ xác minh kỹ thuật (Pending Verification):** Số hồ sơ tại Stage 02 đang chờ phân công hoặc đang thẩm định.
3. **Chờ phê duyệt xuất bản (Pending Approval):** Số bài đã xác minh đang chờ Content Approver cấp phép.
4. **Tri thức đã xuất bản (Verified Knowledge):** Tổng số bài SOP chuẩn đang có hiệu lực.
5. **Đề xuất AI đang kích hoạt (AI Recommendations):** Số lượt AI gợi ý thành công từ nguồn tri thức đã duyệt.
6. **Chờ xác nhận kết quả (Pending Outcome Validation):** Số ca đã sửa chữa đang theo dõi độ ổn định (48h - 72h).
7. **Hồ sơ quá hạn SLA (Overdue Cases):** Cảnh báo màu đỏ nổi bật về các ca vi phạm thời hạn cam kết.
8. **Tỷ lệ áp dụng thành công (Application Success Rate):** Tỷ lệ % ca áp dụng tri thức thành công và không bị tái diễn.

---

### 3. Pipeline Vòng Đời 6 Công Đoạn (Central Interactive Pipeline)
Một dải trực quan chia làm 6 khối công đoạn, mỗi khối hiển thị:
- **Tên công đoạn:** `01 Incident Capture` → `02 Technical Verification` → `03 Knowledge Approval` → `04 AI Recommendation` → `05 Knowledge Application` → `06 Outcome Validation`.
- **Số lượng hồ sơ:** Tổng số hồ sơ đang ở công đoạn này.
- **Trạng thái cảnh báo:** Số ca bình thường, số ca sắp đến hạn (vàng), số ca quá hạn SLA (đỏ).
- **Tỷ lệ hoàn thành:** Thanh tiến độ hoàn thành SLA của công đoạn.
- **Người chịu trách nhiệm chính:** Icon vai trò (Technician, Technical Expert, Approver, AI Admin).
- **Tương tác:** Nhấp vào công đoạn nào thì bảng nhiệm vụ bên dưới tự động lọc đúng danh sách của công đoạn đó!

---

### 4. Biểu Đồ Phân Tích Điểm Nghẽn Quy Trình (Workflow Bottleneck Matrix)
Biểu đồ trực quan xác định ngay nguyên nhân gây trễ nợ hồ sơ:
- Hồ sơ chờ phân công chuyên gia (> 24h).
- Hồ sơ thiếu hình ảnh/video bằng chứng kỹ thuật.
- Hồ sơ có nguyên nhân chưa rõ ràng (Unverified Root Cause).
- Hồ sơ sửa chữa xong nhưng chưa xác nhận kết quả vận hành máy.
- Có bộ lọc nhanh theo Factory, Vendor và Chuyên gia phụ trách.

---

### 5. Trung Tâm Nhiệm Vụ Chờ Xử Lý (Pending Tasks Operations Center)
Bảng nhiệm vụ thời gian thực với phân trang, tìm kiếm và phân quyền hành động theo Role:
- **Các cột:** `Mã Case ID`, `Thiết bị & Model`, `Mã lỗi / Triệu chứng`, `Công đoạn (Stage)`, `Mức ưu tiên (Khẩn cấp / Cao / Thường)`, `Người phụ trách`, `Hạn xử lý (Due Date)`, `Trạng thái SLA`, `Hành động`.
- **Hành động phân quyền theo vai trò:**
  - Knowledge Manager: Phân công (`Assign`), Đổi người (`Reassign`), Chuyển cấp khẩn (`Escalate`).
  - Technical Expert: Thẩm định (`Verify`), Yêu cầu bổ sung chứng cứ (`Request Info`).
  - Content Approver: Duyệt (`Approve`), Xuất bản (`Publish`), Yêu cầu sửa đổi (`Request Revision`).
  - Technician: Áp dụng (`Apply`), Ghi nhận kết quả (`Record Result`).

---

### 6. Giám Sát Chất Lượng Tri Thức (Knowledge Quality Monitor)
Bảng cảnh báo rủi ro kỹ thuật:
- **Trùng lặp tri thức (Duplicate Knowledge):** Cảnh báo khi có 2 ca sự cố cùng mã lỗi và thiết bị nhưng giải pháp mâu thuẫn.
- **Thiếu bằng chứng (Missing Evidence):** Ca không có ảnh đo kiểm hoặc thông số lưu lượng/nhiệt độ thực tế.
- **Tri thức hết hạn (Expired Documents):** SOP quá 12 tháng chưa được thẩm định lại.
- **Đề xuất AI độ tin cậy thấp (Low Confidence AI):** Các ca AI trả lời từ nguồn chưa đủ độ tin cậy.

---

### 7. Đo Lường Hiệu Quả Ứng Dụng Thực Tế (Knowledge Effectiveness Metrics)
- **Tỷ lệ giảm thời gian sửa chữa (MTTR Improvement):** Giảm từ 4.8h xuống 3.0h (-37.5%).
- **Tỷ lệ giảm sự cố lặp lại (Repeat Incident Reduction):** Giảm từ 7.2% xuống 4.2% (-41.6%).
- **Ước tính chi phí tiết kiệm được kiểm chứng:** 1.26 tỷ VND dựa trên số giờ dừng máy tránh được.

---

## IV. BẢN THIẾT KẾ CÁC MODAL, DRAWER VÀ FORM TƯƠNG TÁC

1. **Detail Drawer (Xem hồ sơ vòng đời không cần rời trang):**
   - Mở trượt từ cạnh phải (chiều rộng 580px - 720px).
   - Hiển thị đầy đủ hành trình lịch sử của Case từ lúc phát sinh đến khi thẩm định và áp dụng.
   - Tab Bằng chứng (Ảnh/Video), Tab Biên bản đo kiểm, Tab Lịch sử phê duyệt và Tab Audit Log.

2. **Modal Phân Công Chuyên Gia (Assign Expert Modal):**
   - Danh sách chuyên gia kỹ thuật theo hãng máy (Mitsubishi, Sodick, Makino, Okuma).
   - Hiển thị tải công việc hiện tại của từng chuyên gia (đang giữ bao nhiêu case).
   - Thiết lập thời hạn SLA cam kết.

3. **Workspace Thẩm Định Kỹ Thuật (Technical Verification Workspace Modal):**
   - Đối chiếu bằng chứng hiện trường.
   - Nhập nguyên nhân gốc rễ đã xác minh (không cho phép chọn bừa).
   - Nhập các bước xử lý và lưu ý an toàn.
   - Nút `Xác nhận đạt điều kiện chuyển sang Tri thức` hoặc `Yêu cầu bổ sung`.

4. **Wizard Xuất Bản Tri Thức (Knowledge Publishing Wizard):**
   - Xem trước bài viết chuẩn SOP.
   - Cấp số hiệu phiên bản (`v1.0`, `v2.1`...).
   - Đặt ngày hết hạn thẩm định lại (Review Due Date).
   - Quyết định phạm vi chia sẻ (Nội bộ xưởng hay Chia sẻ cho 7 Vendor).

5. **Modal Xác Nhận Kết Quả Vận Hành (Outcome Validation Modal):**
   - Đánh giá: Máy đã chạy ổn định bao nhiêu ca?
   - Có xuất hiện lại mã lỗi không?
   - Kết luận: `Thành công hoàn toàn`, `Thành công một phần`, `Thất bại - Cần điều tra lại`.
   - Nếu thất bại: Tự động gắn cờ cảnh báo tri thức để xem xét lại phiên bản.

6. **Audit History Log Drawer:**
   - Truy xuất ai đã thay đổi gì, vào lúc nào, với lý do gì.

---

## V. CẤU TRÚC DỮ LIỆU MỞ RỘNG (EXPANDED DATA SCHEMA)

Để đảm bảo tương thích 100% với dữ liệu hiện tại, các interface mới kế thừa và liên kết với `IncidentItem`:

```typescript
// 1. Hồ sơ Vòng đời Tri thức
export type LifecycleStage =
  | 'incident_capture'       // 01 Ghi nhận sự cố
  | 'technical_verification' // 02 Xác minh kỹ thuật
  | 'knowledge_approval'     // 03 Phê duyệt xuất bản
  | 'ai_recommendation'      // 04 Đề xuất AI
  | 'knowledge_application'  // 05 Ứng dụng thực tế
  | 'outcome_validation';    // 06 Xác nhận kết quả

export type SLAStatus = 'on_time' | 'due_soon' | 'overdue' | 'paused';
export type CasePriority = 'critical' | 'high' | 'medium' | 'low';

export interface LifecycleCase {
  id: string;                      // VD: 'LC-2025-0142'
  incidentId: string;              // Liên kết 'inc-01'
  title: string;
  equipmentId: string;             // 'CNC-04'
  model: string;                   // 'M-V800'
  vendor: string;                  // 'Mitsubishi'
  factory: 'SEV' | 'P1' | 'P2';
  errorCode: string;               // 'E210'
  currentStage: LifecycleStage;
  priority: CasePriority;
  assignedExpert?: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
  assignedApprover?: {
    id: string;
    name: string;
    role: string;
  };
  createdDate: string;
  dueDate: string;
  slaStatus: SLAStatus;
  slaRemainingHours: number;
  stageProgressPercent: number;
  evidenceCount: number;
  hasRootCause: boolean;
  publishedArticleId?: string;     // Nếu đã xuất bản
  applicationRecordId?: string;    // Nếu đã áp dụng
  validationStatus?: 'verified_successful' | 'partially_successful' | 'failed' | 'pending';
}

// 2. Nhật ký Audit Log
export interface LifecycleAuditEntry {
  id: string;
  caseId: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  details: string;
  previousValue?: string;
  newValue?: string;
}
```

---

## VI. LỘ TRÌNH TRIỂN KHAI 8 GIAI ĐOẠN (IMPLEMENTATION ROADMAP)

- [x] **PHASE 0:** Thẩm định toàn diện mã nguồn, xác lập các nguyên tắc không phá vỡ, lập bản thiết kế kiến trúc chi tiết.
- [ ] **PHASE 1:** Kiến trúc Vai trò & Cấu trúc Dữ liệu Mở rộng (Cập nhật `src/types.ts` và bộ mock data phong phú đầy đủ 6 công đoạn tại `src/data/mockData.ts`).
- [ ] **PHASE 2:** Màn hình Điều hành Tổng thể (Knowledge Lifecycle Dashboard: Header đa bộ lọc, 8 thẻ KPI động, Central Pipeline 6 công đoạn, Bottleneck Analysis).
- [ ] **PHASE 3:** Workspace 6 Công đoạn Tương tác Chi tiết (Stage 01 đến Stage 06 với các form thao tác nghiệp vụ thực tế).
- [ ] **PHASE 4:** Bàn Làm Việc Riêng Của Knowledge Manager (Workspace phân công, điều chuyển, thiết lập SLA, giám sát tải công việc đội ngũ).
- [ ] **PHASE 5:** Quản Lý SLA, Cảnh Báo Chất Lượng & Nhật Ký Truy Vết (SLA Configuration, Quality Monitor, Audit Log Drawer).
- [ ] **PHASE 6:** Tích Hợp Vào Menu Sidebar & Khung Ứng Dụng Chính (Đưa mục `Vòng đời tri thức` vào Sidebar và định tuyến trong `App.tsx`).
- [ ] **PHASE 7:** Hoàn Thiện Modal, Drawer, Wizard & Khả Năng Tương Thích Responsive / Ca Đêm.
- [ ] **PHASE 8:** Kiểm Thử Quy Trình Khép Kín End-to-End & Xác Nhận Nghiệm Thu.

---
*Tài liệu thẩm định và kế hoạch triển khai Phase 0 đã hoàn thành. Sẵn sàng bắt đầu triển khai Phase 1 theo phê duyệt.*
