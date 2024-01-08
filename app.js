const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector(".btn-add");
const incompleteTaskHolder = document.querySelector("#incomplete-tasks");
const completedTasksHolder = document.querySelector("#completed-tasks");

function createNewTaskElement(taskString) {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    listItem.className = "section__wrapper__list-item";

    label.innerText = taskString;
    label.className = "task form-label";

    checkBox.type = "checkbox";
    checkBox.className = "checkbox";

    editInput.type = "text";
    editInput.className = "task form-control";

    editButton.innerText = "Edit";
    editButton.className = "btn btn-edit";

    deleteButton.className = "btn btn-delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}
function addTask() {
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}
function editTask() {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".btn-edit");
    const containsClass = listItem.classList.contains("edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("edit-mode");
}
function deleteTask() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}
function taskCompleted() {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
function taskIncomplete () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector(".checkbox");
    const editButton = taskListItem.querySelector(".btn-edit");
    const deleteButton = taskListItem.querySelector(".btn-delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}