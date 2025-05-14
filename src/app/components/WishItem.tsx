import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";

// Define the interface for a wishlist item
interface WishItemType {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Define the props interface for the WishItem component
interface WishItemProps {
  item: WishItemType;
  removeItem: (id: number) => void;
  //addToCart: (item: WishItemType) => void;
  isMobile: boolean;
}

const WishItem = ({ item, removeItem/*, addToCart*/, isMobile }: WishItemProps) => {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <div
        className={`flex ${isMobile
          ? "items-center gap-4"
          : "items-center gap-4 md:gap-6 md:justify-between"
          }`}
      >
        {/* Product Info */}
        <div className="flex items-center gap-4 flex-1">
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="w-16 h-16 object-cover"
          />
          <div className={isMobile ? "flex-1" : ""}>
            <h3 className="font-semibold text-lg">{item.name}</h3>
          </div>
          {/* Remove Button for Mobile */}
          {isMobile && (
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>

        {/* Actions for Desktop */}
        {!isMobile && (
          <div className="flex gap-12">
            <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
            <p className="text-lg font-bold">16/5/2024</p>
            <p className="text-lg font-bold"> Còn hàng</p>
            <div className="flex items-center gap-5">
              <button
                //onClick={() => addToCart(item)}
                className="bg-purple-600 text-white px-4 py-1 rounded"
              >
                <FontAwesomeIcon icon={faCartPlus} className="pr-2" />
                Thêm vào giỏ
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions for Mobile */}
      {isMobile && (
        <div className="flex items-center justify-between mt-3">
          <button
            //onClick={() => addToCart(item)}
            className="bg-purple-600 text-white px-4 py-1 rounded"
          >
            Thêm vào giỏ hàng
          </button>
          <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default WishItem;