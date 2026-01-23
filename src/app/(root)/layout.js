import React from 'react'

export default function OthersLayout({ children }) {
    return (
        <>
            <h1 className='text-2xl text-green-600 text-center'>Others Layout</h1>
            <div className="px-10">
                {children}
            </div>
        </>
    )
}
