
// Defined UI variables

const theme_toggle = document.querySelector('.theme-toggle');
const form = document.querySelector('#todo-form');
const taskInput = document.querySelector('#todo-input');
const addTask= document.querySelector('#add-btn');
const updateTask= document.querySelector('#update-btn');
const clearTask= document.querySelector('#clear-btn');
const taskLists= document.querySelector('.collection');


// Defined variables for dynamic elements


const taskItem = null;
const currentTodo = null;
const li = null;
const icon= null;



function changeTheme(){
    document.body.classList.toggle('dark-theme');
    const icon = theme_toggle.querySelector('i');
    
    if (document.body.classList.contains('dark-theme')) {
        icon.textContent = 'brightness_2'; // dark mode icon
    } else {
        icon.textContent = 'brightness_7'; // light mode icon
    }
}

function loadAllEventListeners(){
    theme_toggle.addEventListener('click',changeTheme);
    
}

loadAllEventListeners();


