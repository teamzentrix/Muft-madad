'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/languageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SpecialityPage({ params }) {
  const { id } = use(params);
  const { lang } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('treatments');
  const [speciality, setSpeciality] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchAll = async () => {
      try {
        setLoading(true);
        // 1. Fetch speciality details
        const specRes = await axios.get(
          `http://localhost:4000/api/specialities/${id}`,
          { withCredentials: true }
        );
        setSpeciality(specRes.data.data);

        // 2. Fetch treatments for this speciality
        const treatRes = await axios.get(
          `http://localhost:4000/api/admin/getBySpecialty/${id}`,
          { withCredentials: true }
        );
        const treatData = treatRes.data;
        setTreatments(Array.isArray(treatData) ? treatData : (treatData.data || []));

        // 3. Fetch hospitals for this speciality
        try {
          const hospRes = await axios.get(
            `http://localhost:4000/api/hospitals?specialty=${id}`,
            { withCredentials: true }
          );
          setHospitals(hospRes.data.data || []);
        } catch { setHospitals([]); }

        // 4. Fetch doctors for this speciality
        try {
          const docRes = await axios.get(
            `http://localhost:4000/api/doctors?specialty=${encodeURIComponent(
              // we'll send the english name after we have the speciality
              specRes.data.data?.name_en || ''
            )}`,
            { withCredentials: true }
          );
          setDoctors(docRes.data.data || []);
        } catch { setDoctors([]); }

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load speciality');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  const tabs = [
    { id: 'treatments', label: lang === 'en' ? 'Treatments' : 'उपचार', emoji: '💊' },
    { id: 'hospitals', label: lang === 'en' ? 'Hospitals' : 'अस्पताल', emoji: '🏥' },
    { id: 'doctors', label: lang === 'en' ? 'Doctors' : 'डॉक्टर', emoji: '👨‍⚕️' },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <p className="text-gray-600">{error}</p>
        <button onClick={() => router.back()} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
          Go Back
        </button>
      </div>
    </div>
  );

  const specialityName = speciality
    ? (lang === 'en' ? speciality.name_en : speciality.name_hi)
    : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white md:mt-22 mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-500/30 rounded-full text-sm backdrop-blur-sm">
                🏥 {lang === 'en' ? 'Medical Specialty' : 'चिकित्सा विशेषता'}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase leading-tight">
                {specialityName}
              </h1>
              <p className="text-lg text-blue-100">
                {speciality
                  ? (lang === 'en' ? speciality.description_en : speciality.description_hi)
                  : ''}
              </p>
              <div className="flex flex-wrap gap-6 pt-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✔</span>
                  <span>{treatments.length} {lang === 'en' ? 'Treatments' : 'उपचार'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✔</span>
                  <span>{hospitals.length} {lang === 'en' ? 'Hospitals' : 'अस्पताल'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✔</span>
                  <span>{doctors.length} {lang === 'en' ? 'Doctors' : 'डॉक्टर'}</span>
                </div>
              </div>
            </div>
            {speciality?.image && (
              <div className="hidden md:block">
                <img
                  src={speciality.image}
                  alt={specialityName}
                  className="rounded-2xl shadow-2xl w-full h-72 object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {tab.id === 'treatments' ? treatments.length
                    : tab.id === 'hospitals' ? hospitals.length
                    : doctors.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Treatments Tab */}
        {activeTab === 'treatments' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {lang === 'en' ? `Treatments for ${specialityName}` : `${specialityName} के उपचार`}
            </h2>
            {treatments.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow">
                <div className="text-5xl mb-4">💊</div>
                <p className="text-gray-500 text-lg">
                  {lang === 'en' ? 'No treatments found for this specialty yet.' : 'अभी कोई उपचार नहीं मिला।'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {treatments.map((treatment) => (
                  <div
                    key={treatment.id || treatment.slug}
                    onClick={() => router.push(`/treatment/${treatment.specialty_id}`)}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    {treatment.treatment_image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={treatment.treatment_image}
                          alt={treatment.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {treatment.comes_in && (
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                          {treatment.comes_in}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {treatment.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {treatment.overview_description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                        {treatment.surgery_duration && (
                          <div className="flex items-center gap-1">
                            <span>⏱</span> {treatment.surgery_duration}
                          </div>
                        )}
                        {treatment.success_rate && (
                          <div className="flex items-center gap-1">
                            <span>✅</span> {treatment.success_rate}
                          </div>
                        )}
                        {treatment.recovery_time && (
                          <div className="flex items-center gap-1">
                            <span>📅</span> {treatment.recovery_time}
                          </div>
                        )}
                        {treatment.ayushman_covered && (
                          <div className="flex items-center gap-1 text-green-600 font-semibold">
                            <span>🏛</span> Ayushman
                          </div>
                        )}
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                        {lang === 'en' ? 'View Details' : 'विवरण देखें'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hospitals Tab */}
        {activeTab === 'hospitals' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {lang === 'en' ? `Hospitals for ${specialityName}` : `${specialityName} के अस्पताल`}
            </h2>
            {hospitals.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow">
                <div className="text-5xl mb-4">🏥</div>
                <p className="text-gray-500 text-lg">
                  {lang === 'en' ? 'No hospitals found for this specialty yet.' : 'अभी कोई अस्पताल नहीं मिला।'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.id || hospital.uuid}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {hospital.image && (
                      <div className="h-40 overflow-hidden">
                        <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{hospital.name}</h3>
                      {hospital.city && (
                        <p className="text-sm text-gray-500 mb-2">📍 {hospital.city}, {hospital.state}</p>
                      )}
                      {hospital.average_rating > 0 && (
                        <p className="text-sm text-yellow-600 mb-3">⭐ {hospital.average_rating}/5</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {lang === 'en' ? `Doctors for ${specialityName}` : `${specialityName} के डॉक्टर`}
            </h2>
            {doctors.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow">
                <div className="text-5xl mb-4">👨‍⚕️</div>
                <p className="text-gray-500 text-lg">
                  {lang === 'en' ? 'No doctors found for this specialty yet.' : 'अभी कोई डॉक्टर नहीं मिला।'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.uuid || doctor.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="p-5 flex gap-4 items-start">
                      {doctor.photo ? (
                        <img
                          src={doctor.photo}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl shrink-0">
                          👨‍⚕️
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900">{doctor.name}</h3>
                        {doctor.degrees?.length > 0 && (
                          <p className="text-xs text-blue-600 mb-1">{doctor.degrees.join(', ')}</p>
                        )}
                        {doctor.experience_in_years && (
                          <p className="text-xs text-gray-500">🩺 {doctor.experience_in_years} yrs exp</p>
                        )}
                        {doctor.city && (
                          <p className="text-xs text-gray-500">📍 {doctor.city}</p>
                        )}
                        {doctor.consultation_fee && (
                          <p className="text-xs text-green-600 font-semibold mt-1">
                            ₹{doctor.consultation_fee} consultation
                          </p>
                        )}
                        {doctor.average_rating > 0 && (
                          <p className="text-xs text-yellow-600">⭐ {doctor.average_rating}/5</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}