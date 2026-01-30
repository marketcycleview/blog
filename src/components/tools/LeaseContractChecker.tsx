"use client";

import { useState, useMemo } from "react";

interface CheckItem {
  id: string;
  category: string;
  text: string;
  risk: "high" | "medium" | "low";
  description: string;
}

const JEONSE_ITEMS: CheckItem[] = [
  { id: "c1", category: "등기부등본 확인", text: "등기부등본 열람 완료", risk: "high", description: "계약 당일 등기부등본을 반드시 열람하세요. 소유자, 근저당, 가압류 등을 확인합니다." },
  { id: "c2", category: "등기부등본 확인", text: "소유자와 계약 당사자가 동일인", risk: "high", description: "등기부등본의 소유자와 실제 계약 당사자가 일치하는지 확인하세요." },
  { id: "c3", category: "등기부등본 확인", text: "근저당 설정액이 적정 수준", risk: "high", description: "근저당 설정액 + 보증금이 매매가의 70% 이내인지 확인하세요. 초과하면 보증금 반환 위험이 있습니다." },
  { id: "c4", category: "등기부등본 확인", text: "가압류·압류·가처분 없음", risk: "high", description: "을구에 가압류, 압류, 가처분 등이 있으면 보증금 반환이 어려울 수 있습니다." },
  { id: "c5", category: "보증금 안전", text: "보증금이 시세의 70% 이내", risk: "high", description: "전세가율(전세가/매매가)이 70%를 넘으면 깡통전세 위험이 있습니다." },
  { id: "c6", category: "보증금 안전", text: "전세보증보험 가입 가능 확인", risk: "high", description: "HUG, SGI서울보증 등 전세보증보험 가입이 가능한지 사전 확인하세요." },
  { id: "c7", category: "보증금 안전", text: "임대인 세금 체납 여부 확인", risk: "medium", description: "임대인의 국세·지방세 완납증명서를 요청하세요. 세금 체납 시 보증금보다 우선 변제됩니다." },
  { id: "c8", category: "전입신고·확정일자", text: "이사 당일 전입신고 예정", risk: "high", description: "전입신고를 해야 대항력(제3자에게 권리 주장)이 생깁니다. 이사 당일 즉시 하세요." },
  { id: "c9", category: "전입신고·확정일자", text: "확정일자 받을 예정", risk: "high", description: "확정일자를 받아야 우선변제권(경매 시 보증금 우선 회수)이 생깁니다." },
  { id: "c10", category: "계약 조건", text: "계약기간 2년 이상", risk: "medium", description: "주택임대차보호법상 최소 2년 보장됩니다. 2년 미만이어도 2년으로 주장 가능합니다." },
  { id: "c11", category: "계약 조건", text: "특약사항에 수리비 부담 명시", risk: "low", description: "시설 하자 수리, 도배, 장판 등의 비용 부담 주체를 특약에 명시하세요." },
  { id: "c12", category: "계약 조건", text: "특약사항에 보증금 반환 조건 명시", risk: "medium", description: "계약 만료 시 보증금 반환 시기와 방법을 특약에 포함하세요." },
  { id: "c13", category: "현장 확인", text: "실제 거주 상태 현장 확인", risk: "medium", description: "현재 세입자가 있는지, 실제 거주하고 있는지 방문 확인하세요." },
  { id: "c14", category: "현장 확인", text: "건물 하자·누수 확인", risk: "low", description: "벽, 천장, 화장실 등의 누수·하자를 확인하고 사진으로 기록하세요." },
  { id: "c15", category: "현장 확인", text: "주변 시세 조회 완료", risk: "medium", description: "국토교통부 실거래가 공개시스템에서 주변 전세 시세를 확인하세요." },
];

const MONTHLY_EXTRA: CheckItem[] = [
  { id: "m1", category: "월세 추가", text: "월세 계좌이체 증빙 계획", risk: "low", description: "월세는 반드시 계좌이체로 납부하고 기록을 남기세요. 현금 지급은 분쟁 시 증명이 어렵습니다." },
  { id: "m2", category: "월세 추가", text: "월세 세액공제 대상 확인", risk: "low", description: "총급여 8,000만원 이하 무주택 세대주라면 월세 세액공제(최대 17%)를 받을 수 있습니다." },
];

export default function LeaseContractChecker() {
  const [contractType, setContractType] = useState<"jeonse" | "monthly">("jeonse");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = useMemo(() => {
    const base = JEONSE_ITEMS;
    return contractType === "monthly" ? [...base, ...MONTHLY_EXTRA] : base;
  }, [contractType]);

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const categories = useMemo(() => {
    const cats = new Map<string, CheckItem[]>();
    for (const item of items) {
      const list = cats.get(item.category) || [];
      list.push(item);
      cats.set(item.category, list);
    }
    return Array.from(cats.entries());
  }, [items]);

  const totalItems = items.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const uncheckedHigh = items.filter((i) => i.risk === "high" && !checked[i.id]).length;
  const uncheckedMed = items.filter((i) => i.risk === "medium" && !checked[i.id]).length;

  let riskLevel: "safe" | "caution" | "danger";
  let riskLabel: string;
  if (uncheckedHigh >= 3) { riskLevel = "danger"; riskLabel = "위험"; }
  else if (uncheckedHigh >= 1 || uncheckedMed >= 3) { riskLevel = "caution"; riskLabel = "주의"; }
  else { riskLevel = "safe"; riskLabel = "안전"; }

  const riskColors = { safe: "from-green-600 to-green-700", caution: "from-yellow-500 to-yellow-600", danger: "from-red-600 to-red-700" };
  const riskBadge = { high: "bg-red-100 text-red-700", medium: "bg-yellow-100 text-yellow-700", low: "bg-gray-100 text-gray-600" };

  return (
    <div className="space-y-6">
      {/* 계약 유형 선택 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">계약 유형</h2>
        <div className="flex gap-3">
          <button onClick={() => setContractType("jeonse")} className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold ${contractType === "jeonse" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200"}`}>전세</button>
          <button onClick={() => setContractType("monthly")} className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold ${contractType === "monthly" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200"}`}>월세</button>
        </div>
      </div>

      {/* 위험도 점수 */}
      <div className={`bg-gradient-to-r ${riskColors[riskLevel]} rounded-xl p-6 text-white text-center`}>
        <p className="text-sm opacity-80 mb-1">계약 안전도</p>
        <p className="text-3xl font-bold">{riskLabel}</p>
        <p className="text-sm mt-2 opacity-90">{checkedCount}/{totalItems}개 확인 완료 | 미확인 위험 {uncheckedHigh}개, 주의 {uncheckedMed}개</p>
        <div className="w-full bg-white/20 rounded-full h-3 mt-3">
          <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${Math.round((checkedCount / totalItems) * 100)}%` }} />
        </div>
      </div>

      {/* 체크리스트 */}
      {categories.map(([category, categoryItems]) => (
        <div key={category} className="bg-white border rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="font-bold text-gray-900">{category}</h3>
          </div>
          <div className="divide-y">
            {categoryItems.map((item) => (
              <div key={item.id} className={`p-4 ${checked[item.id] ? "bg-green-50" : ""}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => toggle(item.id)}
                    className={`mt-0.5 w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center text-sm ${checked[item.id] ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}>
                    {checked[item.id] && "✓"}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`${checked[item.id] ? "line-through text-gray-400" : "text-gray-900"} font-medium`}>{item.text}</span>
                      <span className={`px-1.5 py-0.5 text-xs font-bold rounded ${riskBadge[item.risk]}`}>
                        {item.risk === "high" ? "필수" : item.risk === "medium" ? "권장" : "참고"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 참고 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-1">주의사항</p>
        <ul className="list-disc list-inside space-y-1">
          <li>이 체크리스트는 일반적인 참고 자료이며, 법률 자문을 대체하지 않습니다.</li>
          <li>전세사기 의심 시 전세피해지원센터(1533-8119)에 상담하세요.</li>
          <li>등기부등본은 인터넷등기소(iros.go.kr)에서 열람 가능합니다.</li>
        </ul>
      </div>
    </div>
  );
}
