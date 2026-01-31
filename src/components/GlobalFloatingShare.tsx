"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { KakaoShareButton } from "./KakaoShareButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export function GlobalFloatingShare() {
  const pathname = usePathname();
  const [title, setTitle] = useState("InfoTalker");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // 페이지 타이틀에서 " | InfoTalker" 제거
    const raw = document.title;
    setTitle(raw.replace(/\s*\|\s*InfoTalker$/, "") || "InfoTalker");

    const meta = document.querySelector('meta[name="description"]');
    setDescription(meta?.getAttribute("content") || "복지, 금융, 세금 정보를 한 곳에서");
  }, [pathname]);

  return (
    <KakaoShareButton
      title={title}
      description={description}
      pageUrl={`${siteUrl}${pathname}`}
      variant="floating"
    />
  );
}
