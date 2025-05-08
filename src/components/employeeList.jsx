import React from 'react';

const EmployeeList = ({ employees, onAdd }) => {
  return (
    <div className="dashboard-section">
      <h2>Employees</h2>
      <ul className="list">
        {employees.map((emp, index) => (
          <li key={index}>{emp.name}</li>
        ))}
      </ul>
      <button className="add-btn" onClick={onAdd}>+ Add Employee</button>
    </div>
  );
};

export default EmployeeList;
