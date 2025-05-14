// src/app/components/Account.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaBars } from "react-icons/fa";
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
  const [activeSection, setActiveSection] = useState("Thông Tin Cá Nhân"); // Trạng thái để theo dõi mục được chọn

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

  const [Order, setOrder] = useState(initialOrder);
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Danh sách các mục trong sidebar
  const sidebarItems = [
    "Thông Tin Cá Nhân",
    "Đơn Hàng Của Tôi",
    "Quản Lý Địa Chỉ",
    "Phương Thức Thanh Toán",
    "Quản Lý Mật Khẩu",
    "Đăng Xuất",
  ];

  // Hàm render nội dung dựa trên mục được chọn
  const renderContent = () => {
    switch (activeSection) {
      case "Thông Tin Cá Nhân":
        return (
          <div className="w-full px-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Họ *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nhập họ..."
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Tên *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nhập tên..."
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
                  placeholder="Nhập email..."
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Số điện thoại *</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Nhập số điện thoại..."
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Giới tính *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-full text-sm text-gray-900"
                >
                  <option>Nữ</option>
                  <option>Nam</option>
                  <option>Khác</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleUpdate}
                className="w-52 py-3.5 bg-purple-600 text-white rounded-full"
              >
                Cập Nhật Thay Đổi
              </button>
            </form>
          </div>
        );

      case "Đơn Hàng Của Tôi":
        return (
          <div className="w-full px-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Đơn Hàng (2)</h2>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded-lg px-3 py-1 pr-8 text-sm text-gray-700 focus:outline-none">
                  <option>Tất cả</option>
                  <option>Chờ xử lý</option>
                  <option>Đã giao</option>

                </select>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">▼</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700 bg-pink-300 rounded-tl-2xl rounded-tr-xl p-2">
                <div>
                  <p className="font-bold">Mã Đơn Hàng</p>
                  <p>#SDGT1254FD</p>
                </div>
                <div>
                  <p className="font-bold">Tổng Thanh Toán</p>
                  <p>$354.00</p>
                </div>
                <div>
                  <p className="font-bold">Phương Thức</p>
                  <p>Paypal</p>
                </div>
                <div>
                  <p className="font-bold">Dự Kiến Giao</p>
                  <p>21 Tháng 12 2024</p>
                </div>
              </div>
              {Order.map((item) => (
                <OderItem
                  key={item.id}
                  item={item}
                  removeItem={() => removeItem(item.id, "pending")}
                  isMobile={false}
                />
              ))}
              <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-orange-400 rounded-full"></span>
                  <p className="text-sm text-gray-600">Đơn hàng của bạn đã được xác nhận</p>
                </div>
                <div className="space-x-2">
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Theo Dõi Đơn</button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm">Hóa Đơn</button>
                  <button className="text-red-500 text-sm">Hủy Đơn</button>

                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700 bg-pink-300 rounded-tl-2xl rounded-tr-xl p-2">
                <div>
                  <p className="font-bold">Mã Đơn Hàng</p>
                  <p>#SDGT7412DF</p>
                </div>
                <div>
                  <p className="font-bold">Tổng Thanh Toán</p>
                  <p>$35.00</p>
                </div>
                <div>
                  <p className="font-bold">Phương Thức</p>
                  <p>Tiền mặt</p>
                </div>
                <div>
                  <p className="font-bold">Ngày Giao</p>
                  <p>15 Tháng 12 2024</p>
                </div>
              </div>

              {deliveredOrder.map((item) => (
                <OderItem
                  key={item.id}
                  item={item}
                  removeItem={() => removeItem(item.id, "delivered")}
                  isMobile={false}
                />
              ))}


              <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-green-400 rounded-full"></span>
                  <p className="text-sm text-gray-600">Đơn hàng của bạn đã được giao thành công</p>
                </div>
                <div className="space-x-2">
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Đánh Giá</button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm">Hóa Đơn</button>

                </div>
              </div>
            </div>
          </div>
        );

      case "Quản Lý Địa Chỉ":
        return (
          <div className="w-2/3 px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quản Lý Địa Chỉ</h2>
            <p className="text-gray-600 mb-4">Quản lý địa chỉ nhận hàng của bạn tại đây.</p>

            <div className="space-y-4">
              {/* Ô nhập địa chỉ */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Địa Chỉ Của Bạn</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  placeholder="Nhập địa chỉ..."
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
                Cập Nhật Thay Đổi
              </button>
            </div>
          </div>
        );

      case "Phương Thức Thanh Toán":
        return (
          <div className="w-2/3 px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Phương Thức Thanh Toán</h2>
            <p className="text-gray-600 mb-4">Quản lý các phương thức thanh toán của bạn.</p>

            <div className="space-y-4">
              {/* Card Holder Name */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Tên Chủ Thẻ*</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={paymentInfo.cardHolderName}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  placeholder="Nhập tên chủ thẻ..."
                />
              </div>
              {/* Card Number */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Số Thẻ*</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:outline-purple-500"
                  placeholder="Nhập số thẻ..."
                />
              </div>
              {/* Expiry Date và CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Ngày Hết Hạn*</label>
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
                Cập Nhật Thay Đổi
              </button>
            </div>
          </div>
        );

      case "Quản Lý Mật Khẩu":
        return (
          <div className="w-2/3 px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quản Lý Mật Khẩu</h2>
            <p className="text-gray-600">Thay đổi mật khẩu tại đây.</p>

            <form className="mt-4 space-y-4">
              {/* New Password */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-800 mb-2">Mật Khẩu Mới</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full pr-10"
                  placeholder="Nhập mật khẩu mới..."
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
                <label className="block text-sm font-bold text-gray-800 mb-2">Xác Nhận Mật Khẩu Mới</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full pr-10"
                  placeholder="Nhập lại mật khẩu mới..."
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
                Cập Nhật Mật Khẩu
              </button>
            </form>
          </div>
        );

      case "Đăng Xuất":
        return (
          <div className="w-2/3 px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Đăng Xuất</h2>
            <p className="text-gray-600">Bạn có chắc chắn muốn đăng xuất không?</p>
            <button className="mt-4 p-2 bg-purple-600 text-white rounded-full">Đăng Xuất</button>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6">
      <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-7xl mx-auto flex flex-col gap-6">
        <div className="relative flex w-full flex-col md:flex-row">
          <button
            className="md:hidden p-2 text-gray-700 focus:outline-none self-start"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="text-2xl" />
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:block w-full md:w-1/3 absolute md:static top-12 left-0 bg-white md:bg-transparent z-10 md:z-auto shadow-md md:shadow-none rounded-lg p-4 md:p-0 transition-all duration-300`}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)} // Cập nhật mục được chọn
                  className={`w-full p-3 py-2 px-4 rounded-full transition ${activeSection === item
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 border hover:text-purple-500"
                    }`}

                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="w-full md:w-2/3 mt-4 md:mt-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}