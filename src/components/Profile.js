import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", age: "", phone: "" });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Token is missing");
          return;
        }
        const { data } = await axios.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setFormData({ username: data.username, age: data.age || "", phone: data.phone || "" });
      } catch (err) {
        setError("Failed to fetch profile. Please login again.");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Token is missing");
        return;
      }
      const { data } = await axios.put("/profile/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      Navigate('/success')
    } catch (err) {
      console.log(err)
      setError("Failed to update profile.");
      toast.error("please provide valid information")
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Profile</h2>
        {user ? (
          isEditing ? (
            <form onSubmit={handleUpdate}>
              <div className="form-field">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="form-field">
                <label>Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Enter your age"
                  required
                />
              </div>
              <div className="form-field">
                <label>Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div style={{display:"flex", gap:"15px"}}>
                <button type="submit" className="button">Save</button>
                <button
                  type="button"
                  className="secondary-button button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-view">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Age:</strong> {user.age || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "N/A"}
              </p>
              <button className="button" onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
