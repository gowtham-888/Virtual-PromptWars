const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const checks = [
  { name: 'has a main landmark', pass: /<main[^>]*id="main-content"/i.test(html) },
  { name: 'has theme color meta tag', pass: /<meta[^>]+name="theme-color"/i.test(html) },
  { name: 'has security headers meta tags', pass: /<meta[^>]+http-equiv="Content-Security-Policy"/i.test(html) && /<meta[^>]+http-equiv="X-Content-Type-Options"/i.test(html) },
  { name: 'has referrer policy', pass: /<meta[^>]+name="referrer"/i.test(html) },
  { name: 'has live regions for chat and recommendations', pass: /id="chatLog"[^>]*aria-live="polite"/i.test(html) && /id="recFeed"[^>]*aria-live="polite"/i.test(html) }
];

const failed = checks.filter((item) => !item.pass);
if (failed.length) {
  console.error('Quality checks failed:');
  failed.forEach((item) => console.error(`- ${item.name}`));
  process.exit(1);
}

console.log('Quality checks passed.');
