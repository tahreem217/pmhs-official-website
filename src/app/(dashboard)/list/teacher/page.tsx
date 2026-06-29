import Pagination from "@/components/features/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/features/Searchbar";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import type { Teacher, Subject, Class } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { items_per_page } from "@/lib/setting";
import { auth } from "@clerk/nextjs/server";
import FilterBar from "@/components/features/FilterBar"; // Added missing import

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const getColumns = (role: string | undefined) => [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden lg:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: " ",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

const renderRow = (
  item: TeacherList,
  role: string | undefined,
  allsubject: any,
  allClasses: any
) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 border-t-2 odd:border-t-teal-300 even:border-t-purple-300 text-sm hover:bg-purple-50"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noavatar.jpg"}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
         <h3 className="font-semibold">{item.name} {item.surname}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>

    <td className="hidden md:table-cell">
      {item.subjects?.length > 0
        ? item.subjects.map((subject) => subject.name).join(", ")
        : "None"}
    </td>
    <td className="hidden lg:table-cell">
      {item.classes?.length > 0
        ? item.classes.map((classItem) => classItem.name).join(", ")
        : "None"}
    </td>
    <td className="">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal
              table="teacher"
              type="edit"
              data={item}
              relatedData={{ subjects: allsubject, classes: allClasses }}
            />
            <FormModal table="teacher" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.TeacherWhereInput = {};
  const queryConditions: Prisma.TeacherWhereInput[] = [];

  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            queryConditions.push({ lessons: { some: { classId: value } } });
            break;
          case "subjectId": // Added Subject Filter
            queryConditions.push({ subjects: { some: { id: value } } });
            break;
          case "search":
             queryConditions.push({
              OR: [
                { name: { contains: value, mode: "insensitive" } },
                { surname: { contains: value, mode: "insensitive" } },
              ],
            });
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

  const [data, count, allsubject, allClasses] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      orderBy: { name: 'asc' }, 
      take: items_per_page,
      skip: items_per_page * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
    prisma.subject.findMany({ select: { id: true, name: true } }),
    prisma.class.findMany({ select: { id: true, name: true } }),
  ]);

  const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          
           <FilterBar subjects={allsubject} classes={allClasses} />
          
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && (
              <FormModal
                table="teacher"
                type="create"
                relatedData={{ subjects: allsubject, classes: allClasses }}
              />
            )}
          </div>
        </div>
      </div>

      <Table
        column={columns}
        renderRow={(item) =>
          renderRow(item as TeacherList, role, allsubject, allClasses)
        }
        data={data}
      />

      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherListPage;