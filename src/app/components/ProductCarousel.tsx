"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";

interface Product {
  title: string;
  category: string;
  price: number;
  rating: number;
  img: string;
  oldPrice?: number;
  discount?: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  return (
    <div className="mt-8 relative mx-4 md:mx-12 lg:mx-32">
      <div className="mx-auto max-w-[95%] hidden md:block">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={false}
          breakpoints={{
            640: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 30
            },
            1000: {
              slidesPerView: 3,
              centeredSlides: false,
              spaceBetween: 30
            },
            1385: {
              slidesPerView: 4,
              centeredSlides: false,
              spaceBetween: 30
            },
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
          className="!px-4"
        >
          {products.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center py-4">
              <div className="w-full flex justify-center">
                <ProductCard {...item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    {/* Custom Navigation Buttons */}
      <div className="hidden md:block">
        <div className="swiper-button-next !text-purple-800 !-right-2 " ></div>
        <div className="swiper-button-prev !text-purple-800 !-left-2 "></div>     
      </div>
      
      <div className="grid grid-cols-2 md:hidden gap-4 justify-items-center items-center">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
    
  );
};

export default ProductCarousel;
