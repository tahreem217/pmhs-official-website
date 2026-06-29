import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const AdminMessage = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24">
      
      {/* Main Card Container */}
      <div className="bg-white rounded-3xl shadow-2xl relative pt-20 pb-12 px-8 md:px-16 border-t-8 border-[#003366] border-b-8 border-amber-400">
        
       
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="min-w-44 h-44 relative rounded-full border-8 border-white shadow-xl overflow-hidden bg-white">
            <Image 
              src="/noavatar.jpg" 
              alt="Administrative Officer"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Titles */}
        <div className="text-center mb-10 mt-6">
          <h3 className="text-3xl font-bold text-[#003366] tracking-wider uppercase">
            [Admin Name]
          </h3>
          <p className="text-amber-500 font-bold uppercase tracking-widest mt-2">
            Administrative Officer
          </p>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Message Content */}
        <div className="relative">
          {/* Subtle Background Quote Icons */}
          <FontAwesomeIcon 
            icon={faQuoteLeft} 
            className="absolute -top-4 -left-4 md:-left-8 text-4xl text-gray-100 -z-10" 
          />
          <FontAwesomeIcon 
            icon={faQuoteRight} 
            className="absolute -bottom-4 -right-4 md:-right-8 text-4xl text-gray-100 -z-10" 
          />

          <div className="text-gray-700 text-lg text-center md:text-justify space-y-5 px-4 md:px-8 z-10 relative">
            <p>
              The backbone of any successful educational institution lies in its daily operations. Our administration team works tirelessly to ensure that our campus remains a safe, efficient, and welcoming environment for all 500+ students and our dedicated staff.
            </p>
            <p>
              We believe in transparent communication and streamlined processes. Whether it is managing admissions, coordinating campus events, or ensuring our facilities meet the highest standards, our door is always open to assist parents and students alike.
            </p>
            <p className="font-semibold text-[#003366] text-center pt-4">
              We are here to support your educational journey every step of the way.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdminMessage;