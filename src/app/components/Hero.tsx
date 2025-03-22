"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-white shadow-md">
        <section className="container mx-auto flex items-center justify-between py-16 px-6">
      <div>
        <div className="bg-purple-100 text-purple-700 py-1 px-4 inline-block rounded-full text-sm">
          🌸 Your Trusted Online Flower Shop
        </div>
        <h2 className="text-5xl font-bold text-gray-800 mt-4">
          The Ultimate <span className="text-purple-600">Flower</span> <br /> Shopping Destination
        </h2>
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
        </p>
        <div className="mt-6 space-x-4">
          <a href="#" className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-purple-700">
            Shop Now →
          </a>
          <a href="#" className="text-gray-800 font-semibold hover:underline">
            View All Products
          </a>
        </div>
        <div className="flex items-center mt-6 space-x-3">
          <Image src="vercel.svg" alt="Customers"  width={48} height={48} className="rounded-full border-2 border-white shadow-md" />
          <div>
            <p className="text-lg font-semibold">4.9+ Ratings</p>
            <p className="text-sm text-gray-600">Trusted by 95k+ Customers</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image src="/hero-image.jpg" alt="Flower Girl" width={400} height={300} className=" rounded-lg shadow-lg" />
        <div className="absolute top-[60%] left-[75%] bg-white px-4 py-2 rounded-lg shadow-md">
          💳 Secure Payment
        </div>
        <div className="absolute top-[80%] left-[70%] bg-white px-4 py-2 rounded-lg shadow-md">
          🚚 Fast Delivery
        </div>
      </div>
    </section>
    </div>
    
  );
}
