//acting as child of app.jsx
//handles user input
import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  function handleAddTodo(event) {
    event.preventDefault(); //prevents form from submitting and refreshing the page
    const title = event.target.title.value;
    //console.log(title); //to make sure it is working

    onAddTodo(title);
    event.target.title.value = ''; //clears the input
    todoTitleInput.current.focus(); //this makes the mouse go back to the box after an item is added
  }

  const todoTitleInput = useRef('');

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input id="todoTitle" type="text" name="title" ref={todoTitleInput} />
      <button>Add Todo</button>
    </form>
  );
}

export default TodoForm;
