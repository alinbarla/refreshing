import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      image: 'https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Köksstädning',
      description: 'Djuprengöring av kök: bänkar, spis, ho och vitvaror'
    },
    {
      image: 'https://images.pexels.com/photos/4239145/pexels-photo-4239145.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Badrumsstädning',
      description: 'Avkalkning och rengöring av dusch, toalett, handfat och kakel'
    },
    {
      image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Vardagsrum städning',
      description: 'Dammsugning, dammtorkning och våttorkning av alla ytor'
    },
    {
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sovrumsstädning',
      description: 'Bäddning, dammtorkning och noggrann golvrengöring'
    },
    {
      image: 'https://images.pexels.com/photos/3616761/pexels-photo-3616761.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Fönsterputs',
      description: 'Kristallklar fönsterputs med professionella verktyg'
    },
    {
      image: 'https://images.pexels.com/photos/4107283/pexels-photo-4107283.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Komplett lägenhetsstädning',
      description: 'Helhetsstädning av hela hemmet – från golv till tak'
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Våra städtjänster
            </span> i bilder
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Se våra professionella städtjänster i Stockholm. Från hemstädning till 
            storstädning och fönsterputs - vi levererar alltid högsta kvalitet med alla städmaterial, 
            rengöringsmedel, mikrofiberdukar och startmop inkluderade.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              {/* Single Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.title} - Stockholm städservice`}
                  className="w-full h-64 object-cover"
                  width="800"
                  height="400"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <div className="text-sm font-semibold">Klicka för att förstora</div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Redo att se samma resultat hemma hos dig?
            </h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Låt Refreshing transformera ditt hem med vår professionella städservice. Vi garanterar 
              samma höga standard som du ser i våra bilder. Alla städmaterial, rengöringsmedel, 
              mikrofiberdukar och startmop ingår alltid.
            </p>
            <button
              onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-[#fff720] to-[#3cd500] text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Boka Din Transformation Nu
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ArrowLeft className="h-8 w-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ArrowRight className="h-8 w-8" />
            </button>

            {/* Image Content */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={galleryImages[selectedImage].image}
                  alt={`${galleryImages[selectedImage].title} - professionell städning Stockholm`}
                  className="w-full h-96 object-cover"
                  width="1200"
                  height="600"
                  loading="lazy"
                />
              </div>
              
              {/* Image Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-700">
                  {galleryImages[selectedImage].description}
                </p>
              </div>
            </div>

            {/* Image Counter */}
            <div className="text-center text-white mt-4">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;