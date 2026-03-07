'use client';
import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, CheckCircle, XCircle, Star, Stethoscope, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';

import axios from 'axios';

/* ─── Single Hospital Card ──────────────────────────────────────────────── */
const HospitalCard = ({ hospital }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">

      {/* Hospital img */}
      <div className="relative h-32 w-full overflow-hidden bg-gray-100 shrink-0">
        {hospital.photo && !imgError ? (
          <img
            src={hospital.photo}
            alt={hospital.name}
            className="object-cover hover:scale-105 transition-transform duration-300 h-full w-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-green-50">
            <Stethoscope className="w-10 h-10 text-blue-200" />
          </div>
        )}

        {/* Verified badge overlay */}
        {hospital.is_verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            <CheckCircle className="w-3 h-3" />
            Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight flex-1 line-clamp-2">
            {hospital.name}
          </h3>
          {/* Rating */}
          {hospital.rating > 0 && (
            <div className="flex items-center gap-0.5 shrink-0 bg-yellow-50 border border-yellow-100 rounded px-1.5 py-0.5">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[11px] font-semibold text-yellow-700">
                {parseFloat(hospital.rating).toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Certifications / partner badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {Array.isArray(hospital.certifications) && hospital.certifications.length > 0
            ? hospital.certifications.map((cert, i) => (
              <span key={i} className="text-[10px] font-medium px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full">
                {cert}
              </span>
            ))
            : (
              <span className="text-[10px] text-gray-400 italic">No certifications listed</span>
            )
          }
        </div>

        {/* Call Button */}
        {hospital.phone && (
          <a
            href={`tel:${hospital.phone}`}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-colors duration-200 mb-3"
          >
            <Phone className="w-3.5 h-3.5" />
            {hospital.phone}
          </a>
        )}

        {/* Address */}
        {hospital.address && (
          <div className="mb-2">
            <div className="flex items-start gap-1.5 text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-xs mb-0.5">Address</h4>
                <p className="text-xs text-gray-600 line-clamp-2 leading-tight">
                  {[hospital.address, hospital.city, hospital.state, hospital.pincode]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Timings */}
        {hospital.timing_display && (
          <div className="mb-2">
            <div className="flex items-start gap-1.5 text-gray-700">
              <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-xs mb-0.5">Timings</h4>
                <p className="text-xs text-gray-600">{hospital.timing_display}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats row */}
        {(hospital.total_doctors > 0 || hospital.total_specialities > 0) && (
          <div className="flex gap-3 mb-2">
            {hospital.total_doctors > 0 && (
              <div className="text-center bg-blue-50 rounded px-2 py-1 flex-1">
                <p className="text-xs font-bold text-blue-700">{hospital.total_doctors}</p>
                <p className="text-[10px] text-blue-500">Doctors</p>
              </div>
            )}
            {hospital.total_specialities > 0 && (
              <div className="text-center bg-purple-50 rounded px-2 py-1 flex-1">
                <p className="text-xs font-bold text-purple-700">{hospital.total_specialities}</p>
                <p className="text-[10px] text-purple-500">Specialities</p>
              </div>
            )}
            {hospital.total_reviews > 0 && (
              <div className="text-center bg-yellow-50 rounded px-2 py-1 flex-1">
                <p className="text-xs font-bold text-yellow-700">{hospital.total_reviews}</p>
                <p className="text-[10px] text-yellow-500">Reviews</p>
              </div>
            )}
          </div>
        )}

        {/* About */}
        {hospital.about && (
          <div className="relative border-t border-gray-200 pt-5 mt-auto">

            {/* Title */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
              <h4 className="font-semibold text-sm text-gray-900 tracking-wide">
                About
              </h4>
            </div>

            {/* Content */}
            <div className="relative">
              <p className="text-sm text-black leading-relaxed line-clamp-3 transition-all duration-300">
                {hospital.about}
              </p>

              {/* linear Fade Effect */}
              <div className="absolute bottom-0 left-0 w-full h-8 pointer-events-none"></div>
            </div>

            {/* Button */}

            <Link href={`/allHospitals/${hospital.id}`}>
              <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold 
                     text-blue-600 hover:text-white
                     border border-blue-600
                     px-4 py-1.5 rounded-full
                     hover:bg-blue-600
                     transition-all duration-300
                     shadow-sm hover:shadow-md active:scale-95">
                View More →
              </button>
            </Link>



          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Skeleton Card ─────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-lg border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-32 bg-gray-100" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-8 bg-gray-200 rounded" />
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-4/5" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
    </div>
  </div>
);

/* ─── Main Section ──────────────────────────────────────────────────────── */
export default function HospitalsSection() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHospitals = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:4000/api/auth/hospitals', {
        withCredentials: true,
      });

      // API returns { count, data } based on the controller
      const data = response.data?.data || response.data || [];
      setHospitals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch hospitals:', err);
      setError(err.response?.data?.message || 'Failed to load hospitals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // Derive city name for heading from first hospital
  const cityName = hospitals[0]?.city || 'Your Area';

  return (
    <section className="py-12 px-4 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {loading ? 'Hospitals Near You' : `Hospitals In ${cityName}`}
            </h2>
            <div className="h-1 w-20 bg-green-600 rounded-full" />
          </div>
          {!loading && hospitals.length > 0 && (
            <span className="text-sm text-gray-500 font-medium">
              {hospitals.length} hospital{hospitals.length !== 1 ? 's' : ''} found
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error State */}
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
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && hospitals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <Stethoscope className="w-12 h-12 text-gray-300" />
            <p className="text-gray-500 text-sm">No hospitals found at the moment.</p>
          </div>
        )}

        {/* Hospital Grid */}
        {!loading && !error && hospitals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital.id || hospital.uuid} hospital={hospital} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}