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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1>Create Employee</h1>
      <label>
        First Name:{" "}
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:{" "}
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Date of Birth:{" "}
        <DatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
        />
      </label>
      <label>
        Start date:{" "}
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData({ ...formData, startDate: date })}
        />
      </label>
      <label>
        Street:{" "}
        <input name="street" value={formData.street} onChange={handleChange} />
      </label>
      <label>
        City:{" "}
        <input name="city" value={formData.city} onChange={handleChange} />
      </label>

      <label>
        State :{" "}
        <Select
          options={states}
          value={states.find((s) => s.value === formData.state) || null}
          onChange={(selected) =>
            setFormData({ ...formData, state: selected.value })
          }
        />
      </label>

      <label>
        Zip Code:{" "}
        <input
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
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
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>

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
