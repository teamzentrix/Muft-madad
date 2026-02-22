import React from 'react';
import { Star, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {testimonial.name}
          </h3>
          <p className="text-xs text-gray-500">
            Treatments: {testimonial.treatment}
          </p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <div className="flex-1 mb-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          "{testimonial.text}"
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Cities: {testimonial.city}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{testimonial.date}</span>
        </div>
      </div>
    </div>
  );
};

export default function DynamicTestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Papu",
      treatment: "Kidney Stones",
      rating: 5,
      text: "Mere pet me ashniya dard hota tha fir maine gaw ke doctor ko dikhaya phir mujhe ptaa chala ki mera gurud mae problem hai. Gaw ke doctor ne mujhe mepho kaa help line number diya. Medpho ki team ne mujhe hospital ki list diya aur maine ek hospital select karke mepho ki madad se ilaj karaya aur mae aaj bilkul sawsth hu.",
      city: "Moradabad",
      date: "23/09/2024"
    },
    {
      id: 2,
      name: "Abdul",
      treatment: "Kidney Stones",
      rating: 5,
      text: "Mere papa ka ilaaz ayushman se bilkul muft me ho gaya, ek rupay bhi nhi lage. Iske alawa hum inki sevaon se bht kuch hai, asha krte hai medpho ese hi nek kaam krta rahe.",
      city: "Moradabad",
      date: "14/04/2023"
    },
    {
      id: 3,
      name: "Nafeez Ahmad",
      treatment: "Cataract",
      rating: 5,
      text: "Mae Medpho ki sahayata se gya tha ayushman card se ilaj karane. Bahut badhiya ilaj hua mera ek number kaa koi dikkat koi presani nhi aur ek bhu rupya nhi lgaa mera ilaj karane mae, sirf aane jane mae kiraya lga mera.",
      city: "Moradabad",
      date: "23/09/2024"
    },
    {
      id: 4,
      name: "Bintee jehraaa",
      treatment: "Cataract",
      rating: 4,
      text: "Mere abbu ki ankhon mein diikat thi unhe dekhne mae kathinyai hoti thi, Mere Pass mepho ka number tha koi dikkat thi maine call kiya aur mepho sathi ki madad ke wajh se mere aboo kaa safal motiybind ka operation hua aur ilaj mae koi dikkat prasani nhi hua.",
      city: "Moradabad",
      date: "23/09/2024"
    },
    {
      id: 5,
      name: "Rajesh Kumar",
      treatment: "Heart Surgery",
      rating: 5,
      text: "The treatment I received was exceptional. The doctors were very caring and professional. Medpho helped me throughout the entire process from booking to post-surgery care. I am grateful for their support.",
      city: "Delhi",
      date: "15/10/2024"
    },
    {
      id: 6,
      name: "Priya Sharma",
      treatment: "Diabetes Management",
      rating: 5,
      text: "Medpho made it so easy to find the right specialist for my diabetes. The entire process was smooth and the staff was very helpful. Highly recommended!",
      city: "Mumbai",
      date: "05/11/2024"
    }
  ];

  const [currentPage, setCurrentPage] = React.useState(0);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const displayedTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-12 px-4 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What Our Patients Say
          </h2>
          <p className="text-gray-600">
            Real experiences from real people
          </p>
          <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {displayedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Page Indicators */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentPage
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <p className="text-4xl font-bold text-blue-600 mb-2">5000+</p>
            <p className="text-gray-600">Happy Patients</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <p className="text-4xl font-bold text-green-600 mb-2">4.8/5</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <p className="text-4xl font-bold text-purple-600 mb-2">50+</p>
            <p className="text-gray-600">Cities Covered</p>
          </div>
        </div>
      </div>
    </section>
  );
}