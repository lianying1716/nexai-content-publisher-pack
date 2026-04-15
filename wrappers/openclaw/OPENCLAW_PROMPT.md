# OpenClaw Content Publisher Wrapper

This wrapper uses the bundled NexAI content-publisher skill as the canonical playbook.

## Read Order

1. `skills/nexai-content-publisher/SKILL.md`
2. `skills/nexai-content-publisher/references/environments.md`
3. `skills/nexai-content-publisher/references/article-format.md`
4. `skills/nexai-content-publisher/references/publish-workflow.md`

## Required Workflow

- Pull `context` first
- Upload media if needed
- Build a structured Publish Packet
- Run `validate`
- Save draft
- Publish only on explicit request and only when token scope allows it

## Transport

- Prefer `https://xsai5.xyz` for remote or production-style execution
- Prefer `http://192.168.2.7:3091` only for LAN testing
- Do not use admin-login flows for content publishing

## Evidence Rules

- factual content requires `sourceBundle`
- factual content requires `claimLedger`
- unsupported claims must be labeled as inference or experience
