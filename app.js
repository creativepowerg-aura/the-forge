const PLAN = {
  mon:{day:"MON", title:"CHEST + TRICEPS", sub:"Push day", type:"lift", ex:[
    {id:"chest-incline-press", name:"Couch-Incline DB Press", target:"Upper chest", grp:"CHEST", sets:4, reps:"8–12", rest:"90s", tempo:"2-1", gear:["Dumbbells","Couch"],
     steps:["Sit in the corner of the couch so your back rests at a 30–45° angle.","Press the dumbbells up and slightly toward each other until your arms are nearly straight.","Lower under control until your elbows drop just below chest level and you feel the stretch."],
     mistake:"Letting your elbows flare straight out to the sides. Keep them at about 45° to protect the shoulder.",
     why: "The incline angle targets the upper chest — the hardest part to develop and the one that gives the chest its full, rounded look.",
     breath: "Inhale on the way down, exhale as you press up.",
     easier: "Reduce the angle — sit more upright to shift load away from the shoulder.",
     harder: "Pause 2 seconds at the bottom stretch before pressing."},
    {id:"chest-floor-press", name:"Floor DB Press", target:"Mid chest", grp:"CHEST", sets:4, reps:"8–12", rest:"90s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Lie flat on the floor, knees bent, dumbbells held over your chest.","Lower until your upper arms rest lightly on the floor — that's your bottom position.","Drive back up powerfully and squeeze the chest at the top."],
     mistake:"Bouncing the elbows off the floor. Pause for a beat at the bottom, then press.",
     why: "The floor limits range and removes shoulder strain, letting you move heavier weight safely — great for raw pressing strength.",
     breath: "Inhale as you lower, exhale on the press.",
     easier: "Use lighter dumbbells and focus on feeling the chest squeeze at the top.",
     harder: "3-second lowering phase on every rep."},
    {id:"chest-floor-fly", name:"Floor DB Fly", target:"Chest stretch", grp:"CHEST", sets:3, reps:"12–15", rest:"60s", tempo:"slow", gear:["Dumbbells"],
     steps:["Hold the dumbbells above your chest, palms facing each other, a slight bend in the elbows.","Open your arms wide like a slow reverse hug until you feel the chest stretch.","Bring them back together over your chest, squeezing the whole way up."],
     mistake:"Turning it into a press by bending the elbows. Keep the elbow angle fixed the entire rep."},
    {id:"chest-pushup-burnout", name:"Push-Up Burnout", target:"Chest finisher", grp:"CHEST", sets:2, reps:"AMRAP", rest:"45s", tempo:"steady", gear:["Bodyweight"],
     steps:["Hands just outside shoulder width, body in one straight line.","Lower until your chest is about an inch off the floor.","Press up. Go to failure — drop to your knees to grind out a few more."],
     mistake:"Letting the hips sag. Brace your abs and glutes to hold a rigid plank."},
    {id:"tricep-dip-chair", name:"Chair Tricep Dip", target:"Triceps", grp:"TRICEPS", sets:4, reps:"10–15", rest:"75s", tempo:"2-1", gear:["Chairs","Bodyweight"],
     steps:["Hands on the edge of a chair, fingers pointing forward, hips just off the seat.","Bend your elbows straight back to lower until they reach about 90°.","Press through your palms to lock out. Rest a dumbbell on your lap to add load."],
     mistake:"Elbows flaring outward. Keep them tracking straight behind you.",
     why: "Dips are one of the few exercises that load the tricep through its full range of motion — more effective than pushdowns or kickbacks.",
     breath: "Inhale on the way down, exhale as you press up.",
     easier: "Bend your knees and bring feet closer to the chair to reduce load.",
     harder: "Place a dumbbell on your lap or slow the descent to 4 seconds."},
    {id:"tricep-overhead-ext", name:"Overhead DB Extension", target:"Triceps long head", grp:"TRICEPS", sets:3, reps:"10–12", rest:"60s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Hold one dumbbell with both hands, pressed straight overhead.","Keeping your elbows pointing forward, lower the weight down behind your head.","Extend back up until your arms are straight."],
     mistake:"Elbows drifting out and forward. Keep them tight and pointed at the ceiling."},
    {id:"tricep-skullcrusher", name:"Lying DB Skull Crusher", target:"Triceps", grp:"TRICEPS", sets:3, reps:"10–12", rest:"60s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Lie on the floor, dumbbells held over your chest, palms facing in.","Bend only at the elbows to lower the weights toward your ears.","Extend back up, keeping your upper arms vertical and still."],
     mistake:"Moving the whole arm. Only your forearm should travel — upper arm stays locked."},
  ]},
  tue:{day:"TUE", title:"BACK + BICEPS", sub:"Pull day", type:"lift", ex:[
    {id:"back-db-row", name:"Bent-Over DB Row", target:"Mid back", grp:"BACK", sets:4, reps:"8–12", rest:"90s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Hinge at the hips with a flat back, knees soft, dumbbells hanging below you.","Pull both dumbbells to your hips, driving your elbows back.","Squeeze the shoulder blades together, then lower with control."],
     mistake:"Rounding the lower back. Keep your chest proud and your spine neutral throughout."},
    {id:"back-single-row", name:"Single-Arm DB Row", target:"Lats", grp:"BACK", sets:4, reps:"10–12 / side", rest:"75s", tempo:"2-1", gear:["Dumbbells","Chair"],
     steps:["Brace one knee and one hand on the chair seat, back flat and parallel to the floor.","Let the dumbbell hang, then row it up along your side, leading with the elbow.","Lower all the way down for a full lat stretch each rep."],
     mistake:"Twisting your torso to heave the weight up. Keep your shoulders square to the floor."},
    {id:"back-db-pullover", name:"DB Pullover", target:"Lats", grp:"BACK", sets:3, reps:"12–15", rest:"60s", tempo:"slow", gear:["Dumbbells","Couch"],
     steps:["Lie back across the couch holding one dumbbell over your chest.","Lower it behind your head with a slight elbow bend until you feel the lat stretch.","Pull it back over your chest, driving with the lats."],
     mistake:"Bending the elbows to muscle it up. Keep the arc wide and the elbows fairly fixed."},
    {id:"back-band-pull", name:"Band Pull-Apart", target:"Rear delts / traps", grp:"BACK", sets:3, reps:"15–20", rest:"45s", tempo:"slow", gear:["Band"],
     steps:["Hold the band in front of you at shoulder height, arms straight.","Pull it apart to your chest, squeezing your shoulder blades together.","Return slowly under control — don't let the band snap back."],
     mistake:"Shrugging your shoulders up. Keep them down and pull with the mid-back."},
    {id:"back-db-shrug", name:"DB Shrugs", target:"Traps", grp:"BACK", sets:3, reps:"15", rest:"45s", tempo:"1-1", gear:["Dumbbells"],
     steps:["Hold heavy dumbbells at your sides, arms straight.","Shrug your shoulders straight up toward your ears.","Pause hard at the top, then lower slowly."],
     mistake:"Rolling the shoulders. Go straight up and straight down."},
    {id:"bicep-db-curl", name:"DB Curl", target:"Biceps", grp:"BICEPS", sets:4, reps:"10–12", rest:"60s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Stand tall, dumbbells at your sides, elbows pinned to your ribs.","Curl up without swinging, turning your pinky slightly up at the top.","Lower slowly all the way to a full stretch."],
     mistake:"Swinging your body to throw the weight up. Keep it strict and let the biceps work."},
    {id:"bicep-hammer-curl", name:"Hammer Curl", target:"Biceps / forearms", grp:"BICEPS", sets:3, reps:"10–12", rest:"60s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Hold the dumbbells with palms facing in (neutral grip).","Curl up keeping that neutral grip the entire way.","Lower slowly under control."],
     mistake:"Letting your elbows drift forward. Keep them pinned to your sides."},
    {id:"bicep-concentration-curl", name:"Concentration Curl", target:"Bicep peak", grp:"BICEPS", sets:3, reps:"12 / side", rest:"45s", tempo:"2-1", gear:["Dumbbells","Chair"],
     steps:["Sit and brace your working elbow against the inside of your thigh.","Curl the dumbbell up with full focus, squeezing the peak hard.","Lower slowly and fully extend the arm."],
     mistake:"Using momentum or your shoulder. Isolate it — only the forearm moves."},
  ]},
  wed:{day:"WED", title:"LEGS", sub:"Solo leg day", type:"lift", ex:[
    {id:"leg-goblet-squat", name:"Goblet Squat", target:"Quads / glutes", grp:"LEGS", sets:4, reps:"10–12", rest:"90s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Hold one dumbbell vertically against your chest.","Sit your hips straight down between your heels, keeping your chest tall.","Drive up through your whole foot to stand."],
     mistake:"Knees caving inward. Push them out so they track over your toes."},
    {id:"leg-bulgarian-squat", name:"Bulgarian Split Squat", target:"Quads / glutes", grp:"LEGS", sets:4, reps:"8–10 / side", rest:"75s", tempo:"2-1", gear:["Dumbbells","Chair"],
     steps:["Rest the top of your rear foot on a sturdy chair or couch.","Drop straight down until your front thigh is about parallel to the floor.","Drive up through the front heel. Keep most of the weight on the front leg."],
     mistake:"Leaning too far forward. Stay fairly upright and sink straight down. Start light — this one humbles people."},
    {id:"leg-db-rdl", name:"DB Romanian Deadlift", target:"Hamstrings / glutes", grp:"LEGS", sets:4, reps:"10–12", rest:"90s", tempo:"3-1", gear:["Dumbbells"],
     steps:["Stand with dumbbells in front of your thighs, knees slightly bent.","Push your hips back, sliding the weights down your legs.","Stop at a strong hamstring stretch, then drive your hips forward to stand tall."],
     mistake:"Rounding the back or squatting it down. It's a hip hinge — hips go back, not down."},
    {id:"leg-reverse-lunge", name:"Reverse Lunge", target:"Legs / balance", grp:"LEGS", sets:3, reps:"10 / side", rest:"60s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Stand tall with dumbbells at your sides.","Step one foot straight back and drop that knee toward the floor.","Push through the front leg to return to standing."],
     mistake:"Short, stiff steps. Take a full step back so the front knee stays over the ankle."},
    {id:"leg-chair-stepup", name:"Chair Step-Up", target:"Quads / glutes", grp:"LEGS", sets:3, reps:"12 / side", rest:"60s", tempo:"controlled", gear:["Dumbbells","Chair"],
     steps:["Place a STURDY chair against a wall. Plant one full foot on the seat.","Drive through that top leg to stand fully on the chair.","Step down with control. Skip this entirely if the chair isn't rock-solid."],
     mistake:"Pushing off the bottom foot. Let the top leg do all the work."},
    {id:"leg-calf-raise", name:"Standing Calf Raise", target:"Calves", grp:"LEGS", sets:4, reps:"15–20", rest:"45s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Hold dumbbells at your sides, stand on a step or thick book for extra range.","Rise up onto your toes as high as you can.","Pause at the top, then lower slowly below the step."],
     mistake:"Bouncing fast. Slow it down and pause at the top of every rep."},
  ]},
  thu:{day:"THU", title:"SHOULDERS", sub:"Solo delt day", type:"lift", ex:[
    {id:"shoulder-db-press", name:"Seated DB Overhead Press", target:"Front / side delts", grp:"SHOULDERS", sets:4, reps:"8–12", rest:"90s", tempo:"2-1", gear:["Dumbbells","Chair"],
     steps:["Sit tall on a chair, dumbbells at shoulder height.","Press straight overhead to a full lockout.","Lower under control back to your shoulders."],
     mistake:"Arching your lower back to push. Brace your abs and keep your ribs down."},
    {id:"shoulder-lateral-raise", name:"Lateral Raise", target:"Side delts (width)", grp:"SHOULDERS", sets:4, reps:"12–15", rest:"45s", tempo:"slow", gear:["Dumbbells"],
     steps:["Hold light dumbbells at your sides with a slight elbow bend.","Raise them out to the sides to shoulder height, leading with your elbows.","Lower slowly. Strict — no swinging."],
     mistake:"Going too heavy and swinging. This is the one that builds shoulder width — keep it light and controlled."},
    {id:"shoulder-arnold-press", name:"Arnold Press", target:"All three delt heads", grp:"SHOULDERS", sets:3, reps:"10–12", rest:"75s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Start with palms facing you at chin height.","Rotate your palms outward as you press up overhead.","Reverse the rotation smoothly on the way down."],
     mistake:"Rushing the rotation. Keep it smooth and continuous through the whole press."},
    {id:"shoulder-front-raise", name:"Front Raise", target:"Front delts", grp:"SHOULDERS", sets:3, reps:"12", rest:"45s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Hold the dumbbells in front of your thighs.","Raise them straight out in front to shoulder height.","Lower with control. Alternate arms if it feels smoother."],
     mistake:"Swinging up with the hips. Keep your torso still and let the front delts lift."},
    {id:"shoulder-rear-fly", name:"Bent-Over Rear Delt Fly", target:"Rear delts", grp:"SHOULDERS", sets:3, reps:"15", rest:"45s", tempo:"slow", gear:["Dumbbells"],
     steps:["Hinge forward at the hips, dumbbells hanging below your chest.","Raise them out to the sides like wings, leading with the elbows.","Squeeze the rear delts at the top, then lower slowly."],
     mistake:"Using your back to swing the weight. Keep it light and feel the rear delts."},
    {id:"shoulder-band-facepull", name:"Band Face Pull", target:"Shoulder health", grp:"SHOULDERS", sets:3, reps:"15–20", rest:"45s", tempo:"slow", gear:["Band"],
     steps:["Anchor the band at face height on a door handle.","Pull it toward your face with your elbows high and wide.","Squeeze, then return slowly."],
     mistake:"Pulling too low toward your chest. Aim the band at your forehead/eyes, elbows up."},
  ]},
  fri:{day:"FRI", title:"ARMS", sub:"Biceps & triceps blast", type:"lift", ex:[
    {id:"bicep-db-curl", name:"DB Curl", target:"Biceps", grp:"BICEPS", sets:4, reps:"10–12", rest:"60s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Stand tall, dumbbells at your sides, elbows pinned to your ribs.","Curl up without swinging, turning your pinky slightly up at the top.","Lower slowly all the way to a full stretch."],
     mistake:"Swinging your body. Keep it strict and let the biceps do the work."},
    {id:"bicep-hammer-curl", name:"Hammer Curl", target:"Biceps / forearms", grp:"BICEPS", sets:3, reps:"10–12", rest:"60s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Hold the dumbbells with palms facing in (neutral grip).","Curl up keeping that grip the whole way.","Lower slowly under control."],
     mistake:"Elbows drifting forward. Keep them pinned to your sides."},
    {id:"bicep-concentration-curl", name:"Concentration Curl", target:"Bicep peak", grp:"BICEPS", sets:3, reps:"12 / side", rest:"45s", tempo:"2-1", gear:["Dumbbells","Chair"],
     steps:["Sit and brace your working elbow against your inner thigh.","Curl the dumbbell up with full focus, squeezing the peak.","Lower slowly and fully extend."],
     mistake:"Using momentum. Isolate it — only the forearm moves."},
    {id:"tricep-dip-chair", name:"Chair Tricep Dip", target:"Triceps", grp:"TRICEPS", sets:4, reps:"10–15", rest:"75s", tempo:"2-1", gear:["Chairs","Bodyweight"],
     steps:["Hands on the chair edge, fingers forward, hips just off the seat.","Bend your elbows straight back to about 90°.","Press through your palms to lock out. Add a dumbbell on your lap to load it."],
     mistake:"Elbows flaring out. Keep them tracking straight behind you."},
    {id:"tricep-overhead-ext", name:"Overhead DB Extension", target:"Triceps long head", grp:"TRICEPS", sets:3, reps:"10–12", rest:"60s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Hold one dumbbell with both hands, pressed straight overhead.","Lower it behind your head, keeping your elbows pointing forward.","Extend back up until your arms are straight."],
     mistake:"Elbows flaring out. Keep them tight and pointed up."},
    {id:"arm-kickback", name:"DB Kickback", target:"Triceps", grp:"TRICEPS", sets:3, reps:"12–15", rest:"45s", tempo:"slow", gear:["Dumbbells","Chair"],
     steps:["Hinge forward, upper arm tucked parallel to the floor.","Extend the dumbbell straight back until your arm is fully straight.","Squeeze the tricep hard, then lower with control."],
     mistake:"Letting the upper arm drop. Keep it locked parallel to the floor the whole set."},
    {id:"arm-close-press", name:"Close-Grip Floor Press", target:"Triceps / inner chest", grp:"TRICEPS", sets:3, reps:"10–12", rest:"75s", tempo:"2-1", gear:["Dumbbells"],
     steps:["Lie on the floor, dumbbells pressed together over your chest.","Lower with your elbows tucked close to your sides until your upper arms touch the floor.","Press back up keeping the dumbbells together."],
     mistake:"Flaring the elbows. Keep them tight to keep the load on the triceps."},
  ]},
  sat:{day:"SAT", title:"MOBILITY", sub:"Roll, stretch & reset", type:"lift", ex:[
    {id:"mob-foam-roll", name:"Foam Roll — Full Body", target:"Recovery", grp:"RECOVERY", sets:1, reps:"8–10 min", rest:"—", tempo:"easy", gear:["Foam Roller"],
     steps:["Roll quads, hamstrings, calves, glutes, upper back, and lats.","When you hit a tight or tender spot, pause and breathe on it for 20–30 seconds.","Move slowly — about an inch per second."],
     mistake:"Rolling fast over everything. Slow down and spend time on the tight spots."},
    {id:"mob-dislocates", name:"Band Shoulder Dislocates", target:"Shoulder mobility", grp:"RECOVERY", sets:2, reps:"10", rest:"—", tempo:"slow", gear:["Band"],
     steps:["Take a wide grip on the band in front of your hips.","Raise it up and over your head to behind you, keeping arms straight.","Bring it back over to the front. Widen your grip if it's too tight."],
     mistake:"Bending the elbows to cheat the range. Keep arms straight and widen your grip instead."},
    {id:"mob-band-stretch", name:"Band-Assisted Stretch Series", target:"Full body", grp:"RECOVERY", sets:1, reps:"30s each", rest:"—", tempo:"hold", gear:["Band"],
     steps:["Use the strap to deepen hamstring, shoulder, and chest stretches.","Ease into each one and hold about 30 seconds.","Breathe and relax deeper on each exhale."],
     mistake:"Bouncing into the stretch. Ease in slowly and hold — never bounce."},
    {name:"Easy Cardio (optional)", target:"Blood flow", grp:"RECOVERY", sets:1, reps:"20–30 min", rest:"—", tempo:"easy", gear:["Bodyweight"],
     steps:["A walk, light jog, or anything that gets the blood moving.","Keep it easy enough to hold a conversation.","Helps clear out soreness and primes you for the week ahead."],
     mistake:"Going too hard on a recovery day. Keep the effort genuinely light."},
  ]},
  sun:{day:"SUN", title:"REST", sub:"", type:"rest"},
};

const DEFAULT_ORDER = ["mon","tue","wed","thu","fri","sat","sun"];
const WEEK_DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

function isFirstTimeUser() {
  if (!activeProfileId) return true;
  return !localStorage.getItem(pKey("onboarded"));
}

function completeOnboarding() {
  if (activeProfileId) {
    localStorage.setItem(pKey("onboarded"), "true");
  }
}
let timerInterval = null;
let timerStart = null;
let timerSeconds = 0;
let restInterval = null;
let restSeconds = 0;
let restTotal = 0;

function startTimer() {
  if (timerInterval) return; // already running
  timerStart = Date.now() - (timerSeconds * 1000);
  timerInterval = setInterval(() => {
    timerSeconds = Math.floor((Date.now() - timerStart) / 1000);
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  timerSeconds = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const el = document.getElementById("sessionTimer");
  if (!el) return;
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  el.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function getTimerMinutes() {
  return Math.floor(timerSeconds / 60);
}

let ORDER = [...DEFAULT_ORDER];
let draftOrder = [];
let draftDayMuscles = {};
try {
  let savedOrd = localStorage.getItem(pKey("schedule"));
  if(savedOrd) ORDER = JSON.parse(savedOrd);
} catch(e) {}

/* storage */
function loadDay(key) {
  try {
    const raw = localStorage.getItem(pKey("day:" + key));
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveDay(key, data) {
  try {
    localStorage.setItem(pKey("day:" + key), JSON.stringify(data));
  } catch (e) {}
}

let current = ORDER[(new Date().getDay()+6)%7];
let state = {};

// ── PROFILE SYSTEM ────────────────────────────────────────
let activeProfileId = null;

function getProfileList() {
  try {
    const raw = localStorage.getItem("forge:profiles");
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveProfileList(list) {
  try { localStorage.setItem("forge:profiles", JSON.stringify(list)); } catch(e) {}
}

function getActiveProfileId() {
  return localStorage.getItem("forge:activeProfile") || null;
}

function setActiveProfileId(id) {
  activeProfileId = id;
  localStorage.setItem("forge:activeProfile", id);
}

function getProfile(id) {
  try {
    const raw = localStorage.getItem(`forge:profile:${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function saveProfile(profile) {
  try { localStorage.setItem(`forge:profile:${profile.id}`, JSON.stringify(profile)); } catch(e) {}
}

function createProfile(name, color) {
  const id = "p" + Date.now();
  const profile = { id, name, color, created: new Date().toISOString() };
  saveProfile(profile);
  const list = getProfileList();
  list.push(id);
  saveProfileList(list);
  return profile;
}

function deleteProfile(id) {
  // Remove all profile-scoped keys
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`forge:${id}:`)) keysToRemove.push(key);
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));
  localStorage.removeItem(`forge:profile:${id}`);
  const list = getProfileList().filter(p => p !== id);
  saveProfileList(list);
}

function pKey(key) {
  // Namespace a key under the active profile
  return `forge:${activeProfileId}:${key}`;
}


function renderNav(){
  const currentPlan = buildPlan();
  const nav = document.getElementById("nav"); 
  nav.innerHTML = "";
  ORDER.forEach(k=>{
    const p = currentPlan[k];
    const short = {
      mon: "CHEST+TRI",
      tue: "BACK+BI",
      wed: "LEGS",
      thu: "SHOULDER",
      fri: "ARMS",
      sat: "MOBILITY",
      sun: "REST"
    }[k] || getBlockName(k).split(" + ").map(m => m.slice(0,4)).join("+");
    const el = document.createElement("div");
    const status = PLAN[k].type === "rest" ? "rest" : getDayStatus(k);
    const statusDot = {
      complete:   `<div class="pill-status complete"></div>`,
      inprogress: `<div class="pill-status inprogress"></div>`,
      untouched:  ``,
      rest:       ``
    }[status] || "";

    el.className = "pill" + (k === current ? " active" : "") + (status === "complete" ? " pill-done" : "") + (PLAN[k].type === "rest" ? " rest" : "");
    el.innerHTML = `
      ${statusDot}
      <div class="d">${p.day}</div>
      <div class="m">${short}</div>
    `;
    el.onclick = () => selectDay(k);
    nav.appendChild(el);
  });
}

async function selectDay(k){
  current = k; 
  state = await loadDay(k); 
  resetTimer();
  renderNav(); 
  renderDay();
  
  // Smooth scroll active pill into view
  const activePill = document.querySelector(".pill.active");
  if(activePill) {
    activePill.scrollIntoView({inline: "center", behavior: "smooth", block: "nearest"});
  }
}

function ringSVG(pct){
  const r = 27, c = 2 * Math.PI * r, off = c * (1 - pct/100);
  return `<svg width="66" height="66" viewBox="0 0 66 66">
    <circle cx="33" cy="33" r="${r}" fill="none" stroke="var(--ring-track)" stroke-width="6"/>
    <circle cx="33" cy="33" r="${r}" fill="none" stroke="url(#g)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" style="transition: stroke-dashoffset 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--ember)"/>
        <stop offset="1" stop-color="var(--ember2)"/>
      </linearGradient>
    </defs>
  </svg>`;
}

function renderDay(){
  const currentPlan = buildPlan();
  const p = currentPlan[current]; 
  const root = document.getElementById("day");
  
  if(p.type === "rest"){
    root.innerHTML = `<div class="rest-card">
      <h3>REST DAY</h3>
      <p>This is where the muscle actually gets built. Stay hydrated, hit your protein, get 7–9 hours of sleep, and let everything recover. Come back Monday ready to move more weight.</p>
    </div>`;
    return;
  }
  
  let total = 0, done = 0;
  p.ex.forEach((e) => { 
    if (e.trimmed) return;
    total += e.sets; 
    done += Math.min((state[e.id]?.done || 0), e.sets); 
  });
  
  const pct = total ? Math.round(done / total * 100) : 0;
  
  let html = `<div class="dayhead">
    <div class="meta">
      <h2>${p.title}</h2>
      <div class="sub">${p.sub} · ${p.ex.length} exercises · ${total} sets</div>
      ${p.isFallback ? `<div class="fallback-notice">⚡ Bodyweight mode — no gear selected for this day</div>` : ""}
      ${p.type === "lift" ? `<div class="timer-row"><span id="sessionTimer" class="timer-display">00:00</span><span class="timer-label">SESSION TIME</span></div>` : ""}
    </div>
    <div class="ring">${ringSVG(pct)}<div class="pct">${pct}%</div></div>
  </div>`;

  // Warm-up collapsible section
  if (p.warmup) {
    const wu = p.warmup;
    const wuId = "warmup-" + current;
    const isOpen = wu.collapsed === false;
    html += `
      <div class="warmup-section" id="${wuId}">
        <div class="warmup-header" onclick="toggleWarmup('${wuId}')">
          <span class="warmup-label">⚡ WARM-UP</span>
          <span class="warmup-toggle">${isOpen ? '▲' : '▼'}</span>
        </div>
        <div class="warmup-body" style="display:${isOpen ? 'block' : 'none'}">
          ${wu.exercises.map(e => `
            <div class="warmup-card">
              <div class="warmup-name">${e.name}</div>
              <div class="warmup-scheme">${e.sets} × ${e.reps}${e.rest !== '—' ? ' · rest ' + e.rest : ''}</div>
              <div class="warmup-cue">${e.steps[0]}</div>
            </div>
          `).join('')}
        </div>
      </div>`;
  }
  
  let lastGrp = null;
  p.ex.forEach((e, i) => {
    if(e.grp !== lastGrp) { 
      html += `<div class="group">${e.grp}</div>`; 
      lastGrp = e.grp; 
    }
    
    const st = state[e.id] || {done: 0, weight: ""};
    const isDone = st.done >= e.sets;
    let dots = "";
    
    for(let s = 1; s <= e.sets; s++) {
      dots += `<button class="sdot ${s <= st.done ? 'on' : ''}" data-key="${e.id}" data-set="${s}" aria-label="Set ${s}"></button>`;
    }
    
    let isNew = e.gear.some(g => !GEAR_CATALOG.find(gc => gc.name === g)?.def);
    let classes = `card ${isDone ? 'done' : ''} ${e.trimmed ? 'trimmed' : ''} ${isNew ? 'new-injected' : ''}`;
    
    html += `<div class="${classes}">
      <div class="ctop" data-form="${i}">
        <div class="num">${i+1}</div>
        <div class="cmain">
          <div class="cname">${e.name}</div>
          ${(() => {
            const prs = loadPRs();
            const st = state[e.id] || {};
            const weight = parseFloat(st.weight) || 0;
            const pr = prs[e.id];
            if (pr && weight >= pr) return `<div class="card-pr-badge">🏆 PR</div>`;
            if (pr) return `<div class="card-pr-target">↑ ${pr} lb PR</div>`;
            return "";
          })()}
          <div class="ctarget">${e.target}</div>
          <div class="scheme"><b>${e.sets} × ${e.reps}</b>${e.rest !== "—" ? `  ·  rest ${e.rest}` : ""}</div>
          <div class="chips">${e.gear.map(g => `<span class="chip">${g}</span>`).join("")}</div>
        </div>
        <div class="formhint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 6l6 6-6 6"/>
          </svg>FORM
        </div>
      </div>
      <div class="ctrl">
        <div class="sets">${dots}</div>
        ${(() => {
          if (!e.gear.includes("Dumbbells")) return "";
          // Only look up last lift when no weight entered today (perf: skip once filled)
          const lastLift = st.weight ? null : getLastLift(e.id);
          const hitAll = lastLift && lastLift.done >= lastLift.sets;
          const suggest = lastLift ? (hitAll ? lastLift.weight + 5 : lastLift.weight) : null;
          const hintHTML = lastLift ? `
            <button class="overload-hint ${hitAll ? "overload-nudge" : "overload-last"}"
              data-fill="${suggest}" data-w="${e.id}" title="Tap to fill">
              ${hitAll
                ? `↑ Last: ${lastLift.weight}lb (all sets) — tap for ${suggest}lb`
                : `Last session: ${lastLift.weight}lb — tap to fill`}
            </button>` : "";
          return `<div class="wbox"><input type="text" inputmode="decimal" placeholder="${lastLift ? lastLift.weight : "–"}" value="${st.weight || ""}" data-w="${e.id}"><span>LB</span></div>${hintHTML}`;
        })()}
      </div>
    </div>`;
  });
  
  root.innerHTML = html;
  
  // Attach event listeners
  root.querySelectorAll(".sdot").forEach(d => d.onclick = onSet);
  root.querySelectorAll("[data-form]").forEach(t => t.onclick = () => openForm(+t.dataset.form));
  root.querySelectorAll("[data-w]").forEach(inp => inp.onchange = () => {
    const k = inp.dataset.w;
    state[k] = state[k] || {done: 0, weight: ""};
    state[k].weight = inp.value.trim();
    saveDay(current, state);
  });

  // Progressive overload: tap hint badge to auto-fill weight
  root.querySelectorAll(".overload-hint[data-fill]").forEach(btn => {
    btn.onclick = (ev) => {
      ev.stopPropagation();
      const id = btn.dataset.w;
      const w = btn.dataset.fill;
      const inp = root.querySelector(`input[data-w="${id}"]`);
      if (inp) {
        inp.value = w;
        state[id] = state[id] || { done: 0, weight: "" };
        state[id].weight = w;
        saveDay(current, state);
        renderDay(); // re-render so badge disappears and PR badge can appear
      }
    };
  });

  // Calculate pct and render finish section
  const cp = buildPlan()[current];
  if (cp && cp.type === "lift") {
    let t = 0, d = 0;
    (cp.ex || []).forEach(e => {
      if (e.trimmed) return;
      t += e.sets;
      d += Math.min((state[e.id]?.done || 0), e.sets);
    });
    const p = t ? Math.round(d / t * 100) : 0;
    renderFinishBtn(p);
  }
}

function onSet(e){
  startTimer();
  e.stopPropagation();
  const k = e.target.dataset.key, s = +e.target.dataset.set;
  state[k] = state[k] || {done: 0, weight: ""};
  state[k].done = (state[k].done >= s) ? s-1 : s;
  saveDay(current, state); 
  
  // Start rest timer when a set is completed (not uncompleted)
  if (state[k].done > 0) {
    const plan = buildPlan()[current];
    const ex = plan?.ex?.find(e => e.id === k);
    if (ex) {
      const secs = parseRestSeconds(ex.rest);
      if (secs > 0) startRestTimer(secs);
    }
  }
  renderDay();
}

function openForm(i){
  const currentPlan = buildPlan();
  const e = currentPlan[current].ex[i];
  
  const subtitle = e.target.toLowerCase().includes(e.grp.toLowerCase()) || e.grp.toLowerCase().includes(e.target.toLowerCase())
    ? e.grp 
    : `${e.grp} · ${e.target}`;

  const history = getExerciseHistory(e.id);
  const muscleDiagram = typeof buildMuscleDiagram === "function"
    ? buildMuscleDiagram(e.grp, e.target)
    : "";

  const historyHTML = history.length > 1 ? `
    <div class="fsec">
      <div class="label">WEIGHT HISTORY</div>
      <div class="history-chart">
        ${history.slice(-8).map((h, i, arr) => {
          const max = Math.max(...arr.map(x => x.weight));
          const heightPct = Math.round((h.weight / max) * 100);
          return `
            <div class="history-bar-wrap">
              <div class="history-bar-val">${h.weight}</div>
              <div class="history-bar" style="height:${heightPct}%" class="${h.pr ? 'is-pr' : ''}"></div>
              <div class="history-bar-date">${h.date.slice(5)}</div>
            </div>`;
        }).join("")}
      </div>
    </div>` : "";

  const prBadge = renderPRBadge(e.id);

  document.getElementById("formSheet").innerHTML = `
  <div class="grab"></div>
  <div class="fhead">
    <h2>${e.name}</h2>
    <div class="ftarget">${subtitle}</div>
  </div>
  ${prBadge}
  <div class="fstats">
    <div class="fstat"><div class="k">SETS</div><div class="v">${e.sets}</div></div>
    <div class="fstat"><div class="k">REPS</div><div class="v">${e.reps}</div></div>
    <div class="fstat"><div class="k">REST</div><div class="v">${e.rest}</div></div>
    <div class="fstat"><div class="k">TEMPO</div><div class="v">${e.tempo}</div></div>
  </div>
  ${e.why ? `<div class="fwhy"><span class="fwhy-label">WHY THIS MOVE</span><p>${e.why}</p></div>` : ""}
  <div class="fsec"><div class="label">HOW TO DO IT</div>
    ${e.steps.map((s,n) => `<div class="step"><div class="sn">${n+1}</div><p>${s}</p></div>`).join("")}
  </div>
  ${e.breath ? `<div class="fbreath"><span>🫁</span><p><b>Breathing:</b> ${e.breath}</p></div>` : ""}
  <div class="fsec"><div class="label">AVOID THIS</div>
    <div class="avoid">
      <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <p>${e.mistake}</p>
    </div>
  </div>
  ${e.easier || e.harder ? `
  <div class="fsec"><div class="label">MODIFIERS</div>
    ${e.easier ? `<div class="modifier easier"><span class="mod-label">EASIER</span><p>${e.easier}</p></div>` : ""}
    ${e.harder ? `<div class="modifier harder"><span class="mod-label">HARDER</span><p>${e.harder}</p></div>` : ""}
  </div>` : ""}
  ${muscleDiagram}
  ${historyHTML}
  <div class="fchips">${e.gear.map(g => `<span class="chip">${g}</span>`).join("")}</div>
  <button class="closeb" id="closeForm">BACK TO WORKOUT</button>
`;
  
  const m = document.getElementById("formModal");
  m.classList.add("open");
  document.getElementById("formSheet").scrollTop = 0;
  document.getElementById("closeForm").onclick = () => m.classList.remove("open");
}

// Modal event listeners
document.getElementById("formModal").onclick = (e) => { 
  if(e.target.id === "formModal") e.currentTarget.classList.remove("open"); 
};

document.getElementById("gearToggle").onclick = () => {
  document.getElementById("gearPanel").classList.toggle("open");
};

document.getElementById("openPrinciples").onclick = () => {
  document.getElementById("modal").classList.add("open");
};

document.getElementById("closeModal").onclick = () => {
  document.getElementById("modal").classList.remove("open");
};

document.getElementById("modal").onclick = (e) => { 
  if(e.target.id === "modal") e.currentTarget.classList.remove("open"); 
};

document.getElementById("resetDay").onclick = () => { 
  if(confirm("Are you sure you want to reset today's progress?")) {
    state = {}; 
    saveDay(current, state); 
    renderDay(); 
  }
};


const GEAR_CATALOG = [
  { id:"db",        name:"Adjustable Dumbbells", desc:"15–50 lb per hand. Your main driver.", icon:"🏋️", def:true,  cat:"FREE WEIGHTS" },
  { id:"kb",        name:"Kettlebell",            desc:"Swings, Turkish get-up, presses.",     icon:"🎱", def:false, cat:"FREE WEIGHTS" },
  { id:"chair",     name:"Chairs",                desc:"Dips, rows, step-ups, split squats.",  icon:"🪑", def:true,  cat:"FURNITURE" },
  { id:"couch",     name:"Couch Corner",          desc:"Incline presses & pullovers.",         icon:"🛋️", def:true,  cat:"FURNITURE" },
  { id:"pullup",    name:"Pull-Up Bar",           desc:"Pull-ups, chin-ups, hanging core.",    icon:"🚪", def:false, cat:"BODYWEIGHT & BARS" },
  { id:"dipbar",    name:"Dip Bars",              desc:"Full-depth dips, L-sits.",             icon:"⬆️", def:false, cat:"BODYWEIGHT & BARS" },
  { id:"pushupbar", name:"Push-Up Bars",          desc:"Deeper range, wrist-neutral.",         icon:"🧱", def:false, cat:"BODYWEIGHT & BARS" },
  { id:"rings",     name:"Gymnastic Rings",       desc:"Advanced dips, rows, push-ups.",       icon:"⭕", def:false, cat:"BODYWEIGHT & BARS" },
  { id:"bench",     name:"Weight Bench",          desc:"Flat, incline & decline pressing.",    icon:"🛌", def:false, cat:"MACHINES & BENCHES" },
  { id:"trx",       name:"Suspension Trainer",    desc:"Bodyweight rows, core, face pulls.",   icon:"🪢", def:false, cat:"MACHINES & BENCHES" },
  { id:"band",      name:"Resistance Band",       desc:"Pull-aparts, face pulls, stretching.", icon:"〰️", def:true,  cat:"RESISTANCE" },
  { id:"hband",     name:"Heavy Bands",           desc:"Banded squats, rows, curls.",          icon:"⛓️", def:false, cat:"RESISTANCE" },
  { id:"rope",      name:"Jump Rope",             desc:"Warm-up, conditioning, cardio.",       icon:"➰", def:false, cat:"CARDIO & POWER" },
  { id:"plyo",      name:"Plyo Box",              desc:"Box jumps, step-ups, depth drops.",    icon:"📦", def:false, cat:"CARDIO & POWER" },
  { id:"medball",   name:"Medicine Ball",         desc:"Explosive slams, rotational work.",    icon:"🏐", def:false, cat:"CARDIO & POWER" },
  { id:"roller",    name:"Foam Roller",           desc:"Recovery & soft tissue work.",         icon:"🧻", def:true,  cat:"RECOVERY" },
  { id:"abwheel",   name:"Ab Wheel",              desc:"The most effective core tool.",        icon:"🎡", def:false, cat:"RECOVERY" },
];

let gearState = {};
function initGear() {
  GEAR_CATALOG.forEach(g => gearState[g.id] = g.def);
  try {
    const saved = localStorage.getItem(pKey("gear"));
    if(saved) gearState = Object.assign(gearState, JSON.parse(saved));
  } catch(e) {}
  try {
    const savedMuscles = localStorage.getItem(pKey("daymuscles"));
    if (savedMuscles) dayMuscles = JSON.parse(savedMuscles);
  } catch(e) {}
}

function buildPlan() {
  const basePlan = JSON.parse(JSON.stringify(PLAN));
  const g = gearState;

  // Rebuild each day's exercise list based on selected muscles
  ORDER.forEach(k => {
    const selected = dayMuscles[k] || [];
    if (selected.length === 0) return;
    
    if (selected.includes("rest")) {
      basePlan[k].type = "rest";
      basePlan[k].title = "REST";
      basePlan[k].sub = "";
      return;
    } else {
      basePlan[k].type = "lift";
    }

    // Filter base exercises to only those matching selected muscle groups
    const muscleToGrp = {
      chest:     ["CHEST"],
      triceps:   ["TRICEPS"],
      back:      ["BACK"],
      biceps:    ["BICEPS"],
      legs:      ["LEGS"],
      shoulders: ["SHOULDERS"],
      arms:      ["BICEPS","TRICEPS"],
      mobility:  ["RECOVERY","CORE","WARM-UP"],
      rest:      ["REST"],
    };

    const allowedGrps = selected.flatMap(m => muscleToGrp[m] || []);
    basePlan[k].ex = basePlan[k].ex.filter(e => allowedGrps.includes(e.grp));

    // Update day title to reflect selection
    basePlan[k].title = selected.map(m => m.toUpperCase()).join(" + ");
    basePlan[k].sub = selected.length === 2 ? "Paired day" : "Solo day";
  });
  ORDER.forEach((blockKey, idx) => { basePlan[blockKey].day = WEEK_DAYS[idx]; });

  // CHEST + TRICEPS
  if (g["bench"]) {
    basePlan.mon.ex = basePlan.mon.ex.filter(e => !["chest-incline-press","chest-floor-press"].includes(e.id));
    basePlan.mon.ex.unshift(...EXERCISE_LIBRARY.chest.bench.slice(0,3));
  }
  if (g["pushupbar"]) {
    const i = basePlan.mon.ex.findIndex(e => e.id === "chest-pushup-burnout");
    if (i > -1) basePlan.mon.ex.splice(i, 1, ...EXERCISE_LIBRARY.chest.pushupbar);
  }
  if (g["rings"]) { basePlan.mon.ex.push(...EXERCISE_LIBRARY.chest.rings, ...EXERCISE_LIBRARY.triceps.rings); }
  if (g["dipbar"]) {
    ["mon","fri"].forEach(day => {
      const i = basePlan[day].ex.findIndex(e => e.id === "tri-dip-chair");
      if (i > -1) basePlan[day].ex.splice(i, 1, ...EXERCISE_LIBRARY.triceps.dipbar);
    });
  }
  if (g["pushupbar"]) { basePlan.fri.ex.push(EXERCISE_LIBRARY.triceps.pushupbar[0]); }

  // BACK + BICEPS
  if (g["pullup"]) {
    basePlan.tue.ex.unshift(...EXERCISE_LIBRARY.back.pullup.slice(0,3));
    basePlan.tue.ex.push(EXERCISE_LIBRARY.biceps.pullup[0]);
    basePlan.fri.ex.push(EXERCISE_LIBRARY.biceps.pullup[0]);
    basePlan.sat.ex.push(...EXERCISE_LIBRARY.core.pullup);
  }
  if (g["trx"]) {
    basePlan.tue.ex.push(...EXERCISE_LIBRARY.back.trx);
    basePlan.tue.ex.push(EXERCISE_LIBRARY.biceps.trx[0]);
    basePlan.thu.ex.push(EXERCISE_LIBRARY.shoulders.trx[0]);
  }
  if (g["rings"]) { basePlan.tue.ex.push(...EXERCISE_LIBRARY.back.rings); basePlan.sat.ex.push(...EXERCISE_LIBRARY.core.rings); }
  if (g["hband"]) {
    basePlan.tue.ex.push(...EXERCISE_LIBRARY.back.hband, ...EXERCISE_LIBRARY.biceps.hband);
    basePlan.wed.ex.push(...EXERCISE_LIBRARY.legs.hband);
    basePlan.fri.ex.push(...EXERCISE_LIBRARY.biceps.hband);
  }

  // LEGS
  if (g["kb"]) {
    basePlan.wed.ex.unshift(...EXERCISE_LIBRARY.legs.kb);
    basePlan.thu.ex.push(...EXERCISE_LIBRARY.shoulders.kb);
  }
  if (g["plyo"]) {
    const i = basePlan.wed.ex.findIndex(e => e.id === "leg-step-up");
    if (i > -1) basePlan.wed.ex.splice(i, 1, ...EXERCISE_LIBRARY.legs.plyo);
  }
  if (g["medball"]) { basePlan.wed.ex.push(EXERCISE_LIBRARY.legs.medball[0]); }

  // SHOULDERS
  if (g["bench"]) { basePlan.thu.ex.unshift(EXERCISE_LIBRARY.shoulders.bench[0]); }
  if (g["rings"]) { basePlan.thu.ex.push(EXERCISE_LIBRARY.shoulders.rings[0]); }

  // CORE
  if (g["abwheel"]) { basePlan.sat.ex.push(EXERCISE_LIBRARY.core.abwheel[0]); }

  // JUMP ROPE WARMUP
  if (g["rope"]) {
    ORDER.forEach(k => {
      if (basePlan[k].type === "lift") {
        basePlan[k].warmup = { collapsed: true, exercises: EXERCISE_LIBRARY.warmup.rope };
      }
    });
  }

  // SESSION LENGTH LIMITER
  if (sessionLength < 60) {
    const limit = sessionLength === 30 ? 4 : 6;
    const compoundIds = ["chest-incline-press","chest-incline-bench","chest-flat-bench","back-bentover-row","back-pullup","back-singlearm-row","leg-goblet","leg-bulgarian","leg-rdl","leg-kb-swing","sh-ohp","tri-dip-chair","tri-dip-bars","back-chinup","bi-curl"];
    ORDER.forEach(k => {
      if (basePlan[k].type === "lift") {
        const compounds = basePlan[k].ex.filter(e => compoundIds.includes(e.id));
        const isolation = basePlan[k].ex.filter(e => !compoundIds.includes(e.id));
        [...compounds, ...isolation].forEach((e, i) => { e.trimmed = i >= limit; });
        basePlan[k].ex = [...compounds, ...isolation];
      }
    });
  }
  // Remove exercises that require gear the user doesn't have
  ORDER.forEach(k => {
    if (basePlan[k].type === "lift") {
      basePlan[k].ex = basePlan[k].ex.filter(e => {
        if (!e.gear) return true;
        return e.gear.every(requiredGear => {
          const gearMap = {
            "Dumbbells": "db",
            "Chairs": "chair",
            "Couch": "couch",
            "Resistance Band": "band",
            "Foam Roller": "roller",
            "Pull-Up Bar": "pullup",
            "Weight Bench": "bench",
            "Kettlebell": "kb",
            "Dip Bars": "dipbar",
            "Suspension Trainer": "trx",
            "Ab Wheel": "abwheel",
            "Plyo Box": "plyo",
            "Jump Rope": "rope",
            "Medicine Ball": "medball",
            "Heavy Bands": "hband",
            "Push-Up Bars": "pushupbar",
            "Gymnastic Rings": "rings",
            "Bodyweight": null
          };
          const gearId = gearMap[requiredGear];
          return gearId === null || gearState[gearId] === true;
        });
      });
    }
  });

  // Bodyweight fallback — if a lift day has no exercises after gear filter, inject bodyweight plan
  ORDER.forEach(k => {
    if (basePlan[k].type !== "lift") return;
    const muscles = dayMuscles[k] || [];
    if (basePlan[k].ex.length > 0) return; // has exercises, no fallback needed

    // Build fallback from BODYWEIGHT_PLANS based on scheduled muscles
    const fallback = [];
    muscles.forEach(muscle => {
      const bwExercises = BODYWEIGHT_PLANS[muscle];
      if (bwExercises) fallback.push(...bwExercises);
    });

    if (fallback.length > 0) {
      basePlan[k].ex = fallback;
      basePlan[k].isFallback = true;
    }
  });

  updateGearFooter(basePlan);

  // Merge exercise updates (why, breath, easier, harder) into every exercise
  ORDER.forEach(k => {
    if (!basePlan[k].ex) return;
    basePlan[k].ex.forEach(e => {
      if (EXERCISE_UPDATES[e.id]) {
        Object.assign(e, EXERCISE_UPDATES[e.id]);
      }
    });
  });

  return basePlan;
}

function renderGear() {
  try { const s = localStorage.getItem(pKey("gear")); if(s) gearState = Object.assign(gearState, JSON.parse(s)); } catch(e) {}
  const c = document.getElementById("gearListContainer");
  if(!c) return;
  
  const categories = [...new Set(GEAR_CATALOG.map(g => g.cat))];
  c.innerHTML = categories.map(cat => {
    const items = GEAR_CATALOG.filter(g => g.cat === cat);
    return `<div class="gear-section-title">${cat}</div>` + items.map(g => gearHTML(g)).join("");
  }).join("");
  
  c.querySelectorAll('.gear-item').forEach(el => {
    el.onclick = () => {
      gearState[el.dataset.id] = !gearState[el.dataset.id];
      localStorage.setItem(pKey("gear"), JSON.stringify(gearState));
      renderGear();
      renderDay(); // Will re-render plan based on gear later
    };
  });
  
  document.getElementById("saveGearBtn").onclick = () => {
    document.getElementById("gearPanel").classList.remove("open");
  };
}

function gearHTML(g) {
  const active = gearState[g.id] ? " active" : "";
  return `<div class="gear-item${active}" data-id="${g.id}">
    <div class="g-check">✓</div><div class="g-icon">${g.icon}</div>
    <div class="g-content"><div class="g-name">${g.name}</div><div class="g-desc">${g.desc}</div></div>
  </div>`;
}
renderGear();

function updateGearFooter(plan) {
  let unlocked = 0;
  ORDER.forEach(k => {
    if(plan[k].type !== "rest") {
      unlocked += plan[k].ex.length; // Will refine if we have locked exercises
    }
  });
  const f = document.getElementById("gearFooterCount");
  if(f) f.innerText = `${unlocked} exercises unlocked across your week`;
}

let sessionLength = 45;
const sessionSelect = document.getElementById("sessionLength");
if(sessionSelect) {
  const savedLen = localStorage.getItem(pKey("sessionLen"));
  if(savedLen) sessionSelect.value = savedLen;
  sessionLength = parseInt(sessionSelect.value, 10);
  
  sessionSelect.addEventListener("change", (e) => {
    sessionLength = parseInt(e.target.value, 10);
    localStorage.setItem(pKey("sessionLen"), sessionLength);
    renderDay();
  });
}

// --- Schedule Editor Logic ---

// Muscles that are always selected as an inseparable pair.
// Selecting either member auto-selects its partner; deselecting either removes both.
const PAIRED_MUSCLES = {
  chest: "triceps",
  triceps: "chest",
  back: "biceps",
  biceps: "back",
};

const MUSCLES = [
  { id:"chest",     label:"CHEST",     planKey:"mon" },
  { id:"triceps",   label:"TRICEPS",   planKey:"mon" },
  { id:"back",      label:"BACK",      planKey:"tue" },
  { id:"biceps",    label:"BICEPS",    planKey:"tue" },
  { id:"legs",      label:"LEGS",      planKey:"wed" },
  { id:"shoulders", label:"SHOULDERS", planKey:"thu" },
  { id:"arms",      label:"ARMS",      planKey:"fri" },
  { id:"mobility",  label:"MOBILITY",  planKey:"sat" },
  { id:"rest",      label:"REST",      planKey:"sun" },
];

// Maps a day slot to an array of 1-2 muscle ids
// Default mirrors the original paired plan
let dayMuscles = {
  mon: ["chest","triceps"],
  tue: ["back","biceps"],
  wed: ["legs"],
  thu: ["shoulders"],
  fri: ["arms"],
  sat: ["mobility"],
  sun: ["rest"]
};

function getBlockName(k) {
  const muscles = dayMuscles[k] || [];
  return muscles.map(id => {
    const m = MUSCLES.find(m => m.id === id);
    return m ? m.label : id.toUpperCase();
  }).join(" + ");
}

function getDayTitle(k) {
  return getBlockName(k);
}

function renderSchedule() {
  const list = document.getElementById("scheduleList");
  if (!list) return;
  list.innerHTML = "";

  // Sunday is always the last slot and is hard-locked to REST.
  // Enforce this before rendering so drag-and-drop can never override it.
  const SUNDAY_KEY = "sun";
  draftDayMuscles[SUNDAY_KEY] = ["rest"];
  // Ensure sun is always in position 6 regardless of drag history
  if (draftOrder[6] !== SUNDAY_KEY) {
    const sunIdx = draftOrder.indexOf(SUNDAY_KEY);
    if (sunIdx !== -1) {
      draftOrder.splice(sunIdx, 1);
      draftOrder[6] = SUNDAY_KEY;
    }
  }

  // Close-dropdown handler — use a single named function so we can remove+re-add cleanly
  if (renderSchedule._closeDropdowns) {
    document.removeEventListener("click", renderSchedule._closeDropdowns);
  }
  renderSchedule._closeDropdowns = () => {
    document.querySelectorAll(".sd-muscle-dropdown").forEach(d => d.classList.add("hidden"));
  };
  document.addEventListener("click", renderSchedule._closeDropdowns);

  // Work from draftDayMuscles during editing
  WEEK_DAYS.forEach((dayLabel, idx) => {
    const k = draftOrder[idx];
    const isSunday = k === SUNDAY_KEY;
    const selected = isSunday ? ["rest"] : (draftDayMuscles[k] || []);

    const el = document.createElement("div");
    el.className = "sched-day" + (isSunday ? " locked" : "");
    el.dataset.key = k;

    const selectedHTML = selected.length
      ? selected.map(id => `<span class="muscle-tag${id === "rest" ? " rest-tag" : ""}">${id.toUpperCase()}</span>`).join("")
      : `<span class="muscle-tag empty">SELECT</span>`;

    el.innerHTML = `
      <div class="sd-left">
        ${isSunday
          ? `<div class="sd-lock">🔒</div>`
          : `<div class="sd-handle">☰</div>`}
        <div class="sd-name">${dayLabel}</div>
      </div>
      <div class="sd-right">
        <div class="sd-selected" data-key="${k}">${selectedHTML}</div>
        ${!isSunday ? `
        <div class="sd-dropdown-wrap" data-key="${k}">
          <button class="sd-open-btn" data-key="${k}">▼</button>
          <div class="sd-muscle-dropdown hidden" data-key="${k}">
            ${MUSCLES.filter(m => m.id !== "rest").map(m => {
              const isChecked = selected.includes(m.id);
              const partner = PAIRED_MUSCLES[m.id];
              // A slot is "effectively full" when it has 2 muscles and this one isn't already there
              const isFull = !isChecked && selected.filter(s => s !== "rest" && s !== "mobility").length >= 2;
              // Paired muscles can always be toggled together (they replace the pair, not add to 2)
              const isDisabled = isFull && !partner;
              return `<div class="muscle-option ${isChecked ? "checked" : ""} ${isDisabled ? "disabled" : ""}"
                data-day="${k}" data-muscle="${m.id}">
                ${isChecked ? "✓" : "+"} ${m.label}${partner ? ` <span class="pair-hint">+${partner.toUpperCase()}</span>` : ""}
              </div>`;
            }).join("")}
          </div>
        </div>` : ""}
      </div>
    `;

    if (!isSunday) {
      // Drag support — Sunday slot is immovable
      el.draggable = true;
      el.ondragstart = (e) => { e.dataTransfer.setData("text/plain", idx); el.classList.add("dragging"); };
      el.ondragend = () => el.classList.remove("dragging");
      el.ondragover = (e) => { if (idx < 6) e.preventDefault(); }; // Can't drop onto Sunday slot
      el.ondrop = (e) => {
        e.preventDefault();
        if (idx >= 6) return; // Protect Sunday slot
        const fromIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (fromIdx === idx || isNaN(fromIdx) || fromIdx >= 6) return;
        const temp = draftOrder[fromIdx];
        draftOrder[fromIdx] = draftOrder[idx];
        draftOrder[idx] = temp;
        renderSchedule();
      };

      // Dropdown toggle
      el.querySelector(".sd-open-btn").onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll(".sd-muscle-dropdown").forEach(d => {
          if (d.dataset.key !== k) d.classList.add("hidden");
        });
        el.querySelector(".sd-muscle-dropdown").classList.toggle("hidden");
      };

      // Muscle option select/deselect
      el.querySelectorAll(".muscle-option").forEach(opt => {
        opt.onclick = (e) => {
          e.stopPropagation();
          if (opt.classList.contains("disabled")) return;
          const day = opt.dataset.day;
          const muscle = opt.dataset.muscle;
          const partner = PAIRED_MUSCLES[muscle];
          const cur = draftDayMuscles[day] || [];

          if (cur.includes(muscle)) {
            // Deselect — if this muscle has a partner, remove both
            let next = cur.filter(m => m !== muscle);
            if (partner) next = next.filter(m => m !== partner);
            draftDayMuscles[day] = next;
          } else {
            if (muscle === "mobility") {
              // MOBILITY is solo
              draftDayMuscles[day] = [muscle];
            } else if (partner) {
              // Paired muscle — select BOTH, replacing whatever was there
              draftDayMuscles[day] = [muscle, partner];
            } else {
              // Unpaired muscle — strip REST/MOBILITY, cap at 2
              const filtered = cur.filter(m => m !== "rest" && m !== "mobility");
              if (filtered.length >= 2) return;
              draftDayMuscles[day] = [...filtered, muscle];
            }
          }
          renderSchedule();
        };
      });
    } // end if (!isSunday)

    list.appendChild(el);
  });

  checkTrainerWarnings();
}

function checkTrainerWarnings() {
  const box = document.getElementById("trainerTip");
  if (!box) return;

  const schedule = draftOrder.map(k => draftDayMuscles[k] || []);
  const flat = schedule.flat();

  // Count rest days
  const restDays = flat.filter(m => m === "rest").length;
  const mobilityDays = flat.filter(m => m === "mobility").length;
  const trainingDays = draftOrder.filter((k,i) => {
    const ms = draftDayMuscles[k] || [];
    return ms.length > 0 && !ms.includes("rest") && !ms.includes("mobility");
  }).length;

  // Check for back to back same muscle
  let doubleUp = null;
  for (let i = 0; i < draftOrder.length - 1; i++) {
    const today = draftDayMuscles[draftOrder[i]] || [];
    const tomorrow = draftDayMuscles[draftOrder[i+1]] || [];
    const overlap = today.filter(m => tomorrow.includes(m) && m !== "rest" && m !== "mobility");
    if (overlap.length > 0) { doubleUp = overlap[0]; break; }
  }

  // Check for good pairings
  const hasPush = flat.includes("chest") && flat.includes("triceps");
  const hasPull = flat.includes("back") && flat.includes("biceps");
  const hasLegs = flat.includes("legs");
  const hasShoulders = flat.includes("shoulders");

  // Check if arms is solo with no back/bi day
  const hasArmsOnly = flat.includes("arms") && !flat.includes("biceps") && !flat.includes("back");

  // Build tip
  let icon = "💡";
  let tip = "";
  let color = "info";

  if (doubleUp) {
    icon = "⚠️";
    tip = `${doubleUp.toUpperCase()} is scheduled on back-to-back days. Muscles need 48hrs to recover — consider spacing them out.`;
    color = "warn";
  } else if (restDays === 0) {
    icon = "⚠️";
    tip = "No rest days scheduled. At least 1–2 rest or mobility days per week is essential for muscle growth and injury prevention.";
    color = "warn";
  } else if (trainingDays > 5) {
    icon = "⚠️";
    tip = "6–7 training days is a lot. Most people grow faster on 4–5 days with proper recovery. Consider swapping a day to MOBILITY or REST.";
    color = "warn";
  } else if (flat.includes("chest") && !flat.includes("triceps")) {
    icon = "💡";
    tip = "CHEST day without TRICEPS — your triceps assist every press. Consider pairing them together for maximum efficiency.";
    color = "info";
  } else if (flat.includes("back") && !flat.includes("biceps")) {
    icon = "💡";
    tip = "BACK day without BICEPS — your biceps assist every row and pull. They're a natural pair and save you a separate arm day.";
    color = "info";
  } else if (flat.includes("triceps") && !flat.includes("chest")) {
    icon = "💡";
    tip = "TRICEPS without CHEST — consider pairing these on a push day. Chest presses pre-fatigue the triceps perfectly.";
    color = "info";
  } else if (hasArmsOnly) {
    icon = "💡";
    tip = "ARMS day works great as a second hit for biceps and triceps — but make sure they already appear in a BACK+BI or CHEST+TRI day earlier in the week.";
    color = "info";
  } else if (restDays + mobilityDays < 2) {
    icon = "💡";
    tip = "Consider adding a MOBILITY day — 10 minutes of foam rolling and stretching accelerates recovery and keeps joints healthy long term.";
    color = "info";
  } else if (hasPush && hasPull && hasLegs && hasShoulders && restDays >= 1) {
    icon = "✅";
    tip = "Solid week. You've got push, pull, legs and shoulders covered with rest built in — that's a complete, balanced program.";
    color = "good";
  } else if (hasPush && hasPull && hasLegs) {
    icon = "✅";
    tip = "Good foundation — push, pull and legs are the three pillars of a complete program. Add shoulders for a full upper body split.";
    color = "good";
  } else {
    icon = "💡";
    tip = "Classic pairing: CHEST + TRICEPS, BACK + BICEPS, then LEGS and SHOULDERS solo. That covers every muscle group efficiently across the week.";
    color = "info";
  }

  box.className = `trainer-tip tip-${color}`;
  box.innerHTML = `<span class="tip-icon">${icon}</span><span class="tip-text">${tip}</span>`;
}

// Schedule Modal Listeners
const sbtn = document.getElementById("scheduleToggle");
if(sbtn) {
  sbtn.onclick = () => {
    draftOrder = [...ORDER];
    draftDayMuscles = JSON.parse(JSON.stringify(dayMuscles));
    renderSchedule();
    document.getElementById("scheduleModal").classList.add("open");
  };
}

const sreset = document.getElementById("scheduleReset");
if(sreset) {
  sreset.onclick = () => {
    draftOrder = [...DEFAULT_ORDER];
    renderSchedule();
  };
}

const ssave = document.getElementById("saveSchedule");
if(ssave) {
  ssave.onclick = () => {
    // Always guarantee Sunday is last and locked to REST before saving
    draftDayMuscles["sun"] = ["rest"];
    if (draftOrder[6] !== "sun") {
      const sunIdx = draftOrder.indexOf("sun");
      if (sunIdx !== -1) draftOrder.splice(sunIdx, 1);
      draftOrder[6] = "sun";
    }
    ORDER = [...draftOrder];
    dayMuscles = JSON.parse(JSON.stringify(draftDayMuscles));
    try { localStorage.setItem(pKey("schedule"), JSON.stringify(ORDER)); } catch(e) {}
    try { localStorage.setItem(pKey("daymuscles"), JSON.stringify(dayMuscles)); } catch(e) {}
    // Clean up the global click listener
    if (renderSchedule._closeDropdowns) {
      document.removeEventListener("click", renderSchedule._closeDropdowns);
      renderSchedule._closeDropdowns = null;
    }
    renderNav();
    selectDay(current);
    document.getElementById("scheduleModal").classList.remove("open");
  };
}

// Rest timer interactions


function initApp() {
  // Check for existing profiles
  const profiles = getProfileList();
  const savedActive = getActiveProfileId();

  if (profiles.length === 0) {
    // Brand new install — create default profile and go to onboarding
    renderProfileSetup();
    return;
  } else if (savedActive && profiles.includes(savedActive)) {
    // Returning user with a valid active profile
    activeProfileId = savedActive;
    initGear();
    if (isFirstTimeUser()) {
      renderOnboarding();
    } else {
      renderNav();
      selectDay(current);
    }
  } else {
    // Has profiles but no active one — show profile selector
    activeProfileId = profiles[0];
    setActiveProfileId(profiles[0]);
    initGear();
    renderNav();
    selectDay(current);
  }
  if (typeof initRestTimer === 'function') initRestTimer();
  renderProfileAvatar();
}

initApp();

function renderProfileAvatar() {
  const profile = getProfile(activeProfileId);
  if (!profile) return;

  const existing = document.getElementById("profileAvatar");
  if (existing) existing.remove();

  const btn = document.createElement("button");
  btn.id = "profileAvatar";
  btn.className = "profile-avatar";
  btn.style.background = profile.color;
  btn.textContent = profile.name.charAt(0).toUpperCase();
  btn.onclick = () => renderProfileSheet();

  const header = document.querySelector("header .brand");
  if (header) header.parentNode.insertBefore(btn, header.nextSibling);
}

function renderProfileSheet() {
  const existing = document.getElementById("profileSheet");
  if (existing) existing.remove();

  const profiles = getProfileList();
  const sheet = document.createElement("div");
  sheet.id = "profileSheet";
  sheet.className = "profile-sheet-overlay";

  const profileRows = profiles.map(id => {
    const p = getProfile(id);
    if (!p) return "";
    const isActive = id === activeProfileId;
    return `<div class="profile-row ${isActive ? 'active' : ''}" data-id="${id}">
      <div class="profile-row-avatar" style="background:${p.color}">${p.name.charAt(0).toUpperCase()}</div>
      <div class="profile-row-info">
        <div class="profile-row-name">${p.name}</div>
        ${isActive ? '<div class="profile-row-active">ACTIVE</div>' : ''}
      </div>
      ${!isActive ? `<button class="profile-row-delete" data-id="${id}">✕</button>` : ''}
    </div>`;
  }).join("");

  const profileCount = profiles.length;
  const atLimit = profileCount >= 2;

  const addSection = atLimit ? `
    <div class="profile-limit-card">
      <div class="profile-limit-icon">👫</div>
      <div class="profile-limit-title">BUILT FOR TWO</div>
      <div class="profile-limit-text">The Forge is designed for you and a partner — one subscription, two profiles, full independence. Multi-profile support coming in a future update.</div>
    </div>` : `
    <div class="profile-add-wrap">
      <input id="newProfileName" class="profile-name-input" placeholder="Partner's name..." maxlength="20">
      <div class="profile-colors">
        ${["#00d4ff","#00dc82","#ff5b1e","#ffa12e","#a855f7","#ec4899","#f43f5e","#6366f1"].map(c =>
          `<div class="color-dot" data-color="${c}" style="background:${c}"></div>`
        ).join("")}
      </div>
      <button class="profile-add-btn" id="addProfileBtn">+ ADD PARTNER PROFILE</button>
    </div>`;

  sheet.innerHTML = `
    <div class="profile-sheet">
      <div class="grab"></div>
      <div class="profile-sheet-title">PROFILES</div>
      <div class="profile-list">${profileRows}</div>
      ${addSection}
      <button class="closeb" id="closeProfileSheet">DONE</button>
    </div>`;

  document.body.appendChild(sheet);

  // Switch profile
  sheet.querySelectorAll(".profile-row").forEach(row => {
    row.onclick = (e) => {
      if (e.target.classList.contains("profile-row-delete")) return;
      const id = row.dataset.id;
      if (id === activeProfileId) return;
      setActiveProfileId(id);
      activeProfileId = id;
      initGear();
      renderNav();
      selectDay(current);
      renderProfileAvatar();
      sheet.remove();
    };
  });

  // Delete profile
  sheet.querySelectorAll(".profile-row-delete").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const p = getProfile(id);
      if (confirm(`Delete profile "${p?.name}"? All data will be lost.`)) {
        deleteProfile(id);
        renderProfileSheet();
      }
    };
  });

  // Color selection
  let selectedColor = "#00d4ff";
  sheet.querySelectorAll(".color-dot").forEach(dot => {
    dot.onclick = () => {
      sheet.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
      dot.classList.add("selected");
      selectedColor = dot.dataset.color;
    };
  });
  sheet.querySelector(".color-dot").classList.add("selected");

  // Add profile
  const addBtn = document.getElementById("addProfileBtn");
  if (addBtn) addBtn.onclick = () => {
    const name = document.getElementById("newProfileName").value.trim();
    if (!name) return;
    const profile = createProfile(name, selectedColor);
    setActiveProfileId(profile.id);
    activeProfileId = profile.id;
    initGear();
    sheet.remove();
    renderOnboarding();
    renderProfileAvatar();
  };

  // Close
  document.getElementById("closeProfileSheet").onclick = () => sheet.remove();
  sheet.onclick = (e) => { if (e.target.id === "profileSheet") sheet.remove(); };
}

function closeScheduleModal() {
  draftOrder = [];
  if (renderSchedule._closeDropdowns) {
    document.removeEventListener("click", renderSchedule._closeDropdowns);
    renderSchedule._closeDropdowns = null;
  }
  document.getElementById("scheduleModal").classList.remove("open");
}

document.getElementById("cancelScheduleBtn").onclick = closeScheduleModal;

document.getElementById("scheduleModal").onclick = (e) => {
  if (e.target.id === "scheduleModal") closeScheduleModal();
};


function toggleWarmup(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const body = section.querySelector(".warmup-body");
  const toggle = section.querySelector(".warmup-toggle");
  const isOpen = body.style.display !== "none";
  body.style.display = isOpen ? "none" : "block";
  toggle.textContent = isOpen ? "▼" : "▲";
}

function getLogKey(dateStr, dayKey) {
  return pKey(`log:${dateStr}-${dayKey}`);
}

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadLogIndex() {
  try {
    const raw = localStorage.getItem(pKey("log:index"));
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveLogIndex(index) {
  try { localStorage.setItem(pKey("log:index"), JSON.stringify(index)); } catch(e) {}
}

function saveSession(dayKey, pct) {
  const today = getTodayString();
  const key = getLogKey(today, dayKey);
  const plan = buildPlan()[dayKey];

  const exercises = (plan.ex || []).map(e => {
    const s = state[e.id] || {};
    const done = Math.min(s.done || 0, e.sets);
    const weight = parseFloat(s.weight) || 0;
    const prKey = pKey("prs");
    let isPR = false;
    try {
      const prs = JSON.parse(localStorage.getItem(prKey) || "{}");
      if (weight > 0 && (!prs[e.id] || weight > prs[e.id])) {
        prs[e.id] = weight;
        localStorage.setItem(prKey, JSON.stringify(prs));
        isPR = true;
      }
    } catch(err) {}
    return { id: e.id, name: e.name, sets: e.sets, done, weight, pr: isPR };
  });

  const session = {
    id: `${today}-${dayKey}`,
    date: today,
    dayKey,
    muscles: dayMuscles[dayKey] || [],
    completed: pct >= 70,
    pct,
    duration: timerSeconds > 0 ? Math.max(1, Math.floor(timerSeconds / 60)) : 0,
    exercises
  };

  try {
    localStorage.setItem(key, JSON.stringify(session));
    const index = loadLogIndex();
    if (!index.includes(session.id)) {
      index.unshift(session.id);
      saveLogIndex(index);
    }
  } catch(e) {}

  stopTimer();
  return session;
}

function loadTodaySession(dayKey) {
  const today = getTodayString();
  const key = getLogKey(today, dayKey);
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function renderFinishBtn(pct) {
  const existing = document.getElementById("finishSection");
  if (existing) existing.remove();

  const session = loadTodaySession(current);
  const el = document.createElement("div");
  el.id = "finishSection";

  if (session && session.completed) {
    // Already completed — show completion banner
    const prs = session.exercises.filter(e => e.pr);
    el.innerHTML = `
      <div class="complete-banner">
        <div class="complete-icon">✓</div>
        <div class="complete-meta">
          <div class="complete-title">WORKOUT COMPLETE</div>
          <div class="complete-stats">
            ${session.duration}min · ${session.pct}% · ${session.exercises.reduce((a,e) => a + e.done, 0)} sets
          </div>
          ${prs.length ? `<div class="complete-prs">🏆 ${prs.length} new PR${prs.length > 1 ? "s" : ""}: ${prs.map(e => e.name).join(", ")}</div>` : ""}
        </div>
      </div>`;
  } else if (pct >= 70) {
    // Show finish button when 50%+ done
    el.innerHTML = `
      <button class="finish-btn" id="finishBtn">
        ${pct >= 100 ? "✓ WORKOUT COMPLETE" : `✓ FINISH WORKOUT · ${pct}%`}
      </button>`;
  } else {
    return; // Don't show anything below 50%
  }

  document.getElementById("day").appendChild(el);

  const btn = document.getElementById("finishBtn");
  if (btn) {
    btn.onclick = () => {
      const currentPct = (() => {
        const p = buildPlan()[current];
        let total = 0, done = 0;
        (p.ex || []).forEach(e => {
          if (e.trimmed) return;
          total += e.sets;
          done += Math.min((state[e.id]?.done || 0), e.sets);
        });
        return total ? Math.round(done / total * 100) : 0;
      })();
      saveSession(current, currentPct);
      renderDay();
    };
  }
}

function getDayStatus(dayKey) {
  const today = getTodayString();
  const key = pKey(`log:${today}-${dayKey}`);
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return "untouched";
    const session = JSON.parse(raw);
    if (session.completed) return "complete";
    if (session.pct > 0) return "inprogress";
    return "untouched";
  } catch(e) { return "untouched"; }
}

function getWeekSummary() {
  const today = getTodayString();
  const summary = {
    daysCompleted: 0,
    daysPlanned: 0,
    totalSets: 0,
    totalVolume: 0,
    totalMinutes: 0,
    streak: 0,
    muscleVolume: {},
    sessions: []
  };

  ORDER.forEach(k => {
    if (dayMuscles[k]?.includes("rest")) return;
    summary.daysPlanned++;
    const key = getLogKey(today, k);
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const session = JSON.parse(raw);
      summary.sessions.push(session);
      if (session.completed) summary.daysCompleted++;
      summary.totalMinutes += session.duration || 0;
      session.exercises.forEach(e => {
        summary.totalSets += e.done || 0;
        const vol = (e.done || 0) * (e.weight || 0);
        summary.totalVolume += vol;
        session.muscles.forEach(m => {
          summary.muscleVolume[m] = (summary.muscleVolume[m] || 0) + vol;
        });
      });
    } catch(e) {}
  });

  // Calculate streak from log index
  try {
    const index = loadLogIndex();
    let streak = 0;
    let checkDate = new Date();
    for (let i = 0; i < 30; i++) {
      const dateStr = checkDate.toISOString().split("T")[0];
      const hasSession = index.some(id => {
        const key = pKey(`log:${id}`);
        try {
          const raw = localStorage.getItem(key);
          if (!raw) return false;
          const s = JSON.parse(raw);
          return s.date === dateStr && s.completed;
        } catch(e) { return false; }
      });
      if (hasSession) { streak++; }
      else if (i > 0) { break; }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    summary.streak = streak;
  } catch(e) {}

  return summary;
}

function renderDashboard() {
  const root = document.getElementById("day");
  const summary = getWeekSummary();
  const completePct = summary.daysPlanned
    ? Math.round(summary.daysCompleted / summary.daysPlanned * 100)
    : 0;

  const muscleRows = Object.entries(summary.muscleVolume)
    .sort((a,b) => b[1] - a[1])
    .map(([muscle, vol]) => {
      const max = Math.max(...Object.values(summary.muscleVolume));
      const barPct = max ? Math.round(vol / max * 100) : 0;
      return `
        <div class="dash-muscle-row">
          <div class="dash-muscle-label">${muscle.toUpperCase()}</div>
          <div class="dash-muscle-bar-wrap">
            <div class="dash-muscle-bar" style="width:${barPct}%"></div>
          </div>
          <div class="dash-muscle-vol">${vol > 0 ? vol.toLocaleString() + " lb" : "—"}</div>
        </div>`;
    }).join("");

  const sessionRows = summary.sessions.map(s => `
    <div class="dash-session-row">
      <div class="dash-session-left">
        <div class="dash-session-muscles">${s.muscles.map(m => m.toUpperCase()).join(" + ")}</div>
        <div class="dash-session-meta">${s.duration}min · ${s.exercises.reduce((a,e) => a + e.done, 0)} sets</div>
      </div>
      <div class="dash-session-pct ${s.completed ? "done" : "partial"}">${s.pct}%</div>
    </div>`).join("");

  root.innerHTML = `
    <div class="dashboard">

      <div class="dash-stats-grid">
        <div class="dash-stat">
          <div class="dash-stat-val">${summary.daysCompleted}<span class="dash-stat-of">/${summary.daysPlanned}</span></div>
          <div class="dash-stat-label">DAYS DONE</div>
        </div>
        <div class="dash-stat">
          <div class="dash-stat-val">${summary.totalSets}</div>
          <div class="dash-stat-label">TOTAL SETS</div>
        </div>
        <div class="dash-stat">
          <div class="dash-stat-val">${summary.totalMinutes}<span class="dash-stat-of">min</span></div>
          <div class="dash-stat-label">TIME TRAINED</div>
        </div>
        <div class="dash-stat ${summary.streak > 0 ? "streak-active" : ""}">
          <div class="dash-stat-val">${summary.streak}🔥</div>
          <div class="dash-stat-label">DAY STREAK</div>
        </div>
      </div>

      <div class="dash-week-bar">
        <div class="dash-week-fill" style="width:${completePct}%"></div>
        <div class="dash-week-label">${completePct}% OF WEEK COMPLETE</div>
      </div>

      ${summary.totalVolume > 0 ? `
      <div class="dash-section">
        <div class="dash-section-title">VOLUME BY MUSCLE</div>
        ${muscleRows}
      </div>` : ""}

      ${summary.sessions.length > 0 ? `
      <div class="dash-section">
        <div class="dash-section-title">THIS WEEK'S SESSIONS</div>
        ${sessionRows}
        <button class="hist-view-all" id="viewHistoryBtn">VIEW ALL HISTORY →</button>
      </div>` : `
      <div class="dash-empty">
        <div class="dash-empty-icon">⚡</div>
        <div class="dash-empty-text">No sessions logged yet this week.<br>Complete your first workout to see your stats here.</div>
      </div>`}

    </div>`;

  const histBtn = document.getElementById("viewHistoryBtn");
  if (histBtn) histBtn.onclick = () => renderHistory();
}

document.getElementById("thisWeekBtn").onclick = () => {
  const isDash = document.getElementById("day").querySelector(".dashboard");
  if (isDash) {
    selectDay(current);
  } else {
    renderDashboard();
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  }
};

function loadPRs() {
  try {
    const raw = localStorage.getItem(pKey("prs"));
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function getExerciseHistory(exerciseId) {
  try {
    const index = loadLogIndex();
    const history = [];
    index.forEach(id => {
      const raw = localStorage.getItem(pKey(`log:${id}`));
      if (!raw) return;
      const session = JSON.parse(raw);
      const ex = session.exercises?.find(e => e.id === exerciseId);
      if (ex && ex.weight > 0) {
        history.push({
          date: session.date,
          weight: ex.weight,
          sets: ex.done,
          pr: ex.pr
        });
      }
    });
    return history.sort((a,b) => a.date.localeCompare(b.date));
  } catch(e) { return []; }
}

function renderPRBadge(exerciseId) {
  const prs = loadPRs();
  const pr = prs[exerciseId];
  if (!pr) return "";
  return `<div class="pr-badge">🏆 PR: ${pr} lb</div>`;
}

// Returns the most recent prior-session data for an exercise (skips today).
// Used to power progressive overload suggestions.
function getLastLift(exerciseId) {
  try {
    const index = loadLogIndex(); // newest first
    const today = getTodayString();
    for (const id of index) {
      if (id.startsWith(today)) continue; // skip anything logged today
      const raw = localStorage.getItem(pKey(`log:${id}`));
      if (!raw) continue;
      const session = JSON.parse(raw);
      if (session.date === today) continue;
      const ex = session.exercises?.find(e => e.id === exerciseId);
      if (ex && ex.weight > 0) {
        return { weight: ex.weight, done: ex.done, sets: ex.sets, date: session.date };
      }
    }
    return null;
  } catch(e) { return null; }
}

function renderHistory() {
  const root = document.getElementById("day");
  const index = loadLogIndex();

  if (index.length === 0) {
    root.innerHTML = `
      <div class="hist-header">
        <button class="hist-back" id="histBack">← BACK</button>
        <h2 class="hist-title">HISTORY</h2>
      </div>
      <div class="dash-empty">
        <div class="dash-empty-icon">📋</div>
        <div class="dash-empty-text">No workout history yet.<br>Complete your first session to start tracking.</div>
      </div>`;
    document.getElementById("histBack").onclick = () => renderDashboard();
    return;
  }

  // Group sessions by week
  const weeks = {};
  index.forEach(id => {
    try {
      const raw = localStorage.getItem(pKey(`log:${id}`));
      if (!raw) return;
      const session = JSON.parse(raw);
      const date = new Date(session.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay() + 1);
      const weekKey = weekStart.toISOString().split("T")[0];
      if (!weeks[weekKey]) weeks[weekKey] = [];
      weeks[weekKey].push(session);
    } catch(e) {}
  });

  const weekHTML = Object.entries(weeks)
    .sort((a,b) => b[0].localeCompare(a[0]))
    .map(([weekKey, sessions]) => {
      const weekDate = new Date(weekKey);
      const weekLabel = weekDate.toLocaleDateString("en-US", { month:"short", day:"numeric" });
      const totalSets = sessions.reduce((a,s) => a + s.exercises.reduce((b,e) => b + e.done, 0), 0);
      const totalMins = sessions.reduce((a,s) => a + (s.duration || 0), 0);
      const completed = sessions.filter(s => s.completed).length;

      const sessionHTML = sessions
        .sort((a,b) => b.date.localeCompare(a.date))
        .map(s => {
          const prs = s.exercises.filter(e => e.pr);
          const topLifts = s.exercises
            .filter(e => e.weight > 0)
            .sort((a,b) => b.weight - a.weight)
            .slice(0,3)
            .map(e => `${e.name}: ${e.weight}lb`)
            .join(" · ");

          return `
            <div class="hist-session" data-id="${s.id}">
              <div class="hist-session-top">
                <div class="hist-session-left">
                  <div class="hist-session-muscles">
                    ${s.muscles.map(m => m.toUpperCase()).join(" + ")}
                  </div>
                  <div class="hist-session-date">
                    ${new Date(s.date).toLocaleDateString("en-US", {weekday:"short", month:"short", day:"numeric"})}
                    · ${s.duration}min
                  </div>
                </div>
                <div class="hist-session-right">
                  <div class="hist-pct ${s.completed ? "done" : "partial"}">${s.pct}%</div>
                  <div class="hist-sets">${s.exercises.reduce((a,e) => a + e.done, 0)} sets</div>
                </div>
              </div>
              ${topLifts ? `<div class="hist-top-lifts">${topLifts}</div>` : ""}
              ${prs.length ? `<div class="hist-prs">🏆 PR: ${prs.map(e => e.name).join(", ")}</div>` : ""}
            </div>`;
        }).join("");

      return `
        <div class="hist-week">
          <div class="hist-week-header">
            <div class="hist-week-label">WEEK OF ${weekLabel.toUpperCase()}</div>
            <div class="hist-week-meta">${completed}/${sessions.length} days · ${totalSets} sets · ${totalMins}min</div>
          </div>
          ${sessionHTML}
        </div>`;
    }).join("");

  root.innerHTML = `
    <div class="hist-header">
      <button class="hist-back" id="histBack">← BACK</button>
      <h2 class="hist-title">HISTORY</h2>
      <div class="hist-count">${index.length} sessions</div>
    </div>
    ${weekHTML}`;

  document.getElementById("histBack").onclick = () => renderDashboard();
}

function parseRestSeconds(restStr) {
  if (!restStr || restStr === "—") return 0;
  const match = restStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function startRestTimer(seconds) {
  clearInterval(restInterval);
  restSeconds = seconds;
  restTotal = seconds;
  updateRestDisplay();
  showRestTimer();

  // Use wall-clock delta so background tab throttling can't cause drift.
  const restEndTime = Date.now() + seconds * 1000;
  restInterval = setInterval(() => {
    const remaining = Math.ceil((restEndTime - Date.now()) / 1000);
    restSeconds = Math.max(0, remaining);
    updateRestDisplay();
    if (restSeconds <= 0) {
      clearInterval(restInterval);
      restInterval = null;
      restTimerDone();
    }
  }, 200); // Poll at 200 ms so the display stays crisp even after tab wakeup
}

function stopRestTimer() {
  clearInterval(restInterval);
  restInterval = null;
  hideRestTimer();
}

function updateRestDisplay() {
  const el = document.getElementById("restCountdown");
  const ring = document.getElementById("restRing");
  const label = document.getElementById("restLabel");
  if (!el) return;

  const m = Math.floor(restSeconds / 60);
  const s = restSeconds % 60;
  el.textContent = restSeconds > 0
    ? `${m > 0 ? m + ":" : ""}${String(s).padStart(2,"0")}`
    : "GO!";

  if (label) label.textContent = restSeconds > 0 ? "REST" : "NEXT SET";

  // Update ring
  if (ring) {
    const pct = restTotal > 0 ? restSeconds / restTotal : 0;
    const r = 28;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct);
    ring.style.strokeDasharray = circ;
    ring.style.strokeDashoffset = offset;
    // Color shifts from cyan to green as rest completes
    ring.style.stroke = restSeconds <= 0 ? "#00dc82" : "#00d4ff";
  }
}

function restTimerDone() {
  updateRestDisplay();
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  const toast = document.getElementById("restToast");
  if (toast) {
    toast.classList.add("rest-flash");
    setTimeout(() => toast.classList.remove("rest-flash"), 600);
  }
  // Auto dismiss after 2 seconds when done
  setTimeout(() => {
    if (restSeconds <= 0) hideRestTimer();
  }, 2000);
}

function showRestTimer() {
  const toast = document.getElementById("restToast");
  if (toast) toast.classList.add("active");
  
  // Re-attach skip handler every time timer shows
  const skipBtn = document.getElementById("restSkip");
  if (skipBtn) {
    skipBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      stopRestTimer();
    };
  }
}

function hideRestTimer() {
  const toast = document.getElementById("restToast");
  if (toast) toast.classList.remove("active");
  restSeconds = 0;
  restTotal = 0;
}


function renderProfileSetup() {
  const overlay = document.getElementById("onboardOverlay");
  const content = document.getElementById("onboardContent");
  if (!overlay || !content) return;

  document.getElementById("appShell").style.display = "none";
  overlay.classList.remove("hidden");

  const colors = ["#00d4ff","#00dc82","#ff5b1e","#ffa12e","#a855f7","#ec4899","#f43f5e","#6366f1"];
  let selectedColor = "#00d4ff";

  content.innerHTML = `
    <div class="onboard-screen">
      <div class="onboard-hero">
        <div class="onboard-logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2.1" stroke-linecap="round">
            <path d="M4 9v6M20 9v6M7 7v10M17 7v10M7 12h10"/>
          </svg>
        </div>
        <h1 class="onboard-hero-title">THE<br>FORGE</h1>
        <p class="onboard-hero-tag">HOME BUILT · NO EXCUSES</p>
      </div>
      <div class="profile-setup-card">
        <div class="profile-setup-label">WHAT'S YOUR NAME?</div>
        <input id="setupName" class="profile-name-input" placeholder="Enter your name..." maxlength="20" autofocus>
        <div class="profile-setup-label" style="margin-top:16px">PICK YOUR COLOR</div>
        <div class="profile-colors">
          ${colors.map((c,i) => `<div class="color-dot ${i===0?'selected':''}" data-color="${c}" style="background:${c}"></div>`).join("")}
        </div>
      </div>
      <button class="onboard-cta" id="setupContinue">CONTINUE →</button>
    </div>`;

  content.querySelectorAll(".color-dot").forEach(dot => {
    dot.onclick = () => {
      content.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
      dot.classList.add("selected");
      selectedColor = dot.dataset.color;
    };
  });

  document.getElementById("setupContinue").onclick = () => {
    const name = document.getElementById("setupName").value.trim();
    if (!name) {
      document.getElementById("setupName").style.borderColor = "#f43f5e";
      return;
    }
    const profile = createProfile(name, selectedColor);
    setActiveProfileId(profile.id);
    activeProfileId = profile.id;
    initGear();
    overlay.classList.add("hidden");
    document.getElementById("appShell").style.display = "";
    renderOnboarding();
    renderProfileAvatar();
  };
}

function renderOnboarding() {
  const overlay = document.getElementById("onboardOverlay");
  const content = document.getElementById("onboardContent");
  if (!overlay || !content) return;

  // Hide main app
  document.getElementById("appShell").style.display = "none";
  overlay.classList.remove("hidden");

  let step = 1;

  function goToStep(n) {
    content.style.opacity = "0";
    content.style.transform = "translateY(16px)";
    setTimeout(() => {
      step = n;
      renderStep();
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    }, 200);
  }

  function stepDots(current) {
    return `<div class="onboard-dots">
      ${[1,2,3].map(i => `<div class="onboard-dot ${i === current ? 'active' : i < current ? 'done' : ''}"></div>`).join("")}
    </div>`;
  }

  function renderStep() {
    if (step === 1) {
      content.innerHTML = `
        <div class="onboard-screen">
          <div class="onboard-glow"></div>
          <div class="onboard-hero">
            <div class="onboard-logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2.1" stroke-linecap="round">
                <path d="M4 9v6M20 9v6M7 7v10M17 7v10M7 12h10"/>
              </svg>
            </div>
            <h1 class="onboard-hero-title">THE<br>FORGE</h1>
            <p class="onboard-hero-tag">HOME BUILT · NO EXCUSES</p>
          </div>
          <div class="onboard-features-list">
            <div class="onboard-feat"><div class="onboard-feat-icon" style="background:rgba(0,212,255,.12);color:#00d4ff">⚡</div><div><div class="onboard-feat-title">Dynamic workouts</div><div class="onboard-feat-desc">Built around your gear, updated instantly when you add equipment</div></div></div>
            <div class="onboard-feat"><div class="onboard-feat-icon" style="background:rgba(0,220,130,.1);color:#00dc82">📋</div><div><div class="onboard-feat-title">Full form coaching</div><div class="onboard-feat-desc">Step-by-step cues, breathing, and modifiers for every exercise</div></div></div>
            <div class="onboard-feat"><div class="onboard-feat-icon" style="background:rgba(255,161,46,.1);color:#ffa12e">🏆</div><div><div class="onboard-feat-title">Progress tracking</div><div class="onboard-feat-desc">PRs, history, weekly dashboard and session logs</div></div></div>
            <div class="onboard-feat"><div class="onboard-feat-icon" style="background:rgba(255,91,30,.1);color:#ff5b1e">🗓️</div><div><div class="onboard-feat-title">Your schedule</div><div class="onboard-feat-desc">Pick your muscles, pair your days, build your perfect split</div></div></div>
          </div>
          <button class="onboard-cta" id="onboardCta1">GET STARTED →</button>
          ${stepDots(1)}
        </div>`;
      document.getElementById("onboardCta1").onclick = () => goToStep(2);

    } else if (step === 2) {
      const gearHTML = GEAR_CATALOG.map(g => `
        <div class="onboard-gear-row ${gearState[g.id] ? 'selected' : ''}" data-id="${g.id}">
          <div class="onboard-gear-row-icon">${g.icon}</div>
          <div class="onboard-gear-row-info">
            <div class="onboard-gear-row-name">${g.name}</div>
            <div class="onboard-gear-row-desc">${g.desc}</div>
          </div>
          <div class="onboard-gear-row-check">${gearState[g.id] ? '✓' : ''}</div>
        </div>`).join("");

      content.innerHTML = `
        <div class="onboard-screen">
          <div class="onboard-screen-header">
            ${stepDots(2)}
            <h2 class="onboard-screen-title">What's in your home gym?</h2>
            <p class="onboard-screen-sub">Select everything you have access to. Your workouts will be built around this — you can update it anytime.</p>
          </div>
          <div class="onboard-gear-scroll">${gearHTML}</div>
          <button class="onboard-cta" id="onboardCta2">NEXT →</button>
        </div>`;

      content.querySelectorAll(".onboard-gear-row").forEach(row => {
        row.onclick = () => {
          const id = row.dataset.id;
          gearState[id] = !gearState[id];
          row.classList.toggle("selected", gearState[id]);
          row.querySelector(".onboard-gear-row-check").textContent = gearState[id] ? "✓" : "";
        };
      });

      document.getElementById("onboardCta2").onclick = () => {
        try { localStorage.setItem(pKey("gear"), JSON.stringify(gearState)); } catch(e) {}
        goToStep(3);
      };

    } else if (step === 3) {
      const scheduleHTML = ORDER.slice(0,6).map((k, idx) => {
        const dayLabel = ["MON","TUE","WED","THU","FRI","SAT"][idx];
        const selected = dayMuscles[k] || [];
        return `
          <div class="onboard-sched-row">
            <div class="onboard-sched-day">${dayLabel}</div>
            <div class="onboard-sched-muscles">
              ${selected.map(m => `<span class="onboard-muscle-tag">${m.toUpperCase()}</span>`).join("")}
              ${selected.length === 0 ? `<span class="onboard-muscle-empty">tap ▼</span>` : ""}
            </div>
            <div class="onboard-sched-dropdown-wrap">
              <button class="onboard-sched-btn" data-day="${k}">▼</button>
              <div class="onboard-sched-dropdown hidden" data-day="${k}">
                ${MUSCLES.filter(m => m.id !== "rest").map(m => `
                  <div class="onboard-muscle-opt ${selected.includes(m.id) ? 'checked' : ''}"
                    data-day="${k}" data-muscle="${m.id}">
                    ${selected.includes(m.id) ? "✓" : "+"} ${m.label}
                  </div>`).join("")}
              </div>
            </div>
          </div>`;
      }).join("");

      content.innerHTML = `
        <div class="onboard-screen">
          <div class="onboard-screen-header">
            ${stepDots(3)}
            <h2 class="onboard-screen-title">Build your weekly split</h2>
            <p class="onboard-screen-sub">Choose which muscles to train each day. Max 2 per day. Classic pairing: Chest+Tri, Back+Bi, Legs, Shoulders.</p>
          </div>
          <div class="onboard-sched-list">${scheduleHTML}</div>
          <button class="onboard-cta" id="onboardCta3">START TRAINING →</button>
        </div>`;

      content.querySelectorAll(".onboard-sched-btn").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          content.querySelectorAll(".onboard-sched-dropdown").forEach(d => {
            if (d.dataset.day !== btn.dataset.day) d.classList.add("hidden");
          });
          content.querySelector(`.onboard-sched-dropdown[data-day="${btn.dataset.day}"]`).classList.toggle("hidden");
        };
      });

      content.querySelectorAll(".onboard-muscle-opt").forEach(opt => {
        opt.onclick = (e) => {
          e.stopPropagation();
          const day = opt.dataset.day;
          const muscle = opt.dataset.muscle;
          const cur = dayMuscles[day] || [];
          if (cur.includes(muscle)) {
            dayMuscles[day] = cur.filter(m => m !== muscle);
          } else {
            if (muscle === "mobility") {
              dayMuscles[day] = [muscle];
            } else {
              const filtered = cur.filter(m => m !== "rest" && m !== "mobility");
              if (filtered.length >= 2) return;
              dayMuscles[day] = [...filtered, muscle];
            }
          }
          renderStep();
        };
      });

      document.addEventListener("click", () => {
        content.querySelectorAll(".onboard-sched-dropdown").forEach(d => d.classList.add("hidden"));
      }, { once: true });

      document.getElementById("onboardCta3").onclick = () => {
        try { localStorage.setItem(pKey("daymuscles"), JSON.stringify(dayMuscles)); } catch(e) {}
        completeOnboarding();
        overlay.classList.add("hidden");
        document.getElementById("appShell").style.display = "";
        renderNav();
        selectDay(current);
      };
    }
  }

  content.style.transition = "opacity .2s ease, transform .2s ease";
  renderStep();
}

