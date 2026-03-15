'use client';
import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, CheckCircle, Star, Stethoscope, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const PREVIEW_COUNT = 4; // Home page pe kitne hospitals dikhane hain

/* ─── Skeleton Card ─────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-36 bg-gray-100" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-9 bg-gray-200 rounded-lg" />
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-4/5" />
    </div>
  </div>
);

/* ─── Hospital Card ─────────────────────────────────────────────────────── */
const HospitalCard = ({ hospital }) => {
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col h-full hover:-translate-y-0.5 cursor-pointer"
      onClick={() => router.push(`/allHospitals/${hospital.id}`)}
    >
      {/* Image */}
      <div className="relative h-36 w-full overflow-hidden bg-gray-100 shrink-0">
        {hospital.photo && !imgError ? (
          <img
            src={hospital.photo}
            alt={hospital.name}
            className="object-cover group-hover:scale-105 transition-transform duration-500 h-full w-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
            <Stethoscope className="w-10 h-10 text-blue-200" />
          </div>
        )}
        {hospital.is_verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            <CheckCircle className="w-3 h-3" /> Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        {/* Name + Rating */}
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight flex-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
            {hospital.name}
          </h3>
          {hospital.rating > 0 && (
            <div className="flex items-center gap-0.5 shrink-0 bg-yellow-50 border border-yellow-100 rounded px-1.5 py-0.5">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[11px] font-semibold text-yellow-700">
                {parseFloat(hospital.rating).toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-1.5 mb-3 min-h-[22px]">
          {Array.isArray(hospital.certifications) && hospital.certifications.length > 0
            ? hospital.certifications.slice(0, 3).map((cert, i) => (
              <span key={i} className="text-[10px] font-medium px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full">
                {cert}
              </span>
            ))
            : null
          }
        </div>

        {/* Call Button */}
        {hospital.phone && (
          <button
            onClick={e => { e.stopPropagation(); window.location.href = `tel:${hospital.phone}`; }}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors mb-3"
          >
            <Phone className="w-3.5 h-3.5" />
            {hospital.phone}
          </button>
        )}

        {/* Address */}
        {hospital.address && (
          <div className="flex items-start gap-1.5 text-gray-600 mb-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-600 line-clamp-2 leading-tight">
              {[hospital.address, hospital.city, hospital.state, hospital.pincode].filter(Boolean).join(', ')}
            </p>
          </div>
        )}

        {/* Timings */}
        {hospital.timing_display && (
          <div className="flex items-center gap-1.5 text-gray-600 mb-3">
            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <p className="text-xs">{hospital.timing_display}</p>
          </div>
        )}

        {/* Stats */}
        {(hospital.total_doctors > 0 || hospital.total_specialities > 0) && (
          <div className="flex gap-2 mb-3 mt-auto">
            {hospital.total_doctors > 0 && (
              <div className="text-center bg-blue-50 rounded-lg px-2 py-1.5 flex-1">
                <p className="text-xs font-bold text-blue-700">{hospital.total_doctors}</p>
                <p className="text-[10px] text-blue-400">Doctors</p>
              </div>
            )}
            {hospital.total_specialities > 0 && (
              <div className="text-center bg-purple-50 rounded-lg px-2 py-1.5 flex-1">
                <p className="text-xs font-bold text-purple-700">{hospital.total_specialities}</p>
                <p className="text-[10px] text-purple-400">Specialities</p>
              </div>
            )}
            {hospital.total_reviews > 0 && (
              <div className="text-center bg-yellow-50 rounded-lg px-2 py-1.5 flex-1">
                <p className="text-xs font-bold text-yellow-700">{hospital.total_reviews}</p>
                <p className="text-[10px] text-yellow-400">Reviews</p>
              </div>
            )}
          </div>
        )}

        {/* About */}
        {hospital.about && (
          <div className="border-t border-gray-100 pt-3 mt-auto">
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{hospital.about}</p>
          </div>
        )}

        <div className="mt-3 text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition-colors flex items-center gap-1">
          View Details →
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ──────────────────────────────────────────────────────── */
export default function HospitalsSection() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchHospitals = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:4000/api/hospitals', { withCredentials: true });
      const data = res.data?.data || res.data || [];
      setHospitals(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load hospitals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHospitals(); }, []);

  // Sirf pehle PREVIEW_COUNT hospitals dikhao home page pe
  const visibleHospitals = hospitals.slice(0, PREVIEW_COUNT);
  const hasMore = hospitals.length > PREVIEW_COUNT;
  const cityName = hospitals[0]?.city || 'Your Area';

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {loading ? 'Hospitals Near You' : `Hospitals In ${cityName}`}
            </h2>
            <div className="h-1 w-20 bg-green-600 rounded-full" />
          </div>
          {!loading && hospitals.length > 0 && (
            <span className="text-sm text-gray-500 font-medium">
              Showing {visibleHospitals.length} of {hospitals.length} hospitals
            </span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(PREVIEW_COUNT)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-red-400" />
            </div>
            <p className="text-gray-600 text-sm max-w-sm">{error}</p>
            <button
              onClick={fetchHospitals}
              className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && hospitals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <Stethoscope className="w-12 h-12 text-gray-300" />
            <p className="text-gray-500 text-sm">No hospitals found at the moment.</p>
          </div>
        )}

        {/* Hospital Grid - sirf PREVIEW_COUNT dikhao */}
        {!loading && !error && visibleHospitals.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {visibleHospitals.map(h => (
                <HospitalCard key={h.id || h.uuid} hospital={h} />
              ))}
            </div>

            {/* View All Button - tabhi show ho jab aur hospitals hon */}
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => router.push('/allHospitals')}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white border-2 border-green-600 text-green-700 font-semibold text-sm rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  View All {hospitals.length} Hospitals
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}