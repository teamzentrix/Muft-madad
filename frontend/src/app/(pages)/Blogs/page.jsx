'use client';
import React from 'react';
import { Clock, User, ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';

const BlogCard = ({ blog }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Blog Image */}
      <div className="relative h-32 w-full overflow-hidden bg-gray-100">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-100 to-purple-100" />
        )}
        {/* Category Badge */}
        {blog.category && (
          <div className="absolute top-2 left-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium">
              {blog.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {blog.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden shrink-0">
              {blog.authorImage ? (
                <Image
                  src={blog.authorImage}
                  alt={blog.author}
                  width={20}
                  height={20}
                  className="object-cover"
                />
              ) : (
                <User className="w-3 h-3 m-1 text-gray-500" />
              )}
            </div>
            <span className="truncate">{blog.author}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Mastering UI Elements: A Practical Guide for Designers",
      description: "Dive into the world of user interfaces with our expert guides, latest trends, and practical tips.",
      image: "/blogs/ui-elements.jpg",
      author: "Jennifer Taylor",
      authorImage: "/authors/jennifer.jpg",
      readTime: "3 min read",
      category: "Design",
      date: "Nov 15, 2024"
    },
    {
      id: 2,
      title: "Crafting Seamless Experiences: The Art of Intuitive UI Design",
      description: "Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and intuitive experience.",
      image: "/blogs/seamless-ux.jpg",
      author: "Jennifer Taylor",
      authorImage: "/authors/jennifer.jpg",
      readTime: "5 min read",
      category: "UX Design",
      date: "Nov 14, 2024"
    },
    {
      id: 3,
      title: "Beyond Aesthetics: The Power of Emotional UX Design",
      description: "Delve into the realm of emotional design and discover how incorporating empathy and psychology can elevate user experiences.",
      image: "/blogs/emotional-ux.jpg",
      author: "Ryan A.",
      authorImage: "/authors/ryan.jpg",
      readTime: "2 min read",
      category: "Psychology",
      date: "Nov 13, 2024"
    },
    {
      id: 4,
      title: "The Future of Healthcare Technology: AI and Machine Learning",
      description: "Discover how artificial intelligence is transforming patient care and medical diagnostics in modern healthcare.",
      image: "/blogs/healthcare-ai.jpg",
      author: "Dr. Sarah Chen",
      authorImage: "/authors/sarah.jpg",
      readTime: "4 min read",
      category: "Technology",
      date: "Nov 12, 2024"
    },
    {
      id: 5,
      title: "Patient-Centric Care: Building Trust Through Communication",
      description: "Learn effective strategies for improving doctor-patient relationships and enhancing healthcare outcomes.",
      image: "/blogs/patient-care.jpg",
      author: "Michael Brown",
      authorImage: "/authors/michael.jpg",
      readTime: "6 min read",
      category: "Healthcare",
      date: "Nov 11, 2024"
    },
    {
      id: 6,
      title: "Telemedicine Revolution: Accessing Healthcare from Anywhere",
      description: "Explore how virtual consultations are making healthcare more accessible and convenient for patients worldwide.",
      image: "/blogs/telemedicine.jpg",
      author: "Emily Watson",
      authorImage: "/authors/emily.jpg",
      readTime: "3 min read",
      category: "Innovation",
      date: "Nov 10, 2024"
    },
    {
      id: 7,
      title: "Understanding Preventive Healthcare: Your Guide to Wellness",
      description: "Essential tips and strategies for maintaining optimal health through preventive care and regular check-ups.",
      image: "/blogs/preventive-care.jpg",
      author: "Dr. James Miller",
      authorImage: "/authors/james.jpg",
      readTime: "5 min read",
      category: "Wellness",
      date: "Nov 09, 2024"
    },
    {
      id: 8,
      title: "Mental Health Matters: Breaking the Stigma",
      description: "An in-depth look at mental health awareness and the importance of seeking professional support.",
      image: "/blogs/mental-health.jpg",
      author: "Lisa Anderson",
      authorImage: "/authors/lisa.jpg",
      readTime: "4 min read",
      category: "Mental Health",
      date: "Nov 08, 2024"
    },
    {
      id: 9,
      title: "Nutrition and Health: Eating Your Way to Better Wellness",
      description: "Comprehensive guide to understanding nutrition's role in disease prevention and overall health.",
      image: "/blogs/nutrition.jpg",
      author: "Chef Maria Garcia",
      authorImage: "/authors/maria.jpg",
      readTime: "7 min read",
      category: "Nutrition",
      date: "Nov 07, 2024"
    },
    {
      id: 10,
      title: "Exercise as Medicine: The Science Behind Physical Activity",
      description: "Discover the proven benefits of regular exercise and how it impacts your physical and mental health.",
      image: "/blogs/exercise.jpg",
      author: "Coach David Lee",
      authorImage: "/authors/david.jpg",
      readTime: "5 min read",
      category: "Fitness",
      date: "Nov 06, 2024"
    }
  ];

  const [currentPage, setCurrentPage] = React.useState(0);
  const blogsPerPage = 5;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const displayedBlogs = blogs.slice(
    currentPage * blogsPerPage,
    (currentPage + 1) * blogsPerPage
  );

  return (
    <section className="py-12 px-4 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Latest Articles & Insights
          </h2>
          <p className="text-gray-600">
            Stay updated with expert advice, health tips, and industry trends
          </p>
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-4"></div>
        </div>

        {/* Blog Grid - 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {displayedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  index === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <button className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2">
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}