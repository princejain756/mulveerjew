const collections = [
  {
    name: "Modern Minimal Line",
    description:
      "Sleek, everyday jewellery that pairs effortlessly with workwear and modern wardrobes.",
  },
  {
    name: "Temple Collections",
    description:
      "Divinely inspired pieces featuring sacred motifs that honour Lord Shiva and temple art.",
  },
  {
    name: "Traditional Heritage Styles",
    description:
      "Classic designs for weddings and festive occasions, rooted in timeless Indian craftsmanship.",
  },
  {
    name: "New & Unique Designs",
    description:
      "Trend‑forward creations for those who love distinctive, statement‑making jewellery.",
  },
];

const SignatureCollectionsSection = () => {
  return (
    <section className="bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          className="text-center text-foreground font-medium mb-4"
          style={{ fontFamily: "var(--font-display)", fontSize: "36px", lineHeight: 1.2 }}
        >
          Signature Mulveer Collections
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-muted-foreground">
          Every Mulveer collection blends devotion, artistry and modern design sensibilities,
          ensuring there is a piece for every story, occasion and personality.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {collections.map((item) => (
            <div
              key={item.name}
              className="flex h-full flex-col justify-between border border-border bg-background/60 px-6 py-5 shadow-sm"
            >
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureCollectionsSection;

