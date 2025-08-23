
import { Link } from 'react-router-dom';
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-market-primary" />
              <span className="text-lg font-bold">LocalMarket<span className="text-market-primary">Connect</span></span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Connecting local shoppers with nearby businesses. Find what you need, when you need it, from stores just around the corner.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Shoppers</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">How It Works</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Find Nearby Shops</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Safety Tips</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Join as a Shop</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Business Dashboard</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Inventory Management</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Marketing Tools</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">About Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Contact Us</Link></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
