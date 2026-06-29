 
 "use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // or 'zod/v4'
import {  toast } from 'react-toastify';
import InputField from '../ui/InputField';
import Image from "next/image"
import { FieldError } from 'react-hook-form';
import { subjectSchema,SubjectSchema } from '@/lib/formValidationSchema';
import { createSubject, updateSubject,deleteSubject } from '@/lib/actions';
import { useForm } from 'react-hook-form';
import { useFormState } from "react-dom";
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

const SubjectForm = ({setOpen,type,data,relatedData}: {setOpen:Dispatch<SetStateAction<boolean>>,type:"edit" | "create" ; data?:any,relatedData:any;}

) => {
    const actionToTake = type === "create" ? createSubject:updateSubject;
    const {
        register,
        handleSubmit,
         
        formState: { errors },
      } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
        defaultValues: data,
      });
        const {teachers}=relatedData;
const [state, formAction] = useFormState(actionToTake, { success: false, error: false });
        const router=useRouter();

      const onSubmit=handleSubmit((data)=>{
        console.log(data);
       formAction(data);
      })
      useEffect(()=>{
        if(state.success){
                toast(`Subject has been ${type==="create"?"created":"updated"}`);
                router.refresh();
                setOpen(false)
        }
      },[state])
  return (
    <form className='flex flex-col gap-2'  onSubmit={onSubmit}  >
      <h1 className='text font-semibold'>{type==="create"?"Create a new Subject":"Update the Subject"}</h1>
      <span className='my-2 text-gray-600'>Authentication Details</span>
      <div className=' w-full flex flex-wrap gap-6  '> 
      {data && <input type="hidden" {...register("id")} defaultValue={data.id} />}
     <InputField label="Subject Name" name="name" defaultValue={data?.name}  register={register} error={errors.name}  />

     <div className='flex flex-col gap-1 flex-1'>
        <label className='text-sm text-gray-400'  >Teachers</label>

        <div className='flex flex-col gap-2 max-h-[60px] overflow-y-scroll ring-[1.5px] ring-gray-300 p-3 rounded-md text-sm'>
          {teachers.map((teacher:{id:string,name: string, surname: string})=>(
            <label key={teacher.id} className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded ' >
              <input type="checkbox" value={teacher.id}  {...register("teachers")}
              defaultChecked={data?.teachers?.some((t: { id: string }) => t.id === teacher.id)} />
<span>{teacher.name} {teacher.surname}</span>
            </label>
          )
        )}
        </div>
     
      {errors.teachers?.message && <p className='text-sm text-red-500'>{errors.teachers?.message.toString()}</p>}
      </div>
 

      </div>
     
 
      


        
  
    
            {state.error && <span className='text-red-500 text-sm'>Something went wrong.Please try again!</span>}

       


      <div  className='flex  my-4 w-full justify-center'>
      <button className='bg-blue-400 w-[100px] px-4 py-2 rounded-xl text-white'>{type==="create"?"Create":"Update"}</button>
      </div>
    </form>
  )
}

export default SubjectForm
