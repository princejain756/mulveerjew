import Image from 'next/image';
import React from 'react';

type Product = {
  name: string;
  imageUrl: string;
  originalPrice: number;
  salePrice: number;
  href: string;
};

const products: Product[] = [
  {
    name: 'Blue Set Of 3 Bracelet Stacks',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_25.png',
    originalPrice: 999,
    salePrice: 349,
    href: '#',
  },
  {
    name: 'Stretchable Set Of 3 Pink Glass Beads Bracelet',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_24.png', // Re-used image as asset was not provided for this specific product
    originalPrice: 499,
    salePrice: 255,
    href: '#',
  },
  {
    name: 'Pack Of 3 Stretchable Pink Black Glass Beads Bracelet',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_26.png',
    originalPrice: 999,
    salePrice: 220,
    href: '#',
  },
  {
    name: 'Stretchable Pack Of 3 Pink Glass Beads Bracelet',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_24.png',
    originalPrice: 499,
    salePrice: 299,
    href: '#',
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <a href={product.href} className="group block text-center">
    <div className="relative aspect-square w-full overflow-hidden">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="(max-width: 767px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="mt-4">
      <h3 className="text-sm leading-snug text-gray-700 h-10">{product.name}</h3>
      <p className="mt-2 flex items-baseline justify-center gap-2">
        <span className="text-sm text-[#999999] line-through">
          Rs.{product.originalPrice}
        </span>
        <span className="text-sm font-medium text-[#1A1A1A]">
          Rs. {product.salePrice}
        </span>
      </p>
    </div>
  </a>
);

const BohoBraceletStacks = () => {
  return (
    <section className="py-8 lg:py-16 bg-white font-body">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
            <h2 
              className="text-center font-bold text-[2rem] leading-none mb-12 text-[#1A1A1A]" 
              style={{ fontFamily: 'var(--font-display, "Inter", sans-serif)' }}
            >
              Boho Bracelet Stacks
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
            <a
                href="#"
                className="inline-block bg-black text-white uppercase text-xs font-semibold tracking-wider py-3 px-10"
            >
                SEE ALL
            </a>
            </div>
        </div>
    </section>
  );
};

export default BohoBraceletStacks;