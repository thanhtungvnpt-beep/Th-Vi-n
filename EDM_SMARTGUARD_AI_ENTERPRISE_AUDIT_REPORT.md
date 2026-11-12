# EDM SMARTGUARD AI — INDUSTRIAL KNOWLEDGE INTELLIGENCE PLATFORM
## PHASE 0: FULL ENTERPRISE SYSTEM AUDIT & TARGET ARCHITECTURE ASSESSMENT REPORT

**Tài liệu:** Báo cáo Kiểm toán Toàn diện Hiện trạng & Đánh giá Kiến trúc Mục tiêu  
**Phiên bản:** Phase 0 — Audit Only (Pre-Implementation Baseline)  
**Ngày lập:** 11/11/2026  
**Chuyên gia thực hiện:** Senior Enterprise Solution Architect, Industrial Knowledge Management Architect, AI Systems Architect, Database Architect, UX/UI Auditor & Software Quality Engineer  
**Nguyên tắc thực thi:** **AUDIT ONLY — BẢO TOÀN NGUYÊN TRẠNG 100% MÃ NGUỒN VÀ DỮ LIỆU HIỆN CÓ**

---

## 1. CURRENT SYSTEM ARCHITECTURE (KIẾN TRÚC HỆ THỐNG HIỆN HỮU)

### 1.1 Khung Công nghệ & Môi trường Chạy (Runtime Stack)
* **Frontend Engine:** React 19.0.1 (`react`, `react-dom` v19.0.1) trên nền build tool Vite 8.3.0 (`vite` v8.3.0, `@vitejs/plugin-react` v6.1.1).
* **Styling Framework:** Tailwind CSS v4.3.3 kết hợp `@tailwindcss/vite` v4.3.3, hỗ trợ chuyển đổi giao diện 2 chế độ:
  * Default Industrial Navy Theme.
  * Night-shift High-Contrast Dark Mode (`.high-contrast-dark` định nghĩa tại `src/index.css`).
* **Trực quan hóa dữ liệu (Visualization Engine):** D3.js 7.9.2 (`d3` v7.9.2, `@types/d3` v7.4.3), render trực tiếp SVG cho Donut Charts, Spline Area Trend Curves, Linear Gauge Progress Bars.
* **Thư viện Icon:** Lucide React v0.546.0 (`lucide-react`).
* **Hiệu ứng chuyển động (Animation):** Motion v12.23.24 (`motion`).
* **Hạ tầng AI Server-side:** `@google/genai` v2.4.0 (Gemini 3.8 Flash), tích hợp qua Connect Middleware tại `vite.config.ts` (Endpoint `/api/ai/chat`) có fallback chế độ offline/no-key.
* **Speech & Voice Engine:** Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition` `vi-VN`) có thanh sóng âm mô phỏng Audio Visualizer.
* **Độ phân giải chuẩn xưởng:** Tối ưu hóa 1536 × 864 px (Chuẩn máy trạm CNC/EDM Industrial Workstation).

---

## 2. EXISTING FEATURE INVENTORY (KIỂM KÊ 9 PHÂN HỆ CỐT LÕI + LIFECYCLE)

| STT | Phân hệ (Module) | File Nguồn Thực thi | Trạng thái Nghiệp vụ | Khả năng Tác nghiệp Hiện có | Dữ liệu Liên kết Thực tế |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **01** | **Trang chủ / Tổng quan Tri thức** | `src/components/modules/AnalyticsModule.tsx` | Hoàn thiện 100% | Dashboard điều hành, 4 KPI tổng hợp, biểu đồ D3 Donut tỷ lệ phân bổ sự cố, Spline chart xu hướng 6 tháng, bản đồ Knowledge Map. | 12,486 tri thức, 1,248 ca giải quyết, -37% MTTR, 1.26 tỷ VNĐ tiết kiệm. |
| **02** | **Thư viện Tài liệu Kỹ thuật** | `src/components/modules/DocumentModule.tsx` | Hoàn thiện 100% | Quản lý 6 danh mục tài liệu (Manual, SOP, Sơ đồ điện, Bản vẽ CAD, Hướng dẫn bảo trì, Danh mục phụ tùng), modal xem trước tài liệu, tải về, lọc theo hãng máy. | 4,320 tài liệu (Manual M-V800, SOP-COOL-01, ELEC-EDNC65-02, DWG-JIG...). |
| **03** | **Xử lý Sự cố Kỹ thuật** | `src/components/modules/IncidentModule.tsx` | Hoàn thiện 100% | Danh sách sự cố đa chiều, chi tiết ca lỗi E210 (CNC-04 Mitsubishi), 5 bước kiểm tra SOP kèm ảnh, checklist, tài liệu liên quan, ca tương tự, like, chia sẻ. | 1,376 ca lỗi, sự cố chi tiết Spindle quá nhiệt > 70°C, lưu lượng nước làm mát < 12L/phút. |
| **04** | **Cải tiến Kỹ thuật** | `src/components/modules/ImprovementModule.tsx` | Hoàn thiện 100% | Bảng sáng kiến kaizen, thanh trượt Before/After slider so sánh hiện trường, 3 chỉ số định lượng, đội ngũ thực hiện, phạm vi máy áp dụng. | 326 sáng kiến cải tiến, mã IMP-01 (Lọc dung dịch EDM), IMP-02 (Gá đặt phôi nhanh). |
| **05** | **Cộng đồng Kỹ thuật** | `src/components/modules/CommunityModule.tsx` | Hoàn thiện 100% | Diễn đàn hỏi đáp kỹ thuật 4 chủ đề (Hỏi đáp, Kinh nghiệm sửa chữa, Cải tiến, Chia sẻ), đánh dấu Giải pháp được chấp nhận (Accepted Solution), vinh danh chuyên gia. | 2,846 chủ đề thảo luận, 24 phản hồi kỹ thuật ca lỗi E210, chia sẻ độ căng dây EDM. |
| **06** | **Đóng góp & Xếp hạng** | `src/components/modules/RankingModule.tsx` | Hoàn thiện 100% | BXH cá nhân (Điểm, cấp bậc, số bài viết), BXH Vendor công nghiệp (7 Vendor), huy hiệu chuyên gia, hệ thống điểm thưởng đóng góp. | BXH 7 Vendor: KHV (12,480đ), KTECH, HSTEC, DREAM TECH, HOJEONGB, HOJEONG VINA, DAAL. |
| **07** | **Phê duyệt Nội dung** | `src/components/modules/ApprovalModule.tsx` | Hoàn thiện 100% | Hàng đợi chờ duyệt, checklist 4 tiêu chí chuẩn hóa SOP (Rõ ràng, An toàn, Có ảnh bằng chứng, Khả thi), chấm điểm 5 sao, hành động Duyệt/Yêu cầu sửa/Từ chối. | 152 ca chờ duyệt (appr-01 E210, appr-02 Lọc dung dịch, appr-03 SOP Trục chính). |
| **08** | **Tìm kiếm Tri thức AI** | `src/components/modules/AISearchModule.tsx` | Hoàn thiện 100% | Tìm kiếm ngữ nghĩa, đối soát 8 nguồn tài liệu đã thẩm định, trích xuất nguyên nhân gốc, 5 bước xử lý tóm tắt và cảnh báo an toàn LOTO. | Tìm kiếm thông minh E210 Spindle, AL-03 Servo Makino, đứt dây Sodick. |
| **09** | **Hiện trường Di động (Mobile)** | `src/components/modules/MobileFieldModule.tsx` | Hoàn thiện 100% | Giao diện thao tác 1 tay tại sàn máy, telemetry Spindle (72.4°C, 8.5L/min), checklist 5 bước xác nhận tại chỗ, camera chụp ảnh sự cố, nút gọi hotline kỹ sư trưởng. | Tương thích máy CNC-04 Line A, hiển thị cảnh báo đỏ khi quá nhiệt > 70°C. |
| **10** | **Vòng đời Tri thức (Control Center)**| `src/components/modules/LifecycleModule.tsx` | Hoàn thiện 100% | Điều hành 6 công đoạn khép kín (`01 Tiếp nhận` → `02 Xác minh` → `03 Phê duyệt` → `04 Đề xuất AI` → `05 Áp dụng` → `06 Nghiệm thu`), 8 KPI Cards, 6 Workspace Shells, Detail Drawer, Modals phân công/thẩm định. | 6 ca thực tế (`LC-2025-0142`, `LC-2025-0145`, `LC-2025-0148`, `LC-2025-0150`, `LC-2025-0155`, `LC-2025-0158`). |

---

## 3. EXISTING SCREEN AND ROUTE INVENTORY (DANH MỤC MÀN HÌNH & ĐIỀU HƯỚNG)

Ứng dụng hoạt động theo kiến trúc SPA (Single Page Application) điều phối trạng thái điều hướng qua `activeNav` tại `src/App.tsx`:

* **Route `home` / `analytics`:** `AnalyticsModule.tsx` — Dashboard tổng quan, phân tích tri thức toàn hệ thống.
* **Route `lifecycle`:** `LifecycleModule.tsx` — Trung tâm điều hành vòng đời tri thức 6 công đoạn + 6 workspaces tác nghiệp con.
* **Route `docs`:** `DocumentModule.tsx` — Thư viện tài liệu kỹ thuật, bộ lọc model và định dạng.
* **Route `incidents`:** `IncidentModule.tsx` — Xử lý sự cố, danh sách ca lỗi và chi tiết xử lý hiện trường.
* **Route `improvement`:** `ImprovementModule.tsx` — Cải tiến kỹ thuật, đối chiếu Before/After.
* **Route `community`:** `CommunityModule.tsx` — Cộng đồng thảo luận kỹ thuật và hỏi đáp kinh nghiệm.
* **Route `contributions`:** `RankingModule.tsx` — Bảng xếp hạng đóng góp cá nhân & 7 Vendor đối tác.
* **Route `approval`:** `ApprovalModule.tsx` — Phê duyệt nội dung kỹ thuật và kiểm định tiêu chuẩn SOP.
* **Route `ai-search`:** `AISearchModule.tsx` — Tìm kiếm tri thức AI chuyên sâu có trích dẫn nguồn.
* **Chế độ `isMobileView = true`:** `MobileFieldModule.tsx` — Giao diện hiện trường sàn máy thao tác 1 tay.
* **Global Overlays & Modals:**
  * `NewIncidentModal.tsx`: Tiếp nhận sự cố mới (hỗ trợ prefill tự động từ AI).
  * `AIChatBox.tsx`: Cửa sổ trợ lý AI nổi, đính kèm bảng Markdown, checklist, giọng nói và bộ tạo sự cố từ chat.
  * `LifecycleDetailDrawer.tsx`: Ngăn trượt tra cứu hồ sơ 5 tab (Tiến trình, Chẩn đoán, Tri thức, Áp dụng, Audit).
  * `AssignExpertModal.tsx`, `TechnicalVerificationModal.tsx`, `OutcomeValidationModal.tsx`.

---

## 4. DATABASE AND API MAPPING (MAPPING DỮ LIỆU & GIAO DIỆN API)

### 4.1 Mock Data Entities (`src/data/mockData.ts` & `src/types.ts`)
* `UserProfile` (`CURRENT_USER`): Hồ sơ kỹ sư trưởng Nguyễn Văn A (KHV, 1,850 điểm, Cấp 4).
* `IncidentItem` (`INCIDENTS_DATA`): 6 ca sự cố công nghiệp hoàn chỉnh (`inc-01` Spindle CNC-04 đến `inc-06` Đứt dây Sodick).
* `ImprovementItem` (`IMPROVEMENTS_DATA`): 2 sáng kiến cải tiến chi tiết (`imp-01` Lọc nước, `imp-02` Gá kẹp).
* `DiscussionItem` (`DISCUSSIONS_DATA`): 4 chủ đề thảo luận có phản hồi chuyên gia.
* `TechnicalDocumentItem` (`TECHNICAL_DOCUMENTS_DATA`): 6 tài liệu tiêu chuẩn Manual, SOP, Sơ đồ điện, Bản vẽ CAD.
* `VendorRankingItem` (`VENDOR_RANKINGS_DATA`): 7 Vendor công nghiệp chính thức.
* `IndividualRankingItem` (`INDIVIDUAL_RANKINGS_DATA`): Top 5 chuyên gia kỹ thuật có điểm số cao nhất.
* `ApprovalQueueItem` (`APPROVAL_QUEUE_DATA`): 5 ca chờ duyệt nội dung đa dạng.
* `LifecycleCase` (`LIFECYCLE_CASES_DATA`): 6 hồ sơ vòng đời trải dài 6 công đoạn.
* `LifecycleAuditEntry` (`LIFECYCLE_AUDIT_LOGS`): Nhật ký kiểm toán bất biến.

### 4.2 Endpoint API Hiện Hữu
* **`POST /api/ai/chat`:** (Định nghĩa tại `vite.config.ts`, hàm `aiChatApiPlugin`):
  * Input: `{ message: string }`
  * Backend SDK: `@google/genai` (GoogleGenAI SDK, Model `gemini-3.8-flash`).
  * System Instruction: Đóng vai Kỹ sư trưởng EDM SMARTGUARD AI, trả lời tiếng Việt có cấu trúc, nêu rõ nguyên nhân gốc, 5 bước kiểm tra và cảnh báo an toàn lao động LOTO.
  * Output: `{ reply: string, source: "gemini-3.8-flash" }` hoặc `{ reply: null, status: "no_api_key" }`.

---

## 5. ROLE AND PERMISSION MATRIX (MA TRẬN PHÂN QUYỀN RBAC)

Được định nghĩa trong `src/types.ts` (`UserRole`) và điều khiển qua menu Role Selector tại `src/components/Header.tsx`:

| Quyền hạn / Thao tác | `technician` | `technical_expert` | `content_approver` | `knowledge_manager` | `ai_admin` | `admin` | `viewer` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Báo sự cố mới (Stage 01) | **X** | **X** | **X** | **X** | — | **X** | — |
| Thực thi quy trình sửa chữa (Stage 05) | **X** | — | — | — | — | **X** | — |
| Thẩm định nguyên nhân & chứng cứ (Stage 02) | — | **X** | — | **X** | — | **X** | — |
| Phê duyệt & Xuất bản SOP (Stage 03) | — | — | **X** | — | — | **X** | — |
| Phân công chuyên gia, điều chỉnh SLA | — | — | — | **X** | — | **X** | — |
| Giám sát RAG & nguồn trích dẫn AI (Stage 04) | — | — | — | — | **X** | **X** | — |
| Đánh giá & Nghiệm thu đóng ca (Stage 06) | — | **X** | — | **X** | — | **X** | — |
| Quản trị hệ thống, tài khoản & bảo mật | — | — | — | — | — | **X** | — |
| Xem thư viện tri thức & tìm kiếm AI | **X** | **X** | **X** | **X** | **X** | **X** | **X** |

---

## 6. AI CAPABILITY AND GOVERNANCE ASSESSMENT (ĐÁNH GIÁ NĂNG LỰC & AN TOÀN AI)

* **Điểm mạnh đã kiểm chứng:**
  * AI sử dụng Gemini 3.8 Flash qua server-side middleware (không để lộ API key phía client).
  * Trợ lý ảo `AIChatBox.tsx` hỗ trợ render Markdown kỹ thuật, checklist tương tác, gợi ý bước xử lý và chuyển trực tiếp hội thoại AI thành Sự cố kỹ thuật mới (`onConvertAiToIncident`).
  * Module `AISearchModule.tsx` đã có giao diện đối soát 8 nguồn tài liệu đã xác thực (`Approved Sources`).
* **Khoảng cách kỹ thuật & Rủi ro an toàn (Technical Debt & Risks):**
  * *Rủi ro trích dẫn (Hallucination Risk):* Hiện tại endpoint `/api/ai/chat` chưa kết nối vector database thực tế (chỉ dùng System Prompt để định hướng câu trả lời); chưa có bộ lọc kiểm tra chéo (Source Verification Gate) ở tầng backend.
  * *Phân quyền tri thức AI:* AI chưa nhận biết vai trò của người hỏi để lọc bỏ các tài liệu nội bộ nhạy cảm giữa các Vendor đối thủ.

---

## 7. MULTI-PLANT & VENDOR SECURITY ASSESSMENT (ĐÁNH GIÁ ĐA NHÀ MÁY & ĐA VENDOR)

* **Hiện trạng kiểm chứng:**
  * Hệ thống hỗ trợ 3 cơ sở nhà máy: `SEV` (Trung tâm), `P1` (Vệ tinh 1), `P2` (Vệ tinh 2).
  * Hệ thống hỗ trợ 7 Vendor đối tác: `KHV`, `KTECH`, `HSTEC`, `DREAM TECH`, `HOJEONGB`, `HOJEONG VINA`, `DAAL`.
  * Bộ lọc phân vùng nhà máy và Vendor hoạt động trơn tru trên `LifecycleModule.tsx`, `RankingModule.tsx` và `DocumentModule.tsx`.
* **Rủi ro rò rỉ dữ liệu (Cross-Vendor Leakage Risk):**
  * Hiện tại việc phân quyền mới nằm ở tầng giao diện UI (Frontend Filtering). Nếu một kỹ thuật viên của Vendor A gửi request, backend cần có Row-Level Security (RLS) hoặc Policy Engine để đảm bảo các tài liệu đánh dấu `scope: internal` của Vendor B không bị truy xuất trái phép.

---

## 8. UX/UI AND RESPONSIVE AUDIT (KIỂM TOÁN GIAO DIỆN & TRẢI NGHIỆM)

* **Thiết kế Industrial Clarity PRO:**
  * Bố cục chuẩn mực công nghiệp, mật độ thông tin cao nhưng cực kỳ khoa học, dễ đọc dưới ánh đèn huỳnh quang xưởng máy.
  * Hệ thống mã màu trạng thái rõ ràng: Xanh lục (Đạt chuẩn, Bình thường), Vàng cam (Cảnh báo, Sắp đến hạn), Đỏ nhấp nháy (Khẩn cấp, Quá hạn SLA), Xanh Cyan/Indigo (Chuyên gia, SOP chuẩn).
* **Chế độ Ca đêm (Night-shift High-Contrast Dark Mode):**
  * Nút chuyển đổi tại Header lưu trạng thái vào `localStorage ('edm_smartguard_theme_mode')`.
  * Lớp phủ `.high-contrast-dark` đảo màu nền sang `#07132c`, viền xanh phản quang dịu mắt, chống lóa khi trực ca đêm 12 tiếng.
* **Hiện trường Di động (Mobile Field Mode):**
  * Nút chuyển đổi "Giao diện hiện trường" tại Header biến đổi toàn bộ giao diện thành dạng thẻ dọc 1 tay, tích hợp Telemetry đo nhiệt độ Spindle tức thời và nút gọi hỗ trợ khẩn cấp.

---

## 9. TARGET ARCHITECTURE GAP ANALYSIS (ĐỐI CHIẾU KIẾN TRÚC MỤC TIÊU A - I)

| Trụ cột Mục tiêu | Hiện trạng Mã nguồn Kiểm chứng | Khoảng cách Kỹ thuật (Gap) | Mức độ Ưu tiên |
| :--- | :--- | :--- | :---: |
| **A. Knowledge Hub** | 9 module hiện hữu hoạt động 100%. | Cần tích hợp cơ chế đồng bộ phiên bản tự động khi có SOP mới. | Trung bình |
| **B. Machine Intelligence** | `MobileFieldModule` có telemetry Spindle. | Cần Master Table `MachineKnowledgeProfile` với mã QR định danh và MTBF/MTTR. | **Cao** |
| **C. Incident & Lifecycle** | `LifecycleModule` hoàn thiện 6 công đoạn & 6 workspaces. | Sẵn sàng; cần kết nối backend persistent DB thay cho in-memory mock. | **Cao** |
| **D. AI Technical Intel** | Trợ lý Gemini 3.8 Flash đã chạy server-side. | Cần nhúng cơ chế Vector Search RAG đối soát trực tiếp vào file PDF/SOP. | **Rất cao** |
| **E. People & Competency** | `RankingModule` có BXH cá nhân & Vendor. | Cần Ma trận kỹ năng xếp bậc (A, B, C) và đề xuất khóa đào tạo tự động. | Trung bình |
| **F. Knowledge Graph** | Giao diện mạng lưới tri thức trong `AnalyticsModule`. | Cần bảng quan hệ có hướng Node-Edge (D3.js Force Directed Graph) có trọng số. | **Cao** |
| **G. Lessons Learned** | Đã định nghĩa trường `lessonsLearned` trong types. | Cần module theo dõi chiến dịch phòng ngừa diện rộng dải máy EDM-01 ~ EDM-08. | Trung bình |
| **H. Intelligence Center** | 8 KPI cards, Bottleneck Matrix trong `LifecycleModule`. | Cần kết nối cảnh báo tự động qua Webhook / Email khi quá hạn SLA. | Trung bình |
| **I. Governance & Security** | Header RBAC Selector có 7 vai trò. | Cần bổ sung token-based authentication và Row-Level Security ở backend. | **Rất cao** |

---

## 10. DEPENDENCY AND RISK REGISTER (DANH MỤC PHỤ THUỘC & RỦI RO)

1. **Rủi ro Phá vỡ Tính tương thích (Breaking Change Risk) — Mức độ: THẤP:**
   * *Biện pháp kiểm soát:* Mọi kiểu dữ liệu mở rộng (`validUntilDate`, `sharingScope`, `standardParam`) đều được cấu hình tùy chọn (`optional ?`), bảo đảm 100% component hiện tại hoạt động bình thường mà không bị crash.
2. **Rủi ro API Key Quá tải / Mất kết nối (Gemini Service Availability) — Mức độ: TRUNG BÌNH:**
   * *Biện pháp kiểm soát:* Middleware `vite.config.ts` đã cài sẵn fallback trả về mã `no_api_key` an toàn; component client `AIChatBox.tsx` có sẵn bộ phản hồi cơ sở dự phòng.
3. **Rủi ro Rò rỉ Tri thức Độc quyền giữa các Vendor — Mức độ: CAO:**
   * *Biện pháp kiểm soát:* Bắt buộc áp dụng trường `sharingScope: 'shared' | 'internal'` ở tầng API và truy vấn SQL có điều kiện `WHERE vendor = user.vendor OR sharing_scope = 'shared'`.

---

## 11. DATA MIGRATION AND BACKWARD COMPATIBILITY STRATEGY (CHIẾN LƯỢC MIGRATION)

* **Nguyên tắc "Additive Schema":**
  * Không xóa bất kỳ cột nào trong cấu trúc `IncidentItem`, `ImprovementItem`, `TechnicalDocumentItem`.
  * 14 bảng mới (`document_versions`, `knowledge_graph_nodes`, `machine_knowledge_profiles`...) chỉ liên kết qua khóa ngoại (`FOREIGN KEY`).
* **Lộ trình Seeding 4 pha:**
  1. *Pha 1 (Catalog Master):* Khởi tạo bảng danh mục `plant_tenants` (SEV, P1, P2) và `machine_knowledge_profiles` (8 máy hiện có).
  2. *Pha 2 (Version Snapshot):* Chuyển toàn bộ 6 tài liệu trong `mockData.ts` thành phiên bản `v1.0` trong `document_versions`.
  3. *Pha 3 (Graph Extraction):* Tự động trích xuất các Node thiết bị, mã lỗi và linh kiện vào `knowledge_graph_nodes`.
  4. *Pha 4 (Dual-Read Switch):* Ứng dụng đọc dữ liệu qua Service Adapter, hỗ trợ fallback 1 chạm về mock data nếu backend DB gặp sự cố.

---

## 12. RECOMMENDED IMPLEMENTATION ROADMAP FOR PHASES 1–12 (LỘ TRÌNH TRIỂN KHAI 12 PHA)

* **PHASE 0 (ĐÃ HOÀN THÀNH):** Kiểm toán toàn diện hệ thống, đánh giá kiến trúc mục tiêu, lập báo cáo phân tích khoảng cách.
* **PHASE 1:** Master Data Engine — Chuẩn hóa danh mục Nhà máy, Vendor, Thiết bị, Mã lỗi và Mã linh kiện.
* **PHASE 2:** Knowledge Lifecycle Engine — Tích hợp quản lý đa phiên bản tài liệu (Diff, Version Rollback) và lịch rà soát hiệu lực định kỳ.
* **PHASE 3:** Knowledge Graph Interactive Visualizer — Xây dựng bản đồ quan hệ đa chiều động trên D3.js Force Simulation.
* **PHASE 4:** Digital Work Instruction Runner — Bộ chạy quy trình sửa chữa tương tác từng bước trên sàn máy với checklist đo kiểm.
* **PHASE 5:** Machine Knowledge Passport — Trang hồ sơ tri thức thiết bị tích hợp QR Code, lịch sử sự cố và chỉ số MTBF/MTTR.
* **PHASE 6:** Technical Competency & Training Matrix — Ma trận năng lực kỹ thuật viên và hệ thống tự động đề xuất khóa học theo mã lỗi máy.
* **PHASE 7:** Enterprise RAG & Vector Intelligence — Kết nối AI với kho tri thức đã kiểm duyệt, đảm bảo trích dẫn nguồn 100%.
* **PHASE 8:** Knowledge Impact Analytics & ROI Engine — Đo lường định lượng chi phí tiết kiệm (VNĐ), tỷ lệ giảm MTTR và tỷ lệ dứt điểm lỗi.
* **PHASE 9:** Multi-Plant & Vendor Tenancy Security — Chính sách bảo mật dữ liệu và phân vùng truy cập tài liệu giữa 7 Vendor.
* **PHASE 10:** AI Document Intelligence (OCR & Deduplication) — Bóc tách bản vẽ kỹ thuật và phát hiện tri thức trùng lặp/mâu thuẫn.
* **PHASE 11:** Lessons Learned & Cross-Plant Rollout — Quản lý bài học kinh nghiệm và chiến dịch lan tỏa phòng ngừa dải máy EDM-01 ~ EDM-08.
* **PHASE 12:** Hardening, E2E Testing, Production Commissioning — Tối ưu hóa hiệu năng, kiểm thử tải và chuyển giao vận hành chính thức.

---

## 13. REGRESSION TEST PLAN (KẾ HOẠCH KIỂM THỬ HỒI QUY)

Để đảm bảo không ảnh hưởng đến bất kỳ tính năng hiện hữu nào:
1. **Kiểm thử Điều hướng Menu (Sidebar & Header):** Xác minh chuyển đổi giữa 10 tab (`incidents`, `docs`, `lifecycle`, `improvement`, `community`, `contributions`, `approval`, `ai-search`, `analytics`, `mobile`) hoạt động tức thời không reload trang.
2. **Kiểm thử Tìm kiếm & Bộ lọc Toàn cục:** Xác minh thanh Search trên Header và các bộ lọc lọc chính xác dữ liệu trong từng phân hệ.
3. **Kiểm thử Trợ lý AI (AIChatBox):** Xác minh mở/đóng hộp chat, gửi câu hỏi, hiển thị bảng SOP định dạng Markdown, nhập giọng nói và tính năng "Tạo sự cố từ gợi ý AI".
4. **Kiểm thử Phê duyệt & Chấm điểm (ApprovalModule):** Xác minh các nút Duyệt, Yêu cầu sửa, Từ chối và cập nhật badge thông báo số lượng trên Sidebar.
5. **Kiểm thử Giao diện Ca đêm (Dark Mode):** Kiểm tra độ tương phản văn bản và viền card khi bật chế độ ca đêm.

---

## 14. EXECUTIVE SUMMARY AND TECHNICAL RECOMMENDATIONS (TỔNG KẾT & KIẾN NGHỊ)

1. **Kết luận Kiểm toán Hiện trạng:**
   Hệ thống **EDM SMARTGUARD AI** hiện tại có nền tảng mã nguồn vô cùng vững chắc:
   * Toàn bộ 9 phân hệ cốt lõi đều đang hoạt động hoàn hảo, không có lỗi runtime hay cú pháp (`tsc --noEmit` đạt 0 lỗi).
   * Module `LifecycleModule` đã hoàn thiện giao diện điều hành 6 công đoạn và 6 Workspace Shells.
   * Giao diện Industrial Clarity PRO và chế độ Ca đêm đã đạt tiêu chuẩn thẩm mỹ công nghiệp cao cấp.
2. **Kiến nghị Kỹ thuật cho Bước Tiếp theo:**
   * Giữ vững nguyên tắc **Zero Disruption** trong suốt quá trình nâng cấp.
   * Ưu tiên triển khai theo lộ trình tuần tự từng Pha (bắt đầu từ **Phase 1: Master Data Engine & Backend Foundation**).
   * **DỪNG LẠI TẠI ĐÂY THEO ĐÚNG NGUYÊN TẮC PHASE 0: Chờ phê duyệt chính thức từ Quý Quản lý/Khách hàng trước khi tiến hành viết code Phase 1.**
