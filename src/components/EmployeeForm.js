"use client";
import { useActionState } from "react";

export default function EmployeeForm({ initialData, action }) {
    // If initialData exists, we are editing; otherwise creating.
    const [state, formAction, isPending] = useActionState(action, { errors: {}, fields: initialData || {} });

    return (
        <form action={formAction} className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300">
            <div className="card-body gap-4">
                <h2 className="card-title text-2xl text-primary border-b pb-2">Employee Details</h2>

                {
                    initialData?.emp_id && (
                        <>
                            <p className="text-sm text-gray-500">Employee ID: {initialData.emp_id}</p>
                            <input type="hidden" name="emp_id" value={initialData.emp_id} />
                        </>
                    )
                }

                <div className="grid grid-cols-2 gap-4">
                    {/* Full Name - Now Wide (Span 2) */}
                    <div className="form-control col-span-2">
                        <label className="label-text font-bold mb-1">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            defaultValue={state.fields?.name}
                            className={`input input-bordered ${state.errors?.name ? 'input-error' : ''}`}
                        />
                        {state.errors?.name && <span className="text-error text-xs mt-1">{state.errors.name[0]}</span>}
                    </div>

                    {/* Gender */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1">Gender</label>
                        <select name="gender" defaultValue={state.fields?.gender || "M"} className="select select-bordered">
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </div>

                    {/* Dept */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1">Department</label>
                        <input
                            name="dept"
                            type="text"
                            defaultValue={state.fields?.dept}
                            className={`input input-bordered ${state.errors?.dept ? 'input-error' : ''}`}
                        />
                        {state.errors?.dept && <span className="text-error text-xs mt-1">{state.errors.dept[0]}</span>}
                    </div>

                    {/* Job Title */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1">Job Title</label>
                        <input
                            name="job_title"
                            type="text"
                            defaultValue={state.fields?.job_title}
                            className="input input-bordered"
                        />
                    </div>

                    {/* Salary */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1">Salary</label>
                        <input
                            name="salary"
                            type="text"
                            defaultValue={state.fields?.salary}
                            className={`input input-bordered ${state.errors?.salary ? 'input-error' : ''}`}
                        />
                        {state.errors?.salary && <span className="text-error text-xs mt-1">{state.errors.salary[0]}</span>}
                    </div>

                    {/* Location - Wide */}
                    <div className="form-control col-span-2">
                        <label className="label-text font-bold mb-1">Location</label>
                        <input
                            name="location"
                            type="text"
                            defaultValue={state.fields?.location}
                            className="input input-bordered"
                        />
                    </div>
                </div>

                <div className="card-actions mt-4">
                    <button type="submit" disabled={isPending} className="btn btn-primary w-full">
                        {isPending ? <span className="loading loading-spinner"></span> : "Save Employee"}
                    </button>
                </div>

                {state.message && (
                    <div className={`alert mt-2 ${state.success ? 'alert-success' : 'alert-error'}`}>
                        <span>{state.message}</span>
                    </div>
                )}
            </div>
        </form>
    );
}