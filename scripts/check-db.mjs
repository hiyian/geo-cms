import { PrismaClient } from "@prisma/client";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

console.log("Host:", url.replace(/:[^:@/]+@/, ":***@").slice(0, 120));

const prisma = new PrismaClient();
try {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  const services = await prisma.service.count();
  console.log("OK settings:", settings?.siteName ?? null, "services:", services);
} catch (e) {
  console.error("DB ERROR:", e.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
