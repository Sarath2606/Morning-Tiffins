import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Salad, Beef, Beer, ChefHat, CupSoda } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  color: string;
}

const Category = ({ title, icon, color }: CategoryProps) => (
  <Link to={`/menu#${title.toLowerCase()}`}>
    <Card className="card-hover">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </CardContent>
    </Card>
  </Link>
);

export const FoodCategories = () => {
  const popularCategories = [
    { title: "Tiffins", icon: <ChefHat className="text-white" />, color: "bg-cloud-purple" },
    { title: "Salads", icon: <Salad className="text-white" />, color: "bg-emerald-500" },
    { title: "Coffee", icon: <Coffee className="text-white" />, color: "bg-amber-700" },
    { title: "Chai", icon: <CupSoda className="text-white" />, color: "bg-blue-500" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Explore Food Categories</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Wake up to wholesome and satisfying breakfast options
          </p>
        </div>

        <Tabs defaultValue="popular" className="w-full">
          <div className="flex justify-center mb-6 sm:mb-8">
            <TabsList className="scale-90 sm:scale-100">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="popular" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {popularCategories.map((category) => (
              <Category
                key={category.title}
                title={category.title}
                icon={category.icon}
                color={category.color}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="trending" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {popularCategories.map((category) => (
              <Category
                key={category.title}
                title={category.title}
                icon={category.icon}
                color={category.color}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FoodCategories;