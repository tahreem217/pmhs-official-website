"use client"
import React from 'react'
import FormModal from './FormModal';
 
 

const FacilitiesTracker = ({ data,role }: { data:any,role:string| undefined }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col flex-1 w-full h-full">
      
      
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-lg font-bold text-slate-800'>Facilities & Repairs</h1>
        {role === "admin" && (
             
             <FormModal  table="maintenance" type="create"    />
 
          )}
      </div>

     
      <div className="flex overflow-scroll flex-col gap-3">
        
        {data.map((task:any) => (
          <div 
            key={task.id} 
            className="group flex  odd:border-t-purple-500   border-t-2 even:border-t-yellow-500 items-center justify-between p-3 rounded-lg border border-transparent  hover:shadow-sm transition-all duration-200 cursor-pointer"
          > 
            <div className="flex  w-full flex-col gap-1 pr-4">
              <h2 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                {task.title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 line-clamp-1">
                  {task.location}
                </span>
                <span className="text-[10px] text-slate-400">• {task.date}</span>
              </div>
            </div>

            
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap capitalize bg-slate-50 text-slate-600 border-slate-200">
              {task.status}
            </span>
          </div>
        ))}

      
        {/* {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <span className="text-2xl mb-2">✅</span>
            <p className="text-sm font-medium text-slate-500">All facilities are operational.</p>
            <p className="text-xs text-slate-400">No open maintenance tickets.</p>
          </div>
        )} */}

      </div>

 
       
    </div>
  )
}

export default FacilitiesTracker;