# Environments

## Base URL

- Preferred environment variable: `NEXAI_OPERATOR_BASE_URL`
- Token variable: `NEXAI_OPERATOR_TOKEN`
- The official CLI accepts either:
  - `https://xsai5.xyz`
  - `https://xsai5.xyz/api/operator`
  - `http://192.168.2.7:3080`
  - `http://192.168.2.7:3080/api/operator`

It normalizes the base internally.

## Which Target To Use

- Use `http://192.168.2.7:3080` for LAN smoke tests and local staging
- Use `https://xsai5.xyz` for real remote execution
- Do not use the site root response as a health check; the site root can legitimately return HTML

## First Connectivity Check

Prefer:

```bash
node ./scripts/operator-cli.js doctor
```

or:

```bash
node ./scripts/operator-cli.js content:context
```
