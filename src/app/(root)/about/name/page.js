import Link from 'next/link'
import React from 'react'

export default function AboutNamePage() {
    return (
        <>
            <div>About Name Page</div>
            <Link href="/" className="text-blue-500 underline">
                Go to About 123 Page
            </Link>
        </>
    )
}
