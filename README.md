# NexAI Site Operator Pack

Portable pack for operating NexAI through the operator gateway.

## What Is Included

- Codex skill: `skills/nexai-site-operator/`
- Official CLI: `scripts/operator-cli.js`
- Claude Code wrapper: `wrappers/claude-code/CLAUDE.md`
- OpenClaw wrapper: `wrappers/openclaw/OPENCLAW_PROMPT.md`
- OpenClaw config example: `wrappers/openclaw/openclaw.site-operator.config.example.jsonc`
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
npm run install:codex-skill
```

Then invoke the skill as `$nexai-site-operator`.

### Claude Code

Use `wrappers/claude-code/CLAUDE.md` as the project instruction or bootstrap prompt.

### OpenClaw

Use `wrappers/openclaw/OPENCLAW_PROMPT.md` as the wrapper prompt and merge
`wrappers/openclaw/openclaw.site-operator.config.example.jsonc` into your OpenClaw config.

## Required Environment

```bash
NEXAI_OPERATOR_BASE_URL=https://xsai5.xyz
NEXAI_OPERATOR_TOKEN=replace-with-real-token
```

For LAN testing:

```bash
NEXAI_OPERATOR_BASE_URL=http://192.168.2.7:3091
```

## Common Commands

```bash
node ./scripts/operator-cli.js doctor
node ./scripts/operator-cli.js content:context
node ./scripts/operator-cli.js products:list
node ./scripts/operator-cli.js inventory:summary
node ./scripts/operator-cli.js payments:summary
```

## First Run

1. Run the connectivity check:

```bash
node ./scripts/operator-cli.js doctor
```

2. Validate a sample content packet:

```bash
node ./scripts/operator-cli.js content:validate --file ./examples/sample-operator-content-packet.json
```

3. Preview inventory import:

```bash
node ./scripts/operator-cli.js inventory:preview --file ./examples/sample-inventory-preview.json
```
