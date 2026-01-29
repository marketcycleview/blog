"use client";

import { useState } from "react";
import type { ExpenseCategory, ExpenseGroup } from "@/lib/budget";
import {
  EXPENSE_CATEGORIES,
  EXPENSE_GROUPS,
  EXPENSE_ITEMS,
  CATEGORY_ORDER,
  formatCurrency,
} from "@/lib/budget";

interface ExpenseFormProps {
  onAdd: (itemId: string, amount: number, category: ExpenseCategory) => void;
}

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [selectedGroup, setSelectedGroup] = useState<ExpenseGroup | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("essential");
  const [isExpanded, setIsExpanded] = useState(false);

  // 선택된 그룹의 항목들
  const groupItems = selectedGroup
    ? EXPENSE_ITEMS.filter((item) => item.group === selectedGroup)
    : [];

  // 선택된 항목 정보
  const selectedItem = EXPENSE_ITEMS.find((item) => item.id === selectedItemId);

  const handleItemSelect = (itemId: string) => {
    const item = EXPENSE_ITEMS.find((i) => i.id === itemId);
    if (item) {
      setSelectedItemId(itemId);
      setCategory(item.defaultCategory); // 기본 카테고리로 설정
    }
  };

  const handleSubmit = () => {
    const amountNum = parseInt(amount.replace(/,/g, ""), 10);
    if (selectedItemId && !isNaN(amountNum) && amountNum > 0) {
      onAdd(selectedItemId, amountNum, category);
      // 폼 초기화
      setAmount("");
      setSelectedItemId("");
      setSelectedGroup(null);
      setIsExpanded(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  // 빠른 금액 입력
  const quickAmounts = [
    { label: "1만", value: 10000 },
    { label: "5만", value: 50000 },
    { label: "10만", value: 100000 },
    { label: "30만", value: 300000 },
  ];

  // 그룹 목록
  const groups = Object.values(EXPENSE_GROUPS);

  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span>➕</span>
          <span>지출 추가</span>
        </h3>
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            새 지출 추가
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Step 1: 그룹 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1. 지출 분야 선택
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setSelectedGroup(group.id);
                    setSelectedItemId("");
                  }}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    selectedGroup === group.id
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-1">{group.icon}</span>
                  <span>{group.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: 항목 선택 */}
          {selectedGroup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2. 세부 항목 선택
              </label>
              <div className="flex flex-wrap gap-2">
                {groupItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemSelect(item.id)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      selectedItemId === item.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: 금액 입력 */}
          {selectedItemId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3. 금액 입력
              </label>
              <div className="flex gap-2 mb-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={amount ? formatCurrency(parseInt(amount, 10)) : ""}
                    onChange={handleAmountChange}
                    placeholder="금액 입력"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    원
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setAmount(value.toString())}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    +{label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: 카테고리 선택 */}
          {selectedItemId && amount && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                4. 카테고리 선택
                <span className="font-normal text-gray-500 ml-2">
                  (같은 항목도 상황에 따라 다르게 분류 가능)
                </span>
              </label>
              <div className="flex gap-2">
                {CATEGORY_ORDER.map((catId) => {
                  const cat = EXPENSE_CATEGORIES[catId];
                  const isSelected = category === catId;
                  return (
                    <button
                      key={catId}
                      onClick={() => setCategory(catId)}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-current"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{
                        backgroundColor: isSelected ? cat.bgColor : "white",
                        borderColor: isSelected ? cat.color : undefined,
                        color: isSelected ? cat.color : undefined,
                      }}
                    >
                      <div className="font-medium">{cat.label}</div>
                      <div className="text-xs opacity-70">
                        권장 {cat.recommendedMin}-{cat.recommendedMax}%
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedItem && (
                <p className="mt-2 text-sm text-gray-500">
                  💡 <strong>{selectedItem.label}</strong>의 기본 분류는{" "}
                  <strong>
                    {EXPENSE_CATEGORIES[selectedItem.defaultCategory].label}
                  </strong>
                  이지만, 상황에 따라 자유롭게 변경할 수 있어요.
                </p>
              )}
            </div>
          )}

          {/* 추가 버튼 */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setIsExpanded(false);
                setSelectedGroup(null);
                setSelectedItemId("");
                setAmount("");
              }}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedItemId || !amount}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              지출 추가하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
