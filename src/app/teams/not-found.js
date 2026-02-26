import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function EmployeeNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-error/10 p-6 rounded-full mb-6">
        <SearchX className="w-16 h-16 text-error" />
      </div>
      <h2 className="text-3xl font-bold mb-2">Employee Not Found</h2>
      <p className="text-base-content/60 max-w-md mb-8">
        We couldn't find the employee record you're looking for. 
        It may have been deleted or the ID might be incorrect.
      </p>
      <Link href="/teams" className="btn btn-primary gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </Link>
    </div>
  );
}