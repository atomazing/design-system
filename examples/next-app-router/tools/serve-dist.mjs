import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const projectRoot = process.cwd();
const distDir = resolve(projectRoot, "dist");
const portIndex = process.argv.indexOf("--port");
const port =
  portIndex >= 0 && process.argv[portIndex + 1]
    ? Number.parseInt(process.argv[portIndex + 1], 10)
    : 3000;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const resolveFilePath = (urlPath) => {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0] || "/");
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const directPath = join(distDir, safePath);
  const indexPath = join(distDir, safePath, "index.html");

  if (existsSync(directPath)) {
    const stats = statSync(directPath);
    if (stats.isDirectory()) {
      return existsSync(indexPath) ? indexPath : null;
    }
    return directPath;
  }

  if (existsSync(indexPath)) return indexPath;
  return null;
};

if (!existsSync(distDir)) {
  throw new Error("Static dist directory was not found. Run 'pnpm run build' first.");
}

createServer((req, res) => {
  const method = req.method ?? "GET";
  if (method !== "GET" && method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Method Not Allowed");
    return;
  }

  const filePath = resolveFilePath(req.url ?? "/");
  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }

  const contentType =
    mimeTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType });
  if (method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(filePath).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving static export from ${distDir} at http://127.0.0.1:${port}`);
});
