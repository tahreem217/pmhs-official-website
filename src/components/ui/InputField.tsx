import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError } from "react-hook-form";
import { z } from 'zod'; // or 'zod/v4'
 type inputFieldProps ={
    label:string,
    type?:string,
    register:any,
   name:string,
    defaultValue?:string,
    error?:FieldError,
   inputProp?:React.InputHTMLAttributes<HTMLInputElement>,

 }

const InputField = ({label,type="text",register,name,defaultValue,error,inputProp}:inputFieldProps) => {
  return (
    <div className='flex flex-col gap-1 flex-1'>
        <label className='text-sm text-gray-400'  >{label}</label>
      <input type={type} {...register(name)}
       className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm'
        {...inputProp}
        defaultValue={defaultValue}
        />
      {error?.message && <p className='text-sm text-red-500'>{error?.message.toString()}</p>}
      </div>
  )
}

export default InputField
