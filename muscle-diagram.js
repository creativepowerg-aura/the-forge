// ── THE FORGE — Muscle Diagram System ────────────────────
// SVG front + back body silhouette with highlighted muscle regions.
// Called by openForm() to render a visual muscle map.

const MUSCLE_REGIONS = {
  // Maps muscle group ids and target strings to SVG region ids
  "chest":      ["region-chest-l","region-chest-r"],
  "upper chest":["region-chest-upper-l","region-chest-upper-r"],
  "mid chest":  ["region-chest-l","region-chest-r"],
  "lower chest":["region-chest-lower-l","region-chest-lower-r"],
  "triceps":    ["region-tricep-l","region-tricep-r"],
  "tricep":     ["region-tricep-l","region-tricep-r"],
  "biceps":     ["region-bicep-l","region-bicep-r"],
  "bicep":      ["region-bicep-l","region-bicep-r"],
  "back":       ["region-back-upper-l","region-back-upper-r","region-back-mid-l","region-back-mid-r"],
  "lats":       ["region-lat-l","region-lat-r"],
  "traps":      ["region-trap-l","region-trap-r"],
  "lower back": ["region-back-lower-l","region-back-lower-r"],
  "shoulders":  ["region-delt-front-l","region-delt-front-r","region-delt-side-l","region-delt-side-r"],
  "front delts":["region-delt-front-l","region-delt-front-r"],
  "side delts": ["region-delt-side-l","region-delt-side-r"],
  "rear delts": ["region-delt-rear-l","region-delt-rear-r"],
  "legs":       ["region-quad-l","region-quad-r","region-ham-l","region-ham-r"],
  "quads":      ["region-quad-l","region-quad-r"],
  "hamstrings": ["region-ham-l","region-ham-r"],
  "glutes":     ["region-glute-l","region-glute-r"],
  "calves":     ["region-calf-l","region-calf-r"],
  "core":       ["region-abs"],
  "abs":        ["region-abs"],
  "forearms":   ["region-forearm-l","region-forearm-r"],
};

function getMuscleRegions(grp, target) {
  const active = new Set();
  const search = [grp, target].join(" ").toLowerCase();
  Object.entries(MUSCLE_REGIONS).forEach(([key, regions]) => {
    if (search.includes(key)) regions.forEach(r => active.add(r));
  });
  return active;
}

function buildMuscleDiagram(grp, target) {
  const activeRegions = getMuscleRegions(grp, target);
  const highlight = "#00d4ff";
  const highlightGlow = "rgba(0,212,255,0.4)";
  const bodyFill = "#22222e";
  const bodyStroke = "#35354a";
  const activeFill = highlight;

  function regionFill(id) {
    return activeRegions.has(id) ? activeFill : bodyFill;
  }
  function regionOpacity(id) {
    return activeRegions.has(id) ? "1" : "0.85";
  }
  function regionFilter(id) {
    return activeRegions.has(id) ? `filter:drop-shadow(0 0 4px ${highlightGlow})` : "";
  }

  const frontSVG = `<svg viewBox="0 0 120 280" xmlns="http://www.w3.org/2000/svg" class="muscle-svg">
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    <!-- Head -->
    <ellipse cx="60" cy="22" rx="16" ry="19" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1.2"/>

    <!-- Neck -->
    <rect x="53" y="38" width="14" height="12" rx="4" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1"/>

    <!-- Shoulders -->
    <ellipse id="region-delt-front-l" cx="30" cy="62" rx="12" ry="10" fill="${regionFill("region-delt-front-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-delt-front-l")}" style="${regionFilter("region-delt-front-l")}"/>
    <ellipse id="region-delt-front-r" cx="90" cy="62" rx="12" ry="10" fill="${regionFill("region-delt-front-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-delt-front-r")}" style="${regionFilter("region-delt-front-r")}"/>
    <ellipse id="region-delt-side-l" cx="20" cy="65" rx="8" ry="9" fill="${regionFill("region-delt-side-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-delt-side-l")}" style="${regionFilter("region-delt-side-l")}"/>
    <ellipse id="region-delt-side-r" cx="100" cy="65" rx="8" ry="9" fill="${regionFill("region-delt-side-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-delt-side-r")}" style="${regionFilter("region-delt-side-r")}"/>

    <!-- Chest -->
    <path id="region-chest-upper-l" d="M42 52 Q38 58 36 68 Q45 70 54 68 Q54 58 50 52 Z" fill="${regionFill("region-chest-upper-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-chest-upper-l")}" style="${regionFilter("region-chest-upper-l")}"/>
    <path id="region-chest-upper-r" d="M78 52 Q82 58 84 68 Q75 70 66 68 Q66 58 70 52 Z" fill="${regionFill("region-chest-upper-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-chest-upper-r")}" style="${regionFilter("region-chest-upper-r")}"/>
    <path id="region-chest-l" d="M36 68 Q34 78 36 86 Q45 88 54 84 Q54 72 54 68 Q45 70 36 68 Z" fill="${regionFill("region-chest-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-chest-l")}" style="${regionFilter("region-chest-l")}"/>
    <path id="region-chest-r" d="M84 68 Q86 78 84 86 Q75 88 66 84 Q66 72 66 68 Q75 70 84 68 Z" fill="${regionFill("region-chest-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-chest-r")}" style="${regionFilter("region-chest-r")}"/>
    <path id="region-chest-lower-l" d="M36 86 Q36 92 40 96 Q47 96 54 94 Q54 88 54 84 Q45 88 36 86 Z" fill="${regionFill("region-chest-lower-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-chest-lower-l")}" style="${regionFilter("region-chest-lower-l")}"/>
    <path id="region-chest-lower-r" d="M84 86 Q84 92 80 96 Q73 96 66 94 Q66 88 66 84 Q75 88 84 86 Z" fill="${regionFill("region-chest-lower-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-chest-lower-r")}" style="${regionFilter("region-chest-lower-r")}"/>

    <!-- Abs -->
    <path id="region-abs" d="M47 96 Q44 106 44 116 Q48 118 54 118 Q60 118 66 118 Q72 118 76 116 Q76 106 73 96 Q66 94 54 94 Q47 96 47 96 Z" fill="${regionFill("region-abs")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-abs")}" style="${regionFilter("region-abs")}"/>

    <!-- Biceps -->
    <ellipse id="region-bicep-l" cx="24" cy="90" rx="8" ry="14" fill="${regionFill("region-bicep-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-bicep-l")}" style="${regionFilter("region-bicep-l")}"/>
    <ellipse id="region-bicep-r" cx="96" cy="90" rx="8" ry="14" fill="${regionFill("region-bicep-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-bicep-r")}" style="${regionFilter("region-bicep-r")}"/>

    <!-- Forearms -->
    <ellipse id="region-forearm-l" cx="18" cy="120" rx="6" ry="14" fill="${regionFill("region-forearm-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-forearm-l")}" style="${regionFilter("region-forearm-l")}"/>
    <ellipse id="region-forearm-r" cx="102" cy="120" rx="6" ry="14" fill="${regionFill("region-forearm-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-forearm-r")}" style="${regionFilter("region-forearm-r")}"/>

    <!-- Torso outline -->
    <path d="M42 50 Q30 54 18 62 Q12 72 14 90 Q14 110 16 130 Q16 140 20 148 Q38 152 44 152 Q44 140 44 130 Q50 132 60 132 Q70 132 76 130 Q76 140 76 152 Q82 152 100 148 Q104 140 106 130 Q108 110 106 90 Q108 72 102 62 Q90 54 78 50 Q70 46 60 46 Q50 46 42 50 Z" fill="none" stroke="${bodyStroke}" stroke-width="1.5"/>

    <!-- Quads -->
    <path id="region-quad-l" d="M20 150 Q18 168 20 186 Q26 192 36 192 Q42 188 44 178 Q44 162 44 150 Q38 152 20 150 Z" fill="${regionFill("region-quad-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-quad-l")}" style="${regionFilter("region-quad-l")}"/>
    <path id="region-quad-r" d="M100 150 Q102 168 100 186 Q94 192 84 192 Q78 188 76 178 Q76 162 76 150 Q82 152 100 150 Z" fill="${regionFill("region-quad-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-quad-r")}" style="${regionFilter("region-quad-r")}"/>

    <!-- Knees -->
    <ellipse cx="32" cy="196" rx="10" ry="8" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1"/>
    <ellipse cx="88" cy="196" rx="10" ry="8" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1"/>

    <!-- Calves front -->
    <path id="region-calf-l" d="M22 204 Q20 220 22 238 Q28 244 36 242 Q42 238 42 224 Q42 210 40 204 Q32 202 22 204 Z" fill="${regionFill("region-calf-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-calf-l")}" style="${regionFilter("region-calf-l")}"/>
    <path id="region-calf-r" d="M98 204 Q100 220 98 238 Q92 244 84 242 Q78 238 78 224 Q78 210 80 204 Q88 202 98 204 Z" fill="${regionFill("region-calf-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-calf-r")}" style="${regionFilter("region-calf-r")}"/>

    <!-- Feet -->
    <ellipse cx="32" cy="248" rx="12" ry="6" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1"/>
    <ellipse cx="88" cy="248" rx="12" ry="6" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1"/>

    <!-- Label -->
    <text x="60" y="268" text-anchor="middle" font-family="monospace" font-size="7" fill="#6a6a72" letter-spacing="2">FRONT</text>
  </svg>`;

  const backSVG = `<svg viewBox="0 0 120 280" xmlns="http://www.w3.org/2000/svg" class="muscle-svg">
    <!-- Head back -->
    <ellipse cx="60" cy="22" rx="16" ry="19" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1.2"/>

    <!-- Neck back -->
    <rect x="53" y="38" width="14" height="12" rx="4" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1"/>

    <!-- Traps -->
    <path id="region-trap-l" d="M42 46 Q36 50 30 56 Q28 62 32 66 Q40 62 48 58 Q50 52 42 46 Z" fill="${regionFill("region-trap-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-trap-l")}" style="${regionFilter("region-trap-l")}"/>
    <path id="region-trap-r" d="M78 46 Q84 50 90 56 Q92 62 88 66 Q80 62 72 58 Q70 52 78 46 Z" fill="${regionFill("region-trap-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-trap-r")}" style="${regionFilter("region-trap-r")}"/>

    <!-- Rear delts -->
    <ellipse id="region-delt-rear-l" cx="28" cy="64" rx="11" ry="10" fill="${regionFill("region-delt-rear-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-delt-rear-l")}" style="${regionFilter("region-delt-rear-l")}"/>
    <ellipse id="region-delt-rear-r" cx="92" cy="64" rx="11" ry="10" fill="${regionFill("region-delt-rear-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-delt-rear-r")}" style="${regionFilter("region-delt-rear-r")}"/>

    <!-- Upper back -->
    <path id="region-back-upper-l" d="M36 66 Q34 76 36 88 Q44 92 54 90 Q54 76 52 66 Q44 64 36 66 Z" fill="${regionFill("region-back-upper-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-back-upper-l")}" style="${regionFilter("region-back-upper-l")}"/>
    <path id="region-back-upper-r" d="M84 66 Q86 76 84 88 Q76 92 66 90 Q66 76 68 66 Q76 64 84 66 Z" fill="${regionFill("region-back-upper-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-back-upper-r")}" style="${regionFilter("region-back-upper-r")}"/>

    <!-- Lats -->
    <path id="region-lat-l" d="M34 88 Q30 100 32 116 Q38 122 48 120 Q52 110 54 98 Q54 90 54 90 Q44 92 34 88 Z" fill="${regionFill("region-lat-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-lat-l")}" style="${regionFilter("region-lat-l")}"/>
    <path id="region-lat-r" d="M86 88 Q90 100 88 116 Q82 122 72 120 Q68 110 66 98 Q66 90 66 90 Q76 92 86 88 Z" fill="${regionFill("region-lat-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-lat-r")}" style="${regionFilter("region-lat-r")}"/>

    <!-- Mid back -->
    <path id="region-back-mid-l" d="M36 100 Q34 112 36 124 Q44 128 54 126 Q54 114 54 102 Q45 100 36 100 Z" fill="${regionFill("region-back-mid-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-back-mid-l")}" style="${regionFilter("region-back-mid-l")}"/>
    <path id="region-back-mid-r" d="M84 100 Q86 112 84 124 Q76 128 66 126 Q66 114 66 102 Q75 100 84 100 Z" fill="${regionFill("region-back-mid-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-back-mid-r")}" style="${regionFilter("region-back-mid-r")}"/>

    <!-- Lower back -->
    <path id="region-back-lower-l" d="M38 124 Q36 134 38 144 Q44 148 54 146 Q54 134 54 124 Q46 126 38 124 Z" fill="${regionFill("region-back-lower-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-back-lower-l")}" style="${regionFilter("region-back-lower-l")}"/>
    <path id="region-back-lower-r" d="M82 124 Q84 134 82 144 Q76 148 66 146 Q66 134 66 124 Q74 126 82 124 Z" fill="${regionFill("region-back-lower-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-back-lower-r")}" style="${regionFilter("region-back-lower-r")}"/>

    <!-- Triceps back -->
    <ellipse id="region-tricep-l" cx="22" cy="92" rx="8" ry="14" fill="${regionFill("region-tricep-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-tricep-l")}" style="${regionFilter("region-tricep-l")}"/>
    <ellipse id="region-tricep-r" cx="98" cy="92" rx="8" ry="14" fill="${regionFill("region-tricep-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-tricep-r")}" style="${regionFilter("region-tricep-r")}"/>

    <!-- Torso outline back -->
    <path d="M42 50 Q30 54 18 62 Q12 72 14 90 Q14 110 16 130 Q16 140 20 148 Q38 152 44 152 Q44 140 44 130 Q50 132 60 132 Q70 132 76 130 Q76 140 76 152 Q82 152 100 148 Q104 140 106 130 Q108 110 106 90 Q108 72 102 62 Q90 54 78 50 Q70 46 60 46 Q50 46 42 50 Z" fill="none" stroke="${bodyStroke}" stroke-width="1.5"/>

    <!-- Glutes -->
    <path id="region-glute-l" d="M20 150 Q18 162 22 172 Q28 178 40 176 Q44 168 44 156 Q44 152 44 152 Q38 152 20 150 Z" fill="${regionFill("region-glute-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-glute-l")}" style="${regionFilter("region-glute-l")}"/>
    <path id="region-glute-r" d="M100 150 Q102 162 98 172 Q92 178 80 176 Q76 168 76 156 Q76 152 76 152 Q82 152 100 150 Z" fill="${regionFill("region-glute-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-glute-r")}" style="${regionFilter("region-glute-r")}"/>

    <!-- Hamstrings -->
    <path id="region-ham-l" d="M22 172 Q20 188 22 202 Q28 208 38 206 Q44 200 44 186 Q44 174 40 176 Q28 178 22 172 Z" fill="${regionFill("region-ham-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-ham-l")}" style="${regionFilter("region-ham-l")}"/>
    <path id="region-ham-r" d="M98 172 Q100 188 98 202 Q92 208 82 206 Q76 200 76 186 Q76 174 80 176 Q92 178 98 172 Z" fill="${regionFill("region-ham-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-ham-r")}" style="${regionFilter("region-ham-r")}"/>

    <!-- Calves back -->
    <path id="region-calf-l" d="M22 208 Q20 224 22 238 Q28 244 36 242 Q42 238 42 224 Q42 210 38 208 Q30 206 22 208 Z" fill="${regionFill("region-calf-l")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-calf-l")}" style="${regionFilter("region-calf-l")}"/>
    <path id="region-calf-r" d="M98 208 Q100 224 98 238 Q92 244 84 242 Q78 238 78 224 Q78 210 82 208 Q90 206 98 208 Z" fill="${regionFill("region-calf-r")}" stroke="${bodyStroke}" stroke-width="1" opacity="${regionOpacity("region-calf-r")}" style="${regionFilter("region-calf-r")}"/>

    <!-- Feet -->
    <ellipse cx="32" cy="248" rx="12" ry="6" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1"/>
    <ellipse cx="88" cy="248" rx="12" ry="6" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1"/>

    <!-- Label -->
    <text x="60" y="268" text-anchor="middle" font-family="monospace" font-size="7" fill="#6a6a72" letter-spacing="2">BACK</text>
  </svg>`;

  // Show front if front muscles active, back if back muscles active
  const frontRegions = ["region-chest","region-bicep","region-delt-front","region-delt-side","region-abs","region-quad","region-calf","region-forearm"];
  const backRegions = ["region-trap","region-delt-rear","region-back","region-lat","region-tricep","region-glute","region-ham"];

  const hasFront = [...activeRegions].some(r => frontRegions.some(f => r.startsWith(f)));
  const hasBack = [...activeRegions].some(r => backRegions.some(b => r.startsWith(b)));

  if (!hasFront && !hasBack) return "";

  return `<div class="muscle-diagram">
    <div class="muscle-diagram-label">MUSCLES WORKED</div>
    <div class="muscle-diagram-views">
      ${hasFront ? frontSVG : ""}
      ${hasBack ? backSVG : ""}
    </div>
  </div>`;
}
