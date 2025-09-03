// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() !== "") {
    addTask(taskInput.value);
    saveTask(taskInput.value);
    taskInput.value = "";
  }
});

// Add task function
function addTask(taskText, isCompleted = false) {
  const li = document.createElement("li");

  // Task span
  const span = document.createElement("span");
  span.textContent = taskText;
  if (isCompleted) span.classList.add("completed");
  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    updateStorage();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("deleteBtn");
  delBtn.addEventListener("click", () => {
    li.remove();
    updateStorage();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save tasks in localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update localStorage after changes
function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const span = li.querySelector("span");
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}
