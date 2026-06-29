"use client"
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";


const AcademicYearFilter = ({ years }: { years: { academicYear: string | null}[] }) => {
    const router=useRouter();
    const searchParams=useSearchParams();
    const handleSelect=(e:React.ChangeEvent<HTMLSelectElement>)=>
    {
        const selectedYear = e.target.value;
        const params=new URLSearchParams(window.location.search);
        if(selectedYear)
        {
            params.set("academicYear", selectedYear);
        }
        else{
            params.delete("academicYear"); 
        }
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

  return (

    <select 

      className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm cursor-pointer outline-none focus:ring-2 focus:ring-blue-400"

      onChange={handleSelect}

      defaultValue={searchParams.get("academicYear") || ""}

    >

      <option value="">All Academic Years</option>

      

      {/* Map through the unique years we fetched */}

      {years.map((item) => (

        // Ensure we don't render empty options if some exams lack a year

        item.academicYear && (

          <option key={item.academicYear} value={item.academicYear}>

            {item.academicYear}

          </option>

        )

      ))}

    </select>

  );

};



export default AcademicYearFilter
