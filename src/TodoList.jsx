import TodoListItem from './TodoListItem';

function TodoList() {
  const todos = [
    { id: 1, title: 'review resources' },
    { id: 2, title: 'take notes' },
    { id: 3, title: 'code out app' },
  ];
  return (
    //passing the child component through the parent component
    //TodoList is the parent component
    //TodoListItem is the child component
    <ul>
      {todos.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
