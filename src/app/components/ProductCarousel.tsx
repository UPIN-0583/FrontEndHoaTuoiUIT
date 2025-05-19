"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backendhoatuoiuit.onrender.com";

const fixImageUrl = (url: string) => {
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
};

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

interface Product {
  id: number;
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
  // Giới hạn tối đa 4 sản phẩm
  const formattedProducts = products.slice(0, 4).map((product) => ({
    ...product,
    img: fixImageUrl(product.img),
  }));

  console.log("Number of products in carousel:", formattedProducts.length);

  return (
    <div className="relative mx-4 md:mx-12 lg:mx-32">
      {/* Carousel cho desktop */}
      <div className="mx-auto max-w-full hidden md:block">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={false}
          breakpoints={{
            640: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 30,
            },
            1000: {
              slidesPerView: 3,
              centeredSlides: false,
              spaceBetween: 30,
            },
            1385: {
              slidesPerView: 4,
              centeredSlides: false,
              spaceBetween: 30,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true} // Loop nếu có từ 2 sản phẩm trở lên
          className="!px-4"
        >
          {formattedProducts.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center items-center py-4">
              <div className="max-w-full flex justify-center">
                <Link
                  href={`/products/${createSlug(item.title)}`}
                  className="group rounded-3xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50 max-w-full"
                >
                  <ProductCard {...item} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="hidden md:block">
        <div
          className="swiper-button-prev !text-purple-800 !-left-2 w-10 h-10 bg-white rounded-full shadow-md !opacity-100 disabled:!opacity-50"
        />
        <div
          className="swiper-button-next !text-purple-800 !-right-2 w-10 h-10 bg-white rounded-full shadow-md !opacity-100 disabled:!opacity-50"
        />
      </div>

      {/* Grid cho mobile */}
      <div className="grid grid-cols-2 md:hidden gap-4 justify-items-center items-center">
        {formattedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${createSlug(product.title)}`}
            className="group rounded-3xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50 max-w-[200px]"
          >
            <ProductCard {...product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;