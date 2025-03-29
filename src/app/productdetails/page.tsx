import ProductDetail from "../components/ProductDetail";
import RelatedProduct from "../components/RelatedProduct"

export default function ProductDetailPage() {
  return (
    <div className="p-10 bg-white">
      <ProductDetail/>
      <RelatedProduct/>
    </div>
  );
}
