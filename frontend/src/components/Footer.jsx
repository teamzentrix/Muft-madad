"use client";
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/languageContext';
import Link from 'next/link';

export default function Footer() {
  const { lang } = useLanguage();

  // ✅ Bilingual data - organized
  const data = lang === 'en' ? {
    citiesTitle: "Cities",
    cities: ["Moradabad", "Chandausi", "Amroha", "Bilari"],
    specialitiesTitle: "Specialties",
    specialities: ["Eye", "Dental", "Urology", "Orthopedics", "ENT", "Neurology", "Pediatrics"],
    diseasesTitle: "Diseases",
    diseases: ["PCNL", "Knee Replacement", "Uterus", "Cataract", "Kidney Disease", "Hernia"],
    companyTitle: "Company",
    company: ["About Us", "Terms", "Privacy", "Sitemap"],
    readMoreTitle: "Read More",
    readMore: ["Testimonials", "Blogs"],
    treatmentsTitle: "Treatments",
    treatments: ["Hospitals", "Doctors"],
    contactTitle: "Contact",
    followUs: "FOLLOW US",
    subscribeUs: "SUBSCRIBE US",
    email: "care@medpho.com",
    phone: "88569-88569",
    address: "Telemed Technologies Pvt Ltd\nFlat No. 1101, 22 KG Marg\nNew Delhi - 110001",
    rights: "© 2026 Muft Madad. All rights reserved."
  } : {
    citiesTitle: "शहर",
    cities: ["मुरादाबाद", "चंदौसी", "अमरोहा", "बिलारी"],
    specialitiesTitle: "विशेषताएँ",
    specialities: ["नेत्र रोग", "दांतों", "मूत्र रोग", "हड्डी रोग", "नाक कान गला", "न्यूरोलॉजी", "बाल रोग"],
    diseasesTitle: "बीमारियाँ",
    diseases: ["PCNL", "घुटना प्रत्यारोपण", "गर्भाशय", "मोतियाबिंद", "क्रोनिक किडनी रोग", "हर्निया"],
    companyTitle: "हमारी कंपनी",
    company: ["हमारे बारे में", "नियम और शर्तें", "प्राइवेसी पॉलिसी", "साइटमैप"],
    readMoreTitle: "और पढ़ें",
    readMore: ["मरीजों की राय", "ब्लॉग्स"],
    treatmentsTitle: "उपचार",
    treatments: ["हमारे अस्पताल", "हमारे डॉक्टर"],
    contactTitle: "संपर्क करें",
    followUs: "हमें फॉलो करें",
    subscribeUs: "सब्सक्राइब करें",
    email: "care@medpho.com",
    phone: "88569-88569",
    address: "टेलीमेड टेक्नोलॉजीज़ प्रा. लि.\nफ्लैट नं. 1101, 22 केजी मार्ग\nनई दिल्ली – 110001",
    rights: "© 2024 मुफ्त मदद. सर्वाधिकार सुरक्षित."
  };

  return (
    <footer className="bg-linear-to-b from-[#2c3e50] to-[#1a252f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-6">

          {/* Cities Column */}
          <div>
            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide text-gray-300">{data.citiesTitle}</h3>
            <ul className="space-y-2.5">
              {data.cities.map((item, index) => (
                <li key={index}>
                  {/* <Link href={`/city/${encodeURIComponent(item)}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link> */}
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties Column */}
          <div>
            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide text-gray-300">{data.specialitiesTitle}</h3>
            <ul className="space-y-2.5">
              {data.specialities.map((item, index) => (
                <li key={index}>
                  {/* <a href={`/speciality/${encodeURIComponent(item)}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a> */}
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Diseases Column */}
          <div>
            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide text-gray-300">{data.diseasesTitle}</h3>
            <ul className="space-y-2.5">
              {data.diseases.map((item, index) => (
                <li key={index}>
                  {/* <a href={`/disease/${encodeURIComponent(item)}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a> */}
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Treatments Column */}
          <div>
            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide text-gray-300">{data.companyTitle}</h3>
            <ul className="space-y-2.5 mb-6">
              {data.company.map((item, index) => (
                <li key={index}>
                  {/* <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a> */}
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide text-gray-300">{data.treatmentsTitle}</h3>
            <ul className="space-y-2.5">
              {data.treatments.map((item, index) => (
                <li key={index}>
                  {/* <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a> */}
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Subscribe Column */}
          <div>
            {/* Follow Us */}
            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide text-gray-300">{data.followUs}</h3>
            <div className="flex gap-3 mb-8">
              <a href="#" className="w-9 h-9 bg-[#1DA1F2] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Twitter">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-[#0077B5] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-[#3b5998] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Facebook">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-500 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Instagram">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-[#0088cc] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Telegram">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>

            {/* Subscribe */}
            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide text-gray-300">{data.subscribeUs}</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="E-mail"
                className="flex-1 px-4 py-2.5 bg-[#1a252f] border border-gray-600 text-gray-300 text-sm focus:outline-none focus:border-gray-500 rounded-l"
              />
              <button
                className="px-6 py-2.5 bg-[#e74c3c] hover:bg-[#c0392b] text-white transition-colors rounded-r"
                aria-label="Subscribe"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <p className="text-sm text-gray-400 text-center">
            {data.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
