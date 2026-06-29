import React from 'react'
import Image from 'next/image'
import Calender from "@/components/dashboard/BigCalenderContainer";
import Annoncement from "@/components/notices/AnnoucementBox";
import FormModal from '@/components/FormModal';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

const routinePage = async ({ params }: { params: { id: string } }) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role; 
  
  if (!userId) {
    return redirect("/sign-in");
  }

   const student = await prisma.student.findUnique({
    where: {
      clerkId: params.id,
    },
    include: {
      class: true 
    }
  });

  if (!student) {
    return notFound();
  }

  return (
    <div className=' w-[80%] bg-blue h-[80%]'>
      
   
          
          
         
            
            
    
        
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          {student.classId ? (
            <Calender type="classId" id={student.classId} />
          ) : (
            <div className="p-10 text-center text-gray-500 font-medium">
              This student has not been assigned to a class yet.
            </div>
          )}
        </div>
      

       
    </div>
  )
}

export default routinePage;