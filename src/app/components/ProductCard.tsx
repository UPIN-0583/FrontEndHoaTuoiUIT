import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
  title: string;
  price: number;
  //category: string;
  oldPrice?: number; // Không bắt buộc
  discount?: string; // Không bắt buộc
  rating: number;
  img: string;
}

export default function ProductCard({ title, price, oldPrice, discount, rating, img }: ProductCardProps) {
  return (
    <div className="group bg-white p-5 rounded-2xl shadow-md w-45 md:w-60 relative overflow-hidden hover:bg-gray-100 transition-colors duration-300">
      {/* Phần hình ảnh */}
      <div className="relative">
        {/* Hiển thị discount nếu có */}
        {discount && (
          <span className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 text-xs rounded-full">
            {discount} off
          </span>
        )}

        {/* Hình ảnh sản phẩm */}
        <Image src={img} alt={title} width={200} height={200} className="rounded-xl" />

        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <FontAwesomeIcon icon={faHeart} className="text-black w-4 h-4" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <FontAwesomeIcon icon={faCartShopping} className="text-black w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Phần thông tin sản phẩm */}
      <div className="mt-4 text-left">
        <div className="flex justify-between">
          <p className="text-gray-500 text-sm mt-1">Bouquets</p>
          <div className="flex items-center gap-1 text-yellow-500">
            <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
            <span className="text-black">{rating}</span>
          </div>
        </div>
        <h4 className="font-semibold text-black">{title}</h4>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">${price}</span>
          {oldPrice && <span className="text-gray-400 line-through">${oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}