//displays the list
//acting child, but parent of the todolistitem
import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  return (
    //passing the child component through the parent component
    //TodoList is the parent component
    //TodoListItem is the child component
    <ul>
      {todoList.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
