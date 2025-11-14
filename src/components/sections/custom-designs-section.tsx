'use client';

import { useState, useEffect } from 'react';

const steps = [
  "Share your inspiration, sketch or reference design with our team.",
  "We evaluate feasibility, estimate weight, metal purity, carat and cost.",
  "Once approved, our in‑house workshop crafts your bespoke piece with care.",
  "Final polishing, quality checks and hallmark certification before handover.",
];

const CustomDesignsSection = () => {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    // Sequential loading: show each step after a delay
    const intervals = steps.map((_, index) => 
      setTimeout(() => {
        setVisibleSteps(prev => Math.min(prev + 1, steps.length));
      }, index * 400) // 400ms delay between each step
    );

    return () => intervals.forEach(interval => clearTimeout(interval));
  }, []);

  return (
    <section
      id="custom-designs"
      className="bg-[#3f0d1c] py-16 text-white sm:py-20"
    >
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .step-item {
          animation: slideInUp 0.5s ease-out forwards;
        }
      `}</style>
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f6e2c7]">
              Custom &amp; Made‑to‑Order
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl" style={{color: '#f5f5f0'}}>
              Jewellery crafted for
              <br className="hidden sm:block" /> your story.
            </h2>
            <p className="mt-4 text-sm text-[#f6e2c7]">
              Mulveer Jewellers specialises in made‑to‑order designs. From heirloom
              recreations to contemporary concepts, every custom piece is crafted with
              complete transparency in weight, purity and pricing.
            </p>
          </div>
          <div className="space-y-4 rounded-lg border border-[#6b3144] bg-white/5 p-6 text-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f6e2c7]">
              How the process works
            </h3>
            <div className="overflow-y-auto max-h-64 pr-2 scroll-smooth">
              <ol className="space-y-3 text-[#f6e2c7]">
                {steps.map((step, index) => (
                  <li 
                    key={index} 
                    className="flex gap-3 step-item"
                    style={{
                      opacity: index < visibleSteps ? 1 : 0,
                      animation: index < visibleSteps ? `slideInUp 0.5s ease-out forwards` : 'none',
                      animationDelay: `${index * 400}ms`,
                    }}
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#f6e2c7] text-[11px] font-semibold">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="pt-2 text-[11px] text-[#f6e2c7]/90">
              For wedding trousseau, festive sets or one‑of‑a‑kind statement pieces,
              reach us via the enquiry form below or WhatsApp to begin your custom design journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDesignsSection;

