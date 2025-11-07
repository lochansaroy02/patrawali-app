"use client";

import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const data = [
        {
            name: "Dashboard", link: "/",
        },
        {
            name: "Search", link: "/search",
        },
        {
            name: "Add Record", link: "/add-record",
        },
        {
            name: "Record List", link: "/record-list",
        },
        {
            name: "User List", link: "/users-list",
        },

    ]
    const router = useRouter();
    return (
        <div className='bg-foreground  h-screen ' >
            <div className='p-4  flex justify-center flex-col'>
                <div className='flex justify-center '>
                    <h1 className='text-2xl mb-8 '>
                        Sidebar
                    </h1>
                </div>
                <div className='gap-4  flex  flex-col '>
                    {
                        data.map((item: any, index: number) => (
                            <div key={index} onClick={() => {
                                router.push(item.link)
                            }} className='bg-neutral-800 cursor-pointer px-4 py-2  transition-all ease-in-out hover:bg-neutral-700 rounded-lg '>
                                <h1 className='text-base text-blue-100'>{item.name}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar