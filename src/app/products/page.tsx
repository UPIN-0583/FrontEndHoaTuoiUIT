"use client";

import SidebarFilter from "../components/SidebarFilter";
import ProductList from "../components/ProductList";

export default function Products() {
  //const [priceRange, setPriceRange] = useState([10, 100]);

  return (
    <div className="bg-white">
      <div className="flex max-w-7xl mx-auto p-6 gap-6">
        <SidebarFilter/>
        <ProductList />
      </div>
    </div>
  );
}
