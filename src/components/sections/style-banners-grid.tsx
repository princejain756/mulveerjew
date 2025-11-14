import React from 'react';

const banners = [
  {
    href: "/collections/office-wear",
    imageUrl: "https://oralia.in/cdn/shop/files/Artboard_1_1_900x.png?v=1679057404",
    text1: "BOSS",
    text1Color: "text-[#ff78f0]",
    text2: "B'TCH",
    text2Color: "text-black",
  },
  {
    href: "/collections/korean-earrings",
    imageUrl: "https://oralia.in/cdn/shop/files/1_14_900x.png?v=1690533031",
    text1: "OXIDISED",
    text1Color: "text-black",
    text2: "PAGLU",
    text2Color: "text-black",
  },
  {
    href: "/collections/jhumka-collection",
    imageUrl: "https://oralia.in/cdn/shop/files/Artboard_1_copy_3_900x.png?v=1679057408",
    text1: "BOHO",
    text1Color: "text-[#ff8138]",
    text2: "CHICK",
    text2Color: "text-[#ff78f0]",
  },
  {
    href: "/collections/y2k",
    imageUrl: "https://oralia.in/cdn/shop/files/Artboard_1_copy_2_1_900x.png?v=1679057406",
    text1: "CAMPUS",
    text1Color: "text-[#ff78f0]",
    text2: "CUTIE",
    text2Color: "text-black",
  },
];

const StyleBannersGrid = () => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1440px] px-6">
        <h2
          className="mb-8 text-center text-[36px] font-medium leading-[1.2] text-black"
          style={{ fontFamily: 'var(--font-display, "Inter", sans-serif)' }}
        >
          Shop Your Look
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {banners.map((banner, index) => (
            <a
              key={index}
              href={banner.href}
              className="group relative block h-[280px] overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url('${banner.imageUrl}')` }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex h-full flex-col items-start justify-end p-6">
                <div 
                  className="font-bold uppercase leading-none tracking-tighter text-[4rem]" 
                  style={{ fontFamily: '"Inter", sans-serif', fontWeight: 700 }}
                >
                  <span className={banner.text1Color}>{banner.text1}</span>
                  <br />
                  <span className={banner.text2Color}>{banner.text2}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleBannersGrid;