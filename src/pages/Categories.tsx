import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import "@/styles/animations.css";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AuthModal from "@/components/AuthModal";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
}

const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Idly",
    price: 80,
    image: "https://media-hosting.imagekit.io/e117f879382442d6/Idly photo.jpg?Expires=1841026436&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=bOaj9Cv3CXd1q67BlMaLNVfP65ut-zuaB2oR2HlFH-usr5X19lvqilH3PSeOiWgvP9r4zqq~2QQNOezGPZFzYP7Arzv19YaXnum-TPcllusDkDMs0ogxva828Bp2l1WqDK-~0lmZZZbG~ZgsSVm0cV6o5xtiSyel0E9bF7n5J6t5jshTDGnIUgXzWsoAcHBjUxwJU6MK6Ihm7hgmiy2iGILbSFpTvtWquXIvwvBcZaMcIEvTvYRipaPyeDqRqVY~Irw0KVjzVS6Vb1c43QpTBiWOddALiH5q5ax454PlkWKXSrsnEWt3ZK0imQ7S5ErDlYci7JQeobwNpaSEYu7szw__",
    quantity: 0,
    description: "Soft steamed rice cakes, served with chutney and sambar."
  },
  {
    id: 2,
    name: "Dosa",
    price: 120,
    image: "https://media-hosting.imagekit.io/dc83017f12aa4b74/240_F_397466683_4U8hMaUgWdFPNc8KMKUQ4aH2qR1yG0sA.jpg?Expires=1841027589&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fpFkf0~vVdPgAdvNdP0p5jwzeO7Ib8x86k~LpL58wu7mEgLkxL-l5xf8XVli5XBYKQYcz4BaYtcW06AzdNy0BnpjEINWbber9zgvVFeEjOKC-4~peWezhIVYWODmpDqIy8-alKoOYqzxVAA2GDIrUodFoTf1ktbmpuXUjYpEK3AkGv-bn76vCyDbgbhKnay~p-UqspTQPRl1SbcwpVhJEb3Pf~GFMvybb1RiVbrGToAkuh-6b-hqsy4w6hNYY6M4cRxYw8pu81gU~3ZnFFRvv4QG0maCsjty~e3jdnar1ln00nvt34Ob9~Oib~LqqjtIva8wqTlRkpW~E05vQxioUQ__",
    quantity: 0,
    description: "Crispy rice & lentil crepe, golden and delicious."
  },
  {
    id: 3,
    name: "Milky Oats",
    price: 150,
    image: "https://media-hosting.imagekit.io/58f9bd55726a4b33/240_F_1237165622_Jygyt4E96ph6sOYEMEGdq8VAzVpcyDoc.jpg?Expires=1841027816&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Ss1RZtO1j0l3nU5LncgSJmxn4VJK~IWdT83G8clbvkX0OCHhXXWh9jT5igy7fuW79o9-t2kQIMkrEui0N21TDT~Ow5O61o6uK~woirXJsdtlxY88E7Ie77JI3L6Mave1j0TQRtLW0xpw~HOFKJaaRfEgciiRQ~wUp85GddG26wRxm2mquiyqTAid0Dj8ePHCIfF98GxSG7u8QLaAxGoVte~KF1TBX82qfm0cVyShTh1YFIdgJHHFBPhwT234Dv-jKckQNeBaJTtciVnzhdnA3OXs-BiABc53f3hNVwoT3YM3vJJvnt6YTcrJCHCx8Ujt7TmvCG-bWx-71JA0RTShAg__",
    quantity: 0,
    description: "Healthy oats cooked in milk, lightly sweetened."
  },
  {
    id: 4,
    name: "Stratus Salad",
    price: 200,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500",
    quantity: 0,
    description: "Fresh greens, veggies, and a light dressing."
  },
  {
    id: 5,
    name: "Coffee",
    price: 30,
    image: "https://media-hosting.imagekit.io/082741858ba24f4d/coffe%20pic.jpg?Expires=1841804570&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=0lX6fheaOx3~eBhWStbJQ2p5QTsMn~Z89Vfqad5EvDFw6~KFq2ia1U3Iz3NhwL-R-JhmsRhHzdBN880nR-Y7ywbnR4jGXRLi9VQkoZG2oLWaK5UnAaKYoYFyOJSR~ZcPUxN9jJnlL7e45EeF8mrY-DuGrg2OimqGcT1m76a576ChVr338BCeFvtnvnKYR8oy4nN4ONJbrFC1NCth1V0k4t48TI~C0vNvOonMLzATmfNTWDryr-di5fdz4nCbDDEzdcmFybTfCx7ZvFCUKS7SHX6ytj~8EJiROBz2l0QP0gNZgXgeoC0Jl92tIzTRiK3JY2z6qwAg5N8mw9Aswr~NGg__",
    quantity: 0,
    description: "Classic South Indian filter coffee, hot and aromatic."
  },
  {
    id: 6,
    name: "Masala Chai",
    price: 40,
    image: "https://media-hosting.imagekit.io/e08046782c024a2e/images.jpeg?Expires=1841557668&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=U5qxKczP9v-8cXNIZjbI9HQbTEUCKLtqeMjJH283NA2axJkzOU0uy2701M52qjISmG0OhnfwQDE8vkfcraJw1Wdg7pDwQmsKwmjzvNkV1PZwH1lOXBCYkWBNPelBRAVevTN-6qiXS1QgRmyZQV3GdSu6SP-B9WBPgSXeW8NoNV6x3lMgQGl96Y72YJal9UG-IQQ2VmcNB872Clj5lJ-91htP7IFsbo-SPkU-N0eMqQwTD33vcP5JwNXOvTyeN8~Zxj5AR~1XlzOC1DbXfFLTBOJgGfQRJraPjMEVyfUYjC-n0aIP5X98AkbVA2I9oOmfh132w2~cT0mRbKw81bl73A__",
    quantity: 0,
    description: "Traditional spiced tea with milk."
  }
];

const sections = [
  {
    title: "Tiffins",
    items: [1, 2, 3],
    bgColor: "bg-red-50"
  },
  {
    title: "Salads",
    items: [4],
    bgColor: "bg-emerald-50"
  },
  {
    title: "Coffee",
    items: [5],
    bgColor: "bg-amber-50"
  },
  {
    title: "Chai",
    items: [6],
    bgColor: "bg-blue-50"
  }
];

const sectionIds = ["tiffins", "salads", "coffee", "drinks"];

const CategoriesPage = () => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [showQtyChanger, setShowQtyChanger] = useState<{ [id: number]: boolean }>({});
  const navigate = useNavigate();
  const location = useLocation();
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to section if hash is present
  useEffect(() => {
    if (!isLoading && location.hash) {
      const hash = location.hash.replace('#', '');
      const el = sectionRefs.current[hash];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isLoading, location.hash]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    setShowQtyChanger((prev) => ({ ...prev, [item.id]: true }));
    toast.success(`${item.name} added to cart!`);
  };

  const handleUpdateQuantity = (item: MenuItem, change: number) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      if (cartItem.quantity + change === 0) {
        removeFromCart(item.id);
        setShowQtyChanger((prev) => ({ ...prev, [item.id]: false }));
        toast.info(`${item.name} removed from cart`);
      } else {
        updateQuantity(item.id, change);
      }
    }
  };

  // Calculate total items and price for the bottom popup
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-cloud-purple rounded-full animate-bounce"></div>
          <p className="text-gray-600">Loading delicious items...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
          {sections.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              id={section.title.toLowerCase()}
              ref={el => (sectionRefs.current[section.title.toLowerCase()] = el)}
              className={`mb-12 rounded-xl p-6 ${section.bgColor} transition-all duration-500 hover:shadow-lg scroll-mt-[120px] scroll-offset-nav`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">{section.title}</h2>
              <div className="space-y-6">
                {section.items.map((itemId, itemIdx) => {
                  const item = menuData.find(i => i.id === itemId)!;
                  const cartItem = cartItems.find(ci => ci.id === item.id);
                  const showQty = showQtyChanger[item.id] || !!cartItem;
                  return (
                    <motion.div
                      key={item.id}
                      className="flex flex-col md:flex-row items-center md:items-stretch justify-between bg-white rounded-lg shadow-md p-4 md:p-6 transition-all duration-300 hover:scale-[1.01]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (sectionIdx * 0.1) + (itemIdx * 0.05) }}
                    >
                      {/* Left: Name, desc, controls */}
                      <div className="flex-1 flex flex-col items-start justify-center md:pr-6 w-full md:w-auto">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-base font-bold text-cloud-purple">₹{item.price}</span>
                          <AnimatePresence mode="wait">
                            {showQty && cartItem ? (
                              <motion.div
                                key="quantity"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1 transition-all duration-300 hover:bg-gray-100"
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleUpdateQuantity(item, -1)}
                                  className="rounded-full hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleUpdateQuantity(item, 1)}
                                  className="rounded-full hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="add"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <Button
                                  variant="default"
                                  className="bg-cloud-purple hover:bg-cloud-purple/90 gap-2 mt-1"
                                  onClick={() => {
                                    setPendingCartItem(item);
                                    setIsAuthModalOpen(true);
                                  }}
                                >
                                  Add to Cart
                                  <ShoppingCart className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      {/* Right: Image */}
                      <motion.div
                        className="mt-4 md:mt-0 md:ml-6 flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-lg shadow-sm border border-gray-100"
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </main>
        {/* Bottom View Cart Popup */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed bottom-0 left-0 w-full z-50 flex justify-center"
            >
              <div className="max-w-md w-full mx-auto bg-cloud-purple text-white rounded-t-xl shadow-lg flex items-center justify-between px-4 py-3 mb-0 md:mb-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-base">{totalItems} item{totalItems > 1 ? 's' : ''} in cart</span>
                  <span className="text-sm">₹{totalPrice}</span>
                </div>
                <Button
                  className="ml-4 bg-white text-cloud-purple font-bold hover:bg-gray-100 px-6 py-2 rounded-full shadow"
                  onClick={() => navigate("/cart")}
                >
                  View Cart
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={() => {
            setIsAuthModalOpen(false);
            // Add the item to cart after successful authentication
            if (pendingCartItem) {
              addToCart(pendingCartItem);
              setPendingCartItem(null);
            }
          }}
        />
      </div>
    </PageTransition>
  );
};

export default CategoriesPage; 