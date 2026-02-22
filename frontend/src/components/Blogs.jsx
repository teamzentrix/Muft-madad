"use client";
import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/languageContext';

const BlogCard = ({ title, readTime, date, imageUrl, lang }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-blue-900 to-purple-900 text-white text-center py-2 text-sm font-semibold">
                    {lang === 'en' ? '#Just One Call 88569-88569' : '#बसएककॉल 88569-88569'}
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                    {title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{readTime} {lang === 'en' ? 'min read' : 'मिनट पढ़ें'}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <Calendar size={16} />
                    <span>{date}</span>
                </div>
                <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    {lang === 'en' ? 'Read More' : 'और पढ़ें'}
                </button>
            </div>
        </div>
    );
};

export default function MuftMadadBlogs() {
    const { lang } = useLanguage();

    const blogs = lang === 'en' ? [
        {
            title: "Uterine Fibroids: Symptoms, Causes, Treatment",
            readTime: "15",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80"
        },
        {
            title: "Post Piles Surgery: 3 Important Tips",
            readTime: "15",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
        },
        {
            title: "Cataract Surgery Types",
            readTime: "15",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=800&q=80"
        },
        {
            title: "Jaundice: Causes & Treatment",
            readTime: "15",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80"
        },
        {
            title: "Chronic Hepatitis B Symptoms",
            readTime: "14",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80"
        }
    ] : [
        {
            title: "बच्चेदानी में रसौली (Rasoli) होने के लक्षण, कारण, इलाज",
            readTime: "15",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80"
        },
        {
            title: "पाइल्स सर्जरी के बाद इन 3 बातों का रखें ध्यान",
            readTime: "15",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
        },
        {
            title: "Cataract Surgery: मोतियाबिंद सर्जरी के प्रकार",
            readTime: "15",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=800&q=80"
        },
        {
            title: "पीलिया (Jaundice) के कारण, लक्षण और इलाज",
            readTime: "15",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80"
        },
        {
            title: "क्रोनिक हेपेटाइटिस बी के कारण और लक्षण",
            readTime: "14",
            date: "28/05/2024",
            imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80"
        }
    ];

    const titleText = lang === 'en' ? 'Latest Blogs' : 'ब्लॉग्स';
    const buttonText = lang === 'en' ? 'See More Blogs' : 'और ब्लॉग देखें';

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-medium font-serif text-gray-900 mb-12 text-center">
                    {titleText}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {blogs.map((blog, index) => (
                        <BlogCard key={index} {...blog} lang={lang} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
