import Link from "next/link";
import { currentUser } from '@clerk/nextjs/server';
import { SignOutButton } from "@clerk/nextjs";
 import Image from "next/image";
 
 
   
 export  const menuitems = [
  {
    title: "Menu",
    items: [
      {
        label: "Dashboard",
        href: "/",
        visible: ["admin", "teacher", "student",  ]
      },
      {
        label: "Teachers",
        href: "/list/teacher",
        visible: ["admin" ]
      },
      {
        label: "Lessons",
        href: "/list/lesson",
        visible: ["admin"]
      },
      {
        label: "Students",
        href: "/list/student",
        visible: ["admin", "teacher"]
      },
      {
        label: "Classes",
        href: "/list/classes",
        visible: ["admin" ]
      },
      {
        label: "Subjects",
        href: "/list/subject",
        visible: ["admin"]
      },
      {
        label: "Routine",
        href: "/list/subject",
        visible: ["teacher", "student",]
      },
      {
        label: "Results",
        href: "/list/result",
        visible: ["admin",   "student","teacher"]
      },
      {
        label: "Notices",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student",  ]
      },
      {
        label: "Exams",
        href: "/list/exam",
        visible: ["admin","teacher","student"]
      }
       
    ]
  },
  {
    title: "Other",
    items: [
      {
        label: "Logout",
        href: "#",
        visible: ["admin", "teacher", "student", "parent"]
      }
    ]
  }
];


const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;
  const userId = user?.id;

 
  const getHref = (item: any) => {
    
   
    
   
    if (item.label === "Dashboard") return role === "admin" ? `/admin` : `/${role}/${userId}`;
    if (item.label === "Routine") return `/${role}/${userId}/routine`;
    if (item.label === "Results" && role=="student") return `/${role}/${userId}/results`;
    if (item.label === "Exams" && role !== "admin") return `/exam`;  
    
    return item.href;
  };

  return (
    <div className="py-6 px-2">
      {menuitems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="my-2 text-sm text-gray-400 font-semibold uppercase tracking-wider">{i.title}</span>
          
          {i.items.map((item) => {
            // Check visibility first
            if (!item.visible.includes(role)) return null;

            
            if (item.label === "Logout") {
              return (
                <SignOutButton key={item.label}>
                  <button className="w-full flex text-left hover:bg-red-50 p-2 gap-2 px-4 rounded-lg transition-colors">
                    <span className="text-red-400 font-medium">{item.label}</span>
                    <Image src="/logout.png" alt="Logout" width={18} height={18} />
                  </button>
                </SignOutButton>
              );
            }

 
            return (
              <Link 
                href={getHref(item)}
                key={item.label}
                className="block hover:bg-black hover:text-white p-2 rounded-lg transition-all text-gray-500 font-medium"
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default Menu; 