"use client";

import { useState } from "react";
import { StatusBanner } from "@/components/admin/SaveButton";
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
} from "@/components/admin/FormFields";
import type { ContactPageData } from "@/lib/types";

export function ContactFormEditor({ initial }: { initial: ContactPageData }) {
  const [data, setData] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/admin/pages/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "联系我们", data }),
    });
    setLoading(false);
    if (!res.ok) {
      setError(true);
      setMessage("保存失败");
      return;
    }
    setError(false);
    setMessage("联系页已保存");
  }

  return (
    <div className="space-y-4">
      <StatusBanner message={message} error={error} />
      <SectionCard title="联系页文案" desc="电话/邮箱等联系方式请到「站点设置」修改">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="页面标题">
            <TextInput
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </Field>
          <Field label="页面副标题">
            <TextInput
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            />
          </Field>
          <Field label="表单标题">
            <TextInput
              value={data.formTitle}
              onChange={(e) => setData({ ...data, formTitle: e.target.value })}
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="提交成功提示">
              <TextArea
                rows={2}
                value={data.successMessage}
                onChange={(e) =>
                  setData({ ...data, successMessage: e.target.value })
                }
              />
            </Field>
          </div>
        </div>
      </SectionCard>
      <button type="button" onClick={save} disabled={loading} className="admin-btn">
        {loading ? "保存中..." : "保存联系页"}
      </button>
    </div>
  );
}
