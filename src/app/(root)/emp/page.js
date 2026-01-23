import Link from 'next/link';
import React from 'react'



   

export default function EmployeeListPage() {

    const nums = [1, 2, 3, 4, 5];


    return (
        <>
            <div>Employee List Page</div>
            <ul>
                {nums.map((num) => ( 
                    <li key={num}>Employee {num}
                        <Link href={`/emp/${num}`} className="text-blue-500 underline ml-2">View </Link>
                        <Link href={`/emp/edit/${num}`} className="text-blue-500 underline ml-2">Edit </Link>
                        <Link href={`/emp/${num}`} className="text-blue-500 underline ml-2">Delete </Link>
                            
                       
                    </li>
                ))}

            </ul>
        </>
    )
}


