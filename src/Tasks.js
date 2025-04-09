import React from "react";

const fancyTitles = {
  Today: "Today’s Focus",
  Weekly: "Weekly Milestones",
  Monthly: "Monthly Objectives",
  Yearly: "Yearly Vision",
  Remainders: "Reminders & Nudges",
  Important: "Priority & Important Tasks"
};

const Tasks = ({ tasks, activeView, newTask, setNewTask, setTasks, addTask, removeTask, toggleTaskCompletion }) => {
  const currentTasks = tasks[activeView] || [];
  const fancyTitle = fancyTitles[activeView] || `${activeView} Tasks`;

  return (
    <div className="taskbox">
      <h2 className="tag">{fancyTitle}</h2>
      <div className="task-add">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={`Add a new task for ${activeView}`}
        />
        <button
          onClick={() => {
            addTask(newTask, activeView, setTasks, tasks);
            setNewTask("");
          }}
          disabled={!newTask.trim()}
          className="add"
        >
          Add Task
        </button>
      </div>
      <div className="tasktable">
        <div className="tasktable-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Task</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length === 0 ? (
                <tr>
                  <td colSpan="3">
                    <span>No tasks for {activeView}</span>
                  </td>
                </tr>
              ) : (
                currentTasks.map((task, index) => (
                  <tr key={index}>
                    <td width="5%">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          toggleTaskCompletion(task, activeView, setTasks, tasks)
                        }
                      />
                    </td>
                    <td width="90%">
                      <span className={task.completed ? "completed" : ""}>
                        {task.text}
                      </span>
                    </td>
                    <td width="5%">
                      <button
                        onClick={() =>
                          removeTask(task, activeView, setTasks, tasks)
                        }
                        className="delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
