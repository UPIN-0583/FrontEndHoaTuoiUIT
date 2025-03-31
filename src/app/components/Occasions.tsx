import Image from "next/image";



const occasions = [
  { title: "Weddings", products: 42, img: "/images/themes/camon.png" },
  { title: "Birthday", products: 56, img: "/images/themes/chiabuon.png" },
  { title: "Anniversary", products: 11, img: "/images/themes/chucmung.png" },
  { title: "Thank You", products: 48, img: "/images/themes/tinhyeu.png" },
  { title: "Graduation", products: 13, img: "/images/themes/xinloi.png" },
];

export default function Occasions() {
  return (
    <section className="text-center py-12 bg-white">
      <h3 className="text-gray-500 uppercase font-semibold">Occasions</h3>
      <h2 className="text-4xl font-bold text-black">
        Shop By <span className="text-purple-600">Occasions</span>
      </h2>

      <div className="mt-8 flex justify-center gap-6 flex-wrap">
        {occasions.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-40">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <Image src={item.img} alt={item.title} width={60} height={60} />
            </div>
            <h4 className="mt-2 font-semibold text-lg text-black">{item.title}</h4>
            <p className="text-gray-500 text-sm">{item.products} Products</p>
          </div>
        ))}
      </div>
    </section>
  );
}