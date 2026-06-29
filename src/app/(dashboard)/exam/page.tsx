import React from "react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
 
import Link from "next/link";
import FilterBar from "@/components/features/FilterBar";

// 1. Updated Next.js searchParams interface
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }; 
}

const MyExamsPage = async ({ searchParams }: PageProps) => {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const role = (sessionClaims?.metadata as { role?: string })?.role;
  
  // Safely cast searchParams to strings
  const academicYear = searchParams.academicYear as string | undefined;
  const tab = (searchParams.tab as string) || "subject";
  const view = tab as "subject" | "class";

  let exams: any[] = [];
  let availableYears: { academicYear: string }[] = [];
  let pageTitle = "";

  // 1. DATA FETCHING LOGIC
  if (role === "student") {
    pageTitle = "My Class Examinations";
    const studentWhere = { lesson: { class: { students: { some: { clerkId: userId } } } } };

    [availableYears, exams] = await Promise.all([
      // FIX: Applied `not: null` and the type cast to the FIRST query (availableYears)
      prisma.exam.findMany({ 
        where: { ...studentWhere, academicYear: { not: null } }, 
        distinct: ['academicYear'], 
        select: { academicYear: true }, 
        orderBy: { academicYear: 'desc' } 
      }) as unknown as Promise<{ academicYear: string }[]>,
      
      // FIX: Restored the proper academicYear filter for the actual exams table
      prisma.exam.findMany({
        where: { ...studentWhere, ...(academicYear ? { academicYear } : {}) },
        include: { lesson: { include: { subject: true, teacher: true } } },
        orderBy: { startTime: "asc" },
      })
    ]);

  } else if (role === "teacher") {
    const teacher = await prisma.teacher.findUnique({ where: { clerkId: userId } });
    if (!teacher) return <div className="p-8 text-center">Profile not found.</div>;

    pageTitle = view === "subject" ? "My Subject Examinations" : "Class Supervisor Schedule";
    
    // OR operator for Dual Responsibilities
    const teacherWhere = view === "subject" 
      ? { lesson: { teacherId: teacher.id } } 
      : { lesson: { class: { supervisorId: teacher.id } } };

    [availableYears, exams] = await Promise.all([
      // FIX: Applied the exact same `not: null` and type cast for the Teacher's query
      prisma.exam.findMany({ 
        where: { 
          ...(view === "subject" ? { lesson: { teacherId: teacher.id } } : { lesson: { class: { supervisorId: teacher.id } } }),
          academicYear: { not: null }
        }, 
        distinct: ['academicYear'], 
        select: { academicYear: true }, 
        orderBy: { academicYear: 'desc' } 
      }) as unknown as Promise<{ academicYear: string }[]>,
      
      prisma.exam.findMany({
        where: { ...teacherWhere, ...(academicYear ? { academicYear } : {}) },
        include: { lesson: { include: { subject: true, class: true } } },
        orderBy: { startTime: "asc" },
      })
    ]);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-start p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl bg-white p-8 shadow-sm border border-gray-300">
        
        {/* Header */}
        <div className="mb-8 border-b-2 border-black pb-4">
          <h1 className="text-3xl font-black uppercase tracking-wider text-black">{pageTitle}</h1>
        </div>

        {/* --- DUAL TABS (Teacher Only) --- */}
        {role === "teacher" && (
          <div className="flex w-full border border-black mb-6">
            <Link href="?tab=subject" className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-widest ${view === "subject" ? "bg-black text-white" : "bg-white text-black"}`}> My Subject Examinations</Link>
            <div className="w-px bg-black"></div>
            <Link href="?tab=class" className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-widest ${view === "class" ? "bg-black text-white" : "bg-white text-black"}`}>My Supervised Class Examinations</Link>
          </div>
        )}

        {/* Filter and Status */}
        <div className="flex justify-between items-end mb-6">
          <div className="w-48"><FilterBar years={availableYears}/></div>
          <span className="border border-black px-4 py-1 text-xs font-bold uppercase">{role} Record</span>
        </div>

        {/* Table */}
        <div className="w-full border-l border-t border-black">
          <div className="flex bg-gray-50 font-bold uppercase text-xs text-black">
            <div className="w-1/3 border-r border-b border-black p-3">Exam Title</div>
            <div className="w-1/4 border-r border-b border-black p-3">Subject</div>
            <div className="w-1/4 border-r border-b border-black p-3">{role === "student" ? "Teacher" : "Class"}</div>
            <div className="w-1/6 border-r border-b border-black p-3 text-right">Date</div>
          </div>

          {exams.map((exam) => (
            <div key={exam.id} className="flex text-sm text-black">
              <div className="w-1/3 border-r border-b border-black p-3 font-semibold">{exam.title}</div>
              <div className="w-1/4 border-r border-b border-black p-3">{exam.lesson.subject.name}</div>
              <div className="w-1/4 border-r border-b border-black p-3">
                {role === "student" ? `${exam.lesson.teacher.name} ${exam.lesson.teacher.surname}` : exam.lesson.class.name}
              </div>
              <div className="w-1/6 border-r border-b border-black p-3 text-right">
                {new Intl.DateTimeFormat("en-GB").format(exam.startTime)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyExamsPage;