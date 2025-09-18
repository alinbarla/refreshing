import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="#hem" className="flex items-center space-x-3">
            <img src="/stadning-stockholm.png" alt="Refreshing Stockholm städning" className="h-10 w-auto object-contain" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Refreshing
              </h1>
              <p className="text-xs text-gray-600">Professionell hemstädning</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hem" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              Hem
            </a>
            <a href="#tjanster" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              Tjänster
            </a>
            <a href="#om-oss" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              Om oss
            </a>
            <a href="#kontakt" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              Kontakt
            </a>
            <button
              onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-[#fff720] to-[#3cd500] text-gray-900 px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Boka Nu
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#hem" className="text-gray-700 hover:text-cyan-600 font-medium">
                Hem
              </a>
              <a href="#tjanster" className="text-gray-700 hover:text-cyan-600 font-medium">
                Tjänster
              </a>
              <a href="#om-oss" className="text-gray-700 hover:text-cyan-600 font-medium">
                Om oss
              </a>
              <a href="#kontakt" className="text-gray-700 hover:text-cyan-600 font-medium">
                Kontakt
              </a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg w-full"
              >
                Boka Nu
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;