"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
 
const PublicHeader = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navLinks = [
        { name: "HOME", path: "/" },
        { name: "FACILITIES", path: "/facilities" },
        { name: "ABOUT", path: "/bbout" ,subLinks: [
          { name: "Our History & Vision", path: "/about" },
          { name: "Rules & Regulations", path: "/about/rules" },
          { name: "Admission", path: "/about/admission" },
   
      ]},
      { name: "Login", path: "/sign-in" },
        
    ];

    return (
        <header className="w-full bg-[#003366] text-[#003366] shadow-md sticky top-0 z-50">
            <div className="flex flex-col md:flex-row items-center lg:w-[80%]  text-white justify-between md:justify-center gap-4 px-4 md:py-10 py-4 max-w-7xl mx-auto rounded-b-md">
                
                <Image 
                    src="/logo.png" 
                    alt="PMHS Logo" 
                    width={80} 
                    height={80} 
                    className="object-contain w-16 h-16 md:w-20 md:h-20  lg:w-24 lg:h-24 shrink-0"
                />
                
               
                <div className="flex lg:flex-row lg:gap-6  flex-col justify-center items-center text-center">
                    <h2 className="font-bold text-xl md:text-2xl  lg:text-3xl tracking-wide">
                        PATNA MUSLIM HIGH SCHOOL
                    </h2>
                    <h2 className="text-lg md:text-2xl lg:text-3xl  font-medium" dir="rtl">
                        پٹنہ مسلم ہائی اسکول
                    </h2>
                    <h2 className="text-lg md:text-2xl lg:text-3xl  font-medium">
                        पटना मुस्लिम हाई स्कूल
                    </h2>
                </div>
            </div>
          
            <nav className="  text-white w-full hidden md:block">
            <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8">
            {navLinks.map((link)=>{
                const isActive=(pathname===link.path || (link.subLinks && pathname.startsWith(link.path)))
                if (link.subLinks) {
                  return (
                      <div key={link.name} className="relative group">
                          <button className={`flex items-center gap-1.5 py-3 px-4 font-semibold text-md transition-all duration-300 ${isActive ? "text-amber-300" : "hover:text-amber-100"}`}>
                              {link.name}
                              <FaChevronDown className="text-[10px] transition-transform duration-300 group-hover:rotate-180" />
                          </button>

       
                          <div className="absolute top-[45px] left-0 w-60 bg-white rounded-lg shadow-xl border border-slate-100 
                                          opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
                                          transition-all duration-300 ease-out z-50 overflow-hidden">
                              <div className="h-1 w-full bg-amber-400"></div>
                              <div className="flex flex-col py-1">
                                  {link.subLinks.map((subLink) => (
                                      <Link 
                                          key={subLink.name} 
                                          href={subLink.path} 
                                          className="px-5 py-3 text-sm font-medium text-[#003366] hover:bg-amber-50 hover:text-amber-600 transition-colors text-left"
                                      >
                                          {subLink.name}
                                      </Link>
                                  ))}
                              </div>
                          </div>
                      </div>
                  );
              }
                return (
                    <Link key={link.name} href={link.path} className={`py-3 px-4 font-semibold text-md transition-all duration-300   ${
                        isActive 
                          ? "  text-amber-300"  
                          : "border-transparent  hover:text-amber-100"  
                      }`}>{link.name}
                    </Link>

                )
            })}
            </div>
            
            </nav>

            <div className="md:hidden   w-full px-4 py-3 flex justify-between items-center text-white">
            <span className="font-semibold tracking-wider">MENU </span>
            <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="focus:outline-none"
        >
           <span className="text-2xl font-bold">
  {isMobileMenuOpen ? "✕" : "☰"}
</span>
            </button>
            </div>
            {isMobileMenuOpen && (
        <nav className="md:hidden bg-[#002244] text-white flex flex-col w-full shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === (link.path || (link.subLinks && pathname.startsWith(link.path)));
            if (link.subLinks) {
              return (
                  <div key={link.name} className="relative group">
                      <button       className={`flex  items-center gap-1.5 py-3 px-4 font-semibold text-md transition-all duration-300 ${isActive ? "text-amber-300" : "hover:text-amber-100"}`}>
                          {link.name}
                          
                          <FaChevronDown className="text-[10px] transition-transform duration-300 group-hover:rotate-180" />
                      </button>

   
                      <div className="absolute top-[45px] left-0 w-60 bg-white rounded-lg shadow-xl border border-slate-100 
                                      opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
                                      transition-all duration-300 ease-out z-50 overflow-hidden">
                          <div className="h-1 w-full bg-amber-400"></div>
                          <div className="flex flex-col py-1">
                              {link.subLinks.map((subLink) => (
                                  <Link 
                                      key={subLink.name} 
                                      href={subLink.path} 
                                      onClick={() => setIsMobileMenuOpen(false)}  
                                      className="px-5 py-3 text-sm font-medium text-[#003366] hover:bg-amber-50 hover:text-amber-600 transition-colors text-left"
                                  >
                                      {subLink.name}
                                  </Link>
                              ))}
                          </div>
                      </div>
                  </div>
              );
          }
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}  
                className={`py-3 px-6 border-b border-[#003366] font-medium transition-colors ${
                  isActive
                    ? "bg-[#003366] text-amber-300 border-l-4 border-l-amber-400"
                    : "hover:bg-[#003366]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      )}
            
        </header>

       


    );
}

export default PublicHeader;