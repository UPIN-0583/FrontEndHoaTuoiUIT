"use client";

import { useEffect, useState } from "react";
import WishItem from "../components/WishItem";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";

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
          <h3 className="text-3xl font-semibold text-black justify-center mb-6 text-center mt-3">Wishlist</h3>
          {wishlist && wishlist.items.length > 0 ? (
            <>
              {/* Desktop View */}

              <div className="overflow-x-auto">
                <table className="min-w-full text-md text-left border">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="px-2 py-1">Sản phẩm</th>
                      <th className="px-2 py-1">Giá</th>
                      <th className="px-2 py-1">Ngày thêm</th>
                      <th className="px-2 py-1">Trạng thái</th>
                      <th className="px-2 py-1"></th>
                      <th className="px-2 py-1"></th>

                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.items.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-2 py-1 flex items-center gap-2">
                          <img src={`https://backendhoatuoiuit.onrender.com${item.imageUrl}`} alt={item.productName} className="w-16 h-16 object-cover" />
                          <p className="text-md font-semibold ml-2">{item.productName}</p>
                        </td>
                        <td className="px-2 py-1">${item.price}</td>
                        <td className="px-2 py-1">{item.addedDate.slice(0, 10)}</td>
                        <td className="px-2 py-1">Còn hàng</td>
                        <td className="px-2 py-1">
                          <button className="bg-purple-500 text-white px-5 py-2 rounded-md hover:bg-purple-600 cursor-pointer">
                            <FontAwesomeIcon icon={faCartPlus} />
                          </button>
                        </td>
                        <td className="px-2 py-1">
                          <button className="bg-purple-500 text-red-500 px-5 py-2 rounded-md hover:bg-purple-600 cursor-pointer">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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