import Pagination from "@/components/features/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/features/Searchbar";
import FormModal from "@/components/FormModal";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FilterBar from "@/components/features/FilterBar";

type ResultList = {
  id: string;
  score: number;
  student: { name: string; surname: string; class: { name: string }; username: string };
  subject: { name: string };
  exam: {
    startTime: Date;
    lesson: {
      class: { name: string };
      subject: { name: string };
      teacher: { name: string; surname: string };
    };
  };
};

const getColumns = (role: string | undefined) => [
  { header: "Subject", accessor: "subject", className: " " },
  { header: "Class", accessor: "class", className: " " },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell " },
  { header: "Student", accessor: "student", className: " " },
  { header: "Score", accessor: "score", className: " " },
  { header: "Date", accessor: "date", className: "hidden lg:table-cell" },
  ...(role === "admin" || role === "teacher" ? [{ header: "Action", accessor: "action", className: " " }] : []),
];

const renderRow = (item: ResultList, role: string | undefined, allExams: any, allStudent: any, allSubject: any) => (
  <tr className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400" key={item.id}>
    <td className="flex my-4 gap-3 justify-start px-2 items-center">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.exam?.lesson?.subject?.name || "N/A"}</h3>
      </div>
    </td>
    <td>{item.student?.class?.name || "N/A"}</td>
    <td className="hidden md:table-cell">
      {item.exam?.lesson?.teacher ? `${item.exam.lesson.teacher.name} ${item.exam.lesson.teacher.surname}` : "N/A"}
    </td>
    <td>{item.student ? `${item.student.name} ${item.student.surname}` : "N/A"}</td>
    <td>{item.score}</td>
    <td className="hidden lg:table-cell">
      {item.exam?.startTime ? new Intl.DateTimeFormat("en-US").format(new Date(item.exam.startTime)) : "N/A"}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModal table="result" type="edit" id={item.id} data={item} relatedData={{ students: allStudent, exams: allExams, subjects: allSubject }} />
            <FormModal table="result" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const Resultpage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentId = userId;

  // Early return for students to save database queries
  if (role === "student") {
    return redirect(`/student/${currentId}/results`);
  }

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ResultWhereInput = {};

  let studentQuery: Prisma.StudentWhereInput = {};
  let examQuery: Prisma.ExamWhereInput = {};
  let teacherClassId: string | undefined = undefined;

  // Role specific Dropdown/Modal queries
  if (role === "teacher") {
    const supervisedClass = await prisma.class.findFirst({
      where: { supervisor: { clerkId: currentId as string } },
      select: { id: true },
    });

    teacherClassId = supervisedClass?.id;

    // Allow teachers to create/edit results for classes they supervise OR exams they teach
    examQuery = {
      OR: [
        { lesson: { classId: teacherClassId || "prevent_all" } },
        { lesson: { teacher: { clerkId: currentId as string } } },
      ],
    };
    studentQuery = {
      OR: [
        { classId: teacherClassId || "prevent_all" },
        { class: { lessons: { some: { teacher: { clerkId: currentId  as string} } } } },
      ],
    };
  }

  const queryConditions: Prisma.ResultWhereInput[] = [];

  // URL Parameter Filters
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            queryConditions.push({ studentId: value });
            break;
          case "subjectId":
            queryConditions.push({ exam: { lesson: { subjectId: value } } });
            break;
          case "classId":
          
            queryConditions.push({ student: { classId: value } });
            break;
          case "academicYear":
            queryConditions.push({ exam: { academicYear: value } });
            break;
          case "search":
            queryConditions.push({
              OR: [
                { student: { name: { contains: value, mode: "insensitive" } } },
                {
                  exam: {
                    lesson: {
                      teacher: {
                        OR: [
                          { name: { contains: value, mode: "insensitive" } },
                          { surname: { contains: value, mode: "insensitive" } },
                        ],
                      },
                    },
                  },
                },
              ],
            });
            break;
        }
      }
    }
  }

  
  if (role === "teacher") {
    queryConditions.push({
      OR: [
          
        { student: { classId: teacherClassId || "prevent_all" } },
         { exam: { lesson: { teacher: { clerkId: currentId as string } } } },
      ],
    });
  }

   if (queryConditions.length > 0) {
    query.AND = queryConditions;
  }

  const [data, count, allStudent, allExams, academicYear, allSubject, allClasses] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true, username: true, class: { select: { name: true } } } },
        exam: {
          include: {
            lesson: {
              include: {
                subject: { select: { name: true } },
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      orderBy: { exam: { lesson: { class: { name: "asc" } } } },
      take: items_per_page,
      skip: (p - 1) * items_per_page,
    }),
    prisma.result.count({ where: query }),
    prisma.student.findMany({
      where: studentQuery,
      select: { id: true, name: true, surname: true, username: true, class: { select: { name: true } } },
    }),
    prisma.exam.findMany({
      where: examQuery,
      include: {
        lesson: {
          include: {
            subject: true,
            class: true,
          },
        },
      },
    }),
    prisma.exam.findMany({
      distinct: ["academicYear"],
      select: { academicYear: true },
      orderBy: { academicYear: "desc" },
    }),
    prisma.subject.findMany({ select: { id: true, name: true } }),
    prisma.class.findMany({ select: { id: true, name: true } }),
  ]);

  const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="hidden text-lg font-semibold md:block">All Results</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {(role === "admin" || role === "teacher") && (
              <FormModal
                table="result"
                type="create"
                relatedData={{ students: allStudent, exams: allExams, subjects: allSubject }}
              />
            )}
            <FilterBar years={academicYear} classes={allClasses} students={allStudent} subjects={allSubject} />
          </div>
        </div>
      </div>

      <div>
        <Table
          column={columns}
          renderRow={(item) => renderRow(item as unknown as ResultList, role, allExams, allStudent, allSubject)}
          data={data}
        />
      </div>

      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default Resultpage;