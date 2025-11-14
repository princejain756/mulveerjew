const StoreLocatorSection = () => {
  return (
    <section id="contact" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Visit Our Showroom
            </p>
            <h2
              className="mt-3 text-3xl font-semibold text-foreground leading-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Mulveer Jewellers, Belagavi
            </h2>
            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <p>Jamboti Road, Piranwadi, Belagavi, Karnataka, PIN - 590011</p>
              <p>
                Phone / WhatsApp:&nbsp;
                <a
                  href="tel:+917204456583"
                  className="font-medium text-[#5a1024] hover:underline"
                >
                  +91 7204456583
                </a>
              </p>
              <p>Showroom Timings: Daily, 10:00 AM – 9:00 PM</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Mulveer+Jewellers,+Jamboti+Road,+Piranwadi,+Belagavi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#5a1024] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#711533]"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground shadow-sm">
            <p className="mb-3 font-semibold text-foreground">
              How to reach
            </p>
            <p>
              Mulveer Jewellers is located on Jamboti Road in Piranwadi, a
              convenient drive from central Belagavi. Customers across the city
              visit us for wedding jewellery, daily‑wear pieces and custom
              orders.
            </p>
            <p className="mt-3">
              Use the Google Maps link to get accurate, real‑time directions
              from your current location.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocatorSection;

