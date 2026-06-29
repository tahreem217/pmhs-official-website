import Pagination from "@/components/features/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/features/Searchbar";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import FilterBar from "@/components/features/FilterBar";

type LessonList = {
  id: string;
  day: string;
  subject: { name: string };
  class: { name: string };
  teacher: { name: string; surname: string };
};

const getColumns = (role: string | undefined) => [
  {
    header: "Subject",
    accessor: "subject",
    className: " ",
  },
  {
    header: "Day",
    accessor: "day",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: " ",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: " ",
  },
  ...(role === "admin"
    ? [
        {
          header: "Action",
          accessor: "action",
          className: " ",
        },
      ]
    : []),
];

const renderRow = (
  item: LessonList,
  role: string | undefined,
  allClasses: any,
  allSubject: any,
  allTeacher: any
) => (
  <tr key={item.id} className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
    <td className="flex my-4 gap-3 justify-start px-2 items-center">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.subject?.name || "N/A"}</h3>
      </div>
    </td>
    <td className="md:table-cell hidden">{item.day}</td>
    <td className=" ">{item.class?.name || "N/A"}</td>
    <td className=" ">
      {item.teacher ? `${item.teacher.name} ${item.teacher.surname}` : "N/A"}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal
              table="lesson"
              type="edit"
              id={item.id}
              data={item}
              relatedData={{ classes: allClasses, teachers: allTeacher, subjects: allSubject }}
            />
            <FormModal table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const lessonspage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;
  
  const query: Prisma.LessonWhereInput = {};
  const queryConditions: Prisma.LessonWhereInput[] = [];

  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            queryConditions.push({
              OR: [
                { subject: { name: { contains: value, mode: "insensitive" } } },
                { teacher: { name: { contains: value, mode: "insensitive" } } },
              ],
            });
            break;
          case "teacherId":
            queryConditions.push({ teacherId: value });
            break;
          case "classId":
            queryConditions.push({ classId: value });
            break;
          case "subjectId": // Added just in case FilterBar uses it!
            queryConditions.push({ subjectId: value });
            break;
          default:
            break;
        }
      }
    }
  }

  // Combine dynamically built conditions
  if (queryConditions.length > 0) {
    query.AND = queryConditions;
  }

  const [data, count, allClasses, allSubject, allTeacher] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
      },
      orderBy: { class: { name: "asc" } }, // Groups lessons cleanly by class
      take: items_per_page,
      skip: items_per_page * (p - 1),
    }),
    prisma.lesson.count({ where: query }),
    prisma.class.findMany({ select: { id: true, name: true } }),
    prisma.subject.findMany({ select: { id: true, name: true } }),
    prisma.teacher.findMany({ select: { id: true, name: true, surname: true } }),
  ]);

  const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <FilterBar subjects={allSubject} classes={allClasses} />
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && (
              <FormModal
                table="lesson"
                type="create"
                relatedData={{ classes: allClasses, teachers: allTeacher, subjects: allSubject }}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <Table
          column={columns}
          renderRow={(item) =>
            renderRow(item as unknown as LessonList, role, allClasses, allSubject, allTeacher)
          }
          data={data}
        />
      </div>

      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default lessonspage;