"use client";
import Image from "next/image";
import { FC } from "react";

export interface BlogPost {
  image: string;
  category: string;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
      {/* Ảnh đại diện */}
      <div className="relative w-full h-48 md:h-52 lg:h-56">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category tag */}
        <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
          {post.category}
        </div>
      </div>

      {/* Nội dung bài viết */}
      <div className="p-4">
        {/* Tác giả & ngày đăng */}
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.date}</span>
        </div>

        {/* Tiêu đề */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {post.title}
        </h3>

        {/* Mô tả ngắn */}
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Đường dẫn xem chi tiết */}
        <a
          href={post.link}
          className="text-purple-600 font-medium hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
