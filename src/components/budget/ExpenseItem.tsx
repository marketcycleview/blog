"use client";

import { useState } from "react";
import type { Expense, ExpenseCategory } from "@/lib/budget";
import {
  EXPENSE_CATEGORIES,
  CATEGORY_ORDER,
  getItemById,
  formatCurrency,
} from "@/lib/budget";

interface ExpenseItemProps {
  expense: Expense;
  onChangeCategory: (expenseId: string, category: ExpenseCategory) => void;
  onDelete: (expenseId: string) => void;
}

export default function ExpenseItem({
  expense,
  onChangeCategory,
  onDelete,
}: ExpenseItemProps) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const item = getItemById(expense.itemId);
  const category = EXPENSE_CATEGORIES[expense.category];

  if (!item) {
    return null;
  }

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-gray-50"
      style={{ borderColor: category.borderColor }}
    >
      {/* 항목 정보 */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{item.label}</p>
        {expense.memo && (
          <p className="text-sm text-gray-500 truncate">{expense.memo}</p>
        )}
      </div>

      {/* 금액 */}
      <div className="text-right shrink-0">
        <p className="font-bold">{formatCurrency(expense.amount)}원</p>
      </div>

      {/* 카테고리 변경 버튼 */}
      <div className="relative">
        <button
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="카테고리 변경"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: category.color }}
          />
        </button>

        {/* 카테고리 변경 메뉴 */}
        {showCategoryMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowCategoryMenu(false)}
            />
            <div className="absolute right-0 top-full mt-1 z-20 bg-white border rounded-lg shadow-lg py-1 min-w-[140px]">
              {CATEGORY_ORDER.map((catId) => {
                const cat = EXPENSE_CATEGORIES[catId];
                const isSelected = expense.category === catId;
                return (
                  <button
                    key={catId}
                    onClick={() => {
                      onChangeCategory(expense.id, catId);
                      setShowCategoryMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 ${
                      isSelected ? "font-medium" : ""
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span>{cat.label}</span>
                    {isSelected && <span className="ml-auto">✓</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 삭제 버튼 */}
      <div className="relative">
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="삭제"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                onDelete(expense.id);
                setShowDeleteConfirm(false);
              }}
              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              삭제
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
