"use client";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="bg-gray-100 shadow-md px-4 sm:px-12">
            <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center py-8 px-4 sm:px-12 gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mt-4">
                        <span className="text-purple-600">🌸Hoa Tươi UIT</span> <br /> Hoa của sự tinh túy
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-xl text-sm sm:text-base">
                        Hoa Tươi UIT cung cấp giỏ hoa tươi, hộp hoa đẹp, bó hoa nghệ thuật được thiết kế tinh tế, phù hợp cho mọi dịp như sinh nhật, kỷ niệm, khai trương hay tặng người thân. Đặt hoa online dễ dàng, đa dạng mẫu mã, giá hợp lý.
                    </p>
                    <div className="mt-8 md:mt-16 space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center justify-center md:justify-start">
                        <a href="#" className="w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-purple-700 text-center">
                            Mua ngay →
                        </a>
                        <a href="#" className="w-full md:w-auto text-gray-800 font-semibold hover:underline text-center">
                            Xem thêm
                        </a>
                    </div>
                    <div className="flex mt-6 items-center space-x-4 justify-center md:justify-start">
                        {/* Danh sách Avatar */}
                        <div className="flex -space-x-2">
                            <Image src="/avatars/avatar1.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 1" />
                            <Image src="/avatars/avatar2.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 2" />
                            <Image src="/avatars/avatar3.jpg" width={40} height={40} className="rounded-full border-2 border-white" alt="User 3" />
                            <div className="w-10 h-10 bg-pink-400 text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-white">
                                +
                            </div>
                        </div>
                        <div>
                            <p className="text-black text-lg font-semibold">4.9+ ⭐</p>
                            <p className="text-gray-500 text-sm">Hơn 95k+ người dùng tin tưởng</p>
                        </div>
                    </div>
                </div>
                <div className="relative w-full md:w-auto">
                    <Image
                        src="/hero-image.jpg"
                        alt="Flower Girl"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-lg w-full md:w-auto"
                    />
                </div>
            </section>
        </div>
    );
}
