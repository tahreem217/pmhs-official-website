 "use client"
import Image from "next/image"
import { fromJSON } from "postcss";
 
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
 
import dynamic from "next/dynamic";
import { deleteClass, deleteExam, deleteLesson, deleteMaintainence, deleteNotice, deleteResult, deleteStudent, deleteSubject, deleteTeacher } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subjectSchema, type SubjectSchema } from "@/lib/formValidationSchema";
import type { announcementsData } from "@/lib/data";
 
 
 

const TeacherForm=dynamic(()=>import("@/components/forms/TeacherForm"),{

      loading:()=><h1>Loading...</h1>
});
const StudentForm=dynamic(()=>import("./forms/StudentForm"),{

  loading:()=><h1>Loading...</h1>
});
const ClassesForm=dynamic(()=>import("./forms/ClassesForm"),{

  loading:()=><h1>Loading...</h1>
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const NoticesForm = dynamic(() => import("./forms/NoticesForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <h1>Loading...</h1>,
});
const MaintenanceForm = dynamic(() => import("./forms/MaintenanceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const deleteAction={
  subject:deleteSubject,
   teacher:deleteTeacher,
  student:deleteStudent,
   classes:deleteClass,
   result:deleteResult,
   announcements:deleteNotice,
   exam:deleteExam,
   lesson:deleteLesson,
   maintenance:deleteMaintainence
   
}
 
const forms:{[key: string]: (setOpen: Dispatch<SetStateAction<boolean>>, type: "create" | "edit", data?: any, relatedData?: any) => JSX.Element;}={

  teacher:(setOpen,type,data,relatedData) =><TeacherForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
   student:(setOpen,type,data,relatedData) =><StudentForm  setOpen={setOpen} type={type} data={data} relatedData={relatedData}/>,
    subject:(setOpen,type,data,relatedData) =><SubjectForm setOpen={setOpen} type={type} data={data}  relatedData={relatedData}/>,
    classes:(setOpen,type,data,relatedData) =><ClassesForm setOpen={setOpen} type={type} data={data}  relatedData={relatedData}/>,
    result:(setOpen,type,data,relatedData) =><ResultForm setOpen={setOpen} type={type} data={data}  relatedData={relatedData}/>,
    announcements:(setOpen,type,data,relatedData) =><NoticesForm setOpen={setOpen} type={type} data={data}  relatedData={relatedData}/>,
    exam:(setOpen,type,data,relatedData) =><ExamForm setOpen={setOpen} type={type} data={data}  relatedData={relatedData}/>,
    lesson:(setOpen,type,data,relatedData) =><LessonForm setOpen={setOpen} type={type} data={data}  relatedData={relatedData}/>,
    maintenance:(setOpen,type,data,relatedData) =><MaintenanceForm setOpen={setOpen} type={type} data={data}   />,

}

const FormModal = ({table,type,data,id,relatedData}:{
    table:"student"|"teacher" | "subject"| "result" | "exam"  | "classes" | "announcements" |"lesson" | "maintenance"
    type:"delete" |"edit" | "create";
    data?:any;
    id?:string;
    relatedData?: any; 
    
}) => {
  const [state, formAction] = useFormState(deleteAction[table], { success: false, error: false });
    const router=useRouter();
    const size=type==="create"?'w-8 h-8':"w-7 h-7";
    const bgcolor=type==="create"?'bg-yellow-300':"bg-blue-200";
    const [open,setOpen]=useState(false);
  useEffect(()=>{
    if(state.success){
            toast(`${table} has been deleted`);
            router.refresh();
            setOpen(false)
    }
  },[state])


  
  const Form=()=>{
    
  
  
    return type==="delete" && id? (
      <form className="flex flex-col justify-center items-center gap-2" action={formAction}>
        <input type="hidden" name="id" value={id} />
    <span className="text-gray-400 text-sm text-center"> All data will be lost. Are you sure you want to delete this {table} ? </span>
    <button className="bg-red-600 font-semibold text-white px-4 py-2 rounded-xl">Delete</button>
      </form>
    ): type==="create" || type==="edit"?(
    forms[table](setOpen,type,data,relatedData)) :"forms not found"
  };
    
  return (

  
   <>
   <button className={`${size} ${bgcolor} flex items-center justify-center  rounded-full`} onClick={()=>setOpen(true)}>
    <Image className="" src={`/${type}.png`} alt="" width={16} height={16}/> 
    </button>
    
    {open && 
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center  justify-center">
        <div className=" p-4 bg-white relative w-[90%] md:w-[50%] xl:w[40%] z-10">
          <Form/>
          <button onClick={()=>setOpen(false)} className="w-5 h-5 flex justify-center items-center bg-red-500  rounded-md  absolute top-2 right-2">
          <Image  className="invert-1" src="/close.png" alt="" width={10} height={10}/> 
          </button>
         
        </div>
    </div>
    }
    
    
    </>
  )
}

export default FormModal

