 
 "use client";
 import { zodResolver } from '@hookform/resolvers/zod';
 import { z } from 'zod'; // or 'zod/v4'
 import {  toast } from 'react-toastify';
 import InputField from '../ui/InputField';
 import Image from "next/image"
 import { FieldError } from 'react-hook-form';
 import { classSchema,ClassSchema } from '@/lib/formValidationSchema';
 import {  deleteSubject, createClass, updateClass } from '@/lib/actions';
 import { useForm } from 'react-hook-form';
 import { useFormState } from "react-dom";
 import { useEffect, type Dispatch, type SetStateAction } from 'react';
 import { useRouter } from 'next/navigation';
 
 const ClassForm = ({setOpen,type,data,relatedData}: {setOpen:Dispatch<SetStateAction<boolean>>,type:"edit" | "create" ; data?:any,relatedData:any;}
 
 ) => {
     const actionToTake = type === "create" ? createClass:updateClass;

     const {
         register,
         handleSubmit,
          
         formState: { errors },
       } = useForm<ClassSchema>({
         resolver: zodResolver(classSchema) as any,
         defaultValues: data,
       });
         const {teachers,grades}=relatedData;
console.log(grades)

     const [state, formAction] = useFormState(actionToTake, { success: false, error: false });
         const router=useRouter();
 
       const onSubmit=handleSubmit((data)=>{
         console.log(data);
        formAction(data);
       })
       useEffect(()=>{
         if(state.success){
                 toast(`Classs has been ${type==="create"?"created":"updated"}`);
                 router.refresh();
                 setOpen(false);
         }
       },[state])
   return (
     <form className='flex flex-col gap-2'  onSubmit={onSubmit}  >
       <h1 className='text font-semibold'>{type==="create"?"Create a new Class":"Update the Class"}</h1>
       <span className='my-2 text-gray-600'>Authentication Details</span>
       <div className=' w-full flex flex-wrap gap-6  '> 
 
      <InputField label="Class" name="name" defaultValue={data?.name}  register={register} error={errors.name}  />
    {/* <InputField label="Grade" name="grade" defaultValue={data?.grade}  register={register} error={errors.grade}  /> */}
      <InputField label="Capacity" name="capacity" defaultValue={data?.capacity}  register={register} error={errors.capacity}  />
      <div className='flex flex-col gap-1 flex-1'>
         <label className='text-sm text-gray-400'  >Grade</label>
 
         <div className='flex flex-col gap-2  ring-[1.5px] ring-gray-300 p-3 rounded-md text-sm'>
          

               <select   {...register("gradeId")}   className='focus:outline-none' >
               <option value="">Select a grade...</option>
                {grades.map((grade:{id:string,level:string})=>(
                      <option className='outline-none' key={grade.id} value={grade.id}>{grade.level}  </option>
                ))}
                           
               </select>

           
      
         </div>
      
       {errors.gradeId?.message && <p className='text-sm text-red-500'>{errors.gradeId?.message.toString()}</p>}
       </div>
  
      <div className='flex flex-col gap-1 flex-1'>
         <label className='text-sm text-gray-400'  >Teachers</label>
 
         <div className='flex flex-col gap-2  ring-[1.5px] ring-gray-300 p-3 rounded-md text-sm'>
          

               <select    {...register("supervisorId")}   className='focus:outline-none' >
               <option value="">Select a supervisor...</option>
                {teachers.map((teacher:{id:string,name:string,surname:string})=>(
                      <option className='outline-none' key={teacher.id} value={teacher.id}>{teacher.name} {teacher.surname}</option>
                ))}
                           
               </select>

           
      
         </div>
      
       {errors.supervisorId?.message && <p className='text-sm text-red-500'>{errors.supervisorId?.message.toString()}</p>}
       </div>
  
 
       </div>
      
  
       
 
 
         
   
     
       {state.error && <span className='text-red-500 text-sm'>{typeof state.error==="string"?state.error:"Something went wrong. Please try again!" }</span>}
 
        
 
 
       <div  className='flex  my-4 w-full justify-center'>
       <button className='bg-blue-400 w-[100px] px-4 py-2 rounded-xl text-white'>{type==="create"?"Create":"Update"}</button>
       </div>
     </form>
   )
 }
 
 export default ClassForm
 