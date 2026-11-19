import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

const MAX_BODY_BYTES = 1024 * 1024; // 1 MB

function sendJson(res: ServerResponse, statusCode: number, payload: Record<string, unknown>) {
  if (res.headersSent) return;
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function createAiChatMiddleware() {
  return (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Allow', 'POST, OPTIONS');
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST, OPTIONS');
      sendJson(res, 405, { reply: null, error: 'Method not allowed' });
      return;
    }

    const chunks: Buffer[] = [];
    let totalBytes = 0;
    let aborted = false;

    req.on('error', (err) => {
      aborted = true;
      sendJson(res, 400, { reply: null, error: err?.message || 'Request stream error' });
    });

    req.on('data', (chunk: Buffer | string) => {
      if (aborted) return;
      const buf = typeof chunk === 'string' ? Buffer.from(chunk, 'utf8') : chunk;
      totalBytes += buf.length;
      if (totalBytes > MAX_BODY_BYTES) {
        aborted = true;
        sendJson(res, 413, { reply: null, error: 'Payload too large' });
        req.destroy();
        return;
      }
      chunks.push(buf);
    });

    req.on('end', async () => {
      if (aborted) return;

      let parsed: Record<string, unknown>;
      try {
        const rawBody = Buffer.concat(chunks).toString('utf8');
        parsed = rawBody ? (JSON.parse(rawBody) as Record<string, unknown>) : {};
      } catch {
        sendJson(res, 400, { reply: null, error: 'Invalid JSON request body' });
        return;
      }

      const message = typeof parsed.message === 'string' ? parsed.message.trim() : '';
      if (!message) {
        sendJson(res, 400, { reply: null, error: 'Missing required "message" field' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        sendJson(res, 200, {
          reply: null,
          status: 'no_api_key',
        });
        return;
      }

      try {
        const { GoogleGenAI, ThinkingLevel } = await import('@google/genai');
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const systemInstruction = `Bạn là Kỹ sư Trưởng chuyên gia Hệ thống EDM SMARTGUARD AI tại nhà máy cơ khí chính xác.
Nhiệm vụ: Chẩn đoán sự cố máy gia công tia lửa điện (EDM), trung tâm gia công CNC và cánh tay Robot.
Yêu cầu bắt buộc:
1. Trả lời bằng tiếng Việt chuyên nghiệp, ngắn gọn, súc tích và có cấu trúc.
2. Nêu rõ nguyên nhân gốc rễ và quy trình kiểm tra từng bước theo chuẩn SOP xưởng máy.
3. Luôn đính kèm lưu ý an toàn lao động (ngắt nguồn điện, xả áp suất, găng tay cách nhiệt).
4. Tham chiếu các model máy: Mitsubishi, Makino, Sodick, Fanuc, Okuma.`;

        const response = await ai.models.generateContent({
          model: 'gemini-4-hydrogen',
          contents: message,
          config: {
            systemInstruction,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        });

        sendJson(res, 200, {
          reply: response.text ?? '',
          source: 'gemini-4-hydrogen',
        });
      } catch (err: any) {
        const statusCode =
          typeof err?.status === 'number' && err.status >= 400 && err.status < 600
            ? err.status
            : 502;
        sendJson(res, statusCode, {
          reply: null,
          error: err?.message || 'Upstream AI service error',
        });
      }
    });
  };
}

function aiChatApiPlugin(): Plugin {
  const middleware = createAiChatMiddleware();
  return {
    name: 'ai-chat-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/ai/chat', middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/ai/chat', middleware);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aiChatApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : undefined,
    },
  };
});
