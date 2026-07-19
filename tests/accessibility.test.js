const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const checks = [
  { name: 'has lang attribute', pass: /<html[^>]*lang="en"/i.test(html) },
  { name: 'has title', pass: /<title>[^<]+<\/title>/i.test(html) },
  { name: 'has form labels or accessible names', pass: /aria-label=|<label[^>]*>/i.test(html) },
  { name: 'no inline onclick handlers', pass: !/onclick=/i.test(html) },
  { name: 'has skip link', pass: /skip-link/i.test(html) }
];

const failed = checks.filter((item) => !item.pass);
if (failed.length) {
  console.error('Accessibility checks failed:');
  failed.forEach((item) => console.error(`- ${item.name}`));
  process.exit(1);
}

console.log('Accessibility checks passed.');
