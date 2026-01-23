"use client"; // Must be a client component to use hooks and events

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { use } from 'react';

export default function FoodPage(props) {

    const myParams = use(props.params); // To unwrap any promises passed as props
    // Note: props itself is not a promise, but its values might be
    // What props contains are promises for params and searchParams if fetched server-side
    const mySPs = use(props.searchParams);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const fruits = ['Apple', 'Banana', 'Mango'];

    // Get currently selected fruits from URL
    // .getAll ensures we always get an array, even if 0 or 1 item is selected
    const selectedFruits = searchParams.getAll('fruits');
    

    const handleCheck = (fruit) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.has('fruits', fruit)) {
            // If already there, remove it
            params.delete('fruits', fruit);
        } else {
            // If not there, add it
            params.append('fruits', fruit);
        }

        // Update the URL without refreshing the page
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Select Fruits</h1>
            <h4 className="font-mono">{pathname}</h4>
            {fruits.map((fruit) => (
                <div key={fruit} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id={fruit}
                        checked={selectedFruits.includes(fruit)}
                        onChange={() => handleCheck(fruit)}
                        className="mr-2"
                    />
                    <label htmlFor={fruit}>{fruit}</label>
                </div>
            ))}

            <hr className="my-4" />
            <h2 className="font-mono p-2">
                Current Params:
                <pre>
                    {JSON.stringify(selectedFruits, null, 2)}
                </pre>
                <pre>
                    {searchParams.toString()}
                </pre>
            </h2>
            <button
                onClick={() => router.push('/about')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">About</button>
                <h1>Props</h1>
                <pre>{JSON.stringify({myParams, mySPs}, null, 2)}</pre>
        </div>
    );
}