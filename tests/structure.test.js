const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const checks = [
  { name: 'has a documented title', pass: /<title>[^<]+<\/title>/i.test(html) },
  { name: 'has main landmark', pass: /<main[^>]*id="main-content"/i.test(html) },
  { name: 'initialization is centralized', pass: /function initializeApp\(\)/i.test(html) && /initializeApp\(\);/i.test(html) },
  { name: 'uses semantic buttons and labels', pass: /<button[^>]+aria-label=/i.test(html) && /<label[^>]+for=/i.test(html) }
];

const failed = checks.filter((item) => !item.pass);
if (failed.length) {
  console.error('Structure checks failed:');
  failed.forEach((item) => console.error(`- ${item.name}`));
  process.exit(1);
}

console.log('Structure checks passed.');
