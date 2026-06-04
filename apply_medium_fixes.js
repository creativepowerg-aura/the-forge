const fs = require('fs');

let styleCss = fs.readFileSync('style.css', 'utf8');

const patchCss = `

/* Medium Audit Fixes */

/* Fix 1 */
.ctop:active {
  background: rgba(255,255,255,.03);
  transform: scale(.995);
}

/* Fix 2 */
.finish-btn {
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: #000;
  font-weight: 800;
  border: none;
  box-shadow: 0 4px 20px rgba(0,212,255,.25);
}
.finish-btn:active {
  transform: scale(.98);
  box-shadow: none;
}

/* Fix 3 */
.fhead h2 {
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.1;
}

/* Fix 4 */
.fstats {
  flex-wrap: wrap;
}
.fstat {
  min-width: 70px;
  flex: 1;
}

/* Fix 5 */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a9aa2' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  cursor: pointer;
}
select:focus {
  outline: none;
  border-color: #00d4ff;
}

/* Fix 6 */
.gear-cat,
.gear-section-label {
  margin-top: 18px;
  margin-bottom: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}
.gear-cat:first-child,
.gear-section-label:first-child {
  margin-top: 4px;
  border-top: none;
}

/* Fix 7 */
.rest-toast-skip {
  min-height: 44px;
  min-width: 44px;
  padding: 10px 18px;
}

/* Fix 8 */
.hist-pct {
  font-size: 18px;
  min-width: 52px;
  text-align: right;
}

/* Fix 9 */
.dash-muscle-bar {
  transition: width .6s ease;
}

/* Fix 10 */
.wbox input {
  -webkit-appearance: none;
  box-shadow: none;
}
.wbox input:focus {
  outline: none;
}
`;

styleCss += patchCss;

fs.writeFileSync('style.css', styleCss);
console.log("Applied medium audit fixes to style.css");
