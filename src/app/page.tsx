"use client"

import OccasionsItem from "./components/OccasionsItem";
import ProductCarousel from "./components/ProductCarousel";
import ProductCard from "./components/ProductCard";
import BlogCard from "./components/BlogCard";
import Features from "./components/Features";
import Head from 'next/head';

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

// const occasions = [
//   { title: "Đám cưới", products: 42, img: "/images/themes/camon.png" },
//   { title: "Sinh nhật", products: 56, img: "/images/themes/chiabuon.png" },
//   { title: "Kỷ niệm", products: 11, img: "/images/themes/chucmung.png" },
//   { title: "Cảm ơn", products: 48, img: "/images/themes/tinhyeu.png" },
//   { title: "Tốt nghiệp", products: 13, img: "/images/themes/xinloi.png" },
// ];

const products = [
  { id: 1, title: "Hoa Hồng Boutique", category: "Bó hoa", price: 35.00, rating: 4.8, img: "/images/flowers/hoa1.jpg" },
  { id: 2, title: "Bó Hoa Hồng", category: "Bó hoa", price: 35.00, rating: 4.9, img: "/images/flowers/hoa2.jpg" },
  { id: 3, title: "Giỏ Hoa Nghệ Thuật", category: "Giỏ hoa", price: 80.00, rating: 5.0, img: "/images/flowers/hoa3.jpg" },
  { id: 4, title: "Hoa Hồng Sặc Sỡ", category: "Bó hoa", price: 45.00, rating: 4.8, img: "/images/flowers/hoa4.jpg" },
  { id: 5, title: "Hoa Hồng Trắng", category: "Hoa", price: 20.00, oldPrice: 40.00, discount: "50%", rating: 4.9, img: "/images/flowers/hoa2.jpg" },
  { id: 6, title: "Bó Hoa Hồng Đỏ", category: "Bó hoa", price: 90.00, oldPrice: 100.00, discount: "10%", rating: 4.8, img: "/images/flowers/hoa3.jpg" }
];

const blogPosts = [
  {
    image: "/images/blogs/b3.jpg",
    category: "Hoa cưới",
    author: "Jenny Alexander",
    date: "13 Thg 12, 2024",
    title: "Chọn bó hoa cưới hoàn hảo cho ngày trọng đại của bạn",
    excerpt:
      "Khám phá cách chọn hoa cưới phù hợp, từ màu sắc đến phong cách, giúp ngày vui thêm trọn vẹn...",
    link: "#",
  },
  {
    image: "/images/blogs/b8.jpg",
    category: "Hoa kỷ niệm",
    author: "Jenny Alexander",
    date: "12 Thg 12, 2024",
    title: "Kỷ niệm tình yêu: Hoa đẹp cho từng cột mốc đáng nhớ",
    excerpt:
      "Gợi ý những loài hoa ý nghĩa cho dịp kỷ niệm, giúp bạn thể hiện tình cảm một cách trọn vẹn...",
    link: "#",
  },
  {
    image: "/images/blogs/b9.jpg",
    category: "Mẹo cắm hoa",
    author: "Jenny Alexander",
    date: "11 Thg 12, 2024",
    title: "Mẹo thiết kế bó hoa ấn tượng cho mọi dịp lễ",
    excerpt:
      "Những bí quyết để bạn tự tay tạo ra những bó hoa nghệ thuật thu hút mọi ánh nhìn...",
    link: "#",
  },
];

export default function Home() {

  type Occasion = {
    imageUrl: string;
    name: string;
    description: string;
  };

  const [occasions, setOccasions] = useState<Occasion[]>([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/occasions')
      .then((res) => {
        setOccasions(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <Head>
        <title>Trang chủ | Hoa Tươi UIT</title>
        <meta name="description" content="Hoa Tươi UIT cung cấp giỏ hoa tươi, hộp hoa đẹp, giao nhanh tận nơi nội ô làng đại học. Đặt hoa online dễ dàng, đa dạng mẫu mã, giá hợp lý." />
        <meta name="keywords" content="hoa tươi UIT, hoa của sự tinh túy, hoa tươi sinh viên UIT, giỏ hoa tươi, hộp hoa tươi, bình hoa tươi, cách bảo quản hoa tươi lâu, cách chọn hoa tươi theo dịp lễ, hoa tặng vợ, hoa tặng Valentine, hoa Giáng Sinh, hoa khai trương, hoa tặng tốt nghiệp,mua hoa hồng, mua hoa cúc, mua hoa tulip, mua hoa hướng dương, mua hoa lan, mua hoa mẫu đơn" />
        <meta property="og:title" content="Hoa Tươi UIT - Hoa của sự tinh túy" />
        <meta property="og:description" content="Cửa hàng hoa tươi online, đa dạng mẫu mã, giao nhanh chóng tận nơi. Phù hợp mọi dịp lễ!" />
        <meta property="og:image" content="URL ảnh thumbnail" />
        <meta name="google-site-verification" content="8osYK3jlo0lQlpudXAb1b68GCFIdl7dOh2xnM5HNI8E" />
      </Head>

      <div className="bg-gray-100 shadow-md px-4 sm:px-12">
        <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center py-8 px-4 sm:px-12 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mt-4 ">
              <span className="text-purple-600">🌸Hoa Tươi UIT</span> <br /> Hoa của sự tinh túy
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl text-sm sm:text-base">
              Hoa Tươi UIT cung cấp giỏ hoa, bó hoa và hộp hoa tươi thiết kế tinh tế, phù hợp cho mọi dịp như sinh nhật, kỷ niệm, khai trương hay tỏ tình. Mẫu mã đa dạng, màu sắc hài hòa, đặt hoa nhanh chóng, giao hàng đúng hẹn, giá cả hợp lý – giúp bạn gửi gắm yêu thương một cách trọn vẹn.
            </p>
            <div className="mt-8 md:mt-8 space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center justify-center md:justify-start">
              <a href="#" className="w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-purple-700 text-center">
                Mua ngay →
              </a>
              <a href="#" className="w-full md:w-auto text-gray-800 font-semibold hover:underline text-center">
                Tìm hiểu thêm
              </a>
            </div>
            <div className="flex mt-6 items-center space-x-4 justify-center md:justify-start">
              <div className="flex -space-x-2">
                <Image src="/avatars/avatar1.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="Khách hàng 1" />
                <Image src="/avatars/avatar2.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="Khách hàng 2" />
                <Image src="/avatars/avatar3.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="Khách hàng 3" />
                <div className="w-10 h-10 bg-pink-400 text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-white">
                  +
                </div>
              </div>
              <div>
                <p className="text-black text-lg font-semibold">4.9+ ⭐</p>
                <p className="text-gray-500 text-sm">Hơn 95,000 khách hàng tin tưởng</p>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-auto">
            <Image
              src="/hero-image.jpg"
              alt="Hình ảnh minh họa"
              width={200}
              height={300}
              className="rounded-lg shadow-lg w-full md:w-auto"
            />
          </div>
        </section>
      </div>

      <section className="text-center py-12 bg-white">
        <h3 className="text-gray-500 uppercase font-semibold">Dịp đặc biệt</h3>
        <h2 className="text-4xl font-bold text-black">
          Mua hoa theo <span className="text-purple-600">dịp lễ</span>
        </h2>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          {occasions.map((item, index) => (
            <OccasionsItem
              key={index}
              imageUrl={`http://localhost:8080` + item.imageUrl}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="py-12 px-auto bg-white ">
        <div className="flex items-center justify-between text-center mx-4 md:mx-12 lg:mx-32">
          <div className="text-left">
            <h3 className="text-gray-500 uppercase font-semibold">Sản phẩm</h3>
            <h2 className="text-4xl font-bold text-black">
              Các sản phẩm <span className="text-purple-600">bán chạy</span>
            </h2>
          </div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-full cursor-pointer">
            Xem tất cả
          </button>
        </div>
        <ProductCarousel products={products} />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white">
          <div className="relative bg-gray-100 rounded-xl overflow-hidden h-[300px] md:h-full">
            <Image
              src="/saleoff-image.jpg"
              alt="Giảm giá"
              width={300}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col justify-end p-6 text-white text-center">
              <h3 className="text-3xl sm:text-4xl font-bold">Giảm 50%</h3>
              <p className="text-sm">06/12 - 16/12</p>
              <button className="mt-4 bg-purple-600 px-4 py-2 rounded-full font-bold hover:bg-purple-700 transition-colors">
                Mua ngay
              </button>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black text-center md:text-left">
              <span className="text-purple-600">Ưu đãi</span> trong ngày
            </h2>
            <p className="text-gray-500 mb-6 text-center md:text-left">
              Nhanh tay lựa chọn sản phẩm với mức giá cực hấp dẫn.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="flex items-center justify-between text-center mx-4 md:mx-12 lg:mx-32">
          <div className="text-left">
            <h3 className="text-gray-500 uppercase font-semibold">Tin tức</h3>
            <h2 className="text-4xl font-bold text-black">
              Bài viết & <span className="text-purple-600">Tin tức mới</span>
            </h2>
          </div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-full cursor-pointer">
            Xem tất cả
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 mx-4 md:mx-12 lg:mx-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
            {blogPosts.slice(0, 3).map((post, index) => (
              <BlogCard
                key={index}
                imageSrc={post.image}
                tag={post.category}
                author={post.author}
                date={post.date}
                title={post.title}
                excerpt={post.excerpt}
                href={post.link}
              />
            ))}
          </div>
        </div>
      </section>

      <Features />
    </div>
  );
}
