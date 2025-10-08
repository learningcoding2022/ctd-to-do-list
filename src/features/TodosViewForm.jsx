import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`;

const StyledSelect = styled.select`
  width: 60%;
  background-color: teal;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  color: white;
  background-color: #05445e;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  function preventRefresh(e) {
    e.preventDefault();
  }

  return (
    <StyledForm onSubmit={preventRefresh}>
      <StyledDiv>
        <label htmlFor="query">Search todos:</label>
        <input
          id="query"
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </StyledDiv>

      <label htmlFor="sortField">Sort by</label>
      <StyledSelect
        id="sortField"
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="createdTime">Time added</option>
      </StyledSelect>

      <label htmlFor="sortDirection">Direction</label>
      <StyledSelect
        id="sortDirection"
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </StyledSelect>
    </StyledForm>
  );
}

export default TodosViewForm;
