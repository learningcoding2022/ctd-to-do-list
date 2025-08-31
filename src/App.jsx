//app.jsx coordinates everything
//acting as the parent
import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  //airtable setup
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setErrorMessage(''); //clears old error messages

      //settings for the request to airtable
      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }

        const { records } = await resp.json();

        setTodoList(
          records.map((record) => {
            const todo = {
              id: record.id,
              title: record.fields?.title ?? '',
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
  }, [url, token]);

  const addTodo = async (newTodo) => {
    //payload is new data being sent
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    //settings for request to airtable
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);

      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }

      const data = await resp.json();
      const { records } = data;

      const { id, fields } = records[0];
      const savedTodo = { id, ...fields };

      if (!fields.isCompleted) {
        savedTodo.isCompleted = false;
      }

      setTodoList([...todoList, savedTodo]);
      return savedTodo;
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return originalTodo;
        } else {
          return todo;
        }
      });
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  async function completeTodo(todoId) {
    const originalTodo = todoList.find((todo) => todo.id === todoId);

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: true };
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodos);

    const payload = {
      records: [
        {
          id: todoId,
          fields: { title: originalTodo.title, isCompleted: true },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return originalTodo;
        } else {
          return todo;
        }
      });
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        isLoading={isLoading}
        isSaving={isSaving}
      />
      {errorMessage ? (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      ) : null}
    </div>
  );
}
export default App;
