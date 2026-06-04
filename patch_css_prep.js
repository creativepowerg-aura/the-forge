const fs = require('fs');
let styleCss = fs.readFileSync('style.css', 'utf8');

// Fix 1 - PR badge
styleCss = styleCss.replace(
  /\.pr-badge\s*\{[\s\S]*?\}/,
  `.pr-badge {
  position: relative;
  display: inline-flex;
  margin: 10px 0 6px;
  clear: both;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  color: #ffa12e;
  letter-spacing: .06em;
  background: rgba(255,161,46,.1);
  border: 1px solid rgba(255,161,46,.3);
  padding: 4px 8px;
  border-radius: 6px;
}`
);
// I assumed the other styles for .pr-badge (like background, padding, color, font) should be preserved.
// Wait, I don't know the exact previous styles. I'll just append these new properties if they don't exist, or just append a new selector block at the end that overrides. It's much safer to append CSS at the end!
