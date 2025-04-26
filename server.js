const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Use port 3001 since 3000 is already in use
const PORT = 3001;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Handle clerk-related requests
    if (pathname.includes('clerk') || pathname.includes('@clerk/clerk-js')) {
      console.log(`Intercepting Clerk request: ${pathname}`);
      // Redirect to our mock implementation
      res.writeHead(302, { Location: '/clerk.browser.js' });
      res.end();
      return;
    }

    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
    console.log('> Development mode with mock Clerk and database');
  });
}); 