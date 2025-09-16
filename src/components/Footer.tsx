import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="kontakt" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Refreshing</h3>
                  <p className="text-sm text-gray-400">Professionell hemstädning</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Din pålitliga partner för professionell städservice Stockholm. Refreshing erbjuder 
                hemstädning, lägenhetsstädning, storstädning och fönsterputs med högsta kvalitet. 
                Alla städmaterial, rengöringsmedel, mikrofiberdukar och startmop ingår alltid.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gradient bg-gradient-to-r from-blue-400 to-cyan-400">
                Kontakta oss
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">076-344 11 68</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">info@refreshing.se</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                  <div className="text-gray-300">
                    <div>Stockholm City</div>
                    <div className="text-sm text-gray-400">Hela Stockholm området</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-400 mt-1" />
                  <div className="text-gray-300">
                    <div>Måndag - Fredag: 07:00 - 20:00</div>
                    <div>Lördag - Söndag: 08:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gradient bg-gradient-to-r from-blue-400 to-cyan-400">
                Våra tjänster
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#tjanster" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Grundstädning
                  </a>
                </li>
                <li>
                  <a href="#tjanster" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Storstädning
                  </a>
                </li>
                <li>
                  <a href="#tjanster" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Fönsterputs
                  </a>
                </li>
                <li>
                  <a href="#tjanster" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Refreshing hemstädning
                  </a>
                </li>
                <li>
                  <a href="#tjanster" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Lägenhetsstädning
                  </a>
                </li>
                <li>
                  <a href="#tjanster" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Refreshing professionell städning
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gradient bg-gradient-to-r from-blue-400 to-cyan-400">
                Snabblänkar
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#hem" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Hem
                  </a>
                </li>
                <li>
                  <a href="#tjanster" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Tjänster
                  </a>
                </li>
                <li>
                  <a href="#om-oss" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Om oss
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                  >
                    Boka nu
                  </button>
                </li>
                <li>
                  <a href="/integritetspolicy" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Integritetspolicy
                  </a>
                </li>
                <li>
                  <a href="/anvandarvillkor" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Användarvillkor
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="border-t border-gray-800 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Få städtips och erbjudanden
              </h4>
              <p className="text-gray-400 mb-4">
                Prenumerera på vårt nyhetsbrev för städtips och exklusiva erbjudanden för våra kunder i Stockholm. 
                Få tips om våra professionella städmaterial och rengöringsmedel.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Din e-postadress"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  Prenumerera
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4">
                Följ oss på sociala medier
              </h4>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://facebook.com/refreshing.se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-600 transition-all duration-200 transform hover:scale-110"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com/refreshing.se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-600 transition-all duration-200 transform hover:scale-110"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="text-center text-sm text-gray-400 leading-relaxed">
            <p className="mb-4">
              <strong className="text-gray-300">Refreshing städservice Stockholm</strong> | 
              <strong className="text-gray-300"> Hemstädning</strong> | 
              <strong className="text-gray-300"> Lägenhetsstädning</strong> | 
              <strong className="text-gray-300"> Professionell städning</strong> | 
              <strong className="text-gray-300"> Storstädning</strong> | 
              <strong className="text-gray-300"> Fönsterputs</strong> | 
              <strong className="text-gray-300"> Städning Stockholm</strong> | 
              <strong className="text-gray-300"> Mikrofiberdukar & Startmop inkluderade</strong>
            </p>
            <p>
              Vi täcker hela Stockholm inklusive Södermalm, Östermalm, Vasastan, Norrmalm, 
              Kungsholmen, Gamla Stan och alla andra områden inom postnummer 100 00 - 191 99.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 Refreshing. Alla rättigheter förbehållna.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/integritetspolicy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Integritetspolicy
              </a>
              <a href="/anvandarvillkor" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Användarvillkor
              </a>
              <a href="/cookies" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;