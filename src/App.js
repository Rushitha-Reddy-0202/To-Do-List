import './App.css';
import React, { useState, useRef, useEffect } from "react";
import logo1 from './menu.png';
import logo2 from './account.png';
import Tasks from './Tasks';
import Profile from './Profile';
import Settings from './Settings';
import Login from './Login';
import { addTask, removeTask, toggleTaskCompletion } from './performTasks';

const fancyTitles = {
  Today: "Today's Focus",
  Weekly: "Weekly Milestones",
  Monthly: "Monthly Objectives",
  Yearly: "Yearly Vision",
  Remainders: "Reminders & Nudges",
  Important: "Priority & Important Tasks"
};

function App() {
  const [menuopen, setmenuopen] = useState(false);
  const [accountopen, setaccountopen] = useState(false);
  const [activeView, setActiveView] = useState('Today');
  const [newTask, setNewTask] = useState("");
  
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  
  const [username, setUsername] = useState(localStorage.getItem("updatedUsername") || "User");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("rememberMe") === "true");
  const [flashMessage, setFlashMessage] = useState("");
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const [tasks, setTasks] = useState({
    Today: [],
    Weekly: [],
    Monthly: [],
    Yearly: [],
    Remainders: [],
    Important: []
  });

  const isFirstLoad = useRef(true);
  const menuRef = useRef(null);
  const accountRef = useRef(null);
  const menubarRef = useRef(null);
  const accountbarRef = useRef(null);

  const menuclick = (e) => {
    e.stopPropagation();
    setmenuopen(prev => !prev);
    setaccountopen(false);
  };

  const accountclick = (e) => {
    e.stopPropagation();
    setaccountopen(prev => !prev);
    setmenuopen(false);
  };

  const showFlash = (msg) => {
    setFlashMessage(msg);
    setTimeout(() => {
      setFlashMessage("");
    }, 3000);
  };

  const itemclick = (choice) => {
    if (choice === "Logout") {
      setLogoutConfirm(true);
    } else {
      setActiveView(choice);
    }
  };

  useEffect(() => {
    if (username) {
      const savedTasks = localStorage.getItem(`tasks_${username}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, [username]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (username) {
      localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
    }
  }, [tasks, username]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleMenuClose = (e) => {
      if (
        menuRef.current &&
        menubarRef.current &&
        !menuRef.current.contains(e.target) &&
        !menubarRef.current.contains(e.target)
      ) {
        setmenuopen(false);
      }
    };

    const handleAccountClose = (e) => {
      if (
        accountRef.current &&
        accountbarRef.current &&
        !accountRef.current.contains(e.target) &&
        !accountbarRef.current.contains(e.target)
      ) {
        setaccountopen(false);
      }
    };

    document.addEventListener("mousedown", handleMenuClose);
    document.addEventListener("mousedown", handleAccountClose);

    return () => {
      document.removeEventListener("mousedown", handleMenuClose);
      document.removeEventListener("mousedown", handleAccountClose);
    };
  }, []);

  if (!isLoggedIn)
    return (
      <Login
        onLoginSuccess={() => {
          const user = localStorage.getItem("updatedUsername");
          if (user) setUsername(user);
          setIsLoggedIn(true);
        }}
        showFlash={showFlash}
      />
    );

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className='page'>
        <div className='titlebar'>
          <button className='menu' onClick={menuclick} ref={menuRef}>
            <img src={logo1} alt='menu' className='logo' />
          </button>
          <div className={`menubar ${menuopen ? "open" : ""}`} ref={menubarRef}>
            <ul>
              {Object.keys(fancyTitles).map(view => (
                <li key={view} onClick={() => itemclick(view)}>{fancyTitles[view]}</li>
              ))}
            </ul>
            <hr />
          </div>
          <h1>{username}'s Task Universe</h1>
          <button className='account' onClick={accountclick} ref={accountRef}>
            <img src={logo2} alt='account' className='logo' />
          </button>
          <div className={`accountbar ${accountopen ? "open" : ""}`} ref={accountbarRef}>
            <ul>
              <li onClick={() => itemclick('Profile')} className="info">Profile</li>
              <li onClick={() => itemclick('Settings')} className="info">Settings</li>
              <li onClick={() => itemclick('Logout')} className="info">Logout</li>
            </ul>
          </div>
        </div>
      </div>

      {Object.keys(fancyTitles).includes(activeView) && (
        <Tasks
          tasks={tasks}
          activeView={activeView}
          newTask={newTask}
          setNewTask={setNewTask}
          setTasks={setTasks}
          addTask={addTask}
          removeTask={removeTask}
          toggleTaskCompletion={toggleTaskCompletion}
          fancyTitles={fancyTitles}
        />
      )}

      {activeView === "Profile" && <Profile showFlash={showFlash} />}
      {activeView === "Settings" && <Settings darkMode={darkMode} setDarkMode={setDarkMode} showFlash={showFlash} />}

      {flashMessage && <div className="flash-message">{flashMessage}</div>}

      {logoutConfirm && (
        <div className="flash-modal">
          <div className="flash-content">
            <p>Are you sure you want to logout?</p>
            <div className="flash-actions">
              <button className="delete" onClick={() => {
                localStorage.removeItem("rememberMe");
                setIsLoggedIn(false);
                setLogoutConfirm(false);
                showFlash("Logged out successfully.");
              }}>Yes</button>
              <button className="add" onClick={() => setLogoutConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
