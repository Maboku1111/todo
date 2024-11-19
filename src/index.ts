import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks("TASKS");
tasks.forEach(addListItem)

form?.addEventListener("submit", (e: Event) => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidv4(), 
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask);

  addListItem(newTask);
  input.value = "";
})

function addListItem(task: Task) {
  const item = document.createElement("li")!;
  const label = document.createElement("label")!;
  const checkbox = document.createElement("input")!;
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
  })
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks(storageName: string, storageData: object) {
  return localStorage.setItem(storageName, JSON.stringify(storageData));
}

function loadTasks(storageName: string): Task[ ] {
  const taskJSON = localStorage.getItem(storageName)
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}