"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

export default function CheckoutAddressContent() {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Lấy thông tin đơn hàng
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !token || !API_BASE_URL) return;

      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Lấy thông tin đơn hàng thất bại: ${errorData}`);
        }

        const data = await response.json();
        setOrderDetails(data);
        console.log("Order details fetched:", data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        setError("Không thể lấy thông tin đơn hàng!");
        toast.error("Không thể lấy thông tin đơn hàng!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, token, API_BASE_URL]);

  // Lấy thông tin sản phẩm duy nhất
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0 || !token || !API_BASE_URL) return;

      const item = orderDetails.items[0];
      const productId = item.productId;

      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}/detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Lấy thông tin sản phẩm ${productId} thất bại: ${errorData}`);
        }

        const productData = await response.json();
        setProduct(productData);
        console.log(`Product details fetched for productId ${productId}:`, productData);
      } catch (error) {
        console.error(`Lỗi khi lấy thông tin sản phẩm ${productId}:`, error);
        setError("Không thể lấy thông tin sản phẩm!");
        toast.error("Không thể lấy thông tin sản phẩm!");
      }
    };

    fetchProductDetails();
  }, [orderDetails, token, API_BASE_URL]);

  // Kiểm tra đăng nhập và orderId
  useEffect(() => {
    if (!token) {
      toast.info("Vui lòng đăng nhập để tiếp tục thanh toán!");
      router.push("/login");
      return;
    }
    if (!orderId) {
      setError("Không tìm thấy đơn hàng!");
      toast.error("Không tìm thấy đơn hàng!");
      router.push("/");
    }
    if (!API_BASE_URL) {
      setError("Lỗi cấu hình hệ thống!");
      toast.error("Lỗi cấu hình hệ thống!");
      router.push("/");
    }
  }, [orderId, router, token, API_BASE_URL]);

  const handleUpdateAddress = async () => {
    if (!address.trim()) {
      setError("Vui lòng nhập địa chỉ giao hàng!");
      toast.error("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/delivery-address?address=${encodeURIComponent(address)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Cập nhật địa chỉ thất bại: ${errorData}`);
      }

      console.log("Address updated for order:", orderId);
      toast.success("Đã cập nhật địa chỉ giao hàng!");
      setError(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại!");
      toast.error("Đã có lỗi xảy ra khi cập nhật địa chỉ!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePaymentMethod = async () => {
    if (!paymentMethod) {
      setError("Vui lòng chọn phương thức thanh toán!");
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/payment-method?paymentId=${paymentMethod}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Cập nhật phương thức thanh toán thất bại: ${errorData}`);
      }

      console.log("Payment method updated for order:", orderId);
      toast.success("Đã cập nhật phương thức thanh toán!");
      setError(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật phương thức thanh toán:", error);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại!");
      toast.error("Đã có lỗi xảy ra khi cập nhật phương thức thanh toán!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!address || !paymentMethod) {
      setError("Vui lòng hoàn thành địa chỉ và phương thức thanh toán!");
      toast.error("Vui lòng hoàn thành địa chỉ và phương thức thanh toán!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/confirm`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Xác nhận đơn hàng thất bại: ${errorData}`);
      }

      console.log("Order confirmed:", orderId);
      toast.success("Đã xác nhận đơn hàng!");
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại!");
      toast.error("Đã có lỗi xảy ra khi xác nhận đơn hàng!");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const calculateTotalPrice = () => {
    if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
      return 0;
    }
    const item = orderDetails.items[0];
    return item.quantity * item.price;
  };

  if (!orderId || !API_BASE_URL) {
    return <div className="text-center text-red-500">Lỗi hệ thống hoặc không tìm thấy đơn hàng!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg text-black mt-6">
      <h2 className="text-2xl font-semibold mb-6">Thanh toán</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 w-full">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Địa chỉ giao hàng</h3>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ giao hàng (VD: 123 Đường ABC, Quận 1, TP.HCM)"
              className="w-full p-2 border rounded-md"
              disabled={isLoading}
            />
            <button
              onClick={handleUpdateAddress}
              disabled={isLoading}
              className={`mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Đang xử lý..." : "Cập nhật địa chỉ"}
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Phương thức thanh toán</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded-md"
              disabled={isLoading}
            >
              <option value="">Chọn phương thức thanh toán</option>
              <option value="1">Thanh toán khi nhận hàng (COD)</option>
              <option value="2">Thẻ tín dụng</option>
              <option value="3">Chuyển khoản ngân hàng</option>
            </select>
            <button
              onClick={handleUpdatePaymentMethod}
              disabled={isLoading}
              className={`mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Đang xử lý..." : "Cập nhật phương thức"}
            </button>
          </div>

          <div>
            <button
              onClick={handleConfirmOrder}
              disabled={isLoading || !address || !paymentMethod}
              className={`w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition ${
                isLoading || !address || !paymentMethod ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Đang xử lý..." : "Xác nhận đơn hàng"}
            </button>
          </div>
        </div>

        {/* Bên phải: Thông tin đơn hàng */}
        <div className="lg:w-1/2 w-full">
          <h3 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h3>
          {orderDetails ? (
            <div className="border rounded-lg p-4">
              {orderDetails.items && orderDetails.items.length > 0 ? (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Hình ảnh sản phẩm */}
                    {product && product.imageUrl ? (
                      <Image
                        src={`${API_BASE_URL}${product.imageUrl}`} // Thêm domain backend vào imageUrl
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-cover rounded-md"
                        placeholder="blur"
                        blurDataURL="https://via.placeholder.com/40x40.png?text=No+Image"
                        onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/40x40.png?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                    {/* Tên và số lượng */}
                    <div>
                      <p className="font-medium">{product ? product.name : orderDetails.items[0].name || "Không xác định"}</p>
                      <p className="text-sm text-gray-500">Số lượng: {orderDetails.items[0].quantity}</p>
                    </div>
                  </div>
                  {/* Giá */}
                  <p className="font-medium">{formatCurrency(orderDetails.items[0].price * orderDetails.items[0].quantity)}</p>
                </div>
              ) : (
                <p className="text-gray-500">Không có sản phẩm trong đơn hàng.</p>
              )}

              {/* Tổng giá */}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <p className="font-semibold">Tổng cộng:</p>
                  <p className="font-semibold">{formatCurrency(calculateTotalPrice())}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Đang tải thông tin đơn hàng...</p>
          )}
        </div>
      </div>
    </div>
  );
}