 "use client"
import Image from "next/image"
import { useRouter } from "next/navigation";
const Searchbar = () => {
  const router =useRouter();

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{

    e.preventDefault();
    const value=(e.currentTarget[0] as HTMLInputElement).value;
    const params=new URLSearchParams(window.location.search);
    params.set("search",value);
    router.push(`${window.location.pathname}?${params}`)
  }
  return (
    <div>
       <form  onSubmit={handleSubmit} className="  flex bg-white p-2 gap-1  border rounded-full   ">
            <Image src="/search.png" alt=""  width={20} height={20}/> 
            <input type="text" className="border-none outline-none w-[60%]" placeholder="Search..." />
        </form>

    </div>
  )
}

export default Searchbar
