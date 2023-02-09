export default function Home() {
  return (
    <div>
      <div className="my-10 text-2xl text-center font-mono font-bold">
        <p>Try out my Todo App by clicking on the Join Now Button Above!</p>
      </div>
      <div className="flex items-start gap-10 relative">
        <div className="flex flex-col justify-center items-center text-center relative top-0">
          <p className="text-xl mb-5 font-mono font-bold bg-[#c60f7b] rounded-xl text-white w-[30vw] h-20  flex items-center justify-center">Current features</p>
          <ul className="flex flex-col gap-4 text-white font-mono w-full text-left">
            <li>Drag and Drop to reorder Todos</li>
            <li>Add in additional information for tasks</li>
            <li>CRUD Todos</li>
            <li>Persist between sessions through Firestore</li>
            <li>Google SSO Login Authentication</li>
            <li>Mobile Responsive Layout</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-xl mb-5 font-mono font-bold bg-[#c60f7b] p-2 rounded-xl text-white w-[30vw] h-20 relative flex items-center">Keep a lookout for these upcoming features</p>
          <ul className="flex flex-col gap-4 font-mono w-full text-white text-left">
            <li>Individual Profile Page</li>
            <li>Dark Mode</li>
            <li>New Todo layout - Sideway carousell</li>
            <li>Animation</li>
            <li>Custom Logo</li>
          </ul>
        </div>
      </div>
    </div>
    
  )
}