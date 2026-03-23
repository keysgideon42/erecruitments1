import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { rm } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(artifactDir, "../..");
const outdir = path.resolve(repoRoot, "api/dist");

async function build() {
  await rm(outdir, { recursive: true, force: true });

  await esbuild({
    entryPoints: [path.resolve(artifactDir, "src/app.ts")],
    platform: "node",
    bundle: true,
    format: "esm",
    outdir,
    outExtension: { ".js": ".mjs" },
    logLevel: "info",
    external: [
      "*.node", "sharp", "bcrypt", "argon2", "fsevents", "pg-native",
      "better-sqlite3", "sqlite3", "canvas", "re2", "bufferutil",
      "utf-8-validate", "lightningcss",
    ],
    sourcemap: false,
    banner: {
      js: `import { createRequire as __cr } from 'node:module';
import __path from 'node:path';
import __url from 'node:url';
globalThis.require = __cr(import.meta.url);
globalThis.__filename = __url.fileURLToPath(import.meta.url);
globalThis.__dirname = __path.dirname(globalThis.__filename);
`,
    },
    plugins: [esbuildPluginPino({ transports: ["pino-pretty"] })],
  });

  console.log(`✅ Vercel API handler built → api/dist/app.mjs`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
