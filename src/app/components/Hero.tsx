"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <div  className="bg-gray-100 shadow-md px-12">
        <section className="container mx-auto flex items-center justify-between py-8 px-12">
            <div >
                <div className="bg-purple-100 text-purple-700 py-1 px-4 inline-block rounded-full text-sm">
                🌸 Your Trusted Online Flower Shop
                </div>
                <h2 className="text-5xl font-bold text-gray-800 mt-4">
                The Ultimate <span className="text-purple-600">Flower</span> <br /> Shopping Destination
                </h2>
                <p className="text-gray-600 mt-4 max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. sjadasbdias 
                </p>
                <div className="mt-16 space-x-6">
                <a href="#" className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-purple-700">
                    Shop Now →
                </a>
                <a href="#" className="text-gray-800 font-semibold hover:underline">
                    View All Products
                </a>
                </div>
                <div className="flex mt-6 items-center space-x-4">
                    {/* Danh sách Avatar */}
                    <div className="flex -space-x-2">
                        <Image src="/avatars/avatar1.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 1" />
                        <Image src="/avatars/avatar2.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 2" />
                        <Image src="/avatars/avatar3.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 3" />
                        {/* Icon "+" */}
                        <div className="w-10 h-10 bg-pink-400 text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-white">
                        +
                        </div>
                    </div>

                    {/* Nội dung đánh giá */}
                    <div>
                        <p className="text-black text-lg font-semibold">4.9+ Ratings</p>
                        <p className="text-gray-500 text-sm">Trusted by 95k+ Customers</p>
                    </div>
                    </div>
                </div>
            <div className="relative pr-12">
                <Image src="/hero-image.jpg" alt="Flower Girl" width={400} height={300} className=" rounded-lg shadow-lg" />
            </div>
        </section>
    </div>
    
  );
}
