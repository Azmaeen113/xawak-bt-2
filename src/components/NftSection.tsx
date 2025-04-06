import React, { useState } from 'react';
import { Globe, Shield, Sparkles } from 'lucide-react';

interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Limited Edition';
  price: string;
  description: string;
}

const NftSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<string>('latest');

  const nfts: NFT[] = [
    {
      id: '1',
      name: 'Cosmic Explorer',
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rarity: 'Legendary',
      price: '5.0 ETH',
      description: 'A legendary spacecraft for cosmic exploration'
    },
    {
      id: '2',
      name: 'Star Guardian',
      image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rarity: 'Rare',
      price: '2.5 ETH',
      description: 'Protect the celestial realms'
    },
    {
      id: '3',
      name: 'Nebula Wanderer',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rarity: 'Limited Edition',
      price: '7.5 ETH',
      description: 'Journey through the cosmic mists'
    }
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Common', value: 'common' },
    { label: 'Rare', value: 'rare' },
    { label: 'Legendary', value: 'legendary' },
    { label: 'Limited Edition', value: 'limited' }
  ];

  const sorts = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Price: Low to High', value: 'price-asc' }
  ];

  return (
    <section id="nfts" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
            Cosmic Artifacts
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover unique digital artifacts from the XAWAK universe
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-space-blue/20 text-white hover:bg-space-blue/40'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-8">
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="bg-space-blue/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          >
            {sorts.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-space-blue/10 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative aspect-square">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 rounded-full text-[#FFD700] text-sm">
                  {nft.rarity}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                <p className="text-gray-400 mb-4">{nft.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#FFD700] font-semibold">{nft.price}</span>
                  <button className="px-4 py-2 bg-[#FFD700] text-black rounded hover:bg-[#FFE44D] transition-all duration-300">
                    Acquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NftSection;