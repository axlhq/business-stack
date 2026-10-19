/**
 * Renders the README images from the HTML templates in this folder.
 *
 *   node assets/src/render.mjs            # every template
 *   node assets/src/render.mjs banner     # one
 *
 * Needs a local Chrome (or CHROME=/path/to/chromium) and network for Google Fonts on the
 * first run. Output is 2x for sharp text on retina screens, transparent outside the rounded
 * card so it sits well on GitHub's light and dark themes, then palette-quantised with Pillow
 * when python has it (flat graphics, so 256 colours are visually lossless and the file is small).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, statSync, unlinkSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..');

const IMAGES = {
  banner: { w: 880, h: 340 },
  how: { w: 880, h: 236 },
  needs: { w: 880, h: 468 },
};

const chrome = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean).find(p => existsSync(p));
if (!chrome) {
  console.error('No Chrome found. Set CHROME=/path/to/chrome and re-run.');
  process.exit(1);
}

function render(name, { w, h }) {
  const raw = join(outDir, `${name}.raw.png`);
  const out = join(outDir, `${name}.png`);
  execFileSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=2',
    `--window-size=${w},${h}`,
    '--default-background-color=00000000',
    '--virtual-time-budget=8000',
    `--screenshot=${raw}`,
    `file:///${join(here, `${name}.html`).replace(/\\/g, '/')}`,
  ], { stdio: 'pipe' });
  try {
    execFileSync('python', ['-c',
      `from PIL import Image
i=Image.open(r"${raw}").convert("RGBA")
i.quantize(colors=256,method=Image.FASTOCTREE,dither=Image.Dither.NONE).save(r"${out}",optimize=True)`,
    ], { stdio: 'pipe' });
    unlinkSync(raw);
  } catch {
    renameSync(raw, out);
    console.warn(`  ! Pillow not available, kept the unquantised render for ${name}`);
  }
  console.log(`  ${name}.png  ${(statSync(out).size / 1024).toFixed(1)} KB`);
}

const names = process.argv.slice(2);
for (const n of names.length ? names : Object.keys(IMAGES)) {
  if (!IMAGES[n]) { console.error(`unknown image: ${n}`); process.exit(1); }
  render(n, IMAGES[n]);
}
