const inputElement = document.getElementById("task__input");
const tasksListElement = document.getElementById("tasks__list");

const tasksToRestore = localStorage.getItem("tasks");
if (tasksToRestore) {
    const tasksToRestoreArray = JSON.parse(tasksToRestore);
    tasksToRestoreArray.forEach(taskTitle => {
        addTask(taskTitle);
    });
}

document.getElementById("tasks__add").addEventListener("click", (event) => {
    event.preventDefault();

    const title = inputElement.value.trim();
    if (!title) {
        return;
    }

    addTask(title);
    inputElement.value = "";
    updateLocalStorage();
});

function addTask(title) {
    tasksListElement.insertAdjacentHTML("beforeend", `
        <div class="task">
            <div class="task__title">${title}</div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `);
}

tasksListElement.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".task__remove");
    if (removeBtn) {
        event.preventDefault();
        const task = removeBtn.closest(".task");
        if (task) {
            task.remove();
            updateLocalStorage();
        }
    }
});

function updateLocalStorage() {
    const taskElements = tasksListElement.querySelectorAll(".task");
    const tasksTitlesArray = Array.from(taskElements).map(taskElement => {
        const titleElement = taskElement.querySelector(".task__title");
        return titleElement ? titleElement.textContent : "";
    });
    localStorage.setItem("tasks", JSON.stringify(tasksTitlesArray));
}