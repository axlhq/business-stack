# Connect the AXL MCP server

- Endpoint: `https://app.axl.tech/mcp`
- Transport: Streamable HTTP, JSON-RPC over POST. A GET returns 405 and there is no SSE stream, so pick "HTTP" or "Streamable HTTP", never "SSE".
- Sign-in: OAuth 2.1 with dynamic client registration and PKCE. The client opens a browser, the person signs in to AXL and approves a consent screen that names the client and the account. There is no key to paste.

Skip this file when `capability_map` and `invoke_operation` are already among your tools.

## Before you connect

- Ask the person before changing their client configuration. Running an `mcp add` command or editing a config file is fine once they agree. The browser sign-in is always theirs.
- No AXL account yet: the easiest path is to sign up at https://app.axl.tech/ first (Free plan, see [plans and billing](plans-and-billing.md)), finish the short setup of the new account, and only then connect. If they register from the sign-in window instead (the "Register" link), AXL takes them through the same setup and then opens its admin; it does not return to the connection by itself. Once setup is done, start the sign-in again (`/mcp` in Claude Code, `codex mcp login axl`, the client's Connect button) and the consent screen appears.
- Do not create accounts or type credentials for them.
- Most clients load a new server only in a new session or after a reload. Tell the person, and continue after they restart.

## Claude Code

```bash
claude mcp add --transport http axl https://app.axl.tech/mcp
```

- Add `--scope user` to make it available in every project. The default scope is the current project only.
- Then in a session: `/mcp`, select `axl`, authenticate. From a shell: `claude mcp login axl`.
- Installed this skill as the Claude Code plugin? The plugin already registers the server as `plugin:business-stack:axl`; only the `/mcp` sign-in is left.
- In a `.mcp.json` file always write the type: `{"mcpServers":{"axl":{"type":"http","url":"https://app.axl.tech/mcp"}}}`. Without `"type"` the entry is read as a local command and fails.

## Claude (claude.ai and Claude Desktop)

Customize, Connectors, "+ Add", "Add custom connector". Name `AXL`, URL `https://app.axl.tech/mcp`, then sign in. On Team and Enterprise plans an Owner adds it under Organization settings, Connectors, and each member clicks Connect. Connectors added on claude.ai also show up in Claude Code for the same login.

## Codex (CLI and app)

```bash
codex mcp add axl --url https://app.axl.tech/mcp
codex mcp login axl
```

Or in `~/.codex/config.toml`:

```toml
[mcp_servers.axl]
url = "https://app.axl.tech/mcp"
```

## ChatGPT

chatgpt.com/plugins, the plus button, "Add custom MCP server". Enter the URL `https://app.axl.tech/mcp`, choose OAuth authentication, and create it. Availability depends on the person's plan and workspace policy.

## Cursor

`~/.cursor/mcp.json` (every project) or `.cursor/mcp.json` (this project):

```json
{ "mcpServers": { "axl": { "url": "https://app.axl.tech/mcp" } } }
```

One-click link: `cursor://anysphere.cursor-deeplink/mcp/install?name=axl&config=eyJ1cmwiOiJodHRwczovL2FwcC5heGwudGVjaC9tY3AifQ==`

## VS Code (GitHub Copilot)

```bash
code --add-mcp "{\"name\":\"axl\",\"type\":\"http\",\"url\":\"https://app.axl.tech/mcp\"}"
```

Or `.vscode/mcp.json`:

```json
{ "servers": { "axl": { "type": "http", "url": "https://app.axl.tech/mcp" } } }
```

VS Code opens the browser for sign-in on first use.

## Gemini CLI

```bash
gemini mcp add --transport http axl https://app.axl.tech/mcp
```

Add `-s user` for every project. Then `/mcp auth axl`. In `settings.json` the key is `httpUrl`; plain `url` means SSE, which AXL does not serve:

```json
{ "mcpServers": { "axl": { "httpUrl": "https://app.axl.tech/mcp" } } }
```

Antigravity uses `serverUrl` in its `mcp_config.json` and authenticates from its agent settings.

## Windsurf

In the MCP config opened from Cascade's MCP settings:

```json
{ "mcpServers": { "axl": { "serverUrl": "https://app.axl.tech/mcp" } } }
```

## OpenCode, Zed, Cline

- OpenCode: `"mcp": { "axl": { "type": "remote", "url": "https://app.axl.tech/mcp", "enabled": true } }`, then `opencode mcp auth axl`.
- Zed: `"context_servers": { "axl": { "url": "https://app.axl.tech/mcp" } }`. Zed starts the sign-in itself.
- Cline: add a remote server with transport "Streamable HTTP" (`"type": "streamableHttp"` in JSON).

## Clients without remote HTTP

Run the third-party `mcp-remote` bridge as a local command, after the person agrees to it:

```json
{ "mcpServers": { "axl": { "command": "npx", "args": ["mcp-remote", "https://app.axl.tech/mcp"] } } }
```

## After sign-in

- The connection acts with the approving admin's rights in the chosen account. To work in a different account, the person picks it on the consent screen ("Switch account") or reconnects.
- Read-only access is not a sign-in option. It needs an AXL API key with read rights, sent as `Authorization: Bearer`. The person creates the key in AXL and puts it into the client config themselves; never ask for it in chat.
- `403 lockedSchoolAccessDenied` means the account balance is negative. Only billing reads work until the person tops it up; pass on the billing link from the error.
- An authentication error from an operation is a setup problem. Report it and let the person reconnect; do not try other endpoints or tokens.
