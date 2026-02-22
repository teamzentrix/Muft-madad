"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/languageContext'; // ✅ Language sync

export default function OurSpecialities() {
  const router = useRouter();
  const { lang } = useLanguage(); // ✅ Real-time language from Navbar

  // ✅ Bilingual data
  const specialities = lang === 'en' ? [
    {
      id: 'नेत्र-रोग',
      title: "Ophthalmology",
      image: "https://i.pinimg.com/736x/30/65/a5/3065a5f4d06e2d4130a33ab30859d66e.jpg",
      description: "Ophthalmology deals with eye health. It treats diseases affecting vision including cataracts, glaucoma & retinal disorders. Ophthalmologists specialize in"
    },
    {
      id: 'हड्डी-रोग',
      title: "Orthopedics",
      image: "https://i.pinimg.com/1200x/f0/7d/6c/f07d6c3299d53f64b121d4370d70a470.jpg",
      description: "Orthopedics treats bones, muscles & joints. Orthopedic surgeons handle fractures, arthritis, joint replacements & sports injuries."
    },
    {
      id: 'न्यूरोलॉजी',
      title: "Neurology",
      image: "https://i.pinimg.com/736x/d5/db/97/d5db97047368a3377c278b23220f287b.jpg",
      description: "Neurology focuses on nervous system disorders including brain, spinal cord & peripheral nerves. Neurologists treat stroke, epilepsy & Parkinson's."
    },
    {
      id: 'बाल-रोग',
      title: "Pediatrics",
      image: "https://i.pinimg.com/1200x/5c/63/6e/5c636e58b41306ec4bf76593d47d7e61.jpg",
      description: "Pediatrics specializes in newborn, children & adolescent health. Pediatricians provide preventive care, vaccinations & treat childhood illnesses."
    },
    {
      id: 'नाक-कान-गला',
      title: "ENT",
      image: "https://i.pinimg.com/736x/e1/18/ee/e118eeaa6236ecb903fe4e7be5277eab.jpg",
      description: "ENT specialists treat ear, nose & throat disorders including sinusitis, hearing loss, tonsillitis & head-neck cancers."
    },
    {
      id: 'स्त्री-रोग',
      title: "Gynecology",
      image: "https://i.pinimg.com/736x/4b/46/9f/4b469fed044353411b6509736fb716c7.jpg",
      description: "Gynecology treats female reproductive health issues including menstrual disorders, infertility, PCOS & gynecological cancers."
    },
    {
      id: 'हृदय-रोग',
      title: "Cardiology",
      image: "https://i.pinimg.com/736x/85/fc/1a/85fc1aa4f7679778ba0788881568a8e1.jpg",
      description: "Cardiology specializes in heart & blood vessel disorders. Cardiologists treat coronary artery disease, heart failure & arrhythmias."
    },
    {
      id: 'गुदा-रोग',
      title: "Proctology",
      image: "https://i.pinimg.com/736x/9d/3b/07/9d3b0778fb1b8dcb00e897f29398a41d.jpg",
      description: "Proctology treats anal, rectal & colon disorders including piles, fissures, fistulas & colorectal cancers."
    },
    {
      id: 'मूत्र-रोग',
      title: "Urology",
      image: "https://i.pinimg.com/736x/8a/c9/49/8ac9499ed38a17963d72cca1b3038a8f.jpg",
      description: "Urology treats urinary tract disorders in men & women. Urologists handle kidney stones, prostate issues & urinary infections."
    },
    {
      id: 'लेप्रोस्कोपी',
      title: "Laparoscopy",
      image: "https://i.pinimg.com/736x/09/b8/ae/09b8aec0283cee658c251408c6df7953.jpg",
      description: "Laparoscopy (keyhole surgery) treats abdominal conditions minimally invasively. Laparoscopic surgeons perform gallbladder, appendix & hernia surgeries."
    }
  ] : [
    // Original Hindi data (unchanged)
    { id: 'नेत्र-रोग', title: "नेत्र रोग", image: "https://i.pinimg.com/736x/30/65/a5/3065a5f4d06e2d4130a33ab30859d66e.jpg", description: "नेत्रऔषधि विज्ञान चिकित्सा, आँखों के स्वास्थ्य से सम्बंधित होती है। इसके अंतर्गत ऐसी बीमारियाँ है जो आँखों को प्रभावित कर सकती हैं। एक नेत्र विशेषज्ञ" },
    { id: 'हड्डी-रोग', title: "हड्डी रोग", image: "https://i.pinimg.com/1200x/f0/7d/6c/f07d6c3299d53f64b121d4370d70a470.jpg", description: "अर्थोपेडिक एक चिकित्सा विभाग है जिसमें हड्डियों, मांसपेशियों, जोड़ों से संबंधित बीमारियों का इलाज होता है। इस विभाग के अंतर्गत विशेषज्ञ को अर्थोपेडिषियन" },
    { id: 'न्यूरोलॉजी', title: "न्यूरोलॉजी", image: "https://i.pinimg.com/736x/d5/db/97/d5db97047368a3377c278b23220f287b.jpg", description: "न्यूरोलॉजी चिकित्सा की एक शाखा है जो तंत्रिका तंत्र के विकारों के निदान और उपचार पर केंद्रित है, जिसमें मस्तिष्क, रीढ की हड्डी और परिधीय तंत्रिकाऐं श" },
    { id: 'बाल-रोग', title: "बाल रोग", image: "https://i.pinimg.com/1200x/5c/63/6e/5c636e58b41306ec4bf76593d47d7e61.jpg", description: "बाल रोग चिकित्सा (Pediatrics) एक चिकित्सा शाखा है जो नवजात शिशुओं, बच्चों और किशोरों के स्वास्थ्य पर ध्यान केंद्रित करती है। एक बाल रोग विशेषज्ञ बच्चों" },
    { id: 'नाक-कान-गला', title: "नाक कान गला", image: "https://i.pinimg.com/736x/e1/18/ee/e118eeaa6236ecb903fe4e7be5277eab.jpg", description: "ईएनटी का मतलब कान, नाक और गला होता है। कान, नाक और गले से संबंधित बीमारियों का इलाज करने वाले डॉक्टर को ईएनटी विशेषज्ञ कहा जाता है। कान, नाक और गला श" },
    { id: 'स्त्री-रोग', title: "स्त्री रोग", image: "https://i.pinimg.com/736x/4b/46/9f/4b469fed044353411b6509736fb716c7.jpg", description: "स्त्री रोग चिकित्सा की ऐसी शाखा है जिसमें महिला प्रजनन से संबंधित रोगों का इलाज और रोकथाम किया जाता है। स्त्री रोग विज्ञान के अंतर्गत, कई बीजे शामिल" },
    { id: 'हृदय-रोग', title: "हृदय रोग", image: "https://i.pinimg.com/736x/85/fc/1a/85fc1aa4f7679778ba0788881568a8e1.jpg", description: "कार्डियोलॉजी एक चिकित्सा क्षेत्र है जो हदय और रक्त वाहिकाओं के विकारों के निदान और उपचार पर केंद्रित है। इसमें कोरोनरी धमनी रोग, हदय ताल विकार और इ" },
    { id: 'गुदा-रोग', title: "गुदा रोग", image: "https://i.pinimg.com/736x/9d/3b/07/9d3b0778fb1b8dcb00e897f29398a41d.jpg", description: "प्रोक्टोलॉजी चिकित्सा की एक विशेष शाखा है जिसमें गुदा से संबंधित बीमारियों का रोकथाम, इलाज और उपचार किया जाता है। इसमें मलाशय, बृहदान्त्र और गुदे से" },
    { id: 'मूत्र-रोग', title: "मूत्र रोग", image: "https://i.pinimg.com/736x/8a/c9/49/8ac9499ed38a17963d72cca1b3038a8f.jpg", description: "मूत्रलोजी एक चिकित्सा शाखा है जिसमें पुरूष और महिलाओं के मूत्र तंत्र से संबंधित बीमारियों का इलाज होता है। इस विभाग के डॉक्टर को मुरोलाजिस्ट कह" },
    { id: 'लेप्रोस्कोपी', title: "लेप्रोस्कोपी", image: "https://i.pinimg.com/736x/09/b8/ae/09b8aec0283cee658c251408c6df7953.jpg", description: "लेप्रोस्कोपी, जिसे मिनिमल सर्जरी भी कहा जाता है, सर्जिकल, पिन को पुरी और एप्डोमिनइस्कोपी जैसी स्थितियों के इलाज के लिए एक कागजी अत्तरदार प्रक्रिया है। इसे" }
  ];

  const handleSpecialityClick = (specialityId) => {
    router.push(`/speciality/${encodeURIComponent(specialityId)}?lang=${lang}`);
  };

  // ✅ Dynamic page title
  const pageTitle = lang === 'en' ? 'Our Medical Specialties' : 'हमारी चिकित्सा विशेषताएँ';

  return (
    <div className="pb-14 pt-0 lg:pt-14 px-4 sm:px-6 lg:px-8">
      {/* Header spacing for fixed navbar */}
      <div className="h-20 sm:h-24 md:h-28 lg:hidden"></div>

      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-medium font-serif bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            {pageTitle}
          </h1>
          <p className="text-md md:text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Expert care in 10+ medical specialties with free consultations & up to 80% surgery discounts'
              : '10+ चिकित्सा विशेषताओं में विशेषज्ञ देखभाल, निःशुल्क परामर्श व 80% तक सर्जरी छूट'
            }
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {specialities.map((speciality, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-32 sm:h-36 lg:h-40">
                <img
                  src={speciality.image}
                  alt={speciality.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                  {speciality.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                  {speciality.description}
                </p>

                <button
                  onClick={() => handleSpecialityClick(speciality.id)}
                  className="w-full group/btn flex items-center justify-center gap-1.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50 group-hover/btn:scale-105 cursor-pointer"
                >
                  <span>{lang === 'en' ? 'Learn More' : 'विस्तार से जानें'}</span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
