"use server"

import { revalidatePath } from "next/cache"
import type { ClassSchema, ExamSchema, LessonSchema, 
     MaintainenceSchema, NoticeSchema, ResultSchema, Studentschema, SubjectSchema,Teacherschema } from "./formValidationSchema"
import prisma from "./prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"
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
                
 
           
          
           
                    export const createTeacher = async (currentState: any, data: Teacherschema) => {
                        let createdUserId = null;
                        try {
                            console.log("🔥 SERVER RECEIVED THIS EXACT DATA:", JSON.stringify(data, null, 2));
                          const client = await clerkClient();
                          const user = await client.users.createUser({
                            username: data.username,
                            password: data.password,
                            firstName: data.name,
                            lastName: data.surname,
                            publicMetadata: { role: "teacher" },
                          });
                          createdUserId = user.id;
                      
                          await prisma.teacher.create({
                            data: {
                              username: data.username,
                              name: data.name,
                              clerkId: user.id,
                              surname: data.surname,
                              phone: data.phone,
                              email: data.email || null,
                              sex: data.sex,
                              bloodGroup: data.bloodGroup || null,
                              motherName: data.motherName || null,
                              fatherName: data.fatherName || null,
                              dob: data.dob ? new Date(data.dob) : null,
                              address: data.address,
                              img: data.img || null,
                      
                              // SAFELY EXTRACT ID: Handles both strings and objects gracefully
                              classes: data.classes
                                ? {
                                    connect: Array.isArray(data.classes)
                                      ? data.classes.map((c: any) => ({ id: typeof c === "object" ? c.id : c }))
                                      : [{ id: typeof data.classes === "object" ? (data.classes as any).id : data.classes }],
                                  }
                                : undefined,
                      
                              // SAFELY EXTRACT ID: Handles both strings and objects gracefully
                              subjects: data.subjects
                                ? {
                                    connect: data.subjects.map((s: any) => ({ id: typeof s === "object" ? s.id : s })),
                                  }
                                : undefined,
                            },
                          });
                      
                          return { success: true, error: false };
                        } catch (err) {
                          console.log(err);
                          if (createdUserId) {
                            const client = await clerkClient();
                            await client.users.deleteUser(createdUserId);
                          }
                          return { success: false, error: true };
                        }
                      };
                      
                      export const updateTeacher = async (currentState: any, data: Teacherschema) => {
                        if (!data.id) {
                          return { success: false, error: true };
                        }
                        try {
                          const client = await clerkClient();
                          const existingTeacher = await prisma.teacher.findUnique({
                            where: {
                              id: data.id,
                            },
                          });
                          
                          if (!existingTeacher) {
                            return { success: false, error: true };
                          }
                          
                          if (existingTeacher.clerkId) {
                            await client.users.updateUser(existingTeacher.clerkId, {
                              username: data.username,
                              firstName: data.name,
                              lastName: data.surname,
                              ...(data.password && data.password !== "" ? { password: data.password } : {}),
                            });
                          }
                          
                          await prisma.teacher.update({
                            where: {
                              id: data.id,
                            },
                            data: {
                              name: data.name,
                              surname: data.surname,
                              phone: data.phone,
                              username: data.username,
                              img: data.img || null,
                              bloodGroup: data.bloodGroup || null,
                              motherName: data.motherName || null,
                              fatherName: data.fatherName || null,
                              dob: data.dob ? new Date(data.dob) : null,
                              email: data.email === "" ? null : data.email,
                              sex: data.sex,
                              address: data.address,
                      
                              // SAFELY EXTRACT ID using 'set' for updates
                            // 1. CLASSES
classes: data.classes
? {
    set: (Array.isArray(data.classes) ? data.classes : [data.classes])
      .filter((c: any) => c !== "") // Destroys empty strings from the form
      .map((c: any) => ({ id: typeof c === "object" ? c.id : String(c) })),
  }
: { set: [] }, // Wipes the classes if "None" is selected

// 2. SUBJECTS
subjects: data.subjects
? {
    set: (Array.isArray(data.subjects) ? data.subjects : [data.subjects])
      .filter((s: any) => s !== "") // Destroys empty strings from the form
      .map((s: any) => ({ id: typeof s === "object" ? s.id : String(s) })),
  }
: { set: [] }, // Wipes the subjects if all boxes are unchecked
                            },
                          });
                      
                          return { success: true, error: false };
                        } catch (err) {
                          console.log(err);
                          return { success: false, error: true };
                        }
                      };
                      // ... existing c
            
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


                    export const createStudent = async (currentState: CurrentState, data: Studentschema) => {
                        let createdUserId = null;
                        try {
                          const classItem = await prisma.class.findUnique({
                            where: { id: data.classId },
                            include: { _count: { select: { students: true } } }
                          });
                      
                          if (classItem && classItem.capacity === classItem._count.students) {
                            return { success: false, error: "This class is already full!" };
                          }
                      
                          if (classItem && classItem.gradeId !== data.gradeId) {
                            return { success: false, error: "Mismatch! The selected Class does not belong to the selected Grade." };
                          }
                      
                          const client = await clerkClient();
                          const user = await client.users.createUser({
                            username: data.username,
                            password: data.password,
                            firstName: data.name,
                            lastName: data.surname,
                            publicMetadata: { role: "student" }
                          });
                      
                          createdUserId = user.id;
                      
                          await prisma.student.create({
                            data: {
                              username: data.username,
                              name: data.name,
                              clerkId: user.id,
                              surname: data.surname,
                              phone: data.phone,
                              email: data.email,
                              sex: data.sex,
                              address: data.address,
                              img: data.img || null,
                              gradeId: data.gradeId,
                              classId: data.classId,
                              motherName: data.motherName || null,
                              fatherName: data.fatherName || null,
                              bloodGroup: data.bloodGroup || null,
                              dob: data.dob ? new Date(data.dob) : null,
                            }
                          });
                      
                          return { success: true, error: false };
                        } catch (err) {
                          console.log(err);
                          if (createdUserId) {
                            const client = await clerkClient();
                            await client.users.deleteUser(createdUserId);
                          }
                          return { success: false, error: true };
                        }
                      };
                      
                      export const updateStudent = async (currentState: CurrentState, data: Studentschema) => {
                        if (!data.id) {
                          return { success: false, error: true };
                        }
                        
                        try {
                          const client = await clerkClient();
                          
                          const classItem = await prisma.class.findUnique({
                            where: { id: data.classId },
                          });
                      
                          if (classItem && classItem.gradeId !== data.gradeId) {
                            return { success: false, error: "Mismatch! The selected Class does not belong to the selected Grade." };
                          }
                      
                          const existingStudent = await prisma.student.findUnique({
                            where: {
                              id: data.id,
                            }
                          });
                      
                          if (!existingStudent) {
                            return { success: false, error: true };
                          }
                      
                          if (existingStudent.clerkId) {
                            await client.users.updateUser(existingStudent.clerkId, {
                              username: data.username,
                              firstName: data.name,
                              lastName: data.surname,
                              ...(data.password && data.password !== "" ? { password: data.password } : {})
                            });
                          }
                      
                          await prisma.student.update({
                            where: {
                              id: data.id
                            },
                            data: {
                              name: data.name,
                              surname: data.surname,
                              phone: data.phone,
                              img: data.img || null,
                              email: data.email === "" ? null : data.email,
                              sex: data.sex,
                              username: data.username,
                              address: data.address,
                              gradeId: data.gradeId,
                              classId: data.classId,
                              motherName: data.motherName || null,
                              fatherName: data.fatherName || null,
                              bloodGroup: data.bloodGroup || null,
                              dob: data.dob ? new Date(data.dob) : null,
                            }
                          });
                      
                          return { success: true, error: false };
                        } catch (err) {
                          console.log(err);
                          return { success: false, error: true };
                        }
                      };
                      // ... existing code ..
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
                                        const { userId, sessionClaims } = await auth();
                                        const role = (sessionClaims?.metadata as { role?: string })?.role;
                        
                                        if (role === "teacher") {
                                            const teacher = await prisma.teacher.findFirst({
                                              where: { clerkId: userId as string},
                                            });
                                      
                                            if (!teacher) return { success: false, error: true };
                                      
                                            // Make sure this student belongs to a class they teach OR supervise
                                            const teacherClasses = await prisma.class.findMany({
                                                where: {
                                                  OR: [
                                                    { lessons: { some: { teacherId: teacher.id } } },
                                                    { supervisorId: teacher.id }
                                                  ]
                                                },
                                                select: { id: true }
                                              });
                                        
                                              const validClassIds = teacherClasses.map(c => c.id);
                                        
                                              // --- 2. Safely verify the student is in one of those valid classes ---
                                              const validStudent = await prisma.student.findUnique({
                                                where: {
                                                  id: data.studentId,
                                                  classId: { in: validClassIds }
                                                }
                                              });
                                            if (!validStudent) {
                                              
                                                return { success: false, error: "Security Alert: Teacher attempted to grade an unauthorized student"}
                                              }
                                        }
                                        const exam = await prisma.exam.findUnique({
                                            where: { id: data.examId },
                                            include: { lesson: true } 
                                          });
                                      
                                          // 2. If someone sends a bad exam ID, stop right here
                                          const student=await prisma.student.findUnique({
                                            where: { id: data.studentId },
                                            select: { classId: true } // We only need their classId!
                                          })
                                              // 2. If someone sends a bad exam ID, stop right here
                                              if (!exam || !exam.lesson || !student) {
                                                return { success: false, error: "Exam or Lesson or student not found!" };
                                              }
                                              if (exam.lesson.classId !== student.classId) {
                                                return { 
                                                  success: false, 
                                                  error: "Validation Failed: This student is not in the class assigned to this exam." 
                                                };
                                              }
                                        await prisma.result.create({
                                            
                                            data:{
                                                score: parseInt(data.score.toString(), 10),
                                            
                                        
                                                exam: {
                                                    connect: { id: data.examId }
                                                  },
                                                  
                                                  // Connect the Student
                                                  student: {
                                                    connect: { id: data.studentId }
                                                  },
                                                  
                                                  // Connect the Subject using the ID we just pulled from the lesson!
                                                 
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
                                            const { userId, sessionClaims } = await auth();
                                            const role = (sessionClaims?.metadata as { role?: string })?.role;
                            
                                            if (role === "teacher") {
                                                const teacher = await prisma.teacher.findUnique({
                                                  where: { clerkId: userId as string },
                                                });
                                          
                                                if (!teacher) return { success: false, error: true };
                                          
                                                // Make sure this student belongs to a class they teach OR supervise
                                                const teacherClasses = await prisma.class.findMany({
                                                    where: {
                                                      OR: [
                                                        { lessons: { some: { teacherId: teacher.id } } },
                                                        { supervisorId: teacher.id }
                                                      ]
                                                    },
                                                    select: { id: true }
                                                  });
                                            
                                                  const validClassIds = teacherClasses.map(c => c.id);
                                            
                                                  // --- 2. Safely verify the student is in one of those valid classes ---
                                                  const validStudent = await prisma.student.findFirst({
                                                    where: {
                                                      id: data.studentId,
                                                      classId: { in: validClassIds }
                                                    }
                                                  });
                                                if (!validStudent) {
                                                  
                                                    return { success: false, error: "Security Alert: Teacher attempted to grade an unauthorized student"}
                                                  }
                                            }
                                            const exam = await prisma.exam.findUnique({
                                                where: { id: data.examId },
                                                include: { lesson: true } 
                                              });
                                          const student=await prisma.student.findUnique({
                                            where: { id: data.studentId },
                                            select: { classId: true } // We only need their classId!
                                          })
                                              // 2. If someone sends a bad exam ID, stop right here
                                              if (!exam || !exam.lesson || !student) {
                                                return { success: false, error: "Exam or Lesson or student not found!" };
                                              }
                                              if (exam.lesson.classId !== student.classId) {
                                                return { 
                                                  success: false, 
                                                  error: "Validation Failed: This student is not in the class assigned to this exam." 
                                                };
                                              }
                                            await prisma.result.update({
                                                
                                                where:{
                                                   id:data.id
                                                },
                                                data:{
                                                    score: parseInt(data.score.toString(), 10),
                                                
                                                    exam: {
                                                        connect: { id: data.examId }
                                                      },
                                                      
                                                      // Connect the Student
                                                      student: {
                                                        connect: { id: data.studentId }
                                                      },
                                                      
                                                      // Connect the Subject using the ID we just pulled from the lesson!
                                                     
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
                                                                        
                                                                        startTime:new Date(data.startTime),
                                                                        endTime:new Date(data.endTime),
                                                                        lessonId:data.lessonId  ,
                                                                        academicYear: data.academicYear,
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
                                                                            
                                                                            startTime:new Date(data.startTime),
                                                                            endTime:new Date(data.endTime),
                                                                            lessonId:data.lessonId , 
                                                                            academicYear: data.academicYear,
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
                                                                                        startTime:new Date(data.startTime),
                                                                                        endTime:new Date(data.endTime),
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
                                                                                        startTime:new Date(data.startTime),
                                                                                        endTime:new Date(data.endTime),
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
                                                                                        
                                                                         