import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1 className="text-5xl text-green-400 text-center">Hello World</h1>
      <Link href="/about" className="text-center text-blue-500 underline">
        About Page
      </Link>
    </div>
  );
}
