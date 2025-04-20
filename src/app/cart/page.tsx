"use client";

import { useState } from "react";
import CartItem from "../components/CartItems";

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

  const updateQuantity = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id: number) => {
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
        <div className="md:w-2/3 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-black text-center mb-6">Shopping Cart</h3>
          {cart.length > 0 ? (
            <>
              {/* Desktop View */}
              <div className="hidden md:flex flex-col gap-4">
                <div className="rounded-lg bg-purple-600 flex p-4 gap-16 justify-between">
                    <p className="text-lg font-bold text-white">Product</p>
                    <div className="flex gap-12 mr-12">
                      <p className="text-lg font-bold text-white">Quantity</p>
                      <p className="text-lg font-bold text-white">Price</p>  
                    </div>   
                </div>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                    isMobile={false}
                  />
                ))}
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex flex-col gap-4">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                    isMobile={true}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          <div className="flex flex-row justify-between mt-6 gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border p-2 rounded text-black text-sm md:text-lg"
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
        <div className="md:w-1/3 bg-white shadow-md p-8 rounded-lg h-80">
          <h3 className="text-2xl font-semibold text-black">Order Summary</h3>
          <div className="flex justify-between mt-6 text-black">
            <span>Items</span>
            <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between mt-2 text-black">
            <span>Sub Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 text-black">
            <span>Coupon Discount</span>
            <span>-${appliedDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-6 font-bold text-lg text-black">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-purple-600 text-white py-2 rounded-2xl mt-6">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}