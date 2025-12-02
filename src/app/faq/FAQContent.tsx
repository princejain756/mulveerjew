'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { FAQCategory } from './faq-data';

type FAQContentProps = {
  categories: FAQCategory[];
};

const FAQContent = ({ categories }: FAQContentProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <>
      <section className="bg-gradient-to-b from-[#3f0d1c] to-[#5a1024] text-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-[#f6e2c7]">
              Everything you need to know about Mulveer Jewellers in Belagavi
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {categories.map((category, categoryIndex) => (
              <div key={category.title}>
                <h2 className="text-3xl font-bold text-[#3f0d1c] mb-6">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openFAQ === globalIndex;
                    return (
                      <div
                        key={faq.q}
                        className="rounded-lg border border-[#e8d7c3] overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenFAQ(isOpen ? null : globalIndex)
                          }
                          className="w-full px-6 py-4 bg-white hover:bg-[#f9f5f0] transition-colors flex items-center justify-between"
                        >
                          <h3 className="text-lg font-semibold text-[#3f0d1c] text-left">
                            {faq.q}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-[#5a1024] flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 py-4 bg-[#f9f5f0] border-t border-[#e8d7c3]">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#3f0d1c] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Still Have Questions?
          </h2>
          <p className="text-xl text-[#f6e2c7] mb-8 max-w-2xl mx-auto">
            Our Belagavi team is here to help with bridal sets, custom designs and purity checks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#f6e2c7] text-[#3f0d1c] font-semibold rounded-lg hover:bg-white transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:+917204456583"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#f6e2c7] text-[#f6e2c7] font-semibold rounded-lg hover:bg-[#f6e2c7] hover:text-[#3f0d1c] transition-colors"
            >
              Call Us
            </a>
            <a
              href="https://wa.me/917204456583"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQContent;
