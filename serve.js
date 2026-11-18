const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const page = path.join(root, 'index.html');
const server = http.createServer((req, res) => {
  if (req.method !== 'GET' || !['/', '/index.html'].includes(new URL(req.url, 'http://localhost').pathname)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  fs.readFile(page, (error, content) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('미리보기 파일을 읽을 수 없습니다.');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(content);
  });
});

server.listen(8000, '127.0.0.1', () => {
  console.log('스키 대여 데모: http://localhost:8000');
});
