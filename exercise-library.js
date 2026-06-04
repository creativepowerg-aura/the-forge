// ── THE FORGE — Exercise Library ──────────────────────────
// Keyed by muscle group then gear id.
// buildPlan() reads from here when gear is toggled.

const EXERCISE_LIBRARY = {

  // ── CHEST ──────────────────────────────────────────────
  chest: {
    bench: [
      { id:"chest-incline-bench", name:"Incline DB Bench Press", target:"Upper chest", grp:"CHEST", sets:4, reps:"8–12", rest:"90s", tempo:"2-1", gear:["Dumbbells","Weight Bench"], steps:["Set bench to 30–45°.","Press from chest to full lockout.","Control the descent — don't drop."], mistake:"Angle too steep shifts work to shoulders — stay at 30–45°." },
      { id:"chest-flat-bench", name:"Flat DB Bench Press", target:"Mid chest", grp:"CHEST", sets:4, reps:"8–12", rest:"90s", tempo:"2-1", gear:["Dumbbells","Weight Bench"], steps:["Lie flat, DBs at chest level.","Press up to full lockout.","Lower past the chest line for full range."], mistake:"Cutting range short — lower until you feel the stretch." },
      { id:"chest-decline-bench", name:"Decline DB Press", target:"Lower chest", grp:"CHEST", sets:3, reps:"10–12", rest:"75s", tempo:"2-1", gear:["Dumbbells","Weight Bench"], steps:["Set bench to slight decline.","Press from lower chest upward.","Control down."], mistake:"Too much weight before mastering the angle." },
      { id:"chest-fly-bench", name:"DB Fly on Bench", target:"Chest stretch", grp:"CHEST", sets:3, reps:"12–15", rest:"45s", tempo:"slow", gear:["Dumbbells","Weight Bench"], steps:["Lie flat, DBs above chest, slight elbow bend.","Open arms wide until you feel the stretch.","Squeeze back together."], mistake:"Dropping too fast — control every inch of the stretch." },
      { id:"chest-pullover-bench", name:"DB Pullover on Bench", target:"Chest + lats", grp:"CHEST", sets:3, reps:"12", rest:"60s", tempo:"slow", gear:["Dumbbells","Weight Bench"], steps:["Lie across bench, one DB over chest.","Lower behind head — feel the stretch.","Pull back over chest."], mistake:"Bending elbows to muscle it — keep the arc wide." }
    ],
    pushupbar: [
      { id:"chest-deep-pushup", name:"Deep Push-Up on Handles", target:"Full chest", grp:"CHEST", sets:3, reps:"AMRAP", rest:"60s", tempo:"2-1", gear:["Push-Up Bars","Bodyweight"], steps:["Grip handles, body in a straight line.","Lower past the handles for a deep chest stretch.","Press up explosively."], mistake:"Sagging hips — brace abs and glutes and stay rigid." },
      { id:"chest-archer-pushup", name:"Archer Push-Up", target:"Unilateral chest", grp:"CHEST", sets:3, reps:"8/side", rest:"75s", tempo:"2-1", gear:["Push-Up Bars","Bodyweight"], steps:["Wide grip on handles.","Lower toward one side, extending the opposite arm straight.","Press back to center."], mistake:"Rushing — this is a controlled strength movement." }
    ],
    rings: [
      { id:"chest-ring-pushup", name:"Ring Push-Up", target:"Chest + stabilizers", grp:"CHEST", sets:3, reps:"10–12", rest:"75s", tempo:"2-1", gear:["Gymnastic Rings"], steps:["Grip rings, turn them out at the top.","Lower with control, let rings rotate naturally.","Press up and turn rings out at lockout."], mistake:"Rings too high — lower them for more horizontal chest load." },
      { id:"chest-ring-fly", name:"Ring Fly", target:"Chest isolation", grp:"CHEST", sets:3, reps:"8–10", rest:"90s", tempo:"slow", gear:["Gymnastic Rings"], steps:["Lean forward into rings, arms wide.","Open like a fly — feel the stretch.","Pull back together squeezing the chest hard."], mistake:"Going too wide before you have the strength — start shallow." }
    ]
  },

  // ── BACK ───────────────────────────────────────────────
  back: {
    pullup: [
      { id:"back-pullup", name:"Pull-Up", target:"Lats", grp:"BACK", sets:4, reps:"Max reps", rest:"90s", tempo:"2-1", gear:["Pull-Up Bar"], steps:["Dead hang, overhand grip shoulder-width.","Pull until chin clears the bar.","Lower fully — dead hang every rep."], mistake:"Half reps — full extension at the bottom is non-negotiable." },
      { id:"back-chinup", name:"Chin-Up", target:"Lats + biceps", grp:"BACK", sets:3, reps:"Max reps", rest:"90s", tempo:"2-1", gear:["Pull-Up Bar"], steps:["Underhand grip, shoulder width.","Pull chin to bar.","Lower fully."], mistake:"Swinging for momentum — if you can't do clean reps, do negatives." },
      { id:"back-wide-pullup", name:"Wide-Grip Pull-Up", target:"Lat width", grp:"BACK", sets:3, reps:"Max reps", rest:"90s", tempo:"2-1", gear:["Pull-Up Bar"], steps:["Hands wider than shoulders, overhand.","Pull chest toward the bar.","Lower with full control."], mistake:"Pulling with biceps — initiate by depressing the shoulder blades first." },
      { id:"back-negative-pullup", name:"Negative Pull-Up", target:"Lats — beginner", grp:"BACK", sets:3, reps:"5–8", rest:"90s", tempo:"5s down", gear:["Pull-Up Bar"], steps:["Jump or step to the top position.","Lower yourself as slowly as possible — full 5 seconds.","Drop, reset, repeat."], mistake:"Dropping fast — the slow lowering is the entire stimulus." }
    ],
    trx: [
      { id:"back-trx-row", name:"TRX Row", target:"Mid back + rear delts", grp:"BACK", sets:3, reps:"12–15", rest:"60s", tempo:"2-1", gear:["Suspension Trainer"], steps:["Lean back holding handles, body in a straight line.","Pull chest to handles, elbows driving back.","Lower with full control."], mistake:"Hips sagging — stay rigid like a plank the entire set." },
      { id:"back-trx-facepull", name:"TRX Face Pull", target:"Rear delts + rotator cuff", grp:"BACK", sets:3, reps:"15", rest:"45s", tempo:"slow", gear:["Suspension Trainer"], steps:["Face the anchor point, lean back slightly.","Pull handles to your forehead, elbows high and wide.","Return slowly."], mistake:"Pulling to chest instead of face — elbows must stay high." }
    ],
    rings: [
      { id:"back-ring-row", name:"Ring Row", target:"Mid back", grp:"BACK", sets:4, reps:"10–12", rest:"60s", tempo:"2-1", gear:["Gymnastic Rings"], steps:["Lean back into rings, body straight.","Pull chest to rings, elbows back.","Lower fully."], mistake:"Hips dropping — squeeze glutes and stay straight." },
      { id:"back-ring-pullup", name:"Ring Pull-Up", target:"Lats + stabilizers", grp:"BACK", sets:3, reps:"Max reps", rest:"90s", tempo:"2-1", gear:["Gymnastic Rings"], steps:["Hang from rings.","Pull up letting rings rotate naturally.","Lower fully."], mistake:"Fighting the rotation — let the rings turn in." }
    ],
    hband: [
      { id:"back-banded-row", name:"Banded Bent-Over Row", target:"Mid back", grp:"BACK", sets:3, reps:"15–20", rest:"60s", tempo:"2-1", gear:["Heavy Bands"], steps:["Stand on band, hinge forward at hips.","Row both handles to your hips.","Squeeze shoulder blades and lower."], mistake:"Standing too upright — maintain the hip hinge." },
      { id:"back-banded-pullapart", name:"Heavy Band Pull-Apart", target:"Rear delts + upper back", grp:"BACK", sets:3, reps:"15", rest:"45s", tempo:"slow", gear:["Heavy Bands"], steps:["Arms straight at shoulder height, band between hands.","Pull apart to chest, squeezing shoulder blades.","Controlled return."], mistake:"Using momentum — slow and strict." }
    ]
  },

  // ── SHOULDERS ──────────────────────────────────────────
  shoulders: {
    kb: [
      { id:"sh-kb-press", name:"KB Single-Arm Press", target:"Delts + core stability", grp:"SHOULDERS", sets:3, reps:"8–10/side", rest:"75s", tempo:"2-1", gear:["Kettlebell"], steps:["Clean KB to rack position at shoulder.","Press straight overhead to lockout.","Lower back to rack with control."], mistake:"Leaning away from the kettlebell — stay tall and brace your core." },
      { id:"sh-kb-getup", name:"Turkish Get-Up", target:"Total body stability", grp:"SHOULDERS", sets:3, reps:"3/side", rest:"90s", tempo:"slow", gear:["Kettlebell"], steps:["Lie down, KB pressed overhead in one hand.","Stand up keeping KB locked overhead the entire time.","Reverse back down step by step."], mistake:"Rushing any step — this is slow and deliberate every single rep." }
    ],
    bench: [
      { id:"sh-seated-bench-press", name:"DB Shoulder Press on Bench", target:"Delts", grp:"SHOULDERS", sets:4, reps:"8–12", rest:"90s", tempo:"2-1", gear:["Dumbbells","Weight Bench"], steps:["Sit upright on bench, DBs at ear height.","Press straight overhead to lockout.","Lower under control to ear height."], mistake:"DBs drifting forward — keep them stacked directly over your elbows." }
    ],
    trx: [
      { id:"sh-trx-ytw", name:"TRX Y-T-W Raise", target:"Rear delts + rotator cuff", grp:"SHOULDERS", sets:3, reps:"10 each", rest:"45s", tempo:"slow", gear:["Suspension Trainer"], steps:["Face anchor point, lean back.","Raise arms into Y shape, then T shape, then W shape.","Control every position — this is shoulder health work."], mistake:"Using momentum — pure isolation, no speed." }
    ],
    rings: [
      { id:"sh-ring-support", name:"Ring Support Hold", target:"Shoulder stability", grp:"SHOULDERS", sets:3, reps:"20–30s", rest:"60s", tempo:"static", gear:["Gymnastic Rings"], steps:["Press up to support position on rings.","Turn rings outward, body perfectly straight.","Hold as long as possible with control."], mistake:"Rings facing inward — turn them out to protect your shoulders." }
    ]
  },

  // ── TRICEPS ────────────────────────────────────────────
  triceps: {
    dipbar: [
      { id:"tri-dip-bars", name:"Parallel Bar Dip", target:"Triceps + lower chest", grp:"TRICEPS", sets:4, reps:"10–15", rest:"75s", tempo:"2-1", gear:["Dip Bars"], steps:["Support on bars, slight forward lean.","Lower until upper arms are parallel to floor.","Press to full lockout."], mistake:"Going too deep before you have the strength — parallel is enough to start." },
      { id:"tri-dip-weighted", name:"Weighted Dip", target:"Triceps overload", grp:"TRICEPS", sets:3, reps:"6–10", rest:"90s", tempo:"2-1", gear:["Dip Bars","Dumbbells"], steps:["Hold a DB between your legs or use a belt.","Dip with full control.","Press to lockout."], mistake:"Swinging the weight — strict reps only." }
    ],
    rings: [
      { id:"tri-ring-dip", name:"Ring Dip", target:"Triceps + stabilizers", grp:"TRICEPS", sets:4, reps:"8–10", rest:"90s", tempo:"2-1", gear:["Gymnastic Rings"], steps:["Support on rings turned out.","Lower with control, rings will rotate slightly.","Press up and turn rings out at lockout."], mistake:"Not turning rings out at the top — your wrist and shoulder health depends on it." },
      { id:"tri-ring-ext", name:"Ring Tricep Extension", target:"Triceps", grp:"TRICEPS", sets:3, reps:"10–12", rest:"45s", tempo:"2-1", gear:["Gymnastic Rings"], steps:["Face away from anchor, grip rings overhead.","Lower face toward rings by bending elbows only.","Extend back up."], mistake:"Elbows flaring wide — keep them narrow." }
    ],
    pushupbar: [
      { id:"tri-diamond-pushup", name:"Diamond Push-Up on Bars", target:"Triceps", grp:"TRICEPS", sets:3, reps:"AMRAP", rest:"45s", tempo:"2-1", gear:["Push-Up Bars","Bodyweight"], steps:["Handles close together in diamond shape.","Lower chest toward hands, elbows tight.","Press up."], mistake:"Hips rising — stay in a rigid plank." }
    ]
  },

  // ── BICEPS ─────────────────────────────────────────────
  biceps: {
    pullup: [
      { id:"bi-chinup-bar", name:"Chin-Up", target:"Biceps + lats", grp:"BICEPS", sets:4, reps:"Max reps", rest:"90s", tempo:"2-1", gear:["Pull-Up Bar"], steps:["Underhand grip, shoulder width.","Pull chin to bar — feel the bicep peak.","Lower fully."], mistake:"Half reps — full extension every single time." },
      { id:"bi-close-underhand-row", name:"Close Underhand Bar Row", target:"Biceps + mid back", grp:"BICEPS", sets:3, reps:"10–12", rest:"75s", tempo:"2-1", gear:["Pull-Up Bar"], steps:["Hang from bar underhand, lean body back.","Pull chest to bar.","Lower with control."], mistake:"Swinging hips — pull with the arms." }
    ],
    hband: [
      { id:"bi-band-curl", name:"Banded Curl", target:"Biceps", grp:"BICEPS", sets:3, reps:"15–20", rest:"45s", tempo:"2-1", gear:["Heavy Bands"], steps:["Stand on band, handles in hands.","Curl up with constant tension throughout.","Lower slowly — don't let it snap back."], mistake:"Letting the band snap back — the negative builds the muscle." },
      { id:"bi-band-hammer", name:"Banded Hammer Curl", target:"Brachialis + forearms", grp:"BICEPS", sets:3, reps:"15", rest:"45s", tempo:"2-1", gear:["Heavy Bands"], steps:["Stand on band, neutral grip throughout.","Curl up.","Lower slowly."], mistake:"Rushing — slow negative is the whole point." }
    ],
    trx: [
      { id:"bi-trx-curl", name:"TRX Bicep Curl", target:"Biceps + core", grp:"BICEPS", sets:3, reps:"12–15", rest:"45s", tempo:"2-1", gear:["Suspension Trainer"], steps:["Face anchor, lean back, arms straight.","Curl hands to temples — body stays rigid.","Lower with full control."], mistake:"Hips dropping — stay in a straight line the entire set." }
    ]
  },

  // ── LEGS ───────────────────────────────────────────────
  legs: {
    kb: [
      { id:"leg-kb-swing", name:"KB Swing", target:"Hamstrings + glutes + conditioning", grp:"LEGS", sets:4, reps:"15", rest:"60s", tempo:"explosive", gear:["Kettlebell"], steps:["Hinge at hips, KB between legs.","Drive hips forward explosively.","Let KB float to chest height — arms are just a guide."], mistake:"Squatting it down — the power comes entirely from the hip hinge." },
      { id:"leg-kb-goblet", name:"KB Goblet Squat", target:"Quads + glutes", grp:"LEGS", sets:4, reps:"12", rest:"90s", tempo:"2-1", gear:["Kettlebell"], steps:["Hold KB at chest by the horns.","Squat deep, elbows inside knees at the bottom.","Drive up through the whole foot."], mistake:"Heels rising — keep the whole foot planted." },
      { id:"leg-kb-sldl", name:"KB Single-Leg Deadlift", target:"Hamstrings + balance", grp:"LEGS", sets:3, reps:"8/side", rest:"75s", tempo:"slow", gear:["Kettlebell"], steps:["Stand on one leg, KB in opposite hand.","Hinge forward, extend rear leg behind you.","Return to standing — feel the hamstring."], mistake:"Rushing — slow down and feel the stretch each rep." }
    ],
    plyo: [
      { id:"leg-box-jump", name:"Box Jump", target:"Explosive leg power", grp:"LEGS", sets:3, reps:"8", rest:"90s", tempo:"explosive", gear:["Plyo Box"], steps:["Stand in front of box, athletic stance.","Load hips and explode up onto the box.","ALWAYS step down — never jump down."], mistake:"Jumping down off the box — step down every time to protect your knees." },
      { id:"leg-box-stepup", name:"Box Step-Up with Knee Drive", target:"Quads + glutes", grp:"LEGS", sets:3, reps:"10/side", rest:"60s", tempo:"controlled", gear:["Plyo Box","Dumbbells"], steps:["Step onto box, drive opposite knee up at the top.","Control back down.","Complete all reps on one side then switch."], mistake:"Using the bottom leg to push off — top leg only." },
      { id:"leg-depth-drop", name:"Depth Drop", target:"Reactive strength", grp:"LEGS", sets:3, reps:"6", rest:"90s", tempo:"explosive", gear:["Plyo Box"], steps:["Stand on box edge.","Step off and land softly on both feet simultaneously.","Absorb the landing through hips and knees."], mistake:"Landing stiff-legged — soft knees and hips absorb the impact." }
    ],
    hband: [
      { id:"leg-banded-squat", name:"Banded Squat", target:"Glutes + quads", grp:"LEGS", sets:3, reps:"15", rest:"60s", tempo:"2-1", gear:["Heavy Bands"], steps:["Stand on band, handles at shoulders.","Squat deep.","Drive up — band adds tension at the top."], mistake:"Knees caving inward — the band challenges this, push knees out." },
      { id:"leg-banded-rdl", name:"Banded Romanian Deadlift", target:"Hamstrings", grp:"LEGS", sets:3, reps:"15", rest:"60s", tempo:"slow", gear:["Heavy Bands"], steps:["Stand on band, hinge at hips.","Feel hamstring stretch at the bottom.","Drive hips forward to stand."], mistake:"Bending knees too much — keep them soft, not bent." },
      { id:"leg-banded-lunge", name:"Banded Reverse Lunge", target:"Quads + glutes", grp:"LEGS", sets:3, reps:"12/side", rest:"45s", tempo:"2-1", gear:["Heavy Bands"], steps:["Band under front foot, handles at shoulders.","Step back into lunge.","Drive through front leg to return."], mistake:"Torso falling forward — chest stays tall." }
    ],
    medball: [
      { id:"leg-squat-slam", name:"Squat to Slam", target:"Legs + conditioning", grp:"LEGS", sets:3, reps:"10", rest:"60s", tempo:"explosive", gear:["Medicine Ball"], steps:["Hold ball overhead, feet shoulder width.","Squat down and slam the ball hard as you rise.","Catch on the bounce and repeat."], mistake:"Using only arms — drive the power from your legs and hips." }
    ]
  },

  // ── CORE ───────────────────────────────────────────────
  core: {
    abwheel: [
      { id:"core-abwheel", name:"Ab Wheel Rollout", target:"Full core", grp:"CORE", sets:4, reps:"8–10", rest:"60s", tempo:"slow", gear:["Ab Wheel"], steps:["From knees, wheel directly below shoulders.","Roll out slowly until body is nearly flat.","Pull back using abs — not hip flexors."], mistake:"Arching the lower back on the way out — brace hard before you move an inch." }
    ],
    pullup: [
      { id:"core-hanging-knee", name:"Hanging Knee Raise", target:"Core + hip flexors", grp:"CORE", sets:3, reps:"12–15", rest:"45s", tempo:"controlled", gear:["Pull-Up Bar"], steps:["Dead hang from bar.","Bring knees to chest — no swinging.","Lower with control."], mistake:"Swinging — slow down and do each rep from a dead stop." },
      { id:"core-hanging-leg", name:"Hanging Straight Leg Raise", target:"Core", grp:"CORE", sets:3, reps:"10", rest:"45s", tempo:"controlled", gear:["Pull-Up Bar"], steps:["Dead hang.","Raise straight legs to 90°.","Lower with full control."], mistake:"Using momentum — each rep starts from a complete stop." }
    ],
    rings: [
      { id:"core-ring-plank", name:"Ring Plank", target:"Core stability", grp:"CORE", sets:3, reps:"20–30s", rest:"60s", tempo:"static", gear:["Gymnastic Rings"], steps:["Forearms in rings close to floor.","Hold a rigid plank position.","The rings try to spread — resist them the entire hold."], mistake:"Hips rising to compensate — stay completely flat." },
      { id:"core-bodysaw", name:"Ring Body Saw", target:"Core anti-extension", grp:"CORE", sets:3, reps:"10", rest:"60s", tempo:"slow", gear:["Gymnastic Rings"], steps:["Feet in rings, forearms on floor in plank.","Rock body forward and back like a saw blade.","Control every inch of movement."], mistake:"Hips rising as you push forward — stay flat." }
    ]
  },

  // ── WARMUP ─────────────────────────────────────────────
  warmup: {
    rope: [
      { id:"warmup-rope", name:"Jump Rope", target:"Blood flow + coordination", sets:1, reps:"3–5 min", rest:"—", tempo:"easy", gear:["Jump Rope"], steps:["Light consistent jumps, arms relaxed.","Wrists do the turning — not your arms.","Build pace gradually over the 3–5 minutes."], mistake:"Going hard immediately — this is activation, not a cardio workout." },
      { id:"warmup-mobility", name:"Arm Circles + Leg Swings", target:"Joint mobility", sets:1, reps:"10 each direction", rest:"—", tempo:"easy", gear:["Bodyweight"], steps:["Big slow arm circles forward then backward.","Swing legs forward and sideways, holding a wall if needed.","Finish with 10 slow hip circles each direction."], mistake:"Skipping this — cold joints are injury-prone joints." }
    ]
  }
};
