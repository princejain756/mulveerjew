const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#5a1024]">Our Story</h2>
          <p className="text-lg text-[#666666] mb-6">
            Mulveer Jewellers began its journey with a strong foundation in gold ornament manufacturing, specializing in crafting fine gold jewellery. The brand later expanded into retail as the jewellery industry witnessed rapid growth and evolving consumer demand.
          </p>
          <p className="text-lg text-[#666666] mb-6">
            The name "Mulveer" is derived from a revered form of Lord Shiva. Rooted in spiritual significance, the brand embodies purity, trust, and craftsmanship. Mulveer Jewellers is dedicated to offering guaranteed, authentic jewellery with a commitment to transparent pricing, minimal making charges, and designs that balance tradition with modern aesthetics.
          </p>
          <p className="text-lg text-[#666666] mb-6">
            Our vision is to become a trusted household name in the jewellery industry by offering pure, certified and beautifully crafted ornaments that reflect timeless tradition and modern elegance.
          </p>
          <p className="text-lg text-[#666666] mb-6">
            Our mission is to consistently deliver jewellery of unmatched purity and design excellence; to nurture long‑term trust through honest pricing, personalised service and innovation in every creation; and to make the divine essence of “Mulveer” shine through every ornament we craft.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Purity</h3>
              <p className="text-[#666666]">BIS Hallmark certified gold and silver</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Trust</h3>
              <p className="text-[#666666]">Transparent pricing and authentic craftsmanship</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Tradition</h3>
              <p className="text-[#666666]">Inspired by Lord Shiva, blending heritage with modernity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
