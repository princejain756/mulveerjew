import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: string;
  salePrice: string;
  href: string;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "White Daisy Garden Whimsical Chain Necklace",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_10.png",
    originalPrice: "250",
    salePrice: "99",
    href: "#",
  },
  {
    id: 2,
    name: "Glass Beads Black Bracelet - Strechable (Set of 2)",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_11.png",
    originalPrice: "250",
    salePrice: "9",
    href: "#",
  },
  {
    id: 3,
    name: "Simple Classic Slim Gold Link Chain Bracelet with Butterfly Charm",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_12.png",
    originalPrice: "399",
    salePrice: "55",
    href: "#",
  },
  {
    id: 4,
    name: "Pink Glass Beads Bracelet - Strechable",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/images_13.png",
    originalPrice: "250",
    salePrice: "49",
    href: "#",
  },
];

const Under99Products = () => {
  return (
    <section className="bg-background py-8 md:py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        <h2 className="mb-12 text-center text-[32px] font-medium text-text-primary">
          Under ₹99
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {productsData.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group block overflow-hidden text-center transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-lg"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="truncate text-sm text-text-primary">
                  {product.name}
                </p>
                <div className="mt-1 flex items-baseline justify-center gap-2">
                  <s className="text-sm text-[#999999]">
                    ₹{product.originalPrice}
                  </s>
                  <span className="text-base font-semibold text-[#E53935]">
                    ₹{product.salePrice}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="#"
            className="inline-block bg-black py-3 px-8 text-sm font-semibold uppercase tracking-wider text-white"
          >
            Show All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Under99Products;