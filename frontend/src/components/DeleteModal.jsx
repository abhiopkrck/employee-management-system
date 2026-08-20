function DeleteModal({
  employee,
  onCancel,
  onConfirm,
  loading,
}) {

  if (!employee) {
    return null;
  }


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-xl font-semibold text-slate-800">
          Delete Employee
        </h2>


        <p className="mt-3 text-slate-600">
          Are you sure you want to delete this employee?
        </p>


        <p className="mt-2 font-medium text-slate-800">
          {employee.name}
        </p>


        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>


          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>

  );
}


export default DeleteModal;