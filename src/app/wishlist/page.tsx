"use client";

import { useState } from "react";
import WishItem from "../components/WishItem";

const initialWishlist = [
  { id: 1, name: "Blue White Bouquets", price: 45, image: "/images/flowers/hoa1.jpg" },
  { id: 2, name: "Royal Pink Bouquets", price: 48, image: "/images/flowers/hoa2.jpg" },
  { id: 3, name: "Blue White Bouquets", price: 45, image: "/images/flowers/hoa3.jpg" },
  { id: 4, name: "Royal Pink Bouquets", price: 48, image: "/images/flowers/hoa4.jpg" },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);
// const [cart, setCart] = useState([]); // Simplified cart state for demo

  const removeItem = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

//   const addToCart = (item: WishItemType) => {
//     setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]); // Add item to cart with quantity 1
//     removeItem(item.id); // Optionally remove from wishlist after adding to cart
//   };

  return (
    <div className="bg-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Wishlist Items */}
        
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-3xl font-semibold text-black justify-center mb-6 text-center mt-6">Wishlist</h3>
          {wishlist.length > 0 ? (
            <>
              {/* Desktop View */}
              <div className="hidden md:flex flex-col gap-4">
                <div className="rounded-lg bg-purple-600 flex p-4 gap-16">
                  <p className="text-lg font-bold text-white">Product</p>
                  <p className="text-lg font-bold text-white ml-90">Price</p>
                  <p className="text-lg font-bold text-white">Date Added</p>
                  <p className="text-lg font-bold text-white">Stock Status</p>         
                </div>
                {wishlist.map((item) => (
                  <WishItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    //addToCart={addToCart}
                    isMobile={false}
                  />
                ))}
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex flex-col gap-4">
                {wishlist.map((item) => (
                  <WishItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    //addToCart={addToCart}
                    isMobile={true}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}