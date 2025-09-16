import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Home, Calendar, FileText, Mail } from 'lucide-react';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: 'grundstadning' | 'storstadning' | 'fonsterputs' | '';
  frequency: 'regular' | 'oneTime' | '';
  squareMeters: string;
  windows: string;
}

const BookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    frequency: '',
    squareMeters: '',
    windows: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Namn är obligatoriskt';
      if (!formData.phone.trim()) newErrors.phone = 'Telefon är obligatoriskt';
      if (!formData.email.trim()) newErrors.email = 'E-post är obligatoriskt';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Ogiltig e-postadress';
      if (!formData.address.trim()) newErrors.address = 'Adress är obligatorisk';
    }

    if (step === 2) {
      if (!formData.serviceType) newErrors.serviceType = 'Välj en tjänst';
    }

    if (step === 3) {
      if (formData.serviceType === 'fonsterputs') {
        if (!formData.windows.trim()) newErrors.windows = 'Antal fönster är obligatoriskt';
      } else {
        if (!formData.frequency) newErrors.frequency = 'Välj frekvens';
        if (!formData.squareMeters.trim()) newErrors.squareMeters = 'Kvadratmeter är obligatoriskt';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePrice = (): number => {
    if (formData.serviceType === 'fonsterputs') {
      const windows = parseInt(formData.windows) || 0;
      const hours = Math.ceil(windows / 3);
      return hours * 350; // Only one-time service for windows (+50kr)
    } else {
      const sqm = parseInt(formData.squareMeters) || 0;
      let hours = sqm / 40;
      hours = Math.ceil(hours * 2) / 2; // Round up to next 0.5 hour
      const rate = formData.frequency === 'regular' ? 300 : 350; // +50kr for both rates
      return hours * rate;
    }
  };

  const getServiceName = (type: string): string => {
    switch (type) {
      case 'grundstadning': return 'Grundstädning';
      case 'storstadning': return 'Storstädning';
      case 'fonsterputs': return 'Fönsterputs';
      default: return '';
    }
  };

  const getFrequencyText = (freq: string): string => {
    if (formData.serviceType === 'fonsterputs') return 'Endast engångsservice (350kr/tim)';
    return freq === 'regular' ? 'Regelbunden städning (300kr/tim)' : 'Engångsstädning (350kr/tim)';
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      // Initialize EmailJS (replace with your actual credentials)
      emailjs.init("YOUR_USER_ID");

      const emailData = {
        to_email: 'info@refreshing.se',
        customer_email: formData.email,
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        service_type: getServiceName(formData.serviceType),
        frequency: getFrequencyText(formData.frequency),
        square_meters: formData.squareMeters,
        windows: formData.windows,
        total_price: `${calculatePrice()} kr`,
        booking_details: `
Kund: ${formData.name}
Telefon: ${formData.phone}
E-post: ${formData.email}
Adress: ${formData.address}
Tjänst: ${getServiceName(formData.serviceType)}
Frekvens: ${getFrequencyText(formData.frequency)}
${formData.serviceType !== 'fonsterputs' ? `Kvadratmeter: ${formData.squareMeters}` : `Antal fönster: ${formData.windows}`}
Totalt pris: ${calculatePrice()} kr
        `
      };

      // Send to business
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        emailData,
        'YOUR_USER_ID'
      );

      // Send confirmation to customer
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_CUSTOMER_TEMPLATE_ID',
        {
          ...emailData,
          to_email: formData.email
        },
        'YOUR_USER_ID'
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Ett fel uppstod vid skickandet. Vänligen försök igen.');
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section id="booking-form" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tack för din bokning!
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vi har mottagit din bokning och skickat en bekräftelse till {formData.email}.
                Vi kommer att kontakta dig inom kort för att bekräfta tiden.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  address: '',
                  serviceType: '',
                  frequency: '',
                  squareMeters: '',
                  windows: ''
                });
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Gör en ny bokning
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-form" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Boka din <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              städservice
            </span>
          </h2>
          <p className="text-xl text-gray-700">
            Få en kostnadsfri offert på under 2 minuter
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg' 
                    : 'bg-white text-gray-400 border border-gray-300'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    step < currentStep ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-sm font-medium text-gray-600">
              Steg {currentStep}/4
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-cyan-600" />
                <h3 className="text-2xl font-bold text-gray-900">Personlig Information</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Namn *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="Ditt fullständiga namn"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="070-123 45 67"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-post *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="din@email.se"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adress *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="Gatuadress, Stockholm"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Service Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Home className="h-6 w-6 text-cyan-600" />
                <h3 className="text-2xl font-bold text-gray-900">Typ av Service</h3>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'grundstadning', title: 'Grundstädning', desc: 'Vanlig hemstädning och lägenhetsstädning' },
                  { id: 'storstadning', title: 'Storstädning', desc: 'Djuprengöring och omfattande städning' },
                  { id: 'fonsterputs', title: 'Fönsterputs', desc: 'Professionell fönsterputs in- och utanför' }
                ].map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.serviceType === service.id
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={service.id}
                      checked={formData.serviceType === service.id}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{service.title}</h4>
                      <p className="text-gray-600 text-sm">{service.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType}</p>}
            </div>
          )}

          {/* Step 3: Frequency & Size */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="h-6 w-6 text-cyan-600" />
                <h3 className="text-2xl font-bold text-gray-900">Frekvens & Storlek</h3>
              </div>

              {formData.serviceType === 'fonsterputs' ? (
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 font-medium">Endast engångsservice</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Antal fönster *
                    </label>
                    <input
                      type="number"
                      value={formData.windows}
                      onChange={(e) => handleInputChange('windows', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.windows ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="Antal fönster som ska putsas"
                      min="1"
                    />
                    {errors.windows && <p className="text-red-500 text-sm mt-1">{errors.windows}</p>}
                    <p className="text-sm text-gray-600 mt-2">
                      3 fönster = 1 timme (350kr/tim)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Välj frekvens *
                    </label>
                    <div className="space-y-3">
                      <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer ${
                        formData.frequency === 'oneTime'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}>
                        <input
                          type="radio"
                          name="frequency"
                          value="oneTime"
                          checked={formData.frequency === 'oneTime'}
                          onChange={(e) => handleInputChange('frequency', e.target.value)}
                        />
                        <span className="font-medium">Engångsstädning (350kr/tim)</span>
                      </label>
                      <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer ${
                        formData.frequency === 'regular'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}>
                        <input
                          type="radio"
                          name="frequency"
                          value="regular"
                          checked={formData.frequency === 'regular'}
                          onChange={(e) => handleInputChange('frequency', e.target.value)}
                        />
                        <span className="font-medium">Regelbunden städning (300kr/tim)</span>
                      </label>
                    </div>
                    {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kvadratmeter i ditt hem *
                    </label>
                    <input
                      type="number"
                      value={formData.squareMeters}
                      onChange={(e) => handleInputChange('squareMeters', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.squareMeters ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="Ange kvadratmeter"
                      min="1"
                    />
                    {errors.squareMeters && <p className="text-red-500 text-sm mt-1">{errors.squareMeters}</p>}
                    <p className="text-sm text-gray-600 mt-2">
                      40 kvm = 1 timme (avrundat uppåt till nästa 0,5 timme)
                    </p>
                    <p className="text-sm text-gray-600">
                      Regelbunden: 300kr/tim | Engångs: 350kr/tim
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Summary & Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-cyan-600" />
                <h3 className="text-2xl font-bold text-gray-900">Sammanfattning & Bekräftelse</h3>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Kontaktinformation</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Namn:</span> {formData.name}</p>
                      <p><span className="font-medium">Telefon:</span> {formData.phone}</p>
                      <p><span className="font-medium">E-post:</span> {formData.email}</p>
                      <p><span className="font-medium">Adress:</span> {formData.address}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Tjänstdetaljer</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Tjänst:</span> {getServiceName(formData.serviceType)}</p>
                      <p><span className="font-medium">Frekvens:</span> {getFrequencyText(formData.frequency)}</p>
                      {formData.serviceType !== 'fonsterputs' && (
                        <p><span className="font-medium">Kvadratmeter:</span> {formData.squareMeters} kvm</p>
                      )}
                      {formData.serviceType === 'fonsterputs' && (
                        <p><span className="font-medium">Antal fönster:</span> {formData.windows}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-blue-200 mt-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      Totalt pris: {calculatePrice()} kr
                    </div>
                    <p className="text-sm text-gray-600">
                      Alla städmaterial, rengöringsmedel, mikrofiberdukar och startmop ingår
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Redigera
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Skickar...' : 'Bekräfta Bokning'}
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Tillbaka</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <span>Nästa</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;