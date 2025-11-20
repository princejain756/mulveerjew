"use client";

import { useEffect, useState } from "react";

type GoldPriceResponse = {
  rate22k: number | null;
  rate18k: number | null;
  silverRate: number | null;
  currency: string;
  isDemo?: boolean;
  updatedAt?: string;
  message?: string;
};

const formatRate = (value: number | null | undefined) => {
  if (value === null || value === undefined) return null;
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}/g`;
};

const GoldPriceTicker = () => {
  const [data, setData] = useState<GoldPriceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/gold-price");
        if (!res.ok) {
          throw new Error("Failed to load gold price");
        }
        const json = (await res.json()) as GoldPriceResponse;
        setData(json);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to load live bullion rate right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60_000);
    return () => clearInterval(interval);
  }, []);

  const isDemo =
    data?.isDemo || (!data?.rate22k && !data?.rate18k && !data?.silverRate);

  const segments = [
    {
      key: "rate22k" as const,
      label: "22K Gold",
      tag: "Wedding Classics",
      description: "Flagship showroom price",
      value: data?.rate22k,
      gradient:
        "from-[#fff6dc] via-[#ffe9be] to-[#ffd79e] border-[#f7d9a5] text-[#2d160b]",
    },
    {
      key: "rate18k" as const,
      label: "18K Gold",
      tag: "Designer Picks",
      description: "Luxury couture rate",
      value: data?.rate18k,
      gradient:
        "from-[#f6ecff] via-[#ebdbff] to-[#dcc7ff] border-[#e3cff9] text-[#281740]",
    },
    {
      key: "silverRate" as const,
      label: "Silver",
      tag: "Sterling",
      description: "Investment grade",
      value: data?.silverRate,
      gradient:
        "from-[#f7fbff] via-[#eef5ff] to-[#dfeeff] border-[#d2e4f8] text-[#102437]",
    },
  ];

  return (
    <section id="gold-price" className="bg-[#14070f] text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#f4d8aa] bg-[#f7e4b7]/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#f7d085]">
                Daily Rate Board
              </span>
              {loading && (
                <span className="text-xs text-[#d7c1b5]">
                  Refreshing current rates…
                </span>
              )}
              {!loading && error && (
                <span className="text-xs text-red-200">{error}</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#d6c5b8]">
              {data?.updatedAt && (
                <span>
                  Updated&nbsp;
                  {new Date(data.updatedAt).toLocaleString("en-IN", {
                    hour12: true,
                  })}
                </span>
              )}
              {isDemo && (
                <span>(Set rates inside Admin → Settings.)</span>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {segments.map((segment) => (
              <div
                key={segment.key}
                className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${segment.gradient} p-5 shadow-[0_15px_35px_rgba(0,0,0,0.25)]`}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">
                  <span>{segment.tag}</span>
                  <span>Per gram</span>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <p className="text-sm font-medium opacity-80">{segment.description}</p>
                  <p className="text-3xl font-black tracking-tight">
                    {formatRate(segment.value) || 'Update in Admin'}
                  </p>
                  <p className="text-base font-semibold opacity-80">{segment.label}</p>
                </div>
              </div>
            ))}
          </div>

          {!loading && !error && !data?.rate22k && !data?.rate18k && !data?.silverRate && (
            <p className="text-center text-xs text-[#ddc7ba]">
              Rates will appear here immediately after saving them from the admin panel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GoldPriceTicker;
