import React from 'react'

export default async function AboutIdPage({ params,searchParams }) {
    const p = await params;
    const sP = await searchParams;
    return (
        <>
            <div>About Id Page</div>
            <pre>{JSON.stringify(p, null, 2)}</pre>
            <pre>{JSON.stringify(sP, null, 2)}</pre>
        </>
    )
}
