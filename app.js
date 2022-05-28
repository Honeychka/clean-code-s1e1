var taskInput=document.getElementById('new-task');
var addButton=document.getElementsByTagName('button')[0];
var incompleteTaskHolder=document.getElementById('to-do-tasks');
var completedTasksHolder=document.getElementById('completed-tasks');

var createNewTaskElement=function(taskString){
    var listItem=document.createElement('div');
    var checkBox=document.createElement('input');
    var label=document.createElement('label');
    var editInput=document.createElement('input');
    var editButton=document.createElement('button');
    var deleteButton=document.createElement('button');
    var deleteButtonImg=document.createElement('img');

    listItem.className='tasks__item';

    label.innerText=taskString;
    label.className='task_text task_text-label';

    checkBox.type='checkbox';
    checkBox.className='task__checkbox';
    editInput.type='text';
    editInput.className='task_text input-task_text';

    editButton.innerText='Edit'; 
    editButton.className='task-behaviour button';

    deleteButton.className='task-remover button';
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className='remove__icon';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value='';
}

var editTask=function(){
    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector('label');
    var editBtn=listItem.querySelector('.task-behaviour');
    var containsClass=listItem.classList.contains('edit-tasks');
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText='Edit';
    }else{
        editInput.value=label.innerText;
        editBtn.innerText='Save';
    }

    listItem.classList.toggle('edit-tasks');
};

var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted=function(){
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick=addTask;
addButton.addEventListener('click',addTask);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    var checkBox=taskListItem.querySelector('.task__checkbox');
    var editButton=taskListItem.querySelector('.task-behaviour');
    var deleteButton=taskListItem.querySelector('.task-remover');

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
