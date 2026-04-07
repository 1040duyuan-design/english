import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
const backendHostport = process.env.BACKEND_HOSTPORT || 'localhost:4000';
const backendTarget = backendHostport.startsWith('http') ? backendHostport : `http://${backendHostport}`;

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'english-learning-web' });
});

app.use('/api', createProxyMiddleware({
  target: backendTarget,
  changeOrigin: true,
  pathRewrite: (path) => `/api${path}`
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`English learning web listening on http://localhost:${port}`);
  console.log(`Proxying /api to ${backendTarget}`);
});
