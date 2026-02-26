"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

export default function DeleteButton({ emp_id, emp_name, deleteAction }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)} 
        className="btn btn-square btn-ghost btn-sm hover:btn-error"
      >
        <Trash2 className="w-4 h-4 text-error" />
      </button>

      {/* Modal is only rendered once per button, but logic is isolated */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`} role="dialog">
        <div className="modal-box border-t-4 border-error">
          <div className="flex items-center gap-3 text-error mb-4">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-lg font-bold text-base-content">Confirm Delete</h3>
          </div>
          <p className="py-4">
            Are you sure you want to delete <strong>{emp_name}</strong>?
          </p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            {/* The Form triggers the Server Action passed as a prop */}
            <form action={async (formData) => {
              await deleteAction(formData);
              setIsOpen(false);
            }}>
              <input type="hidden" name="emp_id" value={emp_id} />
              <button type="submit" className="btn btn-error">Yes, Delete</button>
            </form>
          </div>
        </div>
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>
      </div>
    </>
  );
}