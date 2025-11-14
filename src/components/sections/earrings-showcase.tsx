import React from 'react';
import Image from 'next/image';

interface Product {
  name: string;
  originalPrice: string;
  salePrice: string;
  imageUrl: string;
  bgColor: string;
  alt: string;
}

const products: Product[] = [
  {
    name: "Small Round Hoop Earrings",
    originalPrice: "599",
    salePrice: "49",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_18.png",
    bgColor: "bg-[#fbebeb]",
    alt: "Small Round Hoop Earrings on a pink background",
  },
  {
    name: "Korean Dark Pink Tulip Pearl Flower Earrings",
    originalPrice: "1,000",
    salePrice: "99",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_19.png",
    bgColor: "bg-[#fdeef3]",
    alt: "Korean Dark Pink Tulip Pearl Flower Earrings on a pink background",
  },
  {
    name: "Glass Cherry Needle Thread Earrings",
    originalPrice: "249",
    salePrice: "99",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_20.png",
    bgColor: "bg-white",
    alt: "Glass Cherry Needle Thread Earrings being worn",
  },
  {
    name: "Faux Pearl Decor Earring",
    originalPrice: "149",
    salePrice: "99",
    imageUrl: "", // Asset missing, will render a placeholder
    bgColor: "bg-white",
    alt: "Faux Pearl Decor Earring",
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <div className="group text-center">
    <a href="#" className="cursor-pointer">
      <div className={`relative w-full aspect-square overflow-hidden ${product.bgColor}`}>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.alt}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            {/* Placeholder for missing image */}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-sm text-[#1A1A1A] h-10 flex items-center justify-center px-2">{product.name}</h3>
      <p className="mt-1 text-sm">
        <span className="text-[#999999] line-through mr-2">Rs. {product.originalPrice}</span>
        <span className="font-semibold text-[#1A1A1A]">Rs. {product.salePrice}</span>
      </p>
    </a>
  </div>
);

const EarringsShowcase = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <h2 className="text-center font-bold text-[32px] leading-tight text-[#1A1A1A] mb-12">
          Earrings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block bg-black text-white uppercase text-sm font-semibold tracking-wider px-10 py-3 transition-colors hover:bg-zinc-800"
          >
            Explore Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default EarringsShowcase;