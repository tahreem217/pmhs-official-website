import React from "react";
import Image from "next/image"; 
export const metadata = {
  title: "Facilities | PMHS",
};
const facilitiesData = [
    {
      title: "Sports & Athletics",
      image: "/pmhs-sports.jpeg",
      description: "Celebrating our state-level badminton champions and fostering physical fitness through dedicated sports programs and coaching."
    },
    {
        title: "Classrooms",
        image: "/pmhs-classroom.jpeg",
        description: "Bright, well-ventilated learning spaces designed to encourage focus, collaboration, and student-teacher interaction."
      },
      {
        title: "Computer Laboratory",
        image: "/pmhs-comp-lab.jpeg",
        description: "Equipped with high-speed internet and modern systems to teach coding, digital literacy, and modern software skills."
      },
      {
        title: "Chemistry Lab ",
        image:"/pmhs-chem-lab.jpeg",
        description: "A safe, fully equipped environment where students perform hands-on experiments to understand complex chemical reactions."
      },
      {
        title: "Physics Laboratory",
        image:"/pmhs-phy-lab.jpeg",
        description: "State-of-the-art equipment for mechanics, optics, and electronics experiments to bring physical theories to life."
      },
      {
        title: "Biology Laboratory",
        image: "/pmhs-biolab.jpeg",
        description: "An interactive space featuring modern microscopes and biological specimens, allowing students to explore the intricacies of life sciences."
      },
      {
        title: "School Library",
        image: "/pmhs-library.jpeg",
        description: "A vast collection of academic texts, journals, and literature providing a quiet, focused atmosphere for reading and research."
      },
      {
        title: "Prayer Hall",
        image: "/pmhs-prayer-hall.jpeg",
        description: "A serene and spacious hall dedicated to daily prayers, fostering spiritual growth and providing a peaceful retreat for reflection."
      },
      {
        title: "NCC Training",
        image: "/pmhs-ncc.jpeg",
        description: "Instilling discipline, leadership, and patriotism through our active National Cadet Corps (NCC) division."
      },
      {
        title: "Principal's Office",
        image: "/pmhs-principal-room.jpeg",
        description: "The administrative heart of the school, maintaining an open-door policy for parents and student guidance."
      },
      {
        title: "Smart Classrooms",
        image: "/pmhs-smartboard.jpeg",
        description: "Next-generation classrooms featuring interactive digital smartboards, making learning highly visual and engaging."
      }
];
const Facilities = () => {
    return (
      <div className="w-full bg-slate-50 min-h-screen pt-10 pb-24 px-4 md:px-10">
        <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#42426F] mb-4">
          Explore Our Campus
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Take a look inside the facilities that provide our students with a well-rounded, modern, and engaging educational experience.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {facilitiesData.map((facility, index) => (
         
          <div 
            key={index} 
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
          >
      
            <div className="relative w-full h-48 md:h-56 overflow-hidden bg-slate-200">
              <Image 
                src={facility.image} 
                alt={facility.title} 
                fill // Replaces layout="fill", dynamically fits the container
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                
              />
            </div>

            
            <div className="p-6 flex flex-col flex-grow">
              
              <div className="w-10 h-1 bg-amber-400 rounded-full mb-3"></div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">
                {facility.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {facility.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    )
}

export default Facilities;