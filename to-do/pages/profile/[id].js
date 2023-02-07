import { auth } from "@/firebase"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAllUserNames, getUserData } from "../mainapp"

export default function ProfilePage( {userData}) {
    const route = useRouter()
	const [user] = useAuthState(auth)

	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log(`${user.displayName}'s profile is shown`)

		} else {
			useEffect(() => {
				route.push('/auth/login')
			})
			console.log(`redirected to login`)
		}
	  });	

	return (
		<div>
			<div>
				<h1>Profile Page</h1>
				<form action="">
					<label htmlFor="">First Name: {userData.id}</label>
					<input type="text" />
				</form>
			</div>
		</div>
	)
}

export async function getStaticPaths(
) {
	const userPaths = getAllUserNames();
	console.log(userPaths)
	return {
	  paths: userPaths,
	  fallback: false,
	};
}

export async function getStaticProps( {params} ) {
	const userData = getUserData(params.id);
	return {
		props: {
		  userData,
		},
	  }
}