"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faShoppingBag, faUser,  } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faXTwitter, faPinterest, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-purple-700 text-white text-sm text-center py-2 flex justify-between px-20">
        <span>Hotline: +123-456-789</span>
        <span>
          <a href="#" className="underline">Đăng ký ngay</a>
          &nbsp;và nhận <strong>giảm giá 20%</strong> cho đơn hàng đầu tiên.
        </span>
        <div className="flex space-x-3">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="text-white" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} className="text-white" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faPinterest} className="text-white" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="text-white" />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto flex justify-between items-center py-4 px-20">
      <h1 className="text-xl font-bold text-purple-600">
          🌸Hoa Tươi UIT
      </h1>
        <nav>
          <ul className="flex space-x-6 text-gray-700">
            <li><a href="#" className="hover:text-purple-500">Trang chủ</a></li>
            <li><a href="#" className="hover:text-purple-500">Sản phẩm</a></li>
            <li><a href="#" className="hover:text-purple-500">Chủ đề</a></li>
            <li><a href="#" className="hover:text-purple-500">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-purple-500">Liên hệ</a></li>
            <li><a href="#" className="hover:text-purple-500">Blogs</a></li>
          </ul>
        </nav>
        <div className="flex space-x-4 text-gray-700">
          <a href="/search">
            <FontAwesomeIcon icon={faSearch} className="text-gray-700 hover:text-purple-500" />
          </a>
          <a href="/wishlist">
            <FontAwesomeIcon icon={faHeart} className="text-gray-700 hover:text-purple-500" />
          </a>
          <a href="/cart">
            <FontAwesomeIcon icon={faShoppingBag} className="text-gray-700 hover:text-purple-500" />
          </a>
          <a href="/account">
            <FontAwesomeIcon icon={faUser} className="text-gray-700 hover:text-purple-500" />
          </a>
        </div>
      </div>
    </header>
  );
}
