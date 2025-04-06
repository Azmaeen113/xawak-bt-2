import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-4xl font-orbitron font-bold text-white">
              Stay Connected
            </h2>
            <p className="text-gray-300 text-lg">
              Join our newsletter to receive the latest updates about XAWAK's
              development, upcoming features, and community events.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-[#FFD700]" />
                <a
                  href="mailto:contact@xawak.io"
                  className="text-white hover:text-[#FFD700] transition-colors duration-300"
                >
                  contact@xawak.io
                </a>
              </div>
            </div>
          </div>

          <div className="bg-space-blue/10 rounded-lg p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-black/50 border border-space-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white placeholder-gray-500"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 border-2 border-space-blue rounded bg-black/50 focus:ring-[#FFD700]"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-gray-300"
                >
                  I agree to receive updates from XAWAK
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE44D] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Join the Mission</span>
                <Send className="w-5 h-5" />
              </button>

              {isSubscribed && (
                <div className="text-center text-[#FFD700]">
                  Thank you for subscribing!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;