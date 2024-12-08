import React, { useState } from "react";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
import Form from "../../components/ui/Form";
import backgroundImage from "../../assets/th (1).jpeg";
import { Link } from "react-router-dom";
import { auth, db } from "../../Firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Track if user is successfully registered

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // Form validation
    if (!email || !password || !confirmPassword || !name) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        password,
        score: null,
      });

      console.log("Account Created and data saved in Firestore.");

      // Set registration success flag to true
      setIsRegistered(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="fixed top-4 text-center text-5xl font-extrabold text-yellow-300">
        🤷‍♂ Bananuiz 🤷‍♂
      </header>
      <div
        className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg backdrop-blur-sm"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Create Your Account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <Form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            aria-label="Enter your name"
          />
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
          <TextInput
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            aria-label="Confirm your password"
          />

          <Button variant="warning" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Form>

        <div className="text-center">
          <p className="text-sm text-black-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:text-indigo-800"
            >
              Log in
            </Link>
          </p>
        </div>

       
        {isRegistered && (
          <div className="text-center mt-4">
            <p className="text-white">Registration successful! You can now</p>
            <Link to="/login" className="text-indigo-500 hover:text-indigo-700">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
