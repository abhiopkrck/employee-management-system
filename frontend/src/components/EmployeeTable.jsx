function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {

  if (employees.length === 0) {

    return (
      <div className="py-12 text-center text-slate-500">
        No employees found.
      </div>
    );

  }


  return (

    <div className="overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-4 py-3 text-sm font-semibold text-slate-600">
              Name
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-slate-600">
              Email
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-slate-600">
              Phone
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-slate-600">
              Department
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-slate-600">
              Designation
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-slate-600">
              Salary
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-slate-600">
              Joining Date
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-slate-600">
              Actions
            </th>

          </tr>

        </thead>


        <tbody className="divide-y divide-slate-200">

          {employees.map((employee) => (

            <tr
              key={employee.id}
              className="hover:bg-slate-50"
            >

              <td className="px-4 py-3 font-medium text-slate-800">
                {employee.name}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {employee.email}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {employee.phone}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {employee.department}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {employee.designation}
              </td>

              <td className="px-4 py-3 text-slate-600">
                ₹{Number(employee.salary).toLocaleString("en-IN")}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {employee.joining_date}
              </td>

              <td className="px-4 py-3">

                <div className="flex gap-2">

                  <button
                    onClick={() => onEdit(employee)}
                    className="rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(employee)}
                    className="rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}


export default EmployeeTable;