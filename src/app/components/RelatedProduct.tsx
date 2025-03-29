"use client";

import ProductCarousel from "./ProductCarousel";

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
    <section className="py-12 px-auto bg-white">
      <div className="items-center text-center mx-52">
          <h3 className="text-gray-500 uppercase font-semibold">Related Products</h3>
          <h2 className="text-4xl font-bold text-black">
            Explore <span className="text-purple-600">Related Products</span>
          </h2>
      </div>
      <ProductCarousel products={products} />
      <div className="items-center text-center mx-52 pt-12">
        <button className="px-6 py-2 bg-purple-600 text-white rounded-full">
          View All Products
        </button>  
      </div>
    </section>
  );
}
