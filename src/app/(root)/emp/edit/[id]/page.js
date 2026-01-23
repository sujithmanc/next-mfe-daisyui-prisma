import Link from 'next/link';
import React from 'react'

export default async function EmployeeEditDetails({params, searchParams}) {
    const p = await params;
    const id = p.id;
    return (
        <>
            <h1>Employee Edit Details : {id}</h1>
            <Link href="/emp" className="text-blue-500 underline ml-2">
                Back to List
            </Link>
            <pre>{JSON.stringify(p, null, 2)}</pre>
        </>
    )
}
