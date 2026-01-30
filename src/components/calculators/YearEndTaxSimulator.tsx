"use client";

import { useState, useMemo } from "react";
import { calculateYearEndTax, type YearEndTaxInput, type YearEndTaxResult } from "@/lib/calculators/year-end-tax";

function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

function MoneyInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw) {
      onChange(parseInt(raw, 10).toLocaleString("ko-KR"));
    } else {
      onChange("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder={placeholder || "0"}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">원</span>
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b pb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-2"
      >
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <span className="text-gray-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="space-y-3 mt-2">{children}</div>}
    </div>
  );
}

function parseNum(v: string): number {
  return parseInt(v.replace(/[^0-9]/g, ""), 10) || 0;
}

export default function YearEndTaxSimulator() {
  // 기본 정보
  const [salary, setSalary] = useState("50,000,000");
  const [dependents, setDependents] = useState(1);
  const [children, setChildren] = useState(0);
  const [hasSpouse, setHasSpouse] = useState(false);

  // 소득공제
  const [nationalPension, setNationalPension] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [employmentInsurance, setEmploymentInsurance] = useState("");
  const [housingSubscription, setHousingSubscription] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [debitCard, setDebitCard] = useState("");
  const [traditionalMarket, setTraditionalMarket] = useState("");

  // 세액공제
  const [medical, setMedical] = useState("");
  const [education, setEducation] = useState("");
  const [donation, setDonation] = useState("");
  const [rent, setRent] = useState("");
  const [pensionSavings, setPensionSavings] = useState("");
  const [irp, setIrp] = useState("");
  const [insurancePremium, setInsurancePremium] = useState("");

  const result = useMemo<YearEndTaxResult | null>(() => {
    const totalSalary = parseNum(salary);
    if (totalSalary <= 0) return null;

    const input: YearEndTaxInput = {
      totalSalary,
      dependents,
      childrenUnder20: children,
      hasSpouse,
      nationalPension: parseNum(nationalPension),
      healthInsurance: parseNum(healthInsurance),
      employmentInsurance: parseNum(employmentInsurance),
      housingSubscription: parseNum(housingSubscription),
      creditCard: parseNum(creditCard),
      debitCard: parseNum(debitCard),
      traditionalMarket: parseNum(traditionalMarket),
      medicalExpense: parseNum(medical),
      educationExpense: parseNum(education),
      donation: parseNum(donation),
      monthlyRent: parseNum(rent),
      pensionSavings: parseNum(pensionSavings),
      irp: parseNum(irp),
      insurancePremium: parseNum(insurancePremium),
    };

    return calculateYearEndTax(input);
  }, [
    salary, dependents, children, hasSpouse,
    nationalPension, healthInsurance, employmentInsurance,
    housingSubscription, creditCard, debitCard, traditionalMarket,
    medical, education, donation, rent, pensionSavings, irp, insurancePremium,
  ]);

  // 4대보험 자동 계산 버튼
  const autoCalcInsurance = () => {
    const s = parseNum(salary);
    const monthly = s / 12;
    setNationalPension(formatNumber(Math.floor(monthly * 0.045) * 12));
    setHealthInsurance(formatNumber(Math.floor(monthly * 0.03545 * 1.1295) * 12)); // 건강+장기요양
    setEmploymentInsurance(formatNumber(Math.floor(monthly * 0.009) * 12));
  };

  return (
    <div className="space-y-6">
      {/* 입력 섹션 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">연말정산 정보 입력</h2>

        <Section title="기본 정보" defaultOpen={true}>
          <MoneyInput label="총급여 (연봉)" value={salary} onChange={setSalary} placeholder="50,000,000" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부양가족 수 (본인 포함)</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setDependents(n)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                      dependents === n ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {n}명
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">20세 이하 자녀</label>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setChildren(n)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                      children === n ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {n}명
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="spouse"
              checked={hasSpouse}
              onChange={(e) => setHasSpouse(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <label htmlFor="spouse" className="text-sm text-gray-700">배우자 있음</label>
          </div>
        </Section>

        <Section title="소득공제 - 4대보험료" defaultOpen={false}>
          <button
            onClick={autoCalcInsurance}
            className="w-full py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
          >
            총급여 기준 자동 계산
          </button>
          <MoneyInput label="국민연금 납입액 (연간)" value={nationalPension} onChange={setNationalPension} />
          <MoneyInput label="건강보험료 + 장기요양 (연간)" value={healthInsurance} onChange={setHealthInsurance} />
          <MoneyInput label="고용보험료 (연간)" value={employmentInsurance} onChange={setEmploymentInsurance} />
        </Section>

        <Section title="소득공제 - 카드/청약" defaultOpen={false}>
          <MoneyInput label="신용카드 사용액 (연간)" value={creditCard} onChange={setCreditCard} hint="공제율 15%" />
          <MoneyInput label="체크카드/현금영수증 (연간)" value={debitCard} onChange={setDebitCard} hint="공제율 30%" />
          <MoneyInput label="전통시장/대중교통 (연간)" value={traditionalMarket} onChange={setTraditionalMarket} hint="공제율 40%" />
          <MoneyInput label="주택청약 납입액 (연간)" value={housingSubscription} onChange={setHousingSubscription} hint="한도 240만원" />
        </Section>

        <Section title="세액공제 - 연금/보험" defaultOpen={false}>
          <MoneyInput label="연금저축 납입액 (연간)" value={pensionSavings} onChange={setPensionSavings} hint="한도 600만원" />
          <MoneyInput label="IRP 납입액 (연간)" value={irp} onChange={setIrp} hint="연금저축+IRP 합산 900만원 한도" />
          <MoneyInput label="보장성 보험료 (연간)" value={insurancePremium} onChange={setInsurancePremium} hint="한도 100만원, 공제율 12%" />
        </Section>

        <Section title="세액공제 - 의료/교육/기부/월세" defaultOpen={false}>
          <MoneyInput label="의료비 지출 (연간)" value={medical} onChange={setMedical} hint="총급여 3% 초과분의 15%" />
          <MoneyInput label="교육비 지출 (연간)" value={education} onChange={setEducation} hint="공제율 15%" />
          <MoneyInput label="기부금 (연간)" value={donation} onChange={setDonation} hint="1000만원 이하 15%, 초과 30%" />
          <MoneyInput label="월세 지급액 (연간 합계)" value={rent} onChange={setRent} hint="총급여 7천만원 이하, 무주택 세대주" />
        </Section>
      </div>

      {/* 결과 */}
      {result && (
        <>
          {/* 핵심 결과 */}
          <div className={`rounded-xl p-6 text-white ${
            result.refundAmount >= 0
              ? "bg-gradient-to-r from-blue-600 to-blue-700"
              : "bg-gradient-to-r from-red-500 to-red-600"
          }`}>
            <div className="text-center">
              <p className="text-white/80 mb-1">
                {result.refundAmount >= 0 ? "예상 환급액" : "예상 추가납부액"}
              </p>
              <p className="text-4xl font-bold mb-2">
                {result.refundAmount >= 0 ? "+" : ""}{formatNumber(result.refundAmount)}원
              </p>
              <p className="text-white/70 text-sm">
                결정세액 {formatNumber(result.totalDetermined)}원 - 기납부세액 {formatNumber(result.withheldTax)}원
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/30 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white/70 text-xs">적용 세율</p>
                <p className="text-lg font-bold">{result.taxBracketRate}</p>
              </div>
              <div>
                <p className="text-white/70 text-xs">소득공제 합계</p>
                <p className="text-lg font-bold">{formatNumber(result.totalIncomeDeduction)}원</p>
              </div>
              <div>
                <p className="text-white/70 text-xs">세액공제 합계</p>
                <p className="text-lg font-bold">{formatNumber(result.totalTaxCredit)}원</p>
              </div>
            </div>
          </div>

          {/* 상세 내역 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">계산 상세 내역</h3>

            {/* 소득 */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">소득 계산</h4>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">총급여</span>
                  <span className="font-medium">{formatNumber(result.totalSalary)}원</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">근로소득공제</span>
                  <span className="font-medium text-red-500">-{formatNumber(result.earnedIncomeDeduction)}원</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-blue-600">
                  <span>근로소득금액</span>
                  <span>{formatNumber(result.earnedIncome)}원</span>
                </div>
              </div>
            </div>

            {/* 소득공제 */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">소득공제</h4>
              <div className="space-y-2">
                {result.personalDeduction > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">인적공제</span>
                    <span className="text-sm">{formatNumber(result.personalDeduction)}원</span>
                  </div>
                )}
                {result.pensionDeduction > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">국민연금</span>
                    <span className="text-sm">{formatNumber(result.pensionDeduction)}원</span>
                  </div>
                )}
                {result.insuranceDeduction > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">건강/고용보험</span>
                    <span className="text-sm">{formatNumber(result.insuranceDeduction)}원</span>
                  </div>
                )}
                {result.housingDeduction > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">주택청약</span>
                    <span className="text-sm">{formatNumber(result.housingDeduction)}원</span>
                  </div>
                )}
                {result.cardDeduction > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">신용카드 등</span>
                    <span className="text-sm">{formatNumber(result.cardDeduction)}원</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t font-bold text-blue-600">
                  <span>소득공제 합계</span>
                  <span>-{formatNumber(result.totalIncomeDeduction)}원</span>
                </div>
              </div>
            </div>

            {/* 과세표준 → 산출세액 */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">과세표준 & 산출세액</h4>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">과세표준</span>
                  <span className="font-medium">{formatNumber(result.taxableIncome)}원</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">적용 세율</span>
                  <span className="font-medium">{result.taxBracketRate}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-red-600">
                  <span>산출세액</span>
                  <span>{formatNumber(result.calculatedTax)}원</span>
                </div>
              </div>
            </div>

            {/* 세액공제 */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">세액공제</h4>
              <div className="space-y-2">
                {result.workTaxCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">근로소득세액공제</span>
                    <span className="text-sm">{formatNumber(result.workTaxCredit)}원</span>
                  </div>
                )}
                {result.childTaxCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">자녀세액공제</span>
                    <span className="text-sm">{formatNumber(result.childTaxCredit)}원</span>
                  </div>
                )}
                {result.pensionSavingsCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">연금저축</span>
                    <span className="text-sm">{formatNumber(result.pensionSavingsCredit)}원</span>
                  </div>
                )}
                {result.irpCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">IRP</span>
                    <span className="text-sm">{formatNumber(result.irpCredit)}원</span>
                  </div>
                )}
                {result.insurancePremiumCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">보장성보험료</span>
                    <span className="text-sm">{formatNumber(result.insurancePremiumCredit)}원</span>
                  </div>
                )}
                {result.medicalCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">의료비</span>
                    <span className="text-sm">{formatNumber(result.medicalCredit)}원</span>
                  </div>
                )}
                {result.educationCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">교육비</span>
                    <span className="text-sm">{formatNumber(result.educationCredit)}원</span>
                  </div>
                )}
                {result.donationCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">기부금</span>
                    <span className="text-sm">{formatNumber(result.donationCredit)}원</span>
                  </div>
                )}
                {result.monthlyRentCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">월세</span>
                    <span className="text-sm">{formatNumber(result.monthlyRentCredit)}원</span>
                  </div>
                )}
                {result.standardTaxCredit > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 text-sm">표준세액공제</span>
                    <span className="text-sm">{formatNumber(result.standardTaxCredit)}원</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t font-bold text-green-600">
                  <span>세액공제 합계</span>
                  <span>-{formatNumber(result.totalTaxCredit)}원</span>
                </div>
              </div>
            </div>

            {/* 최종 */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">결정세액 (소득세+지방소득세)</span>
                <span className="font-bold">{formatNumber(result.totalDetermined)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">기납부세액 (원천징수 추정)</span>
                <span className="font-bold">{formatNumber(result.withheldTax)}원</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-lg font-bold">{result.refundAmount >= 0 ? "환급 예상액" : "추가납부 예상액"}</span>
                <span className={`text-xl font-bold ${result.refundAmount >= 0 ? "text-blue-600" : "text-red-600"}`}>
                  {result.refundAmount >= 0 ? "+" : ""}{formatNumber(result.refundAmount)}원
                </span>
              </div>
            </div>
          </div>

          {/* 추가 공제 추천 */}
          {result.suggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="font-bold text-blue-900 mb-2">추가 절세 팁</p>
              <ul className="space-y-1 text-sm text-blue-800">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* 참고사항 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">참고사항</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>2026년 기준 세율 및 공제 한도로 계산됩니다.</li>
          <li>기납부세액은 간이세액표 기준 추정치입니다.</li>
          <li>비과세 소득(식대 등)은 반영되지 않았습니다.</li>
          <li>정확한 금액은 국세청 홈택스에서 확인하세요.</li>
        </ul>
      </div>
    </div>
  );
}
