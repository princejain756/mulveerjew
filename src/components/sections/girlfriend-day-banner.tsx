import React from 'react';
import Image from 'next/image';

const GirlfriendDayBanner = () => {
  return (
    <section className="flex flex-col md:flex-row w-full" style={{ minHeight: '500px' }}>
      {/* Left Panel */}
      <div className="relative md:w-1/2 bg-[#F5D5C8] flex flex-col items-center justify-start text-center p-8 pt-20 md:p-12 md:pt-24 overflow-hidden min-h-[450px] md:min-h-0">
        <div className="z-10 max-w-md mx-auto">
          <h2
            className="font-serif text-[#6b5b5b]"
            style={{ fontSize: '3.5rem', lineHeight: 1.1 }}
          >
            Her love language is<br />jewellery.
          </h2>
          <p
            className="mt-4 text-[#6b5b5b] mx-auto max-w-sm"
            style={{ fontSize: '1.25rem' }}
          >
            Say it with sparkle this Girlfriend Day.
          </p>
        </div>
        
        {/* Placeholder for Ring Image */}
        <div 
          className="absolute bottom-[-15%] w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:bottom-[-20%] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px]"
          aria-hidden="true"
        >
          <div className="w-full h-full flex items-center justify-center">
              {/* 
                This circle mimics the product's circular base/shadow seen in the screenshot.
                A placeholder is used as the original asset was not provided, and using unlisted external URLs is prohibited. 
                This approach maintains the layout and visual balance.
              */}
              <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-t from-white/10 to-white/40 shadow-xl"></div>
          </div>
        </div>

      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 bg-[#E8B5E8] flex flex-col justify-center items-center md:items-end text-center md:text-right p-8 md:p-12 lg:p-16 min-h-[300px] md:min-h-0">
        <div className="max-w-xs">
          <h3
            className="font-semibold text-[#6b5b5b]"
            style={{ fontSize: '1.5rem' }}
          >
            Make Her Feel Special
          </h3>
          <a
            href="#"
            className="inline-block mt-5 bg-[#6b46c1] text-white py-3 px-8 text-sm font-semibold tracking-widest uppercase transition-colors duration-300 hover:bg-[#5a3ab0]"
            aria-label="Order now for Girlfriend Day"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default GirlfriendDayBanner;