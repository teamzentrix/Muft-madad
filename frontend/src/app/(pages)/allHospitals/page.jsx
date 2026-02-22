import React from 'react';
import Navbar from '@/components/Navbar';
// Hospital data
const hospitals = [
    {
        id: 1,
        name: "City Care Hospital",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b9af9ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        isPartner: true,
        address: "123, Main Street, Near Central Park, New York, NY 10001",
        timings: "Open 24 Hours",
        description: "A leading healthcare provider with state-of-the-art facilities and experienced doctors.",
        rating: 4.5,
        votes: 120,
        phone: "+1 234 567 8900"
    },
    {
        id: 2,
        name: "Green Valley Medical Center",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        isPartner: true,
        address: "456, Elm Avenue, Silicon Valley, CA 94000",
        timings: "Mon - Sat: 9:00 AM - 9:00 PM",
        description: "Providing comprehensive medical services with a focus on patient care and comfort.",
        rating: 4.2,
        votes: 85,
        phone: "+1 987 654 3210"
    },
    {
        id: 3,
        name: "Sunrise General Hospital",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        isPartner: false,
        address: "789, Oak Drive, Suburbia, TX 75000",
        timings: "Open 24 Hours",
        description: "Emergency care and specialized treatments available round the clock.",
        rating: 4.0,
        votes: 200,
        phone: "+1 555 123 4567"
    },
    {
        id: 4,
        name: "Hope Wellness Clinic",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        isPartner: true,
        address: "321, Pine Lane, Metropolis, IL 60000",
        timings: "Mon - Fri: 8:00 AM - 8:00 PM",
        description: "Dedicated to holistic wellness and preventive healthcare solutions.",
        rating: 4.8,
        votes: 50,
        phone: "+1 444 555 6666"
    },
    {
        id: 5,
        name: "Blue Cross Memorial",
        image: "https://images.unsplash.com/photo-1516574187841-693018e63272?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        isPartner: true,
        address: "654, Maple Street, Smallville, KS 66000",
        timings: "Open 24 Hours",
        description: "Advanced diagnostics and surgical procedures by top specialists.",
        rating: 4.6,
        votes: 150,
        phone: "+1 777 888 9999"
    },
    {
        id: 6,
        name: "Community Health Hub",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        isPartner: false,
        address: "987, Cedar Road, Galaxy City, FL 33000",
        timings: "Mon - Sat: 10:00 AM - 10:00 PM",
        description: "Accessible and affordable healthcare for the entire community.",
        rating: 3.9,
        votes: 75,
        phone: "+1 222 333 4444"
    }
];

// HospitalCard Component
const HospitalCard = ({ hospital }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden card-shadow border border-gray-100 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                />
                {hospital.isPartner && (
                    <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified Partner
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {hospital.rating}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{hospital.name}</h3>

                    <div className="flex items-start gap-1 text-sm text-gray-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-2">{hospital.address}</span>
                    </div>

                    <div className='flex items-center gap-4 text-xs font-medium text-blue-600 mb-3'>
                        <a href="#" className="hover:underline flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 01-.894-.894L15 7m0 13V7" />
                            </svg>
                            Get Directions
                        </a>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{hospital.timings}</span>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {hospital.description}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100 gap-3">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Call Now
                    </button>
                    <button className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 text-sm font-bold py-2 px-4 rounded transition-colors text-center">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

// HospitalList Component
const HospitalList = () => {
    return (
        <div className="container mx-auto px-4 py-35">
            <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase font-medium font-serif bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-16 text-center">Top Rated Hospitals Near You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {hospitals.map((hospital) => (
                    <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
            </div>
        </div>
    );
};

// Main App Component
function App() {
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <main>
                <Navbar />
                <HospitalList />
            </main>
        </div>
    );
}

export default App;