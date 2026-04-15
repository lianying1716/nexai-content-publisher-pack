# Domains

## Domain Map

- `content`
  - context
  - media upload
  - draft create and update
  - validate
  - publish
- `products`
  - read list and detail
  - update safe fields
  - toggle listing
- `inventory`
  - summary
  - product stock summary
  - import preview
  - import commit
- `reviews`
  - list pending agent applications
  - list pending API applications
  - create suggestion only
- `alerts`
  - read inbox
  - ack or snooze operator-visible alerts
- `payments`
  - read summary only

## Hard Boundaries

- Never expose cleartext card secrets back to the AI
- Never export card inventories
- Never delete products
- Never let the AI approve or reject applications directly through operator tokens
- Never expose payment device IDs, bridge rotation details, QR addresses, or raw payee routing

## Official CLI Commands

- `doctor`
- `content:context`
- `content:draft:get --id <contentId>`
- `content:media:upload --file <image>`
- `content:draft:create --file <packet.json> --idempotency-key <key>`
- `content:draft:update --file <packet.json> --idempotency-key <key>`
- `content:validate --file <packet.json>`
- `content:publish --file <packet.json> --idempotency-key <key>`
- `products:list`
- `products:detail --id <productId>`
- `products:update --file <payload.json>`
- `products:toggle-listing --file <payload.json>`
- `inventory:summary`
- `inventory:product --id <productId>`
- `inventory:preview --file <payload.json>`
- `inventory:commit --file <payload.json>`
- `reviews:agents`
- `reviews:api`
- `reviews:agent:suggest --file <payload.json>`
- `reviews:api:suggest --file <payload.json>`
- `alerts:inbox --status OPEN`
- `payments:summary`
