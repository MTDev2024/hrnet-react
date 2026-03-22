import { useState } from "react";

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

  return (
    <>
      <h1>Create Employee</h1>;
      <label>
        First Name: <input name="firstName" />
      </label>
      <label>
        Last Name: <input name="lastName" />
      </label>
      <label>
        Street: <input name="street" />
      </label>
      <label>
        City: <input name="city" />
      </label>
      <label>
        Zip Code: <input name="zipCode" />
      </label>
    </>
  );
}

export default CreateEmployee;
