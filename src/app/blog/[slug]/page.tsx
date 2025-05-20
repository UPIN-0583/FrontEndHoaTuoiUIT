import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Interface ánh xạ BlogPostDTO từ API
interface BlogPostDTO {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  author: string;
  createdAt: string;
  updatedAt: string | null;
  isActive: boolean;
}

// Base URL cho API và hình ảnh
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backendhoatuoiuit.onrender.com";

// Hàm tạo slug từ tiêu đề
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

// Hàm tìm ID bài viết từ slug
async function findBlogIdBySlug(slug: string): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const blogs: BlogPostDTO[] = await res.json(); // Định nghĩa kiểu cho blogs
    const blog = blogs.find((b) => createSlug(b.title) === slug); // Loại bỏ : any
    return blog ? blog.id : null;
  } catch (error) {
    console.error("Lỗi khi tìm bài viết bằng slug:", error);
    return null;
  }
}

// Hàm tạo metadata động cho SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const id = await findBlogIdBySlug(slug);

  if (!id) {
    return {
      title: "Không tìm thấy bài viết | Hoa Tươi UIT",
      description: "Bài viết yêu cầu không tồn tại.",
    };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/blog/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Blog not found");
    const blog: BlogPostDTO = await res.json();

    const getMetaDescription = (content: string) => {
      const plainText = content.replace(/<[^>]+>/g, "");
      return plainText.length > 160 ? plainText.substring(0, 160) + "..." : plainText;
    };

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: getMetaDescription(blog.content),
      author: { "@type": "Person", name: blog.author },
      datePublished: blog.createdAt,
      image: `${API_BASE_URL}${blog.thumbnailUrl}`,
    };

    return {
      title: `${blog.title} | Hoa Tươi UIT`,
      description: getMetaDescription(blog.content),
      keywords: ["hoa tươi", "blog hoa", "cảm xúc", "yêu thương"],
      authors: [{ name: blog.author }],
      openGraph: {
        title: blog.title,
        description: getMetaDescription(blog.content),
        images: [`${API_BASE_URL}${blog.thumbnailUrl}`],
        type: "article",
        url: `https://hoatuoiuit.id.vn/blog/${slug}`,
      },
      other: {
        "structured-data": JSON.stringify(structuredData),
      },
    };
  } catch (error) {
    console.error("Lỗi khi tạo metadata:", error);
    return {
      title: "Không tìm thấy bài viết | Hoa Tươi UIT",
      description: "Bài viết yêu cầu không tồn tại.",
    };
  }
}

export default async function BlogDetails({ params }) {
  const { slug } = await params;
  const id = await findBlogIdBySlug(slug);

  if (!id) {
    notFound();
  }

  let blog: BlogPostDTO;
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Blog not found");
    blog = await res.json();
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu bài viết:", error);
    notFound();
  }

  if (!blog) {
    notFound();
  }

  // Hàm sửa URL hình ảnh trong content
  const fixImageUrls = (content: string) => {
    return content.replace(/src="\/Uploads\//g, `src="${API_BASE_URL}/uploads/`);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.content.replace(/<[^>]+>/g, "").substring(0, 160) + "...",
    author: { "@type": "Person", name: blog.author },
    datePublished: blog.createdAt,
    image: `${API_BASE_URL}${blog.thumbnailUrl}`,
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center text-gray-600 mb-6">
          <span>Tác giả: {blog.author}</span>
          <span className="mx-2">•</span>
          <span>
            Ngày đăng: {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        {blog.thumbnailUrl && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={`${API_BASE_URL}${blog.thumbnailUrl}`}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>
        )}
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: fixImageUrls(blog.content) }}
        />
      </div>
    </>
  );
}