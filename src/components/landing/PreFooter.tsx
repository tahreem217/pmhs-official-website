"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaCopy, FaUserGraduate, FaChalkboardUser, FaShieldHalved, FaRightToBracket } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link"; 

const Footer = () => {
    const [copiedItem, setCopiedItem] = useState("");

    const copyToClipboard = (text:string, itemName:string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
        setCopiedItem(itemName);
        setTimeout(() => setCopiedItem(""), 2000);
    }

    return (
        <footer className="w-full bg-[#003366] text-slate-200 pt-16 pb-8   font-sans border-t-[6px] border-amber-500">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2   lg:grid-cols-4 gap-10">
                
            
                <div className="space-y-4">
                    <div>
                        <h2 className="font-extrabold text-2xl text-white uppercase tracking-wide mb-2">
                            PMHS
                        </h2>
                        <div className="h-1 w-12 bg-amber-400 rounded-full"></div>
                    </div>
                    
                    <p className="text-sm leading-relaxed text-slate-300 font-medium pr-4">
                        Patna Muslim High School. 
                        <br/><br/>
                        Blending traditional values with modern educational excellence since 1938. Shaping the leaders of tomorrow.
                    </p>
                </div>

                {/* Column 2: Explore */}
                <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
                        Explore
                    </h3>
                    <ul className="space-y-3 text-sm font-medium text-slate-300">
                        <li>
                            <Link href="/" className="hover:text-amber-400 hover:pl-1 transition-all">Home</Link>
                        </li>
                        <li>
                            <Link href="/admissions" className="hover:text-amber-400 hover:pl-1 transition-all">Admissions (2025-2026)</Link>
                        </li>
                        <li>
                            <Link href="about/rules" className="hover:text-amber-400 hover:pl-1 transition-all">Rules & Regulations</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-amber-400 hover:pl-1 transition-all">Our History</Link>
                        </li>
                        <li>
                            <Link href="/facilities" className="hover:text-amber-400 hover:pl-1 transition-all">Campus Facilities</Link>
                        </li>
                    </ul>
                </div>

 
                <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
                        School Portal
                    </h3>
                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        A unified management platform for students, parents, teachers, and administration.
                    </p>
                    <Link 
                        href="/sign-in" 
                        className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-[#003366] font-bold py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        <FaRightToBracket className="text-lg" />
                        Login to Portal
                    </Link>
                </div>
 
                <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
                        Contact Us
                    </h3>
                    <ul className="space-y-5 text-sm">
           
                        <li className="flex items-start gap-3">
                            <FontAwesomeIcon icon={faLocationDot} className="text-amber-400 mt-1 shrink-0" />
                            <span className="text-slate-300">Opposite Science College, <br/>Patna, Bihar 800004</span>
                        </li>

             
                        <li className="flex items-start gap-3 group">
                            <FontAwesomeIcon icon={faEnvelope} className="text-amber-400 mt-1 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">Official Email</span>
                                <div className="flex items-center gap-2">
                                    <a href="mailto:patnamuslimhighschool@gmail.com" className="hover:text-white transition-colors break-all">
                                        patnamuslimhighschool@gmail.com
                                    </a>
                                    <button onClick={() => copyToClipboard("patnamuslimhighschool@gmail.com", "email")} className="text-slate-400 hover:text-amber-400 transition-colors">
                                        {copiedItem === "email" ? <span className="text-emerald-400 text-[10px] uppercase font-bold">Copied!</span> : <FaCopy />}
                                    </button>
                                </div>
                            </div>
                        </li>

 
                        <li className="flex items-start gap-3 group">
                            <FontAwesomeIcon icon={faPhone} className="text-amber-400 mt-1 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">Administration Desk</span>
                                <div className="flex items-center gap-2">
                                    <a href="tel:+917781090858" className="hover:text-white transition-colors font-semibold tracking-wider">
                                        +91 77810 90858
                                    </a>
                                    <button onClick={() => copyToClipboard("+917781090858", "phone")} className="text-slate-400 hover:text-amber-400 transition-colors">
                                        {copiedItem === "phone" ? <span className="text-emerald-400 text-[10px] uppercase font-bold">Copied!</span> : <FaCopy />}
                                    </button>
                                </div>
                                <span className="text-xs text-slate-500 mt-1">Shahnawaz Ahmad (Accountant)</span>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
 
            
      
        </footer>
    );
}

export default Footer;