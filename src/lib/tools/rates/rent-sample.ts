import type { RentHeatmapData } from "./rent-types";

/** 서울 샘플 데이터 (API 키 없을 때 사용) */
export function getSampleRentData(): RentHeatmapData {
  return {
    districts: [
      { code: "11110", name: "종로구", jeonse: { count: 42, avgDeposit: 32500, minDeposit: 8000, maxDeposit: 85000 }, wolse: { count: 18, avgDeposit: 5000, avgRent: 95 }, totalCount: 60 },
      { code: "11140", name: "중구", jeonse: { count: 35, avgDeposit: 34000, minDeposit: 10000, maxDeposit: 78000 }, wolse: { count: 15, avgDeposit: 5000, avgRent: 100 }, totalCount: 50 },
      { code: "11170", name: "용산구", jeonse: { count: 68, avgDeposit: 52000, minDeposit: 15000, maxDeposit: 120000 }, wolse: { count: 25, avgDeposit: 10000, avgRent: 130 }, totalCount: 93 },
      { code: "11200", name: "성동구", jeonse: { count: 95, avgDeposit: 46000, minDeposit: 12000, maxDeposit: 95000 }, wolse: { count: 32, avgDeposit: 8000, avgRent: 110 }, totalCount: 127 },
      { code: "11215", name: "광진구", jeonse: { count: 78, avgDeposit: 40000, minDeposit: 10000, maxDeposit: 85000 }, wolse: { count: 28, avgDeposit: 5000, avgRent: 100 }, totalCount: 106 },
      { code: "11230", name: "동대문구", jeonse: { count: 65, avgDeposit: 31000, minDeposit: 8000, maxDeposit: 65000 }, wolse: { count: 22, avgDeposit: 3000, avgRent: 75 }, totalCount: 87 },
      { code: "11260", name: "중랑구", jeonse: { count: 72, avgDeposit: 26000, minDeposit: 7000, maxDeposit: 55000 }, wolse: { count: 30, avgDeposit: 3000, avgRent: 65 }, totalCount: 102 },
      { code: "11290", name: "성북구", jeonse: { count: 80, avgDeposit: 33000, minDeposit: 9000, maxDeposit: 70000 }, wolse: { count: 25, avgDeposit: 4000, avgRent: 80 }, totalCount: 105 },
      { code: "11305", name: "강북구", jeonse: { count: 55, avgDeposit: 24000, minDeposit: 6000, maxDeposit: 50000 }, wolse: { count: 20, avgDeposit: 2000, avgRent: 55 }, totalCount: 75 },
      { code: "11320", name: "도봉구", jeonse: { count: 62, avgDeposit: 23000, minDeposit: 6000, maxDeposit: 48000 }, wolse: { count: 18, avgDeposit: 2000, avgRent: 50 }, totalCount: 80 },
      { code: "11350", name: "노원구", jeonse: { count: 110, avgDeposit: 25000, minDeposit: 7000, maxDeposit: 52000 }, wolse: { count: 35, avgDeposit: 3000, avgRent: 55 }, totalCount: 145 },
      { code: "11380", name: "은평구", jeonse: { count: 75, avgDeposit: 28000, minDeposit: 8000, maxDeposit: 60000 }, wolse: { count: 22, avgDeposit: 3000, avgRent: 65 }, totalCount: 97 },
      { code: "11410", name: "서대문구", jeonse: { count: 60, avgDeposit: 33000, minDeposit: 9000, maxDeposit: 68000 }, wolse: { count: 20, avgDeposit: 5000, avgRent: 80 }, totalCount: 80 },
      { code: "11440", name: "마포구", jeonse: { count: 92, avgDeposit: 45000, minDeposit: 12000, maxDeposit: 95000 }, wolse: { count: 35, avgDeposit: 7000, avgRent: 105 }, totalCount: 127 },
      { code: "11470", name: "양천구", jeonse: { count: 88, avgDeposit: 38000, minDeposit: 10000, maxDeposit: 80000 }, wolse: { count: 28, avgDeposit: 5000, avgRent: 85 }, totalCount: 116 },
      { code: "11500", name: "강서구", jeonse: { count: 105, avgDeposit: 32000, minDeposit: 8000, maxDeposit: 65000 }, wolse: { count: 38, avgDeposit: 4000, avgRent: 70 }, totalCount: 143 },
      { code: "11530", name: "구로구", jeonse: { count: 82, avgDeposit: 30000, minDeposit: 8000, maxDeposit: 60000 }, wolse: { count: 30, avgDeposit: 3000, avgRent: 65 }, totalCount: 112 },
      { code: "11545", name: "금천구", jeonse: { count: 48, avgDeposit: 27000, minDeposit: 7000, maxDeposit: 55000 }, wolse: { count: 18, avgDeposit: 3000, avgRent: 60 }, totalCount: 66 },
      { code: "11560", name: "영등포구", jeonse: { count: 85, avgDeposit: 40000, minDeposit: 10000, maxDeposit: 85000 }, wolse: { count: 32, avgDeposit: 5000, avgRent: 95 }, totalCount: 117 },
      { code: "11590", name: "동작구", jeonse: { count: 70, avgDeposit: 38000, minDeposit: 10000, maxDeposit: 78000 }, wolse: { count: 25, avgDeposit: 5000, avgRent: 90 }, totalCount: 95 },
      { code: "11620", name: "관악구", jeonse: { count: 65, avgDeposit: 28000, minDeposit: 7000, maxDeposit: 58000 }, wolse: { count: 28, avgDeposit: 3000, avgRent: 65 }, totalCount: 93 },
      { code: "11650", name: "서초구", jeonse: { count: 120, avgDeposit: 72000, minDeposit: 20000, maxDeposit: 180000 }, wolse: { count: 45, avgDeposit: 15000, avgRent: 180 }, totalCount: 165 },
      { code: "11680", name: "강남구", jeonse: { count: 135, avgDeposit: 78000, minDeposit: 22000, maxDeposit: 200000 }, wolse: { count: 55, avgDeposit: 18000, avgRent: 200 }, totalCount: 190 },
      { code: "11710", name: "송파구", jeonse: { count: 125, avgDeposit: 58000, minDeposit: 15000, maxDeposit: 140000 }, wolse: { count: 42, avgDeposit: 10000, avgRent: 140 }, totalCount: 167 },
      { code: "11740", name: "강동구", jeonse: { count: 90, avgDeposit: 42000, minDeposit: 12000, maxDeposit: 90000 }, wolse: { count: 30, avgDeposit: 6000, avgRent: 95 }, totalCount: 120 },
    ],
    sido: "11",
    sidoName: "서울특별시",
    month: "202512",
    updatedAt: new Date().toISOString(),
    isLive: false,
  };
}
