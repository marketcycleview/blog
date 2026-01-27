interface Review {
  sentiment: "positive" | "negative" | "neutral";
  summary: string;
  source: string;
  url: string;
  author?: string;
}

interface ReviewSectionProps {
  reviews?: Review[];
  positiveCount?: number;
  negativeCount?: number;
  keyPros?: string[];
  keyCons?: string[];
}

export function ReviewSection({
  reviews = [],
  positiveCount,
  negativeCount,
  keyPros = [],
  keyCons = [],
}: ReviewSectionProps) {
  const positiveReviews = reviews.filter((r) => r.sentiment === "positive");
  const negativeReviews = reviews.filter((r) => r.sentiment === "negative");

  const actualPositiveCount = positiveCount ?? positiveReviews.length;
  const actualNegativeCount = negativeCount ?? negativeReviews.length;
  const totalCount = actualPositiveCount + actualNegativeCount;
  const positivePercent = totalCount > 0 ? Math.round((actualPositiveCount / totalCount) * 100) : 0;

  return (
    <section className="my-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">실사용자 리뷰 모음</h2>

      {/* 긍정 리뷰 */}
      {positiveReviews.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-3">
            ✅ 긍정 리뷰 ({actualPositiveCount}건)
          </h3>
          <div className="space-y-3">
            {positiveReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      )}

      {/* 부정 리뷰 */}
      {negativeReviews.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-700 mb-3">
            ❌ 부정 리뷰 ({actualNegativeCount}건)
          </h3>
          <div className="space-y-3">
            {negativeReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      )}

      {/* 리뷰 요약 */}
      {(totalCount > 0 || keyPros.length > 0 || keyCons.length > 0) && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">📊 리뷰 요약</h3>
          <table className="w-full text-left">
            <tbody>
              {totalCount > 0 && (
                <>
                  <tr className="border-b">
                    <td className="py-2 font-medium text-gray-600">총 리뷰 수</td>
                    <td className="py-2">{totalCount}건</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium text-gray-600">긍정 비율</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${positivePercent}%` }}
                          />
                        </div>
                        <span>{positivePercent}%</span>
                      </div>
                    </td>
                  </tr>
                </>
              )}
              {keyPros.length > 0 && (
                <tr className="border-b">
                  <td className="py-2 font-medium text-gray-600">주요 장점</td>
                  <td className="py-2">{keyPros.join(", ")}</td>
                </tr>
              )}
              {keyCons.length > 0 && (
                <tr className="border-b">
                  <td className="py-2 font-medium text-gray-600">주요 단점</td>
                  <td className="py-2">{keyCons.join(", ")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 리뷰가 없는 경우 */}
      {reviews.length === 0 && totalCount === 0 && (
        <p className="text-gray-500 text-center py-4">
          아직 수집된 리뷰가 없습니다.
        </p>
      )}
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const bgClass =
    review.sentiment === "positive"
      ? "bg-green-50 border-l-4 border-green-500"
      : review.sentiment === "negative"
      ? "bg-red-50 border-l-4 border-red-500"
      : "bg-gray-50 border-l-4 border-gray-400";

  return (
    <div className={`p-4 rounded ${bgClass}`}>
      <p className="text-gray-800 mb-2">&quot;{review.summary}&quot;</p>
      <p className="text-sm text-gray-600">
        —{" "}
        {review.url ? (
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {review.author || review.source}
          </a>
        ) : (
          <span>{review.author || review.source}</span>
        )}{" "}
        ({review.source})
      </p>
    </div>
  );
}
