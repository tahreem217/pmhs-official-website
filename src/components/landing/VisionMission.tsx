import React from "react";
import { FaBullseye, FaCompass } from "react-icons/fa6";

const MissionVision = () => {
  return (
    <section className="w-full max-w-[90%] mx-auto px-4 py-10">
      
      <div className="bg-[#FCFFF7] p-6 md:p-10 rounded-2xl shadow-xl flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-12">
        
        
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-[#003366] uppercase">
              Our Mission
            </h3>
            <FaBullseye size={28} className="text-[#003366]" />
          </div>
          <p className="text-gray-700   leading-relaxed md:leading-loose text-base md:text-lg">
            Our mission is to provide quality education to all students, promoting
            inclusion of every section of society. We focus on the overall
            development of each child, nurturing academic skills, creativity, and
            moral values. By fostering discipline, empathy, and social
            responsibility, we aim to prepare students to become compassionate,
            responsible citizens. Through a safe and supportive environment, we
            empower young minds to grow, learn, and contribute positively to
            society.
          </p>
        </div>

        {/* Responsive Divider (Horizontal on mobile, Vertical on desktop) */}
        <div className="hidden lg:block w-px bg-gray-300"></div>
        <div className="block lg:hidden w-[80%] mx-auto h-px bg-gray-300"></div>

        {/* Vision Section */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-[#003366] uppercase">
              Our Vision
            </h3>
            <FaCompass size={28} className="text-[#003366]" />
          </div>
          <p className="text-gray-700   leading-relaxed md:leading-loose text-base md:text-lg">
            Our vision is to be a center of excellence in education, fostering an inclusive environment where every student can thrive. We aspire to nurture knowledge, creativity, and critical thinking while instilling strong moral values. By promoting holistic growth, equality, and social responsibility, we aim to develop confident, compassionate individuals who contribute positively to society and emerge as responsible leaders capable of meeting the challenges of the future.
          </p>
        </div>

      </div>

    </section>
  );
};

export default MissionVision;