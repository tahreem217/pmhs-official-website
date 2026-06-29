import React from "react";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const TeacherProfilePage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // Fetch the teacher data using the securely verified logged-in user
  const teacher = await prisma.teacher.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      subjects: true,
      classes: true,
    },
  });

  if (!teacher) {
    return notFound();
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-start p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      
      {/* --- FORMAL DOCUMENT CONTAINER --- */}
      <div className="w-full max-w-4xl bg-white p-8 sm:p-12 shadow-sm border border-gray-300">
        
        {/* Document Header */}
        <div className="mb-8 border-b-2 border-black pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-black">
              Official Faculty Record
            </h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Patna Muslim High School
            </p>
          </div>
          <div className="text-right">
            <span className="border border-black px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">
              Status: Active Faculty
            </span>
          </div>
        </div>

        {/* --- IDENTITY BLOCK --- */}
        <div className="w-full flex flex-col md:flex-row border-t border-l border-black mb-0">
          
          {/* Passport Style Photo */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-b border-r border-black p-6 flex justify-center items-center bg-gray-50">
            <div className="relative h-48 w-40 border border-black bg-white shadow-sm">
              <Image
                className="object-cover"
                src={teacher.img || "/noavatar.jpg"}
                alt={`${teacher.name} profile`}
                fill
                sizes="(max-width: 768px) 160px, 192px"
              />
            </div>
          </div>

          {/* Primary Identity Info */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col border-r border-black">
            
            <div className="flex-1 border-b border-black p-6 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Full  Name
              </span>
              <h2 className="text-3xl font-black uppercase text-black">
                {teacher.name} {teacher.surname}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 border-b sm:border-b-0 border-r border-black p-4 sm:p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Faculty ID
                </span>
                <span className="font-bold text-lg text-black">{teacher.username}</span>
              </div>
              <div className="w-full sm:w-1/2 border-b sm:border-b-0 border-black p-4 sm:p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Department / Subjects
                </span>
                <span className="font-bold text-lg text-black capitalize">
                  {teacher.subjects.length > 0 
                    ? teacher.subjects.map((sub) => sub.name).join(", ") 
                    : "General Faculty"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- DETAILED DATA GRID --- */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-black mt-8">
          
          <div className="border-r border-b border-black p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Date of Birth</span>
            <span className="font-semibold text-black">
              {teacher.dob ? new Intl.DateTimeFormat("en-GB").format(teacher.dob) : "N/A"}
            </span>
          </div>

          <div className="border-r border-b border-black p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Gender</span>
            <span className="font-semibold text-black capitalize">{teacher.sex || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Blood Group</span>
            <span className="font-semibold text-black">{teacher.bloodGroup || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Contact Number</span>
            <span className="font-semibold text-black">{teacher.phone || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4 sm:col-span-2 lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Email Address</span>
            <span className="font-semibold text-black">{teacher.email || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4 sm:col-span-2 lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Residential Address</span>
            <span className="font-semibold text-black">{teacher.address || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4 sm:col-span-2 lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Class Supervisor For</span>
            <span className="font-semibold text-black">
              {teacher.classes.length > 0 
                ? teacher.classes.map((c) => c.name).join(", ") 
                : "None Assigned"}
            </span>
          </div>

          {teacher.fatherName && (
            <div className="border-r border-b border-black p-4 sm:col-span-1 lg:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Father's Name</span>
              <span className="font-semibold text-black capitalize">{teacher.fatherName}</span>
            </div>
          )}

          {teacher.motherName && (
            <div className="border-r border-b border-black p-4 sm:col-span-1 lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Mother's Name</span>
              <span className="font-semibold text-black capitalize">{teacher.motherName}</span>
            </div>
          )}

        </div>

        {/* --- OFFICIAL SIGNATURE BLOCK --- */}
        <div className="mt-16 flex justify-between items-end px-4">
          <div className="flex flex-col items-center">
            <div className="w-40 border-b border-black mb-2"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-black">Faculty Signature</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-40 border-b border-black mb-2"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-black">Principal / Administrator</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherProfilePage;