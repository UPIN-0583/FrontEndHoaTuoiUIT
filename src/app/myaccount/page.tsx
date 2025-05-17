// src/app/components/Account.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaBars, FaUser, FaBoxOpen, FaMapMarkerAlt, FaCreditCard, FaLock, FaSignOutAlt } from "react-icons/fa";
import OderItem from "../components/OderItems";

export default function Account() {

  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const user_id = localStorage.getItem("id");

  useEffect(() => {
    if (!user_id) return;

    fetch(`http://backendhoatuoiuit.onrender.com/api/customers/${user_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setGender(data.gender || "");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [user_id]);


  const [formData, setFormData] = useState(user);
  const [avatar, setAvatar] = useState("/avatars/avatar1.jpg");
  const [activeSection, setActiveSection] = useState("Thông Tin Cá Nhân");

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

  const initialOrder = [
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
      setOrder((prevOrder) => prevOrder.filter((item) => item.id !== id));
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
    { label: "Thông Tin Cá Nhân", icon: <FaUser /> },
    { label: "Đơn Hàng Của Tôi", icon: <FaBoxOpen /> },
    { label: "Quản Lý Địa Chỉ", icon: <FaMapMarkerAlt /> },
    { label: "Phương Thức Thanh Toán", icon: <FaCreditCard /> },
    { label: "Quản Lý Mật Khẩu", icon: <FaLock /> },
    { label: "Đăng Xuất", icon: <FaSignOutAlt /> },
  ];

  // Hàm render nội dung dựa trên mục được chọn
  const renderContent = () => {
    switch (activeSection) {
      case "Thông Tin Cá Nhân":
        return (
          <div className="w-full px-6">
            <div className="flex justify-center items-center flex-col mb-6">
              {/* Avatar */}
              <div className="relative w-32 h-32 group">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-purple-300 shadow-xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <label className="absolute bottom-2 right-2 bg-gradient-to-tr from-purple-600 to-pink-400 text-white p-2 rounded-full cursor-pointer shadow-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <span className="text-lg">✏️</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
              <div className="mt-2 text-lg font-semibold text-gray-800">Xin chào, {name || "User"}!</div>
            </div>

            <form className="mt-6 space-y-6 bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tên *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nhập tên..."
                    value={name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập email..."
                    value={email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại *</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Nhập số điện thoại..."
                    value={phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Giới tính *</label>
                  <select
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={handleUpdate}
                className="w-full md:w-52 py-3.5 bg-gradient-to-tr from-purple-600 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition"
              >
                Cập Nhật Thay Đổi
              </button>
            </form>
          </div>
        );

      case "Đơn Hàng Của Tôi":
        return (
          <div className="w-full px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Đơn Hàng ({Order.length + deliveredOrder.length})</h2>
              <div className="relative">
                <select
                  className="appearance-none border border-gray-300 rounded-xl px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none shadow-sm"
                >
                  <option>Tất cả</option>
                  <option>Chờ xử lý</option>
                  <option>Đã giao</option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">▼</span>
              </div>
            </div>
            {/* Đơn hàng chờ xử lý */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700 bg-gradient-to-tr from-pink-200 to-purple-100 rounded-t-2xl p-3">
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
                  <p>Tiền mặt</p>
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
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <button className="bg-gradient-to-tr from-purple-600 to-pink-400 text-white px-4 py-1 rounded-xl text-sm shadow hover:from-pink-500 hover:to-purple-500 transition">Theo Dõi Đơn</button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded-xl text-sm shadow hover:border-purple-400 transition">Hóa Đơn</button>
                  <button className="text-red-500 text-sm hover:underline">Hủy Đơn</button>
                </div>
              </div>
            </div>
            {/* Đơn hàng đã giao */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700 bg-gradient-to-tr from-pink-200 to-purple-100 rounded-t-2xl p-3">
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
                  <p>Cash</p>
                </div>
                <div>
                  <p className="font-bold">Ngày Giao</p>
                  <p>15 Tháng 12 2024</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {deliveredOrder.map((item) => (
                  <OderItem
                    key={item.id}
                    item={item}
                    removeItem={() => removeItem(item.id, "delivered")}
                    isMobile={false}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-green-400 rounded-full"></span>
                  <p className="text-sm text-gray-600">Đơn hàng của bạn đã được giao thành công</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <button className="bg-gradient-to-tr from-purple-600 to-pink-400 text-white px-4 py-1 rounded-xl text-sm shadow hover:from-pink-500 hover:to-purple-500 transition">Đánh Giá</button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded-xl text-sm shadow hover:border-purple-400 transition">Hóa Đơn</button>
                </div>
              </div>
            </div>
          </div>
        );

      case "Quản Lý Địa Chỉ":
        return (
          <div className="w-full md:w-2/3 px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quản Lý Địa Chỉ</h2>
            <p className="text-gray-600 mb-4">Quản lý địa chỉ nhận hàng của bạn tại đây.</p>
            <div className="space-y-6 bg-white rounded-2xl shadow-lg p-8">
              {/* Ô nhập địa chỉ */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Địa Chỉ Của Bạn</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  placeholder="Nhập địa chỉ..."
                />
              </div>
              {/* Nút Cập nhật */}
              <button
                type="button"
                onClick={() => {
                  alert("Cập nhật địa chỉ thành công!");
                }}
                className="w-full md:w-52 py-3.5 bg-gradient-to-tr from-purple-600 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition"
              >
                Cập Nhật Thay Đổi
              </button>
            </div>
          </div>
        );

      case "Phương Thức Thanh Toán":
        return (
          <div className="w-full md:w-2/3 px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Phương Thức Thanh Toán</h2>
            <p className="text-gray-600 mb-4">Quản lý các phương thức thanh toán của bạn.</p>
            <div className="space-y-6 bg-white rounded-2xl shadow-lg p-8">
              {/* Card Holder Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tên Chủ Thẻ*</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={paymentInfo.cardHolderName}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  placeholder="Nhập tên chủ thẻ..."
                />
              </div>
              {/* Card Number */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Số Thẻ*</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  placeholder="Nhập số thẻ..."
                />
              </div>
              {/* Expiry Date và CVV */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ngày Hết Hạn*</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">CVV*</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
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
                className="w-full md:w-52 py-3.5 bg-gradient-to-tr from-purple-600 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition"
              >
                Cập Nhật Thay Đổi
              </button>
            </div>
          </div>
        );

      case "Quản Lý Mật Khẩu":
        return (
          <div className="w-full md:w-2/3 px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quản Lý Mật Khẩu</h2>
            <p className="text-gray-600">Thay đổi mật khẩu tại đây.</p>
            <form className="mt-6 space-y-6 bg-white rounded-2xl shadow-lg p-8">
              {/* New Password */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2">Mật Khẩu Mới</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl pr-12 focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  placeholder="Nhập mật khẩu mới..."
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 text-xl"
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {/* Confirm New Password */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2">Xác Nhận Mật Khẩu Mới</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl pr-12 focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  placeholder="Nhập lại mật khẩu mới..."
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 text-xl"
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
                className="w-full md:w-52 py-3.5 bg-gradient-to-tr from-purple-600 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition"
              >
                Cập Nhật Mật Khẩu
              </button>
            </form>
          </div>
        );

      case "Đăng Xuất":
        return (
          <div className="w-full md:w-2/3 px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Đăng Xuất</h2>
            <p className="text-gray-600">Bạn có chắc chắn muốn đăng xuất không?</p>
            <button className="mt-6 w-full md:w-52 py-3.5 bg-gradient-to-tr from-purple-600 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition">Đăng Xuất</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 min-h-screen bg-white">
      <div className="bg-white rounded-3xl p-4 md:p-8 w-full max-w-7xl mx-auto flex flex-col gap-8 shadow-2xl">
        <div className="relative flex w-full flex-col md:flex-row gap-8">
          <button
            className="md:hidden p-2 text-gray-700 focus:outline-none self-start"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="text-2xl" />
          </button>

          <div
            className={`${isMenuOpen ? "block" : "hidden"
              } md:block w-full md:w-1/3 absolute md:static top-12 left-0 bg-white z-10 md:z-auto shadow-lg md:shadow-none rounded-2xl p-4 md:p-0 transition-all duration-300 border md:border-0`}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <nav className="space-y-3">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSection(item.label);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 px-5 rounded-xl transition text-lg font-medium shadow-sm ${activeSection === item.label
                    ? "bg-gradient-to-tr from-purple-600 to-pink-400 text-white shadow-lg"
                    : "bg-white text-gray-700 border hover:text-purple-500 hover:border-purple-400"
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
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
