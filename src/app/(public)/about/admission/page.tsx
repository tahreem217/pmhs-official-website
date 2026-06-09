"use client";
import React, { useState, useEffect } from "react";
import { TiHeartFullOutline } from "react-icons/ti";
import { FaUserShield, FaClock, FaFileLines, FaGraduationCap, FaIndianRupeeSign } from "react-icons/fa6";
 
const Admission = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["bg-red-600", "bg-red-800"];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev === 0 ? 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans pb-24">
      
 
      <div className="    py-16 px-4   text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 uppercase">
            Admissions Open (Batch 2025)
          </h1>
          <p className="text-blue-700  text-base sm:text-lg max-w-2xl mx-auto font-medium mb-6">
            Join the academic legacy of Patna Muslim High School. Shaping bright futures since 1938.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto text-sm font-semibold">
            <div className=" bg-red-600 hover:bg-red-800 text-white px-5 py-2.5 rounded-full shadow-md  ">
              Applications Start: 12/02/2026
            </div>
            <div className="bg-emerald-600 hover:bg-green-900 text-white px-5 py-2.5 rounded-full shadow-md flex items-center gap-2">
              <FaClock className="text-xs" /> Office Hours: 12:30 PM to 4:30 PM
            </div>
          </div>
        </div>
      </div>

 
      <div className="max-w-7xl mx-auto px-4 mt-3 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
         
        <div className="lg:col-span-7 space-y-6">
          
          
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-[#003366]"></div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl text-[#003366] shrink-0">
                <FaGraduationCap size={22} />
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Eligibility & Criteria for +2</h3>
                <div className="h-0.5 w-16 bg-amber-400 my-1.5 rounded-full"></div>
                <p className="text-slate-600 font-medium text-sm mt-2">
                  Minimum of <span className="text-red-600 font-bold">45% marks</span> in 10th standard board examinations is strictly required.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
                <FaUserShield size={22} />
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Admission Procedure</h3>
                <div className="h-0.5 w-16 bg-amber-400 my-1.5 rounded-full"></div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 list-none pl-0">
                  <li><strong className="text-slate-800">Science:</strong> Entrance Test / Comprehensive Interview / Merit List Evaluation</li>
                  <li><strong className="text-slate-800">Arts & Commerce:</strong> Direct Assessment Interview / Merit List Verification</li>
                </ul>
              </div>
            </div>
          </div>
 
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-amber-500"></div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
                <FaFileLines size={22} />
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Mandatory Documentation</h3>
                <div className="h-0.5 w-16 bg-amber-400 my-1.5 rounded-full"></div>
                <p className="text-xs text-slate-400 mb-3 font-medium">Please submit original verification files alongside photocopied prints.</p>
                <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                  <li>Class 10th Admit Card & Official Marksheet (Original Copy)</li>
                  <li>Migration Certificate and School Leaving Certificate (S.L.C)</li>
                  <li>Aadhaar Verification (Student, Father, and Mother records)</li>
                  <li>Caste Certificate (where applicable), Parental ID validation, and Student Bank Account details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

     
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xl border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
              <FaIndianRupeeSign size={18} />
            </div>
            <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Annual Fee Structure</h3>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[#003366] font-bold">
                  <th className="px-4 py-3">Class/Stream</th>
                  <th className="px-4 py-3 text-center">Capacity</th>
                  <th className="px-4 py-3 text-right">Fee (Yearly)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {[
                  ["Class VI", 31, "₹3,000"],
                  ["Class VII", 37, "₹3,000"],
                  ["Class VIII", 58, "₹3,000"],
                  ["Class IX", 68, "₹3,000"],
                  ["Class X", 88, "₹3,000"],
                  ["Class XI: Science", 256, "₹8,000*"],
                  ["Class XI: Commerce", 256, "₹8,000*"],
                  ["Class XI: Arts", 256, "₹8,000*"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="md:px-4 px-2 py-3 font-semibold text-slate-700">{row[0]}</td>
                    <td className="md:px-4 px-2 py-3 text-center font-medium">{row[1]}</td>
                    <td className="md:px-4 px-2 py-3 text-right font-bold text-[#003366]">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 text-slate-800">
                  <td className="md:px-4 px-2 py-3 uppercase text-[#003366]">Total Seats</td>
                  <td className="md:px-4 px-2 py-3 text-center text-emerald-600">1,050</td>
                  <td className="md:px-4 px-2 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-[11px] text-red-400 mt-3 font-medium leading-relaxed">
            * Note: Intermediate classes (+2 Streams) require an additional ₹2,000 promotion fee structure during initialization setup.
          </p>
        </div>
      </div>

 
      <div className="max-w-7xl mx-auto px-4 mt-10 space-y-4">
        
        {/* Welfare Incentive */}
        <div className="bg-amber-50 rounded-2xl p-4 shadow-sm border border-amber-100 flex items-center justify-center gap-3 text-amber-900 font-semibold text-center text-sm sm:text-base">
          <p>No student will be denied education due to financial constraints. Fee concessions are systematically evaluated to support students in need.</p>
          <TiHeartFullOutline size={22} className="text-red-500 shrink-0 hidden sm:block" />
        </div>

        {/* Academic Incentive */}
        <div className="bg-[#003366] rounded-2xl p-4 shadow-sm text-center text-white font-semibold text-sm sm:text-base">
          <p>🌟 Merit Scholarship Incentive: Students maintaining a 75% score or greater will qualify for performance scholarship payouts worth ₹1,000.</p>
        </div>
      </div>

    </div>
  );
};

export default Admission;