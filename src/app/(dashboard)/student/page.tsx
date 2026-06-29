 
import Usercard from "@/components/Usercard";
 
 
 
import Calender from "@/components/dashboard/BigCalenderContainer";
 import { auth } from "@clerk/nextjs/server";
 import prisma from "@/lib/prisma";
import  Annoucements from "@/components/notices/AnnoucementBox";


const studentPage =async () => {

  const {userId} =await auth();
 const studentData=await prisma.student.findFirst({//need to change to findUnique when we hace clerk id for all of them
  where:{
    clerkId:userId!
  },
 
 })

 if (!studentData) {
  return <div className="p-4 text-red-500">Student profile not found!</div>;
}
  
const classId=studentData.classId;


  return (
    <div className="flex flex-col    md:flex-row   ">
      <div  className="w-full flex flex-col gap-6  rounded-xl     md:w-2/3">
       

       <div className="w-full h-[600px] bg-pink-100 rounded-xl   p-2">
       <Calender type="classId" id={classId}/>
       </div>
      </div>¯


      <div className="w-full flex flex-col gap-4  md:w-1/3" >
       

      <div className="h-[400px] bg-white rounded-2xl p-4">
    <Annoucements/>
      </div>
      <div className="h-[400px] bg-white rounded-2xl p-4">
    
      </div>
     
     
     
      </div>
      
    </div>
  )
}

export default studentPage
