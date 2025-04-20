"use client";

import { useState } from "react";
import SidebarFilter from "../components/SidebarFilter";
import ProductList from "../components/ProductList";

// Dữ liệu sản phẩm mẫu
const initialProducts = [
  { title: "Red Rose", category: "Bouquets", price: 35, oldPrice: 60, rating: 4.9, img: "/images/flowers/hoa1.jpg", flowerType: "Roses", occasion: "Anniversary" },
  { title: "Tulip Delight", category: "Bouquets", price: 30, rating: 4.7, img: "/images/flowers/hoa2.jpg", flowerType: "Tulips", occasion: "Birthday" },
  { title: "Lily Elegance", category: "Arrangements", price: 45, oldPrice: 70, rating: 4.8, img: "/images/flowers/hoa3.jpg", flowerType: "Lilies", occasion: "Weddings" },
  { title: "Orchid Bliss", category: "Bouquets", price: 50, rating: 4.9, img: "/images/flowers/hoa4.jpg", flowerType: "Orchids", occasion: "Thank You" },
  { title: "Daisy Charm", category: "Bouquets", price: 25, rating: 4.6, img: "/images/flowers/hoa1.jpg", flowerType: "Daisies", occasion: "Get Well Soon" },
  { title: "Sunflower ", category: "Arrangements", price: 40, rating: 4.8, img: "/images/flowers/hoa2.jpg", flowerType: "Sunflowers", occasion: "Graduation" },
  { title: "Mixed Rose", category: "Baskets", price: 55, rating: 4.9, img: "/images/flowers/hoa3.jpg", flowerType: "Roses", occasion: "Weddings" },
  { title: "Pink Vase", category: "Vases", price: 38, rating: 4.7, img: "/images/flowers/hoa3.jpg", flowerType: "Tulips", occasion: "Birthday" },
  { title: "White Bouquet", category: "Bouquets", price: 42, rating: 4.8, img: "/images/flowers/hoa2.jpg", flowerType: "Lilies", occasion: "Anniversary" },
  { title: "Purple Orchid Pot", category: "Pots", price: 60, rating: 4.9, img: "/images/flowers/hoa2.jpg", flowerType: "Orchids", occasion: "Thank You" },
  { title: "Daisy Sunshine", category: "Bouquets", price: 28, rating: 4.6, img: "/images/flowers/hoa1.jpg", flowerType: "Daisies", occasion: "Get Well Soon" },
  { title: "Sunflower Burst", category: "Bouquets", price: 35, rating: 4.7, img: "/images/flowers/hoa1.jpg", flowerType: "Sunflowers", occasion: "Graduation" },
];
export default function Products() {
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc sản phẩm dựa trên bộ lọc
  const filteredProducts = initialProducts.filter((product) => {
    const matchesFlower = selectedFlowers.length === 0 || selectedFlowers.includes(product.flowerType);
    const matchesOccasion = selectedOccasions.length === 0 || selectedOccasions.includes(product.occasion);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesFlower && matchesOccasion && matchesPrice;
  });

  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low-high") return a.price - b.price;
    if (sortOption === "price-high-low") return b.price - a.price;
    if (sortOption === "rating-high-low") return b.rating - a.rating;
    return 0; // default
  });

  return (
    <div className="bg-white">
      <div className="flex max-w-7xl mx-auto p-6 gap-6">
        <div className="flex-1 hidden md:block">
          <SidebarFilter
            selectedFlowers={selectedFlowers}
            setSelectedFlowers={setSelectedFlowers}
            selectedOccasions={selectedOccasions}
            setSelectedOccasions={setSelectedOccasions}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
        <div className="flex-4">
          <ProductList
            products={sortedProducts}
            sortOption={sortOption}
            setSortOption={setSortOption}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}