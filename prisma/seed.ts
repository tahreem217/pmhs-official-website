import { PrismaClient, Usersex, Day } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Wiping database in a single transaction...");

  // 1. Delete everything in a specific order (Children FIRST, Parents LAST)
  await prisma.$transaction([
    prisma.result.deleteMany(),
    prisma.attendance.deleteMany(),
    prisma.exam.deleteMany(),
    prisma.lesson.deleteMany(),
    prisma.event.deleteMany(),
    prisma.announcement.deleteMany(),
    
    prisma.student.deleteMany(),
    prisma.class.deleteMany(),

    prisma.teacher.deleteMany(),
    prisma.subject.deleteMany(),
    prisma.grade.deleteMany(),

    prisma.admin.deleteMany(),
    prisma.maintenanceTicket.deleteMany(),
  ]);

  console.log("Starting to seed the database...");
  
  // ADMIN
  await prisma.admin.create({ data: { username: "admin1" } });
  await prisma.admin.create({ data: { username: "admin2" } });

  // GRADES
  const grades = [];
  for (let i = 1; i <= 10; i++) {
    const grade = await prisma.grade.create({
      data: { level: String(i) },
    });
    grades.push(grade);
  }

  // SUBJECTS
  const subjects = [];
  const subjectNames = ["Mathematics", "Science", "English", "History", "Geography", "Physics"];
  for (const name of subjectNames) {
    const subject = await prisma.subject.create({ data: { name } });
    subjects.push(subject);
  }

  // TEACHERS
  const teachers = [];
  for (let i = 1; i <= 19; i++) {
    const teacher = await prisma.teacher.create({
      data: {
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Teacher Address ${i}`,
        sex: i % 2 === 0 ? Usersex.MALE : Usersex.FEMALE,
        subjectIds: [subjects[i % subjects.length].id], // Fixed: use subjectIds directly for MongoDB
      },
    });
    teachers.push(teacher);
  }

  // CLASSES
  const classes = [];
  for (let i = 1; i <= 10; i++) {
    const newClass = await prisma.class.create({
      data: {
        name: `${i}A`,
        capacity: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
        supervisorId: teachers[i - 1].id, 
        gradeId: grades[i - 1].id,
      },
    });
    classes.push(newClass);
  }

  // STUDENTS
  const students = [];
  for (let i = 1; i <= 200; i++) {
    const student = await prisma.student.create({
      data: {
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Student Address ${i}`,
        sex: i % 2 === 0 ? Usersex.MALE : Usersex.FEMALE,
        classId: classes[i % classes.length].id,
        gradeId: grades[i % grades.length].id,
        teacherIds: [teachers[i % teachers.length].id], // Fixed: use teacherIds directly for MongoDB
      },
    });
    students.push(student);
  }

  // LESSONS
  const lessons = [];
  for (let i = 1; i <= 30; i++) {
    const lesson = await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        subjectId: subjects[i % subjects.length].id,
        classId: classes[i % classes.length].id,
        teacherId: teachers[i % teachers.length].id,
      },
    });
    lessons.push(lesson);
  }

  // EXAMS
  const exams = [];
  for (let i = 1; i <= 10; i++) {
    const exam = await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        day: Day.FRIDAY,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: lessons[i % lessons.length].id,
      },
    });
    exams.push(exam);
  }

  // RESULTS
  for (let i = 1; i <= 50; i++) {
    await prisma.result.create({
      data: {
        score: Math.floor(Math.random() * (90 - 80 + 1)) + 80,
        examId: exams[i % exams.length].id,
        subjectId: subjects[i % subjects.length].id, 
        studentId: students[i % students.length].id,
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 50; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: i % 10 !== 0,
        studentId: students[i % students.length].id,
        lessonId: lessons[i % lessons.length].id,
      },
    });
  }

  // EVENTS
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 4)),
        classId: classes[i % classes.length].id,
      },
    });
  }

  // ANNOUNCEMENTS
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Important Announcement ${i}`,
        date: new Date(),
        classId: classes[i % classes.length].id,
      },
    });
  }

  // MAINTENANCE TICKETS
  const ticketLocations = ["Lab 3", "Staff Room A", "Block B, Floor 2", "Classroom 8B", "Main Gate"];
  const ticketStatuses = ["Completed", "Pending"];
  const ticketItems = ["Projector", "AC Unit", "Water Filter", "Window Latch", "Security Camera"];
  
  for (let i = 0; i < 5; i++) {
    await prisma.maintenanceTicket.create({
      data: {
        title: `Fix ${ticketItems[i]}`,
        location: ticketLocations[i % ticketLocations.length],
        description: `Routine service check and repair work logged for the school's ${ticketItems[i].toLowerCase()}.`,
        status: ticketStatuses[i % 2], 
        createdAt: new Date(new Date().setDate(new Date().getDate() - i)),
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });