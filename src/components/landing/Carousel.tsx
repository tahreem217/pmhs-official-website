"use client";

import { useEffect, useState } from "react";
import Image from "next/image"
export default function SimpleCarousel() {

  const [currentIndex,setCurrentIndex]=useState(0);

  const slideImages=[
  //  "/pmhs-cbse-mainblock.png",
    "/pmhs-carousel1.jpeg",
    "/pmhs-carousel2.jpeg",
     "/pmhs-carousel3.jpeg",
    "/pmhs-carousel4.jpeg",
    "/pmhs-carousel5.jpeg",
    "/pmhs-carousel6.jpeg",
    "/pmhs-carousel7.jpeg",
    "/pmhs-ncc.jpeg",
 
    

  ];

  useEffect(()=>{
    const timer=setInterval(()=>{
      nextSlide()
    },5000)
    return () => clearInterval(timer);
    //t behind the scenes, your browser is still running that stopwatch forever! This is called a memory leak, and it will eventually slow down the user's browser
    //to clean this stop watch we run clearinterval
  },[currentIndex])
  //re-run the useEffect every time currentIndex change to avoidf channge after 1-2 second
  const prevSlide=()=>{
    setCurrentIndex((prev)=>(prev===0 ? slideImages.length-1:prev-1));
  }

  const nextSlide=()=>{
    setCurrentIndex((next)=>(next=== slideImages.length-1?0:next+1));
  }

  return (
    <div className="relative overflow-hidden rounded-2xl  shadow-xl md:h-[500px] h-[400px]   w-full bg-black group">
        {slideImages.map((src,index)=>{
            const isActive=index===currentIndex;
            return(
              <div key={src} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive?"opacity-100 z-10" : "opacity-0 z-0"}`}>
                <Image src={src}
                alt={`School Display ${index + 1}`}
                fill
                className="object-cover"
                // Loading the first couple images immediately for faster rendering
                priority={index === 0 || index === 1}/> </div>
            )
        })}
        <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#003366] font-bold p-4 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100  block z-30"
      >
        ❮
      </button>

     
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#003366] font-bold p-4 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100  block z-30"
      >
        ❯
      </button>
    </div>
  )
}