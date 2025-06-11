// app.js - Main logic for the Todo List App
// -----------------------------------------
// Handles adding, displaying, completing, and deleting todos using localStorage

// Select DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoTitle = document.getElementById('todo-title');


todoTitle.textContent = 'My Todo List';
todoTitle.style.cursor = 'caret';
todoTitle.contentEditable = true;
todoTitle.onblur = () => {
    localStorage.setItem('todoTitle', todoTitle.textContent);
};

// Key for localStorage
const STORAGE_KEY = 'todos';

// Load todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Render the todo list
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        // Create list item
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');

        // Todo text
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        span.title = 'Click to toggle complete';
        span.onclick = () => toggleComplete(idx);

        // Actions (delete button)
        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const delBtn = document.createElement('button');
        delBtn.className = 'action-btn';
        delBtn.innerHTML = '🗑️';
        delBtn.title = 'Delete';
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTodo(idx);
        };

        actions.appendChild(delBtn);
        li.appendChild(span);
        li.appendChild(actions);
        todoList.appendChild(li);
    });
}

// Add a new todo
function addTodo(text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
}

// Toggle completion status
function toggleComplete(idx) {
    todos[idx].completed = !todos[idx].completed;
    saveTodos();
    renderTodos();
}

// Delete a todo
function deleteTodo(idx) {
    todos.splice(idx, 1);
    saveTodos();
    renderTodos();
}

// Handle form submission
// Prevents page reload and adds the todo
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = todoInput.value.trim();
    if (value) {
        addTodo(value);
        todoInput.value = '';
        todoInput.focus();
    }
});

// Initial render
renderTodos();
