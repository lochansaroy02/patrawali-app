"use client";

import { exportToExcel } from "@/utils/exportToExcel";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ReportProps {
    data: any,
    heading: string
}

const Report = ({ data, heading }: ReportProps) => {



    const router = useRouter()
    const formatValue = (key: string, value: any) => {
        if (key === "createdAt" || key === "updatedAt") {
            return new Date(value).toLocaleString();
        }
        return value || "N/A";
    };

    const handleExport = () => {
        data && exportToExcel(data, "data")
    }


    const excluded = ["Id", "id", "createdAt", "updatedAt", "photo", "document", "documentUrl"]
    return (
        <div className="p-4">
            <div className='flex  justify-between'>
                <h1 className="text-2xl font-bold text-background mb-4">{heading}</h1>
                <div className="gap-4   text-background flex ">
                    <Button className="bg-foreground" onClick={() => {
                        router.push("/add-record")
                    }}>Add Record </Button>
                    <Button className="bg-foreground" onClick={handleExport}>Export </Button>

                </div>
            </div>
            {data && data.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead className="bg-gray-200 text-sm font-semibold">
                            <tr>
                                {data.length > 0 &&
                                    //@ts-ignore
                                    Object.keys(data[0])
                                        .filter((key) => !excluded.includes(key))
                                        .map((key) => (
                                            <th key={key} className="border border-gray-400 px-2 py-1 capitalize">
                                                {key.replace(/([A-Z])/g, " $1")  // insert space before capital letters
                                                    .replace(/^./, (char) => char.toUpperCase())}
                                            </th>
                                        ))}
                            </tr>
                        </thead>
                        <tbody className='bg-gray-100'>
                            {data.map((item: any, index: any) => (
                                <tr key={index} className="text-sm">
                                    {Object.entries(item)
                                        .filter(([key]) => !excluded.includes(key))
                                        .map(([key, value]) => (
                                            <td key={key} className="border px-2 py-1">
                                                {formatValue(key, value)}
                                            </td>
                                        ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    )
}

export default Report