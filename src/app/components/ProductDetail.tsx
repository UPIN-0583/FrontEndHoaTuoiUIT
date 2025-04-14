"use client"; 

import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShoppingCart,
  faHeart,
  faMinus,
  faPlus,
  faCreditCard
} from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Standard");
  //const [selectedColor, setSelectedColor] = useState("Blue");

  const sizes = [
    { name: "Standard", price: 45 },
    { name: "Deluxe", price: 60 },
    { name: "Premium", price: 90 },
  ];

  //const colors = ["Blue", "Purple"];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg text-black">
      {/* Product Display */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="md:w-2/3">
          <Image
            src="/avatars/avatar1.jpg"
            alt="Blue White Bouquets"
            className="w-full rounded-lg"
            width={200} height={300}
          />
          {/* Thumbnails */}
          {/* <div className="flex gap-2 mt-3">
            {[1, 2, 3, 4].map((_, i) => (
              <Image
                key={i}
                src="/flower.jpg"
                className={`w-16 h-16 rounded-lg border ${
                  i === 0 ? "border-purple-500" : "border-gray-300"
                } cursor-pointer`}
                alt="thumbnail"
              />
            ))}
          </div> */}
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-gray-500">Bouquets</h3>
          <h2 className="text-2xl font-semibold">Blue White Bouquets</h2>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>
            <span className="text-gray-600 ml-2">4.9 (245 Reviews)</span>
          </div>

          {/* Price */}
          <div className="text-lg font-bold mt-2">
            $45.00 <span className="text-gray-500 line-through ml-2">$90.00</span>
          </div>
        
            
          <div className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum exercitationem autem maxime ea fugit ipsum
          </div>

          {/* Size Options */}
          <div className="mt-4">
            <h4 className="font-semibold">Size</h4>
            <div className="flex gap-4 mt-2">
              {sizes.map((size) => (
                <button
                  key={size.name}
                  className={`p-3 border text-sm rounded-lg ${
                    selectedSize === size.name
                      ? "border-purple-500 text-purple-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name} <br /> + ${size.price}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options
          <div className="mt-4">
            <h4 className="font-semibold">Flower Color: {selectedColor}</h4>
            <div className="flex gap-3 mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-purple-500"
                      : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase(),
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div> */}


          {/* Quantity Selector */}
          <div className="flex flex-row mt-4 justify-between lg:justify-normal lg:gap-10 ">
            <div className="flex items-center">
              <button
                className="p-2 border rounded-lg"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="mx-4">{quantity}</span>
              <button
                className="p-2 border rounded-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="items-center">
              <button className="p-2 border rounded-lg">
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
          

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-purple-600 text-white p-3 rounded-lg flex sm:flex-row flex-col items-center justify-center gap-2">
              <FontAwesomeIcon icon={faShoppingCart} />
              Add To Cart
            </button>
            <button className="flex-1 bg-pink-500 text-white p-3 rounded-lg flex sm:flex-row flex-col items-center justify-center gap-2">
               <FontAwesomeIcon icon={faCreditCard}/>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
