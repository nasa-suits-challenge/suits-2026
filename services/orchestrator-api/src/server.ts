import express, { type Request, type Response } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { TssClient } from '@tuxedo/tss-client-ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 8787);
const PR_UI_PATH = path.resolve(__dirname, '../../../apps/pr-ui');

const cfg = {
  host: process.env.TSS_HOST || '127.0.0.1',
  port: Number(process.env.TSS_PORT || 14141),
  transport: (process.env.TSS_TRANSPORT || 'udp') as any,
  wsUrl: process.env.TSS_WS_URL,
};

const tss = new TssClient(cfg as any);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true, ts: Date.now(), transport: cfg.transport });
});

app.get('/api/tss/imu', async (req: Request, res: Response) => {
  try {
    const ev = Number(req.query.ev || 1) === 2 ? 2 : 1;
    const imu = await tss.getImu(ev as any);
    res.json({ ev, imu });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'IMU error' });
  }
});

app.get('/api/tss/pr-telemetry', async (_req: Request, res: Response) => {
  try {
    const telemetry = await tss.getPressurizedRoverTelemetry();
    res.json({ telemetry });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'PR telemetry error' });
  }
});

// Serve the static PR UI (apps/pr-ui)
app.use('/ui', express.static(PR_UI_PATH));

app.listen(PORT, () => {
  console.log(`Orchestrator API on http://localhost:${PORT}`);
});
