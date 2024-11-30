import React, { useState } from "react";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
import Form from "../../components/ui/Form";
import backgroundImage from "../../assets/th (1).jpeg";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (API call, validation, etc.)
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="fixed top-4 text-center text-5xl font-extrabold text-yellow-300">
      🤷‍♂️  Bananuiz  🤷‍♂️
      </header>
      <div
        className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg backdrop-blur-sm"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <h2 className="text-2xl font-bold text-center text-white">
        🍌Login to Your Quiz🍌
        </h2>

        <Form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <TextInput
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <Button variant="warning">Login</Button>
        </Form>

        <div className="text-center">
          <p className="text-sm text-black-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-medium text-black-500 hover:text-blue-800"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
