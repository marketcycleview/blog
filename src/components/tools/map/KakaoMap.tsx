"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
    __kakaoMapLoading?: boolean;
  }
}

export interface MapMarker {
  lat: number;
  lng: number;
  title?: string;
  content?: string;
}

interface KakaoMapProps {
  center?: { lat: number; lng: number };
  level?: number;
  height?: string;
  markers?: MapMarker[];
  className?: string;
}

export default function KakaoMap({
  center = { lat: 36.5, lng: 127.0 },
  level = 13,
  height = "400px",
  markers = [],
  className,
}: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState(false);

  // Load Kakao Maps SDK
  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!appKey) {
      setError(true);
      return;
    }

    if (window.kakao?.maps?.LatLng) {
      setSdkReady(true);
      return;
    }

    if (window.__kakaoMapLoading) {
      const check = setInterval(() => {
        if (window.kakao?.maps?.LatLng) {
          setSdkReady(true);
          clearInterval(check);
        }
      }, 100);
      return () => clearInterval(check);
    }

    window.__kakaoMapLoading = true;
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => setSdkReady(true));
    };
    script.onerror = () => setError(true);
    document.head.appendChild(script);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!sdkReady || !containerRef.current || mapRef.current) return;

    const map = new window.kakao.maps.Map(containerRef.current, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
    map.addControl(
      new window.kakao.maps.ZoomControl(),
      window.kakao.maps.ControlPosition.RIGHT
    );
    mapRef.current = map;
  }, [sdkReady]);

  // Update center & level
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setCenter(
      new window.kakao.maps.LatLng(center.lat, center.lng)
    );
    mapRef.current.setLevel(level);
  }, [center.lat, center.lng, level]);

  // Update markers
  useEffect(() => {
    if (!mapRef.current || !sdkReady) return;

    // Clear
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    markers.forEach((m) => {
      const pos = new window.kakao.maps.LatLng(m.lat, m.lng);
      const marker = new window.kakao.maps.Marker({
        position: pos,
        map: mapRef.current,
      });

      if (m.content || m.title) {
        const iw = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:8px 12px;font-size:13px;max-width:220px;line-height:1.4;">${
            m.content || m.title
          }</div>`,
        });
        window.kakao.maps.event.addListener(marker, "click", () => {
          iw.open(mapRef.current, marker);
        });
      }

      markersRef.current.push(marker);
    });
  }, [markers, sdkReady]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-xl ${className || ""}`}
        style={{ height }}
      >
        <div className="text-center text-gray-500">
          <p className="text-2xl mb-2">🗺️</p>
          <p className="text-sm">지도를 불러올 수 없습니다</p>
          <p className="text-xs mt-1 text-gray-400">
            API 키를 확인해 주세요
          </p>
        </div>
      </div>
    );
  }

  if (!sdkReady) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 rounded-xl ${className || ""}`}
        style={{ height }}
      >
        <div className="text-center text-gray-400">
          <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-sm">지도 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`rounded-xl overflow-hidden ${className || ""}`}
      style={{ width: "100%", height }}
    />
  );
}
