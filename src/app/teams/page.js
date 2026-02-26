import { employeeService } from "@/lib/employee-service";
import UserService from "@/lib/user-service";
import { Link2, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/DeleteButton";

// Inline Server Action for deletion
async function deleteEmployeeAction(formData) {
    "use server";
    const id = formData.get("emp_id");
    await employeeService.deleteEmployee(Number(id));
    revalidatePath("/teams"); // Refresh the data on the current page
}

export default async function UserHomePage() {
    const users = await UserService.getAllUsers();
    const employees = await employeeService.getAllEmployees();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teams Dashboard</h1>
                    <p className="text-base-content/60">Manage your organization's records.</p>
                </div>
                <Link href="/teams/create" className="btn btn-primary">
                    <Plus className="w-4 h-4 mr-2" /> Create New Employee
                </Link>
            </div>

            <div className="overflow-x-auto border border-base-300 rounded-xl shadow-sm">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Employee</th>
                            <th>Role & Dept</th>
                            <th>Salary</th>
                            <th>Location</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.emp_id} className="hover">
                                <td>
                                    <div className="font-bold">{emp.name}</div>
                                    <div className="text-xs opacity-50 font-mono">ID: {emp.emp_id}</div>
                                </td>
                                <td>
                                    <div className="text-sm font-medium">{emp.job_title}</div>
                                    <span className="badge badge-sm badge-ghost">{emp.dept}</span>
                                </td>
                                <td className="font-mono text-sm">
                                    ${Number(emp.salary).toLocaleString()}
                                </td>
                                <td>{emp.location || "Remote"}</td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        {/* View Button */}
                                        <Link 
                                            href={`/teams/${emp.emp_id}`} 
                                            className="btn btn-square btn-ghost btn-sm tooltip" 
                                            data-tip="View"
                                        >
                                            <Eye className="w-4 h-4 text-info" />
                                        </Link>

                                        {/* Edit Button */}
                                        <Link 
                                            href={`/teams/edit/${emp.emp_id}`} 
                                            className="btn btn-square btn-ghost btn-sm tooltip" 
                                            data-tip="Edit"
                                        >
                                            <Pencil className="w-4 h-4 text-warning" />
                                        </Link>

                                        {/* Delete Button - Uses the DeleteButton component */}
                                        <DeleteButton emp_id={emp.emp_id} emp_name={emp.name} deleteAction={deleteEmployeeAction} />

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}