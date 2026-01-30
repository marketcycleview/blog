"use client";

import { useState, useCallback } from "react";
import { legalNoticeTemplate, getDetailStep } from "@/lib/tools/document-generator/templates/legal-notice";
import type { FormField, FormStep, GeneratedDocument } from "@/lib/tools/document-generator/types";

// ─── 스텝 인디케이터 ───
function StepIndicator({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-6">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i < currentStep
                ? "bg-green-500 text-white"
                : i === currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {i < currentStep ? "✓" : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-0.5 ${i < currentStep ? "bg-green-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── 폼 필드 렌더러 ───
function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (id: string, val: string) => void;
}) {
  const base = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  if (field.type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={base}
        >
          <option value="">선택하세요</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={`${base} min-h-[120px]`}
          placeholder={field.placeholder}
          rows={5}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={field.type === "date" ? "date" : "text"}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={base}
          placeholder={field.placeholder}
        />
        {field.suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            {field.suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── 문서 미리보기 ───
function DocumentPreview({ document }: { document: GeneratedDocument }) {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl p-6 sm:p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap">
      {document.content}
    </div>
  );
}

// ─── 액션 버튼 (복사/다운로드) ───
function DocumentActions({ document }: { document: GeneratedDocument }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(document.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = window.document.createElement("textarea");
      textarea.value = document.content;
      window.document.body.appendChild(textarea);
      textarea.select();
      window.document.execCommand("copy");
      window.document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [document.content]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([document.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `내용증명_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [document.content]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html><head><title>내용증명</title>
        <style>
          body { font-family: 'Malgun Gothic', sans-serif; padding: 40px; white-space: pre-wrap; line-height: 1.8; font-size: 14px; }
        </style></head>
        <body>${document.content}</body></html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }, [document.content]);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopy}
        className="flex-1 min-w-[140px] px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
      >
        {copied ? "복사 완료!" : "텍스트 복사"}
      </button>
      <button
        onClick={handleDownload}
        className="flex-1 min-w-[140px] px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
      >
        .txt 다운로드
      </button>
      <button
        onClick={handlePrint}
        className="flex-1 min-w-[140px] px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
      >
        인쇄하기
      </button>
    </div>
  );
}

// ─── 메인 컴포넌트 ───
export default function LegalNoticeGenerator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState<GeneratedDocument | null>(null);

  // 스텝 목록 동적 구성: [유형선택, 당사자정보, 상세입력, 미리보기]
  const noticeType = formData.noticeType || "";
  const detailStep = noticeType ? getDetailStep(noticeType) : null;

  const allSteps: FormStep[] = [
    legalNoticeTemplate.steps[0], // 유형 선택
    legalNoticeTemplate.steps[1], // 당사자 정보
    ...(detailStep ? [detailStep] : []),
  ];

  const stepLabels = [
    "유형",
    "당사자",
    ...(detailStep ? ["상세"] : []),
    "완료",
  ];

  const totalSteps = allSteps.length + 1; // +1 for 미리보기/완료

  const handleFieldChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isCurrentStepValid = (): boolean => {
    if (currentStep >= allSteps.length) return true; // 미리보기 단계
    const step = allSteps[currentStep];
    return step.fields.every((field) => {
      if (!field.required) return true;
      return (formData[field.id] || "").trim() !== "";
    });
  };

  const handleNext = () => {
    if (currentStep < allSteps.length) {
      // 마지막 입력 스텝에서 다음 누르면 문서 생성
      if (currentStep === allSteps.length - 1) {
        const doc = legalNoticeTemplate.generate(formData);
        setGenerated(doc);
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      if (generated) setGenerated(null);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFormData({});
    setGenerated(null);
  };

  const isPreviewStep = currentStep >= allSteps.length;

  return (
    <div className="space-y-6">
      {/* 스텝 인디케이터 */}
      <StepIndicator steps={stepLabels} currentStep={currentStep} />

      {/* 폼 또는 미리보기 */}
      {!isPreviewStep ? (
        <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            {allSteps[currentStep].title}
          </h2>
          {allSteps[currentStep].description && (
            <p className="text-sm text-gray-500">{allSteps[currentStep].description}</p>
          )}

          <div className="space-y-4">
            {allSteps[currentStep].fields.map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                value={formData[field.id] || ""}
                onChange={handleFieldChange}
              />
            ))}
          </div>

          {/* 네비게이션 */}
          <div className="flex gap-3 pt-4">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className={`flex-1 px-6 py-3 font-bold rounded-lg transition-colors ${
                isCurrentStepValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentStep === allSteps.length - 1 ? "내용증명 생성" : "다음"}
            </button>
          </div>
        </div>
      ) : (
        /* 미리보기 + 액션 */
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-800 font-bold text-lg">내용증명이 생성되었습니다</p>
            <p className="text-green-600 text-sm mt-1">아래 내용을 확인하고 복사 또는 다운로드하세요.</p>
          </div>

          {generated && (
            <>
              <DocumentPreview document={generated} />
              <DocumentActions document={generated} />
            </>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              수정하기
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              처음부터 다시
            </button>
          </div>
        </div>
      )}

      {/* 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">참고사항</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>내용증명은 법적 효력이 있는 문서가 아닌, 의사 전달을 증명하는 수단입니다.</li>
          <li>작성 후 우체국에서 내용증명 우편으로 발송해야 효력이 있습니다.</li>
          <li>인터넷우체국(epost.go.kr)에서도 온라인 발송이 가능합니다.</li>
          <li>중요한 법적 분쟁은 반드시 변호사 상담을 받으시기 바랍니다.</li>
        </ul>
      </div>
    </div>
  );
}
