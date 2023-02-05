import Head from 'next/head'
import { useState, useEffect } from 'react'
import Todo from '../components/todo'
import { db } from '@/firebase'
import { query, doc, collection, onSnapshot, addDoc, deleteDoc } from 'firebase/firestore'


export default function Home() {
  const [todos, setTodos] = useState([])

  const [showInputEl, setShowInputEl] = useState(false)
  const [value, setValue] = useState("")

  // Create todo

  const createToDo = async (e) => {
    e.preventDefault(e)
    
    await addDoc(collection(db, 'todos'), {
      text: value,
      completed: false
    })
    setValue("")
  }

  // Read todo from firebase
  // useEffect to synchronise with an external system
  useEffect(() => {

  const q = query(collection(db, 'todos'))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = []
    querySnapshot.forEach((doc) => {
      todosArr.push({...doc.data(), id: doc.id})
    })
    console.log(todosArr)
    setTodos(todosArr)
  })
  return () => unsubscribe
  }, [])

  // Delete todo 
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }


  return (
    <>
      <Head>
        <title>To-do App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Background */}
        <div className='bg-gradient-to-br from-cyan-500 to-blue-500 h-[100vh] flex flex-col justify-center'>
          {/* header */}
          <div className='mx-auto font-mono text-2xl m-5'>
            <p className='font-bold text-center text-7xl'>JinKai's</p><p className='text-center mt-2'>To-do App</p>
          </div>

          {/* Form input to add To-do */}
          <div className='mx-auto my-3'>
            <form onSubmit={createToDo} className='flex flex-col items-center gap-3'>
              <input className='placeholder:font-mono placeholder:text-center p-2' required type="text" placeholder='Add task here' value={value} onChange={(e) => setValue(e.target.value)}/>
              <button className='bg-cyan-800 hover:bg-cyan-500 text-white p-3 rounded-lg font-mono' type='submit'>Submit</button>
            </form>
          </div>

          {/* To-do List */}
          {todos.map((todo, index) => (
            <Todo 
              key={index}
              todo={todo}
              index={index}
              todos={todos}
              setTodos={setTodos}
              showInputEl={showInputEl}
              setShowInputEl={setShowInputEl}
              deleteTodo={deleteTodo}
              />
          ))}
          <div>
            {todos.length === 0 ? 
              <div className='text-center font-mono my-2'>
                Hurray!! You have completed all your tasks!<br/>You can add a task above by entering into the text field
              </div>:
              <div className='text-center font-mono text-white my-2'>
                You have {todos.length} tasks!
              </div>
            }
          </div>
        </div>
      </main>
    </>
  )
}

