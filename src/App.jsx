//app.jsx coordinates everything
//acting as the parent
import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

function App() {
  //create new state value that will hold a new todo
  //this is creating a useState hook
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [errorMessage, setErrorMessage] = useState(['']);
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
          throw new Error(`Request failed: ${resp.status}${resp.statusText}`);
        }

        const { records } = await resp.json();

        setTodoList(
          records.map((record) => {
            const todo = {
              id: record.id,
              title: record.field?.title ?? '',
              isCompleted: Boolean(record.fields?.isCompleted),
            };
            return todo;
          })
        );
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

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

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
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
      <TodoList
        todoList={todoList}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
