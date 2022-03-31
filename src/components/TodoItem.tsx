import React, { useState, useRef, useEffect } from 'react';
import '../styles/style.scss';
import { Todo } from '../models/todo';
import { FiX } from 'react-icons/fi';
import { BsFillCheckSquareFill, BsSquare } from 'react-icons/bs';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
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
        className='customcheckbox'
        checked={todo.isDone}
        onChange={() => handleDone(todo.id)}
      />
      <span className='checkmark' onClick={() => handleDone(todo.id)}>
        {todo.isDone ? <BsFillCheckSquareFill /> : <BsSquare />}
      </span>
      {edit ? (
        <textarea
          className='ctetextarea'
          ref={textareaRef}
          onChange={(e) => {
            e.target.style.height = e.target.scrollHeight + 'px';
            setEditTodo(e.target.value);
          }}
          onBlur={(e) => handleEdit(e, todo.id)}
          value={editTodo}
        >
        </textarea>
      ) : (
        <span
          className={`ctetext${todo.isDone ? ' -completed' : ''}`}
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
