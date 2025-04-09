import React, { useState } from 'react';
import './App.css';

const Login = ({ onLoginSuccess, showFlash }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      showFlash("Please enter both username and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[trimmedUsername]) {
      if (users[trimmedUsername].password === trimmedPassword) {
        showFlash("Login successful!");
      } else {
        showFlash("Incorrect password. Try again.");
        return;
      }
    } else {
      users[trimmedUsername] = { password: trimmedPassword };
      localStorage.setItem("users", JSON.stringify(users));
      showFlash("New account created and logged in!");
    }

    if (remember) localStorage.setItem("rememberMe", "true");

    localStorage.setItem("updatedUsername", trimmedUsername);
    localStorage.setItem("updatedPassword", trimmedPassword);
    localStorage.setItem("loggedInUser", trimmedUsername);
    localStorage.setItem("credentialsUpdated", "true");

    onLoginSuccess();
  };

  return (
    <div className='login-page'>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
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

      <label>
        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
        Remember me for 7 days
      </label>

      <button onClick={handleLogin} className="add">Login</button>
    </div>
  );
};

export default Login;
