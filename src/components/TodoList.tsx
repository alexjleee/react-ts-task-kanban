import React from 'react';
import '../styles/style.scss';
import TodoItem from './TodoItem';
import { Todo } from '../models/todo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
  return (
    <div className='kanban'>
      <div className='column'>
        <h3>Inbox</h3>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className='column'>
      <h3>In Progress</h3>
      {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className='column'>
      <h3>Completed</h3>
      {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
