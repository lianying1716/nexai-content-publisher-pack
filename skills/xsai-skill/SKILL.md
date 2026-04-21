---
name: xsai-skill
description: Use when operating XSAI through the operator gateway instead of the admin UI. This skill covers content publishing, product listing updates, inventory preview and commit, review suggestions, alerts inbox handling, payment summary checks, LAN testing on 192.168.2.7, and production execution through https://xsai5.xyz.
---

# XSAI Skill

English source of truth. 中文版见 [SKILL.zh-CN.md](SKILL.zh-CN.md).

Use this skill whenever an external AI agent needs to operate XSAI without opening the admin panel.

## What This Skill Owns

- Operator gateway domain selection
- Human-confirmation boundaries
- Content packets and publish flow
- Product listing and basic product updates
- Inventory preview and commit flow without exposing cleartext card secrets
- Review suggestion flow
- Alerts inbox and payment summary usage
- Official CLI usage through `scripts/operator-cli.js`

## Required Execution Model

- Treat the operator gateway as the system of record
- Treat the skill as workflow memory, not as the security boundary
- Prefer the bundled `operator-cli.js` for all domains
- Do not probe `/health`, `/docs`, `/openapi.json`, or the site root to decide whether the gateway is alive
- The safe connectivity check is `doctor` or `content:context`

## Environment Choice

- For local or LAN verification, use `http://192.168.2.7:3091`
- For production or remote execution, use `https://xsai5.xyz`
- `NEXAI_OPERATOR_BASE_URL` may point to the site origin or directly to `/api/operator`; the official CLI normalizes both
- Do not use admin-login flows as the external AI execution path

Read [references/environments.md](references/environments.md) before choosing the execution target.

## Required Workflow

1. Read [references/domains.md](references/domains.md) and classify the task into the correct operator domain.
2. Read [references/human-confirmation.md](references/human-confirmation.md) before any action that could affect stock, payments, or approvals.
3. Pull only the minimum context needed for the chosen domain.
4. Use `operator-cli` commands instead of ad hoc HTTP clients.
5. For content work, before writing any packet fields, run `content:context` and choose `categorySlugs` from `categories[]`, `featuredMediaId` from `media[]`, plus `primaryProductId` from `products[]`. If no suitable media exists, upload one first with `content:media:upload`. Never reuse example values from the pack.
6. For content work, use [references/content-packet-template.json](references/content-packet-template.json) as the structured starter packet.
7. For inventory import, use [references/inventory-preview-template.json](references/inventory-preview-template.json) and preserve the `preview -> commit` split.
8. For review work, use [references/review-suggestion-template.json](references/review-suggestion-template.json) and create suggestions only.
9. Respect human confirmation boundaries. The AI can suggest, preview, or ack, but final confirmation stays in the admin inbox where required.

## References

- [references/environments.md](references/environments.md): LAN, production, and base URL rules
- [references/domains.md](references/domains.md): domain map, scopes, and safe usage
- [references/human-confirmation.md](references/human-confirmation.md): actions that must stay human-confirmed
- [references/content-packet-template.json](references/content-packet-template.json): structured content packet starter
- [references/inventory-preview-template.json](references/inventory-preview-template.json): inventory preview starter
- [references/review-suggestion-template.json](references/review-suggestion-template.json): review suggestion starter
