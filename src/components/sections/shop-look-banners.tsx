import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const ShopLookBanners: FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2
          className="text-center text-3xl font-medium text-[#1A1A1A] mb-8"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Shop Your Look
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Banner: CAMPUS CUTIE */}
          <Link
            href="#"
            className="relative block h-[400px] overflow-hidden group"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/Campus%20Cutie%20Resized%201_1068x700_011d13f0-4.png"
              alt="Campus Cutie banner"
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 group-hover:opacity-95"
            />
            <div
              className="absolute inset-0 p-6 flex flex-col justify-end items-start"
              style={{ fontFamily: "var(--font-display, sans-serif)" }}
            >
              <span
                className="text-6xl font-extrabold leading-none drop-shadow-sm"
                style={{ color: "#FF00A8" }}
              >
                CAMPUS
              </span>
              <span className="text-6xl font-extrabold text-black leading-none">
                CUTIE
              </span>
            </div>
          </Link>

          {/* Right Banner: OXIDISED PAGLU */}
          <Link
            href="#"
            className="relative block h-[400px] overflow-hidden group"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/Oxidised_Paglu_Resized_1068x700_9428d680-7552-4fe8-4.png"
              alt="Oxidised Paglu banner"
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 group-hover:opacity-95"
            />
            <div
              className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center w-full"
              style={{ fontFamily: "var(--font-display, sans-serif)" }}
            >
              <span className="text-6xl font-extrabold text-white leading-none drop-shadow-md">
                OXIDISED
              </span>
              <span className="text-6xl font-extrabold text-white leading-none drop-shadow-md">
                PAGLU
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopLookBanners;