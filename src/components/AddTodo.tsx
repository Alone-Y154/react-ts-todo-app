import {FormEvent, useState } from "react";
import checkbox from "../assets/icon-check.svg";
import { useTodo } from "../context/TodoContext";

const AddTodo = () => {

    const [todo , setTodo] = useState("");

    const {handleAddTodo} = useTodo();

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddTodo(todo);
        setTodo("");
    }
  return (
    <div className="flex w-[327px] mb-4 h-12 rounded-[5px] bg-white shadow-[0px_35px_50px_-15px_rgba(194,195,214,0.50)]">
      <form onSubmit = {handleSubmit} className="flex justify-center items-center gap-4 mx-5">
          <div className="checkbox-wrapper-15">
            <input className="inp-cbx hidden" id="cbx-15" type="checkbox" />
            <label className="cbx" htmlFor="cbx-15">
              <span><img src={checkbox} /></span>
              <span> <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" className="outline-none border-none" placeholder="create a new Todo" /></span>
            </label>
          </div> 
          <button type="submit">Add</button>      
      </form>
    </div>
  );
};

export default AddTodo;
