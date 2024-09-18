// Defined UI variables

const theme_toggle = document.querySelector(".theme-toggle");
const form = document.querySelector("#todo-form");
const taskInput = document.querySelector("#todo-input");
const addbtn = document.querySelector("#add-btn");
const updatebtn = document.querySelector("#update-btn");
const clearbtn = document.querySelector("#clear-btn");
const taskList = document.querySelector("#todo-list");

// Defined variables for dynamic elements

// const taskItem = null;
// const currentTodo = null;
// const li = null;
// const icon = null;

let currentTask = null;

function changeTheme() {
  document.body.classList.toggle("dark-theme");
  const icon = theme_toggle.querySelector("i");

  if (document.body.classList.contains("dark-theme")) {
    icon.textContent = "brightness_7"; // dark mode icon
  } else {
    icon.textContent = "brightness_2"; // light mode icon
  }
}

function setInitialTheme() {
  theme_toggle.querySelector("i").textContent = "brightness_7";
  updatebtn.style.display = "none";
}

function addTask(e) {
  e.preventDefault();

  //   validation
  if (taskInput.value === "") {
    alert("Please enter a task");
  } else {
    // add new task
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    li.innerHTML = `
            <span>${taskInput.value}</span>
            <div>
                <i class="material-icons edit-todo">edit</i>
                <i class="material-icons delete-todo">delete</i>
            </div>
        `;

    // Append li to ul
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
  }
}

function updateTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Please enter a task");
  } else if (currentTask) {
    currentTask.querySelector("span").textContent = taskInput.value;
    taskInput.value = "";
    switchToAddMode();
  }
}

function handleTaskAction(e) {
  if (e.target.classList.contains("delete-todo")) {
    if (confirm("Are you sure you want to delele this task?")) {
      const removeList = e.target.parentElement.parentElement;
      removeList.remove();
    }
  } else if (e.target.classList.contains("edit-todo")) {
    currentTask = e.target.closest("li");
    taskInput.value = currentTask.querySelector("span").textContent;
    switchToEditMode();
  }
}

function switchToEditMode() {
  addbtn.style.display = "none";
  updatebtn.style.display = "inline-block";
  taskInput.focus();
}

function switchToAddMode() {
  addbtn.style.display = "inline-block";
  updatebtn.style.display = "none";
  currentTask = null;
}

function clearTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    taskList.innerHTML = "";
    switchToAddMode();
  }
}

function loadAllEventListeners() {
  document.addEventListener("DOMContentLoaded", setInitialTheme);
  theme_toggle.addEventListener("click", changeTheme);
  form.addEventListener("submit", addTask);
  updatebtn.addEventListener("click", updateTask);
  taskList.addEventListener("click", handleTaskAction);
  clearbtn.addEventListener("click", clearTasks);
}

loadAllEventListeners();
