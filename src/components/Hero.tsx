import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [availability, setAvailability] = useState('');
  const [isValidZip, setIsValidZip] = useState<boolean | null>(null);

  const checkAvailability = (zip: string) => {
    const numericZip = parseInt(zip.replace(/\s/g, ''));
    
    if (numericZip >= 10000 && numericZip <= 19199) {
      setIsValidZip(true);
      
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
      const currentHour = now.getHours();
      
      if (dayOfWeek >= 0 && dayOfWeek <= 4) { // Sunday to Thursday
        if (currentHour < 12) {
          setAvailability('Vi kan städa idag!');
        } else {
          setAvailability('Vi kan städa imorgon!');
        }
      } else { // Friday afternoon or Saturday
        setAvailability('Vi kan städa på måndag!');
      }
    } else {
      setIsValidZip(false);
      setAvailability('Vi är inte i ditt område ännu, men vi expanderar snart!');
    }
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 5) {
      const formatted = value.length > 3 ? `${value.slice(0, 3)} ${value.slice(3)}` : value;
      setZipCode(formatted);
      
      if (value.length === 5) {
        checkAvailability(value);
      } else {
        setIsValidZip(null);
        setAvailability('');
      }
    }
  };

  return (
    <section id="hem" className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Refreshing städservice
                </span>
                <br />
                <span className="text-gray-800">i Stockholm</span>
              </h1>
              <p className="text-xl text-gray-700 mt-6 leading-relaxed">
                Professionell hemstädning, lägenhetsstädning och storstädning av högsta kvalitet. 
                Vi erbjuder pålitlig städning Stockholm med alla städmaterial, rengöringsmedel, 
                mikrofiberdukar och startmop inkluderade - för en verkligt refreshing upplevelse.
              </p>
            </div>

            {/* Zip Code Checker */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-cyan-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Kontrollera om vi städar i ditt område
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-2">
                    Ange ditt postnummer
                  </label>
                  <input
                    type="text"
                    id="zipcode"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    placeholder="123 45"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                    maxLength={6}
                  />
                </div>

                {availability && (
                  <div className={`flex items-center space-x-2 p-4 rounded-lg ${
                    isValidZip 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    {isValidZip ? (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                    )}
                    <p className={`font-semibold ${
                      isValidZip ? 'text-green-800' : 'text-yellow-800'
                    }`}>
                      {availability}
                    </p>
                  </div>
                )}

                {isValidZip && (
                  <button
                    onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Boka Nu - Få Offert
                  </button>
                )}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  17+
                </div>
                <div className="text-sm text-gray-600">År i branschen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  850+
                </div>
                <div className="text-sm text-gray-600">Nöjda kunder</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  4.8★
                </div>
                <div className="text-sm text-gray-600">Genomsnittligt betyg</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-blue-200 to-cyan-200">
              <img
                src="https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professionell städning Stockholm - hemstädning och lägenhetsstädning"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-800">100% Garanterat</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-cyan-600" />
                <span className="text-sm font-semibold text-gray-800">Snabb bokning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;