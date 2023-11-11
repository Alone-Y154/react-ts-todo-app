import cross from "../assets/icon-cross.svg";
import checkbox from "../assets/icon-check.svg";
import { useTodo } from "../context/TodoContext";
import { useSearchParams } from "react-router-dom";
// import React, { useState } from 'react';

const TodoList = () => {

  const {todo , handleAllClear , toggleTodoComplete , handleDelete} = useTodo();

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
  return (
    <div className="flex mb-4 overflow-hidden rounded-[5px] shadow-[0px_35px_50px_-15px_rgba(194,195,214,0.50)] w-[327px] flex-col justify-center items-center">
      {todoList.map(todo => {
        return(
<div className="checkbox-wrapper-15 todo-list-checkbox flex border-solid border-b border-[#E3E4F1] px-5 justify-between bg-white items-center min-h-fit h-12 w-[327px]">
        <div className="flex gap-3">
          <input checked={todo.completed} onChange={() => toggleTodoComplete(todo.id)} className="inp-cbx hidden" id={todo.id} type="checkbox" />
          <label className="cbx items-center" htmlFor={todo.id}>
            <span>
              <img src={checkbox} alt="check"/>
            </span>
            <span className="text-[#494C6B] font-normal tracking-[-0.167px]">{todo.task}</span>
          </label>
        </div>
        {todo.completed && 
        <img src={cross} onClick={()=>handleDelete(todo.id)} alt="cross"/>
        }
        
      </div>
        )
      })}
      

      <div className="flex text-xs text-[#9495A5] font-normal leading-normal tracking-[-0.167px] px-5 justify-between bg-white items-center h-12 w-[327px]">
        <p>{todo.filter(too => !too.completed).length} items left</p>
        <p onClick={handleClear}>Clear Completed</p>
      </div>
    </div>
  );
};

export default TodoList;
