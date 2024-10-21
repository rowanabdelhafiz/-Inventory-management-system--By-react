import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", username: "", email: "", password: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/employees", newEmployee);
      setEmployees((prev) => [...prev, response.data]);
      setNewEmployee({ firstName: "", lastName: "", username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <AdminNavbar/>
      <h2>Manage Employees</h2>
      <form onSubmit={handleAddEmployee}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newEmployee.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newEmployee.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newEmployee.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newEmployee.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Employee</button>
      </form>

      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.firstName} {employee.lastName} - {employee.username}
            <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEmployees;
