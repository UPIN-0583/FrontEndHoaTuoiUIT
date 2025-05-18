import { Metadata } from "next";
import SidebarFilter from "../components/SidebarFilter";
import ProductListWrapper from "../components/ProductListWrapper";


// SEO metadata
export const metadata: Metadata = {
  title: "Sản phẩm hoa tươi đẹp, giao nhanh | Hoa Tươi UIT",
  description: "Khám phá các mẫu hoa tươi đẹp, đa dạng tại Hoa Tươi UIT. Đặt hoa online, giao tận nơi nhanh chóng, giá tốt, dịch vụ chuyên nghiệp.",
  keywords: "hoa tươi, shop hoa, đặt hoa online, hoa sinh nhật, hoa cưới, hoa bó, hoa đẹp, giao hoa tận nơi",
  openGraph: {
    title: "Sản phẩm hoa tươi đẹp, giao nhanh | Hoa Tươi UIT",
    description: "Khám phá các mẫu hoa tươi đẹp, đa dạng tại Hoa Tươi UIT. Đặt hoa online, giao tận nơi nhanh chóng, giá tốt, dịch vụ chuyên nghiệp.",
    url: "https://hoatuoiuit.id.vn/products",
    type: "website",
  },
};

async function getProducts() {
  const res = await fetch("http://backendhoatuoiuit.onrender.com/api/products", { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    rating: Number((Math.random() * 0.3 + 4.7).toFixed(1)),
    title: item.name,
    img: `http://backendhoatuoiuit.onrender.com${item.imageUrl}`,
    price: item.price,
    category: item.categoryName,
    flowerNames: item.flowerNames || [],       // <-- giữ nguyên là mảng
    occasionNames: item.occasionNames || [],   // <-- giữ nguyên là mảng
  }));

}

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  // Lấy filter/sort từ query string
  function parseMulti(raw?: string | string[]): string[] {
    if (!raw) return [];
    if (Array.isArray(raw)) {
      return raw.map(decodeURIComponent);
    }
    return raw.split(",").map((s) => decodeURIComponent(s.trim())).filter((s) => s);
  }

  const selectedFlowers = parseMulti(params?.flowerType);
  const selectedOccasions = parseMulti(params?.occasion);

  const priceMin = params?.priceMin ? Number(params.priceMin) : undefined;
  const priceMax = params?.priceMax ? Number(params.priceMax) : undefined;
  const sortOption = params?.sort || "default";
  const currentPage = Number(params?.page) || 1;

  const products = await getProducts();

  // Lọc sản phẩm phía server
  const filteredProducts = products.filter((product: any) => {
    const matchesFlower =
      selectedFlowers.length === 0 ||
      selectedFlowers.some((selected: string) =>
        product.flowerNames.includes(selected)
      );

    const matchesOccasion =
      selectedOccasions.length === 0 ||
      selectedOccasions.some((selected: string) =>
        product.occasionNames.includes(selected)
      );

    const priceMatch =
      (priceMin === undefined || product.price >= priceMin) &&
      (priceMax === undefined || product.price <= priceMax);


    return matchesFlower && matchesOccasion && priceMatch;
  });


  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low-high") return a.price - b.price;
    if (sortOption === "price-high-low") return b.price - a.price;
    if (sortOption === "rating-high-low") return b.rating - a.rating;
    return 0;
  });

  const pageSize = 8;
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  return (
    <div className="bg-white">
      <div className="flex max-w-7xl mx-auto p-6 gap-6">
        <div className="flex-1 hidden md:block">
          <SidebarFilter
            selectedFlowers={selectedFlowers}
            selectedOccasions={selectedOccasions}
            priceRange={[priceMin ?? 0, priceMax ?? 10000000]}
          />
        </div>
        <div className="flex-4">
          <ProductListWrapper
            products={paginatedProducts}
            sortOption={sortOption}
            currentPage={currentPage}
            totalProducts={sortedProducts.length}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}