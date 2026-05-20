const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function listJavaScriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return listJavaScriptFiles(fullPath);
    }

    return entry.isFile() && entry.name.endsWith(".js") ? [fullPath] : [];
  });
}

const srcDir = path.join(__dirname, "..");
const files = listJavaScriptFiles(srcDir);

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log(`Checked ${files.length} JavaScript files`);
