#!/usr/bin/env bash
# 宝塔 Node 项目启动入口：可选拉代码 → 构建 → 启动
# 由 /www/server/nodejs/vhost/scripts/geocms.sh 调用
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export PATH="${ROOT}/node_modules/.bin:/www/server/nodejs/v20.18.1/bin:/usr/local/node20/bin:/usr/local/bin:/usr/bin:/bin:${PATH:-}"
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-3000}"

# 默认关闭：服务器需能访问 GitHub（deploy key）后再设 BAOTA_GIT_PULL=1
if [ "${BAOTA_GIT_PULL:-0}" = "1" ] && [ -d .git ]; then
  echo "[baota-start] git sync..."
  if git fetch origin main; then
    git reset --hard origin/main
  else
    echo "[baota-start] WARN: git fetch 失败，继续用当前目录代码构建"
  fi
fi

echo "[baota-start] npm run build..."
npm run build

echo "[baota-start] next start (PORT=${PORT})"
exec npm start
