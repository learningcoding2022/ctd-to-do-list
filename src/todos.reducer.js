//todos.reduces/js

const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
};

const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    error: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      return {
        ...state,
        todoList: action.records.map(function(record) {
            return {
                id: record.id,
                title: record.fields.title,
                completed: record.fields.isCompleted,
            };
        }),
        isLoading: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        error: action.error.message,
        isLoading: false,
      }
    case actions.startRequest:
        return {
        ...state,
        isSaving: true,
        }
    case actions.addTodo: {
        const { id, fields } = action.records[0];
        const savedTodo = { id, ...fields };
      if (!fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,

        todoList: [...state.todoList, savedTodo],
        isSaving: false,
        };
    }
    case actions.endRequest:
        return {
        ...state,
        isLoading: false,
        isSaving: false,
        }
    case actions.revertTodo: 
    case actions.updateTodo: {
        const updatedTodos = state.todoList.map(function(todo) {
            if (todo.id === action.editedTodo.id) {
                if (action.error) {
                return {...action.editedTodo, errorMessage: action.error.message};
                }
            return action.editedTodo;
        }
        return todo;
        });

        const updatedState = {
        ...state,
        todoList: updatedTodos,
        };

        return updatedState;
        }

    case actions.completeTodo: {
        const updatedTodos = state.todoList.map(function(todo) {
        if (todo.id === action.id) {
            return { ...todo, isCompleted: true };
        } else {
            return todo;
        }
        });

        const updatedState = {
            ...state,
            todoList: updatedTodos, 
        };

        return updatedState;
    }
  
    case actions.clearError:
        return {
        ...state,
        error: '',
        }
    default: return state;
    }
};

export { initialState, actions, reducer };

