"use client";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgStyles = {
    success: "bg-green-600 text-white border-green-700",
    error: "bg-red-600 text-white border-red-700",
    info: "bg-blue-600 text-white border-blue-700",
  };
  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all max-w-sm w-[90%] duration-500 ${bgStyles[type]}`}
    >
      <span>{icons[type]}</span> <p className="flex-1 ">{message}</p>
      <button
        className="hover:opacity-70 font-bold ml-2 text-xs shrink-0 underline decoration-dotted"
        onClick={onClose}
      >
        Dismiss
      </button>
    </div>
  );
}
