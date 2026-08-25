import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';

function applySmtpEnv(env: Record<string, string>) {
  for (const [key, value] of Object.entries(env)) {
    if (key.startsWith('SMTP_')) {
      process.env[key] = value;
    }
  }
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  return raw ? JSON.parse(raw) : {};
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(body));
}

function localSendEmailPlugin(): Plugin {
  return {
    name: 'local-send-email',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/api/send-email' && url !== '/api/send-email/') {
          next();
          return;
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          json(res, 405, { error: 'Method Not Allowed' });
          return;
        }

        try {
          const payload = await readJsonBody(req);
          const { sendBookingEmails } = await import('./api/mailer');
          const result = await sendBookingEmails((payload || {}) as Parameters<typeof sendBookingEmails>[0]);
          json(res, result.status, result.body);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Serverfel';
          json(res, 500, { error: message });
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  applySmtpEnv(loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), localSendEmailPlugin()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
