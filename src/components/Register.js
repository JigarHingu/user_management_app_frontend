import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/;

    if (password.length < minLength) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!regex.test(password)) {
      setPasswordError(
        "Password must include uppercase, lowercase, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent submission if there's a password error
    if (passwordError) {
      toast.error("Please fix the password requirements.");
      return;
    }

    try {
      // If no errors, proceed with registration
      await axios.post("/users/register", formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message || "Registration fd failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={togglePasswordVisibility}
              />
            </div>
            <small className="error-text" style={{ color: "red" }}>
              {passwordError}
            </small>
          </div>
          <button type="submit" className="button" disabled={!!passwordError}>
            Create Account
          </button>
        </form>
        <div className="register-link">
          <p>
            Already have an account?{" "}
            <a href="/login" style={{ fontWeight: "bold" }}>
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
