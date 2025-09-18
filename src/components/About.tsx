import React from 'react';
import { Shield, Award, Building2, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="om-oss" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Om <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Refreshing</span>
          </h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            Städfirma i Stockholm med fokus på kvalitet, trygghet och nöjda kunder. Vi erbjuder
            hemstädning, lägenhetsstädning, storstädning och fönsterputs med alla städmaterial inkluderade.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-cyan-600" />
              <h3 className="font-semibold text-gray-900">Försäkring & trygghet</h3>
            </div>
            <p className="text-gray-700 mt-3">
              Fullt försäkrade uppdrag, bakgrundskontrollerad personal och nöjd-kund-garanti.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <Award className="h-6 w-6 text-cyan-600" />
              <h3 className="font-semibold text-gray-900">17+ år i branschen</h3>
            </div>
            <p className="text-gray-700 mt-3">
              Dokumenterad erfarenhet av professionell städning i hela Stockholm.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-cyan-600" />
              <h3 className="font-semibold text-gray-900">Org.nr & kontakt</h3>
            </div>
            <p className="text-gray-700 mt-3">
              Org.nr: 559999-9999 · info@refreshing.se · 076-344 11 68
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-6 w-6 text-cyan-600" />
              <h3 className="font-semibold text-gray-900">Kvalitetssäkrat</h3>
            </div>
            <p className="text-gray-700 mt-3">
              Checklista per uppdrag, miljövänliga rengöringsmedel och utbildad personal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


