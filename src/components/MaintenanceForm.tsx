"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState } from "react-dom";
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import InputField from './InputField';
import { MaintainenceSchema, maintainenceSchema } from '@/lib/formValidationSchema';
import { createMaintainence, updateMaintainence } from '@/lib/actions';

const MaintainenceForm = ({ setOpen, type, data }: { 
  setOpen: Dispatch<SetStateAction<boolean>>; 
  type: "edit" | "create"; 
  data?: any; 
}) => {
  const actionToTake = type === "create" ? createMaintainence : updateMaintainence;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MaintainenceSchema>({
    // 1. FIXED: Added the zodResolver so your frontend validation schema triggers!
    resolver: zodResolver(maintainenceSchema), 
    defaultValues: data,
  });

  const [state, formAction] = useFormState(actionToTake, { success: false, error: false });
  const router = useRouter();

  // 2. Kept your clean object passing logic since your older server action handles JSON objects
  const onSubmit = handleSubmit(
    (formData) => {
      console.log("✅ FRONTEND PASSED! Sending this object to server:", formData);
      formAction(formData); 
    },
    (formErrors) => {
      console.log("❌ FRONTEND BLOCKED! Zod hates this field:", formErrors);
    }
  );

  useEffect(() => {
    if (state.success) {
      toast.success(`Maintenance work has been ${type === "create" ? "created" : "updated"}`);
      router.refresh();
      setOpen(false);
    }
  }, [state, type, router, setOpen]);

  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <h1 className='text font-semibold text-slate-800'>
        {type === "create" ? "Create a new Maintenance work" : "Update the Maintenance work"}
      </h1>

      {data && <input type="hidden" {...register("id")} defaultValue={data.id} />}
      
      <div className='w-full flex flex-wrap gap-6'> 
        <InputField label="Title" name="title" defaultValue={data?.title} register={register} error={errors.title} />
        <InputField label="Location" name="location" defaultValue={data?.location} register={register} error={errors.location} />
        <InputField label="Description" name="description" defaultValue={data?.description} register={register} error={errors.description} />
        
        <div className='flex flex-col gap-1 flex-1 min-w-[200px]'>
          <label className='text-sm text-gray-400'>Status</label>
          <select 
            {...register("status")} 
            className='ring-[1.5px] ring-gray-300 px-2 py-2 rounded-md text-sm bg-white' 
            defaultValue={data?.status || "demo"}
          >
            <option disabled value="demo">Select a status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status?.message && (
            <p className='text-sm text-red-500 mt-1'>{errors.status?.message.toString()}</p>
          )}
        </div>
      </div>

      {state.error && (
        <span className='text-red-500 text-sm mt-2'>
          {typeof state.error === "string" ? state.error : "Something went wrong. Please try again!"}
        </span>
      )}

      <div className='flex my-4 w-full justify-center'>
        <button 
          type="submit"
          disabled={isSubmitting} 
          className='bg-blue-400 disabled:bg-blue-300 w-[100px] px-4 py-2 rounded-xl text-white font-medium'
        >
          {type === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default MaintainenceForm;