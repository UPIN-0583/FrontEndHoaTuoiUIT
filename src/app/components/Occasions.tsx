"use client";
import { useEffect, useState } from "react";
import removeAccents from "remove-accents";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/themes";

interface Occasion {
  themeId: number;
  themeName: string;
  description?: string;
  suitableOccasions?: string;
}

export default function Occasions() {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch themes");
        }
        const data: Occasion[] = await response.json();
        setOccasions(data);
      } catch (error) {
        console.error("Error fetching themes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return (
    <section className="text-center py-12 bg-white">
      <h3 className="text-gray-500 uppercase font-semibold">Occasions</h3>
      <h2 className="text-4xl font-bold text-black">
        Shop By <span className="text-purple-600">Occasions</span>
      </h2>

      {loading ? (
        <p className="text-gray-500 mt-6">Loading occasions...</p>
      ) : (
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          {occasions.length > 0 ? (
            occasions.map((item) => (
              <div key={item.themeId} className="flex flex-col items-center w-40">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <Image
                  src={`/images/themes/${removeAccents(item.themeName.toLowerCase().replace(/\s+/g, ""))}.png`}
                  alt={item.themeName}
                  width={60}
                  height={60}
                />
                </div>
                <h4 className="mt-2 font-semibold text-lg text-black">{item.themeName}</h4>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No occasions available.</p>
          )}
        </div>
      )}
    </section>
  );
}
