import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProductActions from "./ProductActions";

// Interface ánh xạ ProductDTO từ API
interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  discountValue: number;
  finalPrice: number;
  averageRating: number;
  imageUrl: string;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  flowerNames: string[];
  occasionNames: string[];
  isFavorited: boolean;
}

// Base URL cho API và hình ảnh
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backendhoatuoiuit.onrender.com";

// Hàm tạo slug từ tên sản phẩm
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

// Hàm tìm ID sản phẩm từ slug
async function findProductIdBySlug(slug: string): Promise<number | null> {
  try {
    // Tách id từ slug (ví dụ: ngot-ngao-1-2 -> id = 2)
    const parts = slug.split("-");
    const id = parseInt(parts[parts.length - 1], 10);
    if (isNaN(id)) {
      console.error("Invalid ID in slug:", slug);
      return null;
    }

    // Kiểm tra sản phẩm có tồn tại trong danh sách không
    const res = await fetch(`${API_BASE_URL}/api/products/view-all`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    const products: ProductDTO[] = await res.json();
    if (!products || products.length === 0) {
      console.error("No products found in API response");
      return null;
    }

    const product = products.find((p) => p.id === id);
    if (!product) {
      console.error(`Product with ID ${id} not found`);
      return null;
    }

    // Kiểm tra slug có khớp với định dạng không
    const expectedSlug = `${createSlug(product.name)}-${product.id}`;
    if (expectedSlug !== slug) {
      console.error(`Slug mismatch: expected ${expectedSlug}, got ${slug}`);
      return null;
    }

    return product.id;
  } catch (error) {
    console.error("Lỗi khi tìm sản phẩm bằng slug:", error);
    return null;
  }
}

// Hàm lấy chi tiết sản phẩm
async function getProductById(id: number): Promise<ProductDTO | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}/detail`, { cache: "no-store" });
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    return null;
  }
}

// Hàm tạo metadata động cho SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = await findProductIdBySlug(slug);

  if (!id) {
    return {
      title: "Không tìm thấy sản phẩm | Hoa Tươi UIT",
      description: "Sản phẩm yêu cầu không tồn tại.",
    };
  }

  const product = await getProductById(id);
  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm | Hoa Tươi UIT",
      description: "Sản phẩm yêu cầu không tồn tại.",
    };
  }

  const getMetaDescription = (description: string) => {
    const plainText = description.replace(/<[^>]+>/g, "");
    return plainText.length > 160 ? plainText.substring(0, 160) + "..." : plainText;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: getMetaDescription(product.description),
    offers: {
      "@type": "Offer",
      price: product.finalPrice,
      priceCurrency: "VND",
      availability: product.isActive ? "InStock" : "OutOfStock",
    },
    image: `${API_BASE_URL}${product.imageUrl}`,
    category: product.categoryName,
  };

  return {
    title: `${product.name} | Hoa Tươi UIT`,
    description: getMetaDescription(product.description),
    keywords: [
      "hoa tươi",
      product.categoryName.toLowerCase(),
      ...product.occasionNames.map((o) => o.toLowerCase()),
      ...product.flowerNames.map((f) => f.toLowerCase()),
    ],
    openGraph: {
      title: product.name,
      description: getMetaDescription(product.description),
      images: [`${API_BASE_URL}${product.imageUrl}`],
      type: "website",
      url: `https://hoatuoiuit.id.vn/products/${slug}`,
    },
    other: {
      "structured-data": JSON.stringify(structuredData),
    },
  };
}

// Server Component
export default async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = await findProductIdBySlug(slug);

  if (!id) {
    notFound();
  }

  const product = await getProductById(id);
  if (!product) {
    notFound();
  }

  // Hàm sửa URL hình ảnh
  const fixImageUrl = (url: string) => {
    return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description.replace(/<[^>]+>/g, "").substring(0, 160) + "...",
    offers: {
      "@type": "Offer",
      price: product.finalPrice,
      priceCurrency: "VND",
      availability: product.isActive ? "InStock" : "OutOfStock",
    },
    image: fixImageUrl(product.imageUrl),
    category: product.categoryName,
  };

  // Giả lập rating và số lượng đánh giá (vì API trả về averageRating = 0)
  const rating = product.averageRating > 0 ? product.averageRating : 4.9;
  const reviewsCount = 245; // Hardcode, thay bằng dữ liệu thật nếu API cung cấp

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg text-black mt-6">
        {/* Product Display */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="md:w-2/3">
            <Image
              src={fixImageUrl(product.imageUrl)}
              alt={product.name}
              className="w-full rounded-lg"
              width={200}
              height={300}
            />
          </div>

          {/* Right Section */}
          <div>
            <h3 className="text-gray-500">{product.categoryName}</h3>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {rating} ({reviewsCount} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-lg font-bold mt-2">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.finalPrice)}{" "}
              {product.discountValue > 0 && (
                <span className="text-gray-500 line-through ml-2">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                </span>
              )}
            </div>

            <div className="mt-4">{product.description.replace(/<[^>]+>/g, "").slice(0, 150)}</div>

            {/* Tùy chọn kích thước, số lượng, nút hành động */}
            <ProductActions productId={product.id} isFavorited={product.isFavorited} />
          </div>
        </div>
      </div>
    </>
  );
}