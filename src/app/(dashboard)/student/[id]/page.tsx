import React from "react";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const StudentProfilePage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // Fetch the student data using the secure userId
  const student = await prisma.student.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      class: true,
    },
  });

  if (!student) {
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
              Official Student Record
            </h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Patna Muslim High School
            </p>
          </div>
          <div className="text-right">
            <span className="border border-black px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">
              Status: Active Enrollment
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
                src={student.img || "/noavatar.jpg"}
                alt={`${student.name} profile`}
                fill
                sizes="(max-width: 468px) 80px, 102px"
              />
            </div>
          </div>

          {/* Primary Identity Info */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col border-r border-black">
            
            <div className="flex-1 border-b border-black p-6 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Full Name
              </span>
              <h2 className="text-md font-black uppercase text-black">
                {student.name} {student.surname}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 border-b sm:border-b-0 border-r border-black p-4 sm:p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Registration / ID
                </span>
                <span className="font-bold text-lg text-black">{student.username}</span>
              </div>
              <div className="w-full sm:w-1/2 border-b sm:border-b-0 border-black p-4 sm:p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Current Class
                </span>
                <span className="font-bold text-lg text-black">
                  {student.class?.name || "Unassigned"}
                </span>
              </div>
            </div>
          </div>
        </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-black mt-8">
          
          <div className="border-r border-b border-black p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Date of Birth</span>
            <span className="font-semibold text-black">
              {student.dob ? new Intl.DateTimeFormat("en-GB").format(student.dob) : "N/A"}
            </span>
          </div>

          <div className="border-r border-b border-black p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Gender</span>
            <span className="font-semibold text-black capitalize">{student.sex || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Blood Group</span>
            <span className="font-semibold text-black">{student.bloodGroup || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Contact Number</span>
            <span className="font-semibold text-black">{student.phone || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4 sm:col-span-2 lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Email Address</span>
            <span className="font-semibold text-black">{student.email || "N/A"}</span>
          </div>

          <div className="border-r border-b border-black p-4 sm:col-span-2 lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Residential Address</span>
            <span className="font-semibold text-black">{student.address || "N/A"}</span>
          </div>

          {student.fatherName && (
            <div className="border-r border-b border-black p-4 sm:col-span-1 lg:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Father's Name</span>
              <span className="font-semibold text-black capitalize">{student.fatherName}</span>
            </div>
          )}

          {student.motherName && (
            <div className="border-r border-b border-black p-4 sm:col-span-1 lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Mother's Name</span>
              <span className="font-semibold text-black capitalize">{student.motherName}</span>
            </div>
          )}

        </div>

    
        <div className="mt-16 flex justify-between items-end px-4">
          <div className="flex flex-col items-center">
            <div className="w-40 border-b border-black mb-2"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-black">Student Signature</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-40 border-b border-black mb-2"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-black">Official Registrar</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfilePage;