import Image from "next/image";

interface OssasionsItemProps {
    name: string;
    description: string;
    imageUrl: string;
}
export default function OccasionsItem({ name, imageUrl }: OssasionsItemProps) {
    return (
        <div className="flex flex-col items-center w-40">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <Image src={imageUrl} alt={name} width={60} height={60} />
            </div>
            <h4 className="mt-2 font-semibold text-lg text-black">{name}</h4>
        </div>
    )
};
