import styled from 'styled-components';

const StyledLabel = styled.label`
  padding: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  background-color: #f2e4cf;
  border-radius: 0.5rem;
`;

function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  return (
    <>
      <StyledLabel htmlFor={elementId}>{labelText}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      ></StyledInput>
    </>
  );
}

export default TextInputWithLabel;
