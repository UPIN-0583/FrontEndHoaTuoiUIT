import Image from "next/image";

interface OssasionsItemProps{
    title: string;
    products: number;
    img:string;
}
export default function OccasionsItem({ title, products, img }: OssasionsItemProps){
    return (
        <div className="flex flex-col items-center w-40">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <Image src={img} alt={title} width={60} height={60} />
                </div>
                <h4 className="mt-2 font-semibold text-lg text-black">{title}</h4>
                <p className="text-gray-500 text-sm">{products} Products</p>
        </div>
    )
};
