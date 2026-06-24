"use client";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  date?: string;
  description?: string;
  onEdit?: () => void;
};

export default function DetailsModal({ open, onClose, title, date, description, onEdit }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-[95%] bg-white rounded-xl p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            {date && <p className="text-sm text-slate-500 mt-1">{date}</p>}
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-3 py-1 rounded-md bg-amber-400 text-sm font-medium hover:bg-amber-300"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-md bg-slate-100 text-sm hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          {description || <em>No description provided.</em>}
        </div>
      </div>
    </div>
  );
}