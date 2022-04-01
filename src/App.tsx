import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './styles/style.scss';
import { Todo } from './models/todo';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, {id: nanoid(), todo, isDone: false}]);
      setTodo('');
    }
  }

  return (
    <div className='u-container -m0'>
      <h1>Task Kanban</h1>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
