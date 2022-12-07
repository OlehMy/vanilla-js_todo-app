'use strict';

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');

const updateInfo = () => {
  const notCompletedTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');

  counter.innerHTML = `${notCompletedTogglers.length} items left`;
  allToggler.checked = notCompletedTogglers.length === 0;
};

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
