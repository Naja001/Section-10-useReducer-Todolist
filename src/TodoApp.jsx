import { useReducer, useState } from "react";

const initialState = {
  todos: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "remove":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "toggle":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    default:
      throw new Error("Unknown action type");
  }
}

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function addTodo() {
    if (inputValue.trim()) {
      dispatch({ type: "add", payload: inputValue });
      setInputValue("");
    }
  }

  function handleToggleBtn(id) {
    dispatch({ type: "toggle", payload: id });
  }
  function handleRemoveBtn(id) {
    dispatch({ type: "remove", payload: id });
  }
  return (
    <>
      <h1> To Do list</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInput}
        placeholder="Enter a new to-do"
      />
      <button onClick={addTodo}>Add to-do</button>

       <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={() => handleToggleBtn(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleRemoveBtn(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}
