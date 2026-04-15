#!/usr/bin/env node
"use strict";

const fs = require("fs/promises");
const path = require("path");

function parseArgs(argv) {
  const result = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const part = argv[index];
    if (!part.startsWith("--")) {
      result._.push(part);
      continue;
    }
    const key = part.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      result[key] = true;
      continue;
    }
    result[key] = next;
    index += 1;
  }
  return result;
}

function getRequiredEnv(name, fallbackNames = []) {
  const candidates = [name, ...fallbackNames];
  for (const candidate of candidates) {
    const value = String(process.env[candidate] || "").trim();
    if (value) {
      return value;
    }
  }
  throw new Error(`缺少环境变量 ${name}`);
}

function resolveGatewayBase() {
  const raw = getRequiredEnv("NEXAI_OPERATOR_BASE_URL", ["NEXAI_BASE_URL"]).replace(/\/+$/, "");
  if (raw.endsWith("/api/operator")) {
    return raw;
  }
  return `${raw}/api/operator`;
}

async function loadJsonInput(args) {
  if (args.file) {
    return JSON.parse(await fs.readFile(path.resolve(process.cwd(), String(args.file)), "utf8"));
  }
  if (args.data) {
    return JSON.parse(String(args.data));
  }
  return {};
}

async function requestJson(method, pathname, options = {}) {
  const baseUrl = resolveGatewayBase();
  const operatorToken = getRequiredEnv("NEXAI_OPERATOR_TOKEN");
  const headers = {
    "content-type": "application/json",
    "x-operator-token": operatorToken,
    ...(options.headers || {})
  };
  const response = await fetch(`${baseUrl}${pathname}`, {
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers,
    method
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const error = new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
    error.payload = payload;
    error.statusCode = response.status;
    throw error;
  }
  return payload;
}

function resolveMimeType(filePath) {
  const extension = path.extname(String(filePath || "").trim().toLowerCase());
  const byExtension = {
    ".gif": "image/gif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp"
  };
  return byExtension[extension] || "application/octet-stream";
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const command = String(args._[0] || "").trim();
  if (!command) {
    throw new Error("缺少命令。示例：content:context / content:publish / products:list / inventory:preview / alerts:inbox");
  }

  let payload;
  switch (command) {
    case "doctor":
      payload = await requestJson("GET", "/payments/summary");
      break;
    case "content:context":
      payload = await requestJson("GET", "/content/context");
      break;
    case "content:draft:get":
      if (!args.id) {
        throw new Error("content:draft:get 需要 --id");
      }
      payload = await requestJson("GET", `/content/drafts/detail?id=${encodeURIComponent(String(args.id))}`);
      break;
    case "content:media:upload": {
      if (!args.file) {
        throw new Error("content:media:upload 需要 --file");
      }
      const filePath = path.resolve(process.cwd(), String(args.file));
      const buffer = await fs.readFile(filePath);
      payload = await requestJson("POST", "/content/media/upload", {
        body: {
          alt: String(args.alt || "").trim(),
          dataBase64: buffer.toString("base64"),
          fileName: path.basename(filePath),
          mimeType: resolveMimeType(filePath),
          title: String(args.title || path.basename(filePath, path.extname(filePath))).trim()
        }
      });
      break;
    }
    case "content:draft:create":
      payload = await requestJson("POST", "/content/drafts", {
        body: await loadJsonInput(args),
        headers: {
          "idempotency-key": String(args["idempotency-key"] || "").trim()
        }
      });
      break;
    case "content:draft:update":
      payload = await requestJson("POST", "/content/drafts/update", {
        body: await loadJsonInput(args),
        headers: {
          "idempotency-key": String(args["idempotency-key"] || "").trim()
        }
      });
      break;
    case "content:validate":
      payload = await requestJson("POST", "/content/validate", {
        body: await loadJsonInput(args)
      });
      break;
    case "content:publish":
      payload = await requestJson("POST", "/content/publish", {
        body: await loadJsonInput(args),
        headers: {
          "idempotency-key": String(args["idempotency-key"] || "").trim()
        }
      });
      break;
    case "products:list":
      payload = await requestJson("GET", "/products");
      break;
    case "products:detail":
      if (!args.id) {
        throw new Error("products:detail 需要 --id");
      }
      payload = await requestJson("GET", `/products/detail?id=${encodeURIComponent(String(args.id))}`);
      break;
    case "products:update":
      payload = await requestJson("POST", "/products/update", {
        body: await loadJsonInput(args)
      });
      break;
    case "products:toggle-listing":
      payload = await requestJson("POST", "/products/listing/toggle", {
        body: await loadJsonInput(args)
      });
      break;
    case "inventory:summary":
      payload = await requestJson("GET", "/inventory/summary");
      break;
    case "inventory:product":
      if (!args.id) {
        throw new Error("inventory:product 需要 --id");
      }
      payload = await requestJson("GET", `/inventory/product-summary?productId=${encodeURIComponent(String(args.id))}`);
      break;
    case "inventory:preview":
      payload = await requestJson("POST", "/inventory/import/preview", {
        body: await loadJsonInput(args)
      });
      break;
    case "inventory:commit":
      payload = await requestJson("POST", "/inventory/import/commit", {
        body: await loadJsonInput(args)
      });
      break;
    case "reviews:agents":
      payload = await requestJson("GET", "/reviews/agent-applications");
      break;
    case "reviews:api":
      payload = await requestJson("GET", "/reviews/api-applications");
      break;
    case "reviews:agent:suggest":
      payload = await requestJson("POST", "/reviews/agent-applications/suggest", {
        body: await loadJsonInput(args)
      });
      break;
    case "reviews:api:suggest":
      payload = await requestJson("POST", "/reviews/api-applications/suggest", {
        body: await loadJsonInput(args)
      });
      break;
    case "alerts:inbox": {
      const status = String(args.status || "OPEN").trim();
      payload = await requestJson("GET", `/alerts/inbox${status ? `?status=${encodeURIComponent(status)}` : ""}`);
      break;
    }
    case "alerts:ack":
      payload = await requestJson("POST", "/alerts/ack", {
        body: await loadJsonInput(args)
      });
      break;
    case "payments:summary":
      payload = await requestJson("GET", "/payments/summary");
      break;
    default:
      throw new Error(`未知命令：${command}`);
  }

  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

run().catch((error) => {
  process.stderr.write(`${error.message || "执行失败"}\n`);
  if (error.payload) {
    process.stderr.write(`${JSON.stringify(error.payload, null, 2)}\n`);
  }
  process.exit(1);
});
