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
    <div className="mb-4">
        <div className="flex w-[327px] md:w-[540px] md:h-16 h-12 rounded-[5px] bg-white dark:bg-[#25273D] dark:shadow-[0px_35px_50px_-15px_rgba(0, 0, 0, 0.50)] shadow-[0px_35px_50px_-15px_rgba(194,195,214,0.50)]">
            <form onSubmit = {handleSubmit} className="flex  w-[327px] md:w-[540px] justify-center md:justify-between items-center gap-4 mx-5">
                <div className="checkbox-wrapper-15">
                    <input className="inp-cbx hidden" id="cbx-15" type="checkbox" />
                    <label className="cbx md:gap-5 md:flex" htmlFor="cbx-15">
                    <span className=""><img src={checkbox} /></span>
                    <span> <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" className="outline-none md:w-[350px] md:text-lg text-xs dark:bg-[#25273D] dark:placeholder:text-[#767992] dark:text-[#C8CBE7] border-none" placeholder="create a new Todo" /></span>
                    </label>
                </div> 
                <button className="ml-10 text-[#494C6B] dark:text-[#C8CBE7]" type="submit">Add</button>      
            </form>
        </div> 
        <p id="text-error" className="text-[#ff6347]"></p> 
    </div>
  );
};

export default AddTodo;
