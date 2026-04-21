---
name: xsai-skill
description: 当外部 AI 需要通过 operator gateway 操作 XSAI，而不是进入后台管理界面时使用。本技能覆盖内容发布、商品信息更新、库存导入预览与提交、审核建议、告警收件箱处理、收款汇总检查、局域网联调和生产执行。
---

# XSAI Skill

中文版说明。English source of truth: [SKILL.md](SKILL.md)

当外部 AI 需要在不打开管理后台的情况下操作 XSAI 时，使用这个技能。

## 这个技能负责什么

- Operator gateway 的环境选择
- 人工确认边界
- 内容包与发布流程
- 商品列表与安全字段更新
- 不暴露明文卡密的库存预览与提交流程
- 审核建议流程
- 告警收件箱与收款汇总读取
- 通过 `scripts/operator-cli.js` 使用官方 CLI

## 必须遵守的执行模型

- 把 operator gateway 视为系统事实来源
- 把 skill 视为工作流记忆，而不是安全边界
- 所有域尽量优先使用打包的 `operator-cli.js`
- 不要通过 `/health`、`/docs`、`/openapi.json` 或站点首页去判断 gateway 是否可用
- 安全的联通性检查方式是 `doctor` 或 `content:context`

## 环境选择

- 本地或局域网联调使用 `http://192.168.2.7:3091`
- 生产或远程执行使用 `https://xsai5.xyz`
- `NEXAI_OPERATOR_BASE_URL` 可以传站点根地址，也可以直接传 `/api/operator`；官方 CLI 会自动归一化
- 外部 AI 的执行路径不要走后台登录流程

选择执行目标前先读 [references/environments.zh-CN.md](references/environments.zh-CN.md)。

## 必走流程

1. 先读 [references/domains.zh-CN.md](references/domains.zh-CN.md)，把任务归到正确的 operator 域。
2. 任何可能影响库存、支付或审批的动作前，先读 [references/human-confirmation.zh-CN.md](references/human-confirmation.zh-CN.md)。
3. 只拉取当前域最低限度的上下文。
4. 优先使用 `operator-cli` 命令，而不是临时拼 HTTP 请求。
5. 做内容任务时，在填写任何内容包字段之前，先运行 `content:context`，然后从 `categories[]` 选择 `categorySlugs`，从 `media[]` 选择 `featuredMediaId`，再从 `products[]` 选择 `primaryProductId`。如果没有合适封面图，先用 `content:media:upload` 上传。不要复用示例里的占位值。
6. 内容任务以 [references/content-packet-template.json](references/content-packet-template.json) 作为结构化起始模板。
7. 库存导入使用 [references/inventory-preview-template.json](references/inventory-preview-template.json)，严格保持 `preview -> commit` 两段式流程。
8. 审核任务使用 [references/review-suggestion-template.json](references/review-suggestion-template.json)，只产出建议，不直接审批。
9. 尊重人工确认边界。AI 可以建议、预览、ack，但最终人工确认仍然留在后台告警收件箱里完成。

## 参考文档

- [references/environments.zh-CN.md](references/environments.zh-CN.md)：局域网、生产与 base URL 规则
- [references/domains.zh-CN.md](references/domains.zh-CN.md)：域划分、权限边界与安全用法
- [references/human-confirmation.zh-CN.md](references/human-confirmation.zh-CN.md)：必须保留人工确认的动作
- [references/content-packet-template.json](references/content-packet-template.json)：内容包起始模板
- [references/inventory-preview-template.json](references/inventory-preview-template.json)：库存预览起始模板
- [references/review-suggestion-template.json](references/review-suggestion-template.json)：审核建议起始模板
