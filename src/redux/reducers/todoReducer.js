import { GET_TODOS, ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../types";

const initialState = {
  todos: [],
  loading: true,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: [...action.payload.data],
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { ...action.payload }],
        loading: false,
      };
    case UPDATE_TODO:
      let t = state.todos;
      t.find((x) => x.id === action.payload.id).attributes.status = action.payload.attributes.status;
      return {
        ...state,
        todos: [...t],
        loading: false,
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: [...state.todos.filter((x) => x.id !== action.payload)],
        loading: false,
      };
    default:
      return state;
  }
};

export default todoReducer;
