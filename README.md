# XSAI Skill Pack

中文说明。English version: [README.en.md](./README.en.md)

面向 Codex、Claude Code、OpenClaw 的便携式 XSAI 操作包，用于通过 operator gateway 安全执行内容发布、商品维护、库存导入预览与审核建议。

## 包含内容

- Codex 技能：`skills/xsai-skill/`
- 官方 CLI：`scripts/operator-cli.js`
- Claude Code 包装说明：`wrappers/claude-code/CLAUDE.md`
- OpenClaw 包装说明：`wrappers/openclaw/OPENCLAW_PROMPT.md`
- OpenClaw 配置示例：`wrappers/openclaw/openclaw.xsai-skill.config.example.jsonc`
- 首次运行样例：
  - `examples/sample-operator-content-packet.json`
  - `examples/sample-inventory-preview.json`
  - `examples/sample-review-suggestion.json`
- Codex 安装脚本：
  - `scripts/install-codex-skill.js`
  - `scripts/install-codex-skill.sh`
  - `scripts/install-codex-skill.ps1`

## 快速开始

### Codex

```bash
npm run install:xsai-skill
```

安装后请使用 `$xsai-skill` 调用技能。

### Claude Code

把 `wrappers/claude-code/CLAUDE.md` 作为项目指令或启动提示词。

### OpenClaw

把 `wrappers/openclaw/OPENCLAW_PROMPT.md` 作为包装提示词，并把
`wrappers/openclaw/openclaw.xsai-skill.config.example.jsonc` 合并到你的 OpenClaw 配置里。

## 环境变量

```bash
NEXAI_OPERATOR_BASE_URL=https://xsai5.xyz
NEXAI_OPERATOR_TOKEN=replace-with-real-token
```

局域网联调时：

```bash
NEXAI_OPERATOR_BASE_URL=http://192.168.2.7:3091
```

## 后端前提

目标环境必须已经暴露 operator gateway：

- `/api/operator/content/*`
- `/api/operator/products/*`
- `/api/operator/inventory/*`
- `/api/operator/reviews/*`
- `/api/operator/alerts/*`
- `/api/operator/payments/summary`

## 常用命令

```bash
node ./scripts/operator-cli.js doctor
node ./scripts/operator-cli.js content:context
node ./scripts/operator-cli.js products:list
node ./scripts/operator-cli.js inventory:summary
node ./scripts/operator-cli.js payments:summary
```

## 首次发布内容建议流程

1. 先检查连通性：

```bash
node ./scripts/operator-cli.js doctor
```

2. 拉取上下文，并从 `categories[]`、`media[]`、`products[]` 填充内容包：

```bash
node ./scripts/operator-cli.js content:context
```

3. 如果没有合适封面图，先上传到媒体库：

```bash
node ./scripts/operator-cli.js content:media:upload --file ./cover.png
```

4. 严格校验内容包：

```bash
node ./scripts/operator-cli.js content:validate --file ./examples/sample-operator-content-packet.json
```

## 故障排查

- 如果 `doctor` 或任意 operator 命令返回 `Operator gateway route was not found`：
  - 说明 pack 本身通常没问题
  - 真正的问题是目标服务端还没有部署 `/api/operator/*` 相关后端
