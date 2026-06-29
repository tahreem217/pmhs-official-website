 
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Calender from "@/components/dashboard/BigCalenderContainer";
import Annoncement from "@/components/notices/AnnoucementBox";
 
import FormModal from '@/components/FormModal';
import { auth } from "@clerk/nextjs/server";
const page =async() => {

    const {userId}= await auth();
    console.log(userId)
  return (
    <div className='flex flex-col flex-1 gap-4 lg:flex-row m-2'>
      <div className='w-full lg:w-2/3 flex flex-col gap-4 '>
      <div className='w-full flex flex-1 gap-3 flex-col lg:flex-row '>

            <div className='bg-blue-200 w-full lg:w-2/3 gap-2 flex py-6 px-4 rounded-2xl '>
                <div className='w-1/3 flex  justify-left  items-center'>
                <Image className="w-30 h-30 rounded-full object-cover " src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" alt="" width={144} height={144}/>
                </div>
                
            </div>

            <div className=' flex flex-1  w-full lg:w-1/3 sm:flex-col  '>
                <div className='flex flex-1 flex-col gap-2'>

                    <div className='bg-white w-full    flex justify-start gap-2 items-start pt-6 pl-6 pb-6 lg:pb-0 h-full rounded-2xl ' >
                        <div className=' bg-green-400 p-2 rounded-lg'>
                                < Image src="/attendance.png" alt="" width={24} height={24}/>
                            </div>

                            <div>
                                <h2 className='text-lg font-semibold'>
                                    90%
                                </h2>
                                <h6 className='text-m text-gray-500'>
                                    Attendence
                                </h6>
                            </div>
                            
                             </div>
                             <div className='bg-white w-full pt-6 flex justify-start gap-2  pl-6 pb-6 lg:pb-0 items-start  h-full rounded-2xl ' >
                        <div className=' bg-pink-400 p-2 rounded-lg'>
                                < Image src="/class.png" alt="" width={24} height={24}/>
                            </div>

                            <div>
                                <h2 className='text-lg font-semibold'>
                                    5
                                </h2>
                                <h6 className='text-m text-gray-500'>
                                    Classes
                                </h6>
                            </div>
                            
                             </div>

                </div>
                

            </div>
      </div>

      <div><Calender type="teacherId" id={userId || "123"}/></div>

      </div>


      <div className='w-full lg:w-1/3 flex flex-col gap-2'>
      <div className='flex flex-col gap-2 p-6 rounded-xl bg-white'>
        <h3 className='text-lg text-black font-semibold'>Shortcuts</h3>
      <div className='flex flex-wrap  gap-4 rounded-xl bg-white '>
          <Link className="py-2 px-6 bg-pink-200 rounded-xl text-gray-600" href={`/list/classes?supervisorId=6a086911d4e821b5f3e12e17`}>Class</Link> 
          <Link className="py-2 px-6 bg-purple-200 rounded-xl text-gray-600"  href={`/list/student?teacherId=6a086911d4e821b5f3e12e17`}>Student</Link> 
          <Link className="py-2 px-6 bg-gray-200 rounded-xl text-gray-600 "  href={`/list/lesson?teacherId=6a086911d4e821b5f3e12e17`}>Lesson</Link> 
          <Link  className="py-2 px-6 bg-green-200 rounded-xl text-gray-600" href={`/list/exam?teacherId=6a086912d4e821b5f3e12e19`}>Exam</Link> 
       </div>
      </div>
      <div>

        
      </div>
      <div className='p-4 bg-white rounded-xl' > <Annoncement/></div>
      </div>
    </div>
  )
}

export default page
