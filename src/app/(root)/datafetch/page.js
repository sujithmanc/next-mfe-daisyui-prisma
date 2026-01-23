
import { Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function DataFetchPage() {

    const data = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());

    return (
        <>
            <h2>Raw JSON Data:</h2>

            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td> <Link className='text-amber-200 hover:text-amber-500' href={`/datafetch/${user.id}`}><Eye className="inline mr-1" />View</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <pre>
                {JSON.stringify(data, null, 2)}
            </pre> */}
        </>
    )
}
