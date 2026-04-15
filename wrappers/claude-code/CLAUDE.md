# Claude Code Wrapper

Use the bundled skill as the source of truth:

- `skills/nexai-content-publisher/SKILL.md`
- `skills/nexai-content-publisher/references/article-format.md`
- `skills/nexai-content-publisher/references/publish-workflow.md`
- `skills/nexai-content-publisher/references/environments.md`

## Required Behavior

1. Read the skill and references before drafting or publishing.
2. Create content as an Article Brief first, then convert to a Publish Packet JSON.
3. Pull `context` before selecting categories, media, or products.
4. Run `validate` before any create, update, or publish action.
5. Default to draft unless the user explicitly requests publish.
6. Use factual caution:
   - distinguish fact, inference, and experience
   - require `sourceBundle` and `claimLedger` for factual articles

## Preferred Execution

Prefer the bundled CLI:

```bash
node ./scripts/content-gateway-cli.js context
node ./scripts/content-gateway-cli.js validate --file ./packet.json
node ./scripts/content-gateway-cli.js draft:create --file ./packet.json --idempotency-key create-001
node ./scripts/content-gateway-cli.js publish --file ./packet.json --idempotency-key publish-001
```

If CLI is unavailable, call the content gateway over HTTP using the same workflow.
