# XSAI Skill Pack

English guide. 中文说明: [README.md](./README.md)

Portable pack for Codex, Claude Code, and OpenClaw so external agents can operate XSAI through the operator gateway.

## What Is Included

- Codex skill: `skills/xsai-skill/`
- Official CLI: `scripts/operator-cli.js`
- Claude Code wrapper: `wrappers/claude-code/CLAUDE.md`
- OpenClaw wrapper: `wrappers/openclaw/OPENCLAW_PROMPT.md`
- OpenClaw config example: `wrappers/openclaw/openclaw.xsai-skill.config.example.jsonc`
- First-run samples:
  - `examples/sample-operator-content-packet.json`
  - `examples/sample-inventory-preview.json`
  - `examples/sample-review-suggestion.json`
- Codex install scripts:
  - `scripts/install-codex-skill.js`
  - `scripts/install-codex-skill.sh`
  - `scripts/install-codex-skill.ps1`

## Quick Start

### Codex

```bash
npm run install:xsai-skill
```

Then invoke the skill as `$xsai-skill`.

### Claude Code

Use `wrappers/claude-code/CLAUDE.md` as the project instruction or bootstrap prompt.

### OpenClaw

Use `wrappers/openclaw/OPENCLAW_PROMPT.md` as the wrapper prompt and merge
`wrappers/openclaw/openclaw.xsai-skill.config.example.jsonc` into your OpenClaw config.

## Required Environment

```bash
NEXAI_OPERATOR_BASE_URL=https://xsai5.xyz
NEXAI_OPERATOR_TOKEN=replace-with-real-token
```

For LAN testing:

```bash
NEXAI_OPERATOR_BASE_URL=http://192.168.2.7:3091
```

## Backend Requirement

The target environment must already expose the operator gateway:

- `/api/operator/content/*`
- `/api/operator/products/*`
- `/api/operator/inventory/*`
- `/api/operator/reviews/*`
- `/api/operator/alerts/*`
- `/api/operator/payments/summary`

## Common Commands

```bash
node ./scripts/operator-cli.js doctor
node ./scripts/operator-cli.js content:context
node ./scripts/operator-cli.js products:list
node ./scripts/operator-cli.js inventory:summary
node ./scripts/operator-cli.js payments:summary
```

## First Content Run

1. Run the connectivity check:

```bash
node ./scripts/operator-cli.js doctor
```

2. Fetch content context and fill the packet from `categories[]`, `media[]`, and `products[]`:

```bash
node ./scripts/operator-cli.js content:context
```

3. If no suitable cover exists yet, upload one into the shared media library:

```bash
node ./scripts/operator-cli.js content:media:upload --file ./cover.png
```

4. Validate the packet in strict publish mode:

```bash
node ./scripts/operator-cli.js content:validate --file ./examples/sample-operator-content-packet.json
```

## Troubleshooting

- If `doctor` or any operator command returns `Operator gateway route was not found`:
  - your pack install is usually fine
  - the real issue is that the target server has not deployed the backend with `/api/operator/*`
