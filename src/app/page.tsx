import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Occasions from "./components/Occasions";
import TopSellers from "./components/TopSellers";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Occasions/>
      <TopSellers/>
    </div>
  );
}
