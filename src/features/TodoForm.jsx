//acting as child of app.jsx
//handles user input
import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledButton = styled.button`
  &:disabled {
    font-style: italic;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault(); //prevents form from submitting and refreshing the page
    //console.log(title); //to make sure it is working
    onAddTodo({
      title: workingTodoTitle,
      isCompleted: false,
    });
    setWorkingTodoTitle('');
    //clears the input
    todoTitleInput.current.focus(); //this makes the mouse go back to the box after an item is added
  }

  const todoTitleInput = useRef('');

  const isButtonDisabled = isSaving || workingTodoTitle.trim() === '';

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      ></TextInputWithLabel>
      <StyledButton disabled={isButtonDisabled}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
