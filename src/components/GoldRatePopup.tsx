"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type GoldRateData = {
  rate20k: number | null;
  rate22k: number | null;
  rate24k: number | null;
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

const GoldRatePopup = ({ isOpen, onClose }: GoldRatePopupProps) => {
  const [data, setData] = useState<GoldRateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

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
        setError("Unable to load live gold rate right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60_000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-[#fef3c7] to-[#fde68a] p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-700 hover:text-gray-900"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* Left: Image */}
          <div className="lg:w-1/2">
            <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-gray-300">
              <Image
                src="/modelwearingjewellery.webp"
                alt="Model wearing jewellery"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2">
            <h2 className="mb-2 text-4xl font-bold text-red-600">
              It's Still Not Too Late!
            </h2>

            {loading ? (
              <p className="text-gray-600">Loading rates...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <>
                <p className="mb-6 text-sm text-gray-700">
                  Last updated: {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString("en-IN") : "Just now"}
                </p>

                <div className="mb-6 space-y-3">
                  {data?.rate24k && (
                    <div className="flex justify-between border-b border-gray-400 pb-2">
                      <span className="font-semibold text-gray-800">24kt Gold Rate</span>
                      <span className="font-bold text-gray-900">
                        ₹{data.rate24k.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}/GM
                      </span>
                    </div>
                  )}

                  {data?.rate22k && (
                    <div className="flex justify-between border-b border-gray-400 pb-2">
                      <span className="font-semibold text-gray-800">22kt Gold Rate</span>
                      <span className="font-bold text-gray-900">
                        ₹{data.rate22k.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}/GM
                      </span>
                    </div>
                  )}

                  {data?.rate20k && (
                    <div className="flex justify-between border-b border-gray-400 pb-2">
                      <span className="font-semibold text-gray-800">20kt Gold Rate</span>
                      <span className="font-bold text-gray-900">
                        ₹{data.rate20k.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}/GM
                      </span>
                    </div>
                  )}

                  {data?.rate18k && (
                    <div className="flex justify-between border-b border-gray-400 pb-2">
                      <span className="font-semibold text-gray-800">18kt Gold Rate</span>
                      <span className="font-bold text-gray-900">
                        ₹{data.rate18k.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}/GM
                      </span>
                    </div>
                  )}

                  {data?.silverRate && (
                    <div className="flex justify-between border-b border-gray-400 pb-2">
                      <span className="font-semibold text-gray-800">Silver Rate</span>
                      <span className="font-bold text-gray-900">
                        ₹{data.silverRate.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}/GM
                      </span>
                    </div>
                  )}
                </div>

                <button className="w-full rounded-full bg-white px-8 py-3 font-bold text-black shadow-lg hover:bg-gray-100">
                  Shop Now!
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldRatePopup;
