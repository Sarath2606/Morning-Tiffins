import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface RestaurantCardProps {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  price: number;
}

const RestaurantCard = ({ id, name, imageUrl, rating, price }: RestaurantCardProps) => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const cartItem = cartItems.find(item => item.id === id);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image: imageUrl
    });
    toast.success(`${name} added to cart!`);
  };

  const handleUpdateQuantity = (change: number) => {
    if (cartItem) {
      if (cartItem.quantity + change === 0) {
        removeFromCart(id);
        toast.info(`${name} removed from cart`);
      } else {
        updateQuantity(id, change);
      }
    }
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-cloud-orange text-cloud-orange mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-gray-600">₹{price}</p>
      </CardContent>
      <CardFooter className="pt-0">
        {cartItem ? (
          <div className="w-full flex items-center justify-between bg-gray-50 rounded-full px-4 py-2">
            <button
              onClick={() => handleUpdateQuantity(-1)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="font-medium">{cartItem.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(1)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ) : (
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-cloud-purple hover:bg-cloud-purple/90 gap-2"
          >
            Add to Cart
            <ShoppingCart className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export const FeaturedCloudItems = () => {
  const restaurants = [
    {
      id: 1,
      name: "Idly",
      imageUrl: "https://media-hosting.imagekit.io/e117f879382442d6/Idly photo.jpg?Expires=1841026436&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=bOaj9Cv3CXd1q67BlMaLNVfP65ut-zuaB2oR2HlFH-usr5X19lvqilH3PSeOiWgvP9r4zqq~2QQNOezGPZFzYP7Arzv19YaXnum-TPcllusDkDMs0ogxva828Bp2l1WqDK-~0lmZZZbG~ZgsSVm0cV6o5xtiSyel0E9bF7n5J6t5jshTDGnIUgXzWsoAcHBjUxwJU6MK6Ihm7hgmiy2iGILbSFpTvtWquXIvwvBcZaMcIEvTvYRipaPyeDqRqVY~Irw0KVjzVS6Vb1c43QpTBiWOddALiH5q5ax454PlkWKXSrsnEWt3ZK0imQ7S5ErDlYci7JQeobwNpaSEYu7szw__",
      rating: 4.8,
      price: 80
    },
    {
      id: 2,
      name: "Dosa",
      imageUrl: "https://media-hosting.imagekit.io/dc83017f12aa4b74/240_F_397466683_4U8hMaUgWdFPNc8KMKUQ4aH2qR1yG0sA.jpg?Expires=1841027589&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fpFkf0~vVdPgAdvNdP0p5jwzeO7Ib8x86k~LpL58wu7mEgLkxL-l5xf8XVli5XBYKQYcz4BaYtcW06AzdNy0BnpjEINWbber9zgvVFeEjOKC-4~peWezhIVYWODmpDqIy8-alKoOYqzxVAA2GDIrUodFoTf1ktbmpuXUjYpEK3AkGv-bn76vCyDbgbhKnay~p-UqspTQPRl1SbcwpVhJEb3Pf~GFMvybb1RiVbrGToAkuh-6b-hqsy4w6hNYY6M4cRxYw8pu81gU~3ZnFFRvv4QG0maCsjty~e3jdnar1ln00nvt34Ob9~Oib~LqqjtIva8wqTlRkpW~E05vQxioUQ__",
      rating: 4.7,
      price: 120
    },
    {
      id: 3,
      name: "Milky Oats",
      imageUrl: "https://media-hosting.imagekit.io/58f9bd55726a4b33/240_F_1237165622_Jygyt4E96ph6sOYEMEGdq8VAzVpcyDoc.jpg?Expires=1841027816&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Ss1RZtO1j0l3nU5LncgSJmxn4VJK~IWdT83G8clbvkX0OCHhXXWh9jT5igy7fuW79o9-t2kQIMkrEui0N21TDT~Ow5O61o6uK~woirXJsdtlxY88E7Ie77JI3L6Mave1j0TQRtLW0xpw~HOFKJaaRfEgciiRQ~wUp85GddG26wRxm2mquiyqTAid0Dj8ePHCIfF98GxSG7u8QLaAxGoVte~KF1TBX82qfm0cVyShTh1YFIdgJHHFBPhwT234Dv-jKckQNeBaJTtciVnzhdnA3OXs-BiABc53f3hNVwoT3YM3vJJvnt6YTcrJCHCx8Ujt7TmvCG-bWx-71JA0RTShAg__",
      rating: 4.9,
      price: 150
    },
    {
      id: 4,
      name: "Stratus Salads",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500",
      rating: 4.6,
      price: 200
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Cloud Kitchens</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover top-rated virtual restaurants with exclusive cloud-based menus
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCloudItems;
