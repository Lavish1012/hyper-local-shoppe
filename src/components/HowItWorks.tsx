
import { Search, MapPin, ShoppingBag, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <Search className="h-8 w-8 text-white" />,
    title: "Search for products",
    description: "Enter what you're looking for and find it in stores near you.",
    color: "bg-market-primary"
  },
  {
    icon: <MapPin className="h-8 w-8 text-white" />,
    title: "Discover nearby shops",
    description: "See all nearby shops with real-time inventory and availability.",
    color: "bg-market-secondary"
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-white" />,
    title: "Reserve items",
    description: "Reserve items online for guaranteed availability when you arrive.",
    color: "bg-market-accent"
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-white" />,
    title: "Pick up & enjoy",
    description: "Skip the wait with reserved items ready when you arrive.",
    color: "bg-gray-700"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How LocalMarket Connect Works</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover products from local shops in just a few steps. No more searching from shop to shop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <Link to="/user-dashboard">
            <Button size="lg" className="bg-market-primary hover:bg-market-primary/90">
              Try User Dashboard
            </Button>
          </Link>
          <Link to="/seller-dashboard">
            <Button size="lg" variant="outline" className="border-market-primary text-market-primary hover:bg-market-primary/10">
              Try Seller Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
