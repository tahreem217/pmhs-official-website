"use client"
import { items_per_page } from "@/lib/setting"
import {useSearchParams} from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


 
const Pagation = ({page,count}:{page:number,count:number}) => {
  const totalPages = Math.ceil(count / items_per_page);
  const router=useRouter();
  useEffect(()=>{
     if(page>totalPages && page>1)
     {
      const params=new URLSearchParams(window.location.search);
      params.set("page",totalPages.toString());
      router.push(`${window.location.pathname}?${params}`);

     }
  },[count, page, totalPages, router])

  const changePage=(newPage:number)=>{
    const params=new URLSearchParams(window.location.search)
    params.set("page",newPage.toString())
    router.push(`${window.location.pathname}?${params}`)
   }
  return (
    <div className="justify-between p-6 flex items-center ">
       <button disabled={(page<=1)} onClick={()=>changePage(page-1)}   className="bg-gray-200  text-sm  text-gray-600 p-2 border disabled:opacity-50 rounded-lg disabled:cursor-not-allowed ">Prev </button>

      <div className="flex gap-1 text-gray-500">

        {Array.from({length:totalPages},
        (_,index)=>{
          const pageIndex=index+1;

          return (
            <button  onClick={()=>changePage(pageIndex)} key={pageIndex}  className={`  px-2 py-1 rounded-sm ${page==pageIndex?"bg-blue-200":""}`} >{pageIndex}</button>
          )

        }
      
      
      
      
      )}
       
        
      </div>


      <button disabled={page==totalPages || totalPages === 0} onClick={()=>changePage(page+1)} className="bg-gray-200   border   text-gray-600 p-2 text-sm  disabled:opacity-50  rounded-lg disabled:cursor-not-allowed ">Next </button>

    </div>
  )
}

export default Pagation
