"use client";

import { FormEvent, useState } from "react";

const InquiryForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const subject = `Mulveer Website Enquiry from ${name || "Customer"}`;
    const bodyLines = [
      `Name: ${name}`,
      `Phone / WhatsApp: ${phone}`,
      `Email: ${email}`,
      `Interested In: ${type}`,
      "",
      "Message:",
      message || "(No additional message provided)",
    ];

    const mailto = `mailto:support@mulveerjewellers.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  };

  return (
    <section className="bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          className="text-center text-foreground font-medium mb-4"
          style={{ fontFamily: "var(--font-display)", fontSize: "32px", lineHeight: 1.2 }}
        >
          Request a Custom Design or Enquiry
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">
          Share your requirements and our team will get back to you with design
          options, estimated weight, purity and pricing details.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-3xl gap-4 rounded-lg border border-border bg-background p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="name" className="font-medium text-foreground">
                Full Name*
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 rounded border border-input bg-card px-3 text-sm outline-none focus:border-[#d4af37]"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="phone" className="font-medium text-foreground">
                Phone / WhatsApp*
              </label>
              <input
                id="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 rounded border border-input bg-card px-3 text-sm outline-none focus:border-[#d4af37]"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="email" className="font-medium text-foreground">
                Email (optional)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded border border-input bg-card px-3 text-sm outline-none focus:border-[#d4af37]"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="type" className="font-medium text-foreground">
                Interested In
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-10 rounded border border-input bg-card px-3 text-sm outline-none focus:border-[#d4af37]"
              >
                <option value="">Select an option</option>
                <option value="Gold Jewellery">Gold Jewellery</option>
                <option value="Silver Jewellery">Silver Jewellery</option>
                <option value="Diamond Jewellery">Diamond Jewellery</option>
                <option value="Custom Design">Custom / Made‑to‑Order</option>
                <option value="Exchange / Buyback">Gold Exchange / Buyback</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-sm">
            <label htmlFor="message" className="font-medium text-foreground">
              Message / Requirements
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded border border-input bg-card px-3 py-2 text-sm outline-none focus:border-[#d4af37]"
              placeholder="Share design ideas, budget range, occasion, metal preference, etc."
            />
          </div>

          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              By submitting, you allow Mulveer Jewellers to contact you via
              phone, WhatsApp or email regarding your enquiry.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#5a1024] px-6 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#711533]"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InquiryForm;

