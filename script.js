// Define UI variables
const theme_toggle = document.querySelector(".theme-toggle");
const form = document.querySelector("#todo-form");
const taskInput = document.querySelector("#todo-input");
const addbtn = document.querySelector("#add-btn");
const updatebtn = document.querySelector("#update-btn");
const clearbtn = document.querySelector("#clear-btn");
const taskList = document.querySelector("#todo-list");

let currentTask = null; // To hold the task being edited

// Toggle between light and dark theme
function changeTheme() {
  document.body.classList.toggle("dark-theme");
  const icon = theme_toggle.querySelector("i");
  icon.textContent = document.body.classList.contains("dark-theme")
    ? "brightness_7"
    : "brightness_2";
}

// Set the initial theme and hide update button
function setInitialTheme() {
  theme_toggle.querySelector("i").textContent = "brightness_7";
  updatebtn.style.display = "none";
}

// Add a new task
function addTask(e) {
  e.preventDefault(); // Prevent form submission
  if (taskInput.value === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.innerHTML = `
        <span>${taskInput.value}</span>
        <div>
            <i class="material-icons edit-todo">edit</i>
            <i class="material-icons delete-todo">delete</i>
        </div>
    `;

  taskList.appendChild(li); // Add the new task to the list
  storeTaskInLocalStorage(taskInput.value); // Save the task to Local Storage
  taskInput.value = ""; // Clear input field
}

// Store a new task in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve existing tasks
  tasks.push(task); // Add new task
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save back to Local Storage
}

// Update the current task
function updateTask(e) {
  e.preventDefault(); // Prevent form submission
  if (taskInput.value === "" || !currentTask) {
    alert("Please enter a task");
    return;
  }

  const oldTaskText = currentTask.querySelector("span").textContent; // Get current task text
  const newTaskText = taskInput.value; // Get new task text

  currentTask.querySelector("span").textContent = newTaskText; // Update the DOM
  updateTaskInLocalStorage(oldTaskText, newTaskText); // Update Local Storage
  taskInput.value = ""; // Clear input field
  switchToAddMode(); // Switch back to add mode
}

// Update Local Storage after editing a task
function updateTaskInLocalStorage(oldTask, newTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks
  tasks = tasks.map((task) => (task === oldTask ? newTask : task)); // Replace old task with new task
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save changes
}

// Handle task actions (edit/delete)
function handleTaskAction(e) {
  if (e.target.classList.contains("delete-todo")) {
    if (confirm("Are you sure you want to delete this task?")) {
      const removeList = e.target.parentElement.parentElement; // Get the task to remove
      removeList.remove(); // Remove from the UI
      removeTaskFromLocalStorage(removeList.querySelector("span").textContent); // Remove from Local Storage
    }
  } else if (e.target.classList.contains("edit-todo")) {
    currentTask = e.target.closest("li"); // Get the task being edited
    taskInput.value = currentTask.querySelector("span").textContent; // Populate the input
    switchToEditMode(); // Switch to edit mode
  }
}

// Remove a task from Local Storage
function removeTaskFromLocalStorage(taskElement) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks
  tasks = tasks.filter((task) => task !== taskElement); // Filter out the deleted task
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save changes
}

// Switch to edit mode
function switchToEditMode() {
  addbtn.style.display = "none"; // Hide add button
  updatebtn.style.display = "inline-block"; // Show update button
  taskInput.focus(); // Focus on input
}

// Switch to add mode
function switchToAddMode() {
  addbtn.style.display = "inline-block"; // Show add button
  updatebtn.style.display = "none"; // Hide update button
  currentTask = null; // Reset current task
}

// Clear all tasks
function clearTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    taskList.innerHTML = ""; // Clear the UI
    switchToAddMode(); // Switch back to add mode
    clearTasksLocalStorage(); // Clear Local Storage
  }
}

// Clear all tasks from Local Storage
function clearTasksLocalStorage() {
  localStorage.removeItem("tasks"); // Remove tasks from Local Storage
}

// Get tasks from Local Storage and populate the UI
function getTaskLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.innerHTML = `
            <span>${task}</span>
            <div>
                <i class="material-icons edit-todo">edit</i>
                <i class="material-icons delete-todo">delete</i>
            </div>
        `;
    taskList.appendChild(li); // Append task to the list
  });
}

// Load all event listeners
function loadAllEventListeners() {
  document.addEventListener("DOMContentLoaded", setInitialTheme); // Set theme on load
  document.addEventListener("DOMContentLoaded", getTaskLocalStorage); // Load tasks on load
  theme_toggle.addEventListener("click", changeTheme); // Toggle theme
  form.addEventListener("submit", addTask); // Add task on form submission
  updatebtn.addEventListener("click", updateTask); // Update task
  taskList.addEventListener("click", handleTaskAction); // Handle edit/delete actions
  clearbtn.addEventListener("click", clearTasks); // Clear all tasks
}

// Initialize event listeners
loadAllEventListeners();
