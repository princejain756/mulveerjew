export type FAQItem = {
  q: string;
  a: string;
};

export type FAQCategory = {
  title: string;
  faqs: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    title: "Belagavi Store & Local Services",
    faqs: [
      {
        q: "Why is Mulveer Jewellers known as the best jewellery store in Belagavi?",
        a: "We combine BIS hallmarked purity, transparent weight-based pricing, minimal making charges, and an in-house design workshop. Belagavi and Belgaum families choose us for consistent quality, bridal jewellery expertise, and lifetime cleaning support.",
      },
      {
        q: "Where is your jewellery shop in Belagavi located?",
        a: "Visit us on Jamboti Road, Piranwadi, Belagavi, Karnataka 590011. The showroom has easy parking and is reachable from central Belagavi and Belgaum neighborhoods.",
      },
      {
        q: "Do you stock both gold and silver jewellery in Belagavi?",
        a: "Yes. Our BIS hallmarked gold jewellery shop in Belagavi offers 22K/20K/18K pieces, while our silver jewellery shop in Belgaum carries anklets, idols, coins, payals, gifting sets, and daily-wear designs.",
      },
      {
        q: "Can you help with bridal jewellery collections in Belagavi?",
        a: "Absolutely. We plan full bridal sets—mangalsutras, haarams, bangles, waistbelts, maangtikkas and cocktail pieces—with styling guidance. Book a consult 8–10 weeks before your wedding for the best experience.",
      },
      {
        q: "Do you have custom jewellery designers in Belagavi?",
        a: "Yes. Share a sketch, photo, heirloom or idea, and our in-house designers will create CAD or hand sketches for approval before casting. Most custom orders finish within 2–4 weeks with BIS hallmarking.",
      },
    ],
  },
  {
    title: "General Questions",
    faqs: [
      {
        q: "What is BIS Hallmark certification?",
        a: "BIS (Bureau of Indian Standards) Hallmark is an official mark of purity and authenticity. It certifies that your jewelry meets the prescribed standards for precious metals. All our gold jewelry is BIS Hallmarked, ensuring you get exactly what you pay for.",
      },
      {
        q: "Are your jewelry pieces authentic?",
        a: "Yes, absolutely. Every piece is BIS Hallmarked and comes with proper documentation. We use only genuine precious metals sourced from certified suppliers, ensuring authenticity and quality.",
      },
      {
        q: "What is the difference between 22K and 18K gold?",
        a: "22K gold is 91.67% pure gold, making it ideal for daily wear jewelry with better durability. 18K gold is 75% pure and offers greater durability for studded pieces with diamonds or gemstones. Both are precious and valuable.",
      },
      {
        q: "Do you offer exchange or buyback options?",
        a: "Yes, we offer competitive exchange rates for old jewelry and buyback options. Our team evaluates each piece based on current market rates, purity, and weight. Visit us in-store or contact us for detailed information.",
      },
    ],
  },
  {
    title: "Custom Design Services",
    faqs: [
      {
        q: "How does the custom design process work?",
        a: "Our custom design process has 4 steps: (1) Share your inspiration and vision, (2) Expert evaluation with cost estimates, (3) Craftsmanship by our master artisans, (4) Final polishing and certification. The entire process typically takes 2-4 weeks depending on complexity.",
      },
      {
        q: "Can you recreate my grandmother's jewelry?",
        a: "Absolutely! Heirloom recreation is one of our specialties. Bring us the original piece or detailed information, and our craftsmen will recreate it with the same beauty and specifications. We can even improve the design while preserving its essence.",
      },
      {
        q: "What if I don't have a sketch or design?",
        a: "No problem! Our design team can help you develop a concept from your ideas and preferences. We provide professional guidance, show you similar pieces, and create sketches for your approval before crafting begins.",
      },
      {
        q: "Is custom jewelry more expensive?",
        a: "Custom jewelry is priced based on actual material cost plus artisan charges. While it may sometimes be comparable to ready-made pieces, you get a unique, one-of-a-kind design that reflects your personality. The investment in craftsmanship ensures superior quality.",
      },
      {
        q: "How long does custom design work take?",
        a: "Timeline depends on complexity and current workload. Simple designs take 1-2 weeks, intricate pieces take 2-4 weeks. We provide regular updates throughout the process. Rush orders can be accommodated with premium charges.",
      },
    ],
  },
  {
    title: "Pricing & Payment",
    faqs: [
      {
        q: "How is jewelry priced?",
        a: "Gold jewelry is priced based on: (1) Actual weight of gold, (2) Current gold market rate, (3) Purity (22K or 18K), (4) Making charges (artisan labor), (5) GST. We provide a detailed breakdown for complete transparency.",
      },
      {
        q: 'What are "making charges"?',
        a: "Making charges are fees for the artisan's labor and craftsmanship. They vary based on design complexity, time required, and skill level. We clearly communicate making charges before confirming your order.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept cash, credit cards, debit cards, UPI, and net banking. For online orders, we offer secure payment gateways. We also offer EMI options for purchases above ₹50,000 through partner banks.",
      },
      {
        q: "Do you offer discounts or EMI options?",
        a: "Yes! We offer seasonal discounts and special promotions. For purchases above ₹50,000, we provide EMI options through major credit cards and lenders. Ask our team for current offers.",
      },
      {
        q: "Is there a warranty or guarantee?",
        a: "Yes, all pieces come with a lifetime craftsmanship guarantee. We offer free cleaning, polishing, and maintenance throughout your ownership. BIS Hallmark certification guarantees purity and authenticity.",
      },
    ],
  },
  {
    title: "Delivery & Shipping",
    faqs: [
      {
        q: "Do you ship across India?",
        a: "Yes, we ship across India through trusted courier services. Orders typically ship within 3-5 business days. Shipping is insured, and we provide tracking details. International shipping is available on request.",
      },
      {
        q: "What is your return and exchange policy?",
        a: "We offer a 7-day return policy for pieces purchased online (conditions apply). Exchanges for size or design modifications are always welcome. Custom-made pieces have different terms. Contact us for detailed policy information.",
      },
      {
        q: "How is jewelry packaged for shipping?",
        a: "Jewelry is packed in premium protective packaging with secure boxes. Each piece is individually wrapped and insured during transit. We ensure your jewelry arrives in perfect condition.",
      },
      {
        q: "Can I place an order online and collect in-store?",
        a: "Yes! You can order online and pick up from our Belagavi showroom. We typically have ready items in stock for same-day or next-day pickup. Custom orders take 2-4 weeks as usual.",
      },
    ],
  },
  {
    title: "Maintenance & Care",
    faqs: [
      {
        q: "How do I care for my gold jewelry?",
        a: "Avoid harsh chemicals and extreme temperatures. Remove jewelry before swimming or exercising. Store in a safe place, preferably in individual pouches. Clean gently with a soft cloth. For professional cleaning, visit us anytime—it's complimentary for our customers.",
      },
      {
        q: "Can damaged jewelry be repaired?",
        a: "Yes, most damage can be repaired. Broken chains, bent bangles, loose settings, and worn clasps can all be fixed. We offer free repairs for workmanship issues within 5 years of purchase. Bring your piece to our showroom.",
      },
      {
        q: "Do you resize rings and bangles?",
        a: "Absolutely! We offer free resizing for rings and bangles for up to 1 year after purchase. Minor adjustments are usually done within a day. After 1 year, we charge nominal fees for resizing services.",
      },
      {
        q: "How often should I get my jewelry cleaned?",
        a: "For daily-wear pieces, professional cleaning every 3-6 months keeps them looking pristine. We offer complimentary ultrasonic and steam cleaning at our showroom. You can also clean gently at home using mild soap and warm water.",
      },
    ],
  },
  {
    title: "Showroom Visit",
    faqs: [
      {
        q: "What are your showroom hours?",
        a: "We're open daily from 10:00 AM to 9:00 PM. We're closed on major national holidays. Special hours may apply during festivals. Feel free to visit anytime that's convenient for you.",
      },
      {
        q: "Where is your showroom located?",
        a: "Our showroom is located at Jamboti Road, Piranwadi, Belagavi, Karnataka, PIN - 590011. It's easily accessible from central Belagavi with ample parking. You can find us on Google Maps for directions.",
      },
      {
        q: "Can I try on jewelry before purchasing?",
        a: "Yes, definitely! You're welcome to try on any piece in our showroom. We believe seeing and feeling the jewelry helps you make the best choice. Our team is always available to assist.",
      },
      {
        q: "Do you require an appointment?",
        a: "No appointment needed for regular shopping. However, for custom design consultations, consultancy appointments are recommended to ensure our team can dedicate time to your project.",
      },
    ],
  },
];
