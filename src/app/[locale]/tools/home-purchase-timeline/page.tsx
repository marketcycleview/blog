import type { Metadata } from "next";
import HomePurchaseTimeline from "@/components/tools/comparator/HomePurchaseTimeline";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "내 집 마련 타임라인 - 자금 축적 시뮬레이션 2026",
  description:
    "현재 자금과 월 저축액으로 내 집 마련까지 얼마나 걸리는지 시뮬레이션합니다. 대출 포함 목표 달성 시점을 확인하세요.",
  keywords: [
    "내집마련 계획",
    "주택 구입 자금",
    "내집마련 얼마 필요",
    "주택 대출 계산",
  ],
  openGraph: {
    title: "내 집 마련 타임라인 2026",
    description:
      "현재 자금과 월 저축액으로 내 집 마련까지 걸리는 시간을 계산하세요.",
    url: `${siteUrl}/ko/tools/home-purchase-timeline`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePurchaseTimelinePage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "내 집 마련 타임라인"
            : "Home Purchase Timeline"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "현재 자금, 월 저축액, 대출 가능 금액으로 내 집 마련 시점을 시뮬레이션하세요."
            : "Simulate when you can afford your home based on savings and loan capacity."}
        </p>
      </div>

      <HomePurchaseTimeline />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>내 집 마련 자금 구성</h2>
        <p>
          주택을 구입할 때는 매매가 전체를 현금으로 준비할 필요가 없습니다.
          자기자본(종잣돈)과 주택담보대출을 합산하여 매매가를 충당하는 것이
          일반적입니다. 여기에 취득세, 중개수수료, 이사비 등 부대비용도
          반드시 고려해야 합니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>자금 구성</th>
              <th>일반적 비율</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>자기자본 (종잣돈)</td>
              <td>30~40%</td>
              <td>저축, 전세보증금, 가족 지원 등</td>
            </tr>
            <tr>
              <td>주택담보대출</td>
              <td>50~70%</td>
              <td>LTV 규제에 따라 최대 한도 결정</td>
            </tr>
            <tr>
              <td>부대비용</td>
              <td>매매가의 3~5%</td>
              <td>취득세, 중개수수료, 이사비, 인테리어</td>
            </tr>
          </tbody>
        </table>

        <h2>주요 주택담보대출 상품 비교</h2>
        <p>
          2026년 현재 주요 주택담보대출 상품의 금리와 조건을 비교해보면
          다음과 같습니다. 정책 대출(디딤돌, 보금자리론)은 시중은행 대출
          대비 금리가 낮지만 소득·자산 요건이 있습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>대상</th>
              <th>금리(연)</th>
              <th>최대 한도</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>디딤돌대출</td>
              <td>무주택 서민·실수요자</td>
              <td>2.35~3.65%</td>
              <td>최대 4억원</td>
            </tr>
            <tr>
              <td>보금자리론</td>
              <td>무주택자 또는 1주택 처분 조건</td>
              <td>3.25~3.95%</td>
              <td>최대 5억원</td>
            </tr>
            <tr>
              <td>시중은행 주담대</td>
              <td>제한 없음</td>
              <td>3.5~5.5%</td>
              <td>LTV 한도 내</td>
            </tr>
            <tr>
              <td>특례보금자리론</td>
              <td>무주택 실수요자 (한시)</td>
              <td>3.0~3.6%</td>
              <td>최대 5억원</td>
            </tr>
          </tbody>
        </table>

        <h2>내 집 마련 단계별 로드맵</h2>
        <p>
          내 집 마련까지는 보통 5~10년의 장기 계획이 필요합니다. 무리한
          영끌보다는 현실적인 저축 계획과 대출 상환 능력을 고려한 단계별
          접근이 중요합니다.
        </p>
        <ul>
          <li>
            <strong>1단계 (1~2년차):</strong> 종잣돈 마련 시작. 청약통장
            가입, 월 고정 저축 습관 만들기. 청년도약계좌, ISA 등 세제혜택
            상품 활용.
          </li>
          <li>
            <strong>2단계 (3~5년차):</strong> 목표 지역 시세 조사, DSR
            시뮬레이션. 신용점수 관리, 부채 최소화. 청약 가점 관리 시작.
          </li>
          <li>
            <strong>3단계 (5~7년차):</strong> 구체적 매물 탐색, 대출 사전
            심사. 취득세·등기비용 등 부대비용 별도 확보.
          </li>
          <li>
            <strong>4단계 (7~10년차):</strong> 계약 및 잔금, 전입신고,
            대출 실행. 이후 원리금 상환 시작.
          </li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h3>Q. LTV, DTI, DSR이 뭔가요?</h3>
        <p>
          <strong>LTV(주택담보인정비율)</strong>는 집값 대비 대출 비율로
          현재 수도권 기준 50~70%입니다. <strong>DTI(총부채상환비율)</strong>는
          연소득 대비 주담대 원리금 비율, <strong>DSR(총부채원리금상환비율)
          </strong>은 연소득 대비 모든 대출의 원리금 비율입니다. 2026년
          현재 DSR 40% 규제가 적용되어, 연소득 5,000만원이라면 연간 원리금
          상환액이 2,000만원을 초과하는 대출을 받을 수 없습니다.
        </p>

        <h3>Q. 종잣돈은 얼마나 모아야 하나요?</h3>
        <p>
          일반적으로 목표 매매가의 30~40%를 자기자본으로 준비하는 것이
          안전합니다. 예를 들어 5억 아파트를 목표로 한다면 1.5~2억원의
          종잣돈이 필요합니다. 여기에 취득세(약 1~3%), 중개수수료(0.4~0.5%),
          이사비, 인테리어 비용 등 부대비용 1,500~2,000만원도 추가로
          고려해야 합니다.
        </p>

        <h3>Q. 부부 합산 소득으로 대출을 더 받을 수 있나요?</h3>
        <p>
          네, 부부 공동명의로 주택을 구입하면 부부 합산 소득으로 DSR을
          계산하므로 대출 한도가 늘어날 수 있습니다. 다만 부부 각각의 기존
          대출도 합산되므로, 기존 대출이 많다면 오히려 불리할 수 있습니다.
          또한 공동명의 시 종합부동산세 인별 공제(각각 9억원)를 받을 수
          있는 장점도 있습니다.
        </p>
      </div>
    </div>
  );
}
