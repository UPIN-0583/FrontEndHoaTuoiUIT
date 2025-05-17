"use client";

import { useEffect, useState } from "react";
import WishItem from "../components/WishItem";
import { toast } from "react-toastify";

const initialWishlist = [
  { id: 1, name: "Blue White Bouquets", price: 45, image: "/images/flowers/hoa1.jpg" },
  { id: 2, name: "Royal Pink Bouquets", price: 48, image: "/images/flowers/hoa2.jpg" },
  { id: 3, name: "Blue White Bouquets", price: 45, image: "/images/flowers/hoa3.jpg" },
  { id: 4, name: "Royal Pink Bouquets", price: 48, image: "/images/flowers/hoa4.jpg" },
];

export default function Wishlist() {
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [cartId, setCartId] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<{ id: number; customerId: number; items: any[] } | null>(null);
  useEffect(() => {
    fetch(`https://backendhoatuoiuit.onrender.com/api/wishlists/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    }).then((data) => {
      setWishlist(data);
      console.log(data);
    });
    fetch(`https://backendhoatuoiuit.onrender.com/api/carts/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      setCartId(data.id);
    });
  }, [user_id]);

  console.log(cartId);

  const removeItem = async (itemId: number) => {
    try {
      const res = await fetch(`https://backendhoatuoiuit.onrender.com/api/wishlists/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Xóa thất bại');
      setWishlist((prev) => prev ? { ...prev, items: prev.items.filter((item: any) => item.id !== itemId) } : prev);
      toast.success('Đã xóa sản phẩm khỏi wishlist!');
    } catch (err) {
      toast.error('Có lỗi khi xóa sản phẩm khỏi wishlist!');
    }
  };

  const addToCart = async (itemId: number) => {
    try {
      const res = await fetch(`https://backendhoatuoiuit.onrender.com/api/carts/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: itemId,
          cartId: cartId,
          quantity: 1
        })
      });
      if (!res.ok) throw new Error('Thêm vào giỏ hàng thất bại');

      setWishlist((prev) => prev ? { ...prev, items: prev.items.filter((item: any) => item.id !== itemId) } : prev);
      toast.success('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (err) {
      toast.error('Có lỗi khi thêm vào giỏ hàng!');
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Wishlist Items */}

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-3xl font-semibold text-black justify-center mb-6 text-center mt-6">Wishlist</h3>
          {wishlist && wishlist.items.length > 0 ? (
            <>
              {/* Desktop View */}
              <div className="hidden md:flex flex-col gap-4">
                <div className="rounded-lg bg-purple-600 flex p-4 gap-16">
                  <p className="text-lg font-bold text-white">Sản phẩm</p>
                  <p className="text-lg font-bold text-white ml-90">Giá</p>
                  <p className="text-lg font-bold text-white">Ngày thêm</p>
                  <p className="text-lg font-bold text-white">Trạng thái</p>
                </div>
                {wishlist.items.map((item) => (
                  <WishItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    addToCart={addToCart}
                    isMobile={false}
                  />
                ))}
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex flex-col gap-4">
                {wishlist.items.map((item) => (
                  <WishItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    addToCart={addToCart}
                    isMobile={true}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Không có sản phẩm yêu thích.</p>
          )}

        </div>
      </div>
    </div>
  );
}