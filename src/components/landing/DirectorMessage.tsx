import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const DirectorMessage = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-[#003366] flex flex-col md:flex-row-reverse relative z-0">
        
        {/* Image Section - Flipped to the Right */}
        <div className="md:w-1/3 bg-gray-50 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden px-4 border-l border-gray-200">
          <div className="w-48 h-56 relative rounded-2xl border-4 border-[#003366] shadow-lg overflow-hidden mb-6 z-10 bg-white">
            <Image 
              src="/noavatar.jpg" 
              alt="Director Name"
              fill
              className="object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-[#003366] tracking-wider z-10">
            [DIRECTOR NAME]
          </h3>
          <p className="text-amber-500 font-semibold uppercase tracking-widest mt-1 z-10">
            Director
          </p>
        </div>

        {/* Text Section */}
        <div className="md:w-2/3 p-8 md:p-12 lg:p-16 relative">
          <FontAwesomeIcon 
            icon={faQuoteRight} 
            className="absolute bottom-6 right-6 text-7xl text-gray-100 -z-10" 
          />
          
          <h2 className="text-xl md:text-2xl font-bold text-amber-500 mb-8 uppercase tracking-wide">
            Vision from the Director
          </h2>
          
          <div className="text-gray-700 text-md text-justify space-y-4">
            <p>
              Our institution stands on the pillars of tradition and modern educational practices. Our vision has always been to build an ecosystem where young minds can thrive without barriers.
            </p>
            <p>
              We are constantly upgrading our infrastructure and methodologies to ensure our students are prepared for the challenges of tomorrow. Education is an evolving journey, and our commitment to excellence remains unwavering.
            </p>
            <p>
              I invite you to be a part of our growing community and witness the transformation of our future leaders.
            </p>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="font-bold text-[#003366] text-xl font-rancho">
              [Director Name]
            </p>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
              Patna Muslim High School
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DirectorMessage;