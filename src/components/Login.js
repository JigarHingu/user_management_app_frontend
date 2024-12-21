import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // Use Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", formData);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Welcome</h2>
        <form onSubmit={handleSubmit}>
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
          </div>
          <div className="extra-links">
            <a href="#">Forgot password?</a>
          </div>
          <button className="button" type="submit">Login</button>
        </form>
        <div className="login-link">
          <p>
            Don't have an account?{" "} <Link to="/" style={{ fontWeight: "bold" }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
