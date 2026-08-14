export type ServiceBlock = {
  id: string;
  badge?: string;
  title: string;
  summary: string;
  scenariosTitle?: string;
  scenarios?: string[];
  contentsTitle: string;
  contents: string[];
  promiseTitle?: string;
  promise?: string;
  layout: "diagnosis" | "social" | "geo" | "authority";
  /** diagnosis only */
  dimensions?: string[];
  reportItems?: string[];
  ctaText?: string;
  ctaHref?: string;
};

export const servicesPageHero = {
  eyebrow: "1. 服务体系",
  titleBefore: "我们的",
  titleHighlight: "核心服务",
  subtitle: "从社媒搜索到AI引擎，为您提供全域搜索优化解决方案",
};

export const servicesPageBlocks: ServiceBlock[] = [
  {
    id: "diagnosis",
    badge: "🎁 免费获取",
    title: "GEO诊断报告",
    summary:
      "8维度量化评分，在豆包、Kimi、DeepSeek等7大主流AI平台进行真实测试，一键生成专业诊断报告。让优化有据可依，而非模糊的“改进建议”。",
    contentsTitle: "8维度评估体系",
    contents: [],
    dimensions: [
      "网络搜索覆盖度",
      "社媒平台渗透率",
      "内容结构化程度",
      "权威背书强度",
      "品牌所有权清晰度",
      "AI可见度指数",
      "AI引用率",
      "内容更新频率",
    ],
    reportItems: [
      "品牌在7大AI平台的实测表现（豆包/Kimi/DeepSeek/文心一言等）",
      "竞品AI引用对比分析",
      "8维度雷达图可视化评分",
      "优先优化方向建议书",
    ],
    promiseTitle: "免费申请",
    promise:
      "首次合作客户可免费获取基础版GEO诊断报告，了解品牌现状后再制定针对性方案。",
    layout: "diagnosis",
    ctaText: "免费申请诊断",
    ctaHref: "/contact",
  },
  {
    id: "social",
    title: "社媒搜索优化",
    summary:
      "在小红书、抖音等社媒平台，用户搜索行为日益增多。我们通过素人内容矩阵策略，帮助品牌“击穿”目标关键词，让用户搜索时看到的都是推荐您的内容。",
    scenariosTitle: "适用场景",
    scenarios: ["本地生活服务（餐饮、婚庆、包车等）", "电商品牌种草", "B2B企业获客"],
    contentsTitle: "服务内容",
    contents: [
      "关键词调研与竞争分析",
      "素人账号矩阵搭建",
      "内容策划与批量生产",
      "搜索排名监测与优化",
    ],
    promiseTitle: "效果承诺",
    promise: "长尾词7天内实现搜索前排覆盖；大词根据竞争度制定专属方案。",
    layout: "social",
    ctaText: "获取方案",
    ctaHref: "/contact",
  },
  {
    id: "geo",
    title: "GEO生成式引擎优化",
    summary:
      "AI搜索正在重塑用户获取信息的方式。当用户向豆包、Kimi、DeepSeek提问时，您的品牌是否能被AI推荐？我们的GEO服务帮助品牌进入AI的“推荐名单”。",
    scenariosTitle: "适用场景",
    scenarios: ["品牌AI可见度提升", "行业关键词AI推荐优化", "企业AI搜索声誉管理"],
    contentsTitle: "服务内容",
    contents: [
      "AI可见度诊断（豆包/Kimi/DeepSeek实测）",
      "竞品AI对标分析",
      "结构化内容矩阵建设",
    ],
    promiseTitle: "核心优势",
    promise: "业内首创AI实测评估体系；数据驱动，每月复测量化效果。",
    layout: "geo",
    ctaText: "获取方案",
    ctaHref: "/contact",
  },
  {
    id: "authority",
    title: "权威背书建设",
    summary:
      "在AI时代，品牌的权威性直接影响AI的推荐权重。我们通过百科创建、媒体报道等方式，构建品牌数字资产，提升品牌在知识图谱中的权重。",
    scenariosTitle: "核心价值",
    scenarios: [
      "提升品牌公信力与信任度",
      "增加AI知识图谱收录权重",
      "沉淀品牌长期数字资产",
    ],
    contentsTitle: "服务内容",
    contents: [
      "百度/搜狗/头条百科创建",
      "权威新闻媒体报道",
      "知乎高权重问答布局",
      "行业榜单入围策划",
    ],
    promiseTitle: "效果承诺",
    promise: "不成功不收费，确保百科词条成功上线，媒体报道真实可查。",
    layout: "authority",
    ctaText: "获取方案",
    ctaHref: "/contact",
  },
];
