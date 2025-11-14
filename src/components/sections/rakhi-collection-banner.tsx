import Link from 'next/link';
import Image from 'next/image';

const RakhiCollectionBanner = () => {
  return (
    <section aria-label="Rakhi Collection 2025" className="w-full bg-white">
      <div className="py-8 md:py-12">
        <Link 
          href="/collections/rakhi" 
          className="block relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group"
        >
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1f137fc8-4b02-4264-bdfc-8f939d58e7c0-oralia-in/assets/images/IMG_8739_small-28.jpg"
            alt="A close-up of a decorative rakhi with blue and gold beads on a warm beige background."
            layout="fill"
            objectFit="cover"
            quality={90}
            className="z-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center p-4">
            <h2 
              className="text-white font-serif text-4xl sm:text-5xl uppercase tracking-widest font-light text-center"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
            >
              Rakhi Collection 2025
            </h2>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default RakhiCollectionBanner;