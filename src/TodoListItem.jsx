const TodoListItem = ({ todo }) => {
  return (
    <li>
      <div>
        <h2>{todo.title}</h2>
      </div>
    </li>
  );
};

export default TodoListItem;
