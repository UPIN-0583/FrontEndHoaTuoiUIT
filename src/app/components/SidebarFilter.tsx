"use client";

import { useState } from "react";
import { Range } from "react-range";

const categories = ["Roses", "Tulips", "Lilies", "Orchids", "Daisies", "Sunflowers"];
const occasions = ["Weddings", "Birthday", "Anniversary", "Thank You", "Graduation", "Get Well Soon"];
const colors = ["Red", "Pink", "White", "Yellow", "Purple", "Mixed"];

export default function SidebarFilter({ 
  priceRange, 
  setPriceRange 
}: { 
  priceRange: [number, number]; 
  setPriceRange: (value: [number, number]) => void;
}) {
  return (
    <div className="w-1/5 p-4 bg-white shadow rounded-lg text-black">
      <h2 className="font-semibold text-2xl my-4">Filter Options</h2>
      
      <h3 className="font-semibold mt-6 mb-2">By Flower Type</h3>
      {categories.map((c) => (
        <label key={c} className="block">
          <input type="checkbox" className="mr-2" /> {c}
        </label>
      ))}

      <h3 className="font-semibold mt-6 mb-2">By Occasion</h3>
      {occasions.map((o) => (
        <label key={o} className="block">
          <input type="checkbox" className="mr-2" /> {o}
        </label>
      ))}

      <h3 className="font-semibold mt-6 mb-2">Price</h3>
      <div className="mb-4">
        <p>${priceRange[0]} - ${priceRange[1]}</p>
        <Range
          step={1}
          min={10}
          max={100}
          values={priceRange}
          onChange={(values) => setPriceRange(values)}
          renderTrack={({ props, children }) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                className="h-2 bg-gray-200 rounded-md relative mt-4"
              >
                <div
                  className="absolute h-2 bg-purple-600 rounded-md"
                  style={{
                    left: `${(priceRange[0] - 10) / 90 * 100}%`,
                    right: `${100 - (priceRange[1] - 10) / 90 * 100}%`
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ key, ...props }) => (
            <div
              key={key}
              {...props}
              className="w-5 h-5 bg-purple-600 rounded-full border border-white shadow-md cursor-pointer"
            />
          )}
        />
      </div>

      
    </div>
  );
}
