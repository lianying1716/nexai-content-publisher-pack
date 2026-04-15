# Environments

## Default Targets

- Local LAN test target: `http://192.168.2.7:3091`
- Production target: `https://xsai5.xyz`

## When To Use Which

- Use LAN for local verification, smoke tests, packet checks, and workflow tuning
- Use production for real external-agent publishing and any OpenClaw-style remote invocation

## Routing Rules

- Local Codex or local Windows agent can call the LAN target directly
- External or cross-network agents should call the production domain
- OpenClaw should use `https://xsai5.xyz`, not the LAN address

## Required Environment Variables

For CLI:

```bash
NEXAI_BASE_URL=<target-base-url>
NEXAI_API_TOKEN=<content-gateway-token>
```

Examples:

```bash
NEXAI_BASE_URL=http://192.168.2.7:3091
NEXAI_BASE_URL=https://xsai5.xyz
```

## Canonical Commands

```bash
node /www/wwwroot/nexai/scripts/content-gateway-cli.js context
node /www/wwwroot/nexai/scripts/content-gateway-cli.js validate --file ./packet.json
node /www/wwwroot/nexai/scripts/content-gateway-cli.js draft:create --file ./packet.json --idempotency-key local-001
node /www/wwwroot/nexai/scripts/content-gateway-cli.js publish --file ./packet.json --idempotency-key publish-001
```
