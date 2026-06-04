const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newMeta = `  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#0c0c0e">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="The Forge">
  <link rel="apple-touch-icon" href="icon-192.png">
</head>`;

html = html.replace('</head>', newMeta);

fs.writeFileSync('index.html', html);
console.log('Added manifest and PWA meta tags to index.html');
