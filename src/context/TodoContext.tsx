import {ReactNode, createContext , useContext, useRef, useState} from 'react';

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoContext = {
    todo: Todo[];
    handleAddTodo: (task: string) => void;
    handleAllClear: () => void;
    toggleTodoComplete: (todoId: string) => void;
    handleDelete: (todoId: string) => void;
    handleTheme: (theme:boolean) => void;
    handleDragStart: (index: number) => void;
    handleDragEnter: ( index: number) => void;
    handleDragEnd: () => void;
}

export type TodoProviderProps = {
    children: ReactNode;
}


export const todoContext = createContext<TodoContext | null>(null);


export const Todoprovider = ({children} : TodoProviderProps) => {

    const [todo, setTodo] = useState<Todo[]>(() => {
        try{
            const newTodo = localStorage.getItem("todo") || "[]" ;
            return JSON.parse(newTodo) as Todo[];
        }catch(error) {
            return []
        }
    })

    const dragItem = useRef<number | null>(null)
    const dragOverItem = useRef<number | null>(null)
   
    const handleAddTodo = (task:string) => {
        const validation = document.getElementById("text-error") as HTMLParagraphElement;
        if(task.length){
            setTodo(prev => {
                const newTodo:Todo[] = [
                    {
                        id: Math.random().toString(),
                        task: task,
                        completed: false,
                        createdAt: new Date()
                    },
                    ...prev
                ]
                validation.innerHTML = "";
                localStorage.setItem("todo", JSON.stringify(newTodo));
                return newTodo
            })
        }else {
            validation.innerHTML = "Please enter a task........";
        }
      
    }

    const handleAllClear = () =>  {
        setTodo(todo.filter(todo => !todo.completed))
        localStorage.setItem("todo", JSON.stringify(todo.filter(todo => !todo.completed)));
    }

    const toggleTodoComplete = (todoId:string) => {
        setTodo((prev) => {
            const newTodo = prev.map(todo => {
                if(todo.id === todoId) {
                   return {...todo , completed: !todo.completed} 
                }
                return todo;
            })
            localStorage.setItem("todo", JSON.stringify(newTodo));
            return newTodo
        })
    }

    const handleDelete = (todoId:string) => {
        setTodo(todo.filter(todo=> todo.id !== todoId))
        localStorage.setItem("todo", JSON.stringify(todo.filter(todo=> todo.id !== todoId)));
    }

    const setDarkMode = ():void => {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    }

    const setLightMode = ():void => {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }

    const handleTheme = (theme:boolean) => {
        theme ? setLightMode() : setDarkMode()
    }

    const handleDragStart = (index: number) => {
        console.log("start",index)
        dragItem.current = index;
    }

    const handleDragEnter = (index: number) => {
        console.log("enter",index)
        dragOverItem.current = index;
    }

    const handleDragEnd = () => {
    //    const drag = [...todo];
    //    const draggedItemContent = drag.splice(dragItem.current, 1 )[0]
    //    drag.splice(dragOverItem.current, 0, draggedItemContent);
    //    dragItem.current = null;
    //    dragOverItem.current = null;
    //    setTodo(drag)
    //    localStorage.setItem("todo", JSON.stringify(drag));

    if (dragItem.current !== null && dragOverItem.current !== null) {
        const draggedItemContent = todo[dragItem.current];
        const newTodo = [...todo];
        newTodo.splice(dragItem.current, 1); //removing
        newTodo.splice(dragOverItem.current, 0, draggedItemContent); //adding
  
        setTodo(newTodo);
        localStorage.setItem("todo", JSON.stringify(newTodo));
    }
}



    return(
        <todoContext.Provider value={{todo, handleAddTodo ,handleAllClear , toggleTodoComplete, handleDelete, handleTheme, handleDragStart, handleDragEnter, handleDragEnd}}>
            {children}
        </todoContext.Provider>
    )

}

export const useTodo = () => {
    const todoConsumer = useContext(todoContext)
    if(!todoConsumer){
        throw new Error("useTodo used outside of Provider")
    }
    return todoConsumer
}



