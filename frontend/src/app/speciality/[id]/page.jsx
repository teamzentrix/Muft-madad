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

        // 1. Fetch speciality details first — we need name_en for filtering
        const specRes = await axios.get(
          `http://localhost:4000/api/specialities/${id}`,
          { withCredentials: true }
        );
        const spec = specRes.data.data;
        setSpeciality(spec);

        const specialityNameEn = spec?.name_en || '';

        // 2. Fetch all three in parallel now that we have the name
        const [treatRes, hospRes, docRes] = await Promise.allSettled([

          // Treatments — filtered by specialty_id (integer FK)
          axios.get(
            `http://localhost:4000/api/admin/getBySpecialty/${id}`,
            { withCredentials: true }
          ),

          // Hospitals — filtered by available_specialities text[] array
          axios.get(
            `http://localhost:4000/api/hospitals?specialty=${encodeURIComponent(specialityNameEn)}`,
            { withCredentials: true }
          ),

          // Doctors — filtered by specialities text[] array
          axios.get(
            `http://localhost:4000/api/doctors?specialty=${encodeURIComponent(specialityNameEn)}`,
            { withCredentials: true }
          ),
        ]);

        // Treatments
        if (treatRes.status === 'fulfilled') {
  const d = treatRes.value.data;
  setTreatments(Array.isArray(d) ? d : (d?.data || []));
  console.log('treatments response:', d); // ✅ temporary — remove after confirming
}

        // Hospitals
        if (hospRes.status === 'fulfilled') {
          const d = hospRes.value.data;
          setHospitals(Array.isArray(d) ? d : (d?.data || []));
        }

        // Doctors
        if (docRes.status === 'fulfilled') {
          const d = docRes.value.data;
          // doctors endpoint returns { data: [...], pagination: {} }
          setDoctors(Array.isArray(d) ? d : (d?.data || []));
        }

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load speciality');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  const tabs = [
    { id: 'treatments', label: lang === 'en' ? 'Treatments' : 'उपचार', count: treatments.length },
    { id: 'hospitals', label: lang === 'en' ? 'Hospitals' : 'अस्पताल', count: hospitals.length },
    { id: 'doctors', label: lang === 'en' ? 'Doctors' : 'डॉक्टर', count: doctors.length },
  ];

  if (loading) return (
    <>
      <style>{styles}</style>
      <div className="loader-screen">
        <div className="loader-dot" />
        <p className="loader-text">Loading</p>
      </div>
    </>
  );

  if (error) return (
    <>
      <style>{styles}</style>
      <div className="loader-screen">
        <p className="error-text">{error}</p>
        <button onClick={() => router.back()} className="back-btn">Go Back</button>
      </div>
    </>
  );

  const specialityName = speciality ? (lang === 'en' ? speciality.name_en : speciality.name_hi) : '';
  const specialityDesc = speciality ? (lang === 'en' ? speciality.description_en : speciality.description_hi) : '';

  return (
    <>
      <style>{styles}</style>
      <div className="page-root">
        <Navbar />

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-left">
              <span className="hero-badge">
                {lang === 'en' ? 'Medical Specialty' : 'चिकित्सा विशेषता'}
              </span>
              <h1 className="hero-title">{specialityName}</h1>
              <p className="hero-desc">{specialityDesc}</p>

              <div className="hero-stats">
                <div className="stat-pill">
                  <span className="stat-num">{treatments.length}</span>
                  <span className="stat-label">{lang === 'en' ? 'Treatments' : 'उपचार'}</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-pill">
                  <span className="stat-num">{hospitals.length}</span>
                  <span className="stat-label">{lang === 'en' ? 'Hospitals' : 'अस्पताल'}</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-pill">
                  <span className="stat-num">{doctors.length}</span>
                  <span className="stat-label">{lang === 'en' ? 'Doctors' : 'डॉक्टर'}</span>
                </div>
              </div>
            </div>
            {speciality.image && (
              <div className="hidden md:block">
                <img
                  src={speciality.image}
                  alt={specialityName}
                  className="rounded-2xl shadow-2xl w-full h-72 object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* ── Tabs ── */}
        <div className="tabs-bar">
          <div className="tabs-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn ${activeTab === tab.id ? 'tab-active' : ''}`}
              >
                {tab.label}
                <span className={`tab-count ${activeTab === tab.id ? 'tab-count-active' : ''}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <main className="content">

          {/* Treatments */}
          {activeTab === 'treatments' && (
            <section>
              <h2 className="section-title">
                {lang === 'en' ? `Treatments` : `उपचार`}
                <span className="section-count">{treatments.length}</span>
              </h2>
              {treatments.length === 0 ? (
                <EmptyState icon="💊" message={lang === 'en' ? 'No treatments found for this specialty yet.' : 'अभी कोई उपचार नहीं मिला।'} />
              ) : (
                <div className="grid-3">
                  {treatments.map((t) => (
                    <div
                      key={t.id || t.slug}
                      className="card"
                      onClick={() => router.push(`/treatment/${t.specialty_id}`)}
                    >
                      {t.treatment_image && (
                        <div className="card-img-wrap">
                          <img src={t.treatment_image} alt={t.name} className="card-img" />
                        </div>
                      )}
                      <div className="card-body">
                        {t.comes_in && <span className="tag">{t.comes_in}</span>}
                        <h3 className="card-title">{t.name}</h3>
                        <p className="card-desc">{t.overview_description}</p>
                        <div className="card-meta">
                          {t.surgery_duration && <span className="meta-item">⏱ {t.surgery_duration}</span>}
                          {t.success_rate && <span className="meta-item">✓ {t.success_rate}</span>}
                          {t.recovery_time && <span className="meta-item">📅 {t.recovery_time}</span>}
                          {t.ayushman_covered && <span className="meta-item meta-green">🏛 Ayushman</span>}
                        </div>
                        <button className="card-btn">
                          {lang === 'en' ? 'View Details' : 'विवरण देखें'} →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Hospitals */}
          {activeTab === 'hospitals' && (
            <section>
              <h2 className="section-title">
                {lang === 'en' ? 'Hospitals' : 'अस्पताल'}
                <span className="section-count">{hospitals.length}</span>
              </h2>
              {hospitals.length === 0 ? (
                <EmptyState icon="🏥" message={lang === 'en' ? 'No hospitals found for this specialty yet.' : 'अभी कोई अस्पताल नहीं मिला।'} />
              ) : (
                <div className="grid-3">
                  {hospitals.map((h) => (
                    <div key={h.id || h.uuid} className="card">
                      {h.image && (
                        <div className="card-img-wrap">
                          <img src={h.image} alt={h.name} className="card-img" />
                        </div>
                      )}
                      <div className="card-body">
                        <h3 className="card-title">{h.name}</h3>
                        {h.city && (
                          <p className="card-location">📍 {h.city}{h.state ? `, ${h.state}` : ''}</p>
                        )}
                        {h.average_rating > 0 && (
                          <div className="rating-row">
                            <span className="rating-stars">{'★'.repeat(Math.round(h.average_rating))}{'☆'.repeat(5 - Math.round(h.average_rating))}</span>
                            <span className="rating-val">{h.average_rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Doctors */}
          {activeTab === 'doctors' && (
            <section>
              <h2 className="section-title">
                {lang === 'en' ? 'Doctors' : 'डॉक्टर'}
                <span className="section-count">{doctors.length}</span>
              </h2>
              {doctors.length === 0 ? (
                <EmptyState icon="👨‍⚕️" message={lang === 'en' ? 'No doctors found for this specialty yet.' : 'अभी कोई डॉक्टर नहीं मिला।'} />
              ) : (
                <div className="grid-3">
                  {doctors.map((d) => (
                    <div key={d.uuid || d.id} className="card doctor-card">
                      <div className="doctor-inner">
                        {d.photo ? (
                          <img src={d.photo} alt={d.name} className="doctor-avatar" />
                        ) : (
                          <div className="doctor-avatar-placeholder">
                            <span>👨‍⚕️</span>
                          </div>
                        )}
                        <div className="doctor-info">
                          <h3 className="card-title">{d.name}</h3>
                          {d.degrees?.length > 0 && (
                            <p className="doctor-degrees">{d.degrees.join(', ')}</p>
                          )}
                          <div className="doctor-meta">
                            {d.experience_in_years && <span className="meta-item">🩺 {d.experience_in_years} yrs</span>}
                            {d.city && <span className="meta-item">📍 {d.city}</span>}
                          </div>
                          {d.consultation_fee && (
                            <p className="doctor-fee">₹{d.consultation_fee} <span>consultation</span></p>
                          )}
                          {d.average_rating > 0 && (
                            <div className="rating-row">
                              <span className="rating-stars small">{'★'.repeat(Math.round(d.average_rating))}</span>
                              <span className="rating-val">{d.average_rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}

function EmptyState({ icon, message }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <p className="empty-msg">{message}</p>
    </div>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f7f5;
    --white: #ffffff;
    --text: #111111;
    --text-secondary: #666666;
    --text-muted: #999999;
    --accent: #1a56db;
    --accent-light: #eff4ff;
    --border: #e8e8e5;
    --green: #15803d;
    --radius: 12px;
    --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    --shadow-hover: 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.08);
    font-family: 'DM Sans', sans-serif;
  }

  .page-root { background: var(--bg); min-height: 100vh; color: var(--text); }

  /* Loader */
  .loader-screen {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px; background: var(--bg);
  }
  .loader-dot {
    width: 10px; height: 10px; border-radius: 50%; background: var(--accent);
    animation: pulse 1.2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.4} }
  .loader-text { font-size: 14px; color: var(--text-muted); letter-spacing: 0.05em; }
  .error-text { color: #dc2626; font-size: 15px; }
  .back-btn {
    margin-top: 8px; padding: 10px 24px; background: var(--accent); color: #fff;
    border: none; border-radius: var(--radius); font-size: 14px; cursor: pointer;
    font-family: inherit;
  }

  /* Hero */
  .hero {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    padding-top: 80px;
  }
  .hero-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 56px 32px;
    display: grid; grid-template-columns: 1fr auto; gap: 64px; align-items: center;
  }
  .hero-left { display: flex; flex-direction: column; gap: 20px; }
  .hero-badge {
    display: inline-block;
    font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); background: var(--accent-light);
    padding: 5px 12px; border-radius: 99px; width: fit-content;
  }
  .hero-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 400; line-height: 1.1;
    letter-spacing: -0.02em; color: var(--text);
  }
  .hero-desc {
    font-size: 15px; line-height: 1.7; color: var(--text-secondary);
    max-width: 520px;
  }
  .hero-stats {
    display: flex; align-items: center; gap: 0;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--radius); overflow: hidden;
    width: fit-content; margin-top: 8px;
  }
  .stat-pill {
    display: flex; flex-direction: column; align-items: center;
    padding: 14px 28px; gap: 2px;
  }
  .stat-num { font-size: 22px; font-weight: 600; color: var(--text); line-height: 1; }
  .stat-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .stat-divider { width: 1px; height: 36px; background: var(--border); }

  .hero-img-wrap {
    width: 340px; height: 260px;
    border-radius: var(--radius); overflow: hidden;
    flex-shrink: 0;
    box-shadow: var(--shadow);
  }
  .hero-img { width: 100%; height: 100%; object-fit: cover; }

  /* Tabs */
  .tabs-bar {
    position: sticky; top: 0; z-index: 40;
    background: var(--white); border-bottom: 1px solid var(--border);
  }
  .tabs-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 32px;
    display: flex; gap: 0;
  }
  .tab-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 16px 24px;
    font-family: inherit; font-size: 14px; font-weight: 500;
    color: var(--text-secondary); background: none; border: none;
    border-bottom: 2px solid transparent; cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    white-space: nowrap;
  }
  .tab-btn:hover { color: var(--text); }
  .tab-active { color: var(--accent) !important; border-bottom-color: var(--accent) !important; }
  .tab-count {
    font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 99px;
    background: var(--bg); color: var(--text-muted);
    transition: background 0.15s, color 0.15s;
  }
  .tab-count-active { background: var(--accent-light); color: var(--accent); }

  /* Content */
  .content { max-width: 1200px; margin: 0 auto; padding: 48px 32px 80px; }

  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem; font-weight: 400;
    color: var(--text); margin-bottom: 28px;
    display: flex; align-items: center; gap: 12px;
  }
  .section-count {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    color: var(--text-muted); background: var(--border);
    padding: 2px 10px; border-radius: 99px;
  }

  /* Grid */
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 900px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .grid-3 { grid-template-columns: 1fr; } }

  /* Card */
  .card {
    background: var(--white); border-radius: var(--radius);
    border: 1px solid var(--border);
    overflow: hidden; cursor: pointer;
    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    box-shadow: var(--shadow);
  }
  .card:hover {
    box-shadow: var(--shadow-hover); transform: translateY(-2px);
    border-color: #d0d0cc;
  }
  .card-img-wrap { height: 180px; overflow: hidden; }
  .card-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.4s ease;
  }
  .card:hover .card-img { transform: scale(1.04); }
  .card-body { padding: 20px; display: flex; flex-direction: column; gap: 10px; }

  .tag {
    display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--accent); background: var(--accent-light);
    padding: 3px 10px; border-radius: 99px; width: fit-content;
  }
  .card-title {
    font-size: 15px; font-weight: 600; color: var(--text); line-height: 1.35;
  }
  .card-desc {
    font-size: 13px; color: var(--text-secondary); line-height: 1.6;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .card-location { font-size: 13px; color: var(--text-secondary); }
  .card-meta { display: flex; flex-wrap: wrap; gap: 8px; }
  .meta-item {
    font-size: 11px; color: var(--text-muted);
    background: var(--bg); border: 1px solid var(--border);
    padding: 3px 9px; border-radius: 99px;
  }
  .meta-green { color: var(--green); }
  .card-btn {
    margin-top: 4px; font-family: inherit; font-size: 13px; font-weight: 500;
    color: var(--accent); background: var(--accent-light);
    border: none; border-radius: 8px; padding: 9px 16px;
    cursor: pointer; text-align: center;
    transition: background 0.15s;
  }
  .card-btn:hover { background: #dbeafe; }

  /* Rating */
  .rating-row { display: flex; align-items: center; gap: 6px; }
  .rating-stars { font-size: 13px; color: #f59e0b; letter-spacing: -1px; }
  .rating-stars.small { font-size: 11px; }
  .rating-val { font-size: 12px; color: var(--text-muted); }

  /* Doctor */
  .doctor-card { cursor: default; }
  .doctor-inner { padding: 20px; display: flex; gap: 16px; align-items: flex-start; }
  .doctor-avatar {
    width: 56px; height: 56px; border-radius: 50%; object-fit: cover;
    border: 2px solid var(--border); flex-shrink: 0;
  }
  .doctor-avatar-placeholder {
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--accent-light); display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0; border: 2px solid var(--border);
  }
  .doctor-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
  .doctor-degrees { font-size: 12px; color: var(--accent); font-weight: 500; }
  .doctor-meta { display: flex; gap: 8px; flex-wrap: wrap; }
  .doctor-fee { font-size: 13px; font-weight: 600; color: var(--green); }
  .doctor-fee span { font-weight: 400; color: var(--text-muted); font-size: 11px; }

  /* Empty */
  .empty-state {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 64px 32px; text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .empty-icon { font-size: 36px; opacity: 0.4; }
  .empty-msg { font-size: 14px; color: var(--text-muted); }

  /* Responsive hero */
  @media (max-width: 768px) {
    .hero-inner { grid-template-columns: 1fr; padding: 40px 20px; gap: 32px; }
    .hero-img-wrap { display: none; }
    .hero-stats { width: 100%; }
    .stat-pill { flex: 1; }
    .tabs-inner { padding: 0 16px; }
    .content { padding: 32px 16px 60px; }
  }
`;