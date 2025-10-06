import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';
import styles from './App.module.css';
import { useSearchParams } from 'react-router-dom';

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
  const totalPages = Math.ceil(todoState.todoList.length / itemsPerPage);

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

  return (
    <>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />
      <TodoList
        todoList={todoState.todoList}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        isLoading={todoState.isLoading}
        isSaving={todoState.isSaving}
      />
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage}>Previous</button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage}>Next</button>
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
