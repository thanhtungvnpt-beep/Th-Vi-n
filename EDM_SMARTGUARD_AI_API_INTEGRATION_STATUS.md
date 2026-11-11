# EDM SMARTGUARD AI — API INTEGRATION & DATA CONTRACT SPECIFICATION
**Tài liệu Đặc tả Giao thức Kết nối API, Mô hình Dữ liệu và Tích hợp Trí tuệ Nhân tạo**

---

## 1. TỔNG QUAN KIẾN TRÚC TÍCH HỢP

Hệ thống **EDM SMARTGUARD AI** được xây dựng theo mô hình Full-Stack hướng dịch vụ (Service-Oriented Architecture), cho phép giao diện ứng dụng (React 19 SPA) tương tác với máy chủ ứng dụng trung gian (Express 4 backend / `server.ts`) và các dịch vụ trí tuệ nhân tạo điện toán biên (Google AI Studio Gemini API).

```
+-------------------------------------------------------------+
|                  Client: React 19 SPA                        |
|  (8 Phân hệ Kỹ thuật + Chế độ Hiện trường + Quản trị RBAC)   |
+------------------------------+------------------------------+
                               | RESTful HTTP / JSON
                               v
+-------------------------------------------------------------+
|               Application Server: Express 4                 |
|             (Port 3000 / Tầng proxy bảo mật API)             |
+---------------+-----------------------------+---------------+
                |                             |
                v                             v
+-------------------------------+ +---------------------------+
|  Cơ sở Dữ liệu & Lưu trữ      | |  Google Gemini 2.5 Flash  |
|  - Kho tri thức xác thực      | |  (@google/genai SDK v2)   |
|  - Lịch sử ca lỗi & cải tiến  | |  - RAG Grounding          |
|  - Điểm thưởng 7 Vendor       | |  - Phân tích nguyên nhân  |
+-------------------------------+ +---------------------------+
```

---

## 2. DANH MỤC API ENDPOINTS & HỢP ĐỒNG DỮ LIỆU (DATA CONTRACTS)

### 2.1. Phân hệ Xử lý Sự cố (Incident Troubleshooting API)
- **`GET /api/incidents`**
  - **Mô tả:** Lấy danh sách ca sự cố kèm bộ lọc.
  - **Query Params:** `category`, `vendor`, `model`, `errorCode`, `status`, `page`, `limit`
  - **Response (200 OK):**
    ```json
    {
      "total": 1376,
      "verifiedCount": 1142,
      "pendingCount": 152,
      "data": [
        {
          "id": "inc-001",
          "title": "Spindle quá nhiệt (E210)",
          "machineCode": "CNC-04",
          "model": "M-V800",
          "vendor": "Mitsubishi",
          "status": "verified",
          "likes": 186,
          "views": 2580,
          "updatedAt": "2025-01-15T08:30:00Z"
        }
      ]
    }
    ```
- **`GET /api/incidents/:id`**
  - **Mô tả:** Lấy thông tin chi tiết ca sự cố bao gồm hiện tượng, nguyên nhân, sơ đồ 5 bước và tài liệu liên quan.
- **`POST /api/incidents`**
  - **Mô tả:** Kỹ thuật viên báo cáo sự cố mới phát sinh tại xưởng.
- **`POST /api/incidents/:id/like`**
  - **Mô tả:** Tăng lượt đánh giá hữu ích của kỹ sư xưởng.

---

### 2.2. Phân hệ Quản lý Cải tiến Kỹ thuật (Kaizen Improvement API)
- **`GET /api/improvements`**
  - **Mô tả:** Lấy danh sách sáng kiến cải tiến kỹ thuật.
  - **Response (200 OK):**
    ```json
    {
      "total": 326,
      "appliedCount": 278,
      "verifiedCount": 187,
      "featuredCount": 12,
      "data": [
        {
          "id": "imp-001",
          "title": "Cải tiến hệ thống lọc dung dịch EDM giúp giảm lỗi bề mặt",
          "equipment": "EDM-04",
          "line": "Line A",
          "factory": "Factory 1",
          "status": "applied",
          "metrics": [
            { "label": "Tỷ lệ lỗi bề mặt", "before": "4.8%", "after": "1.2%", "delta": "-75%" },
            { "label": "Chu kỳ thay lọc", "before": "7 ngày", "after": "30 ngày", "delta": "+4.3 lần" },
            { "label": "Thời gian vệ sinh", "before": "60 phút", "after": "20 phút", "delta": "-67%" }
          ],
          "author": { "name": "Trần Văn Minh", "pointsAwarded": 30 }
        }
      ]
    }
    ```

---

### 2.3. Phân hệ Tổng hợp Tri thức & Đồ thị (Knowledge Analytics API)
- **`GET /api/analytics/summary`**
  - **Mô tả:** Cung cấp số liệu tổng quan, biểu đồ donut, biểu đồ cột thiết bị và xu hướng 6 tháng gần nhất.
- **`GET /api/analytics/knowledge-map`**
  - **Mô tả:** Cung cấp đồ thị phân bổ mạng lưới tri thức kết nối đa chiều giữa Thiết bị, Model, Vendor và Tài liệu.

---

### 2.4. Phân hệ Cộng đồng Kỹ thuật (Technical Community API)
- **`GET /api/community/discussions`**
  - **Query Params:** `topic`, `solved`, `search`
- **`POST /api/community/discussions/:id/accept-solution`**
  - **Mô tả:** Đánh dấu giải pháp được chấp nhận và cộng điểm thưởng cho kỹ sư hỗ trợ.

---

### 2.5. Phân hệ Phê duyệt Tri thức (Content Approval Workflow API)
- **`GET /api/approvals/queue`**
  - **Mô tả:** Lấy danh sách 56 nội dung trong hàng đợi thẩm định.
- **`POST /api/approvals/:id/review`**
  - **Payload:**
    ```json
    {
      "rating": 5,
      "checklist": {
        "phenomenonClear": true,
        "evidenceValid": true,
        "procedureStandardized": true,
        "resultMeasurable": true
      },
      "decision": "approve", // hoặc "request_edits" | "reject"
      "comments": "Quy trình kiểm tra đầy đủ, ảnh chụp minh chứng rõ ràng."
    }
    ```

---

### 2.6. Phân hệ Đóng góp & Bảng Xếp hạng 7 Nhà thầu (Ranking API)
- **`GET /api/rankings/vendors`**
  - **Mô tả:** Danh sách xếp hạng 7 đối tác cung cấp dịch vụ & thiết bị:
    1. **KHV** (12,450 pts)
    2. **KTECH** (9,820 pts)
    3. **HSTEC** (8,450 pts)
    4. **DREAM TECH** (7,920 pts)
    5. **HOJEONGB** (6,310 pts)
    6. **HOJEONG VINA** (5,400 pts)
    7. **DAAL** (4,280 pts)
- **`GET /api/rankings/technicians`**
  - **Mô tả:** Bảng xếp hạng thành tích kỹ thuật viên nội bộ.

---

### 2.7. Phân hệ Thư viện Tài liệu Kỹ thuật (Document Library API)
- **`GET /api/documents`**
  - **Query Params:** `type` (Manual | SOP | ElectricalDiagram | Drawing | Maintenance), `vendor`
- **`GET /api/documents/:id/download`**
  - **Mô tả:** Tải xuống tài liệu PDF kỹ thuật.

---

## 3. KIẾN TRÚC TÍCH HỢP GOOGLE GEMINI AI (SERVER-SIDE RAG)

### 3.1. Cấu hình SDK & Bảo mật Khóa API
- **Thư viện chuẩn:** `@google/genai` (TypeScript SDK v2.4.0)
- **Quy tắc an toàn:** Tuyệt đối không để lộ biến môi trường `GEMINI_API_KEY` ra giao diện Client. Mọi cuộc gọi sinh nội dung và chẩn đoán sự cố đều được điều hướng qua route an toàn `POST /api/ai/diagnose` tại `server.ts`.

### 3.2. Cấu trúc Prompt Kỹ thuật Công nghiệp (System Prompt)
```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

export async function diagnoseIncident(query: string, contextKnowledge: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'system',
        parts: [{
          text: `Bạn là Kỹ sư Trưởng chuyên gia Hệ thống EDM SMARTGUARD AI tại nhà máy cơ khí chính xác.
Nhiệm vụ của bạn là chẩn đoán sự cố máy gia công tia lửa điện (EDM), trung tâm gia công CNC và cánh tay Robot.
Yêu cầu bắt buộc:
1. Chỉ sử dụng thông tin kỹ thuật đã được xác nhận (Verified SOP).
2. Trả về câu trả lời có cấu trúc 5 bước thao tác kèm cảnh báo an toàn điện/nước làm mát.
3. Không phỏng đoán các lỗi chưa rõ ràng.`
        }]
      },
      {
        role: 'user',
        parts: [{ text: `Truy vấn: ${query}\nNguồn tri thức tham chiếu:\n${contextKnowledge}` }]
      }
    ],
    config: {
      temperature: 0.2, // Độ tin cậy và chính xác cao
      maxOutputTokens: 1024
    }
  });

  return response.text;
}
```

---

## 4. TRẠNG THÁI HIỆN TẠI & LỘ TRÌNH TRIỂN KHAI THỰC TẾ

| Thành phần tích hợp | Trạng thái kỹ thuật | Khả năng mở rộng Production |
| :--- | :---: | :--- |
| **Giao diện Client (React 19)** | **100% Hoàn chỉnh** | Kết nối trực tiếp vào các Endpoint thông qua mock service hoặc live API |
| **Tầng Dữ liệu Thống nhất (Data Layer)** | **100% Khớp nối** | Cấu trúc dữ liệu chuẩn hóa, sẵn sàng đồng bộ vào PostgreSQL / Firestore |
| **Server Backend (Express 4)** | **Sẵn sàng** | Tệp `server.ts` cấu hình đầy đủ CORS, JSON Parser, proxy AI và routes |
| **AI Studio Gemini API** | **Đã kích hoạt** | Cấu hình cấp quyền `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` |

Hệ thống được thiết kế mở, bảo đảm tính sẵn sàng 100% cho cả môi trường chạy thử nghiệm tại AI Studio và triển khai lên hạ tầng máy chủ công nghiệp thực tế.
