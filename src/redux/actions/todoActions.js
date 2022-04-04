import axios from "axios";
import { ADD_TODO, GET_TODOS, UPDATE_TODO, REMOVE_TODO } from "../types";

export const getTodos = () => async (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/todos`)
    .then((res) => {
      dispatch({
        type: GET_TODOS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addTodo = (data) => async (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/todos`, { data: { ...data } })
    .then((res) => {
      dispatch({
        type: ADD_TODO,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTodo = (status, id) => async (dispatch) => {
  axios
    .put(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
      data: {
        status: status,
      },
    })
    .then((res) => {
      dispatch({
        type: UPDATE_TODO,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeTodo = (id) => async (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}/todos/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_TODO,
        payload: id,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
