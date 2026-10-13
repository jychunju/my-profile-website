const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.join(__dirname, 'public');
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT must be between 1 and 65535.');
  process.exit(1);
}
function outside(file, directory) {
  const relative = path.relative(directory, file);
  return relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative);
}
const server = http.createServer(async (req, res) => {
  const reply = (status, message, headers = {}) => {
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
    res.end(req.method === 'HEAD' ? undefined : message);
  };
  if (!['GET', 'HEAD'].includes(req.method)) return reply(405, 'Method Not Allowed', { Allow: 'GET, HEAD' });
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { return reply(400, 'Bad Request'); }
  if (pathname.includes('\0') || pathname.includes('\\') || pathname.includes(':')) return reply(400, 'Bad Request');
  let file = path.resolve(root, '.' + pathname);
  if (outside(file, root)) return reply(403, 'Forbidden');
  try {
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const realFile = await fs.realpath(file);
    if (outside(realFile, await fs.realpath(root))) return reply(403, 'Forbidden');
    const contents = await fs.readFile(realFile);
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': contents.length, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : contents);
  } catch (error) {
    if (['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code)) reply(404, 'Not Found');
    else { console.error(error.message); reply(500, 'Internal Server Error'); }
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already in use. Set PORT to another port.` : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Local website: http://localhost:${port}`);
  console.log('Press Ctrl+C to stop.');
});
