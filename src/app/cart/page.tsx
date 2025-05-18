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
          <h3 className="text-2xl font-semibold text-black text-center mb-6">Giỏ hàng</h3>
          {cart.length > 0 ? (
            <>
              {/* Desktop View */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-md text-left border">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="px-2 py-1">Sản phẩm</th>
                      <th className="px-2 py-1">Số lượng</th>
                      <th className="px-2 py-1">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-2 py-1 flex items-center gap-2">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                          <div>
                            <p className="text-md font-semibold ml-2">{item.name}</p>
                            <p className="text-sm text-gray-500 ml-2">Giá: {item.price}</p>
                          </div>
                        </td>
                        <td className="px-2 py-1">
                          <button className="bg-purple-500 text-white px-3 py-1 mr-2 rounded-md hover:bg-purple-600 cursor-pointer">
                            -
                          </button>
                          {item.quantity}
                          <button className="bg-purple-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-purple-600 cursor-pointer">
                            +
                          </button>
                        </td>
                        <td className="px-2 py-1">${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            <p className="text-center text-gray-500">Giỏ hàng trống.</p>
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
              Dùng voucher
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3 bg-white shadow-md p-8 rounded-lg h-80">
          <h3 className="text-2xl font-semibold text-black text-center">Đặt hàng</h3>
          <div className="flex justify-between mt-6 text-black">
            <span>Sản phẩm</span>
            <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between mt-2 text-black">
            <span>Tạm tính</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 text-black">
            <span>Voucher giảm giá</span>
            <span>-${appliedDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-6 font-bold text-lg text-black">
            <span>Tổng cộng</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-purple-600 text-white py-2 rounded-2xl mt-6">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}