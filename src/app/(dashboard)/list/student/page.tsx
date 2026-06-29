import Pagination from "@/components/features/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/features/Searchbar";
import Image from "next/image";
import { type Student, type Class, type Teacher, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import FormModal from "@/components/FormModal";
import { items_per_page } from "@/lib/setting";
import { auth } from "@clerk/nextjs/server";
import FilterBar from "@/components/features/FilterBar"; // Added missing import

type StudentList = Student & { class: Class } & { teachers: Teacher[] };

const getColumns = (role: string | undefined) => [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "StudentID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: " ",
  },
  {
    header: "Class",
    accessor: "class",
    className: " hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
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
  item: StudentList,
  role: string | undefined,
  allClasses: any,
  allGrades: any
) => (
  <tr key={item.id} className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
    <td className="flex my-4 gap-3 justify-start px-2 items-center">
      <Image
        className="rounded-full w-12 h-12 object-cover"
        src={item.img || "/noavatar.jpg"}
        alt=""
        width={40}
        height={40}
      />

      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <h6 className="text-sm text-gray-500"> {item.username}</h6>
      </div>
    </td>

    <td className="md:table-cell hidden">{item.username}</td>
    <td className=" ">{item.phone}</td>
    <td className="md:table-cell hidden">{item.class?.name || "N/A"}</td>

    <td className="lg:table-cell hidden">{item.address}</td>

    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal
              table="student"
              type="edit"
              data={item}
              relatedData={{ classes: allClasses, grades: allGrades }}
            />
            <FormModal table="student" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const studentpage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentId = userId;

  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;
  
  const query: Prisma.StudentWhereInput = {};
  const queryConditions: Prisma.StudentWhereInput[] = [];

   if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
             queryConditions.push({
              OR: [
                { name: { contains: value, mode: "insensitive" } },
                { username: { contains: value, mode: "insensitive" } },
              ],
            });
            break;
          case "teacherId":
            queryConditions.push({ class: { lessons: { some: { teacherId: value } } } });
            break;
          case "classId": // Added Class Filter
            queryConditions.push({ classId: value });
            break;
          case "gradeId": // Added Grade Filter
            queryConditions.push({ gradeId: value });
            break;
          default:
            break;
        }
      }
    }
  }

  // --- 2. Process Role-Based Restrictions ---
  switch (role) {
    case "admin":
      break;
    case "teacher":
      // Now safely adds to the query without overwriting teacherId filters
      queryConditions.push({ class: { supervisor: { clerkId: currentId } } });
      break;
    default:
      break;
  }

  // Combine dynamically built conditions
  if (queryConditions.length > 0) {
    query.AND = queryConditions;
  }

  const [data, count, allClasses, allGrades] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
        teachers: true,
      },
      orderBy: { name: 'asc' }, 
      take: items_per_page,
      skip: items_per_page * (p - 1),
    }),
    prisma.student.count({ where: query }),
    prisma.class.findMany({ select: { id: true, name: true } }),
    prisma.grade.findMany({ select: { id: true, level: true } }),
  ]);

  const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          
         
          <FilterBar classes={allClasses} grades={allGrades} />
          
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && (
              <FormModal
                table="student"
                type="create"
                relatedData={{ classes: allClasses, grades: allGrades }}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <Table
          column={columns}
          renderRow={(item) => renderRow(item as StudentList, role, allClasses, allGrades)}
          data={data}
        />
      </div>

      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default studentpage;