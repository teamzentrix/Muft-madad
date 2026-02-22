'use client';

import React, { useState, useEffect } from 'react';
import { Clock, User, Calendar, Share2, Bookmark, Eye, ChevronRight, Hash, Menu, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const BlogPage = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setTocOpen(false);
    }
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'what-is-offline', title: 'What is Offline Business?' },
    { id: 'what-is-online', title: 'What is Online Business?' },
    { id: 'advantages-offline', title: 'Advantages of Offline Business' },
    { id: 'disadvantages-offline', title: 'Disadvantages of Offline Business' },
    { id: 'advantages-online', title: 'Advantages of Online Business' },
    { id: 'disadvantages-online', title: 'Disadvantages of Online Business' },
    { id: 'key-differences', title: 'Key Differences' },
    { id: 'which-one-wins', title: 'Which One Wins?' },
    { id: 'future-trends', title: 'Future Trends' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:mt-22 mt-14 w-full">
      <Navbar />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-orange-300 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile TOC Toggle Button - Fixed at bottom right */}
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-orange-300 text-gray-900 rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-400 transition-all"
        aria-label="Toggle Table of Contents"
      >
        {tocOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile TOC Overlay */}
      {tocOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setTocOpen(false)}
        />
      )}

      {/* Mobile TOC Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-40 transform transition-transform duration-300 overflow-y-auto ${
          tocOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Hash className="w-5 h-5 text-orange-300" />
              Table of Contents
            </h3>
            <button
              onClick={() => setTocOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm ${
                  activeSection === item.id
                    ? 'bg-orange-300 text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Header Section - Responsive Split Design */}
      <div className="relative h-75 sm:h-100 md:h-100 overflow-hidden w-full">
        {/* Single Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920"
            alt="Business Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>


        {/* Center Content Overlay */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl w-full">
            {/* Business & Growth Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full mb-3 sm:mb-6">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-white font-medium text-xs sm:text-sm">Business & Growth</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-2xl">
              Offline vs Online Business: Which One Wins in 2026?
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto drop-shadow-lg font-normal px-4">
              Discover whether offline or online business is better in 2026 and learn strategies to choose the right model for growth
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 w-full lg:max-w-4xl">
            <article className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              <div className="relative h-[200px] sm:h-[300px] md:h-[400px] bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"
                  alt="Business Comparison"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                {/* Introduction */}
                <section id="introduction" className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-medium uppercase text-gray-900 mb-3 sm:mb-4">
                    Introduction
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                    In today's rapidly evolving business landscape, entrepreneurs face a critical decision: should they establish an offline business with a physical presence, or should they venture into the digital realm with an online business? This comprehensive guide will explore both business models in depth, examining their advantages, disadvantages, and helping you make an informed decision for 2026 and beyond.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    The COVID-19 pandemic has dramatically accelerated the shift towards digital commerce, but offline businesses continue to thrive in many sectors. Understanding the nuances of each approach is crucial for modern entrepreneurs looking to maximize their success in an increasingly competitive marketplace.
                  </p>
                </section>

                {/* Image Break */}
                <div className="my-6 sm:my-8 md:my-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200"
                    alt="Modern Business Office"
                    className="w-full h-[200px] sm:h-[250px] md:h-[350px] object-cover"
                  />
                  <div className="bg-gray-100 px-4 sm:px-6 py-2 sm:py-3">
                    <p className="text-xs sm:text-sm text-gray-600 italic">Modern business workspace combining offline and online elements</p>
                  </div>
                </div>

                {/* What is Offline Business */}
                <section id="what-is-offline" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    What is Offline Business?
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                    An offline business, also known as a brick-and-mortar business, operates from a physical location where customers can visit in person. These businesses have been the traditional model of commerce for centuries, ranging from small local shops to large retail chains.
                  </p>
                  <div className="bg-blue-100 border-l-4 border-blue-400 p-4 sm:p-6 rounded-r-xl mb-4 sm:mb-6">
                    <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Key Characteristics:</h3>
                    <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Physical storefront or office space</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Face-to-face customer interactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Direct product handling and demonstration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Local market focus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Traditional marketing approaches</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    Examples include restaurants, retail stores, medical clinics, barbershops, gyms, and any business where customers physically visit to receive products or services. These businesses build their reputation through local community engagement and word-of-mouth referrals.
                  </p>
                </section>

                {/* What is Online Business */}
                <section id="what-is-online" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    What is Online Business?
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                    An online business operates primarily or entirely through the internet, allowing entrepreneurs to reach customers globally without the need for a physical storefront. These businesses leverage digital technologies to market, sell, and deliver products or services.
                  </p>
                  <div className="bg-orange-100 border-l-4 border-orange-400 p-4 sm:p-6 rounded-r-xl mb-4 sm:mb-6">
                    <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Key Characteristics:</h3>
                    <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Digital presence through websites and apps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>24/7 accessibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Global customer reach</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Digital marketing and SEO</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Automated processes and scalability</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    Examples include e-commerce stores, SaaS platforms, digital marketing agencies, online courses, dropshipping businesses, and freelance services. The rise of platforms like Shopify, Amazon, and social media has made it easier than ever to start an online business.
                  </p>
                </section>

                {/* Image Break */}
                <div className="my-6 sm:my-8 md:my-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
                    alt="Team Collaboration"
                    className="w-full h-[200px] sm:h-[250px] md:h-[350px] object-cover"
                  />
                  <div className="bg-gray-100 px-4 sm:px-6 py-2 sm:py-3">
                    <p className="text-xs sm:text-sm text-gray-600 italic">Collaborative business environment in the digital age</p>
                  </div>
                </div>

                {/* Advantages of Offline Business */}
                <section id="advantages-offline" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    Advantages of Offline Business
                  </h2>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">1</span>
                        Personal Customer Relationships
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Face-to-face interactions allow businesses to build stronger, more personal relationships with customers. This human touch creates trust and loyalty that's difficult to replicate online. Customers can ask questions, receive immediate assistance, and feel a genuine connection with your brand.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">2</span>
                        Tangible Product Experience
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Customers can see, touch, and try products before purchasing. This is especially important for items like clothing, furniture, or electronics where physical inspection influences buying decisions. The ability to test products reduces return rates and increases customer satisfaction.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">3</span>
                        Immediate Gratification
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Customers receive products or services immediately without waiting for shipping. This instant satisfaction is a significant advantage for impulse purchases and time-sensitive needs. No delivery delays, no shipping costs, and no damaged packages during transit.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">4</span>
                        Local Community Presence
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Offline businesses become integral parts of their local communities. They create jobs, support local events, and contribute to the neighborhood's character. This community involvement generates goodwill and customer loyalty that extends beyond transactional relationships.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">5</span>
                        Easier Returns and Exchanges
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Customers can return or exchange products immediately without shipping hassles. This convenience reduces friction in the customer experience and builds confidence in making purchases. Staff can address concerns face-to-face and often resolve issues on the spot.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Disadvantages of Offline Business */}
                <section id="disadvantages-offline" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    Disadvantages of Offline Business
                  </h2>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">1</span>
                        High Operating Costs
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Rent, utilities, maintenance, and staffing create substantial overhead expenses. Prime locations with high foot traffic often demand premium rents. These fixed costs continue regardless of sales performance, putting pressure on profit margins and requiring consistent revenue to break even.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">2</span>
                        Limited Geographic Reach
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Business is restricted to customers who can physically visit your location. This geographical limitation caps your potential customer base and makes expansion expensive. Opening new locations requires significant capital investment and operational complexity.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">3</span>
                        Limited Operating Hours
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Traditional business hours mean lost sales opportunities when closed. Customers with busy schedules may find it difficult to visit during your operating hours. Extended hours require additional staffing costs and may not be financially viable for all businesses.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">4</span>
                        Inventory Challenges
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Managing physical inventory requires storage space and capital tied up in stock. Overstocking leads to waste and markdowns, while understocking results in lost sales. Seasonal variations make inventory planning even more complex and risky.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">5</span>
                        Difficult Scalability
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Growing an offline business requires proportional increases in physical infrastructure, staff, and inventory. Each new location demands significant capital investment and carries increased risk. Scaling quickly is challenging without substantial financial resources.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Image Break */}
                <div className="my-6 sm:my-8 md:my-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200"
                    alt="Digital Business"
                    className="w-full h-[200px] sm:h-[250px] md:h-[350px] object-cover"
                  />
                  <div className="bg-gray-100 px-4 sm:px-6 py-2 sm:py-3">
                    <p className="text-xs sm:text-sm text-gray-600 italic">Digital transformation in modern business operations</p>
                  </div>
                </div>

                {/* Advantages of Online Business */}
                <section id="advantages-online" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    Advantages of Online Business
                  </h2>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">1</span>
                        Lower Startup Costs
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        No physical storefront means significantly reduced initial investment. You can start with a website, domain, and basic inventory. Many successful online businesses begin as side hustles with minimal capital, growing organically as revenue increases. Cloud-based tools and platforms have made sophisticated business operations accessible to everyone.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">2</span>
                        Global Market Access
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Reach customers worldwide without geographical limitations. Your potential customer base expands from thousands to billions. International shipping and digital delivery make it possible to serve customers across continents without opening physical locations in each market.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">3</span>
                        24/7 Availability
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Your business never sleeps. Customers can browse and purchase at their convenience, any time of day or night. Automated systems handle orders, payments, and customer service inquiries even while you sleep. This continuous operation maximizes revenue potential without additional labor costs.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">4</span>
                        Easy Scalability
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Growing an online business is exponentially easier than expanding offline. Adding new products, serving more customers, or entering new markets doesn't require proportional infrastructure increases. Digital systems can handle increased volume with minimal additional costs, making rapid scaling feasible.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">5</span>
                        Data-Driven Decisions
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Access to detailed analytics about customer behavior, preferences, and purchasing patterns. Track every click, view, and conversion to optimize your marketing and sales strategies. A/B testing allows you to experiment and improve continuously based on real data rather than guesswork.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">6</span>
                        Flexible Work Environment
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Run your business from anywhere with an internet connection. This flexibility enables better work-life balance and reduces commuting costs and time. Remote teams can collaborate effectively using digital tools, giving you access to talent worldwide without geographical constraints.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Disadvantages of Online Business */}
                <section id="disadvantages-online" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    Disadvantages of Online Business
                  </h2>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">1</span>
                        Intense Competition
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Low barriers to entry mean facing competitors from around the world. Standing out in crowded online marketplaces requires significant marketing investment and continuous innovation. Price competition can erode margins as customers easily compare options with a few clicks.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">2</span>
                        Building Trust Challenges
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Establishing credibility without face-to-face interaction is difficult. Customers can't physically verify your business or products before purchasing. Security concerns about online payments and data privacy create additional barriers. Building reputation through reviews and testimonials takes time and consistent effort.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">3</span>
                        Technical Dependencies
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Your business relies entirely on technology infrastructure. Website downtime means lost sales. Cyber attacks, technical glitches, or platform changes can disrupt operations. Maintaining and updating digital systems requires ongoing investment in technology and expertise that offline businesses don't face.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">4</span>
                        Shipping and Logistics Complexity
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Managing shipping, handling returns, and dealing with damaged goods in transit adds operational complexity. International shipping involves customs, regulations, and longer delivery times. Customers increasingly expect fast, free shipping, which can significantly impact profit margins.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">5</span>
                        Limited Product Experience
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Customers can't touch, feel, or try products before purchase. This limitation particularly affects categories like clothing, furniture, and luxury goods. High-quality photos and detailed descriptions help but don't fully replicate the physical shopping experience. Higher return rates result from mismatched expectations.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Image Break */}
                <div className="my-6 sm:my-8 md:my-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200"
                    alt="Business Strategy"
                    className="w-full h-[200px] sm:h-[250px] md:h-[350px] object-cover"
                  />
                  <div className="bg-gray-100 px-4 sm:px-6 py-2 sm:py-3">
                    <p className="text-xs sm:text-sm text-gray-600 italic">Strategic business planning for the modern entrepreneur</p>
                  </div>
                </div>

                {/* Key Differences */}
                <section id="key-differences" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    Key Differences: A Comprehensive Comparison
                  </h2>
                  
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                        <thead>
                          <tr className="bg-orange-300 text-gray-900">
                            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-medium text-xs sm:text-sm md:text-base">Factor</th>
                            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-medium text-xs sm:text-sm md:text-base">Offline Business</th>
                            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-medium text-xs sm:text-sm md:text-base">Online Business</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Startup Costs</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">High ($50k-$500k+)</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Low ($500-$10k)</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Market Reach</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Local/Regional</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Global</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Operating Hours</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Limited (8-12 hours)</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">24/7</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Overhead Costs</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Very High</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Low to Moderate</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Scalability</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Difficult & Expensive</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Easy & Cost-effective</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Customer Interaction</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Face-to-face</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Digital channels</td>
                          </tr>
                          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Inventory Management</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Physical space required</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Can dropship</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Marketing</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Traditional (print, TV, local)</td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm md:text-base">Digital (SEO, social, ads)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Which One Wins */}
                <section id="which-one-wins" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    Which One Wins in 2026?
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    The answer isn't straightforward – it depends on your specific circumstances, industry, target market, and business goals. However, current trends suggest that the most successful businesses in 2026 will likely adopt a <strong className="text-orange-600">hybrid approach</strong>, combining the best elements of both models.
                  </p>

                  <div className="bg-orange-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-orange-300 mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium uppercase text-gray-900 mb-3 sm:mb-4">The Hybrid Model: Best of Both Worlds</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                      Many successful businesses are now operating with an omnichannel strategy that leverages both physical and digital presence. This approach allows you to:
                    </p>
                    <ul className="space-y-2 sm:space-y-3">
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-orange-600 font-medium mt-1 text-sm sm:text-base">✓</span>
                        <span className="text-gray-700 text-sm sm:text-base">Maintain a physical storefront for local customers while selling online globally</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-blue-600 font-medium mt-1 text-sm sm:text-base">✓</span>
                        <span className="text-gray-700 text-sm sm:text-base">Offer in-store pickup for online orders (click-and-collect)</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-orange-600 font-medium mt-1 text-sm sm:text-base">✓</span>
                        <span className="text-gray-700 text-sm sm:text-base">Use physical locations as showrooms while processing orders online</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-blue-600 font-medium mt-1 text-sm sm:text-base">✓</span>
                        <span className="text-gray-700 text-sm sm:text-base">Leverage digital marketing to drive foot traffic to physical stores</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-orange-600 font-medium mt-1 text-sm sm:text-base">✓</span>
                        <span className="text-gray-700 text-sm sm:text-base">Provide seamless customer experience across all channels</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-blue-300">
                      <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Choose Offline If:</h4>
                      <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>• Products require physical inspection</li>
                        <li>• Service-based local business</li>
                        <li>• Strong community presence is essential</li>
                        <li>• Target market is primarily local</li>
                        <li>• High-touch customer experience needed</li>
                      </ul>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-orange-300">
                      <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Choose Online If:</h4>
                      <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>• Limited startup capital available</li>
                        <li>• Products ship easily worldwide</li>
                        <li>• Digital products or services</li>
                        <li>• Want maximum flexibility and scalability</li>
                        <li>• Target market is geographically dispersed</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Future Trends */}
                <section id="future-trends" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    Future Trends Shaping Business in 2026
                  </h2>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">🤖 Artificial Intelligence Integration</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        AI-powered chatbots, personalized recommendations, and predictive analytics are becoming standard in both online and offline businesses. Smart stores use AI for inventory management, while online businesses leverage it for customer service and marketing automation.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">🥽 Augmented Reality Shopping</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        AR technology bridges the gap between online and offline shopping. Customers can virtually try on clothes, visualize furniture in their homes, or test products before purchasing. This technology enhances online shopping with offline-like experiences.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">🌱 Sustainability Focus</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Both online and offline businesses are prioritizing sustainability. Local sourcing, eco-friendly packaging, carbon-neutral shipping, and circular economy principles are becoming competitive advantages rather than optional features.
                      </p>
                    </div>

                    <div className="bg-orange-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">📱 Social Commerce</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Shopping directly through social media platforms is exploding. Instagram, TikTok, and Facebook have integrated shopping features that blur the lines between social interaction and commerce, creating new opportunities for businesses of all types.
                      </p>
                    </div>

                    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">⚡ Same-Day Delivery</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        The expectation for rapid delivery is pushing online businesses to establish local fulfillment centers, effectively creating mini-offline presences. This trend is bringing online and offline models closer together than ever before.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Image Break */}
                <div className="my-6 sm:my-8 md:my-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200"
                    alt="Business Success"
                    className="w-full h-[200px] sm:h-[250px] md:h-[350px] object-cover"
                  />
                  <div className="bg-gray-100 px-4 sm:px-6 py-2 sm:py-3">
                    <p className="text-xs sm:text-sm text-gray-600 italic">Building a successful business in the digital age</p>
                  </div>
                </div>

                {/* Conclusion */}
                <section id="conclusion" className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-medium uppercase text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="text-orange-300 text-xl sm:text-3xl">#</span>
                    Conclusion
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                    The debate between offline and online business isn't about choosing one over the other – it's about understanding the strengths and limitations of each model and determining which best aligns with your goals, resources, and target market. In 2026, the most successful entrepreneurs will likely be those who strategically combine elements of both approaches.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    Whether you start with a purely offline business, launch directly online, or create a hybrid model from day one, the key is to remain flexible and adapt as your business grows and market conditions evolve. The future of business is not offline versus online – it's about creating seamless, valuable experiences for customers wherever they choose to engage with your brand.
                  </p>
                </section>
              </div>
            </article>

            {/* Share Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Share this article</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-300 text-gray-900 rounded-xl font-semibold hover:bg-blue-400 transition-all text-sm sm:text-base">
                  Facebook
                </button>
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-200 text-gray-900 rounded-xl font-semibold hover:bg-blue-300 transition-all text-sm sm:text-base">
                  Twitter
                </button>
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-300 text-gray-900 rounded-xl font-semibold hover:bg-blue-400 transition-all text-sm sm:text-base">
                  LinkedIn
                </button>
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-200 text-gray-900 rounded-xl font-semibold hover:bg-blue-300 transition-all text-sm sm:text-base">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Table of Contents Sidebar - Hidden on mobile and tablet */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium uppercase text-gray-900 mb-4 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-orange-300" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                        activeSection === item.id
                          ? 'bg-orange-300 text-gray-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;