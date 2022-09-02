import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoForm, TodoItem } from "./components";
import { getTodos } from "./redux/actions/todoActions";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todos);
  const [parent] = useAutoAnimate();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <main className="main">
      <div className="todo-list">
        <TodoForm />
        <div ref={parent}>
          {data ? (
            data.todos.map((item, i) => (
              <div key={i} classNames="item">
                <TodoItem data={item} />
              </div>
            ))
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
