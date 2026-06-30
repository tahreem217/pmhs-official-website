import React from "react";
import { 
  FaUserShield, 
  FaClock, 
  FaFileLines, 
  FaUsers,
  FaIdCard 
} from "react-icons/fa6";

export const metadata = {
    title: "Rules & Regulations | PMHS",
};

export default function RulesAndRegulationsPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 font-sans pb-24">
      
       <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-red-700 tracking-tight mb-4 uppercase">
            Rules & Regulations
          </h1>
          <p className="text-lg max-w-2xl text-gray-600 mx-auto font-medium">
            Code of Conduct and Guidelines designed to maintain discipline, academic excellence, and mutual respect across our campus community.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-3 space-y-8 relative z-10">
        
         <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-red-600"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-red-50 rounded-xl text-red-600 shrink-0">
              <FaUserShield size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">General Discipline</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>Students should arrive at the school before the first bell. If they arrive after the bell, they shall be sent back.</li>
                <li>When Student move along the corridors, or during the recess, they must walk in a perfect silence and in a single file.</li>
                <li>Great care must be taken not to litter the classroom, corridor or compound. They should use the bins to dump. Sweet wrappers, polythene bags, scraps etc.</li>
                <li>Cell phones/Mobile strictly prohibited/ banned during class hours. Use of all kinds of tobacco strictly prohibited in the school.</li>
                <li>Books other than text book not related to study should not be brought to school.</li>
                <li>Conduct contrary to discipline or against the reputation of the school will result in disciplinary action against the student.</li>
              </ul>
            </div>
          </div>
        </div>

         <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-blue-600"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <FaClock size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">Attendance & Promotion</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>Students with less than 75% attendance will not be eligible for promotion.</li>
                <li>No retest/re-exam is held for a Student who fails to appear for test/examination, without a grave reason/without approval of principal implies failure.</li>
              </ul>
            </div>
          </div>
        </div>

         <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-purple-600"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shrink-0">
              <FaIdCard size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">School Uniform & ID</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>All students must wear clean and neat uniform and properly polished shoes. Students without proper school uniform will not be allowed to stay in the school. They will be sent back home.</li>
                <li><strong className="text-slate-800">Boys:</strong> Black Pant (Full), White Shirt, Black Shoes, Black Sweater/Blazer.</li>
                <li><strong className="text-slate-800">Girls:</strong> Black Kurti (Top) White Shalwar, White Dupatta, Black shoes, Black Sweater/Blazer.</li>
                <li>School ID:- A students needs to wear School ID. Without ID students are not allowed to stay in the class room.</li>
              </ul>
            </div>
          </div>
        </div>

         <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-amber-500"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
              <FaFileLines size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">Withdrawal & Dismissal Procedure</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>With Drawal / Dismissal - A parent may withdraw his\her ward. He has to clear all dues to take Transfer certificate.</li>
                <li>The school administration reserves the clear right to dismiss any student whose diligence, academic progress, or moral character is found consistently unsatisfactory.</li>
              </ul>
            </div>
          </div>
        </div>

         <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-600"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
              <FaUsers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">Guidelines for Parents & Guardians</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>Students should put at least two hours in studies at home.</li>
                <li>Guide them to become a resourceful member of the home. Encourage self-help for work and study.</li>
                <li>Inculcate in them the idea of the dignity for work, a virtue necessary for successful career in life.</li>
                <li>Guardians are responsible for the safety of their wards during their way to school and back home.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}