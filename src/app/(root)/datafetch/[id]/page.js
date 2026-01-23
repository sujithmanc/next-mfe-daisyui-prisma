import { StepBack } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function UserDetails({ params }) {
    const { id } = await params;

    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json());

    return (
        <>
            <h1>UserDetails #{id}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Link href="/datafetch" className="text-blue-500 underline ml-2">
                <StepBack className="inline mr-1" />
                Back to List
            </Link>
        </>
    )
}
