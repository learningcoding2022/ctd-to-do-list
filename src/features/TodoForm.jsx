//acting as child of app.jsx
//handles user input
import { useRef } from 'react';
import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault(); //prevents form from submitting and refreshing the page
    //console.log(title); //to make sure it is working

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    //clears the input
    todoTitleInput.current.focus(); //this makes the mouse go back to the box after an item is added
  }

  const todoTitleInput = useRef('');

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        id="todoTitle"
        type="text"
        name="title"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      <button disabled={workingTodoTitle.trim() === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
