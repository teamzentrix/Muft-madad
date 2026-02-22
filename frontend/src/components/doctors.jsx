import React from 'react';
import Image from 'next/image';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Card Content */}
            <div className="p-5">
                {/* Doctor Header */}
                <div className="flex items-start gap-3 mb-5">
                    {/* Doctor Image */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-gray-100">
                        {doctor.image ? (
                            <Image
                                src={doctor.image}
                                alt={doctor.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-blue-100 to-purple-100" />
                        )}
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-0.5 truncate">
                            {doctor.name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2 truncate">
                            {doctor.specialty}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-5 bg-gray-50 rounded-xl p-3">
                    <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">{doctor.experience}</p>
                        <p className="text-xs text-gray-500 mt-0.5">years experience</p>
                    </div>
                    <div className="text-center border-l border-gray-200">
                        <p className="text-xl font-bold text-gray-900">{doctor.consultations}+</p>
                        <p className="text-xs text-gray-500 mt-0.5">consultations</p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {doctor.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium border border-blue-100"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function DoctorsSection() {
    const doctors = [
        {
            id: 1,
            name: "Dr. Raghav Sharma",
            image: "/doctors/raghav-sharma.jpg",
            specialty: "Ayurveda Specialist",
            rating: "4.8",
            location: "Moradabad, India",
            experience: "17",
            consultations: "500",
            tags: ["Ayurveda", "Wellness", "Chronic Care"]
        },
        {
            id: 2,
            name: "Dr. Deepak Sah",
            image: "/doctors/deepak-sah.jpg",
            specialty: "General Surgeon",
            rating: "4.9",
            location: "Moradabad, India",
            experience: "12",
            consultations: "800",
            tags: ["General Surgery", "Laparoscopy"]
        },
        {
            id: 3,
            name: "Dr. Surbhi Sharma",
            image: "/doctors/surbhi-sharma.jpg",
            specialty: "Homeopathy Specialist",
            rating: "4.7",
            location: "Moradabad, India",
            experience: "9",
            consultations: "350",
            tags: ["Homeopathy", "Skin Care"]
        },
        {
            id: 4,
            name: "Dr. Pradeep Kumar",
            image: "/doctors/pradeep-kumar.jpg",
            specialty: "General Physician",
            rating: "4.8",
            location: "Moradabad, India",
            experience: "11",
            consultations: "600",
            tags: ["General Medicine", "Diabetes"]
        },
        {
            id: 5,
            name: "Dr. Ila Shah",
            image: "/doctors/ila-shah.jpg",
            specialty: "Anesthesiologist",
            rating: "5.0",
            location: "Moradabad, India",
            experience: "18",
            consultations: "950",
            tags: ["Anesthesia", "Pain Management"]
        }
    ];

    const [showAll, setShowAll] = React.useState(false);
    const displayedDoctors = showAll ? doctors : doctors.slice(0, 4);

    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium uppercase text-center font-meidum text-gray-900 mb-6">
                        Doctors In Moradabad
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 text-center">
                        Connect with experienced healthcare professionals
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                    {displayedDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>

                {/* View More Button */}
                {!showAll && doctors.length > 4 && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            View All Doctors
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}