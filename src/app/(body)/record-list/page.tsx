"use client";

import Report from '@/components/Report';
import { useDeceadeStore } from '@/utils/stores/store';
import { useEffect } from 'react';

const page = () => {

    const { fetchData, deceadeEntry } = useDeceadeStore()
    useEffect(() => {
        fetchData()
    }, [])

    console.log(deceadeEntry);
    return (
        <div>
            <Report data={deceadeEntry} heading='Entry Data' />
        </div>
    )
}

export default page