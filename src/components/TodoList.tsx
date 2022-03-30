import React from 'react';
import '../styles/style.scss';
import TodoItem from './TodoItem';
import { Todo } from '../models/todo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
  // return (
  //   <div className='todo_list'>
  //     {todos.map((todo) =>
  //       <TodoItem todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>
  //     )}
  //   </div>
  // )
  return (
    <div className='container'>
      <div className='todos inbox'>
        <span className='todos__heading'>Inbox</span>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className='todos in_progress'>
      <span className='todos__heading'>In Progress</span>
      {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className='todos completed'>
      <span className='todos__heading'>Completed</span>
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
