import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

// Animated Chef SVG Component
const AnimatedChef = () => {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-cloud-purple/5">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chef Hat */}
          <motion.path
            d="M150 50C100 50 80 80 80 100C80 120 100 150 150 150C200 150 220 120 220 100C220 80 200 50 150 50Z"
            fill="#FFD700"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          />
          {/* Face */}
          <motion.circle
            cx="150"
            cy="150"
            r="60"
            fill="#FFE4C4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          {/* Eyes */}
          <motion.circle
            cx="130"
            cy="140"
            r="8"
            fill="#000"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          />
          <motion.circle
            cx="170"
            cy="140"
            r="8"
            fill="#000"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          />
          {/* Smile */}
          <motion.path
            d="M130 170 Q150 190 170 170"
            stroke="#000"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          {/* Mustache */}
          <motion.path
            d="M130 160 Q150 170 170 160"
            stroke="#000"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
        </svg>
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-cloud-purple font-semibold">Welcome!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      setPhone("");
      setOtp("");
      setShowOtpInput(false);
      setLoading(false);
      setError(null);
    }
  }, [isOpen]);

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOtpInput(true);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userPhone', phone);
      onAuthSuccess();
      onClose();
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl mx-4 bg-[#f3e8ff] rounded-3xl shadow-2xl flex flex-col items-center justify-center py-16 px-8 overflow-hidden"
          >
            {/* Top Left Girl Image */}
            <img
              src="/onegirl.png"
              alt="One girl waving"
              className="absolute top-0 left-0 w-40 h-40 md:w-56 md:h-56 object-contain pointer-events-none select-none"
              style={{ transform: 'translate(-30%, -30%)' }}
            />
            {/* Bottom Right Boys Image */}
            <img
              src="/twoboys.png"
              alt="Two boys on couch"
              className="absolute bottom-0 right-0 w-52 h-52 md:w-64 md:h-64 object-contain pointer-events-none select-none"
              style={{ transform: 'translate(30%, 30%)' }}
            />
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <X size={28} />
            </button>
            <div className="w-full flex flex-col items-center justify-center z-10">
              <h2 className="text-3xl font-extrabold text-cloud-purple mb-2 text-center">Welcome!</h2>
              <p className="text-lg text-cloud-purple font-semibold mb-4 text-center italic">"Delicious breakfast is waiting for you!"</p>
              <p className="text-gray-600 mb-10 text-center">Sign in with your phone number to continue</p>
              {error && <div className="text-red-600 text-center mb-4">{error}</div>}
              <form onSubmit={showOtpInput ? verifyOtp : sendOtp} className="w-full max-w-sm space-y-7">
                <div>
                  <label className="block text-base font-medium text-cloud-purple mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    disabled={showOtpInput || loading}
                  />
                </div>
                {showOtpInput && (
                  <div>
                    <label className="block text-base font-medium text-cloud-purple mb-1">OTP</label>
                    <Input
                      type="text"
                      placeholder="Enter OTP sent to your phone"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-cloud-purple hover:bg-cloud-purple/90 text-white font-bold rounded-full py-3 mt-2 text-lg"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : showOtpInput ? "Verify OTP" : "Send OTP"}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal; 