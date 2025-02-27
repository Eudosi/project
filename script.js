const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const signInBtn = document.getElementById('signInBtn');
const notification = document.getElementById('notification');


function createTask(taskText, isCompleted = false) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-card');
    if (isCompleted) {
        taskItem.classList.add('completed');
    }

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContent.classList.add('task-text');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.onclick = () => {
        taskItem.remove();
        saveTasks();  
    };

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-button');
    editBtn.textContent = 'Редактировать';
    editBtn.onclick = () => {
        taskInput.value = taskText; 
        taskItem.remove(); 
        saveTasks();  
    };

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Завершить';
    completeBtn.onclick = () => {
        taskItem.classList.toggle('completed');
        saveTasks();  
    };

    taskItem.appendChild(taskContent);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(completeBtn);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
}


addTaskBtn.onclick = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTask(taskText);
        taskInput.value = ''; 
        notification.style.display = 'block';  
        setTimeout(() => notification.style.display = 'none', 2000); 
        saveTasks();  
    }
};


function saveTasks() {
    let tasks = [];
    let taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(card => {
        tasks.push({
            text: card.querySelector('span').textContent,
            completed: card.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            createTask(task.text, task.completed);
        });
    }
}


window.onload = function() {
    loadTasks();
};


signInBtn.onclick = function(event) {
    event.preventDefault();  
    signInBtn.classList.add('clicked');
    setTimeout(function() {
        window.location.href = "a.html";  
    }, 500); 
};
