import type { Metadata } from "next";
import InflationCalculator from "@/components/calculators/InflationCalculator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "물가 상승률 체감 계산기 - 과거 돈의 현재 가치 2026",
  description:
    "과거 금액이 현재 얼마의 가치인지 계산합니다. 1990년부터 2026년까지 실제 소비자물가 기반.",
  keywords: [
    "물가 상승률 계산기",
    "돈의 가치 변화",
    "물가상승 체감",
    "인플레이션 계산기",
  ],
  openGraph: {
    title: "물가 상승률 체감 계산기 2026",
    description:
      "과거 돈의 현재 가치를 실제 소비자물가 기반으로 계산하세요.",
    url: `${siteUrl}/ko/tools/inflation-calculator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function InflationCalculatorPage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "물가 상승률 체감 계산기"
            : "Inflation Calculator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "과거의 돈이 현재 얼마의 가치인지, 실제 소비자물가지수 기반으로 계산합니다."
            : "Calculate the current value of past money based on actual consumer price index data."}
        </p>
      </div>

      <InflationCalculator />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>한국 물가상승률 추이</h2>
        <p>
          한국의 소비자물가지수(CPI)는 통계청이 매월 발표하며, 460여 개
          품목의 가격 변동을 종합적으로 반영합니다. IMF 외환위기(1998년)와
          코로나 이후(2022년)에 물가가 크게 요동쳤습니다. 아래 표에서 주요
          연도별 물가상승률을 확인할 수 있습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>연도</th>
              <th>물가상승률</th>
              <th>주요 배경</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1998년</td>
              <td>7.5%</td>
              <td>IMF 외환위기, 환율 급등</td>
            </tr>
            <tr>
              <td>2000년</td>
              <td>2.3%</td>
              <td>외환위기 이후 안정화</td>
            </tr>
            <tr>
              <td>2008년</td>
              <td>4.7%</td>
              <td>글로벌 금융위기, 원자재 가격 급등</td>
            </tr>
            <tr>
              <td>2015년</td>
              <td>0.7%</td>
              <td>저유가, 저물가 시대</td>
            </tr>
            <tr>
              <td>2020년</td>
              <td>0.5%</td>
              <td>코로나19 소비 위축</td>
            </tr>
            <tr>
              <td>2022년</td>
              <td>5.1%</td>
              <td>러시아-우크라이나 전쟁, 공급망 위기</td>
            </tr>
            <tr>
              <td>2023년</td>
              <td>3.6%</td>
              <td>고금리 지속, 물가 점진적 안정</td>
            </tr>
            <tr>
              <td>2024년</td>
              <td>2.3%</td>
              <td>금리 인하 시작, 물가 안정세</td>
            </tr>
            <tr>
              <td>2025년</td>
              <td>1.9%</td>
              <td>한국은행 물가 안정 목표(2%) 근접</td>
            </tr>
          </tbody>
        </table>

        <h2>물가상승이 의미하는 것</h2>
        <p>
          물가상승(인플레이션)은 같은 금액으로 살 수 있는 물건이 줄어든다는
          뜻입니다. 연평균 3%의 물가상승률이면 24년 후 돈의 가치는 절반으로
          줄어듭니다. 이것을 &quot;72의 법칙&quot;이라 합니다.
        </p>
        <p>
          예를 들어 2000년에 100만원이었던 것이 2026년 현재 약 165만원의
          가치입니다. 반대로 말하면, 2000년의 100만원은 현재 약 61만원의
          구매력만 갖고 있다는 의미입니다. 은행 예금 금리가 물가상승률보다
          낮다면 돈을 은행에 넣어둬도 실질적으로 손해를 보는 셈입니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>과거 연도</th>
              <th>100만원의 2026년 가치</th>
              <th>구매력 감소율</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1990년</td>
              <td>약 270만원</td>
              <td>63% 감소</td>
            </tr>
            <tr>
              <td>2000년</td>
              <td>약 165만원</td>
              <td>39% 감소</td>
            </tr>
            <tr>
              <td>2010년</td>
              <td>약 130만원</td>
              <td>23% 감소</td>
            </tr>
            <tr>
              <td>2020년</td>
              <td>약 115만원</td>
              <td>13% 감소</td>
            </tr>
          </tbody>
        </table>

        <h2>물가상승에 대응하는 재테크 전략</h2>
        <p>
          인플레이션 시대에 현금을 그대로 보유하면 가치가 지속적으로
          하락합니다. 물가상승률 이상의 수익을 내는 자산에 투자해야
          실질 자산을 보전할 수 있습니다.
        </p>
        <ul>
          <li>
            <strong>물가연동국채(TIPS):</strong> 물가상승률만큼 원금이
            조정되어 실질 수익을 보장하는 채권입니다. 안전 자산을
            선호한다면 가장 확실한 인플레이션 헷지 수단입니다.
          </li>
          <li>
            <strong>부동산:</strong> 장기적으로 물가와 함께 가격이
            상승하는 실물 자산입니다. 다만 유동성이 낮고 초기 자본이
            크다는 단점이 있습니다.
          </li>
          <li>
            <strong>주식(배당주):</strong> 물가상승 시 기업의 매출과
            이익도 함께 증가하므로 장기 보유 시 인플레이션 방어가
            가능합니다. 배당 성장주가 특히 유리합니다.
          </li>
          <li>
            <strong>적금·예금 재투자:</strong> 최소한 물가상승률 이상의
            금리를 제공하는 상품에 가입해야 실질 손해를 방지합니다.
          </li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h3>Q. 소비자물가지수(CPI)는 어떻게 계산되나요?</h3>
        <p>
          통계청이 460여 개 대표 품목의 가격을 매월 조사하여 기준연도
          (현재 2020년=100) 대비 변동률로 산출합니다. 식료품, 주거비,
          교통비, 교육비 등 가중치를 반영하므로 개인의 체감 물가와 차이가
          날 수 있습니다. 외식을 자주 하는 사람은 체감 물가가 공식 CPI보다
          높을 수 있고, 자가 거주자는 주거비 영향을 덜 받습니다.
        </p>

        <h3>Q. 체감 물가가 공식 물가보다 높게 느껴지는 이유는?</h3>
        <p>
          사람은 자주 구매하는 품목(식료품, 외식, 교통비)의 가격 변동에
          민감합니다. 이런 생활밀접 품목의 상승률이 전체 CPI보다 높은
          경우가 많아 체감 물가가 높게 느껴집니다. 통계청에서는 이를
          반영한 &quot;생활물가지수&quot;를 별도로 발표하며, 이 지수가
          일반 CPI보다 1~2%p 높은 경우가 빈번합니다.
        </p>

        <h3>Q. 디플레이션(물가하락)은 좋은 것 아닌가요?</h3>
        <p>
          소비자 입장에서는 물건이 싸지는 것처럼 보이지만, 경제 전체로는
          위험 신호입니다. 물가가 하락하면 기업 매출이 줄고, 고용이
          감소하며, 소비가 더 위축되는 악순환(디플레이션 스파이럴)에
          빠질 수 있습니다. 일본이 1990년대부터 약 30년간 겪은
          &quot;잃어버린 30년&quot;이 대표적인 사례입니다.
        </p>
      </div>
    </div>
  );
}
