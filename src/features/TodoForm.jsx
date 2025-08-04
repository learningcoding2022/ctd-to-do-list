//acting as child of app.jsx
//handles user input
import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

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
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      ></TextInputWithLabel>
      <button disabled={workingTodoTitle.trim() === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
