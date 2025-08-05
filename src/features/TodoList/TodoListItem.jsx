import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

//acting as child of todolist
const TodoListItem = ({ todo, onCompleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  return (
    <li>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => {
                  onCompleteTodo(todo.id);
                }}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
};

export default TodoListItem;
