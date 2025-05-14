
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="text-center px-4">
          <div className="mb-6">
            <div className="h-24 w-24 mx-auto bg-cloud-purple/10 rounded-full flex items-center justify-center">
              <span className="text-6xl font-bold text-cloud-purple">404</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Oops! We couldn't find the page you're looking for.
          </p>
          <Button size="lg" className="bg-cloud-purple hover:bg-cloud-purple/90">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
