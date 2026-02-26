import prisma from "./prisma";

export const employeeService = {
    // CREATE
    async createEmployee(data) {
        try {
            // data should be an object: { name, gender, dept, job_title, salary, location }
            return await prisma.employees.create({
                data: data
            });
        } catch (error) {
            console.error("Error creating employee:", error);
            throw error;
        }
    },

    // READ (All)
    async getAllEmployees() {
        try {
            return await prisma.employees.findMany({
                orderBy: { emp_id: 'desc' }
            });
        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error;
        }
    },

    // READ (Single)
    async getEmployeeById(id) {
        try {
            return await prisma.employees.findUnique({
                where: { emp_id: parseInt(id) }
            });
        } catch (error) {
            console.error("Error fetching employee:", error);
            throw error;
        }
    },

    // UPDATE
    async updateEmployee(id, updateData) {
        try {
            return await prisma.employees.update({
                where: { emp_id: parseInt(id) },
                data: updateData
            });
        } catch (error) {
            console.error("Error updating employee:", error);
            throw error;
        }
    },

    // DELETE
    async deleteEmployee(id) {
        try {
            return await prisma.employees.delete({
                where: { emp_id: parseInt(id) }
            });
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    },

    // AGGREGATION (Average Salary)
    async getAvgSalary() {
        return await prisma.employees.aggregate({
            _avg: {
                salary: true
            }
        });
    }
};