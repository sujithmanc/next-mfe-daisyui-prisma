"use client";

import { saveEmployeeAction } from "@/actions/actions";
import EmployeeForm from "@/components/EmployeeForm";
import Link from "next/link";

export default function CreateEmployeePage() {

  return (
    <div className="flex justify-center p-6">
      <EmployeeForm action={saveEmployeeAction} />
      // Add back button or link to go back to teams page if needed
      <Link href="/teams" className="btn btn-secondary mt-4">
        Back to Teams
      </Link>
    </div>
  );
}
