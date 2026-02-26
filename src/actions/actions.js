"use server";

import { employeeService } from "@/lib/employee-service";
import { empty } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";
import { z } from "zod";

// 1. Define the Schema
const EmployeeSchema = z.object({
    emp_id: z.number().optional(), // Only for edit, not required for create
    name: z.string().min(2, "Name must be at least 2 characters"),
    gender: z.enum(["M", "F", "O"]),
    dept: z.string().min(1, "Department is required"),
    job_title: z.string().min(1, "Job title is required"),
    salary: z.coerce.number().min(0, "Salary cannot be negative"),
    location: z.string().min(1, "Location is required"),
});


export async function saveEmployeeAction(prevState, formData) {
    const rawData = Object.fromEntries(formData.entries());
    if (rawData.emp_id) {
        rawData.emp_id = Number(rawData.emp_id);
    }
    const validatedFields = EmployeeSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            // Pass the data back so the form stays populated
            fields: rawData,
            message: "Validation failed.",
        };
    }

    // 1. Create a variable to track success
    let success = false;

    console.info(JSON.stringify(validatedFields.data, null, 2));

    try {
        if (validatedFields.data.emp_id) {
            // Update existing employee
            await employeeService.updateEmployee(validatedFields.data.emp_id, validatedFields.data);
        } else {
            // Create new employee
            await employeeService.createEmployee(validatedFields.data);
        }
        //return { success: true, message: "Employee saved!", errors: {}, fields: {} };
        success = true;
    } catch (e) {
        console.error("Error saving employee:", e);
        return { success: false, message: "Server error", fields: rawData };
    }
    // 2. Set success to true if we reach this point
    if (success) {
        redirect('/teams');
    }
}