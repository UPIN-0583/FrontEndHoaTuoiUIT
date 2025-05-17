"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faShoppingCart, faCreditCard, faHeart } from "@fortawesome/free-solid-svg-icons";

interface ProductActionsProps {
  productId: number;
  isFavorited: boolean;
}

export default function ProductActions({ productId, isFavorited }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {/* Quantity Selector */}
      <div className="flex flex-row mt-4 justify-between lg:justify-normal lg:gap-10">
        <div className="flex items-center">
          <button
            className="p-2 border rounded-lg"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="mx-4">{quantity}</span>
          <button className="p-2 border rounded-lg" onClick={() => setQuantity(quantity + 1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <a href={`/cart?add=${productId}&quantity=${quantity}`}>
          <button className="flex-4 bg-purple-600 text-white p-3 rounded-lg flex sm:flex-row flex-col items-center justify-center gap-2">
            <FontAwesomeIcon icon={faShoppingCart} />
            Add To Cart
          </button>
        </a>
        <button className="flex-4 bg-pink-500 text-white p-3 rounded-lg flex sm:flex-row flex-col items-center justify-center gap-2">
          <FontAwesomeIcon icon={faCreditCard} />
          Buy Now
        </button>
        <div className="flex-1 items-center">
          <button className="p-2 border rounded-lg">
            <FontAwesomeIcon icon={faHeart} className={isFavorited ? "text-red-500" : ""} />
          </button>
        </div>
      </div>
    </>
  );
}