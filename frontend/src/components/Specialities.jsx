"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/languageContext';
import axios from 'axios';

export default function OurSpecialities() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/api/specialities', {
          withCredentials: true,
        });
        // res.data.data is the array from getAllSpecialitiesService
        setSpecialities(res.data.data || []);
      } catch (err) {
        setError('Failed to load specialities');
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialities();
  }, []);

  const handleSpecialityClick = (speciality) => {
    // Pass the DB id so the speciality page can fetch treatments/doctors/hospitals
    router.push(`/speciality/${speciality.id}?lang=${lang}`);
  };

  const pageTitle = lang === 'en' ? 'Our Medical Specialties' : 'हमारी चिकित्सा विशेषताएँ';

  if (loading) return (
    <div className="flex justify-center items-center py-32">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 text-red-500">{error}</div>
  );

  return (
    <div className="pb-14 pt-0 lg:pt-14 px-4 sm:px-6 lg:px-8">
      <div className="h-20 sm:h-24 md:h-28 lg:hidden"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-medium font-serif bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            {pageTitle}
          </h1>
          <p className="text-md md:text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Expert care in 10+ medical specialties with free consultations & up to 80% surgery discounts'
              : '10+ चिकित्सा विशेषताओं में विशेषज्ञ देखभाल, निःशुल्क परामर्श व 80% तक सर्जरी छूट'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {specialities.map((speciality) => (
            <div
              key={speciality.id}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="relative overflow-hidden h-32 sm:h-36 lg:h-40">
                <img
                  src={speciality.image}
                  alt={lang === 'en' ? speciality.name_en : speciality.name_hi}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                  {lang === 'en' ? speciality.name_en : speciality.name_hi}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                  {lang === 'en' ? speciality.description_en : speciality.description_hi}
                </p>
                <button
                  onClick={() => handleSpecialityClick(speciality)}
                  className="w-full group/btn flex items-center justify-center gap-1.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <span>{lang === 'en' ? 'Learn More' : 'विस्तार से जानें'}</span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}