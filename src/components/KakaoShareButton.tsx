"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    Kakao: any;
    __kakaoSdkLoading?: boolean;
  }
}

interface KakaoShareButtonProps {
  title: string;
  description: string;
  imageUrl?: string;
  pageUrl: string;
  /** 버튼 스타일 variant */
  variant?: "inline" | "floating";
}

/** 카카오 JS SDK 로드 */
function loadKakaoSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Kakao) {
      resolve();
      return;
    }
    if (window.__kakaoSdkLoading) {
      const check = setInterval(() => {
        if (window.Kakao) {
          clearInterval(check);
          resolve();
        }
      }, 100);
      return;
    }
    window.__kakaoSdkLoading = true;
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      window.__kakaoSdkLoading = false;
      resolve();
    };
    script.onerror = () => {
      window.__kakaoSdkLoading = false;
      reject(new Error("Kakao SDK load failed"));
    };
    document.head.appendChild(script);
  });
}

export function KakaoShareButton({
  title,
  description,
  imageUrl,
  pageUrl,
  variant = "inline",
}: KakaoShareButtonProps) {
  const initialized = useRef(false);

  useEffect(() => {
    loadKakaoSdk()
      .then(() => {
        if (!initialized.current && window.Kakao && !window.Kakao.isInitialized()) {
          const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
          if (appKey) {
            window.Kakao.init(appKey);
            initialized.current = true;
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleShare = useCallback(async () => {
    try {
      // SDK가 아직 안 불러졌으면 다시 시도
      if (!window.Kakao) {
        await loadKakaoSdk();
      }
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
        if (appKey) window.Kakao.init(appKey);
      }
      if (!window.Kakao?.Share) {
        alert("카카오톡 공유 기능을 불러오지 못했습니다. 링크 복사를 이용해주세요.");
        return;
      }

      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title,
          description: description.slice(0, 200),
          imageUrl: imageUrl || `${pageUrl.split("/").slice(0, 3).join("/")}/api/og?title=${encodeURIComponent(title)}`,
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: pageUrl,
              webUrl: pageUrl,
            },
          },
        ],
      });
    } catch (e) {
      console.error("카카오 공유 에러:", e);
      alert("카카오톡 공유에 실패했습니다. 링크 복사를 이용해주세요.");
    }
  }, [title, description, imageUrl, pageUrl]);

  /** URL 복사 fallback */
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert("링크가 복사되었습니다.");
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = pageUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert("링크가 복사되었습니다.");
    }
  }, [pageUrl]);

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        <button
          onClick={handleShare}
          className="w-11 h-11 rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          aria-label="카카오톡 공유"
          title="카카오톡 공유"
        >
          <KakaoIcon />
        </button>
        <button
          onClick={handleCopyLink}
          className="w-11 h-11 rounded-full bg-gray-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          aria-label="링크 복사"
          title="링크 복사"
        >
          <LinkIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FEE500] text-[#3C1E1E] text-sm font-medium hover:bg-[#F5DC00] transition-colors"
      >
        <KakaoIcon />
        카카오톡 공유
      </button>
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        <LinkIcon />
        링크 복사
      </button>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.734 1.811 5.134 4.534 6.479l-.926 3.429a.318.318 0 00.483.35l3.898-2.592c.657.096 1.33.147 2.011.147 5.523 0 10-3.463 10-7.813C22 6.463 17.523 3 12 3z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}
