 
 "use client";
 import { zodResolver } from '@hookform/resolvers/zod';
 import { string, z } from 'zod'; // or 'zod/v4'
 import {  toast } from 'react-toastify';
 import InputField from '../ui/InputField';
 import Image from "next/image"
 
 import { FieldError } from 'react-hook-form';
 import {studentSchema,Studentschema } from '@/lib/formValidationSchema';
 import { createStudent, updateStudent,deleteStudent } from '@/lib/actions';
 import { useForm } from 'react-hook-form';
 import { useFormState } from "react-dom";
 import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
 import { useRouter } from 'next/navigation';
 import { CldUploadWidget } from 'next-cloudinary';
 const StudentForm = ({setOpen,type,data,relatedData}: {setOpen:Dispatch<SetStateAction<boolean>>,type:"edit" | "create" ; data?:any,relatedData:any;}
 
 ) => {
     const actionToTake = type === "create" ? createStudent:updateStudent;
     const {
         register,
         handleSubmit,
          
         formState: { errors ,isSubmitting},
       } = useForm<Studentschema>({
         resolver: zodResolver(studentSchema)  ,
         defaultValues: {
          ...data,
          // FORCE empty strings for nullable fields
          motherName: data?.motherName || "",
          fatherName: data?.fatherName || "",
          bloodGroup: data?.bloodGroup || "",
          // Ensure strings are strings, not null
          name: data?.name || "",
          surname: data?.surname || "",
          phone: data?.phone || "",
          username: data?.username || "",
          address: data?.address || "",
      },
       });
         const {grades,classes}=relatedData
       const [img,setImg]=useState<string | undefined>(data?.img);
 const [state, formAction] = useFormState(actionToTake, { success: false, error: false });
         const router=useRouter();
 
         const onSubmit = handleSubmit(
          (data) => {
            console.log("✅ FRONTEND PASSED! Sending this to server:", data);
            formAction({ ...data, img: img });
          },
          (errors) => {
            console.log("❌ FRONTEND BLOCKED! Zod hates this field:", errors);
            console.log("Mother Name Error:", errors.motherName?.message);
            console.log("Father Name Error:", errors.fatherName?.message);
          }
        );
       useEffect(()=>{
         if(state.success){
                 toast(`Student has been ${type==="create"?"created":"updated"}`);
                 router.refresh();
                 setOpen(false)
         }
       },[state])
   return (
     <form className='flex flex-col gap-2'  onSubmit={onSubmit}  >
       <h1 className='text font-semibold'>{type==="create"?"Create a new Student":"Update the Student"}</h1>
       <span className='my-2 text-gray-600'>Authentication Details</span>
       {data && <input type="hidden" {...register("id")} defaultValue={data.id} />}
       <div className=' w-full flex flex-wrap gap-6  '> 
 
       <InputField label="First Name" name="name" defaultValue={data?.name || ""} register={register} error={errors.name} />
        <InputField label="Surname Name" name="surname" defaultValue={data?.surname || ""} register={register} error={errors.surname} />
        <InputField label="Phone" type="text" name="phone" defaultValue={data?.phone || ""} register={register} error={errors.phone} />
        <InputField label="Username" type="text" name="username" defaultValue={data?.username || ""} register={register} error={errors.username} />
        <InputField label="Password" type="password" name="password" defaultValue={data?.password || ""} register={register} error={errors.password} />
        <InputField label="Email" type="email" name="email" defaultValue={data?.email || ""} register={register} error={errors.email} />
        <InputField label="Address" name="address" defaultValue={data?.address || ""} register={register} error={errors.address} />
        <InputField label="Mother Name" name="motherName" defaultValue={data?.motherName || ""} register={register} error={errors.motherName} />
        <InputField label="Father Name" name="fatherName" defaultValue={data?.fatherName || ""} register={register} error={errors.fatherName} />
      <div className="flex flex-col gap-2 w-full md:w-1/4">
  <label className="text-xs text-gray-500">Date of Birth</label>
  <input
    type="date"
    {...register("dob")}
    defaultValue={data?.dob ? new Date(data.dob).toISOString().split('T')[0] : ""}
    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
  />
  {errors.dob?.message && (
    <p className="text-xs text-red-400">{errors.dob.message.toString()}</p>
  )}
</div>
<div className="flex flex-col gap-2 w-full md:w-1/4">
  <label className="text-xs text-gray-500">Blood Group</label>
  <select
    {...register("bloodGroup")}
    defaultValue={data?.bloodGroup || ""}
    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
  >
    <option value="">Select Blood Group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
  {errors.bloodGroup?.message && (
    <p className="text-xs text-red-400">{errors.bloodGroup.message.toString()}</p>
  )}
</div>
 
      <div className='flex flex-col gap-1 flex-1'>
  <label className='text-sm text-gray-400'>Class</label>

  
  <select 
    {...register("classId")} 
    className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer outline-none focus:ring-blue-400'
    defaultValue={data?.classId || ""}
  >
    <option value="" disabled>Select a class...</option>
    
    
    {classes.map((classItem: { id: string, name: string }) => (
      <option key={classItem.id} value={classItem.id}>
        {classItem.name}
      </option>
    ))}
  </select>

  
  {errors.classId?.message && (
    <p className='text-sm text-red-500'>{errors.classId?.message.toString()}</p>
  )}
</div>
      

<div className='flex flex-col gap-1 flex-1'>
  <label className='text-sm text-gray-400'>Grade</label>

  
  <select 
    {...register("gradeId")} 
    className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer outline-none focus:ring-blue-400'
    defaultValue={data?.gradeId || ""}
  >
    <option value="" disabled>Select a grade....</option>
    
    
    {grades.map((grade: { id: string, level: string }) => (
      <option key={grade.id} value={grade.id}>
        {grade.level}
      </option>
    ))}
  </select>

  
  {errors.gradeId?.message && (
    <p className='text-sm text-red-500'>{errors.gradeId?.message.toString()}</p>
  )}
</div>
      
  
  <div className='flex flex-col gap-1 flex-1'>
        <label className='text-sm text-gray-400'  >Sex</label>
     <select  {...register("sex")} className='ring-[1.5px] ring-gray-300  px-2 py-2 rounded-md text-sm' defaultValue={data?.sex}>
        <option value="MALE">Male </option>
       
        <option value="FEMALE">Female </option>
     </select>
      {errors.sex?.message && <p className='text-sm text-red-500'>{errors.sex?.message.toString()}</p>}
      </div>
      
<div className='flex '>
      <CldUploadWidget uploadPreset="school" onSuccess={(result,{widget})=>{ if (result.info && typeof result.info !== "string") {
              setImg(result.info.secure_url); 
            }
       }}>
  {({ open }) => {
    return (
      <div className='text-xs flex gap-2 px-2 items-center ' onClick={()=>open()}>
      <Image src="/upload.png" alt="" width={30} height={30} /> 
      <span className='text-md text-gray-600'>Upload a photo</span>
  </div>

  
    );
  }}
  
</CldUploadWidget>

  <div className='w-24 bg-gray-400 relative h-24 rounded-full  '> <p className='relative top-9 left-5 text-white text-xs '>No image</p>
{img && <Image src={img} alt="" width={40} 
    height={40} 
    className="rounded-full w-24 z-10 h-24   absolute top-0 right-0 object-cover" />}
</div> 
       </div>
      
       </div>
       
 
 
         
   
     
             {state.error && <span className='text-red-500 text-sm'>{typeof state.error==="string"?state.error:"Something went wrong. Please try again!" }</span>}
 
        
 
 
       <div  className='flex  my-4 w-full justify-center'>
       <button className='bg-blue-400 w-[100px] px-4 py-2 rounded-xl text-white'>{type==="create"?"Create":"Update"}</button>
       </div>
     </form>
   )
 }
 
 export default StudentForm
 