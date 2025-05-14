"use client";

import ProductCard from "./ProductCard";

interface ProductListProps {
  products: {
    title: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    img: string;
    flowerType: string;
    occasion: string;
  }[];
  sortOption: string;
  setSortOption: (option: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function ProductList({ products, sortOption, setSortOption, currentPage, setCurrentPage }: ProductListProps) {
  const productsPerPage = 8; // Số sản phẩm mỗi trang
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 text-black">
        <p>
          Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, products.length)} of {products.length} results
        </p>
        <select
          className="border p-2 md:p-2 max-[480px]:p-1 rounded text-base md:text-base max-[480px]:text-xs "
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating-high-low">Rating: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center items-center">
        {paginatedProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded ${currentPage === page ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}