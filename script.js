let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const progressFill = document.getElementById("progressFill");
  progressFill.style.width = percent + "%";
  progressFill.innerText = percent + "%";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");
    else if (task.due && task.due < today) li.classList.add("overdue");

    li.innerHTML = `
      <div class="task-details" onclick="toggleTask(${index})">
        <span>${task.name}</span><br>
        <span class="due-date">Due: ${task.due || "Not set"}</span>
      </div>
      <div>
        <button class="btn-small" onclick="deleteTask(${index})">✖</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateProgress();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDate");

  if (input.value.trim() !== "") {
    tasks.push({ name: input.value, due: dueDate.value, completed: false });
    input.value = "";
    dueDate.value = "";
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();
