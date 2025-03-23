import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
  title: string;
  price: string;
  oldPrice?: string; // Không bắt buộc
  discount?: string; // Không bắt buộc
  rating: number;
  img: string;
}

export default function ProductCard({ title, price, oldPrice, discount, rating, img }: ProductCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md w-60">
      <div className="relative">
        {discount && (
          <span className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 text-xs rounded-full">
            {discount} off
          </span>
        )}
        <Image src="/avatars/avatar2.jpg" alt={title} width={200} height={200} className="rounded-xl" />
      </div>

      <div className="mt-4 text-left">
        <div className="flex justify-between">
            <p className="text-gray-500 text-sm mt-1">Bouquets</p>
            <div className="flex items-center gap-1 text-yellow-500 ">
                <FontAwesomeIcon icon={faStar} className="w-4 h-4"/>
                <span className="text-black">{rating}</span>
            </div>
        </div>
        <h4 className="font-semibold text-black">{title}</h4>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">{price}</span>
          {oldPrice && <span className="text-gray-400 line-through">{oldPrice}</span>}
        </div>
        
      </div>
    </div>
  );
}
