"use client"

import React, { useState } from 'react'
import TagLabel from "../components/TagLabel";
import Image from "next/image";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../components/Pagination";

export default function Blog() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };
    return (
        <div className=" py-16 bg-white">
            <div className="max-w-[1200px] mx-auto px-4 pb-16">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <p className="text-gray-500 text-2xl">News & Blogs</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        Our Latest <span className="text-purple-600">News & Blogs</span>
                    </h2>
                </div>

                {/* Responsive Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Blog Posts */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="rounded-3xl  relative shadow-md">
                            <div className="relative">
                                <Image
                                    src="/images/blogs/b3.jpg"
                                    alt="Wedding"
                                    width={1000}
                                    height={600}
                                    className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-3xl"
                                />
                                <div className="absolute bottom-3 -left-3 z-10">
                                    <TagLabel text="Wedding Bouquet" />
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <p className="text-xl md:text-sm text-gray-500">
                                    Jenny Alexander &nbsp;<span className="text-purple-400 text-xl">●</span>&nbsp; 13 October 2024
                                </p>
                                <h3 className="text-lg sm:text-xl font-semibold mt-2 mb-3">
                                    Choosing the Perfect Wedding Bouquet for Your Big Day
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua...
                                </p>
                                <a href="#" className="text-purple-600 font-medium hover:underline text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                        <div className="rounded-3xl relative shadow-md ">
                            <div className="relative">
                                <Image
                                    src="/images/blogs/b8.jpg"
                                    alt="Wedding"
                                    width={1000}
                                    height={600}
                                    className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-3xl"
                                />
                                <div className="absolute bottom-3 -left-3 z-10">
                                    <TagLabel text="Wedding Bouquet" />
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <p className="text-xl md:text-sm text-gray-500">
                                    Jenny Alexander &nbsp;<span className="text-purple-400 text-xl">●</span>&nbsp; 13 October 2024
                                </p>
                                <h3 className="text-lg sm:text-xl font-semibold mt-2 mb-3">
                                    Choosing the Perfect Wedding Bouquet for Your Big Day
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua...
                                </p>
                                <a href="#" className="text-purple-600 font-medium hover:underline text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                        <div className="rounded-3xl relative shadow-md ">
                            <div className="relative">
                                <Image
                                    src="/images/blogs/b9.jpg"
                                    alt="Wedding"
                                    width={1000}
                                    height={600}
                                    className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-3xl"
                                />
                                <div className="absolute bottom-3 -left-3 z-10">
                                    <TagLabel text="Wedding Bouquet" />
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <p className="text-xl md:text-sm text-gray-500">
                                    Jenny Alexander &nbsp;<span className="text-purple-400 text-xl">●</span>&nbsp; 13 October 2024
                                </p>
                                <h3 className="text-lg sm:text-xl font-semibold mt-2 mb-3">
                                    Choosing the Perfect Wedding Bouquet for Your Big Day
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua...
                                </p>
                                <a href="#" className="text-purple-600 font-medium hover:underline text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Search */}
                        <div>
                            <h4 className="text-xl font-semibold mb-2 border-l-3 border-l-purple-400 px-2">Search</h4>
                            <div className="relative flex justify-between">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-9/10 border border-gray-400 rounded-md py-2 px-4 pr-10 text-sm focus:ring-purple-500 focus:outline-purple-500"
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute text-gray-700 hover:text-purple-500 duration-200 cursor-pointer right-13 top-1/2 z-10 -translate-y-2.5 "
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="text-xl font-semibold mb-2 border-l-3 border-l-purple-400 px-2">Popular Category</h4>
                            <div className=" space-y-2">
                                {["Weddings", "Birthday", "Anniversary", "Thank You", "Graduation"].map((item) => (
                                    <button
                                        key={item}
                                        className="block w-9/10 border-gray-400 text-left text-gray-700 border rounded-md px-4 py-2 hover:bg-purple-500 hover:text-white text-sm cursor-pointer"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div>
                            <h4 className="text-xl font-semibold mb-2 border-l-3 border-l-purple-400 px-2">Recent Post</h4>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "The Art of Color Coordinating Your Bridal ...",
                                        date: "09 December 2024",
                                        img: "/images/blogs/b2.jpg",
                                    },
                                    {
                                        title: "Valentine’s Day Flowers: Make Her Heart Bloom",
                                        date: "08 October 2024",
                                        img: "/images/blogs/b4.jpg",
                                    },
                                    {
                                        title: "5 Reasons Why Car Delivered Bouquets Are...",
                                        date: "07 October 2024",
                                        img: "/images/blogs/b5.jpg",
                                    },
                                ].map((post, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <Image
                                            src={post.img}
                                            alt={post.title}
                                            width={60}
                                            height={60}
                                            className="rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-medium leading-snug">{post.title}</p>
                                            <p className="text-xs text-gray-400">{post.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative ">
                            <img
                                src="/hero-image.jpg"
                                alt="Floral Deals"
                                className="rounded-2xl w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end items-center p-5 text-white bg-gradient-to-t from-black/60 to-transparent rounded-2xl">
                                <p className="text-sm mb-1 ">Floral Deals</p>
                                <h4 className="text-lg font-semibold leading-tight mb-3 text-center">
                                    20% Off on Best Seller Flower Bouquets!
                                </h4>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 text-sm rounded-full w-fit cursor-pointer">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div >
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />

                    </div>

                </div>

            </div>
            <div className="bg-[#f7f7f7] py-16 px-4 md:px-20">
                <div className="px-4 md:px-20">
                    <p className="text-center text-2xl">Our Newsletter</p>
                    <p className="font-semibold text-4xl text-center">Subscribe to Our Newsletter to</p>
                    <p className="font-semibold text-4xl text-center">Get<span className="font-semibold text-4xl text-center text-purple-500"> Updates on Our Lastest Offers</span> </p>
                </div>
                <p className="text-center text-gray-500 py-5">Get 20% off on your first order just by subscribe to our newsletter</p>
                <div className="flex justify-center gap-5" >
                    <input type="text" name="" id="" placeholder="Enter Email Address"
                        className="bg-white pr-10 md:pr-30 pl-2 md:pl-5 py-3 md:py-4 rounded-full focus:ring-purple-500 focus:outline-purple-500" />
                    <button className="px-4 md:px-9 py-1 md:py-2 bg-purple-700 text-white rounded-full cursor-pointer">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>

    );
};


