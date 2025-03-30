import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Occasions from "./components/Occasions";
import TopSellers from "./components/TopSellers";
import SaleOff from "./components/SaleOff";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Occasions />
      <TopSellers />
      <SaleOff />
      <BlogSection />
      <Footer />
    </div>
  );
}
