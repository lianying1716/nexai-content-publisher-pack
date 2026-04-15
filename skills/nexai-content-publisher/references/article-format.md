# Article Format Rules

## Canonical Authoring Pattern

Write in two stages:

1. `Article Brief` in Markdown
2. `Publish Packet` in JSON

Do not draft directly as arbitrary HTML.

## Article Brief Shape

Start with lightweight frontmatter:

```md
---
title: ...
type: post
targetStatus: draft
categorySlugs:
  - gpt
seoTitle: ...
seoDescription: ...
featuredImageIntent: cover-only
primaryProductId: ""
---
```

Then write these sections:

- `写作目标`
- `核心结论`
- `事实来源`
- `Claim Ledger`
- `正文结构`
- `配图计划`

## Required Content Rules

- Put the conclusion early
- Distinguish facts, inference, and experience
- Fact-heavy articles must include `sourceBundle`
- Claims that are not official rules must be labeled as observation or experience
- Do not invent categories, products, or media IDs; always pull `context`

## Featured Image Rules

- Featured image is for list cards and sharing
- Do not use dense evidence graphics, screenshots, or text-heavy diagrams as featured image
- Evidence screenshots and process diagrams belong in body content

## Body Image Rules

- Each body image should support a nearby paragraph or section
- Prefer one clear point per image
- Screenshots should be referenced in text, not dropped without explanation

## SEO Rules

- `seoTitle` should be present
- `seoDescription` should be present
- `seoTitle` should stay within 70 characters when possible
- `seoDescription` should stay within 180 characters when possible
- SEO text should reflect the actual article, not generic marketing filler

## Packet Conversion Rules

Before publishing, convert the article into:

- `editorLead`
- `excerpt`
- `editorDocument`
- `contentHtml`
- `sourceBundle`
- `claimLedger`
- `agentMetadata`

Use the packet template in [publish-packet-template.json](publish-packet-template.json).
