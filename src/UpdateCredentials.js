import React, { useState } from 'react';
import './App.css';

const UpdateCredentials = ({ onComplete, showFlash }) => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = newPassword.trim();

    if (!trimmedUsername || !trimmedPassword) {
      showFlash("Please fill out both fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[trimmedUsername]) {
      showFlash("Username already exists. Please choose another one.");
      return;
    }

    users[trimmedUsername] = { password: trimmedPassword };
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("updatedUsername", trimmedUsername);
    localStorage.setItem("updatedPassword", trimmedPassword);
    localStorage.setItem("loggedInUser", trimmedUsername);
    localStorage.setItem("credentialsUpdated", "true");

    showFlash("Welcome! You're all set.");
    onComplete(); // triggers App.js to skip this screen
  };

  return (
    <div className="login-page">
      <h2>Create Your Account</h2>
      <input
        type="text"
        placeholder="Choose Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Choose Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleSubmit} className="add">Continue</button>
    </div>
  );
};

export default UpdateCredentials;
