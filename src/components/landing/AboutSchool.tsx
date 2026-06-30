import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const AboutSchool = () => {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
    <div className="flex flex-col md:flex-row gap-12 items-center">
      
    
      <div className="w-full md:w-1/2 h-64 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 shadow-inner">
    <Image alt="" width={450} height={450} className="object-cover w-full rounded-xl  h-64" src="/pmhs-cbse-mainblock.png"/>
      </div>

 
      <div className="w-full md:w-1/2">
        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
          About Our School
        </h2>
        <h3 className="text-3xl font-bold text-slate-900 mb-4">
          A Foundation for Excellence
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Established with a commitment to accessible education, our school serves as a cornerstone for the local community. We believe in nurturing every student's potential through dedicated teaching, comprehensive facilities, and a supportive environment.
        </p>
        <p className="text-slate-600 mb-6 leading-relaxed">
          From foundational academics to extracurricular growth, we are proud to guide our students toward a bright and successful future.
        </p>
        <Link href="/about" className="text-blue-700 font-semibold hover:underline flex items-center gap-1">
          Learn more about our history →
        </Link>
      </div>

    </div>
  </section>

 
  )
}

export default AboutSchool
