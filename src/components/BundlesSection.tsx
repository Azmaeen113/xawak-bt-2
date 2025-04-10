import React from 'react';
import { Package, Check, Star, Zap } from 'lucide-react';

interface BundleProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
}

const BundleCard: React.FC<BundleProps> = ({
  title,
  price,
  description,
  features,
  icon,
  popular = false,
  color
}) => {
  return (
    <div className={`relative rounded-xl overflow-hidden transition-all duration-500 group ${popular ? 'transform hover:scale-105' : 'transform hover:scale-102'}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0a20] z-0"></div>

      {/* Border glow */}
      <div className={`absolute inset-0 border border-${color}/30 rounded-xl z-10 group-hover:border-${color}/60 transition-colors duration-300`}></div>

      {/* Popular badge */}
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold py-1 px-4 rounded-bl-lg z-20">
          Popular
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className={`text-2xl font-orbitron font-bold text-${color} mb-2`}>{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
          <div className={`p-3 rounded-full bg-${color}/10 text-${color}`}>
            {icon}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-white">{price}</span>
            <span className="text-gray-400 ml-2">USDT</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex-grow mb-6">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className={`w-5 h-5 text-${color} mr-2 flex-shrink-0 mt-0.5`} />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
            popular
              ? `bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:shadow-lg hover:shadow-[#FFD700]/20`
              : `bg-${color}/10 text-${color} border border-${color}/30 hover:bg-${color}/20`
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const BundlesSection: React.FC = () => {
  const bundles: BundleProps[] = [
    {
      title: "Starter Bundle",
      price: "100",
      description: "Perfect for beginners exploring the XAWAK ecosystem",
      features: [
        "1,000 XAWAK Tokens",
        "1 Basic NFT",
        "Community Access",
        "Basic Support"
      ],
      icon: <Package className="w-6 h-6" />,
      color: "[#87CEEB]"
    },
    {
      title: "Premium Bundle",
      price: "500",
      description: "Enhanced benefits for serious XAWAK enthusiasts",
      features: [
        "10,000 XAWAK Tokens",
        "3 Premium NFTs",
        "Priority Community Access",
        "Premium Support",
        "Early Feature Access"
      ],
      icon: <Star className="w-6 h-6" />,
      popular: true,
      color: "[#FFD700]"
    },
    {
      title: "Ultimate Bundle",
      price: "1000",
      description: "Maximum benefits for dedicated XAWAK supporters",
      features: [
        "25,000 XAWAK Tokens",
        "5 Exclusive NFTs",
        "VIP Community Access",
        "24/7 Dedicated Support",
        "Governance Voting Rights",
        "Exclusive Airdrops"
      ],
      icon: <Zap className="w-6 h-6" />,
      color: "[#6A0DAD]"
    }
  ];

  return (
    <section id="bundles" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-4 whitespace-nowrap">
            XAWAK Bundles
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto px-4">
            <span className="inline-block">Choose the perfect bundle to begin</span> <span className="inline-block">your journey in the XAWAK ecosystem</span>
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle, index) => (
            <BundleCard key={index} {...bundle} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto">
            All bundles include access to the XAWAK platform and future updates.
            Prices are subject to change based on market conditions.
          </p>
          <div className="mt-8">
            <button className="px-8 py-3 bg-transparent border border-[#FFD700] rounded-lg text-[#FFD700] font-bold transition-all duration-300 hover:bg-[#FFD700]/10">
              Custom Bundle Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundlesSection;
