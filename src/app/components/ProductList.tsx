"use client";

import ProductCard from "./ProductCard";

const products = Array(12).fill({ title: "Rose Bouquets", category: "Bouquets", price: "$35", oldPrice: "$60", rating: 4.9, img: "/avatars/avatar1.jpg" });

export default function ProductList() {
  return (
    <div className="w-3/4">
      <div className="flex justify-between mb-4 text-black">
        <p>Showing 1-12 of 2550 results</p>
        <select className="border p-2 rounded">
          <option>Default Sorting</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
