'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ProductList from './ProductList';

interface ProductListWrapperProps {
    products: any[];
    sortOption: string;
    currentPage: number;
    totalProducts: number;
    pageSize: number;
}

export default function ProductListWrapper({
    products,
    sortOption,
    currentPage,
    totalProducts,
    pageSize,
}: ProductListWrapperProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'default') {
            params.delete('sort');
        } else {
            params.set('sort', value);
        }
        router.push(`/products?${params.toString()}`);
    };

    return (
        <ProductList
            products={products}
            sortOption={sortOption}
            currentPage={currentPage}
            totalProducts={totalProducts}
            pageSize={pageSize}
            onSortChange={handleSortChange}
        />
    );
}
