'use client'
import Image from 'next/image'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi"
const Loginpage = () => {
    const { isLoaded, user } = useUser()
    const [showPassword, setShowPassword] = useState(false)
    if (!isLoaded) {
        return (
          <div className="h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-3">
       
              <div className="w-10 h-10 border-4 border-slate-200 border-t-[#003366] rounded-full animate-spin"></div>
              <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Verifying Portal Secure Session...</p>
            </div>
          </div>
        )
    }
    
    console.log("Current user status:", user)

    return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-50 p-4 font-sans relative overflow-hidden'>
      
     
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 pointer-events-none"></div>

      <SignIn.Root>
          <SignIn.Step name="start" className='bg-white w-full max-w-[440px] rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center relative'>
            
             <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-400"></div>

             <div className='flex flex-col items-center text-center mt-2 mb-6'>
               <div className="p-3 bg-slate-50 rounded-2xl shadow-sm border border-slate-100 mb-3">
                  <Image src="/logo.png" alt="PMHS Logo" width={64} height={64} className="object-contain" /> 
               </div>
               <h1 className='font-black text-2xl text-[#003366] tracking-tight uppercase'>
                  PMHS Portal
               </h1>
               <p className='text-xs text-slate-400 font-bold tracking-wider uppercase mt-1'>
                  Patna Muslim High School
               </p>
            </div>

            <div className="w-full text-center mb-6">
               <h2 className='text-slate-800 font-bold text-lg tracking-tight'>Welcome Back</h2>
               <p className='text-sm text-slate-500 mt-0.5'>Sign in to access your dashboard account</p>
            </div>

             <Clerk.GlobalError className='text-xs font-semibold text-red-600 bg-red-50 w-full py-2.5 px-4 rounded-xl border border-red-100 mb-4 text-center animate-shake' />

             <div className="w-full space-y-4">
                <Clerk.Field className='flex flex-col w-full gap-1.5' name="identifier">
                  <Clerk.Label className='text-xs font-bold text-slate-600 uppercase tracking-wider pl-1'>Email Address</Clerk.Label>
                  <Clerk.Input 
                     type="text" 
                     required 
                     className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 text-sm placeholder-slate-400 transition-all duration-200 outline-none focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-blue-50'
                     placeholder="registration number"
                  />
                  <Clerk.FieldError className='text-xs font-semibold text-red-500 pl-1 mt-0.5' />
               </Clerk.Field>
               <Clerk.Field className='flex flex-col w-full gap-1.5' name="password">
                  <div className="flex justify-between items-center px-1">
                     <Clerk.Label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Password</Clerk.Label>
                  </div>
               <div className="relative w-full flex items-center">
                    <Clerk.Input 
                       // Added pr-16 (padding right) so text doesn't type under the button
                       className='w-full px-4 py-3 pr-16 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 text-sm placeholder-slate-400 transition-all duration-200 outline-none focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-blue-50' 
                       // 4. Dynamically change the input type based on state
                       type={showPassword ? "text" : "password"} 
                       required 
                       placeholder="••••••••"
                    />
                    
                    {/* 5. The absolute positioned toggle button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-xs font-bold text-slate-500 hover:text-[#003366] uppercase tracking-wider transition-colors"
                    >
            {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  <Clerk.FieldError className='text-xs font-semibold text-red-500 pl-1 mt-0.5' />
               </Clerk.Field>

            </div>
             <SignIn.Action 
               submit 
               className='w-full bg-[#003366] hover:bg-blue-900 text-white font-bold text-sm rounded-xl py-3.5 mt-8 transition-all duration-300 shadow-md hover:shadow-xl active:scale-[0.99] tracking-wide uppercase cursor-pointer'
            >
               Secure Sign In
            </SignIn.Action>

         </SignIn.Step>
      </SignIn.Root>
    </div>
    )
}

export default Loginpage