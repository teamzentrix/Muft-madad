'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

export default function BlogCards() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const blogs = [
    {
      id: 1,
      category: 'Business & Growth',
      categoryColor: 'from-orange-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      date: '2026-02-10',
      readTime: '13 min read',
      title: 'Offline vs Online Business: Which One Wins in 2026?',
      description: 'Learn the advantages, challenges, and future outlook of offline and online...',
      tags: ['Offline Business', 'Online Business']
    },
    {
      id: 2,
      category: 'Digital Marketing',
      categoryColor: 'from-pink-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      date: '2026-02-10',
      readTime: '15 min read',
      title: 'How to Rank Your Website on Google in 2026: A Complete SE...',
      description: 'Rank your website on Google with future-ready SEO practices designed to...',
      tags: ['SEO', 'Google Ranking']
    },
    {
      id: 3,
      category: 'Web & Tech',
      categoryColor: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      date: '2026-02-09',
      readTime: '12 min read',
      title: 'Clawd Bot: The AI Assistant That Can Actually Work for Your...',
      description: 'Learn how advanced AI assistants are transforming business operations,...',
      tags: ['AI Assistant', 'Business Automation']
    },
    {
      id: 4,
      category: 'Digital Marketing',
      categoryColor: 'from-indigo-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      date: '2026-02-08',
      readTime: '14 min read',
      title: 'Google Ads vs Facebook Ads: Which Is Better for Your Busine...',
      description: 'Understand the core differences between Google Ads and Facebook Ads to make...',
      tags: ['Google Ads', 'Facebook Ads']
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
      <Navbar />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-linear(rgba(0,0,0,.02)_1px,transparent_1px),linear-linear(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-linear(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32">
        {/* Header */}
        <header className="text-center mb-20 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-linear-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-full text-sm font-semibold text-purple-700 backdrop-blur-sm">
              ✨ Latest Insights
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium uppercase mb-6 bg-linear-to-r from-slate-900 via-purple-700 to-pink-600 text-transparent bg-clip-text leading-tight">
            Discover Our Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore the latest trends, insights, and strategies to grow your business
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className="group relative bg-white backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200 hover:border-purple-300 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(blog.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* linear overlay on hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${blog.categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>

              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r ${blog.categoryColor} rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
                    </svg>
                    {blog.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Date & Read Time */}
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {blog.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                  {blog.title}
                </h2>

                {/* Description */}
                <p className="text-slate-600 line-clamp-2 leading-relaxed">
                  {blog.description}
                </p>

                {/* Read More Button */}
                <div className="pt-4">
                  <button className="group/btn inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300">
                    <span>Read More</span>
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-medium text-slate-700 transition-colors duration-300 cursor-pointer border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated border linear */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-r ${blog.categoryColor} opacity-10 blur-xl`}></div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
            <span className="relative z-10">Load More Articles</span>
            <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-stagger > * {
          animation: fade-in 0.6s ease-out backwards;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}