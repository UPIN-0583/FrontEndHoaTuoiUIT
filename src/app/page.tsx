import OccasionsItem from "./components/OccasionsItem"
import ProductCarousel from "./components/ProductCarousel";
import ProductCard from "./components/ProductCard";
import BlogCard from "./components/BlogCard";
import Features from "./components/Features";

import Image from "next/image";

const occasions = [
  { title: "Weddings", products: 42, img: "/images/themes/camon.png" },
  { title: "Birthday", products: 56, img: "/images/themes/chiabuon.png" },
  { title: "Anniversary", products: 11, img: "/images/themes/chucmung.png" },
  { title: "Thank You", products: 48, img: "/images/themes/tinhyeu.png" },
  { title: "Graduation", products: 13, img: "/images/themes/xinloi.png" },
];

const products = [
  {id:1, title: "Rose Boutique", category: "Bouquets", price: 35.00, rating: 4.8, img: "/images/flowers/hoa1.jpg" },
  {id:2, title: "Rose Bouquets", category: "Bouquets", price: 35.00, rating: 4.9, img: "/images/flowers/hoa2.jpg" },
  {id:3, title: "Flower Basket", category: "Basket", price: 80.00, rating: 5.0, img: "/images/flowers/hoa3.jpg" },
  {id:4, title: "Colorful Rose", category: "Bouquets", price: 45.00, rating: 4.8, img: "/images/flowers/hoa4.jpg" },
  {id:5, title: "Pink Flowers", category: "Flowers", price: 20.00, oldPrice:40.00, discount: "50%", rating: 4.9, img: "/images/flowers/hoa2.jpg" },
  {id:5, title: "Rose Bouquets", category: "Bouquets", price: 90.00, oldPrice: 100.00, discount: "10%", rating: 4.8, img: "/images/flowers/hoa3.jpg" }
];

const blogPosts = [
  {
    image: "/images/blogs/b3.jpg",
    category: "Wedding Bouquet",
    author: "Jenny Alexander",
    date: "13 Dec 2024",
    title: "Choosing the Perfect Wedding Bouquet for Your Big Day",
    excerpt:
      "Khám phá cách chọn hoa cưới hoàn hảo cho ngày trọng đại của bạn, từ màu sắc đến phong cách...",
    link: "#",
  },
  {
    image: "/images/blogs/b8.jpg",
    category: "Anniversary Flowers",
    author: "Jenny Alexander",
    date: "12 Dec 2024",
    title: "Celebrating Love: The Best Flowers for Every Anniversary",
    excerpt:
      "Gợi ý những loài hoa ý nghĩa cho từng dịp kỷ niệm, giúp bạn thể hiện tình yêu trọn vẹn...",
    link: "#",
  },
  {
    image: "/images/blogs/b9.jpg",
    category: "Bouquet Tips",
    author: "Jenny Alexander",
    date: "11 Dec 2024",
    title: "Top Tips for Designing Your Floral Bouquets for Maximum Impact",
    excerpt:
      "Những mẹo quan trọng để thiết kế bó hoa đẹp mắt, thu hút mọi ánh nhìn trong mọi dịp lễ...",
    link: "#",
}];

export default function Home() {
  return (
    <div>
      {/* <Hero /> */}
      <div className="bg-gray-100 shadow-md px-4 sm:px-12">
          <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center py-8 px-4 sm:px-12 gap-8">
              <div className="text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mt-4 ">
                      <span className="text-purple-600">🌸Hoa Tươi UIT</span> <br /> Hoa của sự tinh túy
                  </h2>
                  <p className="text-gray-600 mt-4 max-w-xl text-sm sm:text-base">
                      Hoa Tươi UIT cung cấp giỏ hoa tươi, hộp hoa đẹp, bó hoa nghệ thuật được thiết kế tinh tế, phù hợp cho mọi dịp như sinh nhật, kỷ niệm, khai trương hay tặng người thân. Đặt hoa online dễ dàng, đa dạng mẫu mã, giá hợp lý.
                  </p>
                  <div className="mt-8 md:mt-16 space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center justify-center md:justify-start">
                      <a href="#" className="w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-purple-700 text-center">
                          Mua ngay →
                      </a>
                      <a href="#" className="w-full md:w-auto text-gray-800 font-semibold hover:underline text-center">
                          Xem thêm
                      </a>
                  </div>
                  <div className="flex mt-6 items-center space-x-4 justify-center md:justify-start">
                      {/* Danh sách Avatar */}
                      <div className="flex -space-x-2">
                          <Image src="/avatars/avatar1.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 1" />
                          <Image src="/avatars/avatar2.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 2" />
                          <Image src="/avatars/avatar3.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 3" />
                          <div className="w-10 h-10 bg-pink-400 text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-white">
                              +
                          </div>
                      </div>
                      <div>
                          <p className="text-black text-lg font-semibold">4.9+ ⭐</p>
                          <p className="text-gray-500 text-sm">Hơn 95k+ người dùng tin tưởng</p>
                      </div>
                  </div>
              </div>
              <div className="relative w-full md:w-auto">
                  <Image
                      src="/hero-image.jpg"
                      alt="Flower Girl"
                      width={200}
                      height={300}
                      className="rounded-lg shadow-lg w-full md:w-auto"
                  />
              </div>
          </section>
      </div>

      {/* <Occasions/> */}
      <section className="text-center py-12 bg-white">
        <h3 className="text-gray-500 uppercase font-semibold">Occasions</h3>
        <h2 className="text-4xl font-bold text-black">
          Shop By <span className="text-purple-600">Occasions</span>
        </h2>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          {occasions.map((item, index) => (
            <OccasionsItem
              key={index} 
              img={item.img}
              title={item.title}
              products={item.products}
          />
          ))}
        </div>
      </section>

      <section className="py-12 px-auto bg-white ">
        <div className="flex items-center justify-between text-center mx-4 md:mx-12 lg:mx-32">
          <div className="text-left">
            <h3 className="text-gray-500 uppercase font-semibold">Our Products</h3>
            <h2 className="text-4xl font-bold text-black">
              Our <span className="text-purple-600">Top Seller Products</span>
            </h2>
          </div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-full cursor-pointer"
          >
            View All Products
          </button>
        </div>
        <ProductCarousel products={products} />
      </section>

      {/* <SaleOff/> */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white">
          {/* Banner */}
          <div className="relative bg-gray-100 rounded-xl overflow-hidden h-[300px] md:h-full">
            <Image
              src="/saleoff-image.jpg"
              alt="SeleOff Banner"
              width={300}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col justify-end p-6 text-white text-center">
              <h3 className="text-3xl sm:text-4xl font-bold">50% Off</h3>
              <p className="text-sm">06 DEC - 16 DEC</p>
              <button className="mt-4 bg-purple-600 px-4 py-2 rounded-full font-bold hover:bg-purple-700 transition-colors">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black text-center md:text-left">
              <span className="text-purple-600">Deals</span> of the Day
            </h2>
            <p className="text-gray-500 mb-6 text-center md:text-left">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* <BlogSection/> */}
      <section className="py-12 bg-white">
        {/* Tiêu đề chính */}
        <div className="flex items-center justify-between text-center mx-4 md:mx-12 lg:mx-32">
          <div className="text-left">
            <h3 className="text-gray-500 uppercase font-semibold">News & Blogs</h3>
            <h2 className="text-4xl font-bold text-black">
              Our Latest <span className="text-purple-600">News & Blogs</span>
            </h2>
          </div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-full cursor-pointer">
            View All Blogs
          </button>
        </div>

        {/* Danh sách bài viết */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 mx-4 md:mx-12 lg:mx-32">
          {/* Danh sách bài viết (chỉ hiển thị 3 blog) */}
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
  
      <Features/>
    </div>
  );
}
