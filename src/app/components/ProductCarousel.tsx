"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";

interface Product {
  title: string;
  category: string;
  price: string;
  rating: number;
  img: string;
  oldPrice?: string;
  discount?: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  return (
    <div className="mt-8 relative mx-48">
      <div className="mx-10">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={4}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
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
      <div className="swiper-button-next !text-purple-800"></div>
      <div className="swiper-button-prev !text-purple-800"></div>
    </div>
  );
};

export default ProductCarousel;
