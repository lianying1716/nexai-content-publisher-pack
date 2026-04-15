# NexAI Content Publisher Pack

Portable pack for article drafting and publishing through the NexAI content gateway.

## What Is Included

- Codex skill: `skills/nexai-content-publisher/`
- Portable CLI: `scripts/content-gateway-cli.js`
- Claude Code wrapper: `wrappers/claude-code/CLAUDE.md`
- OpenClaw wrapper: `wrappers/openclaw/OPENCLAW_PROMPT.md`
- OpenClaw config example: `wrappers/openclaw/openclaw.content-publisher.config.example.jsonc`
- First-run samples:
  - `examples/sample-article-brief.md`
  - `examples/sample-publish-packet.json`
- Codex install scripts:
  - `scripts/install-codex-skill.js`
  - `scripts/install-codex-skill.sh`
  - `scripts/install-codex-skill.ps1`

## Quick Start

### Codex

```bash
npm run install:codex-skill
```

Then invoke the skill as `$nexai-content-publisher`.

### Claude Code

Use `wrappers/claude-code/CLAUDE.md` as the project instruction or agent bootstrap prompt.

### OpenClaw

Use `wrappers/openclaw/OPENCLAW_PROMPT.md` as the content-publisher wrapper prompt and merge
`wrappers/openclaw/openclaw.content-publisher.config.example.jsonc` into your OpenClaw config.

## Required Environment

Set these before calling the CLI:

```bash
NEXAI_BASE_URL=https://xsai5.xyz
NEXAI_API_TOKEN=replace-with-real-token
```

For LAN testing:

```bash
NEXAI_BASE_URL=http://192.168.2.7:3091
```

## Common Commands

```bash
node ./scripts/content-gateway-cli.js context
node ./scripts/content-gateway-cli.js validate --file ./packet.json
node ./scripts/content-gateway-cli.js draft:create --file ./packet.json --idempotency-key create-001
node ./scripts/content-gateway-cli.js publish --file ./packet.json --idempotency-key publish-001
```

## First Run

Use the included samples:

1. Read `examples/sample-article-brief.md`
2. Copy `examples/sample-publish-packet.json` to your working packet
3. Run:

```bash
node ./scripts/content-gateway-cli.js context
node ./scripts/content-gateway-cli.js validate --file ./examples/sample-publish-packet.json
node ./scripts/content-gateway-cli.js draft:create --file ./examples/sample-publish-packet.json --idempotency-key first-run-001
```
