// Zero-dependency checks for the skill package. Run: node tests/check.mjs
// Agents silently drop a skill whose frontmatter fails to parse, so this guards the things
// a reviewer would not notice: frontmatter rules, broken links and images, manifest drift.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENDPOINT = 'https://app.axl.tech/mcp';
const errors = [];
const fail = msg => errors.push(msg);
const rel = p => relative(root, p).replace(/\\/g, '/');
const readJson = p => {
  try { return JSON.parse(readFileSync(join(root, p), 'utf8')); }
  catch (e) { fail(`${p}: ${e.message}`); return {}; }
};

function frontmatter(file) {
  const text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) { fail(`${rel(file)}: missing frontmatter`); return {}; }
  const out = {};
  const lines = m[1].split('\n');
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([a-z][a-z0-9-]*):\s*(.*)$/);
    if (!kv) { fail(`${rel(file)}: cannot parse frontmatter line "${lines[i]}"`); continue; }
    let [, key, value] = kv;
    if (value === '>-' || value === '>' || value === '|') {
      const block = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) block.push(lines[++i].trim());
      value = value === '|' ? block.join('\n') : block.join(' ');
    } else {
      value = value.replace(/^(['"])(.*)\1$/, '$2');
    }
    out[key] = value;
  }
  return out;
}

function walk(dir, ext) {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === 'node_modules' || name.startsWith('.') ? [] : walk(p, ext);
    return p.endsWith(ext) ? [p] : [];
  });
}

// 1. Skills: frontmatter rules from the Agent Skills spec.
const skillsDir = join(root, 'skills');
const skillNames = [];
for (const name of readdirSync(skillsDir)) {
  const file = join(skillsDir, name, 'SKILL.md');
  if (!existsSync(file)) continue;
  const fm = frontmatter(file);
  skillNames.push(fm.name);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name || '') || fm.name.length > 64) fail(`${rel(file)}: invalid name "${fm.name}"`);
  if (fm.name !== name) fail(`${rel(file)}: name "${fm.name}" must match its folder "${name}"`);
  const len = (fm.description || '').length;
  if (len < 1 || len > 1024) fail(`${rel(file)}: description is ${len} characters (1-1024 allowed)`);
  const lines = readFileSync(file, 'utf8').split('\n').length;
  if (lines > 500) fail(`${rel(file)}: ${lines} lines, keep it under 500`);
}
if (!skillNames.length) fail('no skills found under skills/');
if (new Set(skillNames).size !== skillNames.length) fail('duplicate skill names');

// 2. Every relative link and image in Markdown resolves.
for (const file of [join(root, 'README.md'), join(root, 'CHANGELOG.md'), ...walk(skillsDir, '.md')]) {
  const text = readFileSync(file, 'utf8');
  const targets = [
    ...[...text.matchAll(/\]\(([^)\s]+)\)/g)].map(m => m[1]),
    ...[...text.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(m => m[1]),
  ];
  for (const t of targets) {
    if (/^(https?:|mailto:|#)/.test(t)) continue;
    const target = resolve(dirname(file), t.split('#')[0]);
    if (!existsSync(target)) fail(`${rel(file)}: broken link ${t}`);
  }
}

// 3. Manifests agree on name, version and the MCP endpoint.
const claude = readJson('.claude-plugin/plugin.json');
const market = readJson('.claude-plugin/marketplace.json');
const codex = readJson('.codex-plugin/plugin.json');
const codexMarket = readJson('.agents/plugins/marketplace.json');
const gemini = readJson('gemini-extension.json');
const mcp = readJson('.mcp.json');
const entry = (market.plugins || []).find(p => p.name === claude.name);
const codexEntry = (codexMarket.plugins || []).find(p => p.name === codex.name);
if (!entry) fail('.claude-plugin/marketplace.json: no entry for the plugin');
if (!codexEntry) fail('.agents/plugins/marketplace.json: no entry for the plugin');
if (market.name !== codexMarket.name) fail('marketplace names differ between Claude and Codex');
const versions = { 'claude plugin': claude.version, 'claude marketplace': entry?.version, codex: codex.version, gemini: gemini.version };
if (new Set(Object.values(versions)).size !== 1) fail(`versions differ: ${JSON.stringify(versions)}`);
if (mcp.mcpServers?.axl?.url !== ENDPOINT || mcp.mcpServers?.axl?.type !== 'http') fail('.mcp.json: axl must be {"type":"http","url":"' + ENDPOINT + '"}');
if (gemini.mcpServers?.axl?.httpUrl !== ENDPOINT) fail('gemini-extension.json: axl.httpUrl must be ' + ENDPOINT);
for (const p of [codex.skills, codex.mcpServers, codex.interface?.logo, codex.interface?.composerIcon]) {
  if (p && !existsSync(join(root, p))) fail(`.codex-plugin/plugin.json: missing ${p}`);
}

if (errors.length) {
  console.error(errors.map(e => `x ${e}`).join('\n'));
  process.exit(1);
}
console.log(`ok: ${skillNames.length} skill(s), manifests at ${claude.version}`);
