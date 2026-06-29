import Pagination from "@/components/features/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/features/Searchbar";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { auth } from "@clerk/nextjs/server";
import { role } from "@/lib/data";
import FilterBar from "@/components/features/FilterBar";
 

 type ExamList = {
  title:string,
  academicYear:string,
  id: string;
  startTime: Date;
  endTime: Date;
  lesson: {
    subject: { name: string };
    teacher: { id: string; name: string; surname: string };
    class: { name: string };
  };
};

 const getColumns = (role: string | undefined) => [
  {
    header: "Title",
    accessor: "title",
    className: " ",
  },
  {
    header: "Subject",
    accessor: "subject",
    className: " ",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "",
  },
  {
    header: "StartTime",
    accessor: "startTime",
    className: " ",
  },
  {
    header: "EndTime",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" ? [{
    header: "Action",
    accessor: "action",
    className: " ",
  }] : [])
];

 const renderRow = (item: ExamList, role: string | undefined,alllesson:any) => (
  <tr key={item.id} className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
     <td className="p-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{item.title || "N/A"}</h3>
        <span className="text-xs text-gray-500">{item.academicYear || "N/A"}</span>
      </div>
    </td>
    <td className="flex my-4 gap-3 justify-start px-2 items-center" >
      <h3 className="font-semibold">{item.lesson?.subject?.name || "N/A"}</h3>
    </td>

    <td className="hidden md:table-cell">{item.lesson?.class?.name || "N/A"}</td>
     
    <td className="">
      {new Intl.DateTimeFormat("en-US").format(new Date(item.startTime))}
    </td>
    <td className="">
      {new Date(item.startTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </td>     
    <td className="hidden md:table-cell">
      {new Date(item.endTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </td>      

    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="exam" type="edit" id={item.id} data={item} relatedData={{lessons:alllesson}} />
            <FormModal table="exam" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);


 const exampage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
 

  const { sessionClaims ,userId} = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
 
 const currentId=userId;
  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ExamWhereInput = {};
 
 
  const queryConditions: Prisma.ExamWhereInput[] = [];

  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            queryConditions.push({
              OR: [
                { title: { contains: value, mode: "insensitive" } },
                { lesson: { subject: { name: { contains: value, mode: "insensitive" } } } },
              ],
            });
            break;
          case "classId":
            queryConditions.push({ lesson: { classId: value } });
            break;
          case "teacherId":
            queryConditions.push({ lesson: { teacherId: value } });
            break;
          case "academicYear":
            queryConditions.push({ academicYear: value });
            break;
          case "subjectId":
            queryConditions.push({ lesson: { subjectId: value } });
            break;
          case "examId":
            queryConditions.push({ id: value });
            break;
          default:
            break;
        }
      }
    }
  }
 
  if (queryConditions.length > 0) {
    query.AND = queryConditions;
  }
   
  
   const [data, count,allesson,allYears,allClasses,allSubjects,allExams] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true, id: true } },
            class: { select: { name: true } },
          } 
        }
      },
      take: items_per_page,
      skip: items_per_page * (p - 1)
    }),
    prisma.exam.count({ where: query }),
    prisma.lesson.findMany({ include: { 
      subject: true,
      class: true  
    }}),
    prisma.exam.findMany({ select: { academicYear: true }, distinct: ["academicYear"] }),
    prisma.class.findMany({ select: { id: true, name: true } }),
    prisma.subject.findMany({ select: { id: true, name: true } }),
    prisma.exam.findMany({ select: { id: true, title: true } })
  ]);
 
   const columns = getColumns(role);
 
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <FilterBar years={allYears} exams={allExams} classes={allClasses} subjects={allSubjects} />
          <div className="flex items-center gap-4 self-end">
           
            {role === "admin" && (
              <FormModal table="exam" type="create" relatedData={{lessons:allesson}} />
            )}
          </div>
        </div>
      </div>

       <div>
        <Table column={columns} renderRow={(item) => renderRow(item as unknown as ExamList, role,allesson)} data={data} />
      </div>

       <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default exampage;