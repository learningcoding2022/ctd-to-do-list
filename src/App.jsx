import './App.css';
import TodoList from './ToDoList';
import TodoForm from './TodoForm';
import { useState } from 'react';

function App() {
  //create new state value that will hold a new todo
  //this is creating a useState hook
  const [newTodo, setNewTodo] = useState('Example Text');
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
