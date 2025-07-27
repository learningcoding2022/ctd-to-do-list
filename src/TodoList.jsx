//displays the list
//acting child, but parent of the todolistitem
import TodoListItem from './TodoListItem';
import { useState } from 'react';

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return (
    <>
      {filteredTodoList.length > 0 ? (
        <ul>
          {filteredTodoList.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onCompleteTodo={onCompleteTodo}
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
