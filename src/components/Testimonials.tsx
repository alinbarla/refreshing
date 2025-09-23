import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Anna Lindberg',
      location: 'Södermalm, Stockholm',
      rating: 5,
      text: 'Fantastisk städservice! De kom i tid och gjorde ett perfekt jobb med vår lägenhetsstädning. Alla städmaterial var inkluderade och resultatet överträffade våra förväntningar. Rekommenderar verkligen denna professionella städning Stockholm!',
      image: 'https://images.pexels.com/photos/4239145/pexels-photo-4239145.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Erik Johansson',
      location: 'Östermalm, Stockholm',
      rating: 5,
      text: 'Vi bokade storstädning inför flytt och blev så nöjda! Grundlig städning av alla rum och badrummet blev skinande rent. Priserna var rimliga och servicen var professionell från start till slut.',
      image: 'https://images.pexels.com/photos/4239094/pexels-photo-4239094.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Maria Andersson',
      location: 'Vasastan, Stockholm',
      rating: 5,
      text: 'Regelbunden hemstädning varje vecka - så skönt att komma hem till en ren lägenhet! Refreshing är pålitlig och noggrann. Fönsterputsen var också utmärkt. Bästa städservice i Stockholm enligt mig!',
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'David Chen',
      location: 'Norrmalm, Stockholm',
      rating: 5,
      text: 'Snabb och effektiv bokning online. De kom samma dag och gjorde en grundlig grundstädning. Alla rengöringsmedel medtagna och inget extra att betala. Kommer definitivt att boka igen!',
      image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Lisa Persson',
      location: 'Kungsholmen, Stockholm',
      rating: 5,
      text: 'Professionell fönsterputs både in- och utanför. Resultatet blev kristallklart utan ränder. Använder bara professionella verktyg och tekniker. Mycket nöjd med kvaliteten!',
      image: 'https://images.pexels.com/photos/3616761/pexels-photo-3616761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Johan Nilsson',
      location: 'Gamla Stan, Stockholm',
      rating: 5,
      text: 'Exceptionell service och kundvård. De lyssnade på våra specifika behov och anpassade städningen därefter. Vår gamla lägenhet har aldrig sett bättre ut. Rekommenderar starkt!',
      image: 'https://images.pexels.com/photos/4239090/pexels-photo-4239090.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <section id="om-oss" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Vad våra <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              kunder säger
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Över 850 nöjda kunder i Stockholm litar på Refreshing professionella städservice. 
            Läs vad de säger om vår hemstädning, lägenhetsstädning och fönsterputs med alla 
            städmaterial, rengöringsmedel, mikrofiberdukar och startmop inkluderade.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full shadow-lg">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 text-center">
                "{testimonial.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - Nöjd kund Stockholm städservice`}
                  className="w-12 h-12 rounded-full object-cover shadow-lg"
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                850+
              </div>
              <div className="text-gray-700 font-medium">Nöjda kunder</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                17+
              </div>
              <div className="text-gray-700 font-medium">År i branschen</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bli nästa nöjda kund!
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Upplev samma professionella städservice Stockholm som våra 850+ nöjda kunder. 
            Boka din hemstädning eller lägenhetsstädning med Refreshing idag! Alla städmaterial, 
            rengöringsmedel, mikrofiberdukar och startmop ingår alltid.
          </p>
          <button
            onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-[#fff720] to-[#3cd500] text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Boka Din Städning Nu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;