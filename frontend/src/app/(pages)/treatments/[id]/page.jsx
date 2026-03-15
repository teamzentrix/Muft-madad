'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from 'react';
import {
    FileText, Users, Beaker, Stethoscope, Pill, Coins,
    Building2, HelpCircle, Radiation, Shield, Phone,
    MapPin, Star, Clock, CheckCircle, XCircle, ChevronDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const API = 'http://localhost:4000/api';

export default function TreatmentPage({ params }) {
    const { id } = use(params);
    const specialty_id = id;

    const [activeTab, setActiveTab] = useState('overview');
    const [showContactForm, setShowContactForm] = useState(false);
    const [treatmentData, setTreatmentData] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!specialty_id) return;
        const fetchAll = async () => {
            try {
                setLoading(true);

                // 1. Fetch treatments for this specialty
                const treatRes = await axios.get(`${API}/admin/getBySpecialty/${specialty_id}`, {
                    withCredentials: true,
                });

                // Controller returns plain array
                const arr = Array.isArray(treatRes.data) ? treatRes.data : (treatRes.data?.data || []);
                const data = arr[0] || null;

                if (!data) { setError('Treatment not found.'); return; }
                setTreatmentData(data);

                // 2. Use treatment name to filter hospitals & doctors
                const treatmentName = data.name || '';
                let specialityName = '';
try {
    const specRes = await axios.get(
        `${API}/specialities/${data.specialty_id}`,
        { withCredentials: true }
    );
    specialityName = specRes.data?.data?.name_en || '';
} catch { /* silent — doctors tab will show empty */ }

                // Fetch hospitals filtered by available_treatments (treatment name)
                // and doctors filtered by specialities (specialty name)
                const [hospRes, docRes] = await Promise.allSettled([
                    axios.get(`${API}/hospitals?treatment=${encodeURIComponent(treatmentName)}`, {
                        withCredentials: true,
                    }),
                    axios.get(`${API}/doctors?specialty=${encodeURIComponent(specialityName)}`, {
                        withCredentials: true,
                    }),
                ]);

                if (hospRes.status === 'fulfilled') {
                    const d = hospRes.value.data;
                    setHospitals(Array.isArray(d) ? d : (d?.data || []));
                }
                if (docRes.status === 'fulfilled') {
                    const d = docRes.value.data;
                    setDoctors(Array.isArray(d) ? d : (d?.data || []));
                }

            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load treatment data.');
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [specialty_id]);

    const tabs = [
        { id: 'overview',   label: 'Overview',   icon: <FileText className="w-4 h-4" /> },
        { id: 'whoGets',    label: 'Who Gets',   icon: <Users className="w-4 h-4" /> },
        { id: 'causes',     label: 'Causes',     icon: <Beaker className="w-4 h-4" /> },
        { id: 'symptoms',   label: 'Symptoms',   icon: <Stethoscope className="w-4 h-4" /> },
        { id: 'diagnosis',  label: 'Diagnosis',  icon: <Radiation className="w-4 h-4" /> },
        { id: 'treatment',  label: 'Treatment',  icon: <Pill className="w-4 h-4" /> },
        { id: 'cost',       label: 'Cost',       icon: <Coins className="w-4 h-4" /> },
        { id: 'ayushman',   label: 'Ayushman',   icon: <Shield className="w-4 h-4" /> },
        { id: 'hospitals',  label: `Hospitals${hospitals.length ? ` (${hospitals.length})` : ''}`,  icon: <Building2 className="w-4 h-4" /> },
        { id: 'doctors',    label: `Doctors${doctors.length ? ` (${doctors.length})` : ''}`,        icon: <Users className="w-4 h-4" /> },
        { id: 'faqs',       label: 'FAQs',       icon: <HelpCircle className="w-4 h-4" /> },
    ];

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center space-y-3">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-500 font-medium">Loading treatment details...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
                <div className="text-4xl mb-3">⚠️</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <button onClick={() => window.location.reload()}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Try Again
                </button>
            </div>
        </div>
    );

    if (!treatmentData) return null;

    const {
        name, treatment_image, overview_description, key_benefits,
        who_gets_description, ideal_candidates, not_suitable_for,
        causes_description, causes_list, symptoms_description, symptoms_list,
        diagnosis_description, diagnosis_steps, treatment_procedure_description,
        pre_operative_steps, surgical_procedure_steps, post_operative_steps,
        cost_description, cost_ranges, cost_factors,
        ayushman_covered, ayushman_description, ayushman_benefits,
        ayushman_eligibility, ayushman_claim_steps,
        surgery_duration, hospital_stay, recovery_time, success_rate,
        faqs, comes_in,
    } = treatmentData;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* ── Hero ── */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white md:mt-22 mt-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            {comes_in && (
                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                                    🏥 {comes_in}
                                </span>
                            )}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase leading-tight">
                                {name}
                            </h1>
                            <p className="text-blue-100 text-base md:text-lg">
                                Get Yourself Treated For {name} With Medpho
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2 text-sm">
                                {ayushman_covered && (
                                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                        <CheckCircle className="w-4 h-4 text-green-300" />
                                        <span>Ayushman Covered</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                    <CheckCircle className="w-4 h-4 text-green-300" />
                                    <span>Expert Surgeons</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                    <CheckCircle className="w-4 h-4 text-green-300" />
                                    <span>Advanced Technology</span>
                                </div>
                            </div>
                        </div>
                        {treatment_image && (
                            <div className="hidden md:block">
                                <img src={treatment_image} alt={name}
                                    className="rounded-2xl shadow-2xl w-full h-64 object-cover" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}>
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Content */}
                    <div className="lg:col-span-2 space-y-0">

                        {/* Overview */}
                        {activeTab === 'overview' && (
                            <Section title={`About ${name}`} emoji="📝">
                                <p className="text-gray-700 leading-relaxed mb-4">{overview_description}</p>
                                {key_benefits?.length > 0 && (
                                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                                        <h3 className="font-semibold text-gray-900 mb-3">Key Benefits</h3>
                                        <ul className="space-y-2">
                                            {key_benefits.map((b, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Section>
                        )}

                        {/* Who Gets */}
                        {activeTab === 'whoGets' && (
                            <Section title={`Who Gets ${name}`} emoji="👥">
                                <p className="text-gray-700 leading-relaxed mb-4">{who_gets_description}</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                                        <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2 text-sm">
                                            <CheckCircle className="w-4 h-4" /> Ideal Candidates
                                        </h3>
                                        <ul className="space-y-2">
                                            {ideal_candidates?.map((c, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className="text-green-500 mt-0.5">•</span>{c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                                        <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2 text-sm">
                                            <XCircle className="w-4 h-4" /> Not Suitable For
                                        </h3>
                                        <ul className="space-y-2">
                                            {not_suitable_for?.map((c, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className="text-red-500 mt-0.5">•</span>{c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Section>
                        )}

                        {/* Causes */}
                        {activeTab === 'causes' && (
                            <Section title={`Causes of ${name}`} emoji="🔬">
                                <p className="text-gray-700 leading-relaxed mb-4">{causes_description}</p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {causes_list?.map((cause, i) => (
                                        <div key={i} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{cause.title}</h3>
                                            <p className="text-gray-600 text-xs leading-relaxed">{cause.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* Symptoms */}
                        {activeTab === 'symptoms' && (
                            <Section title={`Symptoms of ${name}`} emoji="⚕️">
                                <p className="text-gray-700 leading-relaxed mb-4">{symptoms_description}</p>
                                <div className="space-y-3">
                                    {symptoms_list?.map((item, i) => (
                                        <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-start gap-3">
                                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-sm">{item.symptom}</h3>
                                                <p className="text-gray-600 text-xs mt-0.5">{item.details}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* Diagnosis */}
                        {activeTab === 'diagnosis' && (
                            <Section title={`Diagnosis of ${name}`} emoji="🩺">
                                <p className="text-gray-700 leading-relaxed mb-4">{diagnosis_description}</p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {diagnosis_steps?.map((step, i) => (
                                        <div key={i} className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                            <div className="text-3xl mb-2">{step.icon}</div>
                                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                                            <p className="text-gray-600 text-xs">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* Treatment */}
                        {activeTab === 'treatment' && (
                            <Section title={`Treatment for ${name}`} emoji="💊">
                                <p className="text-gray-700 leading-relaxed mb-4">{treatment_procedure_description}</p>
                                <div className="space-y-4">
                                    {pre_operative_steps?.length > 0 && (
                                        <StepBlock title="Pre-Operative Care" emoji="📋" color="blue" items={pre_operative_steps} numbered={false} />
                                    )}
                                    {surgical_procedure_steps?.length > 0 && (
                                        <StepBlock title="Surgical Procedure" emoji="🔧" color="green" items={surgical_procedure_steps} numbered={true} />
                                    )}
                                    {post_operative_steps?.length > 0 && (
                                        <StepBlock title="Post-Operative Care" emoji="🏥" color="purple" items={post_operative_steps} numbered={false} />
                                    )}
                                </div>
                            </Section>
                        )}

                        {/* Cost */}
                        {activeTab === 'cost' && (
                            <Section title="Average Treatment Cost" emoji="💰">
                                <p className="text-gray-700 leading-relaxed mb-4">{cost_description}</p>
                                <div className="space-y-3 mb-4">
                                    {cost_ranges?.map((range, i) => (
                                        <div key={i} className="bg-green-50 rounded-xl p-4 border border-green-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-sm uppercase">{range.hospital_type}</h3>
                                                <p className="text-gray-500 text-xs mt-0.5">{range.includes}</p>
                                            </div>
                                            <div className="text-lg font-bold text-green-600 whitespace-nowrap">
                                                ₹{Number(range.min_cost).toLocaleString()} – ₹{Number(range.max_cost).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {cost_factors?.length > 0 && (
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                        <h3 className="font-semibold text-blue-900 mb-2 text-sm">Cost Factors</h3>
                                        <ul className="grid sm:grid-cols-2 gap-2">
                                            {cost_factors.map((f, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                                                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />{f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Section>
                        )}

                        {/* Ayushman */}
                        {activeTab === 'ayushman' && (
                            <Section title="Ayushman Bharat Coverage" emoji="🏛️">
                                <div className={`${ayushman_covered ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'} text-white rounded-xl p-5 mb-4 flex items-center gap-4`}>
                                    <CheckCircle className="w-10 h-10 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-lg">{ayushman_covered ? 'Yes, Fully Covered!' : 'Not Covered'}</h3>
                                        <p className="text-sm opacity-90 mt-0.5">{ayushman_description}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {ayushman_benefits?.length > 0 && (
                                        <AyushmanBlock title="Coverage Benefits" color="blue" items={ayushman_benefits} />
                                    )}
                                    {ayushman_eligibility?.length > 0 && (
                                        <AyushmanBlock title="Eligibility Criteria" color="purple" items={ayushman_eligibility} />
                                    )}
                                    {ayushman_claim_steps?.length > 0 && (
                                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                            <h3 className="font-semibold text-green-900 mb-3 text-sm">How to Claim</h3>
                                            <div className="space-y-2">
                                                {ayushman_claim_steps.map((step, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                                        <span className="text-gray-700 text-sm">{step}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Section>
                        )}

                        {/* Hospitals */}
                        {activeTab === 'hospitals' && (
                            <Section title={`Hospitals for ${name}`} emoji="🏥">
                                {hospitals.length === 0 ? (
                                    <EmptyState emoji="🏥" message="No hospitals found for this treatment yet." />
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {hospitals.map((h) => (
                                            <div key={h.id || h.uuid} className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all overflow-hidden">
                                                {h.photo && (
                                                    <img src={h.photo} alt={h.name} className="w-full h-32 object-cover" />
                                                )}
                                                <div className="p-4">
                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                        <h3 className="font-semibold text-gray-900 text-sm">{h.name}</h3>
                                                        {h.is_verified && (
                                                            <span className="shrink-0 px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">✓</span>
                                                        )}
                                                    </div>
                                                    {h.city && <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{h.city}{h.state ? `, ${h.state}` : ''}</p>}
                                                    {h.phone && <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" />{h.phone}</p>}
                                                    {h.rating > 0 && <p className="text-xs text-yellow-500 flex items-center gap-1 mt-0.5"><Star className="w-3 h-3 fill-yellow-400" />{h.rating}/5 {h.total_reviews > 0 && <span className="text-gray-400">({h.total_reviews})</span>}</p>}
                                                    {h.timing_display && <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{h.timing_display}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Section>
                        )}

                        {/* Doctors */}
                        {activeTab === 'doctors' && (
                            <Section title={`Doctors for ${name}`} emoji="👨‍⚕️">
                                {doctors.length === 0 ? (
                                    <EmptyState emoji="👨‍⚕️" message="No doctors found for this treatment yet." />
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {doctors.map((doc) => (
                                            <div key={doc.uuid || doc.id} className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-4 flex gap-3">
                                                {doc.photo ? (
                                                    <img src={doc.photo} alt={doc.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shrink-0" />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl shrink-0">👨‍⚕️</div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5 mb-0.5">
                                                        <h3 className="font-semibold text-gray-900 text-sm truncate">{doc.name}</h3>
                                                        {doc.is_verified && <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />}
                                                    </div>
                                                    {doc.degrees?.length > 0 && <p className="text-xs text-blue-600">{doc.degrees.join(', ')}</p>}
                                                    {doc.specialities?.length > 0 && <p className="text-xs text-purple-600">{doc.specialities.join(', ')}</p>}
                                                    {doc.experience_in_years && <p className="text-xs text-gray-500 mt-0.5">🩺 {doc.experience_in_years} yrs exp</p>}
                                                    {doc.currently_serving && <p className="text-xs text-gray-500 truncate">🏥 {doc.currently_serving}</p>}
                                                    {doc.city && <p className="text-xs text-gray-500"><MapPin className="w-3 h-3 inline" /> {doc.city}</p>}
                                                    {doc.consultation_fee && <p className="text-xs text-green-600 font-semibold mt-0.5">₹{doc.consultation_fee} consultation</p>}
                                                    {doc.average_rating > 0 && <p className="text-xs text-yellow-500"><Star className="w-3 h-3 inline fill-yellow-400" /> {doc.average_rating}/5</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Section>
                        )}

                        {/* FAQs */}
                        {activeTab === 'faqs' && (
                            <Section title="Frequently Asked Questions" emoji="❓">
                                <div className="space-y-2">
                                    {faqs?.map((faq, i) => (
                                        <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors">
                                            <summary className="cursor-pointer p-4 font-medium text-gray-900 text-sm flex items-center justify-between">
                                                <span className="pr-4">{faq.question}</span>
                                                <ChevronDown className="w-4 h-4 text-blue-600 shrink-0 group-open:rotate-180 transition-transform" />
                                            </summary>
                                            <div className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</div>
                                        </details>
                                    ))}
                                </div>
                            </Section>
                        )}
                    </div>

                    {/* ── Sidebar ── */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-4">

                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg">
                                <h3 className="font-bold text-lg mb-1">Need Assistance?</h3>
                                <p className="text-blue-100 text-sm mb-4">Our experts are available 24/7</p>
                                <button onClick={() => setShowContactForm(true)}
                                    className="w-full bg-white text-blue-600 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-all text-sm mb-2">
                                    Book Free Consultation
                                </button>
                                <a href="tel:+911234567890"
                                    className="w-full flex items-center justify-center gap-2 bg-white/20 border border-white/30 text-white py-2.5 rounded-lg font-medium hover:bg-white/30 transition-all text-sm">
                                    <Phone className="w-4 h-4" /> +91 123 456 7890
                                </a>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-white rounded-2xl p-5 shadow border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Quick Info</h3>
                                <div className="space-y-3">
                                    {surgery_duration && <QuickInfoRow icon={<Clock className="w-4 h-4 text-blue-600" />} label="Duration" value={surgery_duration} />}
                                    {hospital_stay    && <QuickInfoRow icon={<Building2 className="w-4 h-4 text-blue-600" />} label="Hospital Stay" value={hospital_stay} />}
                                    {recovery_time    && <QuickInfoRow icon={<CheckCircle className="w-4 h-4 text-blue-600" />} label="Recovery" value={recovery_time} />}
                                    {success_rate     && <QuickInfoRow icon={<Star className="w-4 h-4 text-blue-600" />} label="Success Rate" value={success_rate} />}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-white rounded-2xl p-5 shadow border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">At a Glance</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <StatBox value={hospitals.length} label="Hospitals" color="blue" />
                                    <StatBox value={doctors.length} label="Doctors" color="green" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Contact Modal ── */}
            {showContactForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xl font-bold text-gray-900">Book Appointment</h3>
                            <button onClick={() => setShowContactForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            {[
                                { label: 'Full Name', type: 'text', placeholder: 'Enter your name' },
                                { label: 'Phone Number', type: 'tel', placeholder: '+91 1234567890' },
                                { label: 'Email', type: 'email', placeholder: 'your@email.com' },
                                { label: 'Preferred Date', type: 'date', placeholder: '' },
                            ].map(({ label, type, placeholder }) => (
                                <div key={label}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input type={type} placeholder={placeholder}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                                </div>
                            ))}
                            <button type="submit"
                                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm mt-1">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

// ── Reusable sub-components ───────────────────────────────────────────────────

function Section({ title, emoji, children }) {
    return (
        <div className="bg-white rounded-2xl shadow p-5 md:p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2 uppercase">
                <span>{emoji}</span>{title}
            </h2>
            {children}
        </div>
    );
}

function StepBlock({ title, emoji, color, items, numbered }) {
    const colors = {
        blue:   'bg-blue-50 border-blue-200 text-blue-900',
        green:  'bg-green-50 border-green-200 text-green-900',
        purple: 'bg-purple-50 border-purple-200 text-purple-900',
    };
    const dotColors = { blue: 'bg-blue-600', green: 'bg-green-600', purple: 'bg-purple-600' };
    return (
        <div className={`rounded-xl p-4 border ${colors[color]}`}>
            <h3 className="font-semibold mb-3 text-sm flex items-center gap-2"><span>{emoji}</span>{title}</h3>
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        {numbered
                            ? <div className={`w-5 h-5 ${dotColors[color]} text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0`}>{i + 1}</div>
                            : <CheckCircle className={`w-4 h-4 text-${color}-600 shrink-0 mt-0.5`} />
                        }
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function AyushmanBlock({ title, color, items }) {
    const colors = { blue: 'bg-blue-50 border-blue-200 text-blue-900', purple: 'bg-purple-50 border-purple-200 text-purple-900' };
    const iconColors = { blue: 'text-blue-600', purple: 'text-purple-600' };
    return (
        <div className={`rounded-xl p-4 border ${colors[color]}`}>
            <h3 className={`font-semibold mb-2 text-sm ${iconColors[color]}`}>{title}</h3>
            <ul className="space-y-1.5">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className={`w-3.5 h-3.5 ${iconColors[color]} shrink-0 mt-0.5`} />{item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function QuickInfoRow({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">{icon}</div>
            <div>
                <div className="text-xs text-gray-500">{label}</div>
                <div className="text-sm font-semibold text-gray-900">{value}</div>
            </div>
        </div>
    );
}

function StatBox({ value, label, color }) {
    const colors = { blue: 'bg-blue-50 text-blue-700', green: 'bg-green-50 text-green-700' };
    return (
        <div className={`${colors[color]} rounded-xl p-3 text-center`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs font-medium mt-0.5">{label}</div>
        </div>
    );
}

function EmptyState({ emoji, message }) {
    return (
        <div className="text-center py-12">
            <div className="text-4xl mb-3">{emoji}</div>
            <p className="text-gray-500 text-sm">{message}</p>
        </div>
    );
}