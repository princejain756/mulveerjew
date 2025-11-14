import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  href: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Double Ring Layered Necklace",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_21.png",
    originalPrice: 499,
    salePrice: 129,
    href: "#",
  },
  {
    id: 2,
    name: "Double Layered Coin With Cross Charm Necklace",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_22.png",
    originalPrice: 399,
    salePrice: 220,
    href: "#",
  },
  {
    id: 3,
    name: "Layered Pearl Drop Sun Charm Necklace",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_23.png",
    originalPrice: 999,
    salePrice: 299,
    href: "#",
  },
  {
    id: 4,
    name: "Double Layered Pearl Necklace With Black Heart Charm",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_21.png", // Reusing image as per available assets
    originalPrice: 499,
    salePrice: 299,
    href: "#",
  }
];

const ProductCard = ({ product }: { product: Product }) => (
  <Link href={product.href} className="group block text-center">
    <div className="overflow-hidden bg-white transition-shadow duration-300 group-hover:shadow-xl">
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-sm text-foreground truncate">{product.name}</h3>
      <p className="mt-1 text-sm">
        <span className="mr-2 text-[#999999] line-through">
          Rs. {product.originalPrice}
        </span>
        <span className="font-bold text-foreground">
          Rs. {product.salePrice}
        </span>
      </p>
    </div>
  </Link>
);

const LayeredNecklaces = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-[2rem] font-bold text-foreground mb-8">
          Layered Necklaces
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="#"
            className="inline-block bg-foreground px-10 py-3 text-sm font-semibold uppercase tracking-wider text-background transition-colors hover:bg-gray-800"
          >
            See All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LayeredNecklaces;