'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '@/context/languageContext';  // ✅ Your path
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HospitalsSection from '@/components/hospitals';
import MedicalTreatmentsPage from '@/components/Treatments';
import DoctorsSection from '@/components/doctors';
import MuftMadadBlogs from '@/components/Blogs';
import DynamicTestimonialSection from '@/components/dynamicTestimonials';

const HeroContent = () => {
    const { lang } = useLanguage();
    const params = useParams();

    // ✅ EXACT SAME LOGIC FROM YOUR WORKING CITYPAGE
    const cityFromUrl = params?.city
        ? decodeURIComponent(params.city)
        : "मुरादाबाद";

    // ✅ Local state like your CityPage (fixes SSR issue)
    const [selectedCity, setSelectedCity] = React.useState(cityFromUrl);

    // ✅ EXACT SAME CITY TRANSLATION FROM YOUR CITYPAGE
    const cityTranslation = {
        "मुरादाबाद": "Moradabad",
        "चंदौसी": "Chandausi",
        "अमरोहा": "Amroha",
        "बिलारी": "Bilari"
    };

    // ✅ EXACT SAME getTranslatedCity() FUNCTION FROM YOUR CITYPAGE
    const getTranslatedCity = () => {
        return lang === 'en' ? cityTranslation[selectedCity] : selectedCity;
    };

    // ✅ HeroData using your proven logic
    const HeroData = {
        en: {
            title: `Ayushman Bharat with Muft Madad`,
            subtitle: `Get Yourself Treated in ${getTranslatedCity()} For Free`,
            points: [
                'Free OPD',
                'Up to 60% discount on diagnostics',
                'Ground level assistance by Muft Madad Saathi',
                'Post-surgery care and support'
            ],
            button: 'Call Now'
        },
        hi: {
            title: 'मुफ्त मदद के साथ अयुष्मान भारत',
            subtitle: `${getTranslatedCity()} में अपना इलाज मुफ्त में करवाएं`,
            points: [
                'मुफ्त ओपीडी',
                'डायग्नोस्टिक्स पर 60% तक की बचत',
                'मुफ्त मदद साथी द्वारा जमीनी स्तर पर सहायता',
                'सर्जरी के बाद देखभाल और सहायता'
            ],
            button: 'अभी कॉल करें'
        }
    };

    const content = HeroData[lang];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-20 lg:mt-26">
            <Navbar />
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6 sm:space-y-8">
                    <h1 className="text-4xl font-serif font-medium uppercase text-gray-900 leading-tight tracking-widest">
                        {content.title}
                        <br />
                        {content.subtitle.replace('{city}', <span className="text-red-600">{getTranslatedCity()}</span>)}
                    </h1>

                    <ul className="space-y-3 sm:space-y-4">
                        {content.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 sm:gap-3">
                                <span className="text-xl sm:text-2xl mt-1">▸</span>
                                <span className="text-base sm:text-lg md:text-xl text-gray-700">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <a href="tel:+917088440387" className="w-full sm:w-auto">
                        <button className="flex cursor-pointer items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-md transition shadow-md text-base sm:text-lg w-full sm:w-auto justify-center">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>{content.button}</span>
                        </button>
                    </a>
                </div>

                {/* Right Image */}
                <div className="relative mt-8 lg:mt-0">
                    <img
                        src="/HeroImage.png"
                        alt="Happy family"
                        className="w-full h-auto rounded-lg shadow-xl"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3EFamily Image%3C/text%3E%3C/svg%3E';
                        }}
                    />
                </div>
            </div>



            {/* // ABOUT SECTION  DYNAMIC */}


            <section className="bg-slate-700 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-left">
                        moradabad
                    </h2>
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p className="text-gray-100">

                            content line 1
                        </p>
                        <p className="text-gray-100">
                            content line 2
                        </p>
                    </div>
                </div>
            </section>


            {/* HOSPITALS SECTION DYNAMIC SORT CITY NAME */}
            <HospitalsSection />

            {/* Treatment Section */}
            <MedicalTreatmentsPage />

            {/* DOCTORS SECTION DYNAMIC SORT CITY NAME */}

            <DoctorsSection />

            {/* BLOGS DYNAMIC BUT SAME FOR ALL */}

            <MuftMadadBlogs />

             {/* Dynamic Testimonial same for all */}
             
            <DynamicTestimonialSection />



        </main>


    );
};

export default HeroContent;
