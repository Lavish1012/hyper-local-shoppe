
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, Menu, X, User, MapPin, LogOut, Store } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useState("New Delhi, India");
  const { user, signOut, userRole, loading } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-market-primary" />
            <span className="text-xl font-bold">LocalMarket<span className="text-market-primary">Connect</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative w-64">
              <Input 
                type="text" 
                placeholder="Search products..."
                className="pl-10 py-2"
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="flex items-center space-x-1 text-sm cursor-pointer">
              <MapPin className="h-4 w-4 text-market-secondary" />
              <span>{location}</span>
            </div>

            <nav className="flex space-x-6">
              <Link to="/for-shops" className="text-gray-700 hover:text-market-primary font-medium">For Businesses</Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-market-primary font-medium">How It Works</Link>
              <Link to="/download" className="text-gray-700 hover:text-market-primary font-medium">Download App</Link>
            </nav>

            <div className="flex space-x-3">
              {!loading && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          {user.email?.split('@')[0]}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {userRole === 'seller' ? (
                          <DropdownMenuItem asChild>
                            <Link to="/seller-dashboard">
                              <Store className="w-4 h-4 mr-2" />
                              Seller Dashboard
                            </Link>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem asChild>
                            <Link to="/customer-dashboard">
                              <User className="w-4 h-4 mr-2" />
                              Customer Dashboard
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link to="/user-dashboard">Profile Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Link to="/auth">
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth">
                        <Button size="sm">Register</Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t mt-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-full">
                <Input 
                  type="text" 
                  placeholder="Search products..."
                  className="pl-10 py-2 w-full"
                />
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center mb-4 space-x-1 text-sm">
              <MapPin className="h-4 w-4 text-market-secondary" />
              <span>{location}</span>
            </div>

            <nav className="space-y-3">
              <Link to="/for-shops" className="block text-gray-700 hover:text-market-primary font-medium">For Businesses</Link>
              <Link to="/how-it-works" className="block text-gray-700 hover:text-market-primary font-medium">How It Works</Link>
              <Link to="/download" className="block text-gray-700 hover:text-market-primary font-medium">Download App</Link>
            </nav>

            <div className="mt-4 space-y-2">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="text-sm font-medium text-gray-900 mb-4">
                        Welcome, {user.email?.split('@')[0]} ({userRole})
                      </div>
                      {userRole === 'seller' ? (
                        <Link to="/seller-dashboard" className="block w-full">
                          <Button variant="outline" className="w-full">
                            <Store className="h-4 w-4 mr-2" />
                            Seller Dashboard
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/customer-dashboard" className="block w-full">
                          <Button variant="outline" className="w-full">
                            <User className="h-4 w-4 mr-2" />
                            Customer Dashboard
                          </Button>
                        </Link>
                      )}
                      <Link to="/user-dashboard" className="block w-full">
                        <Button variant="outline" className="w-full">Profile Settings</Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" className="block w-full">
                        <Button variant="outline" className="w-full">
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth" className="block w-full">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
