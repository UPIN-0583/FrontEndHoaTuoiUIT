"use client";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-purple-700 text-white text-sm text-center py-2 flex justify-between px-6">
        <span>Call Us : +123-456-789</span>
        <span>
          Sign up and <strong>GET 20% OFF</strong> for your first order.{" "}
          <a href="#" className="underline">Sign up now</a>
        </span>
        <div className="flex space-x-3">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-x-twitter"></i></a>
          <a href="#"><i className="fab fa-pinterest"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-purple-600">Flower Shop.</h1>
        <nav>
          <ul className="flex space-x-6 text-gray-700">
            <li><a href="#" className="hover:text-purple-500">Home</a></li>
            <li><a href="#" className="hover:text-purple-500">Shop</a></li>
            <li><a href="#" className="hover:text-purple-500">Occasions</a></li>
            <li><a href="#" className="hover:text-purple-500">About Us</a></li>
            <li><a href="#" className="hover:text-purple-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-purple-500">Blogs</a></li>
          </ul>
        </nav>
        <div className="flex space-x-4 text-gray-700">
          <i className="fas fa-search"></i>
          <i className="fas fa-heart"></i>
          <i className="fas fa-shopping-bag"></i>
          <i className="fas fa-user"></i>
        </div>
      </div>
    </header>
  );
}
