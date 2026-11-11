import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function aiChatApiPlugin() {
  return {
    name: 'ai-chat-api-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/ai/chat', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const message = parsed.message || '';

            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey) {
              const { GoogleGenAI } = await import('@google/genai');
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
                model: 'gemini-3.8-flash',
                contents: message,
                config: {
                  systemInstruction,
                },
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  reply: response.text,
                  source: 'gemini-3.8-flash',
                })
              );
              return;
            }

            // Fallback response if GEMINI_API_KEY is not configured
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                reply: null,
                status: 'no_api_key',
              })
            );
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                reply: null,
                error: err?.message,
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aiChatApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
