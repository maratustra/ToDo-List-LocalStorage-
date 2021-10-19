'use scrict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const toLocal = function () {
  localStorage.setItem('todo', JSON.stringify(todoData));
};

const fromLocal = function () {
  todoData = JSON.parse(localStorage.getItem('todo'));
};

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';

  todoData.forEach(function (item, itemIndex) {

    const li = document.createElement('li');

    li.classList.add("todo-item");

    li.innerHTML = `<span class="text-todo">${item.text}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>`;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      toLocal();
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function () {
      todoData.splice(itemIndex, 1);
      toLocal();
      render();
    });
  });
};

if (localStorage.getItem('todo')) {
  fromLocal();
  render();
}


todoControl.addEventListener('submit', function (e) {
  e.preventDefault();

  if (headerInput.value.trim() !== "") {

    let newToDo = {
      text: headerInput.value,
      completed: false
    };

    todoData.push(newToDo);
    headerInput.value = '';
    toLocal();

    render();
  }
});