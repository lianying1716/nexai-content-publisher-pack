# 环境说明

## Base URL

- 推荐环境变量：`NEXAI_OPERATOR_BASE_URL`
- Token 环境变量：`NEXAI_OPERATOR_TOKEN`
- 官方 CLI 接受以下两种形式，并会自动归一化：
  - `https://xsai5.xyz`
  - `https://xsai5.xyz/api/operator`
  - `http://192.168.2.7:3091`
  - `http://192.168.2.7:3091/api/operator`

## 目标环境怎么选

- 局域网冒烟测试和本地联调使用 `http://192.168.2.7:3091`
- 真正的远程执行使用 `https://xsai5.xyz`
- 不要拿站点首页响应做健康检查，因为首页合法情况下也可能返回 HTML

## 首次连通性检查

优先使用：

```bash
node ./scripts/operator-cli.js doctor
```

或者：

```bash
node ./scripts/operator-cli.js content:context
```
