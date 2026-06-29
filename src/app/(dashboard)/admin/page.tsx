import Usercard from "@/components//dashboard/Usercard";
import Capacitybox from "@/components/dashboard/Capacitybox";
 
   
import Performancebox from "@/components/dashboard/Performancebox";
  import Maintainence from "@/components/dashboard/Maintenance";
import Annoucement from "@/components/notices/AnnoucementBox";
 
const adminpage = () => {
  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      {/* LEFT COLUMN */}
      <div className="w-full flex flex-col gap-6 md:w-3/5">
        
        
        <div className="w-full rounded-2xl flex flex-wrap gap-4 justify-between">
          <Usercard type="admin" />
          <Usercard type="teacher" />
          <Usercard type="student" />
        </div>

      
        <div className="flex w-full gap-4 flex-col lg:flex-row">
          
           <div className="p-4 rounded-2xl bg-white w-full lg:flex-1 shadow-sm">
            <Capacitybox />
          </div>
          
           

        </div>

        <div className="min-h-[310px] bg-white rounded-2xl p-4 shadow-sm">
          <Performancebox />
        </div>

         
      </div>

       <div className="w-full flex flex-col gap-6 md:w-2/5">
        
          <Annoucement/>
        
        <div className="h-[400px] bg-white rounded-2xl p-4 shadow-sm">
        <Maintainence/>
        </div>
       

       
       
        
        
      </div>
      
    </div>
  );
};

export default adminpage;
