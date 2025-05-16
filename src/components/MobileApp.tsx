
import { Button } from "@/components/ui/button";

export const MobileApp = () => {
  return (
    <section className="py-16 bg-cloud-purple text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
            <p className="mb-6 text-white/80 max-w-md">
              Get a better experience and faster ordering with our mobile app.
              Track your orders in real-time and get exclusive mobile-only discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-cloud-purple hover:bg-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
                  <path d="M18 14.5V17a1 1 0 0 0 1 1h1.5"></path>
                  <path d="M12 19v-7"></path>
                  <path d="M7.5 15h2"></path>
                  <path d="M15.573 15.58c.170-.241.427-.401.712-.401.285 0 .542.16.712.401"></path>
                  <path d="M18 5l-6 6-6-6"></path>
                </svg>
                App Store
              </Button>
              <Button size="lg" variant="secondary" className="bg-white text-cloud-purple hover:bg-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="m3 9 9-6 9 6"></path>
                  <path d="m3 9 9 6 9-6"></path>
                  <path d="M3 9v6l9 6 9-6V9"></path>
                </svg>
                Google Play
              </Button>
            </div>
            <div className="flex items-center mt-6 space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-cloud-orange"></div>
                <div className="w-8 h-8 rounded-full bg-white"></div>
                <div className="w-8 h-8 rounded-full bg-cloud-peach"></div>
              </div>
              <p className="text-sm">
                <span className="font-bold">1,00+</span> Downloads
              </p>
            </div>
          </div>
          <div className="relative pl-6">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1605170439002-90845e8c0137?auto=format&fit=crop&q=80&w=500" 
                alt="Mobile App" 
                className="rounded-2xl shadow-2xl max-w-xs mx-auto"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cloud-orange/20 rounded-full"></div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
