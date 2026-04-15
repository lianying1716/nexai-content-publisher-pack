# Publish Workflow

## Required Order

1. Select target environment
2. Call `context`
3. Resolve categories, media, and product IDs from context
4. Upload images if needed
5. Build the publish packet
6. Call `validate`
7. Call `draft:create` or `draft:update`
8. Call `publish` only if explicitly requested and permitted

## Required Packet Fields

- `title`
- `slug`
- `type`
- `editorLead`
- `excerpt`
- `seoTitle`
- `seoDescription`
- `categorySlugs`
- `featuredMediaId`
- `primaryProductId`
- `editorDocument`
- `contentHtml`
- `reviewNotes`
- `sourceBundle`
- `claimLedger`
- `agentMetadata`

## Field Rules

- `authorId` is not agent-controlled; policy decides it
- `categorySlugs` must come from `context`
- `featuredMediaId` must exist in the media library
- `primaryProductId` must exist in product context
- `sourceBundle` must not be empty for factual articles
- `claimLedger` must not be empty for factual articles
- `agentMetadata` must include at least:
  - `provider`
  - `toolName`
  - `modelName`

## Draft vs Publish

- Default to `draft`
- Use `publish` only when:
  - the user asked for publish
  - validation is clean
  - the token has `content.publish.direct`

## Idempotency

Always send a unique `Idempotency-Key` for:

- `draft:create`
- `draft:update`
- `publish`

Reuse the same key only for safe retries of the same intended operation.

## Safety Checks Before Publish

- Title is final
- Categories are valid
- Featured image is suitable as a cover
- Body images are already uploaded or referenced correctly
- SEO fields are present
- `sourceBundle` exists
- `claimLedger` exists
- `validate` returns `ok: true`

## CLI Examples

```bash
node /www/wwwroot/nexai/scripts/content-gateway-cli.js context
node /www/wwwroot/nexai/scripts/content-gateway-cli.js media:upload --file ./cover.png --title "Cover"
node /www/wwwroot/nexai/scripts/content-gateway-cli.js validate --file ./packet.json
node /www/wwwroot/nexai/scripts/content-gateway-cli.js draft:create --file ./packet.json --idempotency-key article-create-001
node /www/wwwroot/nexai/scripts/content-gateway-cli.js draft:update --file ./packet.json --idempotency-key article-update-001
node /www/wwwroot/nexai/scripts/content-gateway-cli.js publish --file ./packet.json --idempotency-key article-publish-001
```
