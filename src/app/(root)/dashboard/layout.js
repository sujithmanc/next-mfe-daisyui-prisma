import Link from 'next/link';
import React from 'react'

export default function DashBoardNav({children}) {

    const pages = [
        { name: "Analytics", path: "/analytics" },
        { name: "Settings", path: "/settings" },
    ];
    
    return (
        <>
            <h1 className="text-2xl text-green-600 text-center">DashBoardNav</h1>

            <ul>
                <li className="m-2 inline text-2xl hover:text-blue-500">
                     <Link href="/dashboard">DashBoard</Link>
                </li>
                {pages.map((page) => (
                    <li className="m-2 inline hover:text-blue-500" key={page.path}>
                        <Link href={`/dashboard/${page.path}`}>{page.name}</Link>
                    </li>
                ))}
            </ul>
            {children}
        </>

    )
}
