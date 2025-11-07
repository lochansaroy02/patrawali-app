"use client";

import { Menu, Plus, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {


  const router = useRouter()
  const data = [
    {
      name: "Add record",
      icon: <Plus />,
      color: "bg-green-400",
      link: "/add-record"
    },
    {
      name: "Search Record",
      icon: <Search />,
      color: "bg-cyan-400",
      link: "/search"
    },
    {
      name: "List Record",
      icon: <Menu />,
      color: "bg-amber-400",
      link: "/record-list"
    },
    {
      name: "Users",
      icon: <User />,
      color: "bg-gray-400",
      link: "/users-list"
    },
  ]

  return (
    <div className=''>
      <div className='flex items-center flex-col glass-effect   h-screen'>
        <h1 className='text-white text-2xl font-bold'>
          dashboard
        </h1>
        <div className="mt-12 w-full   ">
          <div className="flex mx-18  justify-between">

            {
              data.map((item, index) => (
                <div onClick={() => { router.push(item.link) }} className={`px-6 py-3 h-24 w-52  cursor-pointer flex items-center gap-4  ${item.color} rounded-lg`}>
                  <span>
                    {item.icon}
                  </span>
                  <h1>
                    {item.name}
                  </h1>
                </div>
              ))
            }
          </div>


        </div>
      </div>
    </div>
  )
}

export default page