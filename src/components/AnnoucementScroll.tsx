"use client"
import { useEffect, useRef, useState } from "react"
import { FaBell } from "react-icons/fa6"; 
import DetailsModal from "./DetailsModal";
import NoticesForm from "./NoticesForm";
import FormModal from "./FormModal";

interface AnnouncementItem {
  id: string | number;
  title: string;
  date: string;
  description: string;
}

interface AnnouncementScrollProps {
  announcements?: AnnouncementItem[]; 
  role: string | undefined;
  relatedData?: { classes?: { id: string; name: string }[] } | any;
}

const AnnouncementScroll = ({ announcements = [], role, relatedData }: AnnouncementScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState<AnnouncementItem | null>(null);

  // editing holds the announcement data; open controls the boolean setter passed to NoticesForm
  const [editing, setEditing] = useState<AnnouncementItem | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // When `open` becomes false -> ensure editing is cleared
  useEffect(() => {
    if (!open) {
      setEditing(null);
    }
  }, [open]);

  // Duplicating array for infinite scroll effect
  const displayAnnouncements = [...announcements, ...announcements];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered || announcements.length <= 3) return;

    let animationFrameId: number;
    const smoothScroll = () => {
      const halfHeight = scrollContainer.scrollHeight / 2;
      if (scrollContainer.scrollTop >= halfHeight) {
        scrollContainer.scrollTop = 0;
      } else {
        scrollContainer.scrollTop += 0.5; 
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, announcements.length]);

  return (
     <div className="relative w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col h-[500px] md:h-[600px]">
      
       <div className="px-6 py-4 bg-amber-100/20 flex justify-between items-center z-10 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <FaBell className="text-amber-400 text-4xl animate-bounce" />
          <h1 className="text-xl font-bold tracking-wide">Notice Board</h1>
        </div>
        {role === "admin" && (
             
            <FormModal  table="announcements" type="create"  relatedData={relatedData ?? { classes: [] }} />

         )}
      </div>

      <div className="relative flex-1 bg-slate-50/30 overflow-hidden">
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-col h-full overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayAnnouncements.map((anc, idx) => (
            <div 
              key={`${anc.id}-${idx}`}
              className="group relative p-2 hover:bg-white transition-colors duration-300 cursor-pointer"
              onClick={() => setSelected(anc)} // open preview on click
            >
              <div className="p-4 rounded-xl border group-hover:shadow-md group-hover:border-amber-400 border-orange-950/15 bg-white">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h2 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                    {anc.title}
                  </h2>
                  <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase bg-blue-100/50 text-blue-700 py-1 px-2.5 rounded-md">
                    {anc.date}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {anc.description}
                </p>
              </div>
            </div>
          ))}

        
          {selected && (
            <DetailsModal
              open={!!selected}
              onClose={() => setSelected(null)}
              title={selected.title}
              date={selected.date}
              description={selected.description}
              onEdit={() => {
                setSelected(null);        // close preview
                setEditing(selected);     // set editing data
                setOpen(true);            // open the boolean-controlled modal (passed to NoticesForm)
              }}
            />
          )}

           {editing && open && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              onClick={() => setOpen(false)}
            >
              <div className="max-w-3xl w-[95%] bg-white rounded-xl p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Edit Notice</h3>
                  <button onClick={() => setOpen(false)} className="px-3 py-1 rounded bg-slate-100">Close</button>
                </div>

                <NoticesForm
                  // pass the actual React setter (matches Dispatch<SetStateAction<boolean>>)
                  setOpen={setOpen}
                  type="edit"
                  data={editing}
                  relatedData={relatedData ?? { classes: [] }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementScroll;