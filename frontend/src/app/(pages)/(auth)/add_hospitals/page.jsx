'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import React, { Fragment, useState } from 'react';
import {
    Save,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Building2,
    MapPin,
    FileText,
    Clock,
    Award,
    BarChart3,
    Globe,
    Shield
} from 'lucide-react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AdminHospitalForm = () => {
    const [formData, setFormData] = useState({
        uuid: uuidv4(),
        name: '',
        photo: '',
        slug: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        location: null,
        about: '',
        opening_hours: [],
        timing_display: '',
        certifications: [],
        available_treatments: [],
        available_specialities: [],
        available_services: [],
        total_doctors: 0,
        total_specialities: 0,
        rating: 0,
        total_reviews: 0,
        is_verified: false,
        is_active: true,
        meta_title: '',
        meta_description: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [localArrayInputs, setLocalArrayInputs] = useState({
        opening_hours: '',
        certifications: '',
        available_treatments: '',
        available_specialities: '',
        available_services: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // ✅ For typing — just updates the display string, no splitting
    const handleArrayInputChange = (e, field) => {
        setLocalArrayInputs(prev => ({ ...prev, [field]: e.target.value }));
    };

    // ✅ For blur — splits and saves to formData only when user leaves the field
    const handleArrayInputBlur = (field) => {
        const array = localArrayInputs[field]
            .split(',')
            .map(item => item.trim())
            .filter(item => item);
        setFormData(prev => ({ ...prev, [field]: array }));
    };

    const handleNumberChange = (e, field) => {
        const value = e.target.value === '' ? '' : parseFloat(e.target.value);
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name: name,
            slug: generateSlug(name)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post('http://localhost:4000/api/auth/hospitals', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            setMessage({
                type: 'success',
                text: 'Hospital profile created successfully!'
            });

            // Reset form with new UUID after 2 seconds
            setTimeout(() => {
                setFormData({
                    uuid: uuidv4(),
                    name: '',
                    photo: '',
                    slug: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    state: '',
                    pincode: '',
                    country: '',
                    location: null,
                    about: '',
                    opening_hours: [],
                    timing_display: '',
                    certifications: [],
                    available_treatments: [],
                    available_specialities: [],
                    available_services: [],
                    total_doctors: 0,
                    total_specialities: 0,
                    rating: 0,
                    total_reviews: 0,
                    is_verified: false,
                    is_active: true,
                    meta_title: '',
                    meta_description: '',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    deleted_at: null
                });
                setCurrentStep(1);
                setMessage({ type: '', text: '' });
            }, 2000);

        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to create hospital profile'
            });
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { id: 1, title: 'Basic Info', icon: Building2, color: 'text-blue-600' },
        { id: 2, title: 'Location', icon: MapPin, color: 'text-orange-600' },
        { id: 3, title: 'About', icon: FileText, color: 'text-blue-600' },
        { id: 4, title: 'Timing', icon: Clock, color: 'text-orange-600' },
        { id: 5, title: 'Quality', icon: Award, color: 'text-blue-600' },
        { id: 6, title: 'Statistics', icon: BarChart3, color: 'text-orange-600' },
        { id: 7, title: 'SEO & Status', icon: Globe, color: 'text-blue-600' }
    ];

    return (
        <Fragment>
            <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8 my-14 md:my-22">
                <Navbar />
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 bg-white rounded-xl shadow-md p-8 border-t-4 border-blue-500">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-medium md:text-4xl text-gray-900 mb-2">
                            Add New Hospital
                        </h1>
                        <p className="text-lg text-gray-600">
                            Fill in all the required information across multiple sections
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex gap-2 min-w-max px-4">
                            {steps.map((step) => {
                                const StepIcon = step.icon;
                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => setCurrentStep(step.id)}
                                        type="button"
                                        className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all border-2 ${currentStep === step.id
                                            ? 'bg-white border-blue-500 shadow-md'
                                            : 'bg-white border-gray-200 hover:border-orange-400'
                                            }`}
                                    >
                                        <StepIcon className={`w-5 h-5 ${currentStep === step.id ? step.color : 'text-gray-400'}`} />
                                        <span className={`text-sm font-medium ${currentStep === step.id ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {step.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Message Alert */}
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success'
                            ? 'bg-green-50 border-2 border-green-500 text-green-800'
                            : 'bg-red-50 border-2 border-red-500 text-red-800'
                            }`}>
                            {message.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                            <span className="font-medium">{message.text}</span>
                        </div>
                    )}

                    {/* Form — FIX 1: added onKeyDown to block accidental Enter submissions */}
                    <form
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                        className="bg-white rounded-xl shadow-md p-8 border-l-4 border-orange-500"
                    >
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-medium text-gray-900">Basic Information</h2>
                                </div>

                                {/* UUID Display */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        UUID (Auto-generated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.uuid}
                                        readOnly
                                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-600 cursor-not-allowed font-mono text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Hospital Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleNameChange}
                                            required
                                            maxLength={200}
                                            placeholder="Enter hospital name"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Slug (Auto-generated from name)
                                        </label>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            maxLength={200}
                                            placeholder="hospital-name-slug"
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">URL-friendly version of the hospital name</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            maxLength={20}
                                            placeholder="+91 1234567890"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            maxLength={255}
                                            placeholder="hospital@example.com"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Photo URL
                                        </label>
                                        <input
                                            type="url"
                                            name="photo"
                                            value={formData.photo}
                                            onChange={handleChange}
                                            maxLength={500}
                                            placeholder="https://example.com/hospital-photo.jpg"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location Information */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-orange-200">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <MapPin className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h2 className="text-2xl font-medium text-gray-900">Location Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            placeholder="Street address, landmark, area"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            maxLength={100}
                                            placeholder="Enter city"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                            maxLength={100}
                                            placeholder="Enter state"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            maxLength={10}
                                            placeholder="Enter pincode"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                            maxLength={100}
                                            placeholder="Enter country"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: About Hospital */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FileText className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-medium text-gray-900">About Hospital</h2>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        About Hospital
                                    </label>
                                    <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                        rows={6}
                                        placeholder="Detailed description about the hospital, facilities, services, etc."
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Timing & Operations */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-orange-200">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Clock className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h2 className="text-2xl font-medium text-gray-900">Timing & Operations</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Timing Display
                                        </label>
                                        <input
                                            type="text"
                                            name="timing_display"
                                            value={formData.timing_display}
                                            onChange={handleChange}
                                            maxLength={100}
                                            placeholder="e.g., 24/7, Mon-Sat: 8AM-8PM"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Opening Hours (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={localArrayInputs.opening_hours}
                                            onChange={(e) => handleArrayInputChange(e, 'opening_hours')}
                                            onBlur={() => handleArrayInputBlur('opening_hours')}
                                            placeholder="Monday 9-5, Tuesday 9-5, Wednesday 9-5"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Format: Day HH-HH (e.g., Monday 9-5)</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Certifications & Quality */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Award className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-medium text-gray-900">Certifications & Quality</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Certifications (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={localArrayInputs.certifications}
                                            onChange={(e) => handleArrayInputChange(e, 'certifications')}
                                            onBlur={() => handleArrayInputBlur('certifications')}
                                            placeholder="NABH, JCI, ISO 9001:2015"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Treatments Available (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={localArrayInputs.available_treatments}
                                            onChange={(e) => handleArrayInputChange(e, 'available_treatments')}
                                            onBlur={() => handleArrayInputBlur('available_treatments')}
                                            placeholder="Hip Replacement, Kidney Stone, ByPass Surgery, Spine Surgery"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">List all medical treatments available</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Specialities Available (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={localArrayInputs.available_specialities}
                                            onChange={(e) => handleArrayInputChange(e, 'available_specialities')}
                                            onBlur={() => handleArrayInputBlur('available_specialities')}
                                            placeholder="Cardiology, Neurology, Orthopedics, Ophthalmology"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">List all medical specialities offered</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Services Available (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={localArrayInputs.available_services}
                                            onChange={(e) => handleArrayInputChange(e, 'available_services')}
                                            onBlur={() => handleArrayInputBlur('available_services')}
                                            placeholder="ICU, Blood Bank, Pharmacy, Ambulance, Dialysis"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">List all hospital services available</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 6: Statistics */}
                        {currentStep === 6 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-orange-200">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <BarChart3 className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h2 className="text-2xl font-medium text-gray-900">Hospital Statistics</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Total Doctors
                                        </label>
                                        <input
                                            type="number"
                                            name="total_doctors"
                                            value={formData.total_doctors}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Total Specialities
                                        </label>
                                        <input
                                            type="number"
                                            name="total_specialities"
                                            value={formData.total_specialities}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Rating (0-5)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            value={formData.rating}
                                            onChange={(e) => handleNumberChange(e, 'rating')}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                            placeholder="4.5"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Total Reviews
                                        </label>
                                        <input
                                            type="number"
                                            name="total_reviews"
                                            value={formData.total_reviews}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 7: SEO & Status */}
                        {currentStep === 7 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Globe className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-medium text-gray-900">SEO & Status</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            name="meta_title"
                                            value={formData.meta_title}
                                            onChange={handleChange}
                                            maxLength={200}
                                            placeholder="SEO-friendly title for search engines"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Recommended length: 50-60 characters</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Meta Description
                                        </label>
                                        <textarea
                                            name="meta_description"
                                            value={formData.meta_description}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Brief description for search engine results"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Recommended length: 150-160 characters</p>
                                    </div>

                                    {/* Status Checkboxes */}
                                    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-blue-600" />
                                            Status & Verification
                                        </h3>
                                        <div className="flex gap-8">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="is_active"
                                                    checked={formData.is_active}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <label className="ml-3 text-sm font-semibold text-gray-700">
                                                    Is Active
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="is_verified"
                                                    checked={formData.is_verified}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                                                />
                                                <label className="ml-3 text-sm font-semibold text-gray-700">
                                                    Is Verified
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timestamps Display */}
                                    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3">System Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                            <div>
                                                <span className="font-medium">Created:</span> {new Date(formData.created_at).toLocaleString()}
                                            </div>
                                            <div>
                                                <span className="font-medium">Updated:</span> {new Date(formData.updated_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FIX 2: Navigation — removed step counter, added "Next: SectionName" label */}
                        <div className="flex justify-between items-end pt-6 border-t-2 border-gray-200 mt-8">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                disabled={currentStep === 1}
                                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>

                            {currentStep < steps.length ? (
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                                        Next: {steps[currentStep].title}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                                    >
                                        Next
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    {loading ? 'Creating...' : 'Create Hospital Profile'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default AdminHospitalForm;