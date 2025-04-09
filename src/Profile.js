import React, { useState } from 'react';

const Profile = ({ showFlash }) => {
  const storedUsername = localStorage.getItem("updatedUsername") || "User";
  const [username, setUsername] = useState(storedUsername);
  const [displayName, setDisplayName] = useState(localStorage.getItem("displayName") || username);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (username !== storedUsername) {
      if (users[username]) {
        showFlash("Username already exists. Please choose another one.");
        return;
      }

      users[username] = users[storedUsername];
      delete users[storedUsername];

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("updatedUsername", username);
      localStorage.setItem("loggedInUser", username);
      showFlash("Username updated successfully.");
    }

    localStorage.setItem("displayName", displayName);
    showFlash("Display name updated.");
  };

  const deleteAccount = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    delete users[storedUsername];

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("updatedUsername");
    localStorage.removeItem("updatedPassword");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("credentialsUpdated");
    localStorage.removeItem("displayName");

    showFlash("Account deleted.");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="profile-page">
      <h2>Edit Profile</h2>

      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
      />

      <label>Display Name</label>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <button className="add" onClick={handleSave}>Save</button>
      <button className="add delete" onClick={() => setConfirmDelete(true)}>Delete Account</button>

      {confirmDelete && (
        <div className="flash-modal">
          <div className="flash-content">
            <p>Are you sure you want to delete your account?</p>
            <p>This cannot be undone.</p>
            <div className="flash-actions">
              <button className="add delete" onClick={deleteAccount}>Yes, Delete</button>
              <button className="add" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
