const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "0.0.0.0";
const backendBaseUrl = process.env.BACKEND_BASE_URL;
const BACKEND_BASE_URL = backendBaseUrl ? new URL(backendBaseUrl) : null;
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  const type = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      res.end("internal server error");
      return;
    }

    res.writeHead(200, { "content-type": type });
    res.end(content);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function proxyRequest(req, res) {
  if (!BACKEND_BASE_URL) {
    sendJson(res, 503, { error: "backend unavailable" });
    return;
  }

  const targetUrl = new URL(req.url, BACKEND_BASE_URL);
  const transport = targetUrl.protocol === "https:" ? https : http;

  const proxy = transport.request(
    {
      protocol: targetUrl.protocol,
      hostname: targetUrl.hostname,
      port: targetUrl.port,
      method: req.method,
      path: `${targetUrl.pathname}${targetUrl.search}`,
      headers: {
        ...req.headers,
        host: targetUrl.host,
      },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxy.on("error", () => {
    sendJson(res, 502, { error: "backend unavailable" });
  });

  req.pipe(proxy);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === "/health") {
    sendJson(res, 200, { ok: true, service: "english-training-frontend" });
    return;
  }

  if (pathname.startsWith("/api/")) {
    proxyRequest(req, res);
    return;
  }

  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const normalized = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, normalized);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    res.end("forbidden");
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      sendFile(res, path.join(PUBLIC_DIR, "index.html"));
      return;
    }

    sendFile(res, filePath);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`memorial frontend listening on http://${HOST}:${PORT}`);
});
