"use client";

import { useState, useCallback } from "react";
import { businessPlanTemplate } from "@/lib/tools/document-generator/templates/business-plan";
import type { FormField, GeneratedDocument } from "@/lib/tools/document-generator/types";

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-6">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i < current ? "bg-green-500 text-white" : i === current ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"}`}>{i < current ? "✓" : i + 1}</div>
          {i < steps.length - 1 && <div className={`w-6 h-0.5 ${i < current ? "bg-green-500" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );
}

function FieldRenderer({ field, value, onChange }: { field: FormField; value: string; onChange: (id: string, v: string) => void }) {
  const base = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500";
  if (field.type === "select") return (<div><label className="block text-sm font-medium text-gray-700 mb-2">{field.label} {field.required && <span className="text-red-500">*</span>}</label><select value={value} onChange={(e) => onChange(field.id, e.target.value)} className={base}><option value="">선택하세요</option>{field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>);
  if (field.type === "textarea") return (<div><label className="block text-sm font-medium text-gray-700 mb-2">{field.label} {field.required && <span className="text-red-500">*</span>}</label><textarea value={value} onChange={(e) => onChange(field.id, e.target.value)} className={`${base} min-h-[80px]`} placeholder={field.placeholder} rows={3} /></div>);
  return (<div><label className="block text-sm font-medium text-gray-700 mb-2">{field.label} {field.required && <span className="text-red-500">*</span>}</label><input type={field.type === "date" ? "date" : "text"} value={value} onChange={(e) => onChange(field.id, e.target.value)} className={base} placeholder={field.placeholder} /></div>);
}

export default function BusinessPlanGenerator() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [doc, setDoc] = useState<GeneratedDocument | null>(null);
  const [copied, setCopied] = useState(false);

  const template = businessPlanTemplate;
  const steps = template.steps;
  const labels = [...steps.map((s) => s.title), "완료"];
  const isPreview = step >= steps.length;

  const handleChange = (id: string, v: string) => setData((p) => ({ ...p, [id]: v }));
  const isValid = () => { if (step >= steps.length) return true; return steps[step].fields.every((f) => !f.required || (data[f.id] || "").trim()); };

  const handleNext = () => {
    if (step === steps.length - 1) setDoc(template.generate(data));
    setStep((p) => p + 1);
  };

  const handleCopy = useCallback(async () => {
    if (!doc) return;
    try { await navigator.clipboard.writeText(doc.content); } catch { const t = document.createElement("textarea"); t.value = doc.content; document.body.appendChild(t); t.select(); document.execCommand("copy"); document.body.removeChild(t); }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [doc]);

  const handleDownload = useCallback(() => {
    if (!doc) return;
    const blob = new Blob([doc.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `사업계획서_${data.businessName || "미정"}_${new Date().toISOString().slice(0, 10)}.txt`; a.click(); URL.revokeObjectURL(url);
  }, [doc, data.businessName]);

  return (
    <div className="space-y-6">
      <StepIndicator steps={labels} current={step} />
      {!isPreview ? (
        <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">{steps[step].title}</h2>
          {steps[step].description && <p className="text-sm text-gray-500">{steps[step].description}</p>}
          <div className="space-y-4">{steps[step].fields.map((f) => <FieldRenderer key={f.id} field={f} value={data[f.id] || ""} onChange={handleChange} />)}</div>
          <div className="flex gap-3 pt-4">
            {step > 0 && <button onClick={() => setStep((p) => p - 1)} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">이전</button>}
            <button onClick={handleNext} disabled={!isValid()} className={`flex-1 px-6 py-3 font-bold rounded-lg ${isValid() ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>{step === steps.length - 1 ? "사업계획서 생성" : "다음"}</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center"><p className="text-amber-800 font-bold text-lg">사업계획서가 생성되었습니다</p></div>
          {doc && <div className="bg-white border-2 border-gray-300 rounded-xl p-6 sm:p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto">{doc.content}</div>}
          <div className="flex flex-wrap gap-3">
            <button onClick={handleCopy} className="flex-1 min-w-[140px] px-6 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700">{copied ? "복사 완료!" : "텍스트 복사"}</button>
            <button onClick={handleDownload} className="flex-1 min-w-[140px] px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900">.txt 다운로드</button>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setStep(steps.length - 1); setDoc(null); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">수정</button>
            <button onClick={() => { setStep(0); setData({}); setDoc(null); }} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50">처음부터</button>
          </div>
        </div>
      )}
    </div>
  );
}
