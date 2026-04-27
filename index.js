const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = inputElement.value;
  if (taskText.trim() === '') {
    return;
  }

  const todo = createItem(taskText);
  listElement.prepend(todo);

  updateStorage()
  inputElement.value = '';
});

function loadTasks() {
  if (localStorage.getItem('tasks')) {
    return JSON.parse(localStorage.getItem('tasks'));
  }
  return ['Сделать проектную работу',
					'Полить цветы',
  				'Пройти туториал по Реакту',
  				'Сделать фронт для своего проекта',
  				'Прогуляться по улице в солнечный день',
  				'Помыть посуду',
	];
}

function createItem(item) {
  const template = document.getElementById('to-do__item-template');
  const clone = template.content.querySelector('.to-do__item').cloneNode(true);
  const textElement = clone.querySelector('.to-do__item-text');
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = clone.querySelector(
    '.to-do__item-button_type_duplicate',
  );
  const editButton = clone.querySelector('.to-do__item-button_type_edit');

  textElement.textContent = item;

  deleteButton.addEventListener('click', () => {
    clone.remove();
    updateStorage();
  });

  duplicateButton.addEventListener('click', () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    updateStorage();
  });


	let originalText = textElement.textContent;

	editButton.addEventListener('click', () => {
  	originalText = textElement.textContent;
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
      textElement.removeAttribute('contenteditable');
    } else if (event.code === 'Escape') {
      textElement.textContent = originalText;
      textElement.removeAttribute('contenteditable');
    }
    updateStorage();
  });

  textElement.addEventListener('blur', () => {
		textElement.removeAttribute('contenteditable');
    updateStorage();
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  itemsNamesElements.forEach((itemName) => tasks.push(itemName.textContent));

  return tasks;
}

function saveTasks(tasks) {
  const tasksForStoring = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksForStoring);
}

function updateStorage() {
	saveTasks(getTasksFromDOM());
}

const items = loadTasks();
items.forEach((task) => {
  const todo = createItem(task);
  listElement.append(todo);
});
