'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { Phone, MapPin, Clock, Users, Award, Stethoscope, Star, AlertCircle, RefreshCw, ChevronRight, CheckCircle } from 'lucide-react';
import axios from 'axios';
import Navbar from '@/components/Navbar';

/* ─── Skeleton ──────────────────────────────────────────────────────────── */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const SkeletonPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8 md:p-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {[80, 110, 100].map((w, i) => (
              <div key={i} style={{ width: w }} className="h-7 rounded-full bg-white/20 animate-pulse" />
            ))}
          </div>
          <div className="h-9 bg-white/20 rounded-lg w-72 mb-4 animate-pulse" />
          <div className="h-5 bg-white/10 rounded w-96 animate-pulse" />
        </div>
        <div className="border-b border-gray-200 flex gap-1 p-2">
          {[80, 90, 85, 70, 80].map((w, i) => (
            <div key={i} style={{ width: w }} className="h-10 rounded bg-gray-100 animate-pulse" />
          ))}
        </div>
        <div className="p-8 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── No-ID State ───────────────────────────────────────────────────────── */
const NoIdState = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto">
        <Stethoscope className="w-8 h-8 text-indigo-400" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">No Hospital Selected</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          This page requires a hospital ID. Make sure you're navigating here from a hospital listing with a valid link.
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Expected URL formats</p>
        <code className="text-xs text-indigo-600 block mb-1">/hospital-info?id=42</code>
        <code className="text-xs text-indigo-600 block">/hospital/42</code>
      </div>
    </div>
  </div>
);

/* ─── Overview Tab ──────────────────────────────────────────────────────── */
const OverviewTab = ({ hospital }) => (
  <div className="space-y-6">
    {hospital.about && (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          About Hospital
        </h3>
        <p className="text-gray-700 leading-relaxed">{hospital.about}</p>
      </div>
    )}

    {(hospital.timing_display || (Array.isArray(hospital.opening_hours) && hospital.opening_hours.length > 0)) && (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          Timings
        </h3>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
          {hospital.timing_display && (
            <p className="text-lg font-medium text-gray-900">{hospital.timing_display}</p>
          )}
          {Array.isArray(hospital.opening_hours) && hospital.opening_hours.length > 0 && (
            <ul className="mt-3 space-y-1">
              {hospital.opening_hours.map((entry, i) => (
                <li key={i} className="text-sm text-gray-600 flex justify-between max-w-xs">
                  <span className="font-medium">{entry.day}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )}

    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-indigo-600" />
        Hospital in Numbers
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Doctors', value: hospital.total_doctors, color: 'indigo' },
          { label: 'Specialities', value: hospital.total_specialities, color: 'purple' },
          { label: 'Reviews', value: hospital.total_reviews, color: 'blue' },
          { label: 'Rating', value: hospital.rating > 0 ? `${parseFloat(hospital.rating).toFixed(1)}★` : null, color: 'yellow' },
        ].filter(s => s.value).map((stat, i) => (
          <div key={i} style={{
            background: `var(--tw-gradient-from, #fff)`,
          }} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 p-6 rounded-xl border border-${stat.color}-200 hover:shadow-lg transition-shadow text-center`}>
            <p className="text-sm text-gray-600 font-medium mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>

    {Array.isArray(hospital.certifications) && hospital.certifications.length > 0 && (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-indigo-600" />
          Certifications
        </h3>
        <div className="flex flex-wrap gap-2">
          {hospital.certifications.map((cert, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full text-sm font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

/* ─── List Tab ──────────────────────────────────────────────────────────── */
const ListTab = ({ title, icon: Icon, items, emptyMsg }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
      <Icon className="w-5 h-5 text-indigo-600" />
      {title}
    </h3>
    {items && items.length > 0 ? (
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors border border-gray-200 hover:border-indigo-300 cursor-default"
          >
            <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
            <span className="text-gray-800 font-medium">{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-center py-10">
        <Stethoscope className="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <p className="text-gray-400 text-sm italic">{emptyMsg}</p>
      </div>
    )}
  </div>
);

/* ─── Main Component ────────────────────────────────────────────────────── */
const HospitalInfoSection = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  // Support both ?id=123 query param AND /hospital/[id] dynamic route segment
  const id = searchParams.get('id') || params?.id || null;

  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specialities', label: 'Specialities' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'services', label: 'Services' },
    { id: 'certifications', label: 'Certifications' },
  ];

  const fetchHospital = async () => {
    // id is null — don't attempt a fetch, show the no-ID UI instead
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:4000/api/auth/hospitals/${id}`,
        { withCredentials: true }
      );
      // Controller returns { data: hospital }
      const data = response.data?.data || response.data;
      setHospital(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Hospital not found. The link may be invalid or the hospital has been removed.');
      } else {
        setError(err.response?.data?.message || 'Failed to load hospital. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospital();
  }, [id]);

  /* ── No ID provided ── */
  if (!loading && !id) return <NoIdState />;

  /* ── Loading ── */
  if (loading) return <SkeletonPage />;

  /* ── Error ── */
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-500 text-sm leading-relaxed">{error}</p>
        </div>
        <button
          onClick={fetchHospital}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    </div>
  );

  /* ── Tab content ── */
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab hospital={hospital} />;
      case 'specialities':
        return (
          <ListTab
            title="Our Specialities"
            icon={Stethoscope}
            items={hospital.available_specialities || []}
            emptyMsg="No specialities listed."
          />
        );
      case 'treatments':
        return (
          <ListTab
            title="Available Treatments"
            icon={Stethoscope}
            items={hospital.available_treatments || []}
            emptyMsg="No treatments listed."
          />
        );
      case 'services':
        return (
          <ListTab
            title="Our Services"
            icon={Stethoscope}
            items={hospital.available_services || []}
            emptyMsg="No services listed."
          />
        );
      case 'certifications':
        return (
          <ListTab
            title="Certifications & Accreditations"
            icon={Award}
            items={hospital.certifications || []}
            emptyMsg="No certifications listed."
          />
        );
      default:
        return null;
    }
  };

  const badges = [
    ...(hospital.is_verified ? ['Verified Hospital'] : []),
    ...(Array.isArray(hospital.certifications) ? hospital.certifications : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-8">

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">

          {/* ── Gradient Header ── */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {badges.map((badge, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
                        <span className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-[10px]">✓</span>
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{hospital.name}</h1>

                {hospital.address && (
                  <div className="flex items-start gap-2 text-white/90 mb-2">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base">
                      {[hospital.address, hospital.city, hospital.state, hospital.pincode, hospital.country]
                        .filter(Boolean).join(', ')}
                    </p>
                  </div>
                )}

                {hospital.rating > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                      <span className="text-white font-semibold text-sm">
                        {parseFloat(hospital.rating).toFixed(1)}
                      </span>
                      {hospital.total_reviews > 0 && (
                        <span className="text-white/75 text-xs ml-1">({hospital.total_reviews} reviews)</span>
                      )}
                    </div>
                  </div>
                )}

                <a href="#direction" className="text-white/80 hover:text-white text-sm underline inline-block mt-2">
                  Get Directions
                </a>
              </div>

              {hospital.phone && (
                <a
                  href={`tel:${hospital.phone}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 shrink-0"
                >
                  <Phone className="w-5 h-5" />
                  CALL NOW
                </a>
              )}
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="border-b border-gray-200 bg-white">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium text-sm md:text-base whitespace-nowrap transition-all duration-300 relative
                    ${activeTab === tab.id
                      ? 'text-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Tab Content ── */}
          <div className="p-8 md:p-10 bg-white">
            <div className="animate-fadeIn" key={activeTab}>
              {renderContent()}
            </div>
          </div>
        </div>

        {(hospital.meta_title || hospital.meta_description) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-sm text-gray-500 space-y-1">
            {hospital.meta_title && (
              <p><span className="font-semibold text-gray-700">Meta Title:</span> {hospital.meta_title}</p>
            )}
            {hospital.meta_description && (
              <p><span className="font-semibold text-gray-700">Meta Desc:</span> {hospital.meta_description}</p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.35s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HospitalInfoSection;