import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import PageTransition from '@/components/PageTransition';
import "@/styles/animations.css";
import { motion } from "framer-motion";

const EmptyCartIllustration = () => (
  <div className="flex flex-col items-center justify-center mb-4">
    <svg width="96" height="96" fill="none" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r="48" fill="#F3F4F6" />
      <rect x="28" y="40" width="40" height="24" rx="4" fill="#E0E7FF" />
      <rect x="36" y="48" width="24" height="8" rx="2" fill="#A5B4FC" />
      <circle cx="36" cy="68" r="4" fill="#A5B4FC" />
      <circle cx="60" cy="68" r="4" fill="#A5B4FC" />
    </svg>
    <span className="text-gray-400 text-sm mt-2">Your cart is empty</span>
  </div>
);

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Filter out items with zero quantity
  const filteredCartItems = cartItems.filter(item => item.quantity > 0);

  const subtotal = filteredCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + tax;

  // Toast handlers
  const handleUpdateQuantity = (id, change, name, quantity) => {
    if (quantity + change <= 0) {
      removeFromCart(id);
      toast.error(`${name} removed from cart`);
    } else {
      updateQuantity(id, change);
      if (change > 0) toast.success(`Increased quantity of ${name}`);
      else toast.info(`Decreased quantity of ${name}`);
    }
  };
  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} removed from cart`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-cloud-purple rounded-full animate-bounce"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-8">
              {filteredCartItems.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <EmptyCartIllustration />
                  <p className="text-gray-500 mb-4">Add some delicious items to your cart</p>
                  <Link to="/">
                    <Button className="bg-cloud-purple hover:bg-cloud-purple/90">
                      Browse Menu
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
                      <div className="flex items-center space-x-6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-500 mt-1">₹{item.price}</p>
                          <div className="flex items-center space-x-4 mt-4">
                            <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-3 py-1">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, -1, item.name, item.quantity)}
                                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, 1, item.name, item.quantity)}
                                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemove(item.id, item.name)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">Subtotal</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Order Summary - Right Side */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-medium text-gray-900">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-cloud-purple hover:bg-cloud-purple/90 text-white py-3 px-4 rounded-full mt-6 transition-colors"
                    disabled={filteredCartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart; 