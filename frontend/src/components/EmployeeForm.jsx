import { useEffect, useState } from "react";


const initialForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  salary: "",
  joining_date: "",
};


function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
  loading,
}) {

  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});


  useEffect(() => {

    if (employee) {

      setForm({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        department: employee.department || "",
        designation: employee.designation || "",
        salary: employee.salary || "",
        joining_date: employee.joining_date || "",
      });

    } else {

      setForm(initialForm);

    }

    setErrors({});

  }, [employee]);


  function handleChange(event) {

    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  }


  function validate() {

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone =
        "Phone must be exactly 10 digits";
    }

    if (!form.department.trim()) {
      newErrors.department =
        "Department is required";
    }

    if (!form.designation.trim()) {
      newErrors.designation =
        "Designation is required";
    }

    if (!form.salary || Number(form.salary) <= 0) {
      newErrors.salary =
        "Salary must be greater than 0";
    }

    if (!form.joining_date) {
      newErrors.joining_date =
        "Joining date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }


  async function handleSubmit(event) {

    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      ...form,
      salary: Number(form.salary),
    });

  }


  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";


  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Employee Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            className={inputClass}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>


        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="employee@example.com"
            className={inputClass}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>


        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
            placeholder="10-digit phone number"
            className={inputClass}
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone}
            </p>
          )}
        </div>


        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Department
          </label>

          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="e.g. IT"
            className={inputClass}
          />

          {errors.department && (
            <p className="mt-1 text-sm text-red-500">
              {errors.department}
            </p>
          )}
        </div>


        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Designation
          </label>

          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="e.g. Software Developer"
            className={inputClass}
          />

          {errors.designation && (
            <p className="mt-1 text-sm text-red-500">
              {errors.designation}
            </p>
          )}
        </div>


        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Salary
          </label>

          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            min="1"
            placeholder="Enter salary"
            className={inputClass}
          />

          {errors.salary && (
            <p className="mt-1 text-sm text-red-500">
              {errors.salary}
            </p>
          )}
        </div>


        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Joining Date
          </label>

          <input
            type="date"
            name="joining_date"
            value={form.joining_date}
            onChange={handleChange}
            className={inputClass}
          />

          {errors.joining_date && (
            <p className="mt-1 text-sm text-red-500">
              {errors.joining_date}
            </p>
          )}
        </div>

      </div>


      <div className="flex gap-3">

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : employee
              ? "Update Employee"
              : "Add Employee"}
        </button>


        {employee && (

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

        )}

      </div>

    </form>

  );
}


export default EmployeeForm;