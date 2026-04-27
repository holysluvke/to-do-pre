let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


formElement.addEventListener('submit', (event) => {
	event.preventDefault();
	const taskText = inputElement.value;
	
	const todo = createItem(taskText);
	listElement.prepend(todo);
	
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
});

function loadTasks() {
	if (localStorage.getItem('tasks')) {
		return JSON.parse(localStorage.getItem('tasks'));
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
	
	textElement.textContent = item;

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach(itemName => tasks.push(itemName.textContent));

	return tasks;
}

function saveTasks(tasks) {
	tasks = JSON.stringify(tasks);
	localStorage.setItem('tasks', tasks);
}

items = loadTasks();
items.forEach((task) => {
	const todo = createItem(task);
	listElement.append(todo)
});

