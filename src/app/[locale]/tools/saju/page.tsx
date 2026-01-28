import type { Metadata } from 'next';
import SajuCalculator from '@/components/saju/SajuCalculator';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infotalker.com';

export const metadata: Metadata = {
  title: '무료 사주팔자 계산기 - 오행, 대운, 궁합, 운세',
  description:
    '생년월일시로 무료 사주팔자를 계산하고 오행 분석, 대운, 세운, 궁합, 상세 운세까지 확인하세요. 정확한 만세력 기반 사주 계산기입니다.',
  keywords: [
    '사주',
    '사주팔자',
    '만세력',
    '사주 계산기',
    '오행',
    '대운',
    '궁합',
    '무료 사주',
    '사주 무료',
    '운세',
  ],
  openGraph: {
    title: '무료 사주팔자 계산기',
    description: '생년월일시로 사주팔자, 오행, 대운, 궁합, 운세까지 무료로 확인하세요.',
    url: `${siteUrl}/ko/tools/saju`,
    type: 'website',
  },
};

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SajuPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-2xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === 'ko' ? '무료 사주팔자 계산기' : 'Free Four Pillars Calculator'}
        </h1>
        <p className="text-gray-600">
          {locale === 'ko'
            ? '생년월일시를 입력하면 사주팔자, 오행 분석, 대운, 궁합, 운세까지 무료로 확인할 수 있습니다.'
            : 'Enter your birth date and time to calculate your Four Pillars of Destiny, Five Elements analysis, and more.'}
        </p>
      </div>

      {/* 계산기 */}
      <SajuCalculator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>사주팔자란?</h2>
        <p>
          사주팔자(四柱八字)는 태어난 해, 달, 날, 시를 네 기둥(四柱)으로 놓고,
          각 기둥마다 천간(天干)과 지지(地支) 두 글자씩, 총 여덟 글자(八字)로
          사람의 타고난 기운을 분석하는 동양 철학입니다.
        </p>

        <h2>오행(五行) 분석</h2>
        <p>
          오행은 목(木), 화(火), 토(土), 금(金), 수(水) 다섯 가지 기운을 말합니다.
          사주팔자의 8글자가 어떤 오행에 해당하는지 분석하면, 타고난 성격과
          적성, 건강 등을 파악할 수 있어요.
        </p>

        <h2>대운과 세운</h2>
        <p>
          대운(大運)은 10년 단위로 바뀌는 큰 운의 흐름이고,
          세운(歲運)은 매년 바뀌는 운입니다. 현재 어떤 대운에 있는지,
          올해 세운이 어떤지 확인해보세요.
        </p>

        <h2>궁합 보기</h2>
        <p>
          두 사람의 사주를 비교해서 천간합, 지지합, 오행 조화 등을 분석합니다.
          궁합 점수와 함께 강점과 주의점을 확인할 수 있어요.
        </p>

        <h2>자주 묻는 질문</h2>

        <h3>Q. 태어난 시간을 모르면 어떻게 하나요?</h3>
        <p>
          태어난 시간 없이도 년주, 월주, 일주는 정확하게 계산됩니다.
          시주만 빠지므로 약 75%의 정보는 확인할 수 있어요.
        </p>

        <h3>Q. 음력과 양력 중 뭘로 입력해야 하나요?</h3>
        <p>
          어떤 것으로 입력하든 자동으로 변환해서 계산합니다.
          주민등록상 생년월일(보통 양력)을 입력하시면 됩니다.
        </p>

        <h3>Q. 사주 결과가 정확한가요?</h3>
        <p>
          만세력 기반으로 년주, 월주, 일주, 시주를 계산하므로
          기본 사주팔자는 정확합니다. 운세 해석은 참고용입니다.
        </p>
      </div>
    </div>
  );
}
