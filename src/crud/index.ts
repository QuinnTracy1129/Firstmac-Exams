const fs = require("fs"),
  dbFilePath = "./src/crud/employee_db.json";

interface Employee {
  id: number;
  username: string;
  position: string;
}

const db = {
  connect: (): Employee[] => {
    try {
      return JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
    } catch (error) {
      return [];
    }
  },
  write: (data: Employee[]): void => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
  },
};

// <- Start of Create Employee ->
const createEmployee = (employee: Employee): void => {
  const employees = db.connect();
  employees.push(employee);
  db.write(employees);
};

const newEmployee: Employee = {
  id: 4,
  username: "Gabriel",
  position: "NextJS Developer",
};

createEmployee(newEmployee);
// <-- End of Save Employee -->

// <-- Start of Read Employee -->
const readEmployee = (): Employee[] => {
  const employees = db.connect();
  console.log(employees);
  return employees;
};

readEmployee();
// <-- End of Read Employee -->

// <-- Start of Update Employee -->
const updateEmployee = (id: number, updatedInfo: Partial<Employee>): void => {
  const employees = db.connect();
  const index = employees.findIndex((employee) => employee.id === id);

  if (index > -1) {
    employees[index] = { ...employees[index], ...updatedInfo };
    db.write(employees);
  }
};

updateEmployee(1, { position: "NodeJS Developer" });
// <-- End of Update Employee -->

// <-- Start of Delete Employee -->
const deleteEmployee = (id: number): void => {
  const employees = db.connect();
  const _employees = employees.filter((employee) => employee.id !== id);
  db.write(_employees);
};

deleteEmployee(3);
// <-- End of Delete Employee -->
