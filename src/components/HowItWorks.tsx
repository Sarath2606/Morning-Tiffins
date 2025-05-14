import { Badge } from "@/components/ui/badge";
import { Search, Map, UtensilsCrossed, Clock3 } from "lucide-react";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Step = ({ number, title, description, icon, color }: StepProps) => (
  <div className="flex flex-col items-center text-center">
    <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <Badge className="bg-cloud-purple/20 text-cloud-purple hover:bg-cloud-purple/20 mb-2">Step {number}</Badge>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Browse Food",
      description: "Find your favorite Sunrise Feast or Rise & Dine",
      icon: <Search className="h-8 w-8 text-white" />,
      color: "bg-cloud-purple"
    },
    {
      number: 2,
      title: "Select the Time",
      description: "Choose Your Unpaid Therapy Time",
      icon: <UtensilsCrossed className="h-8 w-8 text-white" />,
      color: "bg-green-500"
    },
    {
      number: 3,
      title: "On time delivery",
      description: "Enjoy your meal delivered straight to your door",
      icon: <Clock3 className="h-8 w-8 text-white" />,
      color: "bg-blue-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-cloud-purple/5 to-cloud-peach/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="mb-4 bg-cloud-purple/20 text-cloud-purple hover:bg-cloud-purple/20">Simple Process</Badge>
          <h2 className="text-3xl font-bold mb-4">How Morning Tiffins Works</h2>
          <p className="text-gray-600">
            Get your favorite Breakfast delivered in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
