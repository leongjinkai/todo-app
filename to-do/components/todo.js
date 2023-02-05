import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"

export default function Todo({todo, todos, setTodos, showInputEl, setShowInputEl, deleteTodo}) {
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

    return (
        <div className="flex justify-between bg-white py-3  px-5 m-2 rounded-xl w-[100vw] max-w-lg shadow-lg mx-auto">
            <div className="flex items-center">
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
            <div className="flex justify-between items-center">
                <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 hover:bg-red-300 p-2 rounded-3xl mx-1 text-white w-10 ">X</button>
                {todo.completed ? 
                    (
                        <button onClick={() => {toggleComplete(todo)}} className="grow bg-yellow-500 hover:bg-yellow-300 p-1 rounded-3xl mx-1 w-10 text-2xl">
                        &#9100;
                        </button>
                    ) : (
                        <button onClick={() => {toggleComplete(todo)}} className="grow bg-green-500 hover:bg-green-300 p-2 rounded-3xl mx-1 w-10">
                        &#10004;
                        </button>
                    )
                }
            </div>
            
        </div>
    )
}