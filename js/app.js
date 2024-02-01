const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.querySelector(".add-button");
const alertDiv = document.querySelector(".show-alert");
const tBody = document.querySelector("tbody");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

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

const displayTodos = () => {
  tBody.innerHTML = "";
  if (!todos) {
    tBody.innerHTML = "<tr><td colspan='4'>No todos find!</td></tr>";
  } else {
    todos.forEach((todo) => {
      tBody.innerHTML += `
      <tr>
      <td>${todo.task}</td>
      <td>${todo.date || "No date"}</td>
      <td>${todo.completed ? "Completed" : "Pending"}</td>
      <td>
      <img src="./images/icons8-edit-32.png" />
      <img src="./images/icons8-checkmark-64.png" />
      <img src="./images/icons8-delete-64 (2).png" />
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
    completed: "false",
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

window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
