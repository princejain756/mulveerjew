"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const SmallGoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48" role="img" aria-label="Google logo">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C44.64,36.333,48,31,48,24C48,22.659,47.862,21.35,47.611,20.083z"></path>
    </svg>
);

const reviews = [
  {
    id: 1,
    name: 'PRIYANKSHI DUTTA',
    date: '2 years ago',
    rating: 5,
    text: 'They really sell cute and nice products. The one you liked on the phone will definitely be found when it’s in your own hands. Although I had a slight issue with the communication about the delivery, but after exchanging texts about my pet...',
    avatarInitial: 'P',
    avatarBg: 'bg-orange-400',
  },
  {
    id: 2,
    name: 'mamat',
    date: '2 years ago',
    rating: 5,
    text: 'I was sceptical at first since the prices were so low, but the quality is top tier and its cheap!! the packaging is really simple & cute too. the delivery was way faster than any other small businesses ive ever purchased from. im so glad i made this...',
    avatarInitial: 'M',
    avatarBg: 'bg-orange-400',
  },
  {
    id: 3,
    name: 'SUBHASHREE PATTNAIK',
    date: '3 years ago',
    rating: 5,
    text: 'The pieces I had ordered were super affordable unlike from any other site which is one of the major reasons i appreciate Oralia so much. And apart from that the quality was really awesome and i really loved them. They were totally as sam...',
    avatarInitial: 'S',
    avatarBg: 'bg-orange-400',
  },
  {
    id: 4,
    name: 'simi c.s.',
    date: '3 years ago',
    rating: 5,
    text: 'i\'ve bought many items from this store.I loved the items that I bought.N all the products of gud quality n affortable. Lookin\' forward to buy more.',
    avatarInitial: 'S',
    avatarBg: 'bg-orange-400',
  },
  {
    id: 5,
    name: 'Another Customer',
    date: '1 year ago',
    rating: 4,
    text: 'Great value for money. The designs are trendy and the quality is surprisingly good for the price. Will definitely shop again from Oralia.',
    avatarInitial: 'A',
    avatarBg: 'bg-blue-400'
  }
];

const CustomerReviews = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    
    return (
        <section className="bg-secondary py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-center font-bold text-text-primary mb-8 text-[40px] leading-tight">50000+ Happy Customers!</h2>

                <div className="flex justify-start mb-8">
                    <div className="bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-4 flex items-center space-x-4 max-w-sm">
                        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">O</div>
                        <div>
                            <p className="font-bold text-text-primary">Oralia Accessories</p>
                            <div className="flex items-center space-x-1">
                                <span className="text-sm font-bold text-text-secondary mr-1">4.5</span>
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <a href="#" className="text-sm text-text-secondary hover:underline">662 reviews on Google</a>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <button onClick={() => scroll('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors hidden md:flex items-center justify-center">
                        <ChevronLeft className="w-6 h-6 text-text-primary" />
                    </button>
                    
                    <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {reviews.map((review) => (
                            <div key={review.id} className="snap-start flex-shrink-0 w-[300px] sm:w-[360px] bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-xl ${review.avatarBg}`}>
                                            {review.avatarInitial}
                                        </div>
                                        <div>
                                            <p className="font-bold text-base text-text-primary">{review.name}</p>
                                            <p className="text-sm text-text-secondary">{review.date}</p>
                                        </div>
                                    </div>
                                    <a href="#" aria-label="View on Google"><SmallGoogleIcon /></a>
                                </div>

                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                </div>

                                <p className="text-[15px] leading-[1.6] text-text-primary">
                                    {review.text}
                                    <a href="#" className="text-text-secondary ml-1 hover:underline">Show more</a>
                                </p>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => scroll('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors hidden md:flex items-center justify-center">
                        <ChevronRight className="w-6 h-6 text-text-primary" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;