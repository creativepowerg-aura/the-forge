const fs = require('fs');
let styleCss = fs.readFileSync('style.css', 'utf8');

const oldPillRegex = /\.pill \{[\s\S]*?\}\s*\.pill:hover \{[\s\S]*?\}\s*\.pill \.d \{[\s\S]*?\}\s*\.pill \.m \{[\s\S]*?\}\s*\.pill\.active \{[\s\S]*?\}\s*\.pill\.active \.d \{[\s\S]*?\}\s*\.pill\.active \.m \{[\s\S]*?\}\s*\.pill\.rest \.m \{[\s\S]*?\}/;

const newPills = `.pill {
  flex: none;
  min-width: 76px;
  padding: 12px 14px;
  border-radius: 14px;
  cursor: pointer;
  background: var(--surface);
  border: 1px solid var(--border);
  text-align: center;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.pill:hover {
  background: var(--surface2);
  border-color: var(--border2);
}
.pill .d {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: .16em;
  color: var(--faint);
  font-weight: 700;
}
.pill .m {
  font-family: 'Anton', sans-serif;
  font-size: 13px;
  letter-spacing: .03em;
  color: var(--dim);
  margin-top: 4px;
  line-height: 1.05;
}
.pill.active {
  border-color: #00d4ff;
  background: linear-gradient(165deg, rgba(0, 212, 255, .18), rgba(0, 212, 255, .04));
  box-shadow: 0 6px 20px rgba(0, 212, 255, .18);
  transform: translateY(-2px);
}
.pill.active .d { color: #00d4ff; }
.pill.active .m { color: #fff; }
.pill.rest .m { color: var(--steel); }`;

styleCss = styleCss.replace(oldPillRegex, newPills);
fs.writeFileSync('style.css', styleCss);
console.log("Updated pill CSS.");
