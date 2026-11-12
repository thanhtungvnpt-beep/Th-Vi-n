# EDM SMARTGUARD AI — TECHNICAL KNOWLEDGE HUB
## DATABASE SCHEMA AUDIT REPORT: CURRENT MOCK DATA VS. 20 EXPANSION ENTITY GROUPS

**Tài liệu:** Báo cáo Đối chiếu & Đánh giá Cấu trúc Cơ sở Dữ liệu (Schema Audit Report)  
**Phiên bản:** 2.1 • **Ngày lập:** 11/11/2026  
**Mục tiêu:** Rà soát toàn diện giữa các cấu trúc Mock Data hiện tại (`src/data/mockData.ts`, `src/types.ts`) với 20 nhóm thực thể (Entity Groups) theo yêu cầu của 10 Module mở rộng; xác định chính xác các trường hợp **BẮT BUỘC TẠO BẢNG MỚI (Strictly Necessary New Tables)** và các trường hợp **TỐI ƯU BẰNG CÁCH MỞ RỘNG KIỂU DỮ LIỆU HIỆN HỮU (Extend Existing Types)**.

---

### I. BẢNG TỔNG HỢP PHÂN LOẠI 20 NHÓM THỰC THỂ (EXECUTIVE MATRIX)

| STT | Nhóm thực thể (Entity Group) | Phân hệ (Module) | Phân loại Kiến trúc | Thực thể Hiện có Đối chiếu | Rationale / Lý do kỹ thuật |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **01** | `document_versions` | M01: Knowledge Lifecycle | **BẮT BUỘC TẠO BẢNG MỚI** | `TechnicalDocumentItem` | Quan hệ 1:N; mỗi tài liệu có nhiều bản sửa đổi, diff patch, người duyệt độc lập và rollback lịch sử. |
| **02** | `lifecycle_review_schedules` | M01: Knowledge Lifecycle | **MỞ RỘNG KIỂU HIỆN CÓ** | `TechnicalDocumentItem` | Quan hệ 1:1; chỉ cần bổ sung `validUntilDate`, `reviewScheduledDate`, `reviewStatus` vào tài liệu. |
| **03** | `knowledge_graph_nodes` | M02: Knowledge Graph | **BẮT BUỘC TẠO BẢNG MỚI** | — | Thực thể Graph đa hình (Equipment, ErrorCode, Symptom, SOP) với cấu trúc đồ thị động. |
| **04** | `knowledge_graph_edges` | M02: Knowledge Graph | **BẮT BUỘC TẠO BẢNG MỚI** | — | Quan hệ M:N có trọng số (`weight`, `proven_frequency`) phục vụ truy vấn đệ quy/DFS/BFS. |
| **05** | `work_instruction_steps` | M03: Digital Work Instruction | **MỞ RỘNG KIỂU HIỆN CÓ** | `IncidentItem.steps` | Đã tồn tại mảng `steps` trong `IncidentItem`; chỉ cần chuẩn hóa thêm `toolRequirements` và `standardParam`. |
| **06** | `work_instruction_executions` | M03: Digital Work Instruction | **BẮT BUỘC TẠO BẢNG MỚI** | — | Quan hệ 1:N; kỹ thuật viên thực thi nhiều lần trên nhiều ca máy với telemetry và thời lượng thực tế khác nhau. |
| **07** | `machine_knowledge_profiles` | M04: Machine Profile | **BẮT BUỘC TẠO BẢNG MỚI** | `machineId` (chuỗi rời rạc) | Cần bảng chủ (Master Entity) quản lý QR code, MTBF, MTTR, lý lịch tích lũy thay vì chuỗi string rời rạc. |
| **08** | `machine_component_assets` | M04: Machine Profile | **BẮT BUỘC TẠO BẢNG MỚI** | — | Cây linh kiện phụ tùng (Spindle, Ball-screw, Servo) có vòng đời khấu hao và mã phụ tùng riêng biệt. |
| **09** | `technician_competency_matrix` | M05: Competency & Training | **BẮT BUỘC TẠO BẢNG MỚI** | `UserProfile` | Quan hệ 1:N; 1 nhân sự có nhiều kỹ năng với xếp bậc độc lập (A, B+, B, C) theo tiêu chuẩn nhà máy. |
| **10** | `training_course_enrollments` | M05: Competency & Training | **BẮT BUỘC TẠO BẢNG MỚI** | — | Quản lý khóa học được đề xuất từ mã lỗi máy, tiến độ học, điểm thi và cấp chứng nhận. |
| **11** | `ai_diagnosis_sessions` | M06: AI Technical Assistant | **BẮT BUỘC TẠO BẢNG MỚI** | LocalStorage chat | Dữ liệu phiên hỏi đáp kỹ thuật, trích xuất nguyên nhân và phản hồi hữu ích (helpful) để fine-tune. |
| **12** | `ai_citation_sources` | M06: AI Technical Assistant | **MỞ RỘNG KIỂU HIỆN CÓ** | `ai_diagnosis_sessions` (JSONB) | Lưu trữ dưới dạng mảng JSONB `citations[]` lồng trực tiếp trong phiên chẩn đoán AI; không cần bảng con. |
| **13** | `knowledge_impact_metrics` | M07: Impact Analytics | **MỞ RỘNG KIỂU HIỆN CÓ** | `LifecycleCase.outcomeValidation` | Đã có trường `outcomeValidation` trong `LifecycleCase`; bổ sung thêm tỷ lệ MTTR và chi phí tiết kiệm. |
| **14** | `plant_benchmark_stats` | M07: Impact Analytics | **BẮT BUỘC TẠO BẢNG MỚI** | — | Dữ liệu tổng hợp theo chu kỳ thời gian (Monthly Aggregate OLAP) phục vụ so sánh giữa các nhà máy SEV, P1, P2. |
| **15** | `plant_tenants` | M08: Multi-Plant Knowledge | **BẮT BUỘC TẠO BẢNG MỚI** | `factory` (chuỗi rời rạc) | Bảng Master Tenant quản lý danh mục nhà máy, hạn mức máy và phân vùng dữ liệu. |
| **16** | `vendor_knowledge_scopes` | M08: Multi-Plant Knowledge | **MỞ RỘNG KIỂU HIỆN CÓ** | `TechnicalDocumentItem` | Chỉ cần bổ sung 2 trường `sharingScope: 'shared' | 'internal'` và `authorizedVendors: string[]`. |
| **17** | `ocr_extracted_documents` | M09: AI Document Intelligence | **BẮT BUỘC TẠO BẢNG MỚI** | — | Hàng đợi tác vụ bất đồng bộ (Async Pipeline) lưu trữ văn bản bóc tách, tọa độ bounding box và trạng thái kiểm duyệt. |
| **18** | `duplicate_detection_records` | M09: AI Document Intelligence | **BẮT BUỘC TẠO BẢNG MỚI** | `LifecycleQualityAlert` | Lưu trữ ma trận đối sánh tương đồng Cosine, cảnh báo mâu thuẫn thông số giữa 2 tài liệu. |
| **19** | `lessons_learned_records` | M10: Prevention & Lessons | **MỞ RỘNG KIỂU HIỆN CÓ** | `IncidentItem` / `LifecycleCase` | Mở rộng trường `lessonsLearned: { keyTakeaways: string[], preventiveActions: string[] }`. |
| **20** | `cross_plant_rollout_actions` | M10: Prevention & Lessons | **BẮT BUỘC TẠO BẢNG MỚI** | — | Quản trị tiến độ triển khai phòng ngừa diện rộng trên dải thiết bị tương đồng (`EDM-01 ~ EDM-08`). |

---

### II. ĐỐI CHIẾU CHI TIẾT THEO TỪNG MIỀN DỮ LIỆU

---

#### PHÂN HỆ 1: QUẢN LÝ VÒNG ĐỜI TRI THỨC (KNOWLEDGE LIFECYCLE)

##### Thực thể 01: `document_versions`
* **Hiện trạng trong mockData.ts:** `TECHNICAL_DOCUMENTS_DATA` chỉ có một trường string tĩnh `version: 'v2.4'` và `updatedAt: '15/01/2025'`. Không lưu lại nội dung bản `v1.0` hay `v2.0` trước đó.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Khi người dùng muốn xem lại nội dung lịch sử hoặc so sánh diff giữa 2 phiên bản (Version Comparison), hệ thống không thể chỉ dựa vào 1 bản ghi duy nhất. Bảng con `document_versions` (1:N với `technical_documents`) lưu trữ snapshot `content_payload`, `diff_patch` và chữ ký số người duyệt là yêu cầu bắt buộc của kiểm toán công nghiệp.

##### Thực thể 02: `lifecycle_review_schedules`
* **Hiện trạng trong mockData.ts:** `LIFECYCLE_CASES_DATA` đã có `publishedArticle.validUntilDate` và `reviewScheduledDate`.
* **Đánh giá:** **MỞ RỘNG KIỂU HIỆN CÓ** (Không tạo bảng mới).
* **Giải pháp tối ưu:** Mở rộng trực tiếp vào `TechnicalDocumentItem`:
  ```typescript
  // Mở rộng trực tiếp TechnicalDocumentItem
  validUntilDate?: string;      // '12/01/2026'
  reviewScheduledDate?: string; // '12/07/2025'
  reviewStatus?: 'valid' | 'review_pending' | 'expired';
  assignedReviewer?: string;
  ```
* **Lợi ích:** Tránh việc phải `JOIN` thêm 1 bảng chỉ để lấy ngày hết hạn hiệu lực khi hiển thị danh sách tài liệu.

---

#### PHÂN HỆ 2: BẢN ĐỒ LIÊN KẾT TRI THỨC (KNOWLEDGE GRAPH)

##### Thực thể 03 & 04: `knowledge_graph_nodes` & `knowledge_graph_edges`
* **Hiện trạng trong mockData.ts:** Các liên kết giữa sự cố `inc-01`, máy `CNC-04`, mã lỗi `E210` và tài liệu `doc-101` hiện đang được thể hiện qua các mảng ID lồng nhau (`similar`, `documents`).
* **Đánh giá:** **BẮT BUỘC TẠO 2 BẢNG MỚI**.
* **Lý do kỹ thuật:** Để trực quan hóa đồ thị mạng nhện (Network Graph trên D3.js force-directed layout) và thực hiện truy vấn đa tầng (`Máy EDM-04` → `Lỗi E210` → `Hiện tượng Spindle quá nhiệt` → `Nguyên nhân Hệ làm mát` → `Quy trình kiểm tra` → `SOP`), hệ thống bắt buộc cần cấu trúc Node-Edge có hướng, lưu trữ trọng số tương quan và tần suất lặp lại thực tế.

---

#### PHÂN HỆ 3: HƯỚNG DẪN SỬA CHỮA TƯƠNG TÁC (DIGITAL WORK INSTRUCTION)

##### Thực thể 05: `work_instruction_steps`
* **Hiện trạng trong mockData.ts:** `IncidentItem.steps` và `LifecycleCase.inspectionSteps` đã có cấu trúc:
  ```typescript
  steps: { number: number; title: string; image: string; isPassed?: boolean }[];
  ```
* **Đánh giá:** **MỞ RỘNG KIỂU HIỆN CÓ** (Không tạo bảng mới).
* **Giải pháp tối ưu:** Bổ sung thêm các trường tham số đo kiểm vào interface `steps` hiện tại:
  ```typescript
  export interface WorkInstructionStep {
    number: number;
    title: string;
    description?: string;
    image: string;
    videoUrl?: string;
    toolRequirements?: string[]; // ['Cờ lê lực 25Nm', 'Lọc tinh 10µm']
    safetyAlert?: string;        // 'Gắn thẻ LOTO ngắt nguồn điện'
    parameter?: string;          // 'Lưu lượng nước'
    standard?: string;           // '>= 12 L/phút'
    actual?: string;             // '13.2 L/phút'
    isPassed?: boolean;
  }
  ```

##### Thực thể 06: `work_instruction_executions`
* **Hiện trạng trong mockData.ts:** `LifecycleCase.applicationRecord` mới chỉ lưu 1 bản ghi áp dụng gần nhất.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Khi một quy trình SOP được ban hành, có hàng chục kỹ thuật viên ở nhiều ca máy khác nhau áp dụng quy trình này. Cần bảng riêng `work_instruction_executions` để lưu nhật ký checklist thời gian thực, người thực hiện, thời gian dừng máy và các phát sinh thực tế.

---

#### PHÂN HỆ 4: HỒ SƠ TRI THỨC THIẾT BỊ (MACHINE KNOWLEDGE PROFILE)

##### Thực thể 07: `machine_knowledge_profiles`
* **Hiện trạng trong mockData.ts:** `machineId` xuất hiện dưới dạng chuỗi string rời rạc trong `IncidentItem`, `ImprovementItem`, `DiscussionItem` (ví dụ: `'CNC-04'`, `'EDM-04'`). Không có bảng quản lý danh mục máy tổng thể.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Cần một Master Table lưu trữ mã QR Code băm (`qr_code_hash`), ngày đưa vào vận hành, tổng số ca sự cố tích lũy, MTBF, MTTR và điểm sức khỏe thiết bị (`health_score`).

##### Thực thể 08: `machine_component_assets`
* **Hiện trạng trong mockData.ts:** Chưa có cấu trúc quản lý linh kiện theo cây cấu trúc máy.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Cần bóc tách cấu trúc máy thành các cụm module con (Cụm Spindle, Bàn máy trục X/Y, Cụm cấp dây cắt, Bơm tuần hoàn) để liên kết chính xác với mã phụ tùng thay thế và tài liệu tháo lắp.

---

#### PHÂN HỆ 5: ĐÀO TẠO & NĂNG LỰC KỸ THUẬT (COMPETENCY & TRAINING)

##### Thực thể 09: `technician_competency_matrix`
* **Hiện trạng trong mockData.ts:** `UserProfile` chỉ có `level: 'Cấp 4'` và `points: 1850`.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Ma trận kỹ năng là quan hệ 1:N phức tạp giữa Kỹ thuật viên với nhiều mảng chuyên môn (Vận hành EDM, Xử lý mã lỗi, Bảo trì Spindle, Căn chỉnh độ chính xác). Mỗi kỹ năng có mức yêu cầu (Required Level) và năng lực thực tế (Current Level: Bậc A, B, C) kèm đánh giá Đạt/Chưa đạt.

##### Thực thể 10: `training_course_enrollments`
* **Hiện trạng trong mockData.ts:** Chưa có cấu trúc theo dõi khóa học.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Để thực hiện tính năng "Tự động đề xuất khóa đào tạo dựa trên lỗi máy thường gặp" (ví dụ: Kỹ thuật viên gặp lỗi E210 Spindle chưa đạt chuẩn C+ -> Đề xuất khóa `EDM-MT-02`), cần bảng theo dõi trạng thái đề xuất, thời lượng (4 giờ), điểm kiểm tra và chứng nhận hoàn thành.

---

#### PHÂN HỆ 6: AI TRỢ LÝ KỸ THUẬT & TRÍCH DẪN (AI TECHNICAL ASSISTANT)

##### Thực thể 11: `ai_diagnosis_sessions`
* **Hiện trạng trong mockData.ts:** Tin nhắn hội thoại AI hiện lưu tạm thời trong `localStorage`.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI** (Khi chuyển sang Backend DB).
* **Lý do kỹ thuật:** Cần lưu lại lịch sử chẩn đoán của toàn bộ xưởng để thống kê tần suất lỗi được hỏi nhiều nhất và lưu trữ phản hồi của kỹ thuật viên (`helpful` / `unhelpful`) phục vụ tối ưu hóa mô hình RAG.

##### Thực thể 12: `ai_citation_sources`
* **Hiện trạng trong mockData.ts:** Đã có trường `aiRecommendation.sourceKnowledgeId` trong `LifecycleCase`.
* **Đánh giá:** **MỞ RỘNG KIỂU HIỆN CÓ** (Không tạo bảng mới).
* **Giải pháp tối ưu:** Nhúng danh sách trích dẫn trực tiếp dưới dạng trường mảng JSONB trong `ai_diagnosis_sessions`:
  ```typescript
  citations: {
    documentId: string;
    version: string;
    confidenceScore: number;
    sectionTitle: string;
  }[];
  ```
* **Lợi ích:** Giảm tải thao tác `JOIN` nhiều bảng, tăng tốc độ phản hồi của API Stream hội thoại AI.

---

#### PHÂN HỆ 7: ĐO LƯỜNG HIỆU QUẢ ỨNG DỤNG (IMPACT ANALYTICS)

##### Thực thể 13: `knowledge_impact_metrics`
* **Hiện trạng trong mockData.ts:** `LifecycleCase.outcomeValidation` đã chứa:
  ```typescript
  outcomeValidation: {
    operatingStabilityHours: number;
    recurrenceObserved: boolean;
    mttrActualHours: number;
    costSavingVND: number;
    validationNotes: string;
  };
  ```
* **Đánh giá:** **MỞ RỘNG KIỂU HIỆN CÓ** (Không tạo bảng mới).
* **Giải pháp tối ưu:** Bổ sung thêm các chỉ số đối sánh trực tiếp vào kiểu `OutcomeValidationData`:
  ```typescript
  baselineMttrHours?: number;       // 4.8h
  actualMttrHours?: number;         // 3.0h (-37.5%)
  recurrenceRateBaseline?: number;  // 7.2%
  recurrenceRateActual?: number;    // 4.2% (-41.6%)
  costSavingVND?: number;           // 35,000,000 VNĐ
  ```

##### Thực thể 14: `plant_benchmark_stats`
* **Hiện trạng trong mockData.ts:** Chưa có bảng lưu trữ tổng hợp thống kê theo tháng của từng nhà máy.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Bảng tổng hợp số liệu OLAP theo chu kỳ (Reporting Month) phục vụ vẽ biểu đồ đối sánh giữa SEV, P1, P2 mà không phải quét toàn bộ bảng sự cố hàng triệu bản ghi.

---

#### PHÂN HỆ 8: ĐA NHÀ MÁY & ĐA VENDOR (MULTI-PLANT & VENDOR KNOWLEDGE)

##### Thực thể 15: `plant_tenants`
* **Hiện trạng trong mockData.ts:** `factory` chỉ là chuỗi string literal `'SEV' | 'P1' | 'P2'`.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Cần một Master Table lưu tên chính thức, địa chỉ, trung tâm hub và phân cấp quản lý để tránh lỗi nhập liệu chuỗi tự do.

##### Thực thể 16: `vendor_knowledge_scopes`
* **Hiện trạng trong mockData.ts:** `TechnicalDocumentItem` đã có trường `vendor`.
* **Đánh giá:** **MỞ RỘNG KIỂU HIỆN CÓ** (Không tạo bảng mới).
* **Giải pháp tối ưu:** Thêm 2 trường vào `TechnicalDocumentItem`:
  ```typescript
  sharingScope?: 'shared' | 'internal'; // Chia sẻ toàn bộ hay nội bộ
  authorizedVendors?: string[];         // ['KHV', 'KTECH']
  ```

---

#### PHÂN HỆ 9: AI DOCUMENT INTELLIGENCE (OCR & PHÂN TÍCH TÀI LIỆU)

##### Thực thể 17: `ocr_extracted_documents`
* **Hiện trạng trong mockData.ts:** Chưa có bảng lưu trữ hàng đợi và kết quả trích xuất OCR.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Quá trình OCR bản vẽ kỹ thuật là tác vụ xử lý bất đồng bộ nặng. Cần lưu trữ JSON payload chứa tọa độ bounding box, bảng thông số RPM, danh mục linh kiện trích xuất và trạng thái người dùng bấm xác nhận đưa vào thư viện.

##### Thực thể 18: `duplicate_detection_records`
* **Hiện trạng trong mockData.ts:** `LIFECYCLE_QUALITY_ALERTS` mới chỉ có thông báo đơn lẻ.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Cần bảng chuyên dụng lưu trữ cặp tài liệu đối sánh (`source_id`, `duplicate_id`), điểm tương đồng Cosine (88%) và trạng thái giải quyết xung đột thông số kỹ thuật.

---

#### PHÂN HỆ 10: BÀI HỌC KINH NGHIỆM & PHÒNG NGỪA (LESSONS LEARNED & PREVENTION)

##### Thực thể 19: `lessons_learned_records`
* **Hiện trạng trong mockData.ts:** `IncidentItem` đã có trường `rootCauses` và `steps`.
* **Đánh giá:** **MỞ RỘNG KIỂU HIỆN CÓ** (Không tạo bảng mới).
* **Giải pháp tối ưu:** Bổ sung cấu trúc bài học kinh nghiệm vào `IncidentItem` hoặc `LifecycleCase`:
  ```typescript
  lessonsLearned?: {
    summary: string;
    keyTakeaways: string[];
    preventiveChecklist: string[];
  };
  ```

##### Thực thể 20: `cross_plant_rollout_actions`
* **Hiện trạng trong mockData.ts:** `ImprovementItem.appliedScope` mới chỉ lưu danh sách máy đơn giản.
* **Đánh giá:** **BẮT BUỘC TẠO BẢNG MỚI**.
* **Lý do kỹ thuật:** Quản lý chiến dịch triển khai giải pháp phòng ngừa diện rộng cho cả dải máy tương đồng (`EDM-01 ~ EDM-08`), theo dõi tiến độ hoàn thành từng máy (100%), ngày nghiệm thu và đo lường độ sụt giảm thời gian dừng máy (-40%) và tỷ lệ tái diễn (-63%).

---

### III. BẢNG TỔNG KẾT TÁC ĐỘNG KIẾN TRÚC (ARCHITECTURAL IMPACT)

```
Tổng số nhóm thực thể yêu cầu: 20
├── Bắt buộc tạo bảng mới (Strictly Necessary Tables): 14 BẢNG
│   ├── Nhóm 01: document_versions (Lịch sử & so sánh phiên bản)
│   ├── Nhóm 03: knowledge_graph_nodes (Đối tượng đồ thị tri thức)
│   ├── Nhóm 04: knowledge_graph_edges (Quan hệ đồ thị tri thức)
│   ├── Nhóm 06: work_instruction_executions (Nhật ký thực thi sàn máy)
│   ├── Nhóm 07: machine_knowledge_profiles (Hồ sơ máy & mã QR)
│   ├── Nhóm 08: machine_component_assets (Cây linh kiện máy)
│   ├── Nhóm 09: technician_competency_matrix (Ma trận kỹ năng kỹ thuật)
│   ├── Nhóm 10: training_course_enrollments (Khóa học đề xuất tự động)
│   ├── Nhóm 11: ai_diagnosis_sessions (Phiên chẩn đoán AI)
│   ├── Nhóm 14: plant_benchmark_stats (Thống kê đối sánh nhà máy)
│   ├── Nhóm 15: plant_tenants (Danh mục nhà máy Tenant)
│   ├── Nhóm 17: ocr_extracted_documents (Kết quả bóc tách OCR)
│   ├── Nhóm 18: duplicate_detection_records (Phát hiện trùng lặp & xung đột)
│   └── Nhóm 20: cross_plant_rollout_actions (Chiến dịch phòng ngừa diện rộng)
│
└── Tối ưu bằng cách mở rộng kiểu dữ liệu hiện có (Extend Existing Types): 6 THỰC THỂ
    ├── Nhóm 02: lifecycle_review_schedules ──► Mở rộng TechnicalDocumentItem
    ├── Nhóm 05: work_instruction_steps    ──► Mở rộng IncidentItem.steps
    ├── Nhóm 12: ai_citation_sources       ──► Nhúng JSONB vào ai_diagnosis_sessions
    ├── Nhóm 13: knowledge_impact_metrics   ──► Mở rộng LifecycleCase.outcomeValidation
    ├── Nhóm 16: vendor_knowledge_scopes    ──► Mở rộng TechnicalDocumentItem
    └── Nhóm 19: lessons_learned_records   ──► Mở rộng LifecycleCase / IncidentItem
```

---

### IV. KẾT LUẬN & KIẾN NGHỊ TRIỂN KHAI

1. **Hiệu quả tối ưu hóa:** Bằng việc nhận diện chính xác 6 nhóm thực thể có thể mở rộng trực tiếp trên các kiểu dữ liệu hiện hữu, chúng ta giảm bớt **30% số lượng bảng phụ**, tránh các phép `JOIN` không cần thiết và loại bỏ nguy cơ làm phân mảnh mô hình dữ liệu.
2. **Bảo tồn tính toàn vẹn:** 14 bảng mới được tạo ra đều giải quyết các quan hệ 1:N thực sự, các thực thể độc lập (Graph, Machine Profile, Competency, OCR Pipeline, Rollout Campaign) mà không làm biến đổi cấu trúc các bảng đang hoạt động của hệ thống.
3. **Tính sẵn sàng:** Bản audit report này là căn cứ kỹ thuật chuẩn xác để đội ngũ kỹ thuật tiến hành tạo các schema migration script trên PostgreSQL/Cloud SQL một cách an toàn và tin cậy.
