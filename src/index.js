import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SuccessPage from "./pages/SuccessPage";
import "./styles.css"; // Import global styles

const App = () => {
  return (
    <Router>
      <div>
        {/* Toast notifications */}
        <ToastContainer />

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
};

// Updated for React 18+
const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(<App />);
