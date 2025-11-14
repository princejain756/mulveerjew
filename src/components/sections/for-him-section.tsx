import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  href: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Silver Plain Paperclip Chain',
    image: 'https://oralia.in/cdn/shop/files/plainpaperclipchain_600x.png?v=1682578559',
    oldPrice: 360,
    newPrice: 82,
    href: '#',
  },
  {
    id: 2,
    name: 'Unisex Link Design Classic Chain',
    image: 'https://oralia.in/cdn/shop/products/unisex-link-design-classic-chain-290076_600x.png?v=1678887856',
    oldPrice: 299,
    newPrice: 150,
    href: '#',
  },
  {
    id: 3,
    name: 'Rosegold Chain Necklace (D-19)',
    image: 'https://oralia.in/cdn/shop/products/rosegold-chain-necklace-d-19-158913_600x.jpg?v=1678884918',
    oldPrice: 599,
    newPrice: 299,
    href: '#',
  },
  {
    id: 4,
    name: 'Silver Chain Necklace (D-4)',
    image: 'https://oralia.in/cdn/shop/products/silver-chain-necklace-d-4-411210_600x.jpg?v=1678885149',
    oldPrice: 360,
    newPrice: 299,
    href: '#',
  },
];

const ForHimSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          For Him
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={product.href} className="block">
                <div className="aspect-square w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-sm text-gray-800 ">{product.name}</h3>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold text-gray-900 mr-2">
                      Rs. {product.newPrice}
                    </span>
                    <s className="text-gray-500">Rs. {product.oldPrice}</s>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="#"
            className="inline-block bg-black text-white uppercase text-xs font-bold py-3 px-8 tracking-widest hover:bg-gray-800 transition-colors"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForHimSection;