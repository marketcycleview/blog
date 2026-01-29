"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/budget";

interface IncomeSectionProps {
  income: number;
  onChange: (income: number) => void;
}

export default function IncomeSection({ income, onChange }: IncomeSectionProps) {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // 초기값 설정
  useEffect(() => {
    if (income > 0) {
      setInputValue(income.toString());
    }
  }, [income]);

  const handleSubmit = () => {
    const value = parseInt(inputValue.replace(/,/g, ""), 10);
    if (!isNaN(value) && value >= 0) {
      onChange(value);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
    if (e.key === "Escape") {
      setInputValue(income > 0 ? income.toString() : "");
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 허용
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(value);
  };

  // 빠른 입력 버튼
  const quickAmounts = [
    { label: "200만", value: 2000000 },
    { label: "300만", value: 3000000 },
    { label: "400만", value: 4000000 },
    { label: "500만", value: 5000000 },
  ];

  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>💰</span>
        <span>월 수입</span>
      </h3>

      {/* 수입 표시 / 입력 */}
      {!isEditing && income > 0 ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(income)}
              <span className="text-lg font-normal text-gray-500 ml-1">원</span>
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            수정
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                inputMode="numeric"
                value={inputValue ? formatCurrency(parseInt(inputValue, 10)) : ""}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="월 수입을 입력하세요"
                className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                원
              </span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!inputValue}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              확인
            </button>
          </div>

          {/* 빠른 입력 */}
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => {
                  setInputValue(value.toString());
                  onChange(value);
                  setIsEditing(false);
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {label}원
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
