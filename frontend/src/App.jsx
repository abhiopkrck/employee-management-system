import { useEffect, useState } from "react";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import DeleteModal from "./components/DeleteModal";

import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "./services/employeeApi";


function App() {

  const [employees, setEmployees] = useState([]);

  const [editingEmployee, setEditingEmployee] =
    useState(null);

  const [deletingEmployee, setDeletingEmployee] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  async function loadEmployees() {

    try {

      setPageLoading(true);
      setError("");

      const data = await getEmployees();

      setEmployees(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setPageLoading(false);

    }

  }


  useEffect(() => {

    loadEmployees();

  }, []);


  async function handleSubmit(employee) {

    try {

      setLoading(true);
      setError("");
      setSuccess("");

      if (editingEmployee) {

        await updateEmployee(
          editingEmployee.id,
          employee
        );

        setSuccess(
          "Employee updated successfully."
        );

      } else {

        await createEmployee(employee);

        setSuccess(
          "Employee added successfully."
        );

      }

      setEditingEmployee(null);

      await loadEmployees();

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }


  function handleEdit(employee) {

    setEditingEmployee(employee);

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }


  function handleDelete(employee) {

    setDeletingEmployee(employee);

    setError("");
    setSuccess("");

  }


  async function confirmDelete() {

    if (!deletingEmployee) {
      return;
    }

    try {

      setDeleteLoading(true);
      setError("");

      await deleteEmployee(
        deletingEmployee.id
      );

      setDeletingEmployee(null);

      setSuccess(
        "Employee deleted successfully."
      );

      await loadEmployees();

    } catch (err) {

      setError(err.message);

    } finally {

      setDeleteLoading(false);

    }

  }


  return (

    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <header className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-5">

          <h1 className="text-2xl font-bold text-slate-800">
            Employee Management System
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage employees, departments and records
          </p>

        </div>

      </header>


      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">

        {/* Messages */}

        {error && (

          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>

        )}


        {success && (

          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>

        )}


        {/* Form */}

        <section className="rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-slate-800">

              {editingEmployee
                ? "Update Employee"
                : "Add Employee"}

            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {editingEmployee
                ? "Update the employee information below."
                : "Enter employee information to add a new record."}
            </p>

          </div>


          <EmployeeForm
            employee={editingEmployee}
            onSubmit={handleSubmit}
            onCancel={() => setEditingEmployee(null)}
            loading={loading}
          />

        </section>


        {/* Employee List */}

        <section className="rounded-xl bg-white shadow-sm">

          <div className="border-b px-6 py-5">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-slate-800">
                  Employee List
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {employees.length} employee
                  {employees.length !== 1 ? "s" : ""}
                </p>

              </div>

            </div>

          </div>


          {pageLoading ? (

            <div className="p-10 text-center text-slate-500">
              Loading employees...
            </div>

          ) : (

            <EmployeeTable
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          )}

        </section>

      </main>


      {/* Delete Modal */}

      <DeleteModal
        employee={deletingEmployee}
        onCancel={() => setDeletingEmployee(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />

    </div>

  );
}


export default App;