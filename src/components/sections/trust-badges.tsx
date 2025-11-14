import { ShieldCheck, Scale, Sparkles, Wrench } from 'lucide-react';

const trustBadgesData = [
  {
    icon: ShieldCheck,
    title: "BIS Hallmarked Purity",
    description: "Certified gold & silver jewellery\nwith authenticity assured.",
  },
  {
    icon: Scale,
    title: "Transparent Pricing",
    description: "Honest making charges\nand clear gold rates.",
  },
  {
    icon: Sparkles,
    title: "In‑house Craftsmanship",
    description: "From design to finish,\ncrafted with devotion.",
  },
  {
    icon: Wrench,
    title: "Custom & Care Services",
    description: "Custom designs, repairs\n& lifetime polishing support.",
  },
];

const TrustBadges = () => {
  return (
    <section className="hidden lg:block bg-background py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <ul className="flex items-start justify-between gap-8">
          {trustBadgesData.map((badge, index) => (
            <li key={index} className="flex flex-1 items-center gap-4">
              <badge.icon className="h-10 w-10 text-[#d4af37] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h5 className="text-lg font-bold text-foreground">{badge.title}</h5>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {badge.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustBadges;
