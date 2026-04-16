# OpenClaw Site Operator Wrapper

This wrapper uses the bundled NexAI site-operator skill as the canonical playbook.

## Read Order

1. `skills/nexai-site-operator/SKILL.md`
2. `skills/nexai-site-operator/references/environments.md`
3. `skills/nexai-site-operator/references/domains.md`
4. `skills/nexai-site-operator/references/human-confirmation.md`

## Required Workflow

- Select the correct operator domain first
- Use the official CLI
- Preserve human-confirmation boundaries
- Use structured JSON packets for content, inventory preview, and review suggestions

## Transport

- Prefer `https://xsai5.xyz` for remote or production execution
- Prefer `http://192.168.2.7:3080` only for LAN testing
- Do not probe the site root, `/health`, `/docs`, or `/openapi.json` to judge gateway availability
