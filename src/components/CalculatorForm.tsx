"use client";

import { useState, useEffect } from "react";
import {
  IS_PAYMENT_ENABLED,
  PAYMENT_AMOUNT_NAIRA,
  CALCULATOR_CHANCES_KEY,
} from "../var/var";
import { loadPaystackScript, launchPaystackCheckout } from "../utils/paystack";
import Toast from "@/src/components/Toast";

const GRADE_POINTS: Record<string, number> = {
  A1: 90,
  B2: 80,
  B3: 70,
  C4: 60,
  C5: 50,
  C6: 40,
  D7: 0,
  E8: 0,
  F9: 0,
};

const sittingsArr: string[] = ["1", "2"];

export default function CalculatorForm() {
  const [jambScore, setJambScore] = useState<string>("");
  const [grades, setGrades] = useState<string[]>(["", "", "", ""]);
  const [sittings, setSittings] = useState<string>("1");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [chances, setChances] = useState<number>(() => {
    //Preventing SSR errors from nextjs
    if (typeof window !== "undefined") {
      const savedChances = localStorage.getItem(CALCULATOR_CHANCES_KEY);
      return savedChances ? parseInt(savedChances, 10) : 0;
    }
    return 0;
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    if (IS_PAYMENT_ENABLED) {
      loadPaystackScript().then((loaded) => setIsScriptLoaded(loaded));
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  });

  useEffect(() => {
    localStorage.setItem(CALCULATOR_CHANCES_KEY, chances.toString());
  }, [chances]);

  useEffect(() => {
    const handleOnline = () => {
      setToast({
        message: "Connection restored! You are back online.",
        type: "success",
      });
    };

    const handleOffline = () => {
      setToast({
        message: "Network disconnected. Please check your internet connection.",
        type: "error",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    //Clean up

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleGradeChange = (index: number, val: string) => {
    const nextGrades = [...grades];
    nextGrades[index] = val;
    setGrades(nextGrades);
  };
  const handleReset = () => {
    // setResult(null);
    setJambScore("");
    setGrades(["", "", "", ""]);
    setSittings("1");
  };
  const calcAggregate = (jambNum: number) => {
    // setIsLoading(true);
    // setResult(null);

    setTimeout(() => {
      const jambComponent = jambNum * 0.9;
      const oLevelSum = grades.reduce(
        (acc, curr) => acc + GRADE_POINTS[curr],
        0,
      );
      const sittingPoints = sittings === "1" ? 40 : 0;

      const screeningComponent = (oLevelSum + sittingPoints) * 0.1;
      setIsLoading(false);
      setResult(Number((jambComponent + screeningComponent).toFixed(2)));
      setToast({
        message: "Aggregate calculated successfully!",
        type: "success",
      });
      handleReset();
    }, 2000);
  };

  const handleCalculate = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //Guard clause
    if (!navigator.onLine) {
      setToast({
        message: "Cannot calculate. You are currently offline",
        type: "error",
      });
      return;
    }

    const jambNum = parseFloat(jambScore);
    if (isNaN(jambNum) || jambNum < 0 || jambNum > 400) {
      setToast({
        message: "Enter a valid JAMB score (0-400)",
        type: "error",
      });
      return;
    }
    if (grades.some((g) => g === "")) {
      setToast({ message: "Please select all 4 0'Level", type: "info" });
      return;
    }

    if (IS_PAYMENT_ENABLED && chances === 0) {
      if (!isScriptLoaded) {
        setToast({
          message: "Payment module loading... please try again.",
          type: "info",
        });

        return;
      }
      setIsLoading(true);

      launchPaystackCheckout({
        onSuccess: () => {
          setChances(3);
          setToast({
            message: "Payment successful! You received 3 calcuation chances.",
            type: "success",
          });
          calcAggregate(jambNum);
        },
        onCancel: () => {
          setToast({
            message: "Payment cancelled. Pay to receive calculation tokens.",
            type: "error",
          });
          setIsLoading(false);
          // return;
        },
      });
    } else {
      if (IS_PAYMENT_ENABLED) {
        setChances((prev) => Math.max(0, prev - 1));
      }

      setIsLoading(true);
      calcAggregate(jambNum);
    }
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* JAMB Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ">
              JAMB Score
            </label>
            <input
              type="number"
              placeholder="e.g. 285"
              value={jambScore}
              onChange={(e) => setJambScore(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent outline-none focus:border-orange-500 transition text-sm"
              required
            />
          </div>

          {/* Grades Select Grid */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              4 O'Level Grades
            </label>
            <div className="grid grid-cols-2 gap-3">
              {grades.map((grade, index) => (
                <select
                  key={index}
                  value={grade}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:border-orange-500 text-sm transition"
                  required
                >
                  <option value="">Subject {index + 1}</option>
                  {Object.keys(GRADE_POINTS).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>

          {/* Sittings */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Sittings
            </label>
            <div className="flex gap-6">
              {sittingsArr.map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    checked={sittings === s}
                    onChange={() => setSittings(s)}
                    className="accent-orange-500"
                  />
                  {s === "1"
                    ? "One Sitting (+40 pts)"
                    : "Two Sittings (+0 pts)"}
                </label>
              ))}
            </div>
          </div>

          {IS_PAYMENT_ENABLED && isMounted && (
            <div className="text-center mt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-500 animate-pulse">
                {chances === 0
                  ? `🔒 No chances left. Pay N${PAYMENT_AMOUNT_NAIRA} to unlock 3 calculations `
                  : `⚡ Number of chances left: ${chances}`}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition shadow-md"
          >
            Calculate Score
          </button>
        </form>
        {result !== null && (
          <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-xl text-center">
            <p className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">
              Your Aggregate
            </p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-1">
              {result}
            </h2>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center text-white">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin "></div>
          <p className="mt-4 text-sm font-semibold tracking-wide ">
            Processing UNN Screening Criteria
          </p>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
