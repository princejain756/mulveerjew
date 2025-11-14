import Link from "next/link";

const collections = [
  {
    name: "Gold Jewellery",
    href: "/products?category=gold",
    badge: "22K & 20K",
    description: "Temple, bridal & everyday gold designs crafted with purity.",
  },
  {
    name: "Silver Jewellery",
    href: "/products?category=silver",
    badge: "Pure Silver",
    description: "Elegant silver ornaments and articles with guaranteed purity.",
  },
  {
    name: "Diamond Jewellery",
    href: "/products?category=diamond",
    badge: "Certified Diamonds",
    description: "Timeless diamond pieces for special moments and daily grace.",
  },
];

const CollectionShowcase = () => {
  return (
    <section id="collections" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-center text-foreground font-medium mb-4"
          style={{ fontFamily: 'var(--font-display)', fontSize: '40px', lineHeight: 1.1 }}
        >
          Explore Our Jewellery Collections
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground">
          From sacred temple-inspired gold to modern minimal silver and certified diamonds,
          each collection is crafted to reflect both devotion and contemporary elegance.
        </p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group relative flex h-full flex-col justify-between overflow-hidden border border-border bg-card px-6 py-7 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full bg-[#f6e2c7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a1024]">
                  {collection.badge}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {collection.description}
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
                View Collection
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionShowcase;
