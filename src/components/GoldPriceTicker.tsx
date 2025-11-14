"use client";

import { useEffect, useState } from "react";

type GoldPriceResponse = {
  rate20k: number | null;
  rate22k: number | null;
  currency: string;
  isDemo?: boolean;
  updatedAt?: string;
  message?: string;
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
      } catch (err) {
        console.error(err);
        setError("Unable to load live gold rate right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60_000);
    return () => clearInterval(interval);
  }, []);

  const isDemo =
    data?.isDemo ||
    (!data?.rate20k && !data?.rate22k);

  return (
    <section
      id="gold-price"
      className="border-y border-border bg-secondary text-sm"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#5a1024] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Gold Rate Today
          </span>
          {loading && (
            <span className="text-xs text-muted-foreground">
              Fetching latest rate…
            </span>
          )}
          {error && (
            <span className="text-xs text-destructive">{error}</span>
          )}
          {!loading && !error && data && (
            <span className="text-sm font-medium text-[#2b2b2b]">
              {data.rate20k || data.rate22k ? (
                <>
                  {data.rate22k && (
                    <span>
                      22K:&nbsp;
                      ₹
                      {data.rate22k.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                      /g
                    </span>
                  )}
                  {data.rate22k && data.rate20k && (
                    <span className="mx-2">•</span>
                  )}
                  {data.rate20k && (
                    <span>
                      20K:&nbsp;
                      ₹
                      {data.rate20k.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                      /g
                    </span>
                  )}
                </>
              ) : (
                "Rate currently unavailable"
              )}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          {data?.updatedAt && (
            <span>
              Updated:&nbsp;
              {new Date(data.updatedAt).toLocaleString("en-IN", {
                hour12: true,
              })}
            </span>
          )}
          {isDemo && (
            <span>
              (Set gold rate from Admin → Settings once to enable this ticker.)
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default GoldPriceTicker;
