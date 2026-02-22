import Footer from '@/components/Footer'
import Herosection from '@/components/Herosection'
import HospitalsSection from '@/components/hospitals'
import Navbar from '@/components/Navbar'
import OurSpecialities from '@/components/Specialities'
import PatientTestimonials from '@/components/Testimonials'
import MedicalTreatmentsPage from '@/components/Treatments'
import WhyChooseMuftMadad from '@/components/Whychoose'
import React, { Fragment } from 'react'

const page = () => {
  return (
    <Fragment>
      <Navbar />
      <Herosection />
      <MedicalTreatmentsPage />
      <OurSpecialities />
      <WhyChooseMuftMadad />
      <PatientTestimonials />
      <HospitalsSection />
      <Footer />
    </Fragment>
  )
}

export default page