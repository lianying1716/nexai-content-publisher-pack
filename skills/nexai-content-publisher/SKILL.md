---
name: nexai-content-publisher
description: Use when creating, editing, validating, or publishing NexAI articles through the content gateway. This skill is for article format rules, SEO and image rules, source and claim requirements, local LAN testing on 192.168.2.7, and production publishing through https://xsai5.xyz.
---

# NexAI Content Publisher

Use this skill whenever the task is to draft, revise, validate, or publish NexAI content.

## What This Skill Owns

- Article input format and required fields
- Featured image vs body image rules
- SEO field rules
- Source bundle and claim ledger requirements
- Draft/update/publish workflow
- Local test endpoint vs production endpoint selection

## Environment Choice

- For local or LAN testing, use `http://192.168.2.7:3091`
- For production or OpenClaw-style remote execution, use `https://xsai5.xyz`
- Do not use admin login as the publishing path for external AI agents
- Do not use the Seattle production server to call back into the local server

Read [references/environments.md](references/environments.md) when choosing the execution target.

## Required Workflow

1. Read [references/article-format.md](references/article-format.md) and shape the article as a brief first.
2. Read [references/publish-workflow.md](references/publish-workflow.md) before any save or publish action.
3. Pull `context` from the target environment before choosing categories, media, or products.
4. Prepare a structured publish packet.
5. Upload featured or body images separately if they are not already in the media library.
6. Run `validate`.
7. Create or update a draft.
8. Publish only when the request explicitly asks for publish and the token has publish scope.

## Execution Preference

- Prefer the bundled `scripts/content-gateway-cli.js` wrapper when the current repo or standalone pack includes it
- Use HTTP directly only when CLI is not available
- Treat the content gateway as the system of record; the skill is the workflow wrapper

## References

- [references/environments.md](references/environments.md): local, LAN, and production routing
- [references/article-format.md](references/article-format.md): writing format, SEO, image, and evidence rules
- [references/publish-workflow.md](references/publish-workflow.md): exact execution order, packet fields, and safety checks
- [references/publish-packet-template.json](references/publish-packet-template.json): starter packet for create, update, and publish
