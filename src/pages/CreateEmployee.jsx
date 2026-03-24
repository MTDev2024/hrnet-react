import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from "../data/states";
import { departments } from "../data/departments";
import { useEmployeeStore } from "../store/employeeStore";
import { useNavigate } from "react-router";

// TODO: replace local Modal copy with npm package once published
import Modal from "../components/Modal.jsx";
import "../components/Modal.css";

function CreateEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    addEmployee(formData);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Create Employee
      </h1>
      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>
      <label>
        Last Name:{" "}
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
        />
      </label>
      <label>
        Date of Birth:{" "}
        <DatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
        />
      </label>
      <label>
        Start date:{" "}
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData({ ...formData, startDate: date })}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
        />
      </label>
      <label>
        Street:{" "}
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
        />
      </label>
      <label>
        City:{" "}
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
        />
      </label>

      <label>
        State :{" "}
        <Select
          options={states}
          value={states.find((s) => s.value === formData.state) || null}
          onChange={(selected) =>
            setFormData({ ...formData, state: selected.value })
          }
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
        />
      </label>

      <label>
        Zip Code:{" "}
        <input
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
        />
      </label>
      <label>
        Departments :{" "}
        <Select
          options={departments}
          value={
            departments.find((s) => s.value === formData.department) || null
          }
          onChange={(selected) =>
            setFormData({ ...formData, department: selected.value })
          }
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
        />
      </label>
      <div className="flex items-center gap-4 mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 text-sm bg-slate-600 text-white rounded-md hover:bg-slate-700 disabled:opacity-50"
        >
          Save
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/employee-list");
        }}
      >
        Employee Created!
      </Modal>
    </div>
  );
}

export default CreateEmployee;
