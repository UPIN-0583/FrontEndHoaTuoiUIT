"use client"

import Image from "next/image";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function Contact() {
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6s py-10">
                <div className=" grid grid-cols-3 ">
                    <div className="relative w-full md:w-auto">
                        <Image
                            src="/hero-image.jpg"
                            alt="Flower Girl"
                            width={400}
                            height={300}
                            className="rounded-lg shadow-lg w-full md:w-auto"
                        />
                    </div>
                    <div>
                        <p className="pb-2 font-semibold">First Name *</p>
                        <input
                            type="text"
                            placeholder="First name..."
                            className="w-8/10 h-[40px] border border-gray-200 pl-3 font-medium rounded-full focus:ring-purple-500 focus:outline-purple-500"
                        />
                        <p className="py-2 font-semibold">Email *</p>
                        <input
                            type="email"
                            placeholder="Email..."
                            className="w-8/10 h-[40px] border border-gray-200 pl-3 font-medium rounded-full focus:ring-purple-500 focus:outline-purple-500"

                        />
                        <p className="py-2 font-semibold">Subject *</p>
                        <input
                            type="text"
                            placeholder="Enter here..."
                            className="w-2xl h-[40px] border border-gray-200 pl-3 font-medium rounded-full focus:ring-purple-500 focus:outline-purple-500"
                        />
                        <p className="py-2 font-semibold">Your Message *</p>
                        <input
                            type="text"
                            placeholder="Enter here..."
                            className="w-2xl md:h-[160px] sm:h-[80px] border border-gray-200 pl-3 font-medium rounded-2xl focus:ring-purple-500 focus:outline-purple-500"
                        />
                    </div>
                    <div>
                        <p className="pb-2 font-semibold">Last Name *</p>
                        <input
                            type="text"
                            placeholder="Last name..."
                            className="w-8/10 h-[40px] border border-gray-200 pl-3 font-medium rounded-full focus:ring-purple-500 focus:outline-purple-500"
                        />
                        <p className="py-2 font-semibold">Phone *</p>
                        <input
                            type="text"
                            placeholder="Phone..."
                            className="w-8/10 h-[40px] border border-gray-200 pl-3 font-medium rounded-full focus:ring-purple-500 focus:outline-purple-500"

                        />
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}