export const items_per_page=10

type RouteAccessMap={
    [key:string]:string[];

}

export  const routerAccessMap:RouteAccessMap={

    "/admin(.*)":["admin"],//The Code: The (.*) syntax is a regular expression wildcard meaning "and anything that comes after this slash".
    "/student(.*)":["student"],
    "/teacher(.*)":["teacher"],
    "/list/teacher":["admin",],
    "/list/student":["admin","teacher"],
    "/list/subject":["admin"],
    "/list/maintenance":["admin"],
    "/list/classes":["admin",],
    "/list/lesson":["admin" ],
    "/list/exam":["admin", ],
    "/list/result":["admin","teacher" ],
   
    "/list/announcements":["admin","teacher","student"],
    



    




}