import React from 'react';

const Starting99Banner = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-8 md:py-12 text-center">
        <h2 className="text-[40px] leading-tight font-bold text-text-primary mb-8">
          Starting from ₹99 only/-
        </h2>
        <a
          href="#"
          className="inline-block bg-[#4169e1] text-white text-sm font-semibold uppercase tracking-wider py-3 px-8 rounded-[4px] transition-all duration-300 ease-in-out hover:bg-[#3458c8] hover:scale-105"
        >
          EXPLORE NOW
        </a>
      </div>
    </section>
  );
};

export default Starting99Banner;