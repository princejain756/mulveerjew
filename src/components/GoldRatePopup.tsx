"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type GoldRateData = {
  rate22k: number | null;
  rate18k: number | null;
  silverRate: number | null;
  currency: string;
  isDemo?: boolean;
  updatedAt?: string;
  message?: string;
};

type GoldRatePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const formatValue = (value: number | null | undefined) => {
  if (value === null || value === undefined) {
    return "Update via Admin";
  }
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}/g`;
};

const GoldRatePopup = ({ isOpen, onClose }: GoldRatePopupProps) => {
  const [data, setData] = useState<GoldRateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);

    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/gold-price");
        if (!res.ok) {
          throw new Error("Failed to load gold price");
        }
        const json = (await res.json()) as GoldRateData;
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
  }, [isOpen]);

  if (!isOpen) return null;

  const segments = [
    {
      label: "22K Gold",
      tag: "Wedding Classics",
      description: "Everyday heirlooms",
      value: data?.rate22k,
      gradient: "from-white/90 via-[#fff0d9] to-[#ffdba5]",
      textColor: "text-[#2f190a]",
    },
    {
      label: "18K Gold",
      tag: "Couture",
      description: "Designer edits",
      value: data?.rate18k,
      gradient: "from-white/90 via-[#f5e7ff] to-[#e7d5ff]",
      textColor: "text-[#2a103a]",
    },
    {
      label: "Silver",
      tag: "Sterling",
      description: "Investment grade",
      value: data?.silverRate,
      gradient: "from-white/90 via-[#eef6ff] to-[#d8e9ff]",
      textColor: "text-[#0f1f33]",
    },
  ];

  const hasRates = Boolean(data?.rate22k || data?.rate18k || data?.silverRate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[40px] bg-[#16070f] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white backdrop-blur hover:bg-white/20"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] overflow-hidden">
            <Image
              src="/modelwearingjewellery.webp"
              alt="Mulveer Jewellers"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                Mulveer Jewellers
              </p>
              <h2 className="mt-2 text-4xl font-semibold">Daily Rate Salon</h2>
              <p className="mt-3 max-w-sm text-sm text-white/80">
                Transparent bullion updates direct from our Belagavi atelier.
                Secure the rate today and book a private showing with our concierge team.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-t-[40px] bg-gradient-to-b from-[#261018] via-[#1b0a11] to-[#12060b] p-8 text-white lg:rounded-none">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.4em] text-[#f6d598]">
                Bullion Board
              </p>
              <h3 className="text-3xl font-bold">Today's curated rates</h3>
              {data?.updatedAt && (
                <p className="text-xs text-white/70">
                  Updated {new Date(data.updatedAt).toLocaleString("en-IN", { hour12: true })}
                </p>
              )}
            </div>

            {loading && <p className="text-sm text-white/70">Fetching the latest rates…</p>}
            {error && <p className="text-sm text-red-200">{error}</p>}

            {!loading && !error && (
              <div className="grid gap-4">
                {segments.map((segment) => (
                  <div
                    key={segment.label}
                    className={`rounded-2xl border border-white/10 bg-gradient-to-br ${segment.gradient} ${segment.textColor} p-4 shadow-inner`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em]">
                      <span>{segment.tag}</span>
                      <span>Per gram</span>
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                      <p className="text-xs opacity-70">{segment.description}</p>
                      <p className="text-3xl font-black tracking-tight">
                        {formatValue(segment.value)}
                      </p>
                      <p className="text-base font-semibold opacity-80">{segment.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && !hasRates && (
              <p className="text-xs text-white/60">
                Rates will be published the moment your admin team saves them inside the dashboard.
              </p>
            )}

            <button className="w-full rounded-full bg-[#f7d085] px-8 py-3 text-base font-semibold text-[#3f120d] transition-colors hover:bg-[#f9d791]">
              Book Private Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldRatePopup;
