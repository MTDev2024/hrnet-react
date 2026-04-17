import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from "../data/states";
import { departments } from "../data/departments";
import { useEmployeeStore } from "../store/employeeStore";
import { useNavigate } from "react-router";

import Modal from "modal-mtdev2024";
import "modal-mtdev2024/style.css";
import "../styles/modal-override.css";

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

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name must contain letters only";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain letters only";
    }

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    if (!formData.startDate) newErrors.startDate = "Start date is required";

    if (!formData.street.trim()) newErrors.street = "Street is required";

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(formData.city)) {
      newErrors.city = "City must contain letters only";
    }

    if (!formData.state) newErrors.state = "State is required";

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Zip code must be 5 digits";
    }

    if (!formData.department) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
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
        {errors.firstName && (
          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <DatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData({ ...formData, startDate: date })}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        {errors.startDate && (
          <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">Street</label>
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        {errors.street && (
          <p className="text-red-500 text-xs mt-1">{errors.street}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">City</label>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        {errors.city && (
          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">State</label>
        <Select
          options={states}
          value={states.find((s) => s.value === formData.state) || null}
          onChange={(selected) =>
            setFormData({ ...formData, state: selected.value })
          }
          className="text-sm"
        />
        {errors.state && (
          <p className="text-red-500 text-xs mt-1">{errors.state}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Zip Code
        </label>
        <input
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        {errors.zipCode && (
          <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Departments
        </label>
        <Select
          options={departments}
          value={
            departments.find((s) => s.value === formData.department) || null
          }
          onChange={(selected) =>
            setFormData({ ...formData, department: selected.value })
          }
          className="text-sm"
        />
        {errors.department && (
          <p className="text-red-500 text-xs mt-1">{errors.department}</p>
        )}
      </div>

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
        Employee Created !
      </Modal>
    </div>
  );
}

export default CreateEmployee;
