import axios from "axios";
import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signin", formData);

      if (response.status === 200 || response.status === 201) {
        console.log("Login successful");
        // setLoading(false); // ✅ Stop spinner
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(error.response.data.error || "Invalid email or password.");
      } else {
        setError("Server unreachable. Please try again later.");
      }

      setLoading(false); // ✅ Stop loading if error
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg p-6 flex flex-col gap-6 w-80 rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-xl font-semibold text-gray-800">Login</h2>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <div>
          <input
            name="email"
            type="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            required
            className="w-full border border-gray-500 py-2 px-3 rounded-sm outline-none"
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            required
            className="w-full border border-gray-500 py-2 px-3 rounded-sm outline-none"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className={`px-6 py-2 bg-gray-800 w-full text-white rounded-sm hover:bg-gray-900 transition duration-300 
              ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900"}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin w-5 h-5" /> Loading...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div className="flex items-center justify-end gap-1 mt-[-20px]">
          <p className="text-xs">Don't have an account?</p>
          <Link to="/signup-page" className="underline text-blue-500 text-sm">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
