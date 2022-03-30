import React from 'react';
import '../styles/style.scss';
import { FiPlus } from 'react-icons/fi';


interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form className='add-form' onSubmit={handleAdd}>
      <input
        className='contentinput'
        type='text'
        placeholder='Add a task'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className='submitbtn'><FiPlus /></button>
    </form>
  );
};

export default InputField;
