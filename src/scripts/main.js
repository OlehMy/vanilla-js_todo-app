'use strict';

const initialTodos = [
  {
    id: 1, title: 'HTML', completed: false,
  },
  {
    id: 2, title: 'CSS', completed: true,
  },
  {
    id: 3, title: 'JS', completed: false,
  },
];

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');
const clearCompletedButton = root.querySelector('.clear-completed');
const filter = root.querySelector('.filters');

const initTodos = (todos) => {
  todos.forEach(({ id, title, completed }) => {
    itemsList.insertAdjacentHTML('beforeend', `
    <li class="todo-item ${completed ? 'completed' : ''}">
      <input
        type="checkbox"
        class="toggle"
        id="toggle-${id}"
        ${completed ? 'checked' : ''}
      >
      <label for="toggle-${id}">${title}</label>
      <button type="button" class="destroy"></button>
    </li>
  `);
  });
};

initTodos(initialTodos);

const updateInfo = () => {
  const counter = root.querySelector('.todo-count');
  const activeTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const completedTogglers = root.querySelectorAll('.toggle:checked');
  const footer = root.querySelector('.footer');
  const toggleAllContainer = root.querySelector('.toggle-all-container');
  const hasTodos = activeTogglers.length > 0 || completedTogglers.length > 0;

  counter.innerHTML = `${activeTogglers.length} items left`;
  allToggler.checked = activeTogglers.length === 0;
  clearCompletedButton.hidden = completedTogglers.length === 0;

  footer.hidden = !hasTodos;
  toggleAllContainer.hidden = !hasTodos;
};

updateInfo();

filter.addEventListener('click', (event) => {
  const filterValue = event.target.dataset.filter;

  if (!filterValue) {
    return;
  }

  const filterButtons = root.querySelectorAll('[data-filter]');

  for (const button of filterButtons) {
    button.classList.toggle('selected', event.target === button);
  };

  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    const item = toggler.closest('.todo-item');

    switch (filterValue) {
      case 'all':
        item.hidden = false;
        break;

      case 'active':
        item.hidden = toggler.checked;
        break;

      case 'completed':
        item.hidden = !toggler.checked;
        break;
    }
  }
});

clearCompletedButton.addEventListener('click', () => {
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  for (const toggler of completedTogglers) {
    toggler.closest('.todo-item').remove();
  }

  updateInfo();
});

allToggler.addEventListener('change', () => {
  const togglers = root.querySelectorAll('.toggle');
  const checked = allToggler.checked;

  for (const toggler of togglers) {
    toggler.checked = checked;
    toggler.closest('.todo-item').classList.toggle('completed', checked);
  }
});

newTodoField.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') {
    return;
  };

  if (!newTodoField.value) {
    return;
  };

  const id = +new Date();

  itemsList.insertAdjacentHTML('beforeend', `
    <li class="todo-item">
      <input
        type="checkbox"
        class="toggle"
        id="toggle-${id}"
      >
      <label for="toggle-${id}">${newTodoField.value}</label>
      <button type="button" class="destroy"></button>
    </li>
  `);

  newTodoField.value = '';

  updateInfo();
});

itemsList.addEventListener('click', (event) => {
  if (!event.target.matches('.destroy')) {
    return;
  }

  event.target.closest('.todo-item').remove();
  updateInfo();
});

itemsList.addEventListener('change', (event) => {
  if (!event.target.matches('.toggle')) {
    return;
  }

  event.target
    .closest('.todo-item')
    .classList.toggle('completed', event.target.checked);

  updateInfo();
});
