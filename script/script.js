'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('newTodo')); // Массив для хранения данных (дел)

const render = function(){ // функция добалвяет дела на страницу
    todoList.textContent = ''; // присваиваем пустые строки
    todoCompleted.textContent = ''; 

    localStorage.setItem('newTodo', JSON.stringify(todoData)); // Сохранять данные о делах в localStorage


  todoData.forEach(function(item){ // перебор массива с данными
    const li = document.createElement('li'); // создание элемента
          li.classList.add('todo-item'); // добавление ему класса

          li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
          '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
          '</div>';    // добавление верстки
          
          if(item.complited) {
            todoCompleted.append(li);
          } else {
            todoList.append(li);
          }

      const btnTodoComplete = li.querySelector('.todo-complete');

      btnTodoComplete.addEventListener('click', function(){
      item.complited = !item.complited; // инвертация

      render();
      
    });

      const todoRemove = li.querySelector('.todo-remove'); //  Удаление дел на кнопку КОРЗИНА
            todoRemove.addEventListener('click', function(){
            todoData.splice(item, 1);

            render();
            });

  });

  headerInput.value = ''; // Поле ввода после добавления дела должно очищаться

};


todoControl.addEventListener('submit', function(event){
  
  event.preventDefault();

  if (headerInput.value === '') { return; } // Пустые дела добавляться не должны

  const newTodo = {
        value: headerInput.value,
        complited: false
  };

  todoData.push(newTodo);

  render();

});

render();