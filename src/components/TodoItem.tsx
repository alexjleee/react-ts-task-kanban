import React, { useState, useRef, useEffect } from 'react';
import '../styles/style.scss';
import { Todo } from '../models/todo';
import { FiX } from 'react-icons/fi';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

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
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleClickToEdit = () => {
    if (!edit && !todo.isDone) {
      setEdit(!edit);
    }
  };

  return (
    <form className='edit-form' onSubmit={(e) => handleEdit(e, todo.id)}>
      <input
        type='checkbox'
        className='invisiblechekbox'
        checked={todo.isDone}
        onChange={() => handleDone(todo.id)}
      />
      <span className='checkmark'></span>
      {edit ? (
        <input
          type='text'
          className='cteinput'
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          onBlur={(e) => handleEdit(e, todo.id)}
        />
      ) : (
        <span
          className={'ctetext' + todo.isDone ? ' -completed' : ''}
          onClick={handleClickToEdit}
        >
          {todo.todo}
        </span>
      )}
      <button
        type='button'
        className='deletebtn'
        onClick={() => handleDelete(todo.id)}
      >
        <FiX />
      </button>
    </form>
  );
};

export default TodoItem;