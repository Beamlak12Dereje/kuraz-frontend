const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();

  if (title === '') {
    alert('Task title cannot be empty!');
    return;
  }

  tasks.push({ id: Date.now(), title, completed: false });
  taskInput.value = '';
  renderTasks();
});

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <span>${task.title}</span>
      <div class="task-actions">
        <button onclick="toggleComplete(${task.id})">
          ${task.completed ? 'Undo' : 'Done'}
        </button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks(getCurrentFilter());
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks(getCurrentFilter());
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filters .active').classList.remove('active');
    button.classList.add('active');
    renderTasks(button.dataset.filter);
  });
});

function getCurrentFilter() {
  return document.querySelector('.filters .active').dataset.filter;
}

// Initial render
renderTasks();
