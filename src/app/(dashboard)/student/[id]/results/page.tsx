import React from "react"
import prisma from "@/lib/prisma";
import {notFound,redirect} from "next/navigation";
import {auth} from  "@clerk/nextjs/server"; 
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import FilterBar from "@/components/features/FilterBar";

const StudentResultsPage = async ({searchParams}:{search:{[key:string]:string| undefined}})=>{
    const { userId } = await auth();

     
    if (!userId) {
      return redirect("/sign-in");

    }
    const { academicYear } = searchParams;
    const [student,academicYears]=await Promise.all([
      prisma.student.findUnique({
        where: { clerkId: userId },
      }),
      prisma.exam.findMany({
        where:{
          results:{some:{student:{clerkId:userId}}}
        }
      })
    ])
    if (!student) {
      return notFound();
    }

    // 3. Only fetch results IF a year is in the URL
const results = academicYear 
? await prisma.result.findMany({
    where: {
      student: { clerkId: userId },
      exam: { academicYear: academicYear }
    },
    include: {
       exam: {
        select: {
          title: true,
          academicYear: true,
          lesson: {
            select: {
              subject: {
                select: { name: true }
              }
            }
          }
        }
      }
    },
   
    orderBy: { 
      exam: { 
        lesson: { 
          subject: { 
            name: 'asc' 
          } 
        } 
      } 
    }
  })
: [];
    

return (
  <div className="flex flex-col flex-1 items-center justify-start p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    
 
    <div className="w-full max-w-3xl mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-700">Select Academic Year:</h2>
      
    
      <FilterBar years={academicYears} />
    </div>

 
    {academicYear ? (
      
   
      <div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="mb-8 border-b-2 border-black pb-6 text-center">
          <h1 className="text-3xl font-black uppercase tracking-wider text-black">
            Student Report Card
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
            Academic Year: {academicYear}
          </p>
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-400">Student Name</p>
            <h2 className="text-md font-bold capitalize text-black">{student.name} {student.surname}</h2>
          </div>
        </div>

        {/* The Grades Table */}
        <div className="flex w-full flex-col">
          <div className="mb-2 flex justify-between border-b border-black pb-2 text-sm font-bold uppercase text-black">
            <span className="w-1/2">Subject</span>
            <span className="w-1/4 text-center">Assessment</span>
            <span className="w-1/4 text-right">Score</span>
          </div>

          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.id} className="flex items-center justify-between border-b border-gray-100 py-4 text-black hover:bg-gray-50 transition-colors">
                <span className="w-1/2 font-medium capitalize">{result.exam?.lesson?.subject?.name}</span>
                <span className="w-1/4 text-center text-sm text-gray-600 capitalize">{result.exam.title}</span>
                <span className="w-1/4 text-right text-lg font-bold">{result.score}</span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-gray-500">
              No results published yet for {academicYear}.
            </div>
          )}
        </div>
      </div>

    ) : (
      
 
      <div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-12 shadow-sm text-center">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🎓</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">View Your Results</h3>
        <p className="text-gray-500">
          Please use the dropdown menu above to select an academic year and view your official scores.
        </p>
      </div>

    )}
  </div>
);

}
export default StudentResultsPage;