import About from "@/components/about/About";
import Brands from "@/components/cars/Brands";
import Cars from "@/components/cars/Cars";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Brands />
      <Cars />
      <About />
      <Footer />
    </div>
  );
}
