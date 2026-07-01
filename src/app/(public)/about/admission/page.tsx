"use client";
import React, { useState, useEffect } from "react";
import { TiHeartFullOutline } from "react-icons/ti";
import { 
  FaUserShield, 
  FaClock, 
  FaFileLines, 
  FaGraduationCap, 
  FaIndianRupeeSign,
  FaShirt,
  FaBookOpen
} from "react-icons/fa6";
 
const Admission = () => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev === 0 ? 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans pb-24">
      
       <div className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 uppercase">
            Admissions Open (Batch 2025-2026)
          </h1>
          <p className="text-blue-700 text-base sm:text-lg max-w-2xl mx-auto font-medium mb-6">
            Join the academic legacy of Patna Muslim High School. Shaping bright futures since 1938.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto text-sm font-semibold">
            <div className="bg-red-600 hover:bg-red-800 text-white px-5 py-2.5 rounded-full shadow-md transition-colors">
              Applications Start: 12/02/2026
            </div>
            <div className="bg-emerald-600 hover:bg-green-900 text-white px-5 py-2.5 rounded-full shadow-md flex items-center gap-2 transition-colors">
              <FaClock className="text-xs" /> School Hours: 9:30 AM to 4:00 PM
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
                <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Syllabus & Eligibility (+2)</h3>
                <div className="h-0.5 w-16 bg-amber-400 my-1.5 rounded-full"></div>
                <p className="text-slate-600 font-medium text-sm mt-2">
                  We follow the Bihar Board syllabus in all streams (English/Hindi medium). A minimum of <span className="text-red-600 font-bold">60% marks</span> in 10th standard board examinations is strictly required for admission.
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
                  <li><strong className="text-slate-800">Science:</strong> Entrance Test / Comprehensive Interview / Merit List</li>
                  <li><strong className="text-slate-800">Arts & Commerce:</strong> Direct Assessment Interview / Merit List</li>
                </ul>
              </div>
            </div>
          </div>
 
           <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-500"></div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <FaShirt size={22} />
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">School Uniform & ID</h3>
                <div className="h-0.5 w-16 bg-emerald-400 my-1.5 rounded-full"></div>
                <p className="text-xs text-slate-400 mb-3 font-medium">Students without proper uniform or ID will be sent back home.</p>
                <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                  <li><strong className="text-slate-800">Boys:</strong> Black Pant (Full), White Shirt, Black Shoes, Black Sweater/Blazer.</li>
                  <li><strong className="text-slate-800">Girls:</strong> Black Kurti (Top), White Shalwar, White Dupatta, Black Shoes, Black Sweater/Blazer.</li>
                  <li><strong className="text-slate-800">School ID:</strong> Mandatory to wear at all times inside the campus.</li>
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
                <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-4">
                  <li>Class 10th Admit Card & Official Marksheet (Original Copy)</li>
                  <li>Migration Certificate and School Leaving Certificate (S.L.C)</li>
                  <li>Aadhaar Verification (Student, Father, and Mother records)</li>
                  <li>Caste Certificate (where applicable) & Student Bank Account details</li>
                </ul>
                <p className="text-xs text-red-500 mt-3 font-semibold bg-red-50 p-2 rounded-md">
                  Withdrawal Policy: To take a Transfer Certificate, parents must clear all pending dues.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Fees & Payments */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Fee Table Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                <FaIndianRupeeSign size={18} />
              </div>
              <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">XI & XII Fee Schedule</h3>
            </div>
            
             <div className="overflow-x-auto rounded-xl border border-slate-100 w-full">
              <table className="w-full text-left border-collapse text-sm min-w-[400px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[#003366] font-bold">
                    <th className="px-2 py-3 whitespace-nowrap">Stream</th>
                    <th className="px-2 py-3 whitespace-nowrap text-right">1st Installment<br/><span className="text-xs font-normal text-slate-500">(At Admission)</span></th>
                    <th className="px-2 py-3 whitespace-nowrap text-right">2nd Installment<br/><span className="text-xs font-normal text-slate-500">(Next April)</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-2 py-4 font-semibold text-slate-700 whitespace-nowrap">Science</td>
                    <td className="px-2 py-4 text-right font-bold text-[#003366] whitespace-nowrap">₹7,000/-</td>
                    <td className="px-2 py-4 text-right font-bold text-[#003366] whitespace-nowrap">₹4,000/-</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-2 py-4 font-semibold text-slate-700 whitespace-nowrap">Arts / Commerce</td>
                    <td className="px-2 py-4 text-right font-bold text-[#003366] whitespace-nowrap">₹6,000/-</td>
                    <td className="px-2 py-4 text-right font-bold text-[#003366] whitespace-nowrap">₹4,000/-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-[#003366] mb-2">Payment Methods</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fees must be paid through <strong>Demand Draft (DD)</strong> in favor of <em>PATNA MUSLIM HIGH SCHOOL</em> payable at Patna, or via our <strong>Online UPI Scanner</strong> at the school office.
              </p>
            </div>
          </div>
           <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                <FaBookOpen size={18} />
              </div>
              <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Co-Curriculars</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our curriculum includes active participation in <strong>NCC (Army & Air force units)</strong>  Essay writing, Debate, and Quiz competitions to ensure overall student development.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Incentive & Scholarship Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-4">
        
        {/* Attendance Scholarship Incentive */}
        <div className="bg-[#003366] rounded-2xl p-5 md:p-6 shadow-lg text-white">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="p-3 bg-white/10 rounded-full shrink-0">
              <FaGraduationCap size={28} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-1">₹2,000/- Attendance Scholarship Program</h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Regular and attentive students securing <strong>75% attendance and above</strong> are entitled to a scholarship. ₹1,000 is awarded in Class XI (April) and ₹1,000 in Class XII (December). 
                <span className="block mt-1 text-xs text-slate-300">
                  * Note: Students failing to meet the 75% criteria will not receive the scholarship, and ₹2,000 will be taken as an advance toward their second installment.
                </span>
              </p>
            </div>
          </div>
        </div>

     
       

      </div>

    </div>
  );
};

export default Admission;