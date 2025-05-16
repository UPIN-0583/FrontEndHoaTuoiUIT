// import { Range } from "react-range";

const categories = ["Hoa hồng", "Cẩm tú cầu", "Hoa hướng dương", "Hoa sen", "Hoa đồng tiền", "Hoa lan", "Cẩm chướng", "Hoa cúc"];
const occasions = ["Hoa tình yêu", "Hoa sinh nhật", "Hoa chúc mừng", "Hoa cảm ơn", "Hoa khai trương", "Hoa chia buồn"];

interface SidebarFilterProps {
  selectedFlowers: string[];
  selectedOccasions: string[];
  priceRange: number[];
}

export default function SidebarFilter({
  selectedFlowers,
  selectedOccasions,
  priceRange,
}: SidebarFilterProps) {
  return (
    <form
      className="w-full p-4 md:p-6 max-[480px]:p-2 h-fit bg-white shadow rounded-lg text-black"
      method="get"
    >
      <h2 className="font-semibold text-2xl md:text-2xl max-[480px]:text-xl my-4">Bộ lọc</h2>

      <h3 className="font-semibold mt-6 mb-2">Theo loại hoa</h3>
      {categories.map((c) => (
        <label key={c} className="block">
          <input
            type="checkbox"
            className="mr-2 w-4 h-4 max-[480px]:w-3 max-[480px]:h-3"
            name="flowerType"
            value={c}
            defaultChecked={selectedFlowers.includes(c)}
            aria-label={`Filter by ${c}`}
          />
          {c}
        </label>
      ))}

      <h3 className="font-semibold mt-6 mb-2">Theo sự kiện</h3>
      {occasions.map((o) => (
        <label key={o} className="block">
          <input
            type="checkbox"
            className="mr-2 w-4 h-4 max-[480px]:w-3 max-[480px]:h-3"
            name="occasion"
            value={o}
            defaultChecked={selectedOccasions.includes(o)}
            aria-label={`Filter by ${o}`}
          />
          {o}
        </label>
      ))}

      <h3 className="font-semibold mt-6 mb-2">Theo giá</h3>
      <div className="mb-4 flex gap-2 items-center">
        <label className="flex-1">
          <span className="text-sm block">Tối thiểu</span>
          <input
            type="number"
            name="priceMin"
            min={0}
            max={priceRange[1]}
            defaultValue={priceRange[0]}
            className="w-full border rounded p-1"
          />
        </label>
        <label className="flex-1">
          <span className="text-sm block">Tối đa</span>
          <input
            type="number"
            name="priceMax"
            min={priceRange[0]}
            max={10000000}
            defaultValue={priceRange[1]}
            className="w-full border rounded p-1"
          />
        </label>
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-purple-600 text-white rounded mx-auto block">Lọc</button>
    </form>
  );
}