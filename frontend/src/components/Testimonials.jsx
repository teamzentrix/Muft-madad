"use client";
import React from 'react';
import { Star, MapPin, Calendar, User } from 'lucide-react';
import { useLanguage } from '@/context/languageContext';

const TestimonialCard = ({ name, treatment, review, city, date, lang }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-5 lg:p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-yellow-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3 sm:mb-4 justify-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform" />
        ))}
      </div>

      {/* Review */}
      <blockquote className="text-gray-800 text-sm sm:text-base leading-relaxed italic mb-4 sm:mb-5 text-center relative z-10">
        &ldquo;{review}&rdquo;
      </blockquote>

      {/* Patient Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-100 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-base text-gray-900">{name}</h4>
            <p className="text-xs text-emerald-600 font-semibold">
              {lang === 'en' ? 'Treatment:' : 'उपचार:'} {treatment}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {city}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PatientTestimonials() {
  const { lang } = useLanguage();

  const testimonials = lang === 'en' ? [
    {
      name: "Yusuf",
      treatment: "Gallbladder Stone",
      review: "I had severe kidney stone pain. After treatment I'm completely healthy. No expenses at all - full free treatment. Thank you Muft Madad!",
      city: "Moradabad",
      date: "13/06/2024"
    },
    {
      name: "Arjun Sirswi",
      treatment: "Gallbladder Stone",
      review: "Muft Madad team did excellent work. Great humanitarian service. No expenses and successful surgery. Many thanks!",
      city: "Sambhal",
      date: "13/06/2024"
    },
    {
      name: "Chhoti Devi",
      treatment: "Cataract",
      review: "We're very happy. Muft Madad restored our eyesight. Telling everyone about them. Great work happening!",
      city: "Moradabad",
      date: "14/06/2024"
    },
    {
      name: "Mohammad Jishan",
      treatment: "Kidney Stone",
      review: "19mm kidney stone. Doctors quoted lakhs but I got free treatment through Muft Madad. Now completely fine!",
      city: "Amroha",
      date: "14/06/2024"
    },
    {
      name: "Khusnawaj",
      treatment: "Piles",
      review: "Suffered for long time. Tried everywhere but no relief. Friend told about Muft Madad - free surgery and now perfectly fine!",
      city: "Bareilly",
      date: "14/06/2024"
    }
  ] : [
    // Original Hindi testimonials (unchanged)
    {
      name: "युसुफ",
      treatment: "पित्त की पथरी",
      review: "मुझे बहुत दर्द रहता था गर्दे में पथरी के कारण, मैंने जबसे इलाज करवाया है तबसे मैं स्वस्थ हूँ। मेरा कोई भी पैसा नहीं लगा, पूरा इलाज मुफ्त में हुआ, धन्यवाद मेड्फा।",
      city: "मुरादाबाद",
      date: "13/06/2024"
    },
    {
      name: "अर्जुन सिरसवी",
      treatment: "पित्त की पथरी",
      review: "मेड्फा टीम ने बहुत बढ़िया काम किया, मानवता के लिए अच्छा संदेश देते रहो। कोई पैसा खर्च नहीं हुआ और यह एक सफल सर्जरी थी, बहुत-बहुत धन्यवाद।",
      city: "सम्भल",
      date: "13/06/2024"
    },
    {
      name: "छोटी देवी",
      treatment: "मोतियाबिंद",
      review: "हम बहुत खुश हैं, मेड्फा ने हमारी आंखों को रोशनी लौटा दी, हम बाकी सब को भी मेड्फा के बारे में बता रहे हैं। मेड्फा में बहुत अच्छा काम हो रहा है।",
      city: "मुरादाबाद",
      date: "14/06/2024"
    },
    {
      name: "मोहम्मद जिशान",
      treatment: "किडनी स्टोन",
      review: "मेरे किडनी में 19 mm की पथरी थी, डॉक्टर ने लाखों का खर्चा बताया था लेकिन मेरे पास पैसे कम थे, तो मैंने मेड्फा से ही मुफ्त इलाज करवाया, अब मैं बिल्कुल ठीक हूँ।",
      city: "अमरोहा",
      date: "14/06/2024"
    },
    {
      name: "खुसनवाज",
      treatment: "बवासीर",
      review: "मैं काफी समय से परेशान था, बहुत जगह इलाज कराया लेकिन फायदा नहीं हुआ। फिर मेरे एक दोस्त ने मेड्फा के बारे में बताया, जहाँ मेरा मुफ्त में ऑपरेशन हुआ और आज मैं बिल्कुल ठीक हूँ।",
      city: "बरेली",
      date: "14/06/2024"
    }
  ];

  const sectionTitle = lang === 'en' ? 'Our Patients Love Us' : 'हमारे मरीज हमें पसंद करते हैं';
  const ctaText = lang === 'en' ? 'See More' : 'और देखें';

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-yellow-50/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Title */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif uppercase font-medium bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'en' ? '500+ Happy Patients • 100% Success Rate' : '500+ खुश मरीज • 100% सफलता दर'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
