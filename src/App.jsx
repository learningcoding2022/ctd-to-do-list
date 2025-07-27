//app.jsx coordinates everything
//acting as the parent
import { useState } from 'react';
import './App.css';
import TodoList from './ToDoList';
import TodoForm from './TodoForm';

function App() {
  //create new state value that will hold a new todo
  //this is creating a useState hook
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    const newTodo = {
      title: title,
      id: Date.now(),
      isCompleted: false,
    };
    //calling the updater funtions...saying heres the newtodo add it to the list
    //this is where the actual updating is happening
    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(todoId) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
