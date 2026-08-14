import { prisma } from "./db";
import {
  defaultServicesPageBlocks,
  defaultServicesPageHero,
  blockToServiceDetail,
} from "@/data/services-page";
import type {
  AboutPageData,
  ContactPageData,
  HomePageData,
  ServiceBlock,
  ServiceDetail,
  ServiceLayout,
  ServicesPageHero,
} from "./types";

const LAYOUTS: ServiceLayout[] = [
  "diagnosis",
  "social",
  "geo",
  "authority",
  "default",
];

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (!settings) {
    throw new Error("Site settings missing. Run: npm run db:seed");
  }
  return settings;
}

export async function getPageData<T>(slug: string): Promise<T> {
  const page = await prisma.pageContent.findUnique({ where: { slug } });
  if (!page) {
    throw new Error(`Page content missing: ${slug}`);
  }
  return JSON.parse(page.data) as T;
}

export async function getHomeData() {
  const data = await getPageData<HomePageData & { hero?: { demo?: unknown; demos?: unknown } }>(
    "home",
  );

  // Backward compat: migrate old single `demo` to `demos`
  const hero = data.hero as HomePageData["hero"] & { demo?: HomePageData["hero"]["demos"][number] };
  if ((!hero.demos || hero.demos.length === 0) && hero.demo) {
    hero.demos = [{ ...hero.demo, id: "legacy", assistantAccent: "orange" }];
  }
  if (!hero.eyebrow) hero.eyebrow = "";
  if (!hero.platforms) hero.platforms = [];
  if (!data.servicesSection.badge) data.servicesSection.badge = "What GEO Covers";
  if (!data.servicesSection.covers) data.servicesSection.covers = [];

  return data as HomePageData;
}

export async function getAboutData() {
  return getPageData<AboutPageData>("about");
}

export async function getContactData() {
  return getPageData<ContactPageData>("contact");
}

export async function getServicesPageHero(): Promise<ServicesPageHero> {
  const page = await prisma.pageContent.findUnique({ where: { slug: "services" } });
  if (!page) return { ...defaultServicesPageHero };
  try {
    const data = JSON.parse(page.data) as Partial<ServicesPageHero>;
    return {
      eyebrow: data.eyebrow || defaultServicesPageHero.eyebrow,
      titleBefore: data.titleBefore || defaultServicesPageHero.titleBefore,
      titleHighlight: data.titleHighlight || defaultServicesPageHero.titleHighlight,
      subtitle: data.subtitle || defaultServicesPageHero.subtitle,
    };
  } catch {
    return { ...defaultServicesPageHero };
  }
}

export function parseServiceDetail(value?: string | null): ServiceDetail {
  try {
    const parsed = value ? (JSON.parse(value) as Partial<ServiceDetail>) : {};
    const layout = LAYOUTS.includes(parsed.layout as ServiceLayout)
      ? (parsed.layout as ServiceLayout)
      : "default";
    return {
      layout,
      scenariosTitle: parsed.scenariosTitle || "",
      scenarios: Array.isArray(parsed.scenarios) ? parsed.scenarios.map(String) : [],
      contentsTitle: parsed.contentsTitle || "服务内容",
      promiseTitle: parsed.promiseTitle || "",
      promise: parsed.promise || "",
      dimensions: Array.isArray(parsed.dimensions) ? parsed.dimensions.map(String) : [],
      reportItems: Array.isArray(parsed.reportItems) ? parsed.reportItems.map(String) : [],
      ctaText: parsed.ctaText || "",
    };
  } catch {
    return {
      layout: "default",
      scenariosTitle: "",
      scenarios: [],
      contentsTitle: "服务内容",
      promiseTitle: "",
      promise: "",
      dimensions: [],
      reportItems: [],
      ctaText: "",
    };
  }
}

export function serviceToBlock(service: {
  id: string;
  title: string;
  summary: string;
  description: string;
  features: string;
  detail?: string | null;
  badge: string;
  href: string;
}): ServiceBlock {
  const detail = parseServiceDetail(service.detail);
  return {
    id: service.id,
    badge: service.badge || undefined,
    title: service.title,
    summary: service.summary,
    scenariosTitle: detail.scenariosTitle || undefined,
    scenarios: detail.scenarios?.length ? detail.scenarios : undefined,
    contentsTitle: detail.contentsTitle || "服务内容",
    contents: parseJsonArray(service.features),
    promiseTitle: detail.promiseTitle || undefined,
    promise: detail.promise || service.description || undefined,
    layout: detail.layout,
    dimensions: detail.dimensions?.length ? detail.dimensions : undefined,
    reportItems: detail.reportItems?.length ? detail.reportItems : undefined,
    ctaText: detail.ctaText || undefined,
    ctaHref: service.href || "/contact",
  };
}

export async function getPublishedServiceBlocks(): Promise<ServiceBlock[]> {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  if (!services.length) return defaultServicesPageBlocks;

  return services.map((service) => {
    const block = serviceToBlock(service);
    const detail = parseServiceDetail(service.detail);
    const isSparse =
      detail.layout === "default" &&
      !(detail.scenarios?.length || detail.dimensions?.length || detail.reportItems?.length);

    if (!isSparse) return block;

    const fallback = defaultServicesPageBlocks.find((b) => b.title === service.title);
    if (!fallback) return block;

    return {
      ...fallback,
      id: service.id,
      title: service.title || fallback.title,
      summary: service.summary || fallback.summary,
      badge: service.badge || fallback.badge,
      ctaHref: service.href || fallback.ctaHref,
      contents: block.contents.length ? block.contents : fallback.contents,
      promise: block.promise || fallback.promise,
    };
  });
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedFaqs() {
  return prisma.faq.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedCases() {
  return prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
}

export function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function parseMetrics(
  value: string,
): { label: string; value: string }[] {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      label: String(item.label ?? ""),
      value: String(item.value ?? ""),
    }));
  } catch {
    return [];
  }
}

export { blockToServiceDetail };
