import Image from 'next/image';
import Link from 'next/link';

interface Product {
  image: string;
  title: string;
  originalPrice: string;
  salePrice: string;
  url: string;
}

const products: Product[] = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/ChatGPT_Image_Jul_16_2025_04_52_58_PM_50x-6.png",
    title: "Pack Of 4 Trendy Korean Earrings Combo With Box",
    originalPrice: "1,299",
    salePrice: "599",
    url: "#",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/ChatGPT_Image_Jul_16_2025_04_53_04_PM_50x-7.png",
    title: "Premium Flower Hair Clip Hamper Boxx",
    originalPrice: "2,999",
    salePrice: "799",
    url: "#",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/ChatGPT_Image_Jul_16_2025_04_53_07_PM_50x-8.png",
    title: "Pack Of 10 Premium Jewelry Gift Hamper for girls with Box",
    originalPrice: "2,999",
    salePrice: "1,899",
    url: "#",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/ChatGPT_Image_Jul_17_2025_02_17_13_PM_100x-9.png",
    title: "Premium Jewellery Gift Hamper For Your Loved Ones",
    originalPrice: "2,999",
    salePrice: "949",
    url: "#",
  },
];

const ProductCard = ({ image, title, originalPrice, salePrice, url }: Product) => (
  <div className="group transition-shadow duration-300 hover:shadow-lg">
    <Link href={url} className="block text-center">
      <div className="overflow-hidden bg-white">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-auto aspect-square object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="pt-4 px-2 pb-4">
        <h3 className="text-base text-[#1a1a1a] h-[3.2rem] leading-tight overflow-hidden">
          {title}
        </h3>
        <div className="flex justify-center items-baseline gap-2 mt-1">
          <span className="text-[#999999] line-through">Rs. {originalPrice}</span>
          <span className="font-bold text-[#2d8659]">Rs. {salePrice}</span>
        </div>
      </div>
    </Link>
  </div>
);

export default function HamperProducts() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <h2 className="text-center text-[2rem] leading-tight font-medium text-[#1a1a1a] mb-8 md:mb-12">
          Hamper for Loved Ones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/collections/hampers"
            className="inline-block bg-black text-white uppercase text-[14px] font-semibold tracking-[0.05em] py-3 px-8 transition-opacity hover:opacity-90"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}