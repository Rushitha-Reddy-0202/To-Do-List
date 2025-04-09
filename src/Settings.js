import React, { useState } from 'react';

const Settings = ({ darkMode, setDarkMode, showFlash }) => {
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handlePasswordUpdate = () => {
    const storedPassword = localStorage.getItem("updatedPassword");

    if (currentPassword !== storedPassword) {
      showFlash("Current password is incorrect!");
      setShowDelete(true);
      return;
    }

    if (!password.trim()) {
      showFlash("Password cannot be empty.");
      return;
    }

    localStorage.setItem("updatedPassword", password);

    const username = localStorage.getItem("updatedUsername");
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
      users[username].password = password;
      localStorage.setItem("users", JSON.stringify(users));
    }

    showFlash("Password updated!");
    setPassword("");
    setCurrentPassword("");
    setShowDelete(false);
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmed) return;

    const username = localStorage.getItem("updatedUsername");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    delete users[username];
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("updatedUsername");
    localStorage.removeItem("updatedPassword");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("credentialsUpdated");
    localStorage.removeItem("userTasks");

    showFlash("Account deleted successfully.");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleClearLocalStorage = () => {
    const preservedKeys = ["updatedUsername", "updatedPassword", "rememberMe", "credentialsUpdated", "userTasks"];
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (!preservedKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    showFlash("LocalStorage cleared (except login & tasks).");
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        Dark Mode
      </label>

      <br /><br />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        /> Show Password
      </label>

      <br />
      <button className="add" onClick={handlePasswordUpdate}>Update Password</button>

      {showDelete && (
        <>
          <p className="warning-text" style={{ color: "red", marginTop: "10px" }}>
            Wrong password? You can delete your account if you forgot it.
          </p>
          <br />
          <button className="add delete" onClick={handleDeleteAccount}>Delete Account</button>
        </>
      )}

      <br /><br />
      <button className="delete" onClick={handleClearLocalStorage}>
        Clear Local Storage
      </button>
    </div>
  );
};

export default Settings;
