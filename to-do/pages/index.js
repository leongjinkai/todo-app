export default function Home() {
  return (
    <div>
      <div className="my-5 text-xl text-center">
        <p>Try out my Todo App by clicking on the Join Now Button Above!</p>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <p className="text-xl mb-5 font-mono font-bold bg-[#c60f7b] p-2 rounded-xl text-white w-[80vw]">Keep a lookout for these upcoming features</p>
        <ul className="flex flex-col gap-4">
          <li>Drag and Drop</li>
          <li>Additional Information to be added into the task</li>
          <li>Grouping of tasks into projects</li>
          <li></li>
        </ul>
      </div>
    </div>
    
  )
}