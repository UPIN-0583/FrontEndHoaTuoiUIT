import ProductCard from "./ProductCard";

const products = [
  { title: "Blue White Bouquets", price: "$45.00", oldPrice: "$90.00", discount: "50%", rating: 4.9, img: "/images/bouquet1.png" },
  { title: "Royal Pink Bouquets", price: "$48.00", rating: 4.9, img: "/images/bouquet2.png" },
  { title: "Lavenders Bouquets", price: "$24.00", oldPrice: "$30.00", discount: "20%", rating: 4.9, img: "/images/bouquet3.png" },
  { title: "Rose Bouquets", price: "$35.00", rating: 4.9, img: "/images/bouquet4.png" },
];

export default function TopSellers() {
  return (
    <section className="py-12 px-auto bg-white mx-auto">
        <div className="flex items-center justify-between text-center mx-52">
            <div className="text-left">
                <h3 className="text-gray-500 uppercase font-semibold">Our Products</h3>
                <h2 className="text-4xl font-bold text-black">
                    Our <span className="text-purple-600">Top Seller Products</span>
                </h2>
            </div>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-full">
                View All Products
            </button> 
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
            {products.map((item, index) => (
            <ProductCard key={index} {...item} />
            ))}
        </div>

      
    </section>
  );
}
