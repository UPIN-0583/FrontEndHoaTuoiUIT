import OccasionsItem from "./components/OccasionsItem";
import ProductCard from "./components/ProductCard";
import BlogCard from "./components/BlogCard";
import Features from "./components/Features";
import Image from "next/image";
import Head from "next/head";
import ProductCarousel from "./components/ProductCarousel";
import Link from "next/link";

// Fetch data server-side
async function getOccasions() {
  const res = await fetch("http://backendhoatuoiuit.onrender.com/api/occasions", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

async function getProducts() {
  const res = await fetch("http://backendhoatuoiuit.onrender.com/api/products", { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  console.log(data);
  return data.map((item: any) => ({
    ...item,
    rating: (Math.random() * 0.3 + 4.7).toFixed(1),
    title: item.name,
    img: `https://backendhoatuoiuit.onrender.com${item.imageUrl}`,
    price: item.price,
    category: item.categoryName,
    oldPrice: undefined, // or item.oldPrice if available
    discount: undefined, // or item.discount if available
  }));
}

async function getBlogs() {
  const res = await fetch("https://backendhoatuoiuit.onrender.com/api/blog", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '');
}

export default async function Home() {
  const occasions: { imageUrl: string; name: string; description: string }[] = await getOccasions();
  const products = await getProducts();
  const blogs = await getBlogs();

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
              <Link href="/products" className="w-full md:w-auto bg-gradient-to-tr from-purple-600 to-pink-400 hover:from-pink-500 hover:to-purple-500 transition text-white px-6 py-3 rounded-lg shadow-md font-semibold text-center">
                Mua ngay →
              </Link>
              <Link href="/about" className="w-full md:w-auto text-gray-800 font-semibold hover:underline text-center">
                Tìm hiểu thêm
              </Link>
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
              imageUrl={`http://backendhoatuoiuit.onrender.com${item.imageUrl}`}
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
          <button className="px-6 py-2 bg-gradient-to-tr from-purple-600 to-pink-400 hover:from-pink-500 hover:to-purple-500 transition text-white rounded-full cursor-pointer">
            <Link href="/products">
              Xem tất cả
            </Link>
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
              <button className="mt-4 bg-gradient-to-tr from-purple-600 to-pink-400 hover:from-pink-500 hover:to-purple-500 transition px-4 py-2 rounded-full font-bold ">
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
              {products.slice(0, 6).map((product: any, index: number) => (
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
          <button className="px-6 py-2 bg-gradient-to-tr from-purple-600 to-pink-400 hover:from-pink-500 hover:to-purple-500 transition text-white rounded-full cursor-pointer">
            <Link href="/blog">
              Xem tất cả
            </Link>
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 mx-4 md:mx-12 lg:mx-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
            {blogs.slice(0, 3).map((post: any, index: number) => (
              <BlogCard
                key={index}
                imageSrc={`http://backendhoatuoiuit.onrender.com${post.thumbnailUrl}`}
                tag={post.author}
                author={post.author}
                date={post.createdAt}
                title={post.title}
                excerpt={stripHtml(post.content).slice(0, 100) + '...'}
                href={`/blog/${post.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Features />
    </div>
  );
}
