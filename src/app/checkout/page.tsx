"use client"

import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal, faGooglePay, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const initialCart = [
  { id: 1, name: "Blue White Bouquets", price: 45000, quantity: 4, image: "/images/flowers/hoa1.jpg" },
  { id: 2, name: "Royal Pink Bouquets", price: 48000, quantity: 2, image: "/images/flowers/hoa2.jpg" },
  { id: 3, name: "Lavenders Bouquets", price: 24000, quantity: 1, image: "/images/flowers/hoa3.jpg" },
  { id: 4, name: "Fresh Flower Basket", price: 42000, quantity: 2, image: "/images/flowers/hoa4.jpg" },
];

export default function CheckoutPage() {
  const subtotal = initialCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.1; // 10% VAT
  const total = subtotal + vat;
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row">
        <div className="md:w-2/3 bg-white shadow-md rounded-lg p-6">
        {!showPayment ? (
          // Form nhập thông tin người mua
          <div>
            <h1 className="text-xl font-bold mb-4 text-black text-center">Thông tin người mua</h1>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">*Họ và tên:</label>
                <input type="text" className="w-full border rounded-md p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">*Điện thoại:</label>
                <input type="text" className="w-full border rounded-md p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Email của bạn:</label>
                <input type="email" className="w-full border rounded-md p-2" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium">Địa chỉ:</label>
                <input type="text" className="w-full border rounded-md p-2" />
              </div>
            </form>
            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-purple-600 text-white p-3 rounded-md text-lg"
            >
              Tiếp tục
            </button>
          </div>
        ) : (
          // Chọn phương thức thanh toán
          <div>
            <h1 className="text-xl font-bold mb-4 text-black text-center">Chọn phương thức thanh toán</h1>
            <div className="space-y-4">
              <div className="flex items-center border p-4 rounded-lg cursor-pointer hover:bg-gray-100">
                <FontAwesomeIcon icon={faPaypal} className="text-blue-600 text-2xl mr-3" />
                <span>Paypal</span>
              </div>
              <div className="flex items-center border p-4 rounded-lg cursor-pointer hover:bg-gray-100">
                <FontAwesomeIcon icon={faCcVisa} className="text-blue-500 text-2xl mr-3" />
                <span>Visa **** **** **** 8047</span>
              </div>
              <div className="flex items-center border p-4 rounded-lg cursor-pointer hover:bg-gray-100">
                <FontAwesomeIcon icon={faGooglePay} className="text-red-500 text-2xl mr-3" />
                <span>Google Pay</span>
              </div>
              <div className="flex items-center border p-4 rounded-lg cursor-pointer hover:bg-gray-100">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600 text-2xl mr-3" />
                <span>Cash On Delivery</span>
              </div>
              <button className="w-full bg-purple-600 text-white p-3 rounded-md text-lg">
                Tiếp tục
              </button>
            </div>
          </div>
        )}
      </div>
        
        <div className="md:w-1/3 bg-white shadow-md rounded-lg p-6 md:ml-4 mt-6">
          <h1 className="text-xl font-semibold text-black text-center">Thông tin đơn hàng</h1>
          <div className="pt-4 text-black">
            {initialCart.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div className="flex">
                  <Image src={item.image} alt={item.name} width={48} height={48} className="mr-4" />
                  <div className="">
                    <p className="text-black">{item.name}</p>
                    <p>{item.quantity} x {item.price} đ</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-2 text-gray-700">
              <span>Tạm tính:</span>
              <span>{subtotal.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between mt-2 text-gray-700">
              <span>Phụ phí:</span>
              <span>-</span>
            </div>
            <div className="flex justify-between mt-2 text-gray-700">
              <span>Giảm giá:</span>
              <span>-</span>
            </div>
            <div className="flex justify-between mt-2 text-gray-700">
              <span>Hóa đơn VAT:</span>
              <span>{vat.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Tổng cộng:</span>
              <span>{total.toLocaleString()} đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}