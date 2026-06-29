import { PrismaClient, Usersex, Day } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Wiping data (keeping Admin safe)...")

  // Delete in order from child to parent relations
  await prisma.result.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.maintenanceTicket.deleteMany()

  await prisma.exam.deleteMany()
  await prisma.lesson.deleteMany()

  await prisma.student.deleteMany()
  await prisma.class.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.grade.deleteMany()
  
  // We explicitly DO NOT delete Admin here so you don't lose your Clerk access!
  // await prisma.admin.deleteMany() 
  
  console.log("✅ Data successfully wiped.");
  // We DO NOT delete Admin!

  console.log("🌱 Seeding database...");

  // 1. CREATE 10 GRADES
  console.log("Creating Grades...");
  for (let i = 1; i <= 10; i++) {
    await prisma.grade.create({ data: { level: `Grade ${i}` } });
  }
  const grades = await prisma.grade.findMany();

  // 2. CREATE 5 SUBJECTS
  console.log("Creating Subjects...");
  const subjectNames = ["Mathematics", "Science", "English", "History", "Art"];
  for (const name of subjectNames) {
    await prisma.subject.create({ data: { name } });
  }
  const subjects = await prisma.subject.findMany();

  // 3. CREATE 10 TEACHERS
  console.log("Creating Teachers...");
  for (let i = 1; i <= 10; i++) {
    await prisma.teacher.create({
      data: {
        clerkId: `clerk_teacher_${i}`, // Dummy Clerk ID
        username: `teacher${i}`,
        name: `TeacherName${i}`,
        surname: `TeacherSurname${i}`,
        email: `teacher${i}@school.com`,
        phone: `12345678${String(i).padStart(2, "0")}`, // Ensures unique 10-digit phone
        address: `${i} Main St, City`,
        sex: i % 2 === 0 ? Usersex.MALE : Usersex.FEMALE,
        bloodGroup: "O+",
        dob: new Date("1985-05-15"),
        subjects: {
          connect: [{ id: subjects[i % 5].id }]
        },// Assign 1 subject per teacher
      },
    });
  }
  const teachers = await prisma.teacher.findMany();

  // 4. CREATE 10 CLASSES (1 per Grade)
  console.log("Creating Classes...");
  for (let i = 0; i < 10; i++) {
    await prisma.class.create({
      data: {
        name: `${grades[i].level} - A`,
        capacity: 30,
        gradeId: grades[i].id,
        supervisorId: teachers[i].id, // Assign 1 teacher as supervisor
      },
    });
  }
  const classes = await prisma.class.findMany();

  // 5. CREATE 20 STUDENTS (2 per Class)
  console.log("Creating Students...");
  for (let i = 1; i <= 20; i++) {
    const assignedClass = classes[i % 10];
    await prisma.student.create({
      data: {
        clerkId: `clerk_student_${i}`, // Dummy Clerk ID
        username: `student${i}`,
        name: `StudentName${i}`,
        surname: `StudentSurname${i}`,
        email: `student${i}@school.com`,
        phone: `98765432${String(i).padStart(2, "0")}`,
        address: `${i} School Lane, City`,
        sex: i % 2 === 0 ? Usersex.MALE : Usersex.FEMALE,
        bloodGroup: "A+",
        dob: new Date("2010-08-20"),
        motherName: `Mother${i}`,
        fatherName: `Father${i}`,
        classId: assignedClass.id,
        gradeId: assignedClass.gradeId,
        teachers: {
          connect: [{ id: teachers[i % 10].id }]
        }, // Connect to a teacher
      },
    });
  }
  const students = await prisma.student.findMany();

  // 6. CREATE 20 LESSONS
  console.log("Creating Lessons...");
  const days = [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY];
  for (let i = 1; i <= 20; i++) {
    const cls = classes[i % 10];
    const teacher = teachers[i % 10];
    const subject = subjects[i % 5];
    
    // Create random start/end times between 8 AM and 2 PM
    const startTime = new Date();
    startTime.setHours(8 + (i % 6), 0, 0, 0); 
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    await prisma.lesson.create({
      data: {
        name: `${subject.name} 10${i}`,
        day: days[i % 5],
        startTime: startTime,
        endTime: endTime,
        classId: cls.id,
        teacherId: teacher.id,
        subjectId: subject.id,
      },
    });
  }
  const lessons = await prisma.lesson.findMany();

  // 7. CREATE 10 EXAMS & 20 RESULTS
  console.log("Creating Exams & Results...");
  for (let i = 0; i < 10; i++) {
    const lesson = lessons[i];
    
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(11, 0, 0, 0);

    const exam = await prisma.exam.create({
      data: {
        title: `Mid-Term ${lesson.name}`,
        academicYear: "2023-2024",
        startTime: startTime,
        endTime: endTime,
        lessonId: lesson.id,
      },
    });

    // Create 2 results per exam (for random students)
    for (let j = 0; j < 2; j++) {
      await prisma.result.create({
        data: {
          score: Math.floor(Math.random() * 40) + 60, // Random score between 60 and 100
          examId: exam.id,
          studentId: students[(i + j) % 20].id,
        },
      });
    }
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });