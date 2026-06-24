"use server"

import { revalidatePath } from "next/cache"
import type { ClassSchema, ExamSchema, LessonSchema, MaintainencerSchema, MaintainenceSchema, NoticeSchema, ResultSchema, Studentschema, SubjectSchema,Teacherschema } from "./formValidationSchema"
import prisma from "./prisma"
import { clerkClient } from "@clerk/nextjs/server"
type CurrentState={success:boolean,error:boolean | string}

export const createSubject=async ( currentState: CurrentState, data:SubjectSchema)=>
{
   try{
    await prisma.subject.create({
        
        data:{
            name:data.name,
            teachers:{
                connect:data?.teachers?.map(teacherId=>({id:teacherId}))
            }
        }
    })

 
    return {success:true,error:false}
   }catch(err)
   {
    console.log(err)
    return {success:false,error:true} 
   }
}
export const updateSubject=async ( currentState: CurrentState, data:SubjectSchema)=>
    {
       try{
        await prisma.subject.update({
            
            where:{
               id:data.id
            },
            data:{
                name:data.name,
                teachers:{set:data.teachers?.map((teacherId)=>({id:teacherId}))}
            }
        

        })
       
       //evalidatePath("/list/subject")
        return {success:true,error:false}
       }catch(err)
       {
        console.log(err)
        return {success:false,error:true} 
       }
    }

    export const deleteSubject=async ( currentState: CurrentState,formData: FormData)=>
        {
            const rawId = formData.get("id") ;
            if (!rawId || typeof rawId !== "string") {
                return { success: false, error: "Invalid or missing ID." };
            }
            const id = rawId;
           try{
            await prisma.subject.delete({
                
                where:{
                   id:id
                },
                
            
    
            })
           
          
            return {success:true,error:false}
           }catch(err)
           {
            console.log(err)
            return {success:false,error:true} 
           }
        }
    
        export const createClass=async ( currentState: CurrentState, data:ClassSchema)=>
            {
               try{
               const  grade=await prisma.grade.findUnique({
                where:{
                    id:data.gradeId
                }
               })

               if(grade){
                const match=data.name.match(/^\d+/)
                if(!match || match[0]!=grade.level)
                {
                    return { 
                        success: false, 
                        error: `Class and grade level do not match.` 
                      };
                }

               }
                await prisma.class.create({
                    
                    data: {
                        name: data.name,
                        capacity: data.capacity,
                        gradeId: data.gradeId,
                        supervisorId: data.supervisorId||null  ,
                    }
                })
            
                
                return {success:true,error:false}
               }catch(err)
               {
                console.log(err)
                return {success:false,error:true} 
               }
            }
            export const updateClass=async ( currentState: CurrentState, data:ClassSchema)=>
                {
                   try{
                    const  grade=await prisma.grade.findUnique({
                        where:{
                            id:data.gradeId
                        }
                       })
        
                       if(grade){
                        const match=data.name.match(/^\d+/)
                        if(!match || match[0]!=grade.level)
                        {
                            return { 
                                success: false, 
                                error: `Class and grade level do not match.` 
                              };
                        }
        
                       }
                    await prisma.class.update({
                        
                        where:{
                           id:data.id
                        },
                        data:{
                            name: data.name,
                         capacity: data.capacity,
                    
                    
                        gradeId: data.gradeId, 
                    
                   
                        supervisorId: data.supervisorId || null,  
                        }
                    
            
                    })
                   
                   //evalidatePath("/list/subject")
                    return {success:true,error:false}
                   }catch(err)
                   {
                    console.log(err)
                    return {success:false,error:true} 
                   }
                }
            
                export const deleteClass=async ( currentState: CurrentState,formData: FormData)=>
                    {
                        const rawId = formData.get("id") ;
                        if (!rawId || typeof rawId !== "string") {
                            return { success: false, error: "Invalid or missing ID." };
                        }
                        const id = rawId;
                       try{
                        await prisma.class.delete({
                            
                            where:{
                               id:id
                            },
                            
                        
                
                        })
                       
                      
                        return {success:true,error:false}
                       }catch(err)
                       {
                        console.log(err)
                        return {success:false,error:true} 
                       }
                    }
                
 
           
          
           
        export const createTeacher=async ( currentState: CurrentState, data:Teacherschema)=>
            {
                let createdUserId = null;
               try{
               
                const client = await clerkClient();
                const user = await client.users.createUser(
                    {
                        username:data.username,
                        password:data.password,
                        firstName:data.name,
                        lastName:data.surname,
                        publicMetadata:{role:"teacher"}
                    }
                )
                createdUserId = user.id;//what was happenfing clerk was working but prisma was failign so users where getting created in clerk but failing in prisma we now make sure if that happen we delete thiose user like a proo
                await prisma.teacher.create({          
                    data: {
                        username: data.username,
                        name: data.name,
                        clerkId:user.id,
                        surname: data.surname,
                        phone: data.phone,
                        email: data.email,
                        sex: data.sex,
                        address: data.address,
                        img: data.img || null,
                        subjects: {
                            connect: data.subjects?.map((subjectId) => ({ id: subjectId })) || []
                          }
                      }
                })
          
            
             
                return {success:true,error:false}
               }catch(err)
               {
                console.log(err)
                if (createdUserId) {
                    const client = await clerkClient();
                    await client.users.deleteUser(createdUserId);
                  }
                return {success:false,error:true} 
               }
            }
            export const updateTeacher=async ( currentState: CurrentState, data:Teacherschema)=>
                {
                    if(!data.id) 
                    {
                        return {success:false,error:true} ;
                    }
                   try{
                    const client = await clerkClient();
                    //why am i am first fetching id and not clerk id cause then if i get vlerk id from he front end it wil. be visible to other that is a data breach way for hacker ykykykyk
                     const existingTeacher=await prisma.teacher.findUnique({
                        where:{
                            id:data.id,
                        }
                     })
                     if (!existingTeacher) {
                        return { success: false, error: true };
                      }
                      if(existingTeacher.clerkId)
                      {
                        await client.users.updateUser(existingTeacher.clerkId,{
                            username: data.username,
                            firstName: data.name,
                             lastName: data.surname,
                             ...(data.password && data.password!=="" ? {password:data.password} : {})
                        })
                      }
                    await prisma.teacher.update({
                        
                        where:{
                           id:data.id
                        },
                        data: {
                            name: data.name,
                            surname: data.surname,
                            phone: data.phone,
                            img: data.img || null,
                            email: data.email === "" ? null : data.email, 
                            sex: data.sex,
                            address: data.address,
                            subjects:{set:data.subjects?.map((subjectId)=>({id:subjectId}))}
                          }
            
                    })
                   
                   
                    return {success:true,error:false}
                   }catch(err)
                   {
                    console.log(err)
                    return {success:false,error:true} 
                   }
                }
            
                export const deleteTeacher=async ( currentState: CurrentState,formData: FormData)=>
                    {

                       
                        const rawId = formData.get("id") ;
                        if (!rawId || typeof rawId !== "string") {
                            return { success: false, error: "Invalid or missing ID." };
                        }
                        const id = rawId;
                       try{
                        
                        const client = await clerkClient();
    
    
                     const teacherToDelete = await prisma.teacher.findUnique({
                      where: { id: id }
                        });

 
                        if (teacherToDelete && teacherToDelete.clerkId) {
                         await client.users.deleteUser(teacherToDelete.clerkId);
                         }
                        await prisma.teacher.delete({
                            
                            where:{
                               id:id
                            },
                            
                        
                
                        })
                       
                      
                        return {success:true,error:false}
                       }catch(err)
                       {
                        console.log(err)
                        return {success:false,error:true} 
                       }
                    }


                    export const createStudent=async ( currentState: CurrentState, data:Studentschema)=>
                        {
                            let createdUserId = null;
                           try{
                            const classItem=await prisma.class.findUnique({
                                where:{id:data.classId},
                                include:{_count:{select:{students:true}}}
                            })
                           if(classItem && classItem.capacity===classItem._count.students)
                           {
                            return { success: false, error: "This class is already full!" }
                           }

                           if (classItem && classItem.gradeId !== data.gradeId) {
                            return { success: false, error: "Mismatch! The selected Class does not belong to the selected Grade." }
                        }
                            const client = await clerkClient();
                            const user = await client.users.createUser(
                                {
                                    username:data.username,
                                    password:data.password,
                                    firstName:data.name,
                                    lastName:data.surname,
                                    publicMetadata:{role:"student"}
                                }
                            )
                            createdUserId = user.id;//what was happenfing clerk was working but prisma was failign so users where getting created in clerk but failing in prisma we now make sure if that happen we delete thiose user like a proo
                            await prisma.student.create({          
                                data: {
                                    username: data.username,
                                    name: data.name,
                                    clerkId:user.id,
                                    surname: data.surname,
                                    phone: data.phone,
                                    email: data.email,
                                    sex: data.sex,
                                    address: data.address,
                                    img: data.img || null,
                                    gradeId:data.gradeId,
                                    classId:data.classId
                                  }
                            })
                      
                        
                         
                            return {success:true,error:false}
                           }catch(err)
                           {
                            console.log(err)
                            if (createdUserId) {
                                const client = await clerkClient();
                                await client.users.deleteUser(createdUserId);
                              }
                            return {success:false,error:true} 
                           }
                        }
                        export const updateStudent=async ( currentState: CurrentState, data:Studentschema)=>
                            {
                                if(!data.id) 
                                {
                                    return {success:false,error:true} ;
                                }
                               try{
                                const client = await clerkClient();
                                //why am i am first fetching id and not clerk id cause then if i get vlerk id from he front end it wil. be visible to other that is a data breach way for hacker ykykykyk
                                const classItem=await prisma.class.findUnique({
                                    where:{id:data.classId},
                                     
                                })
                             
    
                               if (classItem && classItem.gradeId !== data.gradeId) {
                                return { success: false, error: "Mismatch! The selected Class does not belong to the selected Grade." }
                            }
                                 const existingStudent=await prisma.student.findUnique({
                                    where:{
                                        id:data.id,
                                    }
                                 })
                                 if (!existingStudent) {
                                    return { success: false, error: true };
                                  }
                                  if(existingStudent.clerkId)
                                  {
                                    await client.users.updateUser(existingStudent.clerkId,{
                                        username: data.username,
                                        firstName: data.name,
                                         lastName: data.surname,
                                         ...(data.password && data.password!=="" ? {password:data.password} : {})
                                    })
                                  }
                                await prisma.student.update({
                                    
                                    where:{
                                       id:data.id
                                    },
                                    data: {
                                        name: data.name,
                                        surname: data.surname,
                                        phone: data.phone,
                                        img: data.img || null,
                                        email: data.email === "" ? null : data.email, 
                                        sex: data.sex,
                                        address: data.address,
                                        gradeId:data.gradeId,
                                        classId:data.classId
                                      }
                        
                                })
                               
                               
                                return {success:true,error:false}
                               }catch(err)
                               {
                                console.log(err)
                                return {success:false,error:true} 
                               }
                            }
                        
                            export const deleteStudent=async ( currentState: CurrentState,formData: FormData)=>
                                {
            
                                   
                                    const rawId = formData.get("id") ;
                                    if (!rawId || typeof rawId !== "string") {
                                        return { success: false, error: "Invalid or missing ID." };
                                    }
                                    const id = rawId;
                                   try{
                                    
                                    const client = await clerkClient();
                
                
                                 const studentToDelete = await prisma.student.findUnique({
                                  where: { id: id }
                                    });
            
             
                                    if ( studentToDelete &&  studentToDelete.clerkId) {
                                     await client.users.deleteUser(studentToDelete.clerkId);
                                     }
                                    await prisma.student.delete({
                                        
                                        where:{
                                           id:id
                                        },
                                        
                                    
                            
                                    })
                                   
                                  
                                    return {success:true,error:false}
                                   }catch(err)
                                   {
                                    console.log(err)
                                    return {success:false,error:true} 
                                   }
                                }

                                export const createResult=async ( currentState: CurrentState, data:ResultSchema)=>
                                    {
                                       try{
                                       
                        
                                        
                                       
                                        await prisma.result.create({
                                            
                                            data:{
                                                score: data.score,
                                            
                                        
                                            examId: data.examId, 
                                            subjectId :data.subjectId ,
                                                
                                            studentId : data.studentId  ,  
                                            }
                                        })
                                    
                                        
                                        return {success:true,error:false}
                                       }catch(err)
                                       {
                                        console.log(err)
                                        return {success:false,error:true} 
                                       }
                                    }
                                    export const updateResult=async ( currentState: CurrentState, data:ResultSchema)=>
                                        {
                                           try{
                                             
                                            await prisma.result.update({
                                                
                                                where:{
                                                   id:data.id
                                                },
                                                data:{
                                                    score: data.score,
                                                
                                            
                                                examId: data.examId, 
                                                subjectId :data.subjectId ,
                                                    
                                                studentId : data.studentId  ,  
                                                }
                                            
                                    
                                            })
                                           
                                           //evalidatePath("/list/subject")
                                            return {success:true,error:false}
                                           }catch(err)
                                           {
                                            console.log(err)
                                            return {success:false,error:true} 
                                           }
                                        }
                                    
                                        export const deleteResult=async ( currentState: CurrentState,formData: FormData)=>
                                            {
                                                const rawId = formData.get("id") ;
                                                if (!rawId || typeof rawId !== "string") {
                                                    return { success: false, error: "Invalid or missing ID." };
                                                }
                                                const id = rawId;
                                               try{
                                                await prisma.result.delete({
                                                    
                                                    where:{
                                                       id:id
                                                    },
                                                    
                                                
                                        
                                                })
                                               
                                              
                                                return {success:true,error:false}
                                               }catch(err)
                                               {
                                                console.log(err)
                                                return {success:false,error:true} 
                                               }
                                            }
                                        
                                            export const createNotice=async ( currentState: CurrentState, data:NoticeSchema)=>
                                                {
                                                   try{
                                                   
                                    
                                                    
                                                   
                                                    await prisma.announcement.create({
                                                        
                                                        data:{
                                                            title:data.title,  
                                                            description:data.description,  
                                                            date:data.date,
                                                            classId:data.classId || null
                                                        }
                                                    })
                                                
                                                    
                                                    return {success:true,error:false}
                                                   }catch(err)
                                                   {
                                                    console.log(err)
                                                    return {success:false,error:true} 
                                                   }
                                                }
                                                export const updateNotice=async ( currentState: CurrentState, data:NoticeSchema)=>
                                                    {
                                                       try{
                                                         
                                                        await prisma.announcement.update({
                                                            
                                                            where:{
                                                               id:data.id
                                                            },
                                                            data:{
                                                                title:data.title,  
                                                                description:data.description,  
                                                                date:data.date,
                                                                classId:data.classId || null
                                                            }
                                                        
                                                
                                                        })
                                                       
                                                       //evalidatePath("/list/subject")
                                                        return {success:true,error:false}
                                                       }catch(err)
                                                       {
                                                        console.log(err)
                                                        return {success:false,error:true} 
                                                       }
                                                    }
                                                
                                                    export const deleteNotice=async ( currentState: CurrentState,formData: FormData)=>
                                                        {
                                                            const rawId = formData.get("id") ;
                                                            if (!rawId || typeof rawId !== "string") {
                                                                return { success: false, error: "Invalid or missing ID." };
                                                            }
                                                            const id = rawId;
                                                           try{
                                                            await prisma.announcement.delete({
                                                                
                                                                where:{
                                                                   id:id
                                                                },
                                                                
                                                            
                                                    
                                                            })
                                                           
                                                          
                                                            return {success:true,error:false}
                                                           }catch(err)
                                                           {
                                                            console.log(err)
                                                            return {success:false,error:true} 
                                                           }
                                                        }
                                                        export const createExam=async ( currentState: CurrentState, data:ExamSchema)=>
                                                            {
                                                               try{
                                                               
                                                
                                                                
                                                               
                                                                await prisma.exam.create({
                                                                    
                                                                    data:{
                                                                        title:data.title,  
                                                                        day:data.day,  
                                                                        startTime:data.startTime,
                                                                        endTime:data.endTime,
                                                                        lessonId:data.lessonId  
                                                                    }
                                                                })
                                                            
                                                                
                                                                return {success:true,error:false}
                                                               }catch(err)
                                                               {
                                                                console.log(err)
                                                                return {success:false,error:true} 
                                                               }
                                                            }
                                                            export const updateExam=async ( currentState: CurrentState, data:ExamSchema)=>
                                                                {
                                                                   try{
                                                                     
                                                                    await prisma.exam.update({
                                                                        
                                                                        where:{
                                                                           id:data.id
                                                                        },
                                                                        data:{
                                                                            title:data.title,  
                                                                            day:data.day,  
                                                                            startTime:data.startTime,
                                                                            endTime:data.endTime,
                                                                            lessonId:data.lessonId  
                                                                        }
                                                                    
                                                            
                                                                    })
                                                                   
                                                                   
                                                                    return {success:true,error:false}
                                                                   }catch(err)
                                                                   {
                                                                    console.log(err)
                                                                    return {success:false,error:true} 
                                                                   }
                                                                }
                                                            
                                                                export const deleteExam=async ( currentState: CurrentState,formData: FormData)=>
                                                                    {
                                                                        const rawId = formData.get("id") ;
                                                                        if (!rawId || typeof rawId !== "string") {
                                                                            return { success: false, error: "Invalid or missing ID." };
                                                                        }
                                                                        const id = rawId;
                                                                       try{
                                                                        await prisma.exam.delete({
                                                                            
                                                                            where:{
                                                                               id:id
                                                                            },
                                                                            
                                                                        
                                                                
                                                                        })
                                                                       
                                                                      
                                                                        return {success:true,error:false}
                                                                       }catch(err)
                                                                       {
                                                                        console.log(err)
                                                                        return {success:false,error:true} 
                                                                       }
                                                                    }
                                                                
                                                                    export const createLesson=async ( currentState: CurrentState, data:LessonSchema)=>
                                                                        {
                                                                           try{
                                                                           
                                                            
                                                                            
                                                                           
                                                                            await prisma.lesson.create({
                                                                                
                                                                                data:{
                                                                                  
                                                                                        name:data.name,  
                                                                                        day:data.day,  
                                                                                        startTime:data.startTime,
                                                                                        endTime:data.endTime,
                                                                                        subjectId:data.subjectId,  
                                                                                        classId:data.classId,  
                                                                                        teacherId:data.teacherId,  
                                                                                    
                                                                                
                                                                          
                                                                                }
                                                                            })
                                                                        
                                                                            
                                                                            return {success:true,error:false}
                                                                           }catch(err)
                                                                           {
                                                                            console.log(err)
                                                                            return {success:false,error:true} 
                                                                           }
                                                                        }
                                                                        export const updateLesson=async ( currentState: CurrentState, data: LessonSchema)=>
                                                                            {
                                                                               try{
                                                                                 
                                                                                await prisma.lesson.update({
                                                                                    
                                                                                    where:{
                                                                                       id:data.id
                                                                                    },
                                                                                    data:{
                                                                                        name:data.name,  
                                                                                        day:data.day,  
                                                                                        startTime:data.startTime,
                                                                                        endTime:data.endTime,
                                                                                        subjectId:data.subjectId,  
                                                                                        classId:data.classId,  
                                                                                        teacherId:data.teacherId,  
                                                                                    }
                                                                                
                                                                        
                                                                                })
                                                                               
                                                                               
                                                                                return {success:true,error:false}
                                                                               }catch(err)
                                                                               {
                                                                                console.log(err)
                                                                                return {success:false,error:true} 
                                                                               }
                                                                            }
                                                                        
                                                                            export const deleteLesson=async ( currentState: CurrentState,formData: FormData)=>
                                                                                {
                                                                                    const rawId = formData.get("id") ;
                                                                                    if (!rawId || typeof rawId !== "string") {
                                                                                        return { success: false, error: "Invalid or missing ID." };
                                                                                    }
                                                                                    const id = rawId;
                                                                                   try{
                                                                                    await prisma.lesson.delete({
                                                                                        
                                                                                        where:{
                                                                                           id:id
                                                                                        },
                                                                                        
                                                                                    
                                                                            
                                                                                    })
                                                                                   
                                                                                  
                                                                                    return {success:true,error:false}
                                                                                   }catch(err)
                                                                                   {
                                                                                    console.log(err)
                                                                                    return {success:false,error:true} 
                                                                                   }
                                                                                }
                                                                                export const createMaintainence=async ( currentState: CurrentState, data:MaintainenceSchema)=>
                                                                                    {
                                                                                       try{
                                                                                       
                                                                        
                                                                                        
                                                                                       
                                                                                        await prisma.maintenanceTicket.create({
                                                                                            
                                                                                            data:{
                                                                                              
                                                                                                   title:data.title,
                                                                                                    location:data.location,  
                                                                                                   description:data.description,
                                                                                                    status:data.status,
                                                                                                     
                                                                                                
                                                                                            
                                                                                      
                                                                                            }
                                                                                        })
                                                                                    
                                                                                        
                                                                                        return {success:true,error:false}
                                                                                       }catch(err)
                                                                                       {
                                                                                        console.log(err)
                                                                                        return {success:false,error:true} 
                                                                                       }
                                                                                    }
                                                                                    export const updateMaintainence=async ( currentState: CurrentState, data: MaintainenceSchema)=>
                                                                                        {
                                                                                           try{
                                                                                             
                                                                                            await prisma.maintenanceTicket.update({
                                                                                                
                                                                                                where:{
                                                                                                   id:data.id
                                                                                                },
                                                                                                data:{
                                                                                              
                                                                                                    title:data.title,
                                                                                                     location:data.location,  
                                                                                                    description:data.description,
                                                                                                     status:data.status,
                                                                                                      
                                                                                                 
                                                                                             
                                                                                       
                                                                                             }
                                                                                    
                                                                                            })
                                                                                           
                                                                                           
                                                                                            return {success:true,error:false}
                                                                                           }catch(err)
                                                                                           {
                                                                                            console.log(err)
                                                                                            return {success:false,error:true} 
                                                                                           }
                                                                                        }
                                                                                    
                                                                                        export const deleteMaintainence=async ( currentState: CurrentState,formData: FormData)=>
                                                                                            {
                                                                                                const rawId = formData.get("id") ;
                                                                                                if (!rawId || typeof rawId !== "string") {
                                                                                                    return { success: false, error: "Invalid or missing ID." };
                                                                                                }
                                                                                                const id = rawId;
                                                                                               try{
                                                                                                await prisma.maintenanceTicket.delete({
                                                                                                    
                                                                                                    where:{
                                                                                                       id:id
                                                                                                    },
                                                                                                    
                                                                                                
                                                                                        
                                                                                                })
                                                                                               
                                                                                              
                                                                                                return {success:true,error:false}
                                                                                               }catch(err)
                                                                                               {
                                                                                                console.log(err)
                                                                                                return {success:false,error:true} 
                                                                                               }
                                                                                            }
                                                                                        
                                                                         