const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const todoList = document.querySelector('#todo-list');

const getTodos = (cb) => {
  fetch(`${apiUrl}?_limit=10`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => cb(todo));
    });
};

function addTodoToDOM(todo) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute('data-id', todo.id);
  div.classList.add('todo');

  todo.completed && div.classList.add('done');

  document.querySelector('#todo-list').appendChild(div);
}

const createTodo = function (e) {
  e.preventDefault();
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => addTodoToDOM(data));
};

function toggleCompleted(e) {
  const todo = e.target;
  if (todo.matches('div.todo')) {
    todo.classList.toggle('done');
    updateTodo(todo.dataset.id, todo.classList.contains('done'));
  }
}

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const deleteTodo = (e) => {
  const todo = e.target;
  if (todo.matches('div.todo')) {
    const id = todo.dataset.id;
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => todo.remove())
  }
};

const init = () => {
  getTodos(addTodoToDOM);
  document.querySelector('#todo-form').addEventListener('submit', createTodo);
  todoList.addEventListener('click', toggleCompleted);
  todoList.addEventListener('dblclick', deleteTodo);
};

init();
