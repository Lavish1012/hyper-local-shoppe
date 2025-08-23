
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import HowItWorks from "@/components/HowItWorks";
import ShopSection from "@/components/ShopSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import { motion } from "framer-motion";

const Index = () => {
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
        <motion.div variants={fadeInUp}>
          <HeroSection />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <CategorySection />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <HowItWorks />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <ShopSection />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <FeaturesSection />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <TestimonialSection />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Index;
