//!Done//Write todo in input; then press ADD => input.value writes in li

//!Done//Press DONE => text-decoration: line-through

//!Done//Press DELETE => item is removed from list

//!Done//Check if ''

//!Done//Saving in localStorage

// picking elements
const input = document.querySelector('input');
const addButton = document.querySelector('.add-btn');
const list = document.querySelector('.list');
const filterTodos = document.querySelector('.filter');

// adding todos
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value !== '') {
        save2LocalStorage(input.value);
        //Creating li element
        const todo = document.createElement('li');
        todo.classList.add('item');
        todo.innerHTML = `<span>${input.value}</span><button class="done-btn"><i class="fas fa-check"></i></button><button class="delete-btn"><i class="fas fa-times"></i></button>`;
        list.appendChild(todo);
        //add listener to done button
        const doneButton = todo.querySelector('.done-btn');
        doneButton.addEventListener('click', (e) => {
            todo.classList.toggle('done');
        })
        //add listener to delete button
        const deleteButton = todo.querySelector('.delete-btn');
        deleteButton.addEventListener('click', (e) => {
            //adding animation
            todo.classList.add('anim-gone');
            const randomNr = Math.round(Math.random());
            todo.style.transform = `translateX(${randomNr ? '+' : '-'}25vw)`;
            //removing item
            todo.addEventListener('transitionend', () => {
                todo.remove();
            })
        })
    }
    input.value = '';
})

//filtering
filterTodos.addEventListener('click', (e) => {
    const todos = list.children;
    for (const todo of todos) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'done':
                if (todo.classList.contains('done')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'undone':
                if (!todo.classList.contains('done')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            default:
                break;
        }
    }
})

//Saving in localStorage;
document.addEventListener('DOMContentLoaded', drawLocalTodos);

function getTodos() {
    let retrievedLocalTodos = localStorage.getItem('todos');
    if (retrievedLocalTodos === null) {
        return [];
    } else {
        return JSON.parse(retrievedLocalTodos);
    }
}

function save2LocalStorage(todo) {
    let todos = getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    return;
}

function drawLocalTodos() {
    let todos = getTodos();
    todos.forEach((todoValue, index) => {
        //Creating li element
        const todo = document.createElement('li');
        todo.classList.add('item');
        todo.innerHTML = `<span>${todoValue}</span><button class="done-btn"><i class="fas fa-check"></i></button><button class="delete-btn"><i class="fas fa-times"></i></button>`;
        list.appendChild(todo);
        //add listener to done button
        const doneButton = todo.querySelector('.done-btn');
        doneButton.addEventListener('click', (e) => {
            todo.classList.toggle('done');
        })
        //add listener to delete button
        const deleteButton = todo.querySelector('.delete-btn');
        deleteButton.addEventListener('click', (e) => {
            //delete from local storage
            deleteTodoLocal(todoValue);
            //adding animation
            todo.classList.add('anim-gone');
            const randomNr = Math.round(Math.random());
            todo.style.transform = `translateX(${randomNr ? '+' : '-'}25vw)`;
            //removing item
            todo.addEventListener('transitionend', () => {
                todo.remove();
            })
        })
    });
    return;
}

function deleteTodoLocal(todoValue) {
    let todos = getTodos();
    const todoIndex = todos.indexOf(todoValue);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    return;
}


