import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../redux/actions/todoActions";
import { useDialog } from "../contexts/DialogContext";
import CustomCheckbox from "./CustomCheckbox";
const TodoItem = ({ data }) => {
  const dispatch = useDispatch();
  const { getConfirmation } = useDialog();

  const [todoStatus, setTodoStatus] = useState(data.attributes.status);
  const handleRemove = async () => {
    const confirmed = await getConfirmation({
      title: "Attention!",
      message: `Are u sure remove "${data.attributes.name}" task?`,
    });

    confirmed && dispatch(removeTodo(data.id));
  };
  
  return (
    <div className="todo-list__item">
      <div className="todo-list__item-status">
        <CustomCheckbox
          checked={todoStatus}
          onChange={(e) => {
            setTodoStatus(e.target.checked);
            dispatch(updateTodo(e.target.checked, data.id));
          }}
        />
      </div>
      <div
        className={`todo-list__item-name ${
          data.attributes.status ? "--complated" : ""
        }`}
      >
        {data.attributes.name}
      </div>
      <button
        type="button"
        className="todo-list__item-remove"
        onClick={() => {
          handleRemove();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};
TodoItem.propTypes = {
  data: PropTypes.object,
};
export default TodoItem;
