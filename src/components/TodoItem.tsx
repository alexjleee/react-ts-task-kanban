import React, { useState, useRef, useEffect } from 'react';
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
    setTodos(todos.map((todo) => (todo.id === id) ? {...todo, todo: editTodo} : todo))
    setEdit(false);
  }

  return (
    <form className='edit-form' onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input type='text' className='textinput' ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)}/>
      ) : todo.isDone ? (
        <s className='textcontent -completed'>{todo.todo}</s>
      ) : (
        <span className='textcontent'>{todo.todo}</span>
      )}
      <div>
        <span className='iconbtn' onClick={() => handleDone(todo.id)}>
          <FiCheckSquare />
        </span>
        <span
          className='iconbtn'
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <FiEdit />
        </span>
        <span className='iconbtn' onClick={() => handleDelete(todo.id)}>
          <FiTrash2 />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;
