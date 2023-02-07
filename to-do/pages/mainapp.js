import Head from 'next/head'
import { useState, useEffect } from 'react'
import Todo from '../components/todo'
import { db } from '@/firebase'
import { where, query, doc, collection, onSnapshot, addDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import { auth } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'

export default function Mainapp() {
	const [user, loading] = useAuthState(auth);
	const route = useRouter()

	const [todos, setTodos] = useState([])

	const [showInputEl, setShowInputEl] = useState(false)
  const [value, setValue] = useState("")


  // Route user to login page if not logged in
	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log(`${user.displayName}'s todolist is shown`)

		} else {
      route.push('/auth/login')
      console.log(`redirected to login`)
    }
	  });	

	// Read todo from firebase
  // useEffect to synchronise with an external system

  useEffect(() => {
    // Add userprofile
    const addUserProfile = async () => {
      
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef)
      const doesDocExist = docSnap.exists();
      
      console.log(`Document exist: ${doesDocExist}`)
      
      if (!doesDocExist) {
        await setDoc(doc(db, 'users', user.uid), {
          firstname: user.displayName,
          lastname: "",
          userid: user.uid,
          title: "",
          desc: "",
          company: ""
        })
        console.log(`Profile created for ${user.displayName}`)
      } else {
        console.log(`User profile already exists`)
      }
    }

    // Show the todo list

		const unsubscribe = () => {
      const q = query(collection(db, 'todos'), where("userid", "==", user.uid))
      onSnapshot(q, (querySnapshot) => {
			let todosArr = []
			querySnapshot.forEach((doc) => {
				todosArr.push({...doc.data(), id: doc.id})
			})
			setTodos(todosArr)
		})}

		return () => {unsubscribe, addUserProfile}
		}, [])
	
	if (loading) return <h1>Loading...</h1>

  // Create todo

  const createToDo = async (e) => {
    e.preventDefault(e)

    await addDoc(collection(db, 'todos'), {
      text: value,
      completed: false,
			userid: user.uid
    })
    setValue("")
  }

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
        <div className='bg-gradient-to-br from-cyan-500 to-blue-500 flex flex-col justify-center min-h-screen w-screen'>
          {/* header */}
          <div className='mx-auto font-mono text-2xl m-5 pt-12'>
            <p className='font-bold text-center text-7xl'>JinKai's</p><p className='text-center mt-2'>To-do App</p>
          </div>

          {/* Form input to add To-do */}
          <div className='mx-auto my-3'>
            <form onSubmit={createToDo} className='flex flex-col items-center gap-3'>
              <input className='placeholder:font-mono placeholder:text-center p-2 mb-2 text-center' required type="text" placeholder='Add task here' value={value} onChange={(e) => setValue(e.target.value)}/>
              <button className='bg-cyan-800 hover:bg-cyan-500 text-white p-3 rounded-lg font-mono mb-3' type='submit'>Submit</button>
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

export function getAllUserNames() {
  const userArr = []
  const finalArr = []
  // Attempt to unnest the nested document object
  const userq = query(collection(db, 'users'))
  const user_unsubscribe = onSnapshot(userq, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      userArr.push({id: doc.id})
    })
  })

  user_unsubscribe()

  userArr.forEach((user) => {
    finalArr.push({params: user})
  })
  return finalArr 
}

export function getUserData (id) {
  return {id}
}