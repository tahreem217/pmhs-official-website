import Pagination from "@/components/features/Pagination";
import Table from "@/components/ui/Table";
import TableSearch from "@/components/features/Searchbar";

import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Prisma, type Class, type Announcement } from "@prisma/client";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { auth } from "@clerk/nextjs/server";


type AnnouncementLists = Announcement & { class: Class }

 
const getColumns = (role: string | undefined) => [
  {
    header: " Title",
    accessor: "title",
    className: " ",
  },
  {
    header: "Class",
    accessor: "class",
    className: " ",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" ? [{
    header: "Action",
    accessor: "action",
    className: " ",
  }] : [])
];

 
const renderRow = (item: AnnouncementLists, role: string | undefined,allClasses:any) => (
  <tr className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
    <td className="flex my-4 gap-3 justify-start px-2 items-center" >
      <div className="flex flex-col">
        <h6 className="font-semibold">{item.title}</h6>
        <h3 className="text-sm text-gray-600">{item.description}</h3>
      </div>
    </td>
    <td className=" ">{item.class?.name || "General Announcement"}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(new Date(item.date))}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="announcements" type="edit" id={item.id} data={item} relatedData={{classes:allClasses}}/>
            <FormModal table="announcements" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

 
const exampage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
 
  

  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.AnnouncementWhereInput = {};
  
  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value != undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
        }
      }
    }
  }

  
  const [data, count,allClasses] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true
      },
      take: items_per_page,
      skip: items_per_page * (p - 1)
    }),
    prisma.announcement.count({ where: query }),
    prisma.class.findMany({ select:{id:true,name:true} }),
  ]);
 
  const columns = getColumns(role);
    
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All notices</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            
            {role === "admin" && (
              <FormModal table="announcements" type="create"  relatedData={{classes:allClasses}} />
            )}
          </div>
        </div>
      </div>

 
      <div>
        <Table column={columns} renderRow={(item) => renderRow(item, role,allClasses)} data={data} />
      </div>

      
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default exampage;