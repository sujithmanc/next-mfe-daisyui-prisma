import UserService from "@/lib/user-service";

async function getEmployeeData() {
    const employees = await employeeService.getAllEmployees();
    // Converting Decimal to Number for clean rendering
    return employees.map(emp => ({
        ...emp,
        salary: emp.salary ? Number(emp.salary) : 0
    }));
};

export default async function UserHomePage() {
  const employees = await getEmployeeData();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Teams Home Page</h1>
      <p>Managing {employees.length} employees</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>Role</th>
            <th style={tableHeaderStyle}>Department</th>
            <th style={tableHeaderStyle}>Location</th>
            <th style={tableHeaderStyle}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.emp_id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{emp.emp_id}</td>
                <td style={tableCellStyle}><strong>{emp.name || 'N/A'}</strong></td>
                <td style={tableCellStyle}>{emp.gender}</td>
                <td style={tableCellStyle}>{emp.job_title}</td>
                <td style={tableCellStyle}>{emp.dept}</td>
                <td style={tableCellStyle}>{emp.location}</td>
                <td style={tableCellStyle}>₹{emp.salary.toLocaleString('en-IN')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                No employee records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Simple inline styles for demonstration
const tableHeaderStyle = { padding: '12px', borderBottom: '2px solid #ccc' };
const tableCellStyle = { padding: '12px' };