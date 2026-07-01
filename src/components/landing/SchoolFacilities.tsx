import React from "react";
import Link from "next/link";
import { 
  FaChalkboardUser, 
  FaFlask, 
  FaBookOpen, 
  FaFutbol, 
  FaArrowRight 
} from "react-icons/fa6";

const HomeFacilities = () => {
  // Array of top facilities to feature on the home page
  const featuredFacilities = [
    {
      id: 1,
      title: "Smart Classrooms",
      description: "Equipped with interactive digital boards and ergonomic seating for an enhanced, technology-driven learning experience.",
      icon: <FaChalkboardUser size={36} className="text-purple-500" />,
    },
    {
      id: 2,
      title: "Advanced Science Labs",
      description: "State-of-the-art physics, chemistry, and biology laboratories to encourage practical learning and experimentation.",
      icon: <FaFlask size={36} className="text-red-500" />,
    },
    {
      id: 3,
      title: "Central Library",
      description: "A vast collection of academic books, journals, and digital resources to foster a culture of reading and research.",
      icon: <FaBookOpen size={36} className="text-yellow-500" />,
    },
    {
      id: 4,
      title: "Sports Complex",
      description: "Expansive playgrounds and indoor facilities to promote physical fitness and competitive sportsmanship.",
      icon: <FaFutbol size={36} className="text-green-500" />,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] uppercase tracking-wide text-center md:text-left">
            Our Facilities
          </h2>
          <p className="text-gray-600 mt-2 text-center md:text-left max-w-2xl">
            Providing a world-class environment designed to support academic excellence and holistic development.
          </p>
        </div>

        {/* View All Button */}
        <Link 
          href="/facilities" 
          className="group flex items-center gap-2 bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#002244] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View All Facilities
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredFacilities.map((facility) => (
          <div 
            key={facility.id} 
            className="bg-[#FCFFF7] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start border border-gray-100"
          >
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              {facility.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {facility.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm flex-grow">
              {facility.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default HomeFacilities;