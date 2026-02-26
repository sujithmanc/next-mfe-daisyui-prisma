import { employeeService } from "@/lib/employee-service";
import Link from "next/link";
import { ArrowLeft, Pencil, User, MapPin, Briefcase, DollarSign, Building } from "lucide-react";
import { notFound } from "next/navigation";

export default async function TeamData({ params }) {
  const { id } = await params;
  const employee = await employeeService.getEmployeeById(Number(id));

  if (!employee) {
    notFound(); // Triggers the Next.js 404 page
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Navigation Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/teams" className="btn btn-ghost gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Link>
          <Link href={`/teams/edit/${id}`} className="btn btn-primary gap-2">
            <Pencil className="w-4 h-4" /> Edit Profile
          </Link>
        </div>

        {/* Profile Card */}
        <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden border border-base-300">

          {/* Left Side: Visual/Avatar */}
          <div className="bg-primary text-primary-content p-12 flex flex-col items-center justify-center min-w-[300px]">
            <div className="avatar placeholder mb-4">
              {/* 1. Added 'aspect-square' to ensure 1:1 ratio 
        2. 'w-32' (8rem) is the size
        3. 'rounded-full' makes it a circle
    */}
              <div className="bg-neutral text-neutral-content rounded-full w-32 aspect-square ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                <span className="text-5xl font-bold uppercase">
                  {employee.name?.charAt(0)}
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mt-2">{employee.name}</h2>
            <div className="badge badge-secondary mt-2 uppercase tracking-wider font-semibold">
              {employee.job_title}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="card-body bg-base-100">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">Employment Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dept */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-base-200 rounded-lg"><Building className="w-5 h-5 text-primary" /></div>
                <div>
                  <p className="text-xs uppercase text-base-content/50 font-bold">Department</p>
                  <p className="font-medium">{employee.dept}</p>
                </div>
              </div>

              {/* Salary */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-base-200 rounded-lg"><DollarSign className="w-5 h-5 text-success" /></div>
                <div>
                  <p className="text-xs uppercase text-base-content/50 font-bold">Annual Salary</p>
                  <p className="font-medium">${Number(employee.salary).toLocaleString()}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-base-200 rounded-lg"><MapPin className="w-5 h-5 text-error" /></div>
                <div>
                  <p className="text-xs uppercase text-base-content/50 font-bold">Location</p>
                  <p className="font-medium">{employee.location || "Remote"}</p>
                </div>
              </div>

              {/* Gender/ID */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-base-200 rounded-lg"><User className="w-5 h-5 text-info" /></div>
                <div>
                  <p className="text-xs uppercase text-base-content/50 font-bold">Gender & ID</p>
                  <p className="font-medium">{employee.gender === 'M' ? 'Male' : 'Female'} (ID: {id})</p>
                </div>
              </div>
            </div>

            {/* Footer / Meta */}
            <div className="mt-8 pt-6 border-t flex items-center justify-between text-base-content/40 text-sm">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> Official Employee Record
              </span>
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}