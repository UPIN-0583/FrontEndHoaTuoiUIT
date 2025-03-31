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
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* Cart Items */}
        <div className="w-2/3 bg-white shadow-md rounded-lg p-6">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-purple-500 text-white">
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Subtotal</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b text-black">
                  <td className="p-3 flex items-center gap-3">
                    <Image src={item.image} alt={item.name} width={48} height={48}  className="w-12 h-12" />
                    {item.name}
                  </td>
                  <td className="p-3">${item.price.toFixed(2)}</td>
                  <td className="p-3 ">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded mr-2"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded ml-2"
                    >
                      +
                    </button>
                  </td>
                  <td className="p-3">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-3">
                    <button onClick={() => removeItem(item.id)} className="text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-6">
            <div className="flex gap-3 text-black">
              <input
                type="text"
                placeholder="Coupon Code"
                className="border p-2 rounded text-black"
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
            <button className="text-red-500">Clear Shopping Cart</button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-1/3 bg-white shadow-md p-8 rounded-lg ">
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
