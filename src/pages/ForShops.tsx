
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Store, TrendingUp, ShieldCheck, Tags } from "lucide-react";

const ForShops = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-market-primary/10 to-market-secondary/5 py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Grow Your Business with LocalMarket Connect</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Connect with local customers searching for your products in real-time. Increase foot traffic and boost sales with our innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/seller-dashboard">
                <Button size="lg" className="bg-market-primary hover:bg-market-primary/90">
                  Try Dashboard Demo
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-market-primary text-market-primary hover:bg-market-primary/10">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Sell on LocalMarket Connect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-market-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="h-8 w-8 text-market-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Increase Store Visibility</h3>
                <p className="text-gray-600">Put your store on the map and reach customers actively searching for your products.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-market-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-market-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Boost Sales</h3>
                <p className="text-gray-600">Convert online browsers into in-store customers with reservations and pre-orders.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-market-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-market-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Simple & Secure</h3>
                <p className="text-gray-600">Easy-to-use inventory management and secure payment processing.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-gray-700/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tags className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Competitive Edge</h3>
                <p className="text-gray-600">Stand out against online giants by offering immediate availability and local service.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForShops;
