// Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const addTodoButton = document.querySelector(".add-todo");

addEventListeners();

function addEventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadTodoToUI);
  todoList.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodo);
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (todoInput.value == "") {
    showAlert("danger", "Todo giriniz...");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo girildi.");
    todoInput.value = "";
  }

  e.preventDefault();
}

function filterTodo(e) {
  const filter = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function(listItem){
    listItem
  })
  
}

function deleteTodo(e) {
  if ((e.target.className === "fa fa-remove")) {
    // console.log("jfakjas")
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("warning", "Todo silindi.");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodoFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos))
}
function loadTodoToUI() {
  let todos = getTodoFromStorage();

  todos.forEach(function (todo) {
    if (todos != null) {
      addTodoToUI(todo);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodoFromStorage() {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodoFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alertmessage = document.createElement("div");

  alertmessage.className = `alert alert-${type}`;
  alertmessage.innerHTML = message;

  firstCardBody.appendChild(alertmessage);

  setTimeout(function () {
    alertmessage.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");
  const deleteItem = document.createElement("a");

  listItem.className = "list-group-item d-flex justify-content-between";
  deleteItem.href = "#";
  deleteItem.className = "delete-item";
  deleteItem.innerHTML = "<i class='fa fa-remove'></i>";

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(deleteItem);
  todoList.appendChild(listItem);

  console.log(listItem);
}
