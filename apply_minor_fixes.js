const fs = require('fs');

let styleCss = fs.readFileSync('style.css', 'utf8');

// Fix 11 - prepend if not present
if (!styleCss.includes('-webkit-tap-highlight-color: transparent')) {
  styleCss = `* {\n  -webkit-tap-highlight-color: transparent;\n}\n\n` + styleCss;
}

const patchCss = `

/* Minor Audit Fixes */

/* Fix 1 */
.pill {
  min-width: 72px;
  max-width: 100px;
  overflow: hidden;
}
.pill .m {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Fix 2 */
.complete-banner {
  animation: bannerIn .4s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes bannerIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Fix 3 */
.fsec {
  margin-top: 24px;
}
.fsec .label {
  margin-bottom: 12px;
}
.fsec p, .step p {
  line-height: 1.6;
}

/* Fix 4 */
.dash-stat-val {
  font-size: clamp(22px, 5vw, 32px);
  word-break: break-all;
}

/* Fix 5 */
.dash-session-row {
  padding: 12px 0;
}

/* Fix 6 */
.hist-back {
  line-height: 1;
  padding-top: 4px;
  align-self: center;
}

/* Fix 7 */
.onboard-dots {
  margin-top: 24px;
  margin-bottom: 8px;
}

/* Fix 8 */
#cancelScheduleBtn {
  padding: 14px;
}
#resetDefaultBtn {
  padding: 9px 16px;
}

/* Fix 9 */
.dash-muscle-bar {
  animation: barGrow .6s ease both;
}
@keyframes barGrow {
  from { width: 0 !important; }
}

/* Fix 10 */
.fwhy p {
  line-height: 1.6;
  margin-top: 4px;
}
.fbreath {
  margin-top: 12px;
}
`;

styleCss += patchCss;

fs.writeFileSync('style.css', styleCss);
console.log("Applied minor audit fixes to style.css");
