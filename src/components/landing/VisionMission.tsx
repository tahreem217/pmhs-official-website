import React from "react";
import Image from "next/image";
import { FaBullseye, FaCompass, FaEye } from "react-icons/fa6";
const MissionVision = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4  py-10 ">
      
     
      <div className=" text-center bg-[#FCFFF7] p-8 md:p-8 lg:p-10 rounded-2xl shadow-xl  flex flex-col justify-center items-center  gap-4">
        
   
        <div  >
          <div className="flex items-center justify-center gap-2  mb-2">
            <h3 className=" text-xl md:text-3xl my-6  font-bold tracking-wide text-[#003366] uppercase">
              Our Mission
            </h3>
            <FaBullseye size={24} />
          </div>
          <p className="text-gray-700  text-center leading-loose  md:text-lg text-base  ">
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
        <div className="my-5  w-[80%] border bottom-t-0.5 border-gray-200"> </div>
        <div  >
          <div className="flex  items-center justify-center gap-2 mb-2">
            <h3 className=" text-xl md:text-3xl my-6 font-bold tracking-wide text-[#003366] uppercase">
            Our Vision
            </h3>
            <FaCompass size={24} />
          </div>
          <p className="text-gray-700 text-center  leading-loose  md:text-lg  text-base  ">
          Our vision is to be a center of excellence in education, fostering an inclusive environment where every student can thrive. We aspire to nurture knowledge, creativity, and critical thinking while instilling strong moral values. By promoting holistic growth, equality, and social responsibility, we aim to develop confident, compassionate individuals who contribute positively to society and emerge as responsible leaders capable of meeting the challenges of the future
          </p>
        </div>

       

      </div>

    </section>
  );
};

export default MissionVision;