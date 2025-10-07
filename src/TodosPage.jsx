import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';
import styles from './App.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function TodosPage({
  addTodo,
  todoState,
  updateTodo,
  completeTodo,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
  dispatch,
  todoActions,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;
  const filteredTodoList = todoState.todoList.filter(
    (todo) => !todo.isCompleted
  );
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const navigate = useNavigate();

  const currentTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  const handlePreviousPage = () => {
    //only page backwards if it is not the first page
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    //only page forward if it is not the last page
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  useEffect(() => {
    if (
      totalPages > 0 &&
      (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages)
    ) {
      navigate('/');
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />
      <TodoList
        todoList={currentTodos}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        isLoading={todoState.isLoading}
        isSaving={todoState.isSaving}
      />
      <div className={styles.paginationControls}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={styles.buttons}
        >
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.buttons}
        >
          Next
        </button>
      </div>
      <hr />
      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      {todoState.errorMessage && (
        <div className={styles.error}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}

export default TodosPage;
