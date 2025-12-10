"use client";

import { useEffect, useMemo, useState } from "react";
import type { SalesEntry } from "@/data/sales";
import { years as fallbackYears } from "@/data/sales";
import { SectionCard } from "@/components/atoms/SectionCard";
import { YearSelector } from "@/components/molecules/YearSelector";
import { ChartType, SalesChart } from "@/components/organisms/SalesChart";

const currency = (value: number) => `$${value.toLocaleString()}`;

export default function Home() {
  const [availableYears, setAvailableYears] = useState<string[]>(fallbackYears);
  const [selectedYear, setSelectedYear] = useState<string>(fallbackYears[0]);
  const [chartData, setChartData] = useState<SalesEntry[]>([]);
  const [threshold, setThreshold] = useState<number>(15000);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    setLoading(true);
    setError(null);

    fetch(`/api/sales?year=${selectedYear}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unable to load sales data.");
        }
        return res.json();
      })
      .then((payload) => {
        if (!isCurrent) return;
        setChartData(payload.data ?? []);
        if (payload.years) {
          setAvailableYears(payload.years);
        }
      })
      .catch((err: Error) => {
        if (isCurrent) {
          setError(err.message);
          setChartData([]);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [selectedYear]);

  const filteredData = useMemo(
    () => chartData.filter((entry) => entry.sales >= threshold),
    [chartData, threshold],
  );

  const total = filteredData.reduce((sum, entry) => sum + entry.sales, 0);
  const avg = filteredData.length ? Math.round(total / filteredData.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 px-6 py-12 text-zinc-900">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-700">
            Atomic structure • dashboard
          </p>
          <h1 className="text-3xl font-semibold">Sales Overview</h1>
          <p className="max-w-2xl text-sm text-zinc-600">
            Live sales are now fetched from the API route, with controls to set
            your own threshold and switch between bar, line, or pie charts.
          </p>
        </header>

        <SectionCard
          title="Select Year"
          subtitle="Data loads on demand from the sales API by year."
        >
          <YearSelector
            years={availableYears}
            selected={selectedYear}
            onSelect={setSelectedYear}
          />
        </SectionCard>

        <SectionCard
          title={`Sales in ${selectedYear}`}
          subtitle="Filter by threshold and switch chart styles without leaving the page."
        >
          <div className="mb-4 flex flex-wrap gap-3 text-sm text-zinc-600">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Threshold
              </span>
              <input
                type="number"
                min={0}
                value={threshold}
                onChange={(event) => setThreshold(Number(event.target.value) || 0)}
                className="w-28 rounded-md border border-slate-200 px-2 py-1 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Chart
              </span>
              {(["bar", "line", "pie"] as ChartType[]).map((type) => {
                const isActive = type === chartType;
                const label = type === "pie" ? "Pie" : type === "line" ? "Line" : "Bar";
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setChartType(type)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      isActive
                        ? "bg-sky-600 text-white shadow-md shadow-sky-200"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700"
                    }`}
                    aria-pressed={isActive}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <span className="rounded-full bg-sky-50 px-3 py-1 font-semibold text-sky-700">
              Total: {currency(total)}
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
              Avg / month: {avg ? currency(avg) : "—"}
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
              Showing {filteredData.length} of {chartData.length} months
            </span>
          </div>

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : loading ? (
            <div className="h-80 animate-pulse rounded-xl bg-slate-100" aria-busy="true" />
          ) : (
            <SalesChart
              data={filteredData}
              year={selectedYear}
              chartType={chartType}
              threshold={threshold}
            />
          )}
        </SectionCard>
      </main>

      <footer className="mx-auto mt-10 w-full max-w-4xl border-t border-slate-200 pt-6 text-sm text-slate-600">
        <p className="flex flex-wrap items-center gap-2">
          <span>© {new Date().getFullYear()} Ankit Sharma.</span>
          <span>All rights reserved.</span>
          <a
            className="text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-800"
            href="mailto:ankit676756@gmail.com"
          >
            ankit676756@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}