"use client"

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const initialCart = [
  { id: 1, name: "Blue White Bouquets", price: 45, quantity: 4, image: "/images/flowers/hoa1.jpg" },
  { id: 2, name: "Royal Pink Bouquets", price: 48, quantity: 2, image: "/images/flowers/hoa2.jpg" },
  { id: 3, name: "Lavenders Bouquets", price: 24, quantity: 1, image: "/images/flowers/hoa3.jpg" },
  { id: 4, name: "Fresh Flower Basket", price: 42, quantity: 2, image: "/images/flowers/hoa4.jpg" },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const updateQuantity = (id : number , amount : number) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        return item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item;
      })
    );
  };
  
  const removeItem = (id : number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  
  const applyCoupon = () => {
    if (coupon === "DISCOUNT30") {
      setAppliedDiscount(30);
    } else {
      setAppliedDiscount(0);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - appliedDiscount;

  return (
    <div className="bg-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Cart Items */}
        <div className="md:w-2/3  bg-white shadow-md rounded-lg p-6">
        {cart.length > 0 ? (
          <div className="hidden md:flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="p-4 rounded-lg shadow-md flex items-center gap-6 justify-between">
                {/* Sản phẩm */}
                <div className="flex items-center gap-4 flex-1">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16" />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Số lượng */}
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                </div>

                {/* Tổng tiền */}
                <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>

                {/* Nút xóa */}
                <button onClick={() => removeItem(item.id)} className="text-red-500">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

          {/* Mobile View */}
          <div className="md:hidden flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                  </div>
                  <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between mt-6">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border p-2 rounded text-black text-sm md:text-lg mr-2"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button 
              onClick={applyCoupon}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3 bg-white shadow-md p-8 rounded-lg ">
          <h3 className="text-2xl font-semibold text-black ">Order Summary</h3>
          <div className="flex justify-between mt-6 text-black ">
            <span>Items</span> <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between mt-2 text-black">
            <span>Sub Total</span> <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 text-black">
            <span>Coupon Discount</span> <span>-${appliedDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-6 font-bold text-lg text-black ">
            <span>Total</span> <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-purple-600 text-white py-2 rounded-2xl mt-6">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
