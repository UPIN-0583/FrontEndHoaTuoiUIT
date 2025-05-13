import Image from "next/image";
import ProductCard from "./ProductCard";

const products = [
  {
    title: "Rose Boutique",
    category: "Bouquets",
    price: "$35.00",
    oldPrice: "$70.00",
    discount: "50%",
    rating: 4.8,
    img: "/avatars/avatar1.jpg",
  },
  {
    title: "Rose Bouquets",
    category: "Bouquets",
    price: "$35.00",
    oldPrice: "$50.00",
    discount: "30%",
    rating: 4.9,
    img: "/avatars/avatar1.jpg",
  },
  {
    title: "Flower Basket",
    category: "Basket",
    price: "$80.00",
    oldPrice: "$100.00",
    discount: "20%",
    rating: 5.0,
    img: "/avatars/avatar1.jpg",
  },
  {
    title: "Colorful Rose",
    category: "Bouquets",
    price: "$45.00",
    oldPrice: "$50.00",
    discount: "10%",
    rating: 4.8,
    img: "/avatars/avatar1.jpg",
  },
  {
    title: "Pink Flowers",
    category: "Flowers",
    price: "$20.00",
    oldPrice: "$40.00",
    discount: "50%",
    rating: 4.9,
    img: "/avatars/avatar1.jpg",
  },
  {
    title: "Rose Bouquets",
    category: "Bouquets",
    price: "$90.00",
    oldPrice: "$100.00",
    discount: "10%",
    rating: 4.8,
    img: "/avatars/avatar1.jpg",
  },
];

export default function SaleOff() {
  return (
    <div className="py-8 sm:py-12 bg-white">
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
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
