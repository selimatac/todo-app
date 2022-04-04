import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoForm, TodoItem } from "./components";
import { getTodos } from "./redux/actions/todoActions";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <main className="main">
      <div className="todo-list">
        <TodoForm />
        {data?.todos.map((item, i) => (
          <TodoItem key={i} data={item} />
        ))}
      </div>
    </main>
  );
};

export default App;
