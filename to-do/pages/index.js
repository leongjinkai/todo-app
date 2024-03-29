export default function Home() {
  return (
    <div className="mx-10">
      <div className="md:my-10 md:text-2xl text-center font-mono font-bold mt-20 text-xl">
        <p>Try out my Todo App by clicking on the Join Now Button Above!</p>
      </div>
      <div className="flex items-start md:gap-10 gap-2 relative mt-5">
        <div className="flex flex-col justify-center items-center text-center relative top-0">
          <p className="md:text-xl text-lg mb-5 font-mono font-bold bg-[#c60f7b] rounded-xl text-white w-[30vw] h-20  flex items-center justify-center">
            Current features
          </p>
          <ul className="flex flex-col gap-4 text-white font-mono w-full text-left text-sm md:text-base">
            <li>Drag and Drop to reorder Todos</li>
            <li>Add in additional information for tasks</li>
            <li>CRUD Todos</li>
            <li>Persist between sessions through Firestore</li>
            <li>Google SSO Login Authentication</li>
            <li>Mobile Responsive Layout</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <p className="md:text-xl text-lg mb-5 font-mono font-bold bg-[#c60f7b] p-2 rounded-xl text-white w-[30vw] h-20 relative flex items-center justify-center">
            Upcoming features
          </p>
          <ul className="flex flex-col gap-4 font-mono w-full text-white text-left text-sm md:text-base">
            <li>Individual Profile Page</li>
            <li>Dark Mode</li>
            <li>New Todo layout - Sideway carousell</li>
            <li>Animation</li>
            <li>Custom Logo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
