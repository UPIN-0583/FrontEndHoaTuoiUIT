"use client"; // Đánh dấu đây là Client Component

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';

const products = [
  { title: "Rose Boutique", category: "Bouquets", price: "$35.00", rating: 4.8, img: "/avatars/avatar1.jpg" },
  { title: "Rose Bouquets", category: "Bouquets", price: "$35.00", rating: 4.9, img: "/avatars/avatar1.jpg" },
  { title: "Flower Basket", category: "Basket", price: "$80.00", rating: 5.0, img: "/avatars/avatar1.jpg" },
  { title: "Colorful Rose", category: "Bouquets", price: "$45.00", rating: 4.8, img: "/avatars/avatar1.jpg" },
  { title: "Pink Flowers", category: "Flowers", price: "$20.00", oldPrice: "$40.00", discount: "50%", rating: 4.9, img: "/avatars/avatar1.jpg" },
  { title: "Rose Bouquets", category: "Bouquets", price: "$90.00", oldPrice: "$100.00", discount: "10%", rating: 4.8, img: "/avatars/avatar1.jpg" }
];

export default function TopSellers() {
  return (
    <section className="py-12 px-auto bg-white ">
      <div className="flex items-center justify-between text-center mx-52">
        <div className="text-left">
          <h3 className="text-gray-500 uppercase font-semibold">Our Products</h3>
          <h2 className="text-4xl font-bold text-black">
            Our <span className="text-purple-600">Top Seller Products</span>
          </h2>
        </div>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-full">
          View All Products
        </button>
      </div>

      <div className="mt-8 relative mx-48">
        <div className="mx-10">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={4}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            loop={true}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        {/* Custom Navigation Buttons */}
        <div className="swiper-button-next !text-purple-800" ></div>
        <div className="swiper-button-prev !text-purple-800"></div>
      </div>
    </section>
  );
}