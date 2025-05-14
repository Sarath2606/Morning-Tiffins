import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FoodCategories from "@/components/FoodCategories";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import HowItWorks from "@/components/HowItWorks";
import MobileApp from "@/components/MobileApp";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <FoodCategories />
          <FeaturedRestaurants />
          <HowItWorks />
          <MobileApp />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
