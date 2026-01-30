import type {
  MortgageProduct,
  MortgageData,
  JeonseLoanProduct,
  JeonseLoanData,
  CreditLoanProduct,
  CreditLoanData,
} from "./loan-types";

// === 주택담보대출 샘플 ===
const mortgageSample: MortgageProduct[] = [
  { bankName: "우리은행", productName: "우리아파트론", joinWay: "영업점,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "변동금리", minRate: 3.84, maxRate: 5.04, avgRate: 4.45, earlyRepayFee: "중도상환대출금×0.95%×잔존기간÷대출기간", loanLimit: "LTV 70%" },
  { bankName: "우리은행", productName: "우리아파트론", joinWay: "영업점,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "고정금리", minRate: 4.12, maxRate: 5.32, avgRate: 4.63, earlyRepayFee: "중도상환대출금×0.71%×잔존기간÷대출기간", loanLimit: "LTV 70%" },
  { bankName: "KB국민은행", productName: "KB주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "변동금리", minRate: 3.78, maxRate: 5.18, avgRate: 4.35, earlyRepayFee: "1.4% 이내", loanLimit: "LTV 70%" },
  { bankName: "KB국민은행", productName: "KB주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "고정금리", minRate: 4.05, maxRate: 5.25, avgRate: 4.58, earlyRepayFee: "1.4% 이내", loanLimit: "LTV 70%" },
  { bankName: "KB국민은행", productName: "KB주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "혼합금리", minRate: 3.92, maxRate: 5.12, avgRate: 4.42, earlyRepayFee: "1.4% 이내", loanLimit: "LTV 70%" },
  { bankName: "신한은행", productName: "신한주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "변동금리", minRate: 3.82, maxRate: 5.22, avgRate: 4.40, earlyRepayFee: "1.2% 이내", loanLimit: "LTV 70%" },
  { bankName: "신한은행", productName: "신한주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "고정금리", minRate: 4.10, maxRate: 5.30, avgRate: 4.60, earlyRepayFee: "1.2% 이내", loanLimit: "LTV 70%" },
  { bankName: "하나은행", productName: "하나주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "변동금리", minRate: 3.80, maxRate: 5.10, avgRate: 4.38, earlyRepayFee: "1.3% 이내", loanLimit: "LTV 70%" },
  { bankName: "하나은행", productName: "하나주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "고정금리", minRate: 4.08, maxRate: 5.28, avgRate: 4.55, earlyRepayFee: "1.3% 이내", loanLimit: "LTV 70%" },
  { bankName: "NH농협은행", productName: "NH주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "변동금리", minRate: 3.85, maxRate: 5.15, avgRate: 4.42, earlyRepayFee: "1.2% 이내", loanLimit: "LTV 70%" },
  { bankName: "NH농협은행", productName: "NH주택담보대출", joinWay: "영업점,인터넷,스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "고정금리", minRate: 4.15, maxRate: 5.35, avgRate: 4.65, earlyRepayFee: "1.2% 이내", loanLimit: "LTV 70%" },
  { bankName: "카카오뱅크", productName: "카카오뱅크 주택담보대출", joinWay: "스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "변동금리", minRate: 3.65, maxRate: 4.85, avgRate: 4.15, earlyRepayFee: "1.0% 이내", loanLimit: "LTV 70%" },
  { bankName: "카카오뱅크", productName: "카카오뱅크 주택담보대출", joinWay: "스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "혼합금리", minRate: 3.75, maxRate: 4.95, avgRate: 4.25, earlyRepayFee: "1.0% 이내", loanLimit: "LTV 70%" },
  { bankName: "토스뱅크", productName: "토스뱅크 주택담보대출", joinWay: "스마트폰", mortgageType: "아파트", repayType: "분할상환방식", rateType: "변동금리", minRate: 3.60, maxRate: 4.80, avgRate: 4.10, earlyRepayFee: "0.9% 이내", loanLimit: "LTV 70%" },
];

export function getSampleMortgageData(): MortgageData {
  return { products: mortgageSample, updatedAt: new Date().toISOString(), isLive: false };
}

// === 전세자금대출 샘플 ===
const jeonseSample: JeonseLoanProduct[] = [
  { bankName: "우리은행", productName: "우리전세론", joinWay: "영업점,스마트폰", repayType: "만기일시상환방식", rateType: "변동금리", minRate: 3.72, maxRate: 4.82, avgRate: 4.25, earlyRepayFee: "0.8% 이내", loanLimit: "보증금의 80%" },
  { bankName: "우리은행", productName: "우리전세론", joinWay: "영업점,스마트폰", repayType: "만기일시상환방식", rateType: "고정금리", minRate: 3.95, maxRate: 5.05, avgRate: 4.45, earlyRepayFee: "0.6% 이내", loanLimit: "보증금의 80%" },
  { bankName: "KB국민은행", productName: "KB전세자금대출", joinWay: "영업점,인터넷,스마트폰", repayType: "만기일시상환방식", rateType: "변동금리", minRate: 3.68, maxRate: 4.78, avgRate: 4.20, earlyRepayFee: "0.7% 이내", loanLimit: "보증금의 80%" },
  { bankName: "KB국민은행", productName: "KB전세자금대출", joinWay: "영업점,인터넷,스마트폰", repayType: "만기일시상환방식", rateType: "고정금리", minRate: 3.90, maxRate: 5.00, avgRate: 4.40, earlyRepayFee: "0.5% 이내", loanLimit: "보증금의 80%" },
  { bankName: "신한은행", productName: "신한전세대출", joinWay: "영업점,인터넷,스마트폰", repayType: "만기일시상환방식", rateType: "변동금리", minRate: 3.70, maxRate: 4.80, avgRate: 4.22, earlyRepayFee: "0.7% 이내", loanLimit: "보증금의 80%" },
  { bankName: "신한은행", productName: "신한전세대출", joinWay: "영업점,인터넷,스마트폰", repayType: "만기일시상환방식", rateType: "고정금리", minRate: 3.92, maxRate: 5.02, avgRate: 4.42, earlyRepayFee: "0.5% 이내", loanLimit: "보증금의 80%" },
  { bankName: "하나은행", productName: "하나전세론", joinWay: "영업점,인터넷,스마트폰", repayType: "만기일시상환방식", rateType: "변동금리", minRate: 3.65, maxRate: 4.75, avgRate: 4.18, earlyRepayFee: "0.7% 이내", loanLimit: "보증금의 80%" },
  { bankName: "NH농협은행", productName: "NH전세자금대출", joinWay: "영업점,인터넷,스마트폰", repayType: "만기일시상환방식", rateType: "변동금리", minRate: 3.75, maxRate: 4.85, avgRate: 4.28, earlyRepayFee: "0.8% 이내", loanLimit: "보증금의 80%" },
  { bankName: "카카오뱅크", productName: "카카오뱅크 전세대출", joinWay: "스마트폰", repayType: "만기일시상환방식", rateType: "변동금리", minRate: 3.55, maxRate: 4.65, avgRate: 4.05, earlyRepayFee: "0.5% 이내", loanLimit: "보증금의 80%" },
  { bankName: "토스뱅크", productName: "토스뱅크 전세대출", joinWay: "스마트폰", repayType: "만기일시상환방식", rateType: "변동금리", minRate: 3.50, maxRate: 4.60, avgRate: 4.00, earlyRepayFee: "0.5% 이내", loanLimit: "보증금의 80%" },
  { bankName: "IBK기업은행", productName: "IBK전세자금대출", joinWay: "영업점,인터넷,스마트폰", repayType: "만기일시상환방식", rateType: "변동금리", minRate: 3.70, maxRate: 4.80, avgRate: 4.22, earlyRepayFee: "0.7% 이내", loanLimit: "보증금의 80%" },
];

export function getSampleJeonseLoanData(): JeonseLoanData {
  return { products: jeonseSample, updatedAt: new Date().toISOString(), isLive: false };
}

// === 개인신용대출 샘플 ===
const creditSample: CreditLoanProduct[] = [
  { bankName: "우리은행", productName: "협약금리 外 신용대출상품", joinWay: "영업점,인터넷,스마트폰", cbName: "KCB", productType: "일반신용대출", rates: { crdt_grad_1: 5.19, crdt_grad_4: 6.01, crdt_grad_5: 6.68, crdt_grad_6: 7.45, crdt_grad_10: 7.97, crdt_grad_11: 10.18, crdt_grad_12: 11.87, crdt_grad_13: 11.67 }, avgRate: 5.81 },
  { bankName: "KB국민은행", productName: "KB신용대출", joinWay: "영업점,인터넷,스마트폰", cbName: "KCB", productType: "일반신용대출", rates: { crdt_grad_1: 4.95, crdt_grad_4: 5.85, crdt_grad_5: 6.52, crdt_grad_6: 7.30, crdt_grad_10: 8.15, crdt_grad_11: 10.05, crdt_grad_12: 11.50, crdt_grad_13: 11.80 }, avgRate: 5.65 },
  { bankName: "신한은행", productName: "쏠편한 신용대출", joinWay: "영업점,인터넷,스마트폰", cbName: "NICE", productType: "일반신용대출", rates: { crdt_grad_1: 5.05, crdt_grad_4: 5.92, crdt_grad_5: 6.58, crdt_grad_6: 7.38, crdt_grad_10: 8.05, crdt_grad_11: 10.12, crdt_grad_12: 11.65, crdt_grad_13: 11.72 }, avgRate: 5.72 },
  { bankName: "하나은행", productName: "하나신용대출", joinWay: "영업점,인터넷,스마트폰", cbName: "KCB", productType: "일반신용대출", rates: { crdt_grad_1: 5.10, crdt_grad_4: 5.98, crdt_grad_5: 6.62, crdt_grad_6: 7.42, crdt_grad_10: 8.10, crdt_grad_11: 10.15, crdt_grad_12: 11.70, crdt_grad_13: 11.75 }, avgRate: 5.78 },
  { bankName: "NH농협은행", productName: "NH올원신용대출", joinWay: "영업점,인터넷,스마트폰", cbName: "NICE", productType: "일반신용대출", rates: { crdt_grad_1: 5.15, crdt_grad_4: 6.05, crdt_grad_5: 6.70, crdt_grad_6: 7.50, crdt_grad_10: 8.20, crdt_grad_11: 10.22, crdt_grad_12: 11.85, crdt_grad_13: 11.90 }, avgRate: 5.85 },
  { bankName: "카카오뱅크", productName: "카카오뱅크 신용대출", joinWay: "스마트폰", cbName: "KCB", productType: "일반신용대출", rates: { crdt_grad_1: 4.50, crdt_grad_4: 5.45, crdt_grad_5: 6.15, crdt_grad_6: 7.00, crdt_grad_10: 8.50, crdt_grad_11: 10.50, crdt_grad_12: 12.00, crdt_grad_13: 12.20 }, avgRate: 5.30 },
  { bankName: "토스뱅크", productName: "토스뱅크 신용대출", joinWay: "스마트폰", cbName: "KCB", productType: "일반신용대출", rates: { crdt_grad_1: 4.40, crdt_grad_4: 5.35, crdt_grad_5: 6.05, crdt_grad_6: 6.90, crdt_grad_10: 8.40, crdt_grad_11: 10.40, crdt_grad_12: 11.90, crdt_grad_13: 12.10 }, avgRate: 5.20 },
  { bankName: "케이뱅크", productName: "코드K 신용대출", joinWay: "스마트폰", cbName: "NICE", productType: "일반신용대출", rates: { crdt_grad_1: 4.55, crdt_grad_4: 5.50, crdt_grad_5: 6.20, crdt_grad_6: 7.05, crdt_grad_10: 8.55, crdt_grad_11: 10.55, crdt_grad_12: 12.05, crdt_grad_13: 12.25 }, avgRate: 5.35 },
  { bankName: "IBK기업은행", productName: "IBK신용대출", joinWay: "영업점,인터넷,스마트폰", cbName: "KCB", productType: "일반신용대출", rates: { crdt_grad_1: 5.00, crdt_grad_4: 5.90, crdt_grad_5: 6.55, crdt_grad_6: 7.35, crdt_grad_10: 8.00, crdt_grad_11: 10.08, crdt_grad_12: 11.55, crdt_grad_13: 11.60 }, avgRate: 5.68 },
  { bankName: "SC제일은행", productName: "퍼스트 신용대출", joinWay: "영업점,인터넷,스마트폰", cbName: "NICE", productType: "일반신용대출", rates: { crdt_grad_1: 4.85, crdt_grad_4: 5.78, crdt_grad_5: 6.45, crdt_grad_6: 7.25, crdt_grad_10: 7.95, crdt_grad_11: 10.00, crdt_grad_12: 11.45, crdt_grad_13: 11.55 }, avgRate: 5.58 },
];

export function getSampleCreditLoanData(): CreditLoanData {
  return { products: creditSample, updatedAt: new Date().toISOString(), isLive: false };
}
