import Image from 'next/image';
import Link from 'next/link';

type Product = {
  name: string;
  originalPrice: number;
  salePrice: number;
  imageUrl: string;
  slug: string;
};

const premiumRings: Product[] = [
  {
    name: 'Adjustable Silver Round Lavender Stone Plated...',
    originalPrice: 599,
    salePrice: 249,
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_14.png',
    slug: '#',
  },
  {
    name: 'Adjustable Silver Double Stone Studded Butter...',
    originalPrice: 599,
    salePrice: 249,
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_15.png',
    slug: '#',
  },
  {
    name: 'Adjustable Silver Feather Stone Studded Ring',
    originalPrice: 599,
    salePrice: 249,
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_16.png',
    slug: '#',
  },
  {
    name: 'Adjustable Silver Orange Flower Ring',
    originalPrice: 599,
    salePrice: 249,
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_17.png',
    slug: '#',
  },
];

const PremiumRingsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[32px] leading-tight font-bold text-[#1a1a1a] mb-8">
          Premium Rings For Her
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {premiumRings.map((product, index) => (
            <Link href={product.slug} key={index} className="group block text-center transition-transform duration-300 ease-in-out hover:-translate-y-1">
              <div className="relative aspect-square w-full overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 23vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-base text-[#1a1a1a] truncate px-1">
                {product.name}
              </h3>
              <div className="mt-1 flex justify-center items-baseline space-x-2">
                <span className="text-sm text-gray-500 line-through">
                  Rs. {product.originalPrice}
                </span>
                <span className="text-lg font-bold text-[#3D7054]">
                  Rs. {product.salePrice}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-block bg-black text-white uppercase text-sm font-semibold tracking-widest py-3 px-12 transition-colors hover:bg-gray-800"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumRingsSection;