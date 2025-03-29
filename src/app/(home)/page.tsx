import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Occasions from "../components/Occasions";
import TopSellers from "../components/TopSellers";
import SaleOff from "../components/SaleOff";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";
import Features from "../components/Features";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Occasions/>
      <TopSellers/>
      <SaleOff/>
      <BlogSection/>
      <Features/>
      <Footer/>
    </div>
  );
}
