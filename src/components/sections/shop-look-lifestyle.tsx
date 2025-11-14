import React from 'react';

const ShopLookLifestyle = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <h2
          className="text-center text-3xl md:text-4xl font-medium text-foreground mb-8"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          Shop Your Look
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Bold Baddie Banner */}
            <a href="#" className="block relative group overflow-hidden h-[282px] w-full">
              <div
                className="absolute inset-0 bg-[#A5D8E1] transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="relative flex items-center h-full p-6 md:p-8">
                <h3
                  className="text-4xl md:text-5xl font-black uppercase text-[#EC4899]"
                  style={{ fontFamily: 'var(--font-display), sans-serif', lineHeight: 1 }}
                >
                  BOLD
                  <br />
                  BADDIE
                </h3>
              </div>
            </a>

            {/* Boho Chick Banner */}
            <a href="#" className="block relative group overflow-hidden h-[282px] w-full">
              <div
                className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FDE047, #F97316, #EC4899, #3B82F6, #14B8A6)',
                }}
              />
              <div className="relative flex items-center h-full p-6 md:p-8">
                <h3
                  className="text-4xl md:text-5xl font-black uppercase text-[#EC4899]"
                  style={{ fontFamily: 'var(--font-display), sans-serif', lineHeight: 1 }}
                >
                  BOHO
                  <br />
                  CHICK
                </h3>
              </div>
            </a>
          </div>

          {/* Right Column */}
          <a href="#" className="block relative group overflow-hidden h-[282px] lg:h-[580px] w-full">
            <div
              className="absolute inset-0 bg-gradient-to-br from-pink-100 via-pink-200 to-purple-200 transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="relative flex items-center h-full p-6 md:p-8">
              <h3
                className="text-4xl md:text-5xl font-black uppercase text-[#EC4899]"
                style={{ fontFamily: 'var(--font-display), sans-serif', lineHeight: 1 }}
              >
                K-POP
                <br />
                CHICK
              </h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShopLookLifestyle;