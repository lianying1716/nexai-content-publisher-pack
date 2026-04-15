# Claude Code Wrapper

Use the bundled skill as the source of truth:

- `skills/nexai-site-operator/SKILL.md`
- `skills/nexai-site-operator/references/domains.md`
- `skills/nexai-site-operator/references/human-confirmation.md`
- `skills/nexai-site-operator/references/environments.md`

## Required Behavior

1. Classify the task into the correct operator domain before acting.
2. Use the official `operator-cli.js` runner instead of raw HTTP whenever possible.
3. Respect human confirmation boundaries for payments and approval decisions.
4. For inventory work, always use preview before commit.
5. For review work, create suggestions only.
6. For content work, build a structured packet first and validate before create, update, or publish.

## Preferred Execution

```bash
node ./scripts/operator-cli.js doctor
node ./scripts/operator-cli.js content:context
node ./scripts/operator-cli.js products:list
node ./scripts/operator-cli.js inventory:summary
node ./scripts/operator-cli.js payments:summary
```
