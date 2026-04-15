---
title: NexAI 内容网关首次运行示例
type: post
targetStatus: draft
categorySlugs:
  - gpt
seoTitle: NexAI 内容网关首次运行示例
seoDescription: 用一篇极简文章验证 NexAI Content Gateway 的 context、validate 和 draft create 链路。
featuredImageIntent: optional-cover
primaryProductId: ""
---

# 写作目标

用一篇最小文章演示如何通过内容网关完成首次草稿创建。

# 核心结论

第一次使用时，先跑 context，再跑 validate，最后创建 draft，比直接 publish 更稳。

# 事实来源

- NexAI 内容网关接口返回
- 项目内发布工作流规范

# Claim Ledger

- Claim: 首次运行应优先创建草稿而不是直接发布
  Evidence:
    - project:publish-workflow

# 正文结构

## 1. 为什么先拉 context

分类、媒体和商品都应该来自系统实时上下文，而不是模型自行猜测。

## 2. 为什么先 validate

validate 可以提前暴露缺失字段和结构问题，避免错误写库。

## 3. 为什么首跑建议只做 draft

草稿更适合作为工作流验证的第一步，确认格式、SEO 和分类都正常后再考虑发布。

# 配图计划

- 封面图：可空
- 正文图：首跑可空
