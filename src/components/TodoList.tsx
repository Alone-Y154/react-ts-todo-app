import cross from "../assets/icon-cross.svg";
import checkbox from "../assets/icon-check.svg";
import { useTodo } from "../context/TodoContext";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
// import React, { useState } from 'react';

const TodoList = () => {

  const {todo , handleAllClear , toggleTodoComplete , handleDelete, handleDragStart, handleDragEnter, handleDragEnd } = useTodo();

  let todoList = todo;

  const [searchParams] = useSearchParams();

  const todoData = searchParams.get("todo");

  if(todoData === "active"){
    todoList = todoList.filter(todo => !todo.completed)
  }
  if(todoData === "completed"){
    todoList = todoList.filter(todo => todo.completed)
  }
  const handleClear = () => {
    handleAllClear();
  }

  const [all,setAll] = useState<boolean>(true);
  const [active,setActive] = useState<boolean>(false);
  const [completed,setCompleted] = useState<boolean>(false);

  const handleStatus = (status:string):void => {
      setAll(status==="all")
      setActive(status==="active")
      setCompleted(status==="completed")
  }
  return (
    <div className="flex mb-4 overflow-hidden rounded-[5px] shadow-[0px_35px_50px_-15px_rgba(0, 0, 0, 0.50)] w-[327px] md:w-[540px] flex-col justify-center items-center">
      {todoList.map((todo,index) => {
        return(
<div draggable onDragOver={(e) => e.preventDefault()} onDragStart={()=>handleDragStart(index)} onDragEnter={()=>handleDragEnter(index)} onDragEnd={()=>handleDragEnd()} className="checkbox-wrapper-15  todo-list-checkbox flex border-solid border-b border-[#E3E4F1] dark:border-[#393A4B] px-5 justify-between bg-white dark:bg-[#25273D] items-center min-h-fit h-12 md:h-16 md:w-[540px] w-[327px]">
        <div className="flex gap-3">
          <input checked={todo.completed} onChange={() => toggleTodoComplete(todo.id)} className="inp-cbx hidden" id={todo.id} type="checkbox" />
          <label className="cbx items-center md:gap-5 md:flex" htmlFor={todo.id}>
            <span>
              <img src={checkbox} alt="check"/>
            </span>
            <span className="text-[#494C6B] dark:text-[#C8CBE7] font-normal tracking-[-0.167px] md:text-lg text-xs">{todo.task}</span>
          </label>
        </div>
        {todo.completed && 
        <img className="cursor-pointer" src={cross} onClick={()=>handleDelete(todo.id)} alt="cross"/>
        }
        
      </div>
        )
      })}

      <div className="flex text-xs md:h-16 text-[#9495A5] dark:text-[#5B5E7E] font-normal leading-normal tracking-[-0.167px] px-5 justify-between dark:bg-[#25273D] bg-white items-center h-12 md:w-[540px] w-[327px]">
        <p className="md:text-sm text-xs">{todo.filter(too => !too.completed).length} items left</p>
        <div className="md:flex hidden dark:text-[#5B5E7E] gap-5 dark:bg-[#25273D] flex-row text-[#9495A5] text-sm font-bold leading-normal tracking-[-0.194px] rounded-[5px] ">
            <Link onClick={() => handleStatus("all")} className={`dark:hover:text-[#E3E4F1] hover:text-[#494C6B] cursor-pointer ${all ?"text-[#3A7CFD]" : ""}`} to="/">All</Link>
            <Link onClick={() => handleStatus("active")}  className={`dark:hover:text-[#E3E4F1] hover:text-[#494C6B] cursor-pointer ${active ?"text-[#3A7CFD]" : ""}`}  to="/?todo=active">Active</Link>
            <Link onClick={() => handleStatus("completed")}  className={`dark:hover:text-[#E3E4F1] hover:text-[#494C6B] cursor-pointer ${completed ?"text-[#3A7CFD]" : ""}`}  to="/?todo=completed">Completed</Link>
        </div>
        <p className="md:text-sm text-xs cursor-pointer dark:hover:text-[#E3E4F1] hover:text-[#494C6B]" onClick={handleClear}>Clear Completed</p>
      </div>
    </div>
  );
};

export default TodoList;
