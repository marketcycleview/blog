/**
 * 서울 행정동 좌표 데이터 생성 스크립트
 * 카카오 주소 검색 API로 행정동 중심 좌표를 수집합니다.
 *
 * 사용법: npx tsx scripts/generate-seoul-dong-coords.ts
 * 출력:   src/lib/tools/lifestyle/seoul-dongs.ts
 *
 * 필요 환경변수: KAKAO_REST_API_KEY (.env.local)
 */

import fs from "fs";
import path from "path";

// ──────────────────────────────────────────────────────────
// 서울 25개 구 × 행정동 목록
// ──────────────────────────────────────────────────────────

interface DongDef {
  code: string;
  name: string;
}

interface GuDef {
  guName: string;
  dongs: DongDef[];
}

const DONG_DATA: Record<string, GuDef> = {
  gangnam: {
    guName: "강남구",
    dongs: [
      { code: "sinsa", name: "신사동" },
      { code: "nonhyeon1", name: "논현1동" },
      { code: "nonhyeon2", name: "논현2동" },
      { code: "apgujeong", name: "압구정동" },
      { code: "cheongdam", name: "청담동" },
      { code: "samseong1", name: "삼성1동" },
      { code: "samseong2", name: "삼성2동" },
      { code: "daechi1", name: "대치1동" },
      { code: "daechi2", name: "대치2동" },
      { code: "daechi4", name: "대치4동" },
      { code: "yeoksam1", name: "역삼1동" },
      { code: "yeoksam2", name: "역삼2동" },
      { code: "dogok1", name: "도곡1동" },
      { code: "dogok2", name: "도곡2동" },
      { code: "gaepo1", name: "개포1동" },
      { code: "gaepo2", name: "개포2동" },
      { code: "gaepo4", name: "개포4동" },
      { code: "ilwonbon", name: "일원본동" },
      { code: "ilwon1", name: "일원1동" },
      { code: "ilwon2", name: "일원2동" },
      { code: "suseo", name: "수서동" },
      { code: "segok", name: "세곡동" },
    ],
  },
  gangdong: {
    guName: "강동구",
    dongs: [
      { code: "gangil", name: "강일동" },
      { code: "sangil1", name: "상일1동" },
      { code: "sangil2", name: "상일2동" },
      { code: "myeongil1", name: "명일1동" },
      { code: "myeongil2", name: "명일2동" },
      { code: "godeok1", name: "고덕1동" },
      { code: "godeok2", name: "고덕2동" },
      { code: "amsa1", name: "암사1동" },
      { code: "amsa2", name: "암사2동" },
      { code: "amsa3", name: "암사3동" },
      { code: "cheonho1", name: "천호1동" },
      { code: "cheonho2", name: "천호2동" },
      { code: "cheonho3", name: "천호3동" },
      { code: "seongnae1", name: "성내1동" },
      { code: "seongnae2", name: "성내2동" },
      { code: "seongnae3", name: "성내3동" },
      { code: "dunchon1", name: "둔촌1동" },
      { code: "dunchon2", name: "둔촌2동" },
    ],
  },
  gangbuk: {
    guName: "강북구",
    dongs: [
      { code: "samyang", name: "삼양동" },
      { code: "mia", name: "미아동" },
      { code: "songjung", name: "송중동" },
      { code: "songcheon", name: "송천동" },
      { code: "samgaksan", name: "삼각산동" },
      { code: "beon1", name: "번1동" },
      { code: "beon2", name: "번2동" },
      { code: "beon3", name: "번3동" },
      { code: "suyu1", name: "수유1동" },
      { code: "suyu2", name: "수유2동" },
      { code: "suyu3", name: "수유3동" },
      { code: "ui", name: "우이동" },
      { code: "insu", name: "인수동" },
    ],
  },
  gangseo: {
    guName: "강서구",
    dongs: [
      { code: "yeomchang", name: "염창동" },
      { code: "deungchon1", name: "등촌1동" },
      { code: "deungchon2", name: "등촌2동" },
      { code: "deungchon3", name: "등촌3동" },
      { code: "hwagok1", name: "화곡1동" },
      { code: "hwagok2", name: "화곡2동" },
      { code: "hwagok3", name: "화곡3동" },
      { code: "hwagok4", name: "화곡4동" },
      { code: "hwagok6", name: "화곡6동" },
      { code: "hwagok8", name: "화곡8동" },
      { code: "ujangsan", name: "우장산동" },
      { code: "gayang1", name: "가양1동" },
      { code: "gayang2", name: "가양2동" },
      { code: "gayang3", name: "가양3동" },
      { code: "balsan1", name: "발산1동" },
      { code: "gonghang", name: "공항동" },
      { code: "banghwa1", name: "방화1동" },
      { code: "banghwa2", name: "방화2동" },
      { code: "banghwa3", name: "방화3동" },
      { code: "magok", name: "마곡동" },
    ],
  },
  gwanak: {
    guName: "관악구",
    dongs: [
      { code: "boramae", name: "보라매동" },
      { code: "euncheon", name: "은천동" },
      { code: "seonghyeon", name: "성현동" },
      { code: "cheongnim", name: "청림동" },
      { code: "haengun", name: "행운동" },
      { code: "nakseongdae", name: "낙성대동" },
      { code: "cheongnyong", name: "청룡동" },
      { code: "nangok", name: "난곡동" },
      { code: "jowon", name: "조원동" },
      { code: "daehak", name: "대학동" },
      { code: "seorim", name: "서림동" },
      { code: "sillim", name: "신림동" },
      { code: "nanhyang", name: "난향동" },
      { code: "seowon", name: "서원동" },
      { code: "gw_sinsa", name: "신사동" },
      { code: "sinwon", name: "신원동" },
      { code: "gw_samseong", name: "삼성동" },
      { code: "miseong", name: "미성동" },
      { code: "jungang", name: "중앙동" },
      { code: "inheon", name: "인헌동" },
      { code: "namhyeon", name: "남현동" },
    ],
  },
  gwangjin: {
    guName: "광진구",
    dongs: [
      { code: "junggok1", name: "중곡1동" },
      { code: "junggok2", name: "중곡2동" },
      { code: "junggok3", name: "중곡3동" },
      { code: "junggok4", name: "중곡4동" },
      { code: "neungdong", name: "능동" },
      { code: "guui1", name: "구의1동" },
      { code: "guui2", name: "구의2동" },
      { code: "guui3", name: "구의3동" },
      { code: "gwangjang", name: "광장동" },
      { code: "jayang1", name: "자양1동" },
      { code: "jayang2", name: "자양2동" },
      { code: "jayang3", name: "자양3동" },
      { code: "jayang4", name: "자양4동" },
      { code: "hwayang", name: "화양동" },
      { code: "gunja", name: "군자동" },
    ],
  },
  guro: {
    guName: "구로구",
    dongs: [
      { code: "sindorim", name: "신도림동" },
      { code: "guro1", name: "구로1동" },
      { code: "guro2", name: "구로2동" },
      { code: "guro3", name: "구로3동" },
      { code: "guro4", name: "구로4동" },
      { code: "guro5", name: "구로5동" },
      { code: "garibong", name: "가리봉동" },
      { code: "gocheok1", name: "고척1동" },
      { code: "gocheok2", name: "고척2동" },
      { code: "gaebong1", name: "개봉1동" },
      { code: "gaebong2", name: "개봉2동" },
      { code: "gaebong3", name: "개봉3동" },
      { code: "oryu1", name: "오류1동" },
      { code: "oryu2", name: "오류2동" },
      { code: "sugung", name: "수궁동" },
    ],
  },
  geumcheon: {
    guName: "금천구",
    dongs: [
      { code: "gasan", name: "가산동" },
      { code: "doksan1", name: "독산1동" },
      { code: "doksan2", name: "독산2동" },
      { code: "doksan3", name: "독산3동" },
      { code: "doksan4", name: "독산4동" },
      { code: "siheung1", name: "시흥1동" },
      { code: "siheung2", name: "시흥2동" },
      { code: "siheung3", name: "시흥3동" },
      { code: "siheung4", name: "시흥4동" },
      { code: "siheung5", name: "시흥5동" },
    ],
  },
  nowon: {
    guName: "노원구",
    dongs: [
      { code: "wolgye1", name: "월계1동" },
      { code: "wolgye2", name: "월계2동" },
      { code: "wolgye3", name: "월계3동" },
      { code: "gongneung1", name: "공릉1동" },
      { code: "gongneung2", name: "공릉2동" },
      { code: "hagye1", name: "하계1동" },
      { code: "hagye2", name: "하계2동" },
      { code: "junggye_bon", name: "중계본동" },
      { code: "junggye1", name: "중계1동" },
      { code: "junggye2", name: "중계2동" },
      { code: "junggye3", name: "중계3동" },
      { code: "junggye4", name: "중계4동" },
      { code: "sanggye1", name: "상계1동" },
      { code: "sanggye2", name: "상계2동" },
      { code: "sanggye34", name: "상계3·4동" },
      { code: "sanggye5", name: "상계5동" },
      { code: "sanggye67", name: "상계6·7동" },
      { code: "sanggye8", name: "상계8동" },
      { code: "sanggye9", name: "상계9동" },
      { code: "sanggye10", name: "상계10동" },
    ],
  },
  dobong: {
    guName: "도봉구",
    dongs: [
      { code: "ssangmun1", name: "쌍문1동" },
      { code: "ssangmun2", name: "쌍문2동" },
      { code: "ssangmun3", name: "쌍문3동" },
      { code: "ssangmun4", name: "쌍문4동" },
      { code: "banghak1", name: "방학1동" },
      { code: "banghak2", name: "방학2동" },
      { code: "banghak3", name: "방학3동" },
      { code: "chang1", name: "창1동" },
      { code: "chang2", name: "창2동" },
      { code: "chang3", name: "창3동" },
      { code: "chang4", name: "창4동" },
      { code: "chang5", name: "창5동" },
      { code: "dobong1", name: "도봉1동" },
      { code: "dobong2", name: "도봉2동" },
    ],
  },
  dongdaemun: {
    guName: "동대문구",
    dongs: [
      { code: "yongsin", name: "용신동" },
      { code: "jegi", name: "제기동" },
      { code: "jeonnong1", name: "전농1동" },
      { code: "jeonnong2", name: "전농2동" },
      { code: "dapsimni1", name: "답십리1동" },
      { code: "dapsimni2", name: "답십리2동" },
      { code: "jangan1", name: "장안1동" },
      { code: "jangan2", name: "장안2동" },
      { code: "cheongnyangni", name: "청량리동" },
      { code: "hoegi", name: "회기동" },
      { code: "hwigyeong1", name: "휘경1동" },
      { code: "hwigyeong2", name: "휘경2동" },
      { code: "imun1", name: "이문1동" },
      { code: "imun2", name: "이문2동" },
    ],
  },
  dongjak: {
    guName: "동작구",
    dongs: [
      { code: "noryangjin1", name: "노량진1동" },
      { code: "noryangjin2", name: "노량진2동" },
      { code: "sangdo1", name: "상도1동" },
      { code: "sangdo2", name: "상도2동" },
      { code: "sangdo3", name: "상도3동" },
      { code: "sangdo4", name: "상도4동" },
      { code: "heukseok", name: "흑석동" },
      { code: "sadang1", name: "사당1동" },
      { code: "sadang2", name: "사당2동" },
      { code: "sadang3", name: "사당3동" },
      { code: "sadang4", name: "사당4동" },
      { code: "sadang5", name: "사당5동" },
      { code: "daebang", name: "대방동" },
      { code: "sindaebang1", name: "신대방1동" },
      { code: "sindaebang2", name: "신대방2동" },
    ],
  },
  mapo: {
    guName: "마포구",
    dongs: [
      { code: "ahyeon", name: "아현동" },
      { code: "gongdeok", name: "공덕동" },
      { code: "dohwa", name: "도화동" },
      { code: "yonggang", name: "용강동" },
      { code: "daeheung", name: "대흥동" },
      { code: "yeomni", name: "염리동" },
      { code: "sinsu", name: "신수동" },
      { code: "seogang", name: "서강동" },
      { code: "seogyo", name: "서교동" },
      { code: "hapjeong", name: "합정동" },
      { code: "mangwon1", name: "망원1동" },
      { code: "mangwon2", name: "망원2동" },
      { code: "yeonnam", name: "연남동" },
      { code: "seongsan1", name: "성산1동" },
      { code: "seongsan2", name: "성산2동" },
      { code: "sangam", name: "상암동" },
    ],
  },
  seodaemun: {
    guName: "서대문구",
    dongs: [
      { code: "cheonyeon", name: "천연동" },
      { code: "bugahyeon", name: "북아현동" },
      { code: "chunghyeon", name: "충현동" },
      { code: "sinchon", name: "신촌동" },
      { code: "yeonhui", name: "연희동" },
      { code: "hongje1", name: "홍제1동" },
      { code: "hongje2", name: "홍제2동" },
      { code: "hongje3", name: "홍제3동" },
      { code: "hongeun1", name: "홍은1동" },
      { code: "hongeun2", name: "홍은2동" },
      { code: "namgajwa1", name: "남가좌1동" },
      { code: "namgajwa2", name: "남가좌2동" },
      { code: "bukgajwa1", name: "북가좌1동" },
      { code: "bukgajwa2", name: "북가좌2동" },
    ],
  },
  seocho: {
    guName: "서초구",
    dongs: [
      { code: "jamwon", name: "잠원동" },
      { code: "banpobon", name: "반포본동" },
      { code: "banpo1", name: "반포1동" },
      { code: "banpo2", name: "반포2동" },
      { code: "banpo3", name: "반포3동" },
      { code: "banpo4", name: "반포4동" },
      { code: "bangbaebon", name: "방배본동" },
      { code: "bangbae1", name: "방배1동" },
      { code: "bangbae2", name: "방배2동" },
      { code: "bangbae3", name: "방배3동" },
      { code: "bangbae4", name: "방배4동" },
      { code: "seocho1", name: "서초1동" },
      { code: "seocho2", name: "서초2동" },
      { code: "seocho3", name: "서초3동" },
      { code: "seocho4", name: "서초4동" },
      { code: "yangjae1", name: "양재1동" },
      { code: "yangjae2", name: "양재2동" },
      { code: "naegok", name: "내곡동" },
    ],
  },
  seongdong: {
    guName: "성동구",
    dongs: [
      { code: "wangsimni2", name: "왕십리2동" },
      { code: "wangsimni_doseon", name: "왕십리도선동" },
      { code: "majang", name: "마장동" },
      { code: "sageun", name: "사근동" },
      { code: "haengdang1", name: "행당1동" },
      { code: "haengdang2", name: "행당2동" },
      { code: "eungbong", name: "응봉동" },
      { code: "geumho1ga", name: "금호1가동" },
      { code: "geumho23ga", name: "금호2·3가동" },
      { code: "geumho4ga", name: "금호4가동" },
      { code: "oksu", name: "옥수동" },
      { code: "seongsu1ga1", name: "성수1가1동" },
      { code: "seongsu1ga2", name: "성수1가2동" },
      { code: "seongsu2ga1", name: "성수2가1동" },
      { code: "seongsu2ga3", name: "성수2가3동" },
      { code: "songjeong", name: "송정동" },
      { code: "yongdap", name: "용답동" },
    ],
  },
  seongbuk: {
    guName: "성북구",
    dongs: [
      { code: "seongbukdong", name: "성북동" },
      { code: "samseon", name: "삼선동" },
      { code: "dongseon", name: "동선동" },
      { code: "donam1", name: "돈암1동" },
      { code: "donam2", name: "돈암2동" },
      { code: "anam", name: "안암동" },
      { code: "bomun", name: "보문동" },
      { code: "jeongneung1", name: "정릉1동" },
      { code: "jeongneung2", name: "정릉2동" },
      { code: "jeongneung3", name: "정릉3동" },
      { code: "jeongneung4", name: "정릉4동" },
      { code: "gireum1", name: "길음1동" },
      { code: "gireum2", name: "길음2동" },
      { code: "jongam", name: "종암동" },
      { code: "wolgok1", name: "월곡1동" },
      { code: "wolgok2", name: "월곡2동" },
      { code: "jangwi1", name: "장위1동" },
      { code: "jangwi2", name: "장위2동" },
      { code: "jangwi3", name: "장위3동" },
      { code: "seokgwan", name: "석관동" },
    ],
  },
  songpa: {
    guName: "송파구",
    dongs: [
      { code: "pungnap1", name: "풍납1동" },
      { code: "pungnap2", name: "풍납2동" },
      { code: "geoyeo1", name: "거여1동" },
      { code: "geoyeo2", name: "거여2동" },
      { code: "macheon1", name: "마천1동" },
      { code: "macheon2", name: "마천2동" },
      { code: "bangi1", name: "방이1동" },
      { code: "bangi2", name: "방이2동" },
      { code: "ogeum", name: "오금동" },
      { code: "songpa1", name: "송파1동" },
      { code: "songpa2", name: "송파2동" },
      { code: "seokchon", name: "석촌동" },
      { code: "samjeon", name: "삼전동" },
      { code: "garakbon", name: "가락본동" },
      { code: "garak1", name: "가락1동" },
      { code: "garak2", name: "가락2동" },
      { code: "munjeong1", name: "문정1동" },
      { code: "munjeong2", name: "문정2동" },
      { code: "jangji", name: "장지동" },
      { code: "wirye", name: "위례동" },
      { code: "jamsilbon", name: "잠실본동" },
      { code: "jamsil2", name: "잠실2동" },
      { code: "jamsil3", name: "잠실3동" },
      { code: "jamsil4", name: "잠실4동" },
      { code: "jamsil6", name: "잠실6동" },
      { code: "jamsil7", name: "잠실7동" },
    ],
  },
  yangcheon: {
    guName: "양천구",
    dongs: [
      { code: "mok1", name: "목1동" },
      { code: "mok2", name: "목2동" },
      { code: "mok3", name: "목3동" },
      { code: "mok4", name: "목4동" },
      { code: "mok5", name: "목5동" },
      { code: "sinwol1", name: "신월1동" },
      { code: "sinwol2", name: "신월2동" },
      { code: "sinwol3", name: "신월3동" },
      { code: "sinwol4", name: "신월4동" },
      { code: "sinwol5", name: "신월5동" },
      { code: "sinwol6", name: "신월6동" },
      { code: "sinwol7", name: "신월7동" },
      { code: "sinjeong1", name: "신정1동" },
      { code: "sinjeong2", name: "신정2동" },
      { code: "sinjeong3", name: "신정3동" },
      { code: "sinjeong4", name: "신정4동" },
      { code: "sinjeong6", name: "신정6동" },
      { code: "sinjeong7", name: "신정7동" },
    ],
  },
  yeongdeungpo: {
    guName: "영등포구",
    dongs: [
      { code: "yeongdeungpobon", name: "영등포본동" },
      { code: "yeongdeungpo", name: "영등포동" },
      { code: "yeouido", name: "여의동" },
      { code: "dangsan1", name: "당산1동" },
      { code: "dangsan2", name: "당산2동" },
      { code: "dorim", name: "도림동" },
      { code: "mullae", name: "문래동" },
      { code: "yangpyeong1", name: "양평1동" },
      { code: "yangpyeong2", name: "양평2동" },
      { code: "singil1", name: "신길1동" },
      { code: "singil3", name: "신길3동" },
      { code: "singil4", name: "신길4동" },
      { code: "singil5", name: "신길5동" },
      { code: "singil6", name: "신길6동" },
      { code: "singil7", name: "신길7동" },
      { code: "daerim1", name: "대림1동" },
      { code: "daerim2", name: "대림2동" },
      { code: "daerim3", name: "대림3동" },
    ],
  },
  yongsan: {
    guName: "용산구",
    dongs: [
      { code: "huam", name: "후암동" },
      { code: "yongsan2ga", name: "용산2가동" },
      { code: "namyeong", name: "남영동" },
      { code: "cheongpa", name: "청파동" },
      { code: "wonhyoro1", name: "원효로1동" },
      { code: "wonhyoro2", name: "원효로2동" },
      { code: "hyochang", name: "효창동" },
      { code: "yongmun", name: "용문동" },
      { code: "hangangno", name: "한강로동" },
      { code: "ichon1", name: "이촌1동" },
      { code: "ichon2", name: "이촌2동" },
      { code: "itaewon1", name: "이태원1동" },
      { code: "itaewon2", name: "이태원2동" },
      { code: "hannam", name: "한남동" },
      { code: "seobinggo", name: "서빙고동" },
      { code: "bogwang", name: "보광동" },
    ],
  },
  eunpyeong: {
    guName: "은평구",
    dongs: [
      { code: "nokbeon", name: "녹번동" },
      { code: "bulgwang1", name: "불광1동" },
      { code: "bulgwang2", name: "불광2동" },
      { code: "galhyeon1", name: "갈현1동" },
      { code: "galhyeon2", name: "갈현2동" },
      { code: "gusan", name: "구산동" },
      { code: "daejo", name: "대조동" },
      { code: "eungam1", name: "응암1동" },
      { code: "eungam2", name: "응암2동" },
      { code: "eungam3", name: "응암3동" },
      { code: "yeokchon", name: "역촌동" },
      { code: "ep_sinsa1", name: "신사1동" },
      { code: "ep_sinsa2", name: "신사2동" },
      { code: "jeungsan", name: "증산동" },
      { code: "susaek", name: "수색동" },
      { code: "jingwan", name: "진관동" },
    ],
  },
  jongno: {
    guName: "종로구",
    dongs: [
      { code: "cheongwon_hyoja", name: "청운효자동" },
      { code: "sajik", name: "사직동" },
      { code: "samcheong", name: "삼청동" },
      { code: "buam", name: "부암동" },
      { code: "pyeongchang", name: "평창동" },
      { code: "muak", name: "무악동" },
      { code: "gyonam", name: "교남동" },
      { code: "jongno1234", name: "종로1·2·3·4가동" },
      { code: "jongno56", name: "종로5·6가동" },
      { code: "ihwa", name: "이화동" },
      { code: "hyehwa", name: "혜화동" },
      { code: "changsin1", name: "창신1동" },
      { code: "changsin2", name: "창신2동" },
      { code: "changsin3", name: "창신3동" },
      { code: "sungin1", name: "숭인1동" },
      { code: "sungin2", name: "숭인2동" },
    ],
  },
  junggu: {
    guName: "중구",
    dongs: [
      { code: "sogong", name: "소공동" },
      { code: "hoehyeon", name: "회현동" },
      { code: "myeongdong", name: "명동" },
      { code: "pildong", name: "필동" },
      { code: "jangchung", name: "장충동" },
      { code: "gwanghui", name: "광희동" },
      { code: "euljiro", name: "을지로동" },
      { code: "sindang", name: "신당동" },
      { code: "dasan", name: "다산동" },
      { code: "yaksu", name: "약수동" },
      { code: "cheonggu", name: "청구동" },
      { code: "donghwa", name: "동화동" },
      { code: "hwanghak", name: "황학동" },
      { code: "jungnim", name: "중림동" },
    ],
  },
  jungnang: {
    guName: "중랑구",
    dongs: [
      { code: "myeonmokbon", name: "면목본동" },
      { code: "myeonmok2", name: "면목2동" },
      { code: "myeonmok38", name: "면목3·8동" },
      { code: "myeonmok4", name: "면목4동" },
      { code: "myeonmok5", name: "면목5동" },
      { code: "myeonmok7", name: "면목7동" },
      { code: "sangbong1", name: "상봉1동" },
      { code: "sangbong2", name: "상봉2동" },
      { code: "junghwa1", name: "중화1동" },
      { code: "junghwa2", name: "중화2동" },
      { code: "muk1", name: "묵1동" },
      { code: "muk2", name: "묵2동" },
      { code: "mangubon", name: "망우본동" },
      { code: "mangu3", name: "망우3동" },
      { code: "sinnae1", name: "신내1동" },
      { code: "sinnae2", name: "신내2동" },
    ],
  },
};

// ──────────────────────────────────────────────────────────
// 카카오 주소 검색 API
// ──────────────────────────────────────────────────────────

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocodeDong(
  apiKey: string,
  guName: string,
  dongName: string
): Promise<{ lat: number; lng: number } | null> {
  const query = encodeURIComponent(`서울특별시 ${guName} ${dongName}`);
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${query}&size=1`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `KakaoAK ${apiKey}` },
    });
    if (!res.ok) {
      console.error(`  ❌ geocode failed: ${guName} ${dongName} → ${res.status}`);
      return null;
    }
    const json = await res.json();
    const doc = json.documents?.[0];
    if (!doc) {
      // fallback: 키워드 검색 시도
      return geocodeDongKeyword(apiKey, guName, dongName);
    }
    return { lat: parseFloat(doc.y), lng: parseFloat(doc.x) };
  } catch (err) {
    console.error(`  ❌ geocode error: ${guName} ${dongName}`, err);
    return null;
  }
}

async function geocodeDongKeyword(
  apiKey: string,
  guName: string,
  dongName: string
): Promise<{ lat: number; lng: number } | null> {
  const query = encodeURIComponent(`서울 ${guName} ${dongName} 주민센터`);
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=1`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `KakaoAK ${apiKey}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const doc = json.documents?.[0];
    if (!doc) return null;
    return { lat: parseFloat(doc.y), lng: parseFloat(doc.x) };
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────────────────
// 메인
// ──────────────────────────────────────────────────────────

async function main() {
  // API 키 로드
  let apiKey = process.env.KAKAO_REST_API_KEY || "";
  if (!apiKey) {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      const envContent = fs.readFileSync(envPath, "utf-8");
      const match = envContent.match(/KAKAO_REST_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch { /* ignore */ }
  }
  if (!apiKey) {
    console.error("❌ KAKAO_REST_API_KEY가 .env.local에 없습니다.");
    process.exit(1);
  }

  // --gu 옵션: 특정 구만 수집
  const args = process.argv.slice(2);
  const guIdx = args.indexOf("--gu");
  const targetGus = guIdx >= 0 ? args.slice(guIdx + 1) : null;

  // 기존 좌표 데이터 로드 (부분 수집 시 병합용)
  const outputPath = path.join(process.cwd(), "src", "lib", "tools", "lifestyle", "seoul-dongs.ts");
  let existingCoords: Record<string, Record<string, { lat: number; lng: number }>> = {};
  if (targetGus && fs.existsSync(outputPath)) {
    try {
      const content = fs.readFileSync(outputPath, "utf-8");
      // 간이 파싱: 기존 파일에서 좌표 추출
      const matches = content.matchAll(/code: "([^"]+)",\s*name: "[^"]+",\s*parentCode: "([^"]+)",\s*lat: ([\d.]+),\s*lng: ([\d.]+)/g);
      for (const m of matches) {
        const [, code, parent, lat, lng] = m;
        if (!existingCoords[parent]) existingCoords[parent] = {};
        existingCoords[parent][code] = { lat: parseFloat(lat), lng: parseFloat(lng) };
      }
      console.log(`📂 기존 좌표 데이터 로드 완료\n`);
    } catch { /* ignore */ }
  }

  const guCodes = targetGus || Object.keys(DONG_DATA);
  const totalDongs = guCodes.reduce((sum, gu) => sum + (DONG_DATA[gu]?.dongs.length ?? 0), 0);

  console.log("🚀 서울 행정동 좌표 수집 시작");
  console.log(`   대상: ${guCodes.length}개 구, ${totalDongs}개 동`);
  console.log(`   예상 API 호출: ${totalDongs}~${totalDongs * 2}회\n`);

  // 좌표 수집
  const results: Record<string, Array<{ code: string; name: string; parentCode: string; lat: number; lng: number }>> = {};
  let success = 0;
  let failed = 0;

  for (const guCode of guCodes) {
    const gu = DONG_DATA[guCode];
    if (!gu) { console.error(`❌ 알 수 없는 구: ${guCode}`); continue; }

    console.log(`📍 ${gu.guName} (${guCode}) - ${gu.dongs.length}개 동`);
    results[guCode] = [];

    for (const dong of gu.dongs) {
      const coords = await geocodeDong(apiKey, gu.guName, dong.name);
      await sleep(100);

      if (coords) {
        results[guCode].push({
          code: dong.code,
          name: dong.name,
          parentCode: guCode,
          lat: coords.lat,
          lng: coords.lng,
        });
        success++;
        console.log(`   ✅ ${dong.name} → ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
      } else {
        failed++;
        console.log(`   ❌ ${dong.name} → 좌표 수집 실패`);
      }
    }
    console.log();
  }

  // 기존 데이터와 병합
  for (const [guCode, gu] of Object.entries(DONG_DATA)) {
    if (results[guCode]) continue; // 새로 수집한 구
    if (!existingCoords[guCode]) continue; // 기존 데이터도 없음

    results[guCode] = gu.dongs
      .filter((d) => existingCoords[guCode]?.[d.code])
      .map((d) => ({
        code: d.code,
        name: d.name,
        parentCode: guCode,
        lat: existingCoords[guCode][d.code].lat,
        lng: existingCoords[guCode][d.code].lng,
      }));
  }

  // TypeScript 파일 생성
  const guEntries = Object.keys(DONG_DATA)
    .filter((guCode) => results[guCode]?.length)
    .map((guCode) => {
      const dongs = results[guCode]
        .map(
          (d) =>
            `    { code: "${d.code}", name: "${d.name}", parentCode: "${d.parentCode}", lat: ${d.lat}, lng: ${d.lng} },`
        )
        .join("\n");
      return `  ${guCode}: [\n${dongs}\n  ],`;
    })
    .join("\n");

  const guNameEntries = Object.entries(DONG_DATA)
    .map(([code, gu]) => `  ${code}: "${gu.guName}",`)
    .join("\n");

  const output = `/**
 * 서울 행정동 좌표 데이터 (자동 생성)
 * 생성일: ${new Date().toISOString()}
 * 생성 스크립트: scripts/generate-seoul-dong-coords.ts
 */

export interface DongInfo {
  code: string;
  name: string;
  parentCode: string;
  lat: number;
  lng: number;
}

/** 구 코드 → 한글 이름 */
export const GU_NAMES: Record<string, string> = {
${guNameEntries}
};

/** 구별 행정동 좌표 데이터 */
export const SEOUL_DONGS: Record<string, DongInfo[]> = {
${guEntries}
};

/** 전체 동 수 */
export const TOTAL_DONG_COUNT = Object.values(SEOUL_DONGS).reduce((sum, dongs) => sum + dongs.length, 0);
`;

  fs.writeFileSync(outputPath, output, "utf-8");

  console.log(`✅ 좌표 수집 완료!`);
  console.log(`   성공: ${success}개, 실패: ${failed}개`);
  console.log(`   저장: ${outputPath}`);
}

main().catch((err) => {
  console.error("❌ 에러:", err);
  process.exit(1);
});
