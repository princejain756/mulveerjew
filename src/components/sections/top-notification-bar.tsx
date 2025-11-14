'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

/**
 * TopNotificationBar component displays a dismissible promotional message at the top of the page.
 * It is visible on medium screens and up, and hidden on mobile.
 */
const TopNotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative hidden items-center justify-center bg-[#fef3c7] px-4 py-2 text-center md:flex">
      <p className="text-xs">
        <span className="font-bold text-black tracking-wide">
          Mulveer Jewellers · Promises of Purity and Perfection
        </span>
        <span className="mx-2 font-bold text-black">|</span>
        <span className="font-bold text-black">
          BIS Hallmarked Gold · Transparent Pricing · Custom Designs
        </span>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TopNotificationBar;
