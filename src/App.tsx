import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:8000";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
    setLoading(false);
  };

  const addTodo = async () => {
    if (text.trim() === "") return;
    const res = await axios.post(`${API}/todos`, { text: text.trim() });
    setTodos([...todos, res.data]);
    setText("");
  };

  const toggleTodo = async (todo: Todo) => {
    const res = await axios.put(`${API}/todos/${todo.id}`, {
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t.id === todo.id ? res.data : t)));
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`${API}/todos/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Todo App</h1>
      <p className="subtitle">powered by FastAPI + React</p>

      <div className="add-todo">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {loading && <p className="empty">Loading...</p>}
        {!loading && filtered.length === 0 && (
          <p className="empty">No todos yet!</p>
        )}
        {filtered.map((todo) => (
          <div
            key={todo.id}
            className={todo.completed ? "todo-item completed" : "todo-item"}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>x</button>
          </div>
        ))}
      </div>

      <p className="count">
        {todos.filter((t) => !t.completed).length} items left
      </p>
    </div>
  );
}
