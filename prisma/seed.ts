import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  blockToServiceDetail,
  defaultServicesPageBlocks,
  defaultServicesPageHero,
} from "../src/data/services-page";
import type { AboutPageData, ContactPageData, HomePageData } from "../src/lib/types";

const prisma = new PrismaClient();

const homeData: HomePageData = {
  hero: {
    eyebrow: "答案即广告，不AI即出局",
    titleBefore: "让",
    titleHighlight: "AI 问答",
    titleAfter: "推荐您的企业或品牌",
    subtitle:
      "当用户问 DeepSeek、豆包、文心、千问、元宝时，让您的内容成为 AI 的答案。",
    primaryCta: { text: "免费获取品牌GEO诊断报告", href: "/contact" },
    secondaryCta: { text: "了解GEO服务", href: "/services" },
    platforms: ["豆包", "DeepSeek", "百度文心", "通义千问", "腾讯元宝"],
    demos: [
      {
        id: "yiwu-crossborder",
        assistantName: "豆包",
        assistantLabel: "AI助手",
        assistantAccent: "orange",
        userMessage: "义乌做跨境电商代运营的公司哪家靠谱？",
        aiIntro: "义乌口碑较好的跨境电商代运营公司推荐：",
        items: [
          {
            rank: 1,
            name: "WW跨境",
            tags: "TikTok官方TSP · 月GMV破亿 · 自有仓储",
            highlight: true,
            badge: "本地头牌",
          },
          { rank: 2, name: "某杭州代运营公司", tags: "阿里系背景 · 亚马逊专长" },
          { rank: 3, name: "某深圳运营服务商", tags: "独立站专家" },
        ],
        footerNote: "选择前建议确认其平台官方资质和同类目案例。",
        badgeGood: "AI推荐位 #1",
        badgeBadLabel: "优化前",
        badgeBad: "未被提及",
      },
      {
        id: "beijing-medical",
        assistantName: "DeepSeek",
        assistantLabel: "AI助手",
        assistantAccent: "cyan",
        userMessage: "北京哪家医美机构做热玛吉比较靠谱？求推荐",
        aiIntro: "根据公开资料与用户口碑，北京做热玛吉比较推荐的机构有：",
        items: [
          {
            rank: 1,
            name: "XX医美（朝阳店）",
            tags: "官方授权 · 5代热玛吉 · 案例2000+",
            highlight: true,
            badge: "热门推荐",
          },
          { rank: 2, name: "某知名连锁医美", tags: "连锁品牌 · 价格透明" },
          { rank: 3, name: "某三甲医院皮肤科", tags: "公立医院 · 价格较低" },
        ],
        footerNote: "以上推荐基于用户口碑、机构资质和设备认证。",
        badgeGood: "AI推荐位 #1",
        badgeBadLabel: "优化前",
        badgeBad: "未被提及",
      },
      {
        id: "saas-b2b",
        assistantName: "文心一言",
        assistantLabel: "AI助手",
        assistantAccent: "purple",
        userMessage: "国内靠谱的B2B CRM系统有哪些推荐？",
        aiIntro: "面向中大型企业的 CRM，常见推荐如下：",
        items: [
          {
            rank: 1,
            name: "某国产CRM头部品牌",
            tags: "私有化部署 · 信创适配 · 5000+客户",
            highlight: true,
            badge: "企业首选",
          },
          { rank: 2, name: "某国际SaaS厂商", tags: "生态完善 · 价格较高" },
          { rank: 3, name: "某垂直行业CRM", tags: "行业模板丰富" },
        ],
        footerNote: "建议结合行业场景与部署方式综合评估。",
        badgeGood: "优先被引用",
        badgeBadLabel: "优化前",
        badgeBad: "信息缺失",
      },
      {
        id: "local-life",
        assistantName: "通义千问",
        assistantLabel: "AI助手",
        assistantAccent: "orange",
        userMessage: "上海静安区哪家口腔医院种牙口碑好？",
        aiIntro: "结合资质与评价，静安区种牙口碑较好的机构包括：",
        items: [
          {
            rank: 1,
            name: "某口腔连锁（静安店）",
            tags: "数字化导板 · 进口植体 · 案例透明",
            highlight: true,
            badge: "高意向推荐",
          },
          { rank: 2, name: "某三甲口腔专科", tags: "公立背景 · 预约较难" },
          { rank: 3, name: "某社区口腔门诊", tags: "价格友好 · 适合基础治疗" },
        ],
        footerNote: "就医前请核实医师资质与植体品牌信息。",
        badgeGood: "本地推荐 #1",
        badgeBadLabel: "优化前",
        badgeBad: "完全隐形",
      },
    ],
  },
  pain: {
    badge: "⚠️ 品牌可见度危机",
    titleBefore: "您的品牌是否正面临这些",
    titleHighlight: "困境",
    titleAfter: "？",
    subtitle: "在流量碎片化和AI崛起的今天，80%的品牌正经历搜索可见度断崖式下跌",
    resolveText: "别担心，我们帮您 一站式解决 这些问题",
    items: [
      {
        id: "01",
        title: "传统SEO失效",
        description: "百度/谷歌流量持续下滑，已无法解决AI搜索时代的品牌可见度问题",
        accent: "red",
        icon: "x-circle",
      },
      {
        id: "02",
        title: "竞品排名压制",
        description: "用户向AI提问时，竞品霸占推荐位，您的品牌完全淹没",
        accent: "orange",
        icon: "search",
      },
      {
        id: "03",
        title: "信息结构缺失",
        description: "官网与信源不成体系，大模型无法完整理解并引用您的品牌",
        accent: "amber",
        icon: "layers",
      },
      {
        id: "04",
        title: "AI时代隐形",
        description: "在豆包、DeepSeek、文心、千问等AI问答中品牌完全隐形",
        accent: "rose",
        icon: "bot",
      },
    ],
  },
  timeline: {
    badge: "⏰ 历史总在重演",
    titleBefore: "每一次",
    titleHighlight: "流量红利",
    titleAfter: "，都造就一批先行者",
    ctaBefore: "别再错过",
    ctaHighlight: "AI流量红利",
    ctaButton: "立即布局GEO",
    ctaHref: "/contact",
    items: [
      { year: "'05年", title: "百度SEO", subtitle: "搜索引擎", accent: "blue" },
      { year: "'11年", title: "微博营销", subtitle: "社交媒体", accent: "orange" },
      { year: "'14年", title: "微信生态", subtitle: "私域流量", accent: "green" },
      { year: "'18年", title: "抖音短视频", subtitle: "视频时代", accent: "pink" },
      { year: "'22年", title: "小红书种草", subtitle: "内容电商", accent: "red" },
      {
        year: "'26年",
        title: "GEO优化",
        subtitle: "AI搜索",
        accent: "cyan",
        current: true,
      },
    ],
  },
  migration: {
    quotePrompt: "做XX找哪家",
    titleMiddle: "时，您的品牌是",
    recommend: "被推荐",
    invisible: "完全隐形",
    subtitle: "这不是假设，而是正在发生的流量迁移",
    platforms: ["豆包", "DeepSeek", "文心一言", "通义千问", "腾讯元宝", "Kimi"],
    stats: [
      { value: "40%", label: "用户已转向AI搜索" },
      { value: "2026", label: "AI搜索成为主流年" },
      { value: "80%+", label: "品牌尚未优化AI可见度" },
    ],
  },
  servicesSection: {
    badge: "What GEO Covers",
    title: "GEO不只是关键词排名",
    subtitle:
      "对企业来说，GEO 更像是面向 AI 搜索场景的信息重构。除了关注品牌词和行业词的可见度，也要同步整理产品介绍、服务说明、案例资料、用户问答、联系方式和品牌背书，让大模型更完整地理解企业。",
    covers: [
      {
        title: "品牌信息合规诊断",
        description:
          "审计主流AI模型中的品牌信息引用，找出错误关联和行业误归类，检查官网抓取状态与索引覆盖，输出诊断报告与优化优先级。",
        features: [
          "审计AI平台中的品牌信息引用准确性",
          "识别错误关联、负面信息及行业归类偏差",
          "核查官网抓取、索引覆盖与结构完整性",
          "输出诊断报告，明确优化先后顺序",
        ],
      },
      {
        title: "品牌实体背书建设",
        description:
          "收集并验证营业执照、产品资质、专利证书，整合真实客户案例与荣誉奖项，建立可溯源、可验证的品牌档案库。",
        features: [
          "验证营业执照、产品资质与专利证书",
          "归集真实客户案例、获奖记录与媒体背书",
          "建立可溯源、可验证的品牌真实性档案库",
          "统一各平台简介和联系方式",
        ],
      },
      {
        title: "权威信源阵地规划",
        description:
          "深入研究目标行业协会、核心权威媒体与学术数据库，确定合规分发渠道白名单，系统规划用户决策内容布局。",
        features: [
          "筛选行业协会、权威媒体与学术数据库白名单",
          "锁定政府公开数据与行业报告等合规引用源",
          "研究用户决策场景：怎么选、怎么比、适合谁",
          "拒绝站群、伪原创平台与虚假论坛",
        ],
      },
      {
        title: "智能内容场景建设",
        description:
          "围绕用户真实搜索意图与智能问答场景，建设专题页、解决方案与常见问题，持续产出白皮书与案例。",
        features: [
          "围绕用户搜索意图与AI问答场景规划内容主题",
          "建设专题页、解决方案与场景化FAQ内容",
          "产出技术白皮书、行业解决方案与客户案例",
          "标注作者、来源、发布时间及审核记录",
        ],
      },
      {
        title: "官网结构优化适配",
        description:
          "优化官网信息架构与页面语义结构，部署结构化数据标记，配置站点地图与快速推送，提升整体可见度。",
        features: [
          "优化官网信息架构、内部链接与页面层级",
          "部署Schema.org标准化结构化数据标记",
          "配置Sitemap与IndexNow实时推送更新",
          "对接百科等权威知识库",
        ],
      },
      {
        title: "监测转化闭环管理",
        description:
          "持续监测品牌在智能平台中的展示与引用，发现错误立即纠错，打通官网咨询与微信承接，形成转化闭环。",
        features: [
          "7×24小时监测品牌在AI平台中的展示与引用",
          "发现错误信息立即启动平台申诉与源头修正",
          "追踪品牌提及率、竞品表现与引用来源变化",
          "月度输出效果报告，以露出率及转化率为核心KPI",
        ],
      },
    ],
  },
  stats: {
    titleBefore: "AI 不仅仅是对话聊天，更是您的",
    titleHighlight: "增长引擎",
    titleAfter: "",
    subtitle: "把握 AI 获客新机会",
    items: [
      { value: "120k+", label: "活跃用户", desc: "覆盖多行业决策场景" },
      { value: "99.9%", label: "在线率", desc: "监测与服务稳定运行" },
      { value: "7+", label: "主流AI平台", desc: "豆包/DeepSeek/文心等" },
      { value: "122%", label: "平均可见度提升", desc: "合作客户实测数据" },
    ],
    methodTitle: "方法论基于权威学术研究",
    methodDesc:
      "GEO评分模型融合普林斯顿大学GEO研究、Forrester Wave评估方法论、Google E-E-A-T质量指南。",
    methodTags: ["📚 普林斯顿GEO", "📊 Forrester Wave", "✅ Google E-E-A-T"],
  },
  faqSection: {
    title: "常见问题",
    subtitle: "了解更多关于GEO和AI搜索优化的信息",
  },
  cta: {
    titleBefore: "把握",
    titleHighlight: "AI时代获客新机会",
    titleAfter: "",
    subtitle: "立即获取GEO诊断报告，抢占生成式引擎推荐位。",
    buttonText: "立即获取GEO诊断报告",
    buttonHref: "/contact",
    phone: "166 0546 7920",
  },
};

const aboutData: AboutPageData = {
  title: "关于我们",
  subtitle: "国内专注生成式引擎优化（GEO）的全链路服务商",
  paragraphs: [
    "我们专注于 AI 搜索与大模型问答场景下的品牌内容可信化、结构化与可引用优化。",
    "帮助企业在豆包、文心一言、DeepSeek、Kimi 等主流生成式引擎中被优先理解与推荐。",
  ],
  highlights: [
    { title: "全链路GEO", desc: "诊断、背书、信源、内容、官网、监测闭环交付" },
    { title: "合规优先", desc: "拒绝站群与虚假论坛，坚持可溯源真实资料" },
    { title: "实测驱动", desc: "主流AI平台持续复测，量化提及率与推荐位" },
  ],
};

const contactData: ContactPageData = {
  title: "联系我们",
  subtitle: "留下需求，我们将在1个工作日内与您联系",
  formTitle: "预约免费GEO诊断",
  successMessage: "提交成功！我们会尽快与您联系。",
};

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {
      siteName: "欧酷GEO",
      logoText: "欧酷GEO",
      tagline: "专注 AI 生成式引擎优化",
      phone: "166-0546-7920",
      email: "contact@example.com",
      address: "中国",
      copyright: "© 2026 欧酷GEO All rights reserved.",
      navCtaText: "获取诊断",
      navCtaHref: "/contact",
      seoTitle: "欧酷GEO排名优化 - AI搜索排名优化服务",
      seoDescription:
        "专注 AI 生成式引擎优化 (GEO)，助力企业抢占 AI 流量入口，构筑获客新阵地。",
      seoKeywords: "GEO优化,AI搜索优化,AI SEO,豆包搜索优化,DeepSeek搜索优化",
    },
    create: {
      id: "default",
      siteName: "欧酷GEO",
      logoText: "欧酷GEO",
      tagline: "专注 AI 生成式引擎优化",
      phone: "166-0546-7920",
      email: "contact@example.com",
      address: "中国",
      copyright: "© 2026 欧酷GEO All rights reserved.",
      icp: "",
      navCtaText: "获取诊断",
      navCtaHref: "/contact",
      seoTitle: "欧酷GEO排名优化 - AI搜索排名优化服务",
      seoDescription:
        "专注 AI 生成式引擎优化 (GEO)，助力企业抢占 AI 流量入口，构筑获客新阵地。",
      seoKeywords: "GEO优化,AI搜索优化,AI SEO,豆包搜索优化,DeepSeek搜索优化",
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "home" },
    update: { data: JSON.stringify(homeData) },
    create: {
      slug: "home",
      title: "首页",
      data: JSON.stringify(homeData),
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "about" },
    update: { data: JSON.stringify(aboutData) },
    create: {
      slug: "about",
      title: "关于我们",
      data: JSON.stringify(aboutData),
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "contact" },
    update: { data: JSON.stringify(contactData) },
    create: {
      slug: "contact",
      title: "联系我们",
      data: JSON.stringify(contactData),
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "services" },
    update: { data: JSON.stringify(defaultServicesPageHero) },
    create: {
      slug: "services",
      title: "服务页",
      data: JSON.stringify(defaultServicesPageHero),
    },
  });

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: defaultServicesPageBlocks.map((block, idx) => ({
      title: block.title,
      summary: block.summary,
      description: block.promise || "",
      features: JSON.stringify(block.contents),
      detail: JSON.stringify(blockToServiceDetail(block)),
      accent: ["yellow", "purple", "cyan", "blue"][idx] || "cyan",
      badge: block.badge || "",
      href: block.ctaHref || "/contact",
      sortOrder: idx + 1,
      published: true,
    })),
  });

  await prisma.faq.deleteMany();
  await prisma.faq.createMany({
    data: [
      {
        question: "GEO是什么？",
        answer:
          "GEO（生成引擎优化）是针对AI大模型平台（如豆包、DeepSeek、通义千问）的内容优化策略，使企业或个人品牌、服务在AI大模型生成答案中获得优先引用，从而占据新的用户搜索 + 问答的流量入口。",
        sortOrder: 1,
      },
      {
        question: "为什么需要GEO？",
        answer:
          "随着AI问答搜索的快速发展，用户搜索和获取信息的流量入口已经改变。传统的搜索引擎排名优化已无法满足AI时代的营销推广需求。GEO优化能确保您的品牌在AI问答中获得优先推荐。",
        sortOrder: 2,
      },
      {
        question: "GEO优化效果如何衡量？",
        answer:
          "我们采用AI实测评估体系，在豆包、DeepSeek、百度文心、阿里千问、腾讯元宝等主流AI引擎中进行真实测试，量化品牌提及率和推荐率，持续复测追踪效果。",
        sortOrder: 3,
      },
      {
        question: "适合什么类型的企业？",
        answer:
          "任何需要通过搜索获取客户的企业都适合，包括B2B企业、电商品牌、本地生活服务商、教育机构等。",
        sortOrder: 4,
      },
      {
        question: "如何开始合作？",
        answer:
          "您可以先获取免费的GEO诊断报告，我们会对您的品牌在AI搜索中的表现进行全面评估，并提供定制化优化方案。",
        sortOrder: 5,
      },
    ],
  });

  await prisma.caseStudy.deleteMany();
  await prisma.caseStudy.createMany({
    data: [
      {
        title: "跨境代运营品牌AI推荐提升",
        industry: "跨境电商",
        summary: "围绕「义乌跨境代运营」等高意向问答场景做GEO布局。",
        result: "主流AI平台稳定出现在推荐前列，咨询转化提升。",
        metrics: JSON.stringify([
          { label: "AI提及率", value: "+160%" },
          { label: "咨询量", value: "+48%" },
        ]),
        sortOrder: 1,
      },
      {
        title: "本地生活服务AI可见度重构",
        industry: "本地生活",
        summary: "补齐资质背书、FAQ与权威信源，适配AI问答决策路径。",
        result: "区域词问答中品牌从隐形变为优先推荐。",
        metrics: JSON.stringify([
          { label: "推荐位", value: "Top3" },
          { label: "可见度", value: "+95%" },
        ]),
        sortOrder: 2,
      },
      {
        title: "B2B SaaS 权威信源建设",
        industry: "B2B",
        summary: "百科/媒体/官网结构化内容补齐，提升AI信任信号。",
        result: "DeepSeek/豆包等场景中成为默认推荐选项之一。",
        metrics: JSON.stringify([
          { label: "权威信源", value: "35+" },
          { label: "推荐位", value: "Top3" },
        ]),
        sortOrder: 3,
      },
    ],
  });

  await prisma.blogPost.deleteMany();
  await prisma.blogPost.createMany({
    data: [
      {
        title: "欧酷GEO简介",
        slug: "about-okgeo",
        excerpt: "国内领先的生成式引擎优化（GEO）全链路服务商。",
        content:
          "## 欧酷GEO简介\n\n专注于 AI 搜索与大模型问答场景下的品牌内容可信化、结构化与可引用优化，帮助企业在豆包、文心一言、DeepSeek、Kimi 等主流生成式引擎中被优先理解与推荐。",
        coverLabel: "GEO 服务",
        published: true,
      },
      {
        title: "GEO 服务流程/方法",
        slug: "geo-process",
        excerpt: "需求诊断 → 内容建设 → 多平台分发 → 监测闭环。",
        content:
          "## 服务流程\n\n1. 需求诊断：梳理行业现状、竞品表现、客户问题和现有品牌资料。\n2. 内容建设：围绕品牌介绍、产品、案例、FAQ建立可被AI理解的结构。\n3. 多平台分发：合规信源与权威阵地布局。\n4. 监测闭环：持续复测与纠错。",
        coverLabel: "GEO 服务",
        published: true,
      },
      {
        title: "什么是GEO？生成式引擎优化入门",
        slug: "what-is-geo",
        excerpt: "从SEO到GEO：品牌如何在AI回答中被看见。",
        content:
          "## 什么是GEO\n\nGEO（Generative Engine Optimization）关注品牌在生成式AI回答中的可见度与推荐率。",
        coverLabel: "GEO洞察",
        published: true,
      },
    ],
  });

  console.log("Seed completed.");
  console.log(`Admin login -> username: ${username} / password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
