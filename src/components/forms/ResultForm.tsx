"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import InputField from '../ui/InputField';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { ResultSchema } from '@/lib/formValidationSchema'; // Ensure this no longer requires subjectId!
import { createResult, updateResult } from '@/lib/actions';
import { useForm } from 'react-hook-form';
import { useFormState } from "react-dom";
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

const ResultForm = ({
  setOpen,
  type,
  data,
  relatedData
}: {
  setOpen: Dispatch<SetStateAction<boolean>>,
  type: "edit" | "create";
  data?: any,
  relatedData: any;
}) => {
  const actionToTake = type === "create" ? createResult : updateResult;
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResultSchema>({
    defaultValues: data,
    // If you are using zodResolver, make sure it's passed here:
    // resolver: zodResolver(resultSchema) 
  });
  
  const { exams, students } = relatedData; // Removed subjects from here
  const [state, formAction] = useFormState(actionToTake, { success: false, error: false });
  const router = useRouter();

  const onSubmit = handleSubmit(
    (formData) => {
      console.log("✅ FRONTEND PASSED! Sending this to server:", formData);
      formAction(formData);
    },
    (errors) => {
      console.log("❌ FRONTEND BLOCKED! Zod hates this field:", errors);
    }
  );

  useEffect(() => {
    if (state.success) {
      toast.success(`Result has been ${type === "create" ? "created" : "updated"}`);
      router.refresh();
      setOpen(false);
    }
  }, [state, router, setOpen, type]);

  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <h1 className='text-lg font-semibold'>
        {type === "create" ? "Create a new Result" : "Update the Result"}
      </h1>

      {data && <input type="hidden" {...register("id")} defaultValue={data.id} />}
      
      <div className='w-full flex flex-wrap gap-6 mt-4'>
        {/* 1. SCORE INPUT */}
        <InputField 
          label="Score" 
          name="score" 
          defaultValue={data?.score} 
          register={register} 
          error={errors.score} 
        />

        {/* 2. EXAM DROPDOWN WITH CONTEXT */}
        <div className='flex flex-col gap-1 flex-1 min-w-[200px]'>
          <label className='text-sm text-gray-400'>Exam</label>
          <select
            {...register("examId")}
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer outline-none focus:ring-blue-400'
            defaultValue={data?.examId || ""}
          >
            <option value="" disabled>Select an exam...</option>
            {exams.map((exam: any) => (
              <option key={exam.id} value={exam.id}>
                {/* Safely attempting to show the context to prevent user error */}
                {exam.title} {exam.lesson ? `(${exam.lesson.subject?.name || 'Subject'} - ${exam.lesson.class?.name || 'Class'})` : ''}
              </option>
            ))}
          </select>
          {errors.examId?.message && (
            <p className='text-sm text-red-500'>{errors.examId?.message.toString()}</p>
          )}
        </div>

        {/* 3. STUDENT DROPDOWN WITH CONTEXT */}
        <div className='flex flex-col gap-1 flex-1 min-w-[200px]'>
          <label className='text-sm text-gray-400'>Student</label>
          <Controller
            name="studentId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={students.map((s: any) => ({ 
                  value: s.id, 
                  // Appending the class name so teachers don't pick the wrong student
                  label: `${s.username || s.name} ${s.class ? `(${s.class.name})` : ''}` 
                }))}
                value={students
                  .map((s: any) => ({ 
                    value: s.id, 
                    label: `${s.username || s.name} ${s.class ? `(${s.class.name})` : ''}` 
                  }))
                  .find((opt: any) => opt.value === field.value) || null
                }
                onChange={(option: any) => field.onChange(option ? option.value : "")}
                isSearchable={true}
                isClearable={true}
                placeholder="Select a student..."
                className="text-sm"
              />
            )}
          />
          {errors.studentId?.message && (
            <p className='text-sm text-red-500'>{errors.studentId?.message.toString()}</p>
          )}
        </div>
      </div>

      {/* ERROR MESSAGE DISPLAY */}
      {state?.error && (
        <div className="mt-2 text-red-500 text-sm font-medium">
          {typeof state.error === "string" ? state.error : "Something went wrong!"}
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div className='flex mt-6 w-full justify-center'>
        <button 
          disabled={isSubmitting} 
          className='bg-blue-400 disabled:bg-blue-300 w-[120px] px-4 py-2 rounded-xl text-white font-medium transition-colors'
        >
          {isSubmitting ? "Saving..." : (type === "create" ? "Create" : "Update")}
        </button>
      </div>
    </form>
  );
};

export default ResultForm;