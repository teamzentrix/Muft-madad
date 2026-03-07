'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from 'react';
import { FileText, Users, Beaker, Stethoscope, XRay, Pill, Coins, Building2, HelpCircle, Radiation, Shield, Hospital, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TreatmentPage({ params }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [showContactForm, setShowContactForm] = useState(false);
    const [treatmentData, setTreatmentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = use(params);  // ✅ unwrap the Promise
    const specialty_id = id;


    useEffect(() => {
        const fetchTreatment = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/admin/getBySpecialty/${specialty_id}`, {
                    withCredentials: true,
                });
                console.log('API Response:', response.data); // ← add this
                const data = Array.isArray(response.data) ? response.data[0] : response.data;

                if (!data) {
                    setError('Treatment not found.');
                    return;
                }
                setTreatmentData(data); // ✅ use `data`, not `response.data`
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load treatment data.');
            } finally {
                setLoading(false);
            }
        };

        if (specialty_id) fetchTreatment();
    }, [specialty_id]);

    const TabButton = ({ id, label, icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer font-medium transition-all whitespace-nowrap ${activeTab === id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
        >
            <span className="text-lg">{icon}</span>
            <span className="text-sm md:text-base">{label}</span>
        </button>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading treatment details....</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to Load</h2>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!treatmentData) return null;

    // Destructure all DB fields (excluding png_logo)
    const {
        name,
        treatment_image,
        overview_description,
        key_benefits,
        who_gets_description,
        ideal_candidates,
        not_suitable_for,
        causes_description,
        causes_list,
        symptoms_description,
        symptoms_list,
        diagnosis_description,
        diagnosis_steps,
        treatment_procedure_description,
        pre_operative_steps,
        surgical_procedure_steps,
        post_operative_steps,
        cost_description,
        cost_ranges,
        cost_factors,
        ayushman_covered,
        ayushman_description,
        ayushman_benefits,
        ayushman_eligibility,
        ayushman_claim_steps,
        surgery_duration,
        hospital_stay,
        recovery_time,
        success_rate,
        faqs,
        comes_in,
    } = treatmentData;

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />
            {/* Hero Section */}
            <div className="bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white md:my-22 my-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 bg-blue-500/30 rounded-full text-sm font-normal backdrop-blur-sm">
                                🏥 {comes_in || 'Premium Healthcare Service'}
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase leading-tight">
                                {name}
                            </h1>
                            <p className="text-lg md:text-xl text-blue-100">
                                Get Yourself Treated For {name} With Medpho
                            </p>
                            <div className="flex flex-wrap gap-6 pt-4 text-sm">
                                {ayushman_covered && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Ayushman Covered</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Expert Surgeons</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Advanced Technology</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <img
                                src={treatment_image}
                                alt={name}
                                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
                        <TabButton id="overview" label="Overview" icon={<FileText />} />
                        <TabButton id="whoGets" label="Who Gets" icon={<Users />} />
                        <TabButton id="causes" label="Causes" icon={<Beaker />} />
                        <TabButton id="symptoms" label="Symptoms" icon={<Stethoscope />} />
                        <TabButton id="diagnosis" label="Diagnosis" icon={<Radiation />} />
                        <TabButton id="treatment" label="Treatment" icon={<Pill />} />
                        <TabButton id="cost" label="Cost" icon={<Coins />} />
                        <TabButton id="ayushman" label="Ayushman" icon={<Shield />} />
                        <TabButton id="hospitals" label="Hospitals" icon={<Hospital />} />
                        <TabButton id="doctors" label="Doctors" icon={<User />} />
                        <TabButton id="faqs" label="FAQs" icon={<HelpCircle />} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Content Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Overview */}
                        {activeTab === 'overview' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6 flex items-center gap-3 uppercase">
                                    <span className="text-3xl">📝</span>
                                    About {name}
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {overview_description}
                                </p>
                                {key_benefits?.length > 0 && (
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Key Benefits:</h3>
                                        <ul className="space-y-3">
                                            {key_benefits.map((point, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-gray-700">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Who Gets */}
                        {activeTab === 'whoGets' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="text-3xl">👥</span>
                                    Who Gets {name}
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {who_gets_description}
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                        <h3 className="font-semibold text-green-900 mb-4 text-lg flex items-center gap-2">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Ideal Candidates
                                        </h3>
                                        <ul className="space-y-3">
                                            {ideal_candidates?.map((candidate, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-1">•</span>
                                                    <span className="text-gray-700">{candidate}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                                        <h3 className="font-semibold text-red-900 mb-4 text-lg flex items-center gap-2">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            Not Suitable For
                                        </h3>
                                        <ul className="space-y-3">
                                            {not_suitable_for?.map((condition, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-red-600 mt-1">•</span>
                                                    <span className="text-gray-700">{condition}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Causes */}
                        {activeTab === 'causes' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="text-3xl">🔬</span>
                                    Causes of {name}
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {causes_description}
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {causes_list?.map((cause, index) => (
                                        <div key={index} className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
                                            <h3 className="font-semibold text-gray-900 mb-2 text-lg">{cause.title}</h3>
                                            <p className="text-gray-600 text-sm">{cause.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Symptoms */}
                        {activeTab === 'symptoms' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="text-3xl">⚕️</span>
                                    Symptoms Of {name}
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {symptoms_description}
                                </p>
                                <div className="space-y-4">
                                    {symptoms_list?.map((item, index) => (
                                        <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-300 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">{item.symptom}</h3>
                                                    <p className="text-gray-600">{item.details}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Diagnosis */}
                        {activeTab === 'diagnosis' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="text-3xl">🩺</span>
                                    Diagnosis Of {name}
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {diagnosis_description}
                                </p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {diagnosis_steps?.map((step, index) => (
                                        <div key={index} className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all">
                                            <div className="text-4xl mb-3">{step.icon}</div>
                                            <h3 className="font-semibold text-gray-900 mb-2 text-lg">{step.title}</h3>
                                            <p className="text-gray-600 text-sm">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Treatment */}
                        {activeTab === 'treatment' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="text-3xl">💊</span>
                                    Treatment For {name}
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {treatment_procedure_description}
                                </p>
                                <div className="space-y-6">
                                    {/* Pre-operative */}
                                    {pre_operative_steps?.length > 0 && (
                                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                            <h3 className="font-normal text-blue-900 mb-4 text-xl flex items-center gap-2">
                                                <span className="text-2xl">📋</span>
                                                Pre-Operative Care
                                            </h3>
                                            <ul className="space-y-2">
                                                {pre_operative_steps.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Surgical Procedure */}
                                    {surgical_procedure_steps?.length > 0 && (
                                        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                            <h3 className="font-normal text-green-900 mb-4 text-xl flex items-center gap-2">
                                                <span className="text-2xl">🔧</span>
                                                Surgical Procedure
                                            </h3>
                                            <ul className="space-y-2">
                                                {surgical_procedure_steps.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <div className="shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                            {index + 1}
                                                        </div>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Post-operative */}
                                    {post_operative_steps?.length > 0 && (
                                        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                                            <h3 className="font-normal text-purple-900 mb-4 text-xl flex items-center gap-2">
                                                <span className="text-2xl">🏥</span>
                                                Post-Operative Care
                                            </h3>
                                            <ul className="space-y-2">
                                                {post_operative_steps.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <svg className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Cost */}
                        {activeTab === 'cost' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="text-3xl">💰</span>
                                    Average Treatment Cost
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {cost_description}
                                </p>
                                <div className="space-y-4 mb-8">
                                    {cost_ranges?.map((range, index) => (
                                        <div key={index} className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-normal uppercase text-gray-900 text-lg mb-2">{range.hospital_type}</h3>
                                                    <p className="text-gray-600 text-sm">{range.includes}</p>
                                                </div>
                                                <div className="text-2xl font-medium text-green-600 whitespace-nowrap">
                                                    ₹{Number(range.min_cost).toLocaleString()} – ₹{Number(range.max_cost).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {cost_factors?.length > 0 && (
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                        <h3 className="font-semibold text-blue-900 mb-4 text-lg">Cost Factors:</h3>
                                        <ul className="grid sm:grid-cols-2 gap-3">
                                            {cost_factors.map((factor, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-gray-700">{factor}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Ayushman */}
                        {activeTab === 'ayushman' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="text-3xl">🏛️</span>
                                    Is Treatment Covered Under Ayushman Bharat?
                                </h2>

                                <div className={`${ayushman_covered ? 'bg-linear-to-r from-green-500 to-emerald-600' : 'bg-linear-to-r from-red-500 to-rose-600'} text-white rounded-xl p-6 mb-6`}>
                                    <div className="flex items-center gap-4">
                                        <svg className="w-16 h-16 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">
                                                {ayushman_covered ? 'Yes, Fully Covered!' : 'Not Covered'}
                                            </h3>
                                            <p className="opacity-90">{ayushman_description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {ayushman_benefits?.length > 0 && (
                                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                            <h3 className="font-bold text-blue-900 mb-4 text-xl">Coverage Benefits:</h3>
                                            <ul className="space-y-3">
                                                {ayushman_benefits.map((benefit, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {ayushman_eligibility?.length > 0 && (
                                        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                                            <h3 className="font-bold text-purple-900 mb-4 text-xl">Eligibility Criteria:</h3>
                                            <ul className="space-y-3">
                                                {ayushman_eligibility.map((criteria, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <svg className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-gray-700">{criteria}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {ayushman_claim_steps?.length > 0 && (
                                        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                            <h3 className="font-bold text-green-900 mb-4 text-xl">How to Claim:</h3>
                                            <div className="space-y-3">
                                                {ayushman_claim_steps.map((step, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                                                            {index + 1}
                                                        </div>
                                                        <span className="text-gray-700 pt-1">{step}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-6">
                                    <div className="flex gap-3">
                                        <svg className="w-6 h-6 text-orange-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-orange-900 mb-1">Need Help?</h4>
                                            <p className="text-orange-700 text-sm">Contact our support team to check your eligibility and get assistance with the Ayushman Bharat claim process.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hospitals */}
                        {activeTab === 'hospitals' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <Building2 className="w-8 h-8" />
                                    <span>All Empanelled Hospitals</span>
                                </h2>
                                <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 mb-8">
                                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" placeholder="Search hospitals by name, city, or specialty..." className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 w-full text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/50" />
                                        </div>
                                        <div className="flex gap-2">
                                            <select className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                                                <option>All Cities</option>
                                            </select>
                                            <button className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg px-6 py-2 text-white font-medium transition-all">Filter</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl text-center"><div className="text-3xl font-bold">247</div><div className="text-sm opacity-90">Total Hospitals</div></div>
                                    <div className="bg-linear-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl text-center"><div className="text-3xl font-bold">156</div><div className="text-sm opacity-90">In Your City</div></div>
                                    <div className="bg-linear-to-br from-purple-500 to-violet-600 text-white p-6 rounded-xl text-center"><div className="text-3xl font-bold">89%</div><div className="text-sm opacity-90">Verified</div></div>
                                    <div className="bg-linear-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl text-center"><div className="text-3xl font-bold">24/7</div><div className="text-sm opacity-90">Emergency Care</div></div>
                                </div>
                                <p className="text-gray-500 text-center py-8">Hospital listings coming soon.</p>
                            </div>
                        )}

                        {/* Doctors */}
                        {activeTab === 'doctors' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <Users className="w-8 h-8" />
                                    <span>Top Doctors Near You</span>
                                </h2>
                                <div className="bg-linear-to-r from-purple-500 to-pink-600 text-white rounded-xl p-6 mb-8">
                                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" placeholder="Search doctors by name or specialty..." className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 w-full text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/50" />
                                        </div>
                                        <div className="flex gap-2">
                                            <select className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                                                <option>All Specialties</option>
                                            </select>
                                            <button className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg px-6 py-2 text-white font-medium transition-all">Filter</button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-center py-8">Doctor listings coming soon.</p>
                            </div>
                        )}

                        {/* FAQs */}
                        {activeTab === 'faqs' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                                <h2 className="text-2xl md:text-3xl font-medium uppercase text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="text-3xl">❓</span>
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    {faqs?.map((faq, index) => (
                                        <details key={index} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors">
                                            <summary className="cursor-pointer p-5 font-semibold text-gray-900 flex items-center justify-between">
                                                <span className="pr-4">{faq.question}</span>
                                                <svg className="w-5 h-5 text-blue-600 transform group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </summary>
                                            <div className="px-5 pb-5 text-gray-700">{faq.answer}</div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Contact Card */}
                            <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xl font-bold mb-4">Need Assistance?</h3>
                                <p className="text-blue-100 mb-6">Our medical experts are here to help you 24/7</p>
                                <div className="space-y-3">
                                    <button onClick={() => setShowContactForm(true)} className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg">
                                        Book Free Consultation
                                    </button>
                                    <a href="tel:+911234567890" className="w-full bg-blue-500/30 backdrop-blur-sm border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-blue-500/40 transition-all flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        Call: +91 123 456 7890
                                    </a>
                                </div>
                            </div>

                            {/* Quick Info — from DB fields */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                                <h3 className="font-medium uppercase text-gray-900 mb-4 text-lg">Quick Information</h3>
                                <div className="space-y-4">
                                    {surgery_duration && (
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">Surgery Duration</div>
                                                <div className="text-gray-600 text-sm">{surgery_duration}</div>
                                            </div>
                                        </div>
                                    )}
                                    {hospital_stay && (
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">Hospital Stay</div>
                                                <div className="text-gray-600 text-sm">{hospital_stay}</div>
                                            </div>
                                        </div>
                                    )}
                                    {recovery_time && (
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">Recovery Time</div>
                                                <div className="text-gray-600 text-sm">{recovery_time}</div>
                                            </div>
                                        </div>
                                    )}
                                    {success_rate && (
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">Success Rate</div>
                                                <div className="text-gray-600 text-sm">{success_rate}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Modal */}
            {showContactForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
                            <button onClick={() => setShowContactForm(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="+91 1234567890" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                                <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg">
                                Submit Request
                            </button>
                        </form>
                    </div>
                    <Footer />
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.5s ease-out; }
                .animate-slide-up { animation: slide-up 0.4s ease-out; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}