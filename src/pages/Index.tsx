
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import HowItWorks from "@/components/HowItWorks";
import ShopSection from "@/components/ShopSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import { motion } from "framer-motion";
import { useScrollingSystem } from "@/hooks/useScrollingSystem";

const Index = () => {
  // Initialize the advanced scrolling system
  useScrollingSystem({
    enableKeyboardNav: true,
    enableProgressIndicator: true,
    enableImageCrossfade: true,
    enableTextAnimation: true,
    animationDuration: 800,
    staggerDelay: 150,
  });
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main 
        className="flex-1"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} data-scroll-section data-bg-image="/api/placeholder/1920/1080" aria-label="Hero Section">
          <HeroSection />
        </motion.div>
        <motion.div variants={fadeInUp} data-scroll-section data-bg-image="/api/placeholder/1920/900" aria-label="Categories Section">
          <CategorySection />
        </motion.div>
        <motion.div variants={fadeInUp} data-scroll-section data-bg-image="/api/placeholder/1920/800" aria-label="How It Works Section">
          <HowItWorks />
        </motion.div>
        <motion.div variants={fadeInUp} data-scroll-section data-bg-image="/api/placeholder/1920/950" aria-label="Shop Section">
          <ShopSection />
        </motion.div>
        <motion.div variants={fadeInUp} data-scroll-section data-bg-image="/api/placeholder/1920/850" aria-label="Features Section">
          <FeaturesSection />
        </motion.div>
        <motion.div variants={fadeInUp} data-scroll-section data-bg-image="/api/placeholder/1920/900" aria-label="Testimonials Section">
          <TestimonialSection />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Index;
