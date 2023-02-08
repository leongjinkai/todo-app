export default function Addtodo({setValue, setDesc, setDeadline, setPriority, createToDo, showAddTodo, setShowAddTodo}) {
    const handleExit = () => {
        setShowAddTodo(false)
    }    
    
    if (showAddTodo) {
            return (
        <div className="text-lg font-mono block:flex flex-col gap-3 fixed text-white bg-[#c60f7b] top-[50%] rounded-xl left-[50%] w-72 h-100 translate-x-[-50%] translate-y-[-50%] p-5 shadow-md shadow-black">
            <button onClick={handleExit} className="hover:text-[#ff57b9] hover:bg-black fixed top-[7%] left-[88%] translate-x-[-50%] translate-y-[-20%] z-10 border-2 border-white rounded-full w-8 h-7 pb-7">X</button>
            <p className="mx-auto mb-4 text-xl">New Task</p>
            <div>
                <form onSubmit={createToDo} className="flex flex-col gap-1 " action="#">
                    <label className="text-sm" htmlFor="">Title</label>
                    <input onChange={(e) => {setValue(e.target.value)}} className="text-black font-mono rounded-lg px-1" type="text" placeholder="Coding?"/>
                    <label className="text-sm" htmlFor="">Description</label>
                    <input onChange={(e) => {setDesc(e.target.value)}} className="text-black font-mono rounded-lg px-1" type="text" placeholder="Google Stackoverflow"/>
                    <label className="text-sm" htmlFor="">Deadline</label>
                    <input onChange={(e) => {setDeadline(e.target.value)}} className="text-black font-mono rounded-lg px-1" type="date"/>
                    <label className="text-sm" htmlFor="">Priority</label>
                    <select onChange={(e) => {setPriority(e.target.value)}}  className="text-black h-8 font-mono rounded-lg px-1" name='priority' id='priority'>
                        <option value="doitnow">NOW</option>
                        <option value="important">Important</option>
                        <option value="smol">Meh</option>
                    </select>
                    <button className='mt-5 bg-cyan-500 w-[50%] mx-auto text-black shadow-md shadow-black p-2 rounded-lg hover:bg-cyan-300' type="submit">Add Task</button>
                </form>
            </div>
        </div>
            )
    }
}