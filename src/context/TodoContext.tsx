import React, {ReactNode, createContext , useContext, useState} from 'react';

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


    const handleAddTodo = (task:string) => {
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

            localStorage.setItem("todo", JSON.stringify(newTodo));
            return newTodo
        })
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
    return(
        <todoContext.Provider value={{todo, handleAddTodo ,handleAllClear , toggleTodoComplete, handleDelete}}>
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



