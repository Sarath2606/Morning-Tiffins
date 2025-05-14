import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative hero-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Delicious Food <br />
              <span className="text-cloud-purple">Delivered to</span> Your Cloud
            </h1>
            <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Tired of skipping breakfast in a rush?
            </p>
            <p className="text-base sm:text-lg text-gray-600 max-w-lg">
            Place your order in seconds and get a hot, healthy tiffin delivered before class or work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/menu">
                <Button size="lg" className="bg-cloud-purple hover:bg-cloud-purple/90 text-white w-full sm:w-auto">
                  Order Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Plans
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-6 pt-2">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cloud-peach"></div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cloud-green"></div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cloud-orange"></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                <span className="font-bold text-gray-900">100+</span> Happy customers
              </p>
            </div>
          </div>
          <div className="relative mt-6 md:mt-0">
            <div className="relative z-10 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" 
                alt="Delicious Food" 
                className="rounded-2xl shadow-xl max-w-full h-auto"
              />
            </div>
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-32 h-32 sm:w-40 sm:h-40 bg-cloud-purple/10 rounded-full animate-pulse-soft"></div>
            <div className="absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 w-48 h-48 sm:w-60 sm:h-60 bg-cloud-orange/10 rounded-full animate-pulse-soft"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
