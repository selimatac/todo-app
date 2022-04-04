import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";

const TodoForm = () => {
  const dispatch = useDispatch();

  const [todoName, setTodoName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ name: todoName, status: false }));
    setTodoName("");
  };
  return (
    <header className="todo-list__form">
      <h1 className="todo-list__form-title">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-list__form-input"
          required
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button className="todo-list__form-button">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2"
            aria-hidden="true"
          >
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          Add
        </button>
      </form>
    </header>
  );
};

export default TodoForm;
