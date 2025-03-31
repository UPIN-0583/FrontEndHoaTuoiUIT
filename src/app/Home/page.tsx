import Hero from "../components/Hero";
import Occasions from "../components/Occasions";
import TopSellers from "../components/TopSellers";
import SaleOff from "../components/SaleOff";
import BlogSection from "../components/BlogSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <Occasions />
      <TopSellers />
      <SaleOff />
      <BlogSection />
    </div>
  );
}
