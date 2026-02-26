import { employeeService } from "@/lib/employee-service";
import { saveEmployeeAction } from "@/actions/actions";
import EmployeeForm from "@/components/EmployeeForm";
import { notFound } from "next/navigation";

export default async function EditEmployeePage({ params }) {
  const { id } = await params;
  const employee = await employeeService.getEmployeeById(Number(id));

  if (!employee) notFound();

  const serializedEmployee = {
    ...employee,
    salary: Number(employee.salary) // or .toString()
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      {/* Reuse the form, pass the data and the specific Edit action */}
      <EmployeeForm initialData={serializedEmployee} action={saveEmployeeAction} />
    </div>
  );
}