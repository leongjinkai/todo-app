import { auth } from "@/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"

export default function ProfilePage() {
    const [user] = useAuthState(auth)

    const route = useRouter()

    useEffect(() => {

		if (!user) route.push("/auth/login")

		const q = query(collection(db, 'users'), where("userid", "==", user.uid))
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let todosArr = []
			querySnapshot.forEach((doc) => {
				todosArr.push({...doc.data(), id: doc.id})
			})
		})
		return () => unsubscribe
		}, [])

    return (
        <>
            <div>hello</div>
            <div>My user id is {user.uid}</div>
        </>
    )
}