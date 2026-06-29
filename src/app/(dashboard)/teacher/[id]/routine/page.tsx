import React from 'react';
import Calender from "@/components/dashboard/BigCalenderContainer";
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

const RoutinePage = async ({ params }: { params: { id: string } }) => {
  const { userId } = await auth();
  
  if (!userId) {
    return redirect("/sign-in");
  }

  // Fetch the teacher
  const teacher = await prisma.teacher.findFirst({
    where: {
      clerkId: params.id,
    }
  });

  if (!teacher) {
    return notFound();
  }

  return (
    // flex-1 ensures it fills the dashboard space correctly next to the menu!
    <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Class Routine</h1>
        <p className="text-sm text-gray-500">Weekly schedule for {teacher.name}.</p>
      </div>
        
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        {teacher.id ? (
          <Calender type="teacherId" id={teacher.id} />
        ) : (
          <div className="p-10 text-center text-gray-500 font-medium">
            This teacher has not been assigned to a schedule yet.
          </div>
        )}
      </div>

    </div>
  );
}

export default RoutinePage;