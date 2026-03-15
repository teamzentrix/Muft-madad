'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Phone, MapPin, Clock, Users, Award, Stethoscope, Star,
  AlertCircle, RefreshCw, ChevronLeft, ChevronRight,
  CheckCircle, ZoomIn, X, Images, Shield
} from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ══════════════════════════════════════════════════════
   GALLERY LIGHTBOX
══════════════════════════════════════════════════════ */
const GalleryTab = ({ images }) => {
  const [idx, setIdx] = useState(null);

  useEffect(() => {
    const fn = (e) => {
      if (idx === null) return;
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [idx, images.length]);

  if (!images?.length) return <EmptyState icon={<Images className="w-8 h-8" />} msg="No gallery images yet." />;

  return (
    <>
      <SectionHeading>Gallery <Pill>{images.length} photos</Pill></SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 focus:outline-none transition-all"
          >
            <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 flex items-center justify-center transition-all">
              <div className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-1.5 transition-opacity">
                <ZoomIn className="w-4 h-4 text-gray-700" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {idx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setIdx(null)}>
          <button onClick={() => setIdx(null)} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 z-10 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs px-3 py-1 rounded-full">
            {idx + 1} / {images.length}
          </div>
          {images.length > 1 && <>
            <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }} className="absolute left-3 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 z-10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }} className="absolute right-3 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 z-10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>}
          <img src={images[idx]} alt="" onClick={e => e.stopPropagation()} className="max-w-full max-h-[88vh] object-contain rounded-lg" />
        </div>
      )}
    </>
  );
};

/* ══════════════════════════════════════════════════════
   SMALL REUSABLE COMPONENTS
══════════════════════════════════════════════════════ */
const SectionHeading = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2 flex-wrap">{children}</h3>
);

const Pill = ({ children, color = 'gray' }) => {
  const cls = {
    gray: 'bg-gray-100 text-gray-500',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
  }[color];
  return <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${cls}`}>{children}</span>;
};

const EmptyState = ({ icon, msg }) => (
  <div className="py-16 flex flex-col items-center gap-3 text-gray-300">
    {icon}
    <p className="text-sm text-gray-400">{msg}</p>
  </div>
);

const InfoRow = ({ icon: Icon, label, children }) => (
  <div className="flex gap-3">
    <Icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
    <div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════
   TAB: OVERVIEW
══════════════════════════════════════════════════════ */
const OverviewTab = ({ h }) => (
  <div className="space-y-8">
    {h.about && (
      <div>
        <SectionHeading>About</SectionHeading>
        <p className="text-sm text-gray-600 leading-7">{h.about}</p>
      </div>
    )}

    {/* Stats */}
    {(h.total_doctors > 0 || h.total_specialities > 0 || h.total_reviews > 0) && (
      <div>
        <SectionHeading>At a glance</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Doctors', val: h.total_doctors, show: h.total_doctors > 0 },
            { label: 'Specialities', val: h.total_specialities, show: h.total_specialities > 0 },
            { label: 'Reviews', val: h.total_reviews, show: h.total_reviews > 0 },
            { label: 'Rating', val: h.rating > 0 ? `${parseFloat(h.rating).toFixed(1)} ★` : null, show: h.rating > 0 },
          ].filter(s => s.show).map((s, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold text-gray-900 mb-1">{s.val}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Contact & Timings */}
    <div>
      <SectionHeading>Contact & Timings</SectionHeading>
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-4">
        {h.address && (
          <InfoRow icon={MapPin} label="Address">
            {[h.address, h.city, h.state, h.pincode].filter(Boolean).join(', ')}
          </InfoRow>
        )}
        {h.timing_display && (
          <InfoRow icon={Clock} label="Timings">{h.timing_display}</InfoRow>
        )}
        {h.phone && (
          <InfoRow icon={Phone} label="Phone">
            <a href={`tel:${h.phone}`} className="text-blue-600 hover:underline">{h.phone}</a>
          </InfoRow>
        )}
      </div>
    </div>

    {/* Certifications inline */}
    {h.certifications?.length > 0 && (
      <div>
        <SectionHeading>Certifications</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {h.certifications.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
              <CheckCircle className="w-3 h-3" />{c}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

/* ══════════════════════════════════════════════════════
   TAB: GENERIC LIST
══════════════════════════════════════════════════════ */
const ListTab = ({ title, items, emptyMsg }) => (
  <div>
    <SectionHeading>{title} <Pill>{items?.length || 0}</Pill></SectionHeading>
    {items?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/40 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    ) : (
      <EmptyState icon={<Stethoscope className="w-8 h-8" />} msg={emptyMsg} />
    )}
  </div>
);

/* ══════════════════════════════════════════════════════
   TAB: DOCTORS
══════════════════════════════════════════════════════ */
const DoctorsTab = ({ doctors }) => (
  <div>
    <SectionHeading>Doctors <Pill>{doctors?.length || 0}</Pill></SectionHeading>
    {doctors?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {doctors.map((doc, i) => (
          <div key={i} className="flex gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-100 transition-colors">
            {doc.photo ? (
              <img src={doc.photo} alt={doc.name} className="w-12 h-12 rounded-full object-cover border border-gray-200 shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-lg">👨‍⚕️</div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{doc.name}</p>
              {doc.specialty && <p className="text-xs text-blue-600 mt-0.5">{doc.specialty}</p>}
              {doc.experience_in_years && <p className="text-xs text-gray-400 mt-0.5">🩺 {doc.experience_in_years} yrs experience</p>}
              {doc.degrees?.length > 0 && <p className="text-xs text-gray-400 mt-0.5">{doc.degrees.join(', ')}</p>}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <EmptyState icon={<Users className="w-8 h-8" />} msg="No doctors listed yet." />
    )}
  </div>
);

/* ══════════════════════════════════════════════════════
   SKELETON
══════════════════════════════════════════════════════ */
const SkeletonPage = () => (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6 animate-pulse">
      <div className="h-52 bg-gray-200 rounded-2xl" />
      <div className="flex gap-2">{[...Array(5)].map((_, i) => <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg" />)}</div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-gray-200 rounded" style={{ width: `${70 + i * 7}%` }} />)}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function HospitalDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const fetchData = async () => {
    if (!id) { setLoading(false); return; }
    setLoading(true);
    setError('');
    try {
      // Fetch hospital details
      const res = await axios.get(`http://localhost:4000/api/hospitals/${id}`, { withCredentials: true });
      const data = res.data?.data || res.data;
      setHospital(data);

      // Fetch doctors for this hospital (if endpoint exists)
      try {
        const docRes = await axios.get(`http://localhost:4000/api/doctors?hospital=${id}`, { withCredentials: true });
        setDoctors(docRes.data?.data || []);
      } catch { setDoctors([]); }

    } catch (err) {
      setError(err.response?.status === 404
        ? 'Hospital not found.'
        : err.response?.data?.message || 'Failed to load. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  // Merge doctors from API with hospital.doctors if any
  const allDoctors = doctors.length > 0 ? doctors : (hospital?.doctors || []);

  const TABS = [
    { id: 'overview',        label: 'Overview' },
    { id: 'doctors',         label: 'Doctors',         count: allDoctors.length },
    { id: 'specialities',    label: 'Specialities',    count: hospital?.available_specialities?.length },
    { id: 'treatments',      label: 'Treatments',      count: hospital?.available_treatments?.length },
    { id: 'services',        label: 'Services',        count: hospital?.available_services?.length },
    { id: 'gallery',         label: 'Gallery',         count: hospital?.gallery_images?.length },
  ].filter(t => t.id === 'overview' || (t.count ?? 0) > 0 || t.id === 'gallery');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':     return <OverviewTab h={hospital} />;
      case 'doctors':      return <DoctorsTab doctors={allDoctors} />;
      case 'specialities': return <ListTab title="Specialities" items={hospital?.available_specialities} emptyMsg="No specialities listed." />;
      case 'treatments':   return <ListTab title="Treatments" items={hospital?.available_treatments} emptyMsg="No treatments listed." />;
      case 'services':     return <ListTab title="Services" items={hospital?.available_services} emptyMsg="No services listed." />;
      case 'gallery':      return <GalleryTab images={hospital?.gallery_images || []} />;
      default:             return null;
    }
  };

  /* ── States ── */
  if (loading) return <><Navbar /><SkeletonPage /></>;

  if (!id || error) return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-sm w-full text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7 text-red-400" />
          </div>
          <p className="text-gray-600 text-sm">{error || 'No hospital ID provided.'}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={fetchData} className="inline-flex items-center gap-2 px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
            <Link href="/allHospitals" className="inline-flex items-center gap-2 px-5 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm rounded-lg transition-colors">
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const fullAddress = [hospital.address, hospital.city, hospital.state, hospital.pincode].filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-[#f8f8f6]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">

        {/* ── Back link ── */}
        <Link href="/allHospitals" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> All Hospitals
        </Link>

        {/* ── Hero Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">

          {/* Cover image */}
          {hospital.photo && (
            <div className="h-52 sm:h-64 overflow-hidden">
              <img src={hospital.photo} alt={hospital.name} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Header info */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {hospital.is_verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                  {hospital.certifications?.slice(0, 2).map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                      <Shield className="w-3 h-3" />{c}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h1 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-2xl sm:text-3xl text-gray-900 font-normal mb-2 leading-tight">
                  {hospital.name}
                </h1>

                {/* Address + Rating */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                  {fullAddress && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />{fullAddress}
                    </span>
                  )}
                  {hospital.rating > 0 && (
                    <span className="flex items-center gap-1 text-yellow-600 font-medium">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {parseFloat(hospital.rating).toFixed(1)}
                      {hospital.total_reviews > 0 && <span className="text-gray-400 font-normal">({hospital.total_reviews})</span>}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              {hospital.phone && (
                <a
                  href={`tel:${hospital.phone}`}
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm hover:shadow-md"
                >
                  <Phone className="w-4 h-4" /> {hospital.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="border-b border-gray-100 overflow-x-auto scrollbar-hide">
            <div className="flex min-w-max">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors
                    ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-gray-100 text-gray-600' : 'bg-gray-50 text-gray-400'}`}>
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6 sm:p-8">
            <div key={activeTab} style={{ animation: 'fadeUp 0.2s ease-out' }}>
              {renderTab()}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}