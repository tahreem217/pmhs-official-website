 
import { useUser } from '@clerk/nextjs'
import {useEffect} from "react";
import { useRouter } from 'next/navigation';
import SchoolBanner from '@/components/landing/SchoolBanner';
import PublicHeader from '@/components/landing/PublicHeader';
import ImageCarousel from '@/components/landing/Carousel';
import MissionVision from '@/components/landing/VisionMission';
import ImportantLinks from '@/components/landing/ImportantLinks';
 import PreFooter from '@/components/landing/PreFooter';
import Annoucement from "@/components/notices/AnnoucementBox";
import RoleRedirect from '@/components/RoleRedirect';
import Footer from '@/components/landing/Footer';
 import AllMessages from '@/components/landing/AllMessages';
import ThoughtOfTheDay from '@/components/landing/ThoughtForTheday';
 
export default function HomePage() {


  
 
 
   return (
    <div className="flex flex-col items-center">
      <RoleRedirect/>
 
      <SchoolBanner />
      <div className=' w-screen flex flex-col md:flex-row gap-12 md:gap-6 md:px-10 px-4 py-10'>
        <ImageCarousel/>
          <MissionVision/>
      </div>
      <AllMessages/>
      <div className=' w-screen flex flex-col md:flex-row gap-12 md:gap-6 md:px-10  px-4 py-10'>
        <div className='md:w-[50%] w-full ' >
        <ImportantLinks/>
        </div>
        <div className='md:w-[50%] w-full'>
        <Annoucement/>
        </div>
      </div>

     
      
    
<ThoughtOfTheDay/>
     
      <PreFooter/>
 
      <div className="main w-full">
       
      </div>
    </div>
  );
}
