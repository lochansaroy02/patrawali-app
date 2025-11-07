"use client";
import InputComponent from '@/components/InputComponent';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/datePicker';
import { useDeceadeStore } from '@/utils/stores/store';
import { useRef, useState } from 'react';
const Page = () => {

    const { addData, fetchData, deceadeEntry, } = useDeceadeStore()
    const [dateFields, setDateFields] = useState<{
        appDate?: Date;
        deathDate?: Date;
        apporvalDate: Date
    }>({
        appDate: new Date(),
        deathDate: new Date(),
        apporvalDate: new Date()
    });


    const handleDateChange = (fieldName: string, date: Date | undefined) => {
        setDateFields(prev => ({
            ...prev,
            [fieldName]: date,
        }));
        handleInputChange(fieldName, date?.toISOString() ?? "");
    };

    const [formData, setFormData] = useState({
        deceadName: '',
        deceadDesgnation: '',
        pno: '',
        deathDate: '',
        dependentName: '',
        depandentRelation: '',
        applicationDate: '',
        postForAppointment: '',
        fileNo: '',
        apporvalDate: '',
    });

    const documentRef = useRef<HTMLInputElement>(null);



    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const fields = [
        { name: 'deceadName', label: 'मृतकर्मी का नाम' },
        { name: 'deceadDesgnation', label: 'मृतकर्मी का पद नाम' },
        { name: 'pno', label: 'पी.एन.ओ. नंबर' },
        { name: 'deathDate', label: 'मृत्यु की तिथि' },
        { name: 'dependentName', label: 'आश्रित का नाम' },
        { name: 'depandentRelation', label: 'आश्रित का  संबंध' },
        { name: 'applicationDate', label: 'आवेदन की तिथि' },
        { name: 'postForAppointment', label: 'अवेदित पद जिसपर सेवायोजन चाहता है' },
        { name: 'fileNo', label: 'पत्रावली संख्या' },
        { name: 'apporvalDate', label: 'अनुमोदन तिथि ' },
    ];

    const inputFields = [
        { label: "Upload Document", id: "document", ref: documentRef },
    ];

    const handleSave = async () => {
        const documentFile = documentRef.current?.files?.[0];

        let documentUrl = "";

        if (documentFile) {
            const formData = new FormData();
            formData.append("file", documentFile);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
            const cloudinaryRes = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const cloudinaryData = await cloudinaryRes.json();
            documentUrl = cloudinaryData.secure_url;
        }

        const fullData = {
            ...formData,
            applicationDate: dateFields.appDate?.toISOString() ?? '',
            deathDate: dateFields.deathDate?.toISOString() ?? '',
            apporvalDate: dateFields.apporvalDate?.toISOString() ?? '',
            documentUrl, // ✅ Add the uploaded Cloudinary URL here
        };

        addData(fullData); // This will trigger your backend POST and save to Prisma
    };


    return (
        <div>
            <div className='mt-4 border border-gray-300'>
                <div className='bg-blue py-4 border border-gray-400 flex justify-center'>
                    <h1 className='text-2xl uppercase text-cream font-semibold'>Patrawali Application</h1>
                </div>
                <div className='bg-gray-100 border border-gray-300 px-8 py-4 rounded-b-md'>
                    <div className='mt-2 grid grid-cols-2 gap-2'>
                        {fields.map((field) => (
                            <div key={field.name}>
                                {field.name.includes("Date") ? <div>
                                    <DatePicker
                                        label={field.label}
                                        date={dateFields[field.name as keyof typeof dateFields]}
                                        setDate={(date) => handleDateChange(field.name, date)} />
                                </div> :
                                    <InputComponent label={field.label} value={formData[field.name as keyof typeof formData]} setInput={(e) => handleInputChange(field.name, e.target.value)} />
                                }
                            </div>
                        ))}

                        {inputFields.map((item, index) => (
                            <div key={index} className='flex items-center gap-8'>
                                <label className='text-nowrap' htmlFor={item.id}>{item.label}</label>
                                <input
                                    ref={item.ref}
                                    className='bg-gray-200 rounded-xl border border-dotted px-2 py-1'
                                    id={item.id}
                                    type='file'
                                />
                            </div>
                        ))}
                    </div>

                    <div className='flex w-full px-12 justify-between mt-4'>
                        {["Save"].map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    if (item === "Save") {
                                        handleSave();
                                    } else {
                                        console.log(`${item} clicked`);
                                    }
                                }}
                                className='bg-white-300 border border-gray-200 text-gray-800'
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
