'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { User, MapPin, Calendar, Star, FileText, Heart, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'

const ReviewForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        treatment: '',
        rating: 0,
        city: '',
        date: ''
    });

    const [hoveredRating, setHoveredRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const treatments = [
        'Cataract',
        'Kidney Stones',
        'Gallstone',
        'Piles',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errorMsg) setErrorMsg('');
    };

    const handleRatingClick = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
        if (errorMsg) setErrorMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const response = await axios.post(
                'http://localhost:4000/api/users/reviews/create',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('✅ Review submitted successfully:', response.data);
            setSuccessMsg(response.data.message || 'Review submitted successfully!');
            setSubmitted(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    description: '',
                    treatment: '',
                    rating: 0,
                    city: '',
                    date: ''
                });
                setSuccessMsg('');
            }, 3000);

        } catch (error) {
            console.error('❌ Error submitting review:', error);
            const errorMessage = 
                error.response?.data?.message || 
                error.response?.data?.error ||
                error.message || 
                'Failed to submit review. Please check if the server is running on port 4000.';
            setErrorMsg(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClearForm = () => {
        setFormData({
            name: '',
            description: '',
            treatment: '',
            rating: 0,
            city: '',
            date: ''
        });
        setErrorMsg('');
        setSuccessMsg('');
    };

    const isFormValid = formData.name && formData.description && formData.treatment && formData.rating > 0 && formData.city && formData.date;

    if (submitted) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-4">Thank You!</h2>
                        <p className="text-gray-600 text-lg mb-6">
                            Your review has been submitted successfully and will be visible soon.
                        </p>
                        {successMsg && (
                            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">
                                {successMsg}
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50 pt-12 ">
            <Navbar />
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-12 text-center md:pt-22 pt-14 px-4">
                <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-6">
                    <Heart className="w-5 h-5 text-orange-600" />
                    <span className="text-orange-700 font-semibold">Share Your Experience</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-medium uppercase text-gray-800 mb-4">
                    Submit Your Review
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Your feedback helps others make informed decisions about their healthcare journey
                </p>
            </div>

            {/* Form Card */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Decorative Top Bar */}
                    <div className="h-3 bg-orange-400"></div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12">
                        {/* Error Message */}
                        {errorMsg && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-red-700 mb-1">Error</p>
                                    <p className="text-sm text-red-600">{errorMsg}</p>
                                </div>
                            </div>
                        )}

                        {/* Success Message */}
                        {successMsg && !submitted && (
                            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-green-700 mb-1">Success</p>
                                    <p className="text-sm text-green-600">{successMsg}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name Input */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Full Name <span className="text-orange-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-gray-800"
                                        required
                                        maxLength={255}
                                    />
                                </div>
                            </div>

                            {/* City Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    City <span className="text-orange-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter your city"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-gray-800"
                                        required
                                        maxLength={200}
                                    />
                                </div>
                            </div>

                            {/* Date Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Date <span className="text-orange-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-gray-800"
                                        required
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            {/* Treatment Dropdown */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Treatment Type <span className="text-orange-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <Heart className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <select
                                        name="treatment"
                                        value={formData.treatment}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-gray-800 appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="">Select treatment type</option>
                                        {treatments.map(treatment => (
                                            <option key={treatment} value={treatment}>
                                                {treatment}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Your Rating <span className="text-orange-500">*</span>
                                </label>
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                                    <div className="flex items-center justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingClick(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-12 h-12 transition-colors ${star <= (hoveredRating || formData.rating)
                                                            ? 'fill-orange-400 text-orange-400'
                                                            : 'fill-gray-200 text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {formData.rating > 0 && (
                                        <p className="text-center mt-4 text-gray-600 font-semibold">
                                            You rated: {formData.rating} {formData.rating === 1 ? 'star' : 'stars'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Description Textarea */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Your Experience <span className="text-orange-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-4">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Share your experience with Medpho. How did the treatment help you?"
                                        rows="6"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none text-gray-800"
                                        required
                                        maxLength={500}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    {formData.description.length} / 500 characters
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={!isFormValid || loading}
                                className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isFormValid && !loading
                                        ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-xl transform hover:-translate-y-1'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Submit Review
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleClearForm}
                                disabled={loading}
                                className="px-8 py-4 bg-orange-100 text-orange-700 rounded-xl font-bold text-lg hover:bg-orange-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Clear Form
                            </button>
                        </div>

                        {/* Info Note */}
                        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                            <p className="text-sm text-gray-600">
                                <strong className="text-blue-700">Note:</strong> Your review will be verified and published within 24-48 hours. Thank you for helping others!
                            </p>
                        </div>
                    </form>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-6 mt-12 pb-20">
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Verified Reviews</h3>
                        <p className="text-sm text-gray-600">All reviews are verified before publishing</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-orange-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Help Others</h3>
                        <p className="text-sm text-gray-600">Your experience guides future patients</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-8 h-8 text-blue-600 fill-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Build Trust</h3>
                        <p className="text-sm text-gray-600">Authentic reviews build community trust</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReviewForm;