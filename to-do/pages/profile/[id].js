import { auth } from "@/firebase"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

export default function ProfilePage() {
    const router = useRouter()
	const id = router.query.id
	const [user, loading] = useAuthState(auth)

		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(`${user.displayName}'s profile is shown`)
			} else {
				useEffect(() => {
					router.push('/auth/login')
				})
				console.log(`redirected to login`)
			}
		  });	


	const handleSave = () => {
		return
	}
		  
	if (loading) return <h1>Loading...</h1>

	return (
		<div className="bg-white relative flex flex-col w-[80vw] rounded-xl border-white h-[80vh] mx-auto p-0 top-10">
			<div className="bg-cyan-400 basis-1/6 m-4 p-0 rounded-xl">
			</div>
			<div className="basis-5/6 flex bg-red-300 m-4 rounded-xl p-3 justify-center items-center relative">
				<form onSubmit={handleSave} className="flex flex-col gap-3" action="#">
					<div className='flex gap-5 w-[40%]'>
						<div className="flex flex-col">
							<label htmlFor="">First Name</label>
							<input type="text" value={user.displayName.split(" ").slice(1).reduce(function (accumulator, word) {
								return accumulator.concat(" ").concat(word)
							})}/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="">Last Name</label>
							<input type="text" value={user.displayName.split(" ").slice(0,1)}/>
						</div>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="">Email Address</label>
						<input className="w-[100%]" type="text" />
					</div>
					<div className="flex flex-col">
						<label htmlFor="">Title</label>
						<input type="text" />
					</div>
					<div className="flex flex-col">
						<label htmlFor="">Bio</label>
						<input type="text" />
					</div>
					<div>
						<button className="bg-black text-white p-5 my-2 rounded-xl">Save</button>
					</div>
				</form>
			</div>
		</div>
	)
}

