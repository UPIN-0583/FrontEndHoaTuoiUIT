"use client";

import { Range } from "react-range";

const categories = ["Roses", "Tulips", "Lilies", "Orchids", "Daisies", "Sunflowers"];
const occasions = ["Weddings", "Birthday", "Anniversary", "Thank You", "Graduation", "Get Well Soon"];

interface SidebarFilterProps {
  selectedFlowers: string[];
  setSelectedFlowers: (flowers: string[]) => void;
  selectedOccasions: string[];
  setSelectedOccasions: (occasions: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

export default function SidebarFilter({
  selectedFlowers,
  setSelectedFlowers,
  selectedOccasions,
  setSelectedOccasions,
  priceRange,
  setPriceRange,
}: SidebarFilterProps) {
  const handleFlowerChange = (flower: string) => {
    if (selectedFlowers.includes(flower)) {
      setSelectedFlowers(selectedFlowers.filter((f) => f !== flower));
    } else {
      setSelectedFlowers([...selectedFlowers, flower]);
    }
  };

  const handleOccasionChange = (occasion: string) => {
    if (selectedOccasions.includes(occasion)) {
      setSelectedOccasions(selectedOccasions.filter((o) => o !== occasion));
    } else {
      setSelectedOccasions([...selectedOccasions, occasion]);
    }
  };

  return (
    <div className="w-full p-4 md:p-6 max-[480px]:p-2 h-fit bg-white shadow rounded-lg text-black">
      <h2 className="font-semibold text-2xl md:text-2xl max-[480px]:text-xl my-4">Filter Options</h2>

      <h3 className="font-semibold mt-6 mb-2">By Flower Type</h3>
      {categories.map((c) => (
        <label key={c} className="block">
          <input
            type="checkbox"
            className="mr-2 w-4 h-4 max-[480px]:w-3 max-[480px]:h-3"
            checked={selectedFlowers.includes(c)}
            onChange={() => handleFlowerChange(c)}
            aria-label={`Filter by ${c}`}
          />
          {c}
        </label>
      ))}

      <h3 className="font-semibold mt-6 mb-2">By Occasion</h3>
      {occasions.map((o) => (
        <label key={o} className="block">
          <input
            type="checkbox"
            className="mr-2 w-4 h-4 max-[480px]:w-3 max-[480px]:h-3"
            checked={selectedOccasions.includes(o)}
            onChange={() => handleOccasionChange(o)}
            aria-label={`Filter by ${o}`}
          />
          {o}
        </label>
      ))}

      <h3 className="font-semibold mt-6 mb-2">By Price</h3>
      <div className="mb-4">
        <p id="price-range-label" className="text-sm">
          ${priceRange[0]} - ${priceRange[1]}
        </p>
        <Range
          step={1}
          min={10}
          max={100}
          values={priceRange}
          onChange={(values) => setPriceRange(values)}
          renderTrack={({ props, children }) => {
            // Type assertion to handle potential key property
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { key, ...trackProps } = props as any;
            return (
              <div
                key={key}
                {...trackProps}
                className="h-2 bg-gray-200 rounded-md relative mt-4"
                aria-describedby="price-range-label"
              >
                <div
                  className="absolute h-2 bg-purple-600 rounded-md"
                  style={{
                    left: `${((priceRange[0] - 10) / 90) * 100}%`,
                    right: `${100 - ((priceRange[1] - 10) / 90) * 100}%`,
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            // Type assertion to handle potential key property
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { key, ...thumbProps } = props as any;
            return (
              <div
                key={key}
                {...thumbProps}
                className="w-5 h-5 bg-purple-600 rounded-full border border-white shadow-md cursor-pointer hover:bg-purple-700"
              />
            );
          }}
        />
      </div>
    </div>
  );
}