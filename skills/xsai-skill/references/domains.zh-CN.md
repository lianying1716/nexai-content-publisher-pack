# 域说明

## 域映射

- `content`
  - 上下文
  - 媒体上传
  - 草稿创建与更新
  - 校验
  - 发布
- `products`
  - 列表与详情读取
  - 安全字段更新
  - 上下架切换
- `inventory`
  - 汇总
  - 单商品库存汇总
  - 导入预览
  - 导入提交
- `reviews`
  - 读取待审核代理申请
  - 读取待审核 API 申请
  - 只创建建议
- `alerts`
  - 读取收件箱
  - ack 或 snooze 可见告警
- `payments`
  - 只读汇总

## 硬边界

- 不要把明文卡密回传给 AI
- 不要导出卡密库存
- 不要删除商品
- 不要让 AI 通过 operator token 直接批准或拒绝申请
- 不要暴露支付设备 ID、桥接轮换细节、收款二维码地址或原始收款路由

## 官方 CLI 命令

- `doctor`
- `content:context`
- `content:draft:get --id <contentId>`
- `content:media:upload --file <image>`
- `content:draft:create --file <packet.json> --idempotency-key <key>`
- `content:draft:update --file <packet.json> --idempotency-key <key>`
- `content:validate --file <packet.json> [--draft-mode]`
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
