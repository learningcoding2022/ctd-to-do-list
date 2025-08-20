//displays the list
//acting child, but parent of the todolistitem
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return (
    <>
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : filteredTodoList.length > 0 ? (
        <ul>
          {filteredTodoList.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            );
          })}
        </ul>
      ) : (
        <p>Add todo above to get started</p>
      )}
    </>
  );
}

export default TodoList;
