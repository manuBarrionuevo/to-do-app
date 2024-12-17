const apiUrl = 'http://localhost:3000/tasks';

async function fetchTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  document.getElementById('taskList').innerHTML = tasks
    .map((task) => `<li>${task.name}</li>`)
    .join('');
}

async function addTask() {
  const name = document.getElementById('taskInput').value;
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  fetchTasks();
}

fetchTasks();
