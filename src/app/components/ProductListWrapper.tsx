"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";

// Interface ánh xạ dữ liệu từ ProductsPage
interface DisplayProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  discountValue: number;
  finalPrice: number;
  averageRating: number;
  imageUrl: string;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  flowerNames: string[];
  occasionNames: string[];
  isFavorited: boolean;
}

interface ProductListWrapperProps {
  products: DisplayProduct[];
  sortOption: string;
  currentPage: number;
  totalProducts: number;
  pageSize: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backendhoatuoiuit.onrender.com";

// Hàm tạo slug
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

export default function ProductListWrapper({
  products,
  sortOption,
  currentPage,
  totalProducts,
  pageSize,
}: ProductListWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalProducts / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  // Xử lý thay đổi sortOption
  const onSortChange = useCallback(
    (value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("sort", value);
      newSearchParams.set("page", "1"); // Reset về trang 1 khi thay đổi sort
      router.push(`/products?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  // Hàm sửa URL hình ảnh
  const fixImageUrl = (url: string) => {
    return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  };

  return (
    <div>
      {/* Hiển thị số lượng sản phẩm */}
      <div className="flex justify-between mb-4 text-black">
        <p>
          Đang hiển thị {startIndex + 1}-{Math.min(startIndex + pageSize, totalProducts)} của {totalProducts} sản phẩm
        </p>
        <select
          className="border p-2 md:p-2 max-[480px]:p-1 rounded text-base md:text-base max-[480px]:text-xs"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Sắp xếp mặc định</option>
          <option value="price-low-high">Giá: Thấp đến Cao</option>
          <option value="price-high-low">Giá: Cao đến Thấp</option>
          <option value="rating-high-low">Đánh giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center items-center">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
            >
              <div className="group bg-white p-5 rounded-2xl shadow-md w-45 md:w-60 relative overflow-hidden hover:bg-gray-100 transition-colors duration-300">
                <Image
                  src={fixImageUrl(product.imageUrl)}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
                {/* Nút hover */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={`/wishlist?add=${product.id}`}>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`w-4 h-4 ${product.isFavorited ? "text-red-500" : "text-black"}`}
                      />
                    </button>
                  </Link>
                  <Link href={`/cart?add=${product.id}`}>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <FontAwesomeIcon icon={faCartShopping} className="text-black w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm mt-1">{product.occasionNames.join(", ")}</p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                    <span className="text-black">
                      {product.averageRating > 0 ? product.averageRating : 4.9}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-purple-600 font-medium mb-4">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.finalPrice)}
                  {product.discountValue > 0 && (
                    <span className="text-gray-500 line-through ml-2">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                    </span>
                  )}
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/products/${createSlug(product.name)}-${product.id}`}
                    className="text-purple-600 font-medium hover:underline text-sm"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">Không có sản phẩm nào.</p>
        )}
      </div>
      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Link
            href={`/products?page=${currentPage - 1}&sort=${sortOption}`}
            className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
          >
            Trước
          </Link>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/products?page=${page}&sort=${sortOption}`}
              className={`px-4 py-2 rounded ${currentPage === page ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            >
              {page}
            </Link>
          ))}
          <Link
            href={`/products?page=${currentPage + 1}&sort=${sortOption}`}
            className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
          >
            Sau
          </Link>
        </div>
      )}
    </div>
  );
}