import React from 'react';
import { Home, Sparkles, Eye } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Home,
      title: 'Grundstädning',
      description: 'Professionell hemstädning och lägenhetsstädning för ditt hem. Vi utför noggrann städning av alla rum, kök, badrum och vardagsrum med fokus på kvalitet och detaljer.',
      features: [
        'Dammsugning av alla ytor',
        'Våttorkning av golv',
        'Rengöring av kök och badrum',
        'Dammning av möbler',
        'Tömning av papperskorgar'
      ],
      pricing: {
        regular: '300kr/tim (regelbundet)',
        oneTime: '350kr/tim (engångsstädning)'
      },
      included: 'Alla städmaterial, rengöringsmedel, mikrofiberdukar och startmop ingår'
    },
    {
      icon: Sparkles,
      title: 'Storstädning',
      description: 'Omfattande storstädning för djuprengöring av ditt hem. Perfekt för flytt, säsonsrengöring eller när du vill ha en grundlig genomgång av hela bostaden.',
      features: [
        'Djuprengöring av alla rum',
        'Rengöring av apparater',
        'Fönsterputs innanför',
        'Skåp och lådor',
        'Grundlig badrumsstädning'
      ],
      pricing: {
        regular: '300kr/tim (regelbundet)',
        oneTime: '350kr/tim (engångsstädning)'
      },
      included: 'Alla städmaterial, rengöringsmedel, mikrofiberdukar och startmop ingår'
    },
    {
      icon: Eye,
      title: 'Fönsterputs',
      description: 'Professionell fönsterputs för kristallklara fönster. Vi använder professionella verktyg och tekniker för att ge dig perfekt resultat både innanför och utanför.',
      features: [
        'Fönsterputs både in- och utanför',
        'Rengöring av fönsterkarmar',
        'Professionella verktyg',
        'Inga ränder eller fläckar',
        'Säkert utförande'
      ],
      pricing: {
        service: 'Endast engångsservice (350kr/tim)',
        calculation: '3 fönster = 1 timme'
      },
      included: 'Alla städmaterial, rengöringsmedel, mikrofiberdukar och startmop ingår'
    }
  ];

  return (
    <section id="tjanster" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Våra <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              städtjänster
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Refreshing erbjuder professionell städservice Stockholm med fokus på kvalitet och kundnöjdhet. 
            Vi utför hemstädning, lägenhetsstädning och fönsterputs med alla material inkluderade.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group hover:scale-105"
              >
                {/* Card Header */}
                <div className="p-8 pb-6">
                  <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-lg mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="px-8 pb-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="px-8 pb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                    {service.pricing.regular && (
                      <>
                        <div className="text-sm font-semibold text-gray-800 mb-1">
                          {service.pricing.regular}
                        </div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">
                          {service.pricing.oneTime}
                        </div>
                      </>
                    )}
                    {service.pricing.service && (
                      <>
                        <div className="text-sm font-semibold text-gray-800 mb-1">
                          {service.pricing.service}
                        </div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">
                          {service.pricing.calculation}
                        </div>
                      </>
                    )}
                    <div className="text-xs text-gray-600 border-t border-blue-200 pt-2">
                      {service.included}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="px-8 pb-8">
                  <button
                    onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Boka {service.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* SEO Keywords Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
          <p className="text-gray-700 leading-relaxed">
            <strong>Refreshing städservice Stockholm</strong> - Vi erbjuder professionell <strong>hemstädning</strong> och{' '}
            <strong>lägenhetsstädning</strong> i hela Stockholm. Vår <strong>professionella städning</strong> inkluderar{' '}
            <strong>storstädning</strong> och <strong>fönsterputs</strong> med alla rengöringsmedel, mikrofiberdukar och startmop inkluderade.{' '}
            Kontakta Refreshing idag för pålitlig <strong>städning Stockholm</strong> med kvalitetsgaranti.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;