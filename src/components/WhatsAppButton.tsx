"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919481656583"; // Stored as international number without +

const WhatsAppButton = () => {
  const message =
    "Namaste Mulveer Jewellers, I would like to know more about your jewellery collections.";
  const href = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    message,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mulveer Jewellers on WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl md:bottom-6 md:right-6"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;

