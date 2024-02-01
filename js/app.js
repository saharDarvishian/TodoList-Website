const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.querySelector(".add-button");
const alertDiv = document.querySelector(".show-alert");
const todosBody = document.querySelector("tbody");
const deleteAll = document.getElementById("delete-all");
const editButton = document.querySelector(".edit-button");
const filterButton = document.querySelectorAll(".filter-todos");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const showAlert = (message, type) => {
  alertDiv.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertDiv.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const deleteAllHandler = () => {
  todos = [];
  saveToLocalStorage();
  displayTodos();
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
};

const editHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "block";
  editButton.dataset.id = todo.id;
};

const applyHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => todo.id === id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  addButton.style.display = "inline-block";
  editButton.style.display = "none";
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo editet successfully", "success");
};

const toggleHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  console.log(todo);
  todo.completed = !todo.completed;
  console.log(todo);
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo status changed successfully", "success");
};

const filterHandler = (event) => {
  let filterTodos = null;
  const filter = event.target.dataset.filter;
  switch (filter) {
    case "pending":
      filterTodos = todos.filter((todo) => todo.completed === false);
      console.log(filterTodos);
      break;
    case "completed":
      filterTodos = todos.filter((todo) => todo.completed === true);
      console.log(filterTodos);
      break;
    default:
      filterTodos = todos;
      break;
  }
  displayTodos(filterTodos);
};

const displayTodos = (data) => {
  const todosList = data || todos;
  todosBody.innerHTML = "";
  if (!todosList.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
  } else {
    todosList.forEach((todo) => {
      todosBody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No date"}</td>
        <td>${todo.completed ? "completed" : "Pending"}</td>
        <td id="last-child">
          <img onclick="editHandler('${todo.id}')"
            src="./images/icons8-edit-32.png" />

          <img onclick="toggleHandler('${todo.id}')" 
             src=${
               todo.completed
                 ? "./images/icons8-checkmark-64.png"
                 : "./images/circle.png"
             } />       
          <img onclick="deleteHandler('${todo.id}')"
           src="./images/icons8-delete-64 (2).png" />
        </td>
      </tr> 
      `;
    });
  }
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;

  const todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };

  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfully", "success");
    displayTodos();
  } else {
    showAlert("Please enter a todo!", "error");
  }
};

window.addEventListener("load", () => displayTodos());
addButton.addEventListener("click", addHandler);
deleteAll.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyHandler);
filterButton.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
