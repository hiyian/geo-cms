#!/usr/bin/env bash
# 宝塔 Node 项目启动入口：可选拉代码 → 构建 → 启动
# 由 /www/server/nodejs/vhost/scripts/geocms.sh 或 ecosystem 调用
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export PATH="${ROOT}/node_modules/.bin:/www/server/nodejs/v20.18.1/bin:/usr/local/node20/bin:/usr/local/bin:/usr/bin:/bin:${PATH:-}"
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-3000}"

# 默认开启：重启前尝试同步 origin/main（失败不阻断构建）
if [ "${BAOTA_GIT_PULL:-1}" = "1" ] && [ -d .git ]; then
  echo "[baota-start] git pull..."
  git fetch --all || true
  if ! git pull --ff-only origin main 2>/dev/null; then
    git reset --hard origin/main || echo "[baota-start] WARN: git 同步失败，继续用当前代码构建"
  fi
fi

echo "[baota-start] npm run build..."
npm run build

echo "[baota-start] next start (PORT=${PORT})"
exec npm start
