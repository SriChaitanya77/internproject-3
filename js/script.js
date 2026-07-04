const STORAGE_KEY = 'focus-list-tasks';

const state = {
  tasks: [],
  filter: 'all',
};

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompletedButton = document.getElementById('clearCompleted');
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    state.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.warn('Unable to load tasks from storage.', error);
    state.tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}

function generateId() {
  return `task-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function getFilteredTasks() {
  if (state.filter === 'active') {
    return state.tasks.filter((task) => !task.completed);
  }

  if (state.filter === 'completed') {
    return state.tasks.filter((task) => task.completed);
  }

  return state.tasks;
}

function updateSummary() {
  const activeCount = state.tasks.filter((task) => !task.completed).length;
  const label = activeCount === 1 ? 'task' : 'tasks';
  taskCount.textContent = `${activeCount} ${label} left`;
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === state.filter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = `task-item${task.completed ? ' is-complete' : ''}`;
  item.dataset.id = task.id;

  const toggleButton = document.createElement('button');
  toggleButton.type = 'button';
  toggleButton.className = 'task-toggle';
  toggleButton.dataset.action = 'complete';
  toggleButton.setAttribute('aria-label', task.completed ? 'Mark task as active' : 'Mark task as complete');
  toggleButton.innerHTML = task.completed ? '<span aria-hidden="true">✓</span>' : '<span aria-hidden="true">○</span>';

  const title = document.createElement('span');
  title.className = 'task-title';
  title.textContent = task.title;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.dataset.action = 'edit';
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.dataset.action = 'delete';
  deleteButton.textContent = 'Delete';

  actions.append(editButton, deleteButton);
  item.append(toggleButton, title, actions);
  return item;
}

function render() {
  const filteredTasks = getFilteredTasks();
  taskList.innerHTML = '';

  if (filteredTasks.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `<p>${state.tasks.length === 0 ? 'No tasks yet. Add your first one above.' : 'No tasks match this filter yet.'}</p>`;
    taskList.appendChild(emptyState);
  } else {
    filteredTasks.forEach((task) => {
      taskList.appendChild(createTaskElement(task));
    });
  }

  updateSummary();
  updateFilterButtons();
  clearCompletedButton.disabled = !state.tasks.some((task) => task.completed);
}

function addTask(title) {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    taskInput.focus();
    return;
  }

  state.tasks.unshift({
    id: generateId(),
    title: cleanTitle,
    completed: false,
  });

  saveTasks();
  taskInput.value = '';
  render();
  taskInput.focus();
}

function toggleTask(id) {
  state.tasks = state.tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  render();
}

function updateTask(id, title) {
  state.tasks = state.tasks.map((task) =>
    task.id === id ? { ...task, title } : task
  );

  saveTasks();
  render();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  state.tasks = state.tasks.filter((task) => !task.completed);
  saveTasks();
  render();
}

function setFilter(filter) {
  state.filter = filter;
  render();
}

function startEditing(id, item) {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) {
    return;
  }

  const titleElement = item.querySelector('.task-title');
  const currentTitle = task.title;

  item.classList.add('is-editing');
  titleElement.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'edit-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.value = currentTitle;
  input.maxLength = 80;
  input.setAttribute('aria-label', 'Edit task title');

  const saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.className = 'btn btn--small btn--primary';
  saveButton.textContent = 'Save';

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.className = 'btn btn--small btn--ghost';
  cancelButton.textContent = 'Cancel';

  form.append(input, saveButton, cancelButton);
  titleElement.appendChild(form);
  input.focus();
  input.select();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nextTitle = input.value.trim();

    if (!nextTitle) {
      input.focus();
      return;
    }

    updateTask(id, nextTitle);
  });

  cancelButton.addEventListener('click', () => {
    item.classList.remove('is-editing');
    render();
  });
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

taskList.addEventListener('click', (event) => {
  const actionButton = event.target.closest('button[data-action]');
  if (!actionButton) {
    return;
  }

  const item = actionButton.closest('.task-item');
  if (!item) {
    return;
  }

  const id = item.dataset.id;
  if (!id) {
    return;
  }

  const action = actionButton.dataset.action;

  if (action === 'complete') {
    toggleTask(id);
  }

  if (action === 'edit') {
    startEditing(id, item);
  }

  if (action === 'delete') {
    deleteTask(id);
  }
});

document.querySelector('.filters').addEventListener('click', (event) => {
  const filterButton = event.target.closest('button[data-filter]');
  if (!filterButton) {
    return;
  }

  setFilter(filterButton.dataset.filter);
});

clearCompletedButton.addEventListener('click', clearCompleted);

loadTasks();
render();
