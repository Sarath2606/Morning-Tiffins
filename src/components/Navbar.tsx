import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ShoppingCart, 
  UserCircle2, 
  Search,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import AuthModal from "@/components/AuthModal";
import { toast } from "sonner";

export const Navbar = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setUserPhone(localStorage.getItem('userPhone'));
    toast.success("Successfully signed in!");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserPhone(null);
    localStorage.removeItem('userPhone');
    toast.success("Successfully signed out!");
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      // Show user profile or settings
      toast.info("Profile settings coming soon!");
    } else {
      setIsAuthModalOpen(true);
    }
  };
  
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/95 backdrop-blur-md shadow-sm transform-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center h-14 sm:h-16">
            {/* Logo and navigation links */}
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/e50ff6a8-a644-4cbb-a533-ef653c3e3e04.png" 
                  alt="Morning Tiffins Logo" 
                  className="h-10 sm:h-12"
                />
              </Link>
              
              {/* Desktop Navigation - moved to the left */}
              <div className="hidden md:flex ml-4 sm:ml-6 space-x-4">
                <Link to="/" className="text-gray-700 hover:text-cloud-purple flex items-center space-x-1">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link to="/menu" className="text-gray-700 hover:text-cloud-purple">Menu</Link>
              </div>
            </div>
            
            {/* Search Bar - expanded in the middle */}
            <div className="hidden md:flex flex-1 justify-center px-4 sm:px-8">
              <div className="relative w-full max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-1.5 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-cloud-purple focus:bg-white"
                />
              </div>
            </div>
            
            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
              <Link to="/cart">
                <Button variant="outline" size="icon" className="rounded-full relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cloud-purple text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <div className="relative group">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={handleProfileClick}
                >
                  <UserCircle2 size={20} />
                </Button>
                {isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {userPhone}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              <Link to="/menu">
                <Button className="bg-cloud-purple hover:bg-cloud-purple/90 text-sm sm:text-base">Order Now</Button>
              </Link>
            </div>
            
            {/* Mobile Action Buttons */}
            <div className="flex md:hidden items-center space-x-3 ml-auto">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cloud-purple text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={handleProfileClick}
              >
                <UserCircle2 size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Add padding to prevent content from hiding behind fixed navbar */}
      <div className="h-14 sm:h-16"></div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;
