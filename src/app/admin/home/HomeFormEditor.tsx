"use client";

import { useMemo, useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";
import {
  Field,
  SectionCard,
  TabBar,
  TextArea,
  TextInput,
} from "@/components/admin/FormFields";
import type { HomePageData, HeroDemoScene } from "@/lib/types";

const tabs = [
  { id: "hero", label: "首屏文案" },
  { id: "demos", label: "AI聊天演示" },
  { id: "pain", label: "痛点区块" },
  { id: "timeline", label: "时间线" },
  { id: "migration", label: "流量迁移" },
  { id: "covers", label: "GEO能力" },
  { id: "stats", label: "数据亮点" },
  { id: "faq", label: "FAQ标题" },
  { id: "cta", label: "底部转化" },
];

function emptyDemo(): HeroDemoScene {
  return {
    id: `demo-${Date.now()}`,
    assistantName: "豆包",
    assistantLabel: "AI助手",
    assistantAccent: "orange",
    userMessage: "用户会问什么？",
    aiIntro: "AI 开场介绍",
    items: [
      {
        rank: 1,
        name: "推荐品牌",
        tags: "卖点说明",
        highlight: true,
        badge: "热门推荐",
      },
      { rank: 2, name: "竞品A", tags: "简述" },
      { rank: 3, name: "竞品B", tags: "简述" },
    ],
    footerNote: "底部补充说明",
    badgeGood: "AI推荐位 #1",
    badgeBadLabel: "优化前",
    badgeBad: "未被提及",
  };
}

export function HomeFormEditor({ initial }: { initial: HomePageData }) {
  const [data, setData] = useState<HomePageData>(initial);
  const [tab, setTab] = useState("hero");
  const [demoIndex, setDemoIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const demo = data.hero.demos[demoIndex] ?? data.hero.demos[0];

  const patch = useMemo(
    () => ({
      hero: (partial: Partial<HomePageData["hero"]>) =>
        setData((d) => ({ ...d, hero: { ...d.hero, ...partial } })),
      pain: (partial: Partial<HomePageData["pain"]>) =>
        setData((d) => ({ ...d, pain: { ...d.pain, ...partial } })),
      timeline: (partial: Partial<HomePageData["timeline"]>) =>
        setData((d) => ({ ...d, timeline: { ...d.timeline, ...partial } })),
      migration: (partial: Partial<HomePageData["migration"]>) =>
        setData((d) => ({ ...d, migration: { ...d.migration, ...partial } })),
      servicesSection: (partial: Partial<HomePageData["servicesSection"]>) =>
        setData((d) => ({
          ...d,
          servicesSection: { ...d.servicesSection, ...partial },
        })),
      stats: (partial: Partial<HomePageData["stats"]>) =>
        setData((d) => ({ ...d, stats: { ...d.stats, ...partial } })),
      faqSection: (partial: Partial<HomePageData["faqSection"]>) =>
        setData((d) => ({ ...d, faqSection: { ...d.faqSection, ...partial } })),
      cta: (partial: Partial<HomePageData["cta"]>) =>
        setData((d) => ({ ...d, cta: { ...d.cta, ...partial } })),
    }),
    [],
  );

  async function save() {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/admin/pages/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "首页", data }),
    });
    setLoading(false);
    if (!res.ok) {
      setError(true);
      setMessage("保存失败，请稍后重试");
      return;
    }
    setError(false);
    setMessage("已保存，刷新前台首页即可看到效果");
  }

  function updateDemo(partial: Partial<HeroDemoScene>) {
    setData((d) => {
      const demos = [...d.hero.demos];
      demos[demoIndex] = { ...demos[demoIndex], ...partial };
      return { ...d, hero: { ...d.hero, demos } };
    });
  }

  return (
    <div>
      <StatusBanner message={message} error={error} />
      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === "hero" && (
        <SectionCard title="首屏文案" desc="首页最上方大标题与按钮">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="顶部小标签">
              <TextInput
                value={data.hero.eyebrow}
                onChange={(e) => patch.hero({ eyebrow: e.target.value })}
              />
            </Field>
            <Field label="平台标签（用逗号分隔）" hint="例如：豆包,DeepSeek,文心一言">
              <TextInput
                value={data.hero.platforms.join(",")}
                onChange={(e) =>
                  patch.hero({
                    platforms: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
            <Field label="标题前半句">
              <TextInput
                value={data.hero.titleBefore}
                onChange={(e) => patch.hero({ titleBefore: e.target.value })}
              />
            </Field>
            <Field label="标题高亮词">
              <TextInput
                value={data.hero.titleHighlight}
                onChange={(e) => patch.hero({ titleHighlight: e.target.value })}
              />
            </Field>
            <Field label="标题后半句" hint="会换行显示">
              <TextInput
                value={data.hero.titleAfter}
                onChange={(e) => patch.hero({ titleAfter: e.target.value })}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="副标题说明">
                <TextArea
                  rows={3}
                  value={data.hero.subtitle}
                  onChange={(e) => patch.hero({ subtitle: e.target.value })}
                />
              </Field>
            </div>
            <Field label="主按钮文字">
              <TextInput
                value={data.hero.primaryCta.text}
                onChange={(e) =>
                  patch.hero({
                    primaryCta: { ...data.hero.primaryCta, text: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="主按钮链接">
              <TextInput
                value={data.hero.primaryCta.href}
                onChange={(e) =>
                  patch.hero({
                    primaryCta: { ...data.hero.primaryCta, href: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="次按钮文字">
              <TextInput
                value={data.hero.secondaryCta.text}
                onChange={(e) =>
                  patch.hero({
                    secondaryCta: {
                      ...data.hero.secondaryCta,
                      text: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="次按钮链接">
              <TextInput
                value={data.hero.secondaryCta.href}
                onChange={(e) =>
                  patch.hero({
                    secondaryCta: {
                      ...data.hero.secondaryCta,
                      href: e.target.value,
                    },
                  })
                }
              />
            </Field>
          </div>
        </SectionCard>
      )}

      {tab === "demos" && demo && (
        <div className="space-y-4">
          <SectionCard
            title="AI 聊天演示场景"
            desc="右侧假聊天窗口会轮播这些场景，建议准备 2～4 个"
            actions={
              <button
                type="button"
                className="admin-btn"
                onClick={() => {
                  setData((d) => ({
                    ...d,
                    hero: { ...d.hero, demos: [...d.hero.demos, emptyDemo()] },
                  }));
                  setDemoIndex(data.hero.demos.length);
                }}
              >
                + 新增场景
              </button>
            }
          >
            <div className="flex flex-wrap gap-2">
              {data.hero.demos.map((d, idx) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDemoIndex(idx)}
                  className={`rounded-lg px-3 py-1.5 text-sm ${
                    idx === demoIndex
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  场景 {idx + 1}：{d.assistantName}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title={`编辑场景 ${demoIndex + 1}`}
            actions={
              data.hero.demos.length > 1 ? (
                <button
                  type="button"
                  className="admin-btn-ghost"
                  onClick={() => {
                    setData((d) => ({
                      ...d,
                      hero: {
                        ...d.hero,
                        demos: d.hero.demos.filter((_, i) => i !== demoIndex),
                      },
                    }));
                    setDemoIndex(0);
                  }}
                >
                  删除此场景
                </button>
              ) : null
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="AI 名称">
                <TextInput
                  value={demo.assistantName}
                  onChange={(e) => updateDemo({ assistantName: e.target.value })}
                />
              </Field>
              <Field label="AI 副标题">
                <TextInput
                  value={demo.assistantLabel}
                  onChange={(e) => updateDemo({ assistantLabel: e.target.value })}
                />
              </Field>
              <Field label="头像颜色">
                <select
                  className="admin-input"
                  value={demo.assistantAccent || "orange"}
                  onChange={(e) =>
                    updateDemo({
                      assistantAccent: e.target.value as "orange" | "purple" | "cyan",
                    })
                  }
                >
                  <option value="orange">橙色</option>
                  <option value="purple">紫色</option>
                  <option value="cyan">青色</option>
                </select>
              </Field>
              <Field label="场景 ID（一般不用改）">
                <TextInput
                  value={demo.id}
                  onChange={(e) => updateDemo({ id: e.target.value })}
                />
              </Field>
              <div className="md:col-span-2">
                <Field label="用户提问">
                  <TextArea
                    rows={2}
                    value={demo.userMessage}
                    onChange={(e) => updateDemo({ userMessage: e.target.value })}
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="AI 开场白">
                  <TextArea
                    rows={2}
                    value={demo.aiIntro}
                    onChange={(e) => updateDemo({ aiIntro: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="底部说明">
                <TextInput
                  value={demo.footerNote}
                  onChange={(e) => updateDemo({ footerNote: e.target.value })}
                />
              </Field>
              <Field label="绿色角标文案">
                <TextInput
                  value={demo.badgeGood}
                  onChange={(e) => updateDemo({ badgeGood: e.target.value })}
                />
              </Field>
              <Field label="红色角标标题">
                <TextInput
                  value={demo.badgeBadLabel}
                  onChange={(e) => updateDemo({ badgeBadLabel: e.target.value })}
                />
              </Field>
              <Field label="红色角标文案">
                <TextInput
                  value={demo.badgeBad}
                  onChange={(e) => updateDemo({ badgeBad: e.target.value })}
                />
              </Field>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-white">推荐列表（最多 3 条）</h4>
              {demo.items.map((item, idx) => (
                <div
                  key={`${demo.id}-${idx}`}
                  className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2"
                >
                  <Field label={`第 ${idx + 1} 名名称`}>
                    <TextInput
                      value={item.name}
                      onChange={(e) => {
                        const items = [...demo.items];
                        items[idx] = { ...item, name: e.target.value };
                        updateDemo({ items });
                      }}
                    />
                  </Field>
                  <Field label="卖点标签">
                    <TextInput
                      value={item.tags}
                      onChange={(e) => {
                        const items = [...demo.items];
                        items[idx] = { ...item, tags: e.target.value };
                        updateDemo({ items });
                      }}
                    />
                  </Field>
                  <Field label="角标（可空）">
                    <TextInput
                      value={item.badge || ""}
                      onChange={(e) => {
                        const items = [...demo.items];
                        items[idx] = { ...item, badge: e.target.value };
                        updateDemo({ items });
                      }}
                    />
                  </Field>
                  <label className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={Boolean(item.highlight)}
                      onChange={(e) => {
                        const items = [...demo.items];
                        items[idx] = { ...item, highlight: e.target.checked };
                        updateDemo({ items });
                      }}
                    />
                    高亮为首选推荐
                  </label>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {tab === "pain" && (
        <SectionCard title="痛点区块" desc="四个问题卡片上方的标题与文案">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="小标签">
              <TextInput
                value={data.pain.badge}
                onChange={(e) => patch.pain({ badge: e.target.value })}
              />
            </Field>
            <Field label="副标题">
              <TextInput
                value={data.pain.subtitle}
                onChange={(e) => patch.pain({ subtitle: e.target.value })}
              />
            </Field>
            <Field label="标题前">
              <TextInput
                value={data.pain.titleBefore}
                onChange={(e) => patch.pain({ titleBefore: e.target.value })}
              />
            </Field>
            <Field label="标题高亮">
              <TextInput
                value={data.pain.titleHighlight}
                onChange={(e) => patch.pain({ titleHighlight: e.target.value })}
              />
            </Field>
            <Field label="标题后">
              <TextInput
                value={data.pain.titleAfter}
                onChange={(e) => patch.pain({ titleAfter: e.target.value })}
              />
            </Field>
            <Field label="底部安抚文案">
              <TextInput
                value={data.pain.resolveText}
                onChange={(e) => patch.pain({ resolveText: e.target.value })}
              />
            </Field>
          </div>
          <div className="mt-6 space-y-4">
            {data.pain.items.map((item, idx) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2"
              >
                <Field label={`痛点 ${item.id} 标题`}>
                  <TextInput
                    value={item.title}
                    onChange={(e) => {
                      const items = [...data.pain.items];
                      items[idx] = { ...item, title: e.target.value };
                      patch.pain({ items });
                    }}
                  />
                </Field>
                <Field label="描述">
                  <TextArea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const items = [...data.pain.items];
                      items[idx] = { ...item, description: e.target.value };
                      patch.pain({ items });
                    }}
                  />
                </Field>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {tab === "timeline" && (
        <SectionCard title="流量红利时间线">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="小标签">
              <TextInput
                value={data.timeline.badge}
                onChange={(e) => patch.timeline({ badge: e.target.value })}
              />
            </Field>
            <Field label="按钮文字">
              <TextInput
                value={data.timeline.ctaButton}
                onChange={(e) => patch.timeline({ ctaButton: e.target.value })}
              />
            </Field>
            <Field label="标题前">
              <TextInput
                value={data.timeline.titleBefore}
                onChange={(e) => patch.timeline({ titleBefore: e.target.value })}
              />
            </Field>
            <Field label="标题高亮">
              <TextInput
                value={data.timeline.titleHighlight}
                onChange={(e) =>
                  patch.timeline({ titleHighlight: e.target.value })
                }
              />
            </Field>
            <Field label="标题后">
              <TextInput
                value={data.timeline.titleAfter}
                onChange={(e) => patch.timeline({ titleAfter: e.target.value })}
              />
            </Field>
            <Field label="按钮链接">
              <TextInput
                value={data.timeline.ctaHref}
                onChange={(e) => patch.timeline({ ctaHref: e.target.value })}
              />
            </Field>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {data.timeline.items.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 p-4 space-y-3">
                <Field label="年份">
                  <TextInput
                    value={item.year}
                    onChange={(e) => {
                      const items = [...data.timeline.items];
                      items[idx] = { ...item, year: e.target.value };
                      patch.timeline({ items });
                    }}
                  />
                </Field>
                <Field label="标题">
                  <TextInput
                    value={item.title}
                    onChange={(e) => {
                      const items = [...data.timeline.items];
                      items[idx] = { ...item, title: e.target.value };
                      patch.timeline({ items });
                    }}
                  />
                </Field>
                <Field label="副标题">
                  <TextInput
                    value={item.subtitle}
                    onChange={(e) => {
                      const items = [...data.timeline.items];
                      items[idx] = { ...item, subtitle: e.target.value };
                      patch.timeline({ items });
                    }}
                  />
                </Field>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={Boolean(item.current)}
                    onChange={(e) => {
                      const items = data.timeline.items.map((it, i) => ({
                        ...it,
                        current: i === idx ? e.target.checked : false,
                      }));
                      patch.timeline({ items });
                    }}
                  />
                  标记为当前（NOW）
                </label>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {tab === "migration" && (
        <SectionCard title="流量迁移文案">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="AI 提问示例（引号内）">
              <TextInput
                value={data.migration.quotePrompt}
                onChange={(e) =>
                  patch.migration({ quotePrompt: e.target.value })
                }
              />
            </Field>
            <Field label="中间连接句">
              <TextInput
                value={data.migration.titleMiddle}
                onChange={(e) =>
                  patch.migration({ titleMiddle: e.target.value })
                }
              />
            </Field>
            <Field label="正面词（被推荐）">
              <TextInput
                value={data.migration.recommend}
                onChange={(e) => patch.migration({ recommend: e.target.value })}
              />
            </Field>
            <Field label="负面词（完全隐形）">
              <TextInput
                value={data.migration.invisible}
                onChange={(e) => patch.migration({ invisible: e.target.value })}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="说明">
                <TextInput
                  value={data.migration.subtitle}
                  onChange={(e) => patch.migration({ subtitle: e.target.value })}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="平台列表（逗号分隔）">
                <TextInput
                  value={data.migration.platforms.join(",")}
                  onChange={(e) =>
                    patch.migration({
                      platforms: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {data.migration.stats.map((stat, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 p-4 space-y-3">
                <Field label="数值">
                  <TextInput
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...data.migration.stats];
                      stats[idx] = { ...stat, value: e.target.value };
                      patch.migration({ stats });
                    }}
                  />
                </Field>
                <Field label="说明">
                  <TextInput
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...data.migration.stats];
                      stats[idx] = { ...stat, label: e.target.value };
                      patch.migration({ stats });
                    }}
                  />
                </Field>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {tab === "covers" && (
        <SectionCard
          title="GEO 能力卡片"
          desc="首页「GEO不只是关键词排名」六宫格"
          actions={
            <button
              type="button"
              className="admin-btn"
              onClick={() =>
                patch.servicesSection({
                  covers: [
                    ...data.servicesSection.covers,
                    {
                      title: "新能力",
                      description: "一句话说明",
                      features: ["要点1", "要点2"],
                    },
                  ],
                })
              }
            >
              + 新增卡片
            </button>
          }
        >
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <Field label="英文小标题">
              <TextInput
                value={data.servicesSection.badge}
                onChange={(e) =>
                  patch.servicesSection({ badge: e.target.value })
                }
              />
            </Field>
            <Field label="主标题">
              <TextInput
                value={data.servicesSection.title}
                onChange={(e) =>
                  patch.servicesSection({ title: e.target.value })
                }
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="区块说明">
                <TextArea
                  rows={3}
                  value={data.servicesSection.subtitle}
                  onChange={(e) =>
                    patch.servicesSection({ subtitle: e.target.value })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="space-y-4">
            {data.servicesSection.covers.map((cover, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-cyan-300">卡片 {idx + 1}</div>
                  <button
                    type="button"
                    className="text-xs text-red-300"
                    onClick={() =>
                      patch.servicesSection({
                        covers: data.servicesSection.covers.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    删除
                  </button>
                </div>
                <Field label="标题">
                  <TextInput
                    value={cover.title}
                    onChange={(e) => {
                      const covers = [...data.servicesSection.covers];
                      covers[idx] = { ...cover, title: e.target.value };
                      patch.servicesSection({ covers });
                    }}
                  />
                </Field>
                <Field label="描述">
                  <TextArea
                    rows={2}
                    value={cover.description}
                    onChange={(e) => {
                      const covers = [...data.servicesSection.covers];
                      covers[idx] = { ...cover, description: e.target.value };
                      patch.servicesSection({ covers });
                    }}
                  />
                </Field>
                <Field label="要点列表（每行一条）">
                  <TextArea
                    rows={4}
                    value={cover.features.join("\n")}
                    onChange={(e) => {
                      const covers = [...data.servicesSection.covers];
                      covers[idx] = {
                        ...cover,
                        features: e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      };
                      patch.servicesSection({ covers });
                    }}
                  />
                </Field>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {tab === "stats" && (
        <SectionCard title="数据亮点">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="标题前">
              <TextInput
                value={data.stats.titleBefore}
                onChange={(e) => patch.stats({ titleBefore: e.target.value })}
              />
            </Field>
            <Field label="标题高亮">
              <TextInput
                value={data.stats.titleHighlight}
                onChange={(e) => patch.stats({ titleHighlight: e.target.value })}
              />
            </Field>
            <Field label="标题后">
              <TextInput
                value={data.stats.titleAfter}
                onChange={(e) => patch.stats({ titleAfter: e.target.value })}
              />
            </Field>
            <Field label="副标题">
              <TextInput
                value={data.stats.subtitle}
                onChange={(e) => patch.stats({ subtitle: e.target.value })}
              />
            </Field>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {data.stats.items.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 p-4 space-y-3">
                <Field label="数值">
                  <TextInput
                    value={item.value}
                    onChange={(e) => {
                      const items = [...data.stats.items];
                      items[idx] = { ...item, value: e.target.value };
                      patch.stats({ items });
                    }}
                  />
                </Field>
                <Field label="名称">
                  <TextInput
                    value={item.label}
                    onChange={(e) => {
                      const items = [...data.stats.items];
                      items[idx] = { ...item, label: e.target.value };
                      patch.stats({ items });
                    }}
                  />
                </Field>
                <Field label="补充说明">
                  <TextInput
                    value={item.desc}
                    onChange={(e) => {
                      const items = [...data.stats.items];
                      items[idx] = { ...item, desc: e.target.value };
                      patch.stats({ items });
                    }}
                  />
                </Field>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4">
            <Field label="方法论标题">
              <TextInput
                value={data.stats.methodTitle}
                onChange={(e) => patch.stats({ methodTitle: e.target.value })}
              />
            </Field>
            <Field label="方法论说明">
              <TextArea
                rows={3}
                value={data.stats.methodDesc}
                onChange={(e) => patch.stats({ methodDesc: e.target.value })}
              />
            </Field>
            <Field label="标签（逗号分隔）">
              <TextInput
                value={data.stats.methodTags.join(",")}
                onChange={(e) =>
                  patch.stats({
                    methodTags: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
          </div>
        </SectionCard>
      )}

      {tab === "faq" && (
        <SectionCard
          title="FAQ 区块标题"
          desc="具体问答请到左侧菜单「FAQ」里维护"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="标题">
              <TextInput
                value={data.faqSection.title}
                onChange={(e) => patch.faqSection({ title: e.target.value })}
              />
            </Field>
            <Field label="副标题">
              <TextInput
                value={data.faqSection.subtitle}
                onChange={(e) => patch.faqSection({ subtitle: e.target.value })}
              />
            </Field>
          </div>
        </SectionCard>
      )}

      {tab === "cta" && (
        <SectionCard title="底部转化区">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="标题前">
              <TextInput
                value={data.cta.titleBefore}
                onChange={(e) => patch.cta({ titleBefore: e.target.value })}
              />
            </Field>
            <Field label="标题高亮">
              <TextInput
                value={data.cta.titleHighlight}
                onChange={(e) => patch.cta({ titleHighlight: e.target.value })}
              />
            </Field>
            <Field label="标题后">
              <TextInput
                value={data.cta.titleAfter}
                onChange={(e) => patch.cta({ titleAfter: e.target.value })}
              />
            </Field>
            <Field label="电话（可选）">
              <TextInput
                value={data.cta.phone || ""}
                onChange={(e) => patch.cta({ phone: e.target.value })}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="说明">
                <TextArea
                  rows={2}
                  value={data.cta.subtitle}
                  onChange={(e) => patch.cta({ subtitle: e.target.value })}
                />
              </Field>
            </div>
            <Field label="按钮文字">
              <TextInput
                value={data.cta.buttonText}
                onChange={(e) => patch.cta({ buttonText: e.target.value })}
              />
            </Field>
            <Field label="按钮链接">
              <TextInput
                value={data.cta.buttonHref}
                onChange={(e) => patch.cta({ buttonHref: e.target.value })}
              />
            </Field>
          </div>
        </SectionCard>
      )}

      <div className="sticky bottom-4 mt-6 flex gap-3 rounded-2xl border border-white/10 bg-navy-950/90 p-4 backdrop-blur">
        <button type="button" onClick={save} disabled={loading} className="admin-btn">
          {loading ? "保存中..." : "保存全部修改"}
        </button>
        <a href="/" target="_blank" rel="noreferrer" className="admin-btn-ghost">
          打开前台预览
        </a>
      </div>
    </div>
  );
}
