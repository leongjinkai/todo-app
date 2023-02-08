import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"

export default function Todo({todo, todos, setTodos, deleteTodo}) {
    const [click, setClick] = useState(false)
    const [showInputEl, setShowInputEl] = useState(false)

    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        })
    }

    // Update todo from firebase
    const updateTodo = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            text: todo.text
        })
    }

    const handleDoubleClick =() => {
        setShowInputEl(true)
    }

    const handleMoreInfo = () => {
        setClick(!click)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between bg-white py-3 md:px-5 px-3 m-2 rounded-xl w-[80vw] max-w-lg shadow-lg mx-auto">
                <div className="flex items-center text-xs md:text-base">
                    <span className="break-words overflow-y-auto" style={{textDecoration: todo.completed ? "line-through" : ""}}>
                        {showInputEl ? (
                            <input
                                type='text' 
                                value={todo.text} 
                                onChange= {(e)=> {
                                    const newTodoList = [...todos]
                                    todo.text = e.target.value
                                    setTodos(newTodoList)
                                }}
                                onBlur={() => {
                                    updateTodo(todo)
                                    setShowInputEl(false)}}
                                onKeyDown={(e) => {e.key === 'Enter' ? (updateTodo(todo), setShowInputEl(false)) : ""}}
                                />) : (
                            <span 
                                onDoubleClick={handleDoubleClick}>
                                {todo.text}
                            </span>)}
                    </span>
                </div>
                <div className="flex md:justify-between items-center justify-end">
                    <button onClick={handleMoreInfo} className="grow bg-black hover:bg-slate-600 text-white p-0 rounded-3xl mx-0 md:w-10 md:h-10 w-7 h-7 text-xs md:text-2xl">&#9432;</button>
                    <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 hover:bg-red-300 rounded-3xl mx-1 text-white md:w-10 md:h-10 w-7 h-7 p-0">X</button>
                    {todo.completed ? 
                        (
                            <button onClick={() => {toggleComplete(todo)}} className="grow bg-yellow-500 hover:bg-yellow-300 p-0 rounded-3xl mx-0 md:w-10 md:h-10 text-xs md:text-2xl w-7 h-7">
                            &#9100;
                            </button>
                        ) : (
                            <button onClick={() => {toggleComplete(todo)}} className="grow bg-green-500 hover:bg-green-300 p-0 rounded-full mx-0 text-xs md:w-10 md:h-10 md:text-lg w-7 h-7">
                            &#10004;
                            </button>
                        )
                    }
                </div>
            </div>
            {
                click && 
                    (
                        <div className=" bg-slate-500 text-white py-3 px-3 md:px-5 mt-0 mb-2 rounded-xl w-[80vw] max-w-lg shadow-lg mx-auto text-xs md:text-lg">
                            More information on the task
                        </div>
                    )
            }
        </div>
    )
}