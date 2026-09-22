import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const manifest = JSON.parse(await readFile(resolve(root, "epi-info-capability.json"), "utf8"));
if (manifest.schemaVersion !== "epi.package/0.1") throw new Error("Unsupported package schema.");
if (manifest.artifactType !== "epi.capability-assets") throw new Error("Unexpected artifact type.");
if (manifest.activation?.executable !== false) throw new Error("Synthetic pilot must remain non-executable.");

const prohibited = new Set([".dll", ".bin", ".onnx", ".safetensors", ".wasm"]);
async function walk(directory) {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await walk(path));
    else paths.push(path);
  }
  return paths;
}
for (const path of await walk(root)) {
  if (prohibited.has(extname(path).toLowerCase())) throw new Error(`Prohibited executable/model artifact: ${path}`);
}

for (const artifact of manifest.artifacts) {
  const path = resolve(root, artifact.path);
  if (!path.startsWith(`${root}${sep}`)) throw new Error(`Artifact escapes repository: ${artifact.path}`);
  const bytes = await readFile(path);
  const digest = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
  if (bytes.byteLength !== artifact.bytes) throw new Error(`Length mismatch: ${artifact.path}`);
  if (digest !== artifact.digest) throw new Error(`Digest mismatch: ${artifact.path}`);
}
console.log(`Verified ${manifest.id}@${manifest.version}: ${manifest.artifacts.length} declared artifacts; execution disabled.`);
