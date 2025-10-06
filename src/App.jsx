//app.jsx coordinates everything
//acting as the parent
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback, useReducer } from 'react';
import './App.css';
import styles from './App.module.css';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './todos.reducer';
import TodosPage from './TodosPage';
import Header from './Header.jsx';

//airtable setup
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      //settings for the request to airtable
      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(encodeUrl(), options);
        console.log(resp);
        if (!resp.ok) {
          throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }

        const { records } = await resp.json();
        console.log(records);

        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, queryString, encodeUrl]);

  const addTodo = async (newTodo) => {
    //payload is new data being sent
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            Completed: newTodo.isCompleted ?? false,
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
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }

      const data = await resp.json();
      const { records } = data;

      dispatch({
        type: todoActions.addTodo,
        records,
      });
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error,
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const updateTodo = async (editedTodo) => {
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
      await fetch(encodeUrl(), options);
    } catch (error) {
      dispatch({
        type: todoActions.updateTodo,
        editedTodo,
        error,
      });
      return;
    }
    dispatch({
      type: todoActions.updateTodo,
      editedTodo,
    });
  };

  const completeTodo = async (todoId) => {
    try {
      dispatch({ type: todoActions.completeTodo, id: todoId });

      const payload = {
        records: [
          {
            id: todoId,
            fields: { isCompleted: true },
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

      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }
    } catch (error) {
      dispatch({ type: todoActions.revertTodo, id: todoId, error });
    }
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routes>
          <TodosPage
            addTodo={addTodo}
            todoState={todoState}
            updateTodo={updateTodo}
            completeTodo={completeTodo}
            sortField={sortField}
            setSortField={setSortField}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            queryString={queryString}
            setQueryString={setQueryString}
            dispatch={dispatch}
            todoActions={todoActions}
          />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
