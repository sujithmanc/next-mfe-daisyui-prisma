'use client' // Error boundaries must be Client Components

import Error from 'next/error'
import { useEffect } from 'react'

export default function ErrorPage({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h2 className="text-2xl font-bold text-red-500 ">Something went wrong!</h2>
            <button
                className='cursor-pointer hover:text-amber-600'
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}