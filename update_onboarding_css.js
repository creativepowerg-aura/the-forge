const fs = require('fs');
let styleCss = fs.readFileSync('style.css', 'utf8');

const newCss = `
.onboard-wrap {
  max-width: 480px;
  margin: 0 auto;
  padding: 32px 4px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.onboard-mark {
  width: 64px;
  height: 64px;
  border: 2px solid #00d4ff;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: rgba(0,212,255,.08);
  box-shadow: 0 0 32px rgba(0,212,255,.2);
  margin-bottom: 20px;
}
.onboard-mark svg { width: 28px; height: 28px; }
.onboard-title {
  font-family: 'Anton', sans-serif;
  font-size: 42px;
  letter-spacing: .06em;
  background: linear-gradient(180deg,#fff,#9a9aa2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 6px;
}
.onboard-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: .28em;
  color: #00d4ff;
  font-weight: 700;
  margin-bottom: 20px;
}
.onboard-body {
  font-size: 15px;
  color: var(--dim);
  line-height: 1.6;
  margin-bottom: 28px;
  max-width: 340px;
}
.onboard-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 32px;
}
.onboard-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 13.5px;
  color: var(--text);
  text-align: left;
}
.onboard-feature span:first-child { font-size: 18px; flex: none; }
.onboard-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: #000;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: .14em;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: .15s;
  margin-top: 8px;
}
.onboard-btn:active { transform: scale(.98); }
.onboard-step-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: .2em;
  color: #00d4ff;
  font-weight: 700;
  margin-bottom: 12px;
}
.onboard-step-title {
  font-family: 'Anton', sans-serif;
  font-size: 28px;
  letter-spacing: .03em;
  margin-bottom: 8px;
  color: #fff;
}
.onboard-step-sub {
  font-size: 13.5px;
  color: var(--dim);
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 360px;
}
.onboard-gear-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  max-height: 420px;
  overflow-y: auto;
  text-align: left;
}
.onboard-gear-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  transition: .15s;
}
.onboard-gear-item.selected {
  border-color: rgba(0,212,255,.4);
  background: rgba(0,212,255,.06);
}
.onboard-gear-icon { font-size: 20px; flex: none; }
.onboard-gear-info { flex: 1; min-width: 0; }
.onboard-gear-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}
.onboard-gear-desc {
  font-size: 12px;
  color: var(--faint);
  margin-top: 2px;
}
.onboard-gear-check {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #00d4ff;
  flex: none;
  width: 24px;
  text-align: center;
}
.onboard-sched-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  text-align: left;
}
.onboard-sched-row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 11px 14px;
  position: relative;
}
.onboard-sched-day {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  color: var(--dim);
  flex: none;
  width: 36px;
}
.onboard-sched-muscles {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  flex: 1;
}
.onboard-muscle-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(0,212,255,.12);
  border: 1px solid rgba(0,212,255,.25);
  color: var(--text);
  letter-spacing: .06em;
}
.onboard-muscle-empty {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--faint);
  letter-spacing: .08em;
}
.onboard-sched-dropdown-wrap {
  position: relative;
  flex: none;
}
.onboard-sched-btn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 7px;
  color: #00d4ff;
  font-size: 10px;
  padding: 5px 9px;
  cursor: pointer;
}
.onboard-sched-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  z-index: 100;
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 10px;
  min-width: 160px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,.6);
}
.onboard-sched-dropdown.hidden { display: none; }
.onboard-muscle-opt {
  padding: 10px 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  color: var(--text);
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: background .15s;
}
.onboard-muscle-opt:last-child { border-bottom: none; }
.onboard-muscle-opt:hover { background: rgba(0,212,255,.08); color: #00d4ff; }
.onboard-muscle-opt.checked { color: #00d4ff; background: rgba(0,212,255,.06); }
`;

styleCss += newCss;
fs.writeFileSync('style.css', styleCss);
console.log("Onboarding styles injected.");
