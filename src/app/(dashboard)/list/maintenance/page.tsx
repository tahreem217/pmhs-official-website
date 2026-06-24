import Pagination from "@/components/Pagation";
import Table from "@/components/Table";
import TableSearch from "@/components/Searchbar";

import Image from "next/image";
import FormModal from "@/components/FormModal";
import { Prisma, type MaintenanceTicket } from "@prisma/client"; 
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { auth } from "@clerk/nextjs/server";

const getColumns = (role: string | undefined) => [
  {
    header: "Task Title",
    accessor: "title",
    className: " ",
  },
  {
    header: "Location",
    accessor: "location",
    className: "hidden sm:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: " ",
  },
  ...(role === "admin" ? [{
    header: "Action",
    accessor: "action",
    className: " ",
  }] : [])
];

const renderRow = (item: MaintenanceTicket, role: string | undefined) => (
  <tr className="border-t-2 rounded-xl odd:border-t-blue-400 even:border-t-emerald-400 hover:bg-slate-50/50 transition-colors">
    <td className="flex my-4 gap-3 justify-start px-2 items-center">
      <div className="flex flex-col">
        <h6 className="font-semibold text-slate-800">{item.title}</h6>
        {item.description && (
          <p className="text-sm text-gray-500 line-clamp-1 max-w-[250px] md:max-w-[400px]">
            {item.description}
          </p>
        )}
      </div>
    </td>
    <td className="hidden sm:table-cell text-slate-600">
      {item.location || "General / Unspecified"}
    </td>
    <td>
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
        item.status === "Completed" 
          ? "bg-emerald-100 text-emerald-700" 
          : "bg-amber-100 text-amber-700"
      }`}>
        {item.status}
      </span>
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal 
              table="maintenance" 
              type="edit" 
              id={item.id} 
              data={item} 
            />
            <FormModal table="maintenance" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const MaintenanceListPage = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | undefined } 
}) => {
  
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;
  
  const query: Prisma.MaintenanceTicketWhereInput = {}; 
  
  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.OR = [
              { title: { contains: value, mode: "insensitive" } },
              { description: { contains: value, mode: "insensitive" } },
              { location: { contains: value, mode: "insensitive" } }
            ];
            break;
        }
      }
    }
  }

  // FIXED: Simplified down to only 2 concurrent database operations
  const [data, count] = await prisma.$transaction([
    prisma.maintenanceTicket.findMany({
      where: query,
      take: items_per_page,
      skip: items_per_page * (p - 1),
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.maintenanceTicket.count({ where: query }),
  ]);
 
  const columns = getColumns(role);
    
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 shadow-sm border border-slate-100">
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold text-slate-800">Maintenance Tickets</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
              <Image src="/filter.png" alt="Filter logs" width={16} height={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
              <Image src="/sort.png" alt="Sort order" width={16} height={16} />
            </button>
            
            {role === "admin" && (
              <FormModal table="maintenance" type="create" />
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table column={columns} renderRow={(item) => renderRow(item, role)} data={data} />
      </div>

      <div className="mt-4">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default MaintenanceListPage;