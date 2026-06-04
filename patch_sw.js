const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

const swScript = `<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("Service worker registered:", reg.scope))
        .catch(err => console.log("Service worker failed:", err));
    });
  }
</script>
</body>`;

indexHtml = indexHtml.replace('</body>', swScript);

fs.writeFileSync('index.html', indexHtml);
console.log("Injected SW registration into index.html");
