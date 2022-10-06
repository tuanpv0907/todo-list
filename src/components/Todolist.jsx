import React, { useState } from "react";
import "../App.css";

const Todolist = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      const editTodo = todos.find((i) => i.id === edit);
      const updateTodo = todos.map((t) =>
        t.id === editTodo.id ? (t = { id: t.id, todo }) : { id: t.id, todo: t.todo }
      );

      setTodos(updateTodo);
      setEdit(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEdit(id);
  };

  return (
    <div className="container">
      <h2>Simple Todo List App</h2>
      <form className="todoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your todo..."
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button type="submit" className="btn btn-add">
          {edit ? "Save" : "Add"}
        </button>
      </form>
      <ul className="list-item">
        {todos.map((t) => (
          <li className="item" key={t.id}>
            <span className="item-title">{t.todo}</span>
            <div>
              <button className="btn-edit" onClick={() => handleEdit(t.id)}>
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button className="btn-delete" onClick={() => handleDelete(t.id)}>
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
