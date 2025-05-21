// src/app/components/Account.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaBars, FaUser, FaBoxOpen, FaMapMarkerAlt, FaCreditCard, FaLock, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

// Định nghĩa kiểu dữ liệu cho đơn hàng và sản phẩm trong đơn hàng
interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  discountApplied: number;
  priceAfterDiscount: number;
}

interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  totalAmount: number;
  status: string;
  paymentId: number;
  note: string;
  customerName: string;
  paymentMethodName: string;
  items: OrderItem[];
}

export default function Account() {

  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<Order[]>([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!user_id) return;

    fetch(`${API_BASE_URL}/api/customers/${user_id}`)
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
        setAddress(data.address || "");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    fetch(`${API_BASE_URL}/api/orders/customer/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [user_id, token, API_BASE_URL]);

  const [avatar, setAvatar] = useState("/avatars/avatar1.jpg");
  const [activeSection, setActiveSection] = useState("Thông Tin Cá Nhân");

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/customers/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          isActive: true
        })
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      toast.success("Thông tin đã được cập nhật!");
    } catch (err) {
      toast.error("Có lỗi xảy ra khi cập nhật!");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleUpdateAddress = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/customers/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          isActive: true
        })
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      toast.success("Cập nhật địa chỉ thành công!");
    } catch (err) {
      toast.error("Có lỗi xảy ra khi cập nhật địa chỉ!");
    }
  };

  // Hàm định dạng tiền tệ
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State cho filter đơn hàng
  const [orderFilter, setOrderFilter] = useState<string>("all");
  // Danh sách các mục trong sidebar
  const sidebarItems = [
    { label: "Thông Tin Cá Nhân", icon: <FaUser /> },
    { label: "Đơn Hàng Của Tôi", icon: <FaBoxOpen /> },
    { label: "Quản Lý Địa Chỉ", icon: <FaMapMarkerAlt /> },
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
                    onChange={e => setName(e.target.value)}
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
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Giới tính *</label>
                  <select
                    name="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="w-full md:w-52 py-3.5 bg-gradient-to-tr from-purple-600 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition"
                >
                  Cập Nhật Thay Đổi
                </button>
              </div>

            </form>
          </div>
        );

      case "Đơn Hàng Của Tôi":
        const statusMap = {
          all: "Tất cả",
          pending: "Đang chờ xử lý",
          processing: "Đang xử lý",
          shipped: "Đang giao",
          delivered: "Đã giao",
          cancelled: "Đã hủy"
        };
        // Lọc đơn hàng theo trạng thái
        const filteredOrders: Order[] = orderFilter === "all"
          ? orders
          : orders.filter((order) => order.status && order.status.toLowerCase() === orderFilter);
        return (
          <div className="w-full px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Đơn Hàng ({filteredOrders.length})</h2>
              <div className="relative">
                <select
                  className="appearance-none border border-gray-300 rounded-xl px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none shadow-sm"
                  value={orderFilter}
                  onChange={e => setOrderFilter(e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="pending">Đang chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipped">Đang giao</option>
                  <option value="delivered">Đã giao</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">▼</span>
              </div>
            </div>
            {/* Danh sách đơn hàng với thanh cuộn nếu dài */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 max-h-[500px] overflow-y-auto">
              {filteredOrders.length === 0 ? (
                <div className="text-center text-gray-500 py-8">Không có đơn hàng nào.</div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order.id} className="mb-8 border-b last:border-b-0 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700 bg-gradient-to-tr from-pink-200 to-purple-100 rounded-t-2xl p-3 mb-2">
                      <div>
                        <p className="font-bold">Mã Đơn Hàng</p>
                        <p>#{order.id}</p>
                      </div>
                      <div>
                        <p className="font-bold">Tổng Thanh Toán</p>
                        <p>
                          {formatCurrency(
                            order.items?.reduce((sum, item) => {
                              const original = item.price * item.quantity;
                              const discount = (item.discountApplied || 0) * item.quantity;
                              return sum + (original - discount);
                            }, 0)
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Phương Thức</p>
                        <p>{order.paymentMethodName}</p>
                      </div>
                      <div>
                        <p className="font-bold">Trạng Thái</p>
                        <p>{statusMap[order.status?.toLowerCase() as keyof typeof statusMap] || order.status}</p>
                      </div>
                    </div>
                    <div className="mb-2 text-gray-600 text-sm">Ngày đặt: {order.orderDate?.slice(0, 10)} | Dự kiến giao: {order.deliveryDate?.slice(0, 10)}</div>
                    <div className="mb-2 text-gray-600 text-sm">Địa chỉ: {order.deliveryAddress}</div>
                    <div className="mb-2 text-gray-600 text-sm">Ghi chú: {order.note}</div>
                    {/* Danh sách sản phẩm */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs text-left border">
                        <thead className="bg-purple-100">
                          <tr>
                            <th className="px-2 py-1">Tên sản phẩm</th>
                            <th className="px-2 py-1">Số lượng</th>
                            <th className="px-2 py-1">Giá</th>
                            <th className="px-2 py-1">Giảm giá</th>
                            <th className="px-2 py-1">Giá sau giảm</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items && order.items.length > 0 ? order.items.map((item, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="px-2 py-1">{item.productName}</td>
                              <td className="px-2 py-1">{item.quantity}</td>
                              <td className="px-2 py-1">{formatCurrency(item.price * item.quantity)}</td>
                              <td className="px-2 py-1">{formatCurrency((item.discountApplied || 0) * item.quantity)}</td>
                              <td className="px-2 py-1">{formatCurrency(item.price * item.quantity - item.discountApplied * item.quantity)}</td>
                            </tr>
                          )) : (
                            <tr><td colSpan={5} className="text-center text-gray-400 py-2">Không có sản phẩm</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "Quản Lý Địa Chỉ":
        return (
          <div className="w-4/5 px-6 flex justify-center">
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Quản Lý Địa Chỉ</h2>
              <p className="text-gray-600 mb-4 text-center">Quản lý địa chỉ nhận hàng của bạn tại đây.</p>
              <div className="space-y-6 bg-white rounded-2xl shadow-lg p-8 w-full">
                {/* Ô nhập địa chỉ */}
                <div>
                  <label className="block text-md font-bold text-gray-700 mb-2">Địa Chỉ Của Bạn</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                    placeholder="Nhập địa chỉ..."
                  />
                </div>
                {/* Nút Cập nhật */}
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={handleUpdateAddress}
                    className="w-full items-center md:w-52 py-3.5 bg-gradient-to-tr from-purple-600 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition"
                  >
                    Cập Nhật Thay Đổi
                  </button>
                </div>
              </div>
            </div>

          </div>
        );

      case "Quản Lý Mật Khẩu":
        return (
          <div className="w-full md:w-4/5 px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Quản Lý Mật Khẩu</h2>
            <p className="text-gray-600 mb-4 text-center">Thay đổi mật khẩu tại đây.</p>
            <form className="mt-6 space-y-6 bg-white rounded-2xl shadow-lg p-8 w-full">
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
                  className="absolute right-3 top-13.5 -translate-y-1/2 text-gray-500 hover:text-purple-600 text-xl"
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
                  className="absolute right-3 top-13.5 -translate-y-1/2 text-gray-500 hover:text-purple-600 text-xl"
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
            <button className="mt-6 w-full md:w-52 py-3.5 bg-gradient-to-tr from-purple-600 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition cursor-pointer"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >Đăng Xuất</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 min-h-screen bg-white">
      <div className="bg-white rounded-3xl p-4 md:p-8 w-full max-w-7xl mx-auto flex flex-col gap-8 shadow-2xl">
        <div className="relative flex w-full flex-col md:flex-row gap-8 min-h-[600px]">
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

          <div className="w-full md:w-2/3 mt-4 md:mt-0 flex-grow flex justify-center">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
