"use strict";
const fs = require("fs"), dbFilePath = "./src/crud/employee_db.json";
const db = {
    connect: () => {
        try {
            return JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
        }
        catch (error) {
            return [];
        }
    },
    write: (data) => {
        fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
    },
};
// <- Start of Create Employee ->
const createEmployee = (employee) => {
    const employees = db.connect();
    employees.push(employee);
    db.write(employees);
};
const newEmployee = {
    id: 4,
    username: "Gabriel",
    position: "NextJS Developer",
};
createEmployee(newEmployee);
// <-- End of Save Employee -->
// <-- Start of Read Employee -->
const readEmployee = () => {
    const employees = db.connect();
    console.log(employees);
    return employees;
};
readEmployee();
// <-- End of Read Employee -->
// <-- Start of Update Employee -->
const updateEmployee = (id, updatedInfo) => {
    const employees = db.connect();
    const index = employees.findIndex((employee) => employee.id === id);
    if (index > -1) {
        employees[index] = Object.assign(Object.assign({}, employees[index]), updatedInfo);
        db.write(employees);
    }
};
updateEmployee(1, { position: "NodeJS Developer" });
// <-- End of Update Employee -->
// <-- Start of Delete Employee -->
const deleteEmployee = (id) => {
    const employees = db.connect();
    const _employees = employees.filter((employee) => employee.id !== id);
    db.write(_employees);
};
deleteEmployee(3);
// <-- End of Delete Employee -->
