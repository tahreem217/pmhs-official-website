 
 "use client";
 import { zodResolver } from '@hookform/resolvers/zod';
 import { z } from 'zod'; // or 'zod/v4'
 import {  toast } from 'react-toastify';
 import InputField from '../ui/InputField';
 import Image from "next/image"
 import { FieldError } from 'react-hook-form';
 import { noticeSchema,NoticeSchema } from '@/lib/formValidationSchema';
 import {  deleteNotice, createNotice, updateNotice } from '@/lib/actions';
 import { useForm } from 'react-hook-form';
 import { useFormState } from "react-dom";
 import { useEffect, type Dispatch, type SetStateAction } from 'react';
 import { useRouter } from 'next/navigation';
 
 const noticeForm = ({setOpen,type,data,relatedData}: {setOpen:Dispatch<SetStateAction<boolean>>,type:"edit" | "create" ; data?:any,relatedData:any;}
 
 ) => {
     const actionToTake = type === "create" ? createNotice:updateNotice;

     const {
         register,
         handleSubmit,
          
         formState: { errors },
       } = useForm<NoticeSchema>({
         resolver: zodResolver(noticeSchema) as any,
         defaultValues: data,
       });
         const {classes}=relatedData;
 

     const [state, formAction] = useFormState(actionToTake, { success: false, error: false });
         const router=useRouter();
 
       const onSubmit=handleSubmit((data)=>{
         console.log(data);
        formAction(data);
       })
       useEffect(()=>{
         if(state.success){
                 toast(`Notice has been ${type==="create"?"created":"updated"}`);
                 router.refresh();
                 setOpen(false);
         }
       },[state])
   return (
     <form className='flex flex-col gap-2'  onSubmit={onSubmit}  >
       <h1 className='text font-semibold'>{type==="create"?"Create a new Notice":"Update the Notice"}</h1>
 
       <div className=' w-full flex flex-wrap gap-6  '> 
       <div className="w-[60%]">
      <InputField label="Title" name="title" defaultValue={data?.title}  register={register} error={errors.title}  />
      </div>
    {/* <InputField label="Grade" name="grade" defaultValue={data?.grade}  register={register} error={errors.grade}  /> */}
    <div className="w-full">
      <InputField  type="text" label="Description" name="description" defaultValue={data?.description}  register={register} error={errors.description}  />
      </div>
      <InputField type="Date" label="Date" name="date" defaultValue={data?.date}  register={register} error={errors.date}  />
      <div className='flex flex-col gap-1 flex-1'>
         <label className='text-sm text-gray-400'  >Class</label>
 
         <div className='flex flex-col gap-2  ring-[1.5px] ring-gray-300 p-3 rounded-md text-sm'>
          

               <select   {...register("classId")}   className='focus:outline-none' >
               <option value="">Select a class...</option>
               {classes.map((cls: { id: string, name: string }) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
                           
               </select>

           
      
         </div>
      
       {errors.classId?.message && <p className='text-sm text-red-500'>{errors.classId?.message.toString()}</p>}
       </div>
  
      
      
        </div>
  
 
      
      
  
       
 
 
         
   
     
       {state.error && <span className='text-red-500 text-sm'>{typeof state.error==="string"?state.error:"Something went wrong. Please try again!" }</span>}
 
        
 
 
       <div  className='flex  my-4 w-full justify-center'>
       <button className='bg-blue-400 w-[100px] px-4 py-2 rounded-xl text-white'>{type==="create"?"Create":"Update"}</button>
       </div>
     </form>
   )
 }
 
 export default  noticeForm
 