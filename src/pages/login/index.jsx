import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import TextInput from "../../components/ui/TextInput"; 
import Form from "../../components/ui/Form"; 
import backgroundImage from "../../assets/th (1).jpeg";
import { auth } from "../../Firebase/config"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      console.log("All fields are required.");
      return;
    }

    try {
     
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful");
      navigate("/level1"); 
    } catch (err) {
      console.error("Error logging in:", err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="fixed top-4 text-center text-5xl font-extrabold text-yellow-300">
        🤷‍♂️ Bananuiz 🤷‍♂️
      </header>

      <div
        className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg backdrop-blur-sm"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <h2 className="text-2xl font-bold text-center text-white">
          🍌 Login to Your Quiz 🍌
        </h2>

        <Form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            aria-label="Enter your email"
          />
          <TextInput
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            aria-label="Enter your password"
          />

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring focus:ring-yellow-400 rounded-lg font-semibold text-center"
            >
              Login
            </button>
          </div>
        </Form>

        <div className="text-center mt-4">
          <p className="text-sm text-black-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-black hover:text-indigo-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
