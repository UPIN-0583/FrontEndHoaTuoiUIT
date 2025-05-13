// src/app/components/Account.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OderItem from "../components/OderItems";

export default function Account() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [formData, setFormData] = useState(user);
  const [avatar, setAvatar] = useState("/avatars/avatar1.jpg"); // Ảnh mặc định
  const [activeSection, setActiveSection] = useState("Personal Information"); // Trạng thái để theo dõi mục được chọn

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    setUser(formData);
    alert("Thông tin đã được cập nhật!");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  const initialOder = [
  { id: 1, name: "Blue White Bouquets", occasion: "Bouquet", image: "/images/flowers/hoa1.jpg" },
  { id: 2, name: "Royal Pink Bouquets", occasion: "Bouquet", image: "/images/flowers/hoa2.jpg" },
  { id: 3, name: "Lavenders Bouquets", occasion: "Bouquet", image: "/images/flowers/hoa3.jpg" },
  { id: 4, name: "Fresh Flower Basket", occasion: "Basket", image: "/images/flowers/hoa4.jpg" },
  ];
  const initialDeliveredOrder = [
  { id: 5, name: "Red Rose", occasion: "Bouquet", image: "/images/flowers/hoa3.jpg" },
  ];

  const [Oder, setOder] = useState(initialOder);
  const [deliveredOrder, setDeliveredOrder] = useState(initialDeliveredOrder);
  
  const removeItem = (id: number, listType: "pending" | "delivered") => {
  if (listType === "pending") {
    setOder((prevOder) => prevOder.filter((item) => item.id !== id));
  } else if (listType === "delivered") {
    setDeliveredOrder((prevDelivered) => prevDelivered.filter((item) => item.id !== id));
  }
  };

  const [address, setAddress] = useState("123 Quang Trung, Linh Trung, Thủ Đức, TP. Hồ Chí Minh");

  const [paymentInfo, setPaymentInfo] = useState({
    cardHolderName: "Nguyen Van A",
    cardNumber: "**** **** **** 1234",
    expiryDate: "12/26",
    cvv: "123",
  });

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Danh sách các mục trong sidebar
  const sidebarItems = [
    "Personal Information",
    "My Orders",
    "Manage Address",
    "Payment Method",
    "Password Manager",
    "Logout",
  ];

  // Hàm render nội dung dựa trên mục được chọn
  const renderContent = () => {
    switch (activeSection) {
      case "Personal Information":
        return (
          <div className="w-2/3 px-6">
            <div className="flex justify-center items-center flex-col">
              {/* Avatar */}
              <div className="relative w-24 h-24">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="rounded-full border shadow-lg object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer">
                  ✏️
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
            </div>

            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name..."
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name..."
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone..."
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-full text-sm text-gray-900"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleUpdate}
                className="w-52 py-3.5 bg-purple-600 text-white rounded-full"
              >
                Update Changes
              </button>
            </form>
          </div>
        );

      case "My Orders":
        return (
          <div className="w-2/3 px-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Orders (2)</h2>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded-lg px-3 py-1 pr-8 text-sm text-gray-700 focus:outline-none">
                  <option>All</option>
                  <option>Pending</option>
                  <option>Delivered</option>
                </select>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">▼</span>
              </div>
            </div>

            {/* Đơn hàng 1 - Pending */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="grid grid-cols-4 gap-4 text-sm text-gray-700 bg-pink-300 rounded-tl-2xl rounded-tr-xl p-2">
                <div>
                  <p className="font-bold">Order ID</p>
                  <p>#SDGT1254FD</p>
                </div>
                <div>
                  <p className="font-bold">Total Payment</p>
                  <p>$354.00</p>
                </div>
                <div>
                  <p className="font-bold">Payment Method</p>
                  <p>Paypal</p>
                </div>
                <div>
                  <p className="font-bold">Estimated Delivery D...</p>
                  <p>21 December 2024</p>
                </div>
              </div>
              {Oder.map((item) => (
                <OderItem
                  key={item.id}
                  item={item}
                  removeItem={() => removeItem(item.id, "pending")} // Truyền listType là "pending"
                  isMobile={false}
                />
              ))}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-orange-400 rounded-full"></span>
                  <p className="text-sm text-gray-600">Your Order has been Accepted</p>
                </div>
                <div className="space-x-2">
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Track Order</button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm">Invoice</button>
                  <button className="text-red-500 text-sm">Cancel Order</button>
                </div>
              </div>
            </div>

            {/* Đơn hàng 2 - Delivered */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="grid grid-cols-4 gap-4 text-sm text-gray-700 bg-pink-300 rounded-tl-2xl rounded-tr-xl p-2">
                <div>
                  <p className="font-bold">Order ID</p>
                  <p>#SDGT7412DF</p>
                </div>
                <div>
                  <p className="font-bold">Total Payment</p>
                  <p>$35.00</p>
                </div>
                <div>
                  <p className="font-bold">Payment Method</p>
                  <p>Cash</p>
                </div>
                <div>
                  <p className="font-bold">Delivered Date</p>
                  <p>15 December 2024</p>
                </div>
              </div>

              {deliveredOrder.map((item) => (
                <OderItem
                  key={item.id}
                  item={item}
                  removeItem={() => removeItem(item.id, "delivered")} // Truyền listType là "delivered"
                  isMobile={false}
                />
              ))}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-green-400 rounded-full"></span>
                  <p className="text-sm text-gray-600">Your Order has been Delivered</p>
                </div>
                <div className="space-x-2">
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Add Review</button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm">Invoice</button>
                </div>
              </div>
            </div>
          </div>
        );

      case "Manage Address":
        return (
          <div className="w-2/3 px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Address</h2>
            <p className="text-gray-600 mb-4">Manage your addresses here.</p>
            <div className="space-y-4">
              {/* Ô nhập địa chỉ */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Your Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  placeholder="Enter your address..."
                />
              </div>
              {/* Nút Cập nhật */}
              <button
                type="button"
                onClick={() => {
                  alert("Cập nhật địa chỉ thành công!");
                }}
                className="w-52 py-3.5 bg-purple-600 text-white rounded-full"
              >
                Update Changes
              </button>
            </div>
          </div>
        );

      case "Payment Method":
        return (
          <div className="w-2/3 px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
            <p className="text-gray-600 mb-4">Manage your payment methods here.</p>
            <div className="space-y-4">
              {/* Card Holder Name */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Card Holder Name*</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={paymentInfo.cardHolderName}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  placeholder="Enter card holder name..."
                />
              </div>
              {/* Card Number */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Card Number*</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  placeholder="Enter card number..."
                />
              </div>
              {/* Expiry Date và CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Expiry Date*</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">CVV*</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                    placeholder="CVV"
                  />
                </div>
              </div>
              {/* Nút Cập nhật */}
              <button
                type="button"
                onClick={() => {
                  alert("Cập nhật thông tin thẻ thành công!");
                }}
                className="w-52 py-3.5 bg-purple-600 text-white rounded-full"
              >
                Update Changes
              </button>
            </div>
          </div>
        );

      case "Password Manager":
        return (
          <div className="w-2/3 px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Password Manager</h2>
            <p className="text-gray-600">Change your password here.</p>
            <form className="mt-4 space-y-4">
              {/* New Password */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-800 mb-2">New Password</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full pr-10"
                  placeholder="New password..."
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 mt-4 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {/* Confirm New Password */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-800 mb-2">Confirm New Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full pr-10"
                  placeholder="Confirm new password..."
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 mt-4 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (newPassword !== confirmPassword) {
                    alert("Mật khẩu không khớp!");
                    return;
                  }
                  alert("Cập nhật mật khẩu thành công!");
                }}
                className="w-52 py-3.5 bg-purple-600 text-white rounded-full"
              >
                Update Password
              </button>
            </form>
          </div>
        );

      case "Logout":
        return (
          <div className="w-2/3 px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Logout</h2>
            <p className="text-gray-600">Are you sure you want to logout?</p>
            <button className="mt-4 p-2 bg-purple-600 text-white rounded-full">Yes, Logout</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6">
      <div className="bg-white rounded-2xl p-4 md:p-6 w-8/10 flex flex-col md:flex-row gap-6">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/3">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)} // Cập nhật mục được chọn
                  className={`w-full p-3 py-2 px-4 rounded-full transition ${
                    activeSection === item
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border hover:text-purple-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Nội dung động */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}