# OpenClaw XSAI Skill Wrapper

This wrapper uses the bundled xsai-skill skill as the canonical playbook.

## Read Order

1. `skills/xsai-skill/SKILL.md`
2. `skills/xsai-skill/references/environments.md`
3. `skills/xsai-skill/references/domains.md`
4. `skills/xsai-skill/references/human-confirmation.md`

## Required Workflow

- Select the correct operator domain first
- Use the official CLI
- Preserve human-confirmation boundaries
- Use structured JSON packets for content, inventory preview, and review suggestions
- For content, run `content:context` first and fill `categorySlugs`, `featuredMediaId`, and `primaryProductId` from `categories[]`, `media[]`, and `products[]`
- If no suitable cover exists, upload it first with `content:media:upload`

## Transport

- Prefer `https://xsai5.xyz` for remote or production execution
- Prefer `http://192.168.2.7:3091` only for LAN testing
- Do not probe the site root, `/health`, `/docs`, or `/openapi.json` to judge gateway availability
