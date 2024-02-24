import { useState, FormEvent } from "react";
import { FormState } from "../../types";
import "./SubmitTicket.css";

const SubmitTicket = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setSubmitted(false);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const submittedForm = { ...form };
    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      description: "",
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/createTicket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedForm),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  return (
    <div className="submitContainer">
      <h1 className="supportHeader">Support Request</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="formField">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={form.name} onChange={handleFormChange} />
        </div>
        <div className="formField">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleFormChange} />
        </div>
        <div className="formField">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={form.description} onChange={handleFormChange} />
        </div>
        <input type="submit" value="Submit" />
        {submitted && <p>Support request submitted</p>}
      </form>
    </div>
  );
};

export default SubmitTicket;
