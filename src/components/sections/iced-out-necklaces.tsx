import Image from 'next/image';

type Product = {
  name: string;
  price: number;
  originalPrice: string;
  imageSrc: string;
  href: string;
};

const products: Product[] = [
  {
    name: 'Gengar Iced Out Hip Hop Pendant Necklace',
    price: 499,
    originalPrice: '1,500',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_27.png',
    href: '#',
  },
  {
    name: 'Self Paid Iced Out Hip Hop Pendant Necklace',
    price: 499,
    originalPrice: '2,000',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_27.png', // Using the same image as per asset constraints
    href: '#',
  },
  {
    name: 'Spider Iced Out Hip Hop Pendant Necklace',
    price: 499,
    originalPrice: '2,000',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_27.png', // Using the same image as per asset constraints
    href: '#',
  },
  {
    name: 'King Iced Out Hip Hop Pendant Necklace',
    price: 499,
    originalPrice: '2,000',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_27.png', // Using the same image as per asset constraints
    href: '#',
  },
];

const IcedOutNecklaces = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-center text-[32px] font-bold text-text-primary mb-12">
          Necklaces That Drip
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <a key={index} href={product.href} className="group block text-center transition-all duration-300 ease-in-out hover:shadow-lg">
              <div className="overflow-hidden bg-black">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover aspect-square transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 px-1 pb-4">
                <h3 className="text-sm font-medium text-text-primary truncate h-5">
                  {product.name}
                </h3>
                <p className="mt-1">
                  <span className="text-base font-semibold text-[#E53935]">Rs. {product.price}</span>
                  <span className="ml-2 text-sm text-[#999999] line-through">Rs. {product.originalPrice}</span>
                </p>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block bg-[#1A1A1A] text-white py-3 px-10 uppercase text-sm font-semibold tracking-[0.05em] hover:bg-gray-800 transition-colors"
          >
            Explore More
          </a>
        </div>
      </div>
    </section>
  );
};

export default IcedOutNecklaces;