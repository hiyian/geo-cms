# GeoCMS

风格参考 [geook.top](https://geook.top/) 的 GEO 营销站 + 简易内容后台（Next.js + Prisma + PostgreSQL）。

仓库：https://github.com/hiyian/geo-cms

## 本地开发

```bash
# 1. 启动 Postgres
docker compose up -d

# 2. 安装依赖 & 初始化数据库
cp .env.example .env
npm install
npm run db:setup

# 3. 启动
npm run dev
```

- 前台：http://localhost:3000
- 后台：http://localhost:3000/admin
- 默认账号：`admin` / `admin123`

## 部署到 Vercel

1. 在 Vercel Import `hiyian/geo-cms`
2. 创建 Postgres（推荐 [Neon](https://neon.tech) 或 Vercel Postgres），拿到 `DATABASE_URL`
3. 在 Vercel Project → Settings → Environment Variables 配置：

| Name | 示例 |
|------|------|
| `DATABASE_URL` | `postgresql://...`（Neon 建议用 pooled / `-pooler` 连接串） |
| `AUTH_SECRET` | 长随机字符串 |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | 强密码 |

4. Deploy 成功后，**本地对生产库执行一次初始化**：

```bash
DATABASE_URL="你的生产连接串" npm run db:setup
```

5. 打开 `https://你的域名/admin` 登录后台改内容

> 说明：Vercel Serverless 不适合 SQLite，本项目已改为 PostgreSQL。

## 后台能力

- 站点设置 / 首页 JSON / 关于&联系页
- 服务、案例、博客、FAQ CRUD
- 联系表单线索收件箱
- 深浅色主题切换

## 常用命令

```bash
npm run dev
npm run build
npm run db:setup   # db push + seed
npm run db:seed    # 仅灌演示数据（会覆盖部分内容）
```
