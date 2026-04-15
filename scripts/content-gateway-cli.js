#!/usr/bin/env node
"use strict";

const fs = require("fs/promises");
const path = require("path");

function parseArgs(argv) {
  const result = {
    _: []
  };

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

function getRequiredEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) {
    throw new Error(`缺少环境变量 ${name}`);
  }
  return value;
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

async function requestJson(method, pathname, options = {}) {
  const baseUrl = getRequiredEnv("NEXAI_BASE_URL").replace(/\/+$/, "");
  const apiToken = getRequiredEnv("NEXAI_API_TOKEN");
  const headers = {
    "content-type": "application/json",
    "x-api-token": apiToken,
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
    const message = payload?.error || payload?.message || `HTTP ${response.status}`;
    const error = new Error(message);
    error.payload = payload;
    error.statusCode = response.status;
    throw error;
  }
  return payload;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];
  if (!command) {
    throw new Error("缺少命令。可用命令：context / draft:get / media:upload / draft:create / draft:update / validate / publish");
  }

  let payload;
  switch (command) {
    case "context":
      payload = await requestJson("GET", "/api/open-api/content/context");
      break;
    case "draft:get":
      if (!args.id) {
        throw new Error("draft:get 需要 --id");
      }
      payload = await requestJson("GET", `/api/open-api/content/drafts/detail?id=${encodeURIComponent(String(args.id))}`);
      break;
    case "media:upload": {
      if (!args.file) {
        throw new Error("media:upload 需要 --file");
      }
      const filePath = path.resolve(process.cwd(), String(args.file));
      const buffer = await fs.readFile(filePath);
      payload = await requestJson("POST", "/api/open-api/content/media/upload", {
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
    case "draft:create":
      payload = await requestJson("POST", "/api/open-api/content/drafts", {
        body: await loadJsonInput(args),
        headers: {
          "idempotency-key": String(args["idempotency-key"] || "").trim()
        }
      });
      break;
    case "draft:update":
      payload = await requestJson("POST", "/api/open-api/content/drafts/update", {
        body: await loadJsonInput(args),
        headers: {
          "idempotency-key": String(args["idempotency-key"] || "").trim()
        }
      });
      break;
    case "validate":
      payload = await requestJson("POST", "/api/open-api/content/validate", {
        body: await loadJsonInput(args)
      });
      break;
    case "publish":
      payload = await requestJson("POST", "/api/open-api/content/publish", {
        body: await loadJsonInput(args),
        headers: {
          "idempotency-key": String(args["idempotency-key"] || "").trim()
        }
      });
      break;
    default:
      throw new Error(`未知命令：${command}`);
  }

  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message || "执行失败"}\n`);
  if (error.payload) {
    process.stderr.write(`${JSON.stringify(error.payload, null, 2)}\n`);
  }
  process.exit(1);
});
