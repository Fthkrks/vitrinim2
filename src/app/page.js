import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";
export default function Home() {
  return (
    <div>
      <div className="md:px-20 bg-base-100">
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
