import React, { useState } from 'react';
import '../styles/style.scss';
import { Todo } from '../models/todo';
import { FiEdit, FiCheckSquare, FiTrash2 } from 'react-icons/fi';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (todo.id === id) ? {...todo, todo: editTodo} : todo))
    setEdit(false);
  }

  return (
    <form className='todo__item' onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input type='text' className='todo__item--text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)}/>
      ) : todo.isDone ? (
        <s className='todo__item--text'>{todo.todo}</s>
      ) : (
        <span className='todo__item--text'>{todo.todo}</span>
      )}
      <div>
        <span className='icon' onClick={() => handleDone(todo.id)}>
          <FiCheckSquare />
        </span>
        <span
          className='icon'
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <FiEdit />
        </span>
        <span className='icon' onClick={() => handleDelete(todo.id)}>
          <FiTrash2 />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;
