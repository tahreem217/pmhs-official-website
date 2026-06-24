import {z} from "zod";

export const subjectSchema = z.object({
    id:z.string().optional(),
     name: z.string().min(1, { message: 'Subject name is required' }) ,
    teachers: z.array(z.string()).optional(),
  });

 export  type SubjectSchema=z.infer<typeof subjectSchema>;

 export const classSchema = z.object({
    id:z.string().optional(),
     name: z.string().min(1, { message: 'Subject name is required' }) ,
     gradeId: z.string().min(1, { message: 'Grade  is required' }) ,
     capacity: z.coerce.number().min(1, { message: 'Valid capacity is required' }) ,
     supervisorId: z.string().optional() ,
    
  });

 export  type ClassSchema=z.infer<typeof classSchema>;

 export const teacherschema = z.object({
   id:z.string().optional(),
    name: z.string().min(1, { message: 'Teacher name is required' }) ,
    surname: z.string().min(1, { message: 'Surname  is required' }) ,
    username: z.string().min(1, { message: 'Username  is required' }) ,
    password: z.string().min(3, { message: 'Password must be of atleat 3 length' }).optional().or(z.literal("")) ,
    phone: z.string().min(10, { message: 'Valid Phone number is required' }) ,
    email: z.email({message:"Please enter a valid email"}).optional().or(z.literal("")) ,
    sex:z.enum(["MALE","FEMALE"], { message: 'Please select gender' }) ,
    address:z.string().min(1, { message: 'Adrress is required' }) ,
    teachers: z.array(z.string()).optional(),
    img: z.any().optional(),
    subjects:z.array(z.string()).optional()
   
 });

export  type Teacherschema=z.infer<typeof teacherschema>;

export const studentSchema = z.object({
   id:z.string().optional(),
    name: z.string().min(1, { message: 'Teacher name is required' }) ,
    surname: z.string().min(1, { message: 'Surname  is required' }) ,
    username: z.string().min(1, { message: 'Username  is required' }) ,
    password: z.string().min(3, { message: 'Password must be of atleat 3 length' }).optional().or(z.literal("")) ,
    phone: z.string().min(10, { message: 'Valid Phone number is required' }) ,
    email: z.email({message:"Please enter a valid email"}).optional().or(z.literal("")) ,
    sex:z.enum(["MALE","FEMALE"], { message: 'Please select gender' }) ,
    address:z.string().min(1, { message: 'Adrress is required' }) ,
     
    img: z.any().optional(),
    classId:z.string().min(10, { message: 'Class is required' }) ,
    gradeId:z.string().min(10, { message: 'Grade is required' }) ,
   
   
 });

export  type Studentschema=z.infer<typeof studentSchema>;

export const resultSchema = z.object({
   id:z.string().optional(),
   //if the scoreis left empty "" zod will converrt it in 0 and send so we must ensure that score is processsed here before zod process it so we use -->z.preprocess
   score: z.preprocess(
      (val) => (val === "" || val === null ? undefined : Number(val)), 
      z.number({
         message: "Score is required and must be a number!"
      })
      .min(0, { message: 'Score must be 0 or greater' })
      .max(100, { message: 'Score cannot exceed 100' })
    ),
    
    examId: z.string().min(1, { message: 'Exam is required' }) ,
    subjectId: z.string().min(1, { message: 'Subject is required' }) ,
    studentId: z.string().min(1, { message: 'student is required' }) ,
     
   
 });

export  type ResultSchema=z.infer<typeof resultSchema>;



export const noticeSchema = z.object({
   id:z.string().optional(),
   //if the scoreis left empty "" zod will converrt it in 0 and send so we must ensure that score is processsed here before zod process it so we use -->z.preprocess
   title:z.string().min(1, { message: 'Notice title is required' }) ,
    
   description: z.string().min(1, { message: 'Notice description is required' }) ,
   date: z.coerce.date({ message: 'Date is required' }) ,
   classId: z.string().optional(),
     
   
 });

export  type NoticeSchema=z.infer<typeof noticeSchema>;

// "To coerce" simply means to force something to change its type.

// When you use z.coerce.date(), you are telling Zod: "Hey, I know the data coming from the frontend is going to arrive as a string text, but I want you to force it into a real JavaScript Date object before checking it."


export const examSchema = z.object({
   id:z.string().optional(),
   //if the scoreis left empty "" zod will converrt it in 0 and send so we must ensure that score is processsed here before zod process it so we use -->z.preprocess
   title:z.string().min(1, { message: 'Notice title is required' }) ,
    
   day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
     message: 'Please select a day for exam'
    }),
   startTime: z.coerce.date({ message: 'StartTime of exam is required' }) ,
   endTime: z.coerce.date({ message: 'Endtime of exam is required' }) ,
   lessonId: z.string(),
     
   
 }).refine((data) => data.endTime > data.startTime, {
   message: "End time cannot be before the start time",
   path: ["endTime"], 
 });

//  refine is specifically used here for cross-field validation—meaning we need to look at two separate inputs at the same time to decide if the form is valid.
//  If you didn't include path: ["endTime"], React Hook Form wouldn't know which input field caused the problem. By adding the path, you are explicitly telling Zod: "If this validation fails, attach the error message to the endTime input."
export  type ExamSchema=z.infer<typeof examSchema>;

export const lessonSchema = z.object({
   id:z.string().optional(),
   name:z.string().min(1, { message: 'Lesson name  is required' }) ,
    
   day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
     message: 'Please select a day for lesson'
    }),
   startTime: z.coerce.date({ message: 'StartTime of lesson is required' }) ,
   endTime: z.coerce.date({ message: 'Endtime of lesson is required' }) ,
   classId: z.string(),
   subjectId: z.string(),
   teacherId: z.string(),
     
   
 }).refine((data) => data.endTime > data.startTime, {
   message: "End time cannot be before the start time",
   path: ["endTime"], 
 });

 export  type LessonSchema=z.infer<typeof lessonSchema>;

 export const maintainenceSchema = z.object({
   id:z.string().optional(),
   title:z.string().min(1, { message: 'Repair name  is required' }) ,
    description:z.string().min(1, { message: 'Description  is required' }) ,
   status: z.enum(["Pending", "Completed"], {
     message: 'Please select a status'
    }),
    location:z.string().optional()
    
     
   
 }) 
    

 export  type MaintainenceSchema=z.infer<typeof maintainenceSchema>;
