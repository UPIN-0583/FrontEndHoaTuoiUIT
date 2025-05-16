import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Base URL cho API và hình ảnh
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// Hàm tạo metadata động cho SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = await params; // Await params để lấy id
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Bài viết không tồn tại");
    const blog = await res.json();

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
        url: `https://hoatuoiuit.id.vn/blog/${blog.id}`,
      },
      other: {
        "structured-data": JSON.stringify(structuredData),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Bài viết không tồn tại | Hoa Tươi UIT",
      description: "Bài đăng blog được yêu cầu không thể tìm thấy.",
    };
  }
}

export default async function BlogDetails({ params }) {
  const { id } = await params; // Await params để lấy id
  let blog;

  try {
    const res = await fetch(`${API_BASE_URL}/api/blog/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Blog not found");
    blog = await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }

  if (!blog) {
    notFound();
  }

  // Hàm để sửa URL hình ảnh trong content
  const fixImageUrls = (content: string) => {
    return content.replace(/src="\/uploads\//g, `src="${API_BASE_URL}/uploads/`);
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