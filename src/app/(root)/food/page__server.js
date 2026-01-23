import React from 'react'

export default async function FoodPage({searchParams}) {

    const fruits = ['Apple', 'Banana', 'Mango'];
    const vegetables = ['Carrot', 'Broccoli', 'Spinach'];

    const sP = await searchParams;
    
    return (
        <>
            <div>FoodPage</div>
            {
                fruits.map((fruit, index) => (<>
                    <pre className='inline'>{fruit}</pre> <input type="checkbox" /> <br />
                </>))
            }

            <pre>{JSON.stringify(sP, null, 2)}</pre>
        </>
    )
}
