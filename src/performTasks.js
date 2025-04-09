export const addTask = (newTask, activeView, setTasks, tasks) => {
    const trimmedTask = newTask.trim();
    if (!trimmedTask) return;
  
    setTasks((prev) => {
      const exists = prev[activeView].some(task => task.text.trim().toLowerCase() === trimmedTask.toLowerCase());
      if (exists) {
        alert("This task already exists!");
        return prev;
      }
      const updated = {
        ...prev,
        [activeView]: [...prev[activeView], { text: trimmedTask, completed: false }]
      };
      return updated;
    });
  };
  
  export const removeTask = (taskToRemove, activeView, setTasks, tasks) => {
    setTasks(prev => {
      const updated = {
        ...prev,
        [activeView]: prev[activeView].filter(task => task.text !== taskToRemove.text)
      };
      return updated;
    });
  };
  
  export const toggleTaskCompletion = (task, activeView, setTasks, tasks) => {
    setTasks(prev => {
      const updated = {
        ...prev,
        [activeView]: prev[activeView].map(t =>
          t.text === task.text ? { ...t, completed: !t.completed } : t
        )
      };
      return updated;
    });
  };
  
  // export const editTask = (oldTask, newText, activeView, setTasks, tasks) => {
  //   const trimmed = newText.trim();
  //   if (!trimmed) return;
  
  //   setTasks(prev => {
  //     const exists = prev[activeView].some(
  //       task => task.text.trim().toLowerCase() === trimmed.toLowerCase()
  //     );
  //     if (exists) {
  //       alert("A task with the same name already exists!");
  //       return prev;
  //     }
  
  //     const updated = {
  //       ...prev,
  //       [activeView]: prev[activeView].map(t =>
  //         t.text === oldTask.text ? { ...t, text: trimmed } : t
  //       )
  //     };
  //     return updated;
  //   });
  // };
  