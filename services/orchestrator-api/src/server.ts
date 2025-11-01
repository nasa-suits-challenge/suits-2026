import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { TssClient } from '@tuxedo/tss-client-ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 8787);

const cfg = {
  host: process.env.TSS_HOST || '127.0.0.1',
  port: Number(process.env.TSS_PORT || 14141),
  transport: (process.env.TSS_TRANSPORT || 'udp') as any,
  wsUrl: process.env.TSS_WS_URL,
};

const tss = new TssClient(cfg as any);

app.get('/health', (_req, res) => {
  res.json({ ok: true, ts: Date.now(), transport: cfg.transport });
});

app.get('/api/tss/imu', async (req, res) => {
  try {
    const ev = Number(req.query.ev || 1) === 2 ? 2 : 1;
    const imu = await tss.getImu(ev as any);
    res.json({ ev, imu });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'IMU error' });
  }
});

// Serve the static PR UI (apps/pr-ui)
app.use('/ui', express.static(path.resolve(__dirname, '../../apps/pr-ui')));

app.listen(PORT, () => {
  console.log(`Orchestrator API on http://localhost:${PORT}`);
});
