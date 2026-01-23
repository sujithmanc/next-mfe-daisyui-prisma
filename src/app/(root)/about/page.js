// Next.js Server Component
export default async function AboutPage({ params, searchParams }) {
    // 1. Path Variable (from [id])
    const { id } = await params;

    // 2. Search Parameters (from ?name=...)
    const sP = await searchParams;

    return (
        <div className="p-10">
            <h1>About ID: {id}</h1>
            <pre>
                {JSON.stringify(sP, null, 2)}
            </pre>
            <p>Search Name: {sP.name || "No name provided"}</p>
        </div>
    );
}