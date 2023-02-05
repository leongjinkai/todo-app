import Link from "next/link"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "@/firebase"

export default function Nav() {
    
    const [user, loading] = useAuthState(auth)

    return (
        <nav className="fixed flex justify-between items-center w-[80vw] py-5 mx-auto">
            <Link href={"/"}>Logo</Link>
            <ul>
                {!user && (
                <Link href={"/auth/login"}>
                    <p className="bg-[#c60f7b] p-3 rounded-xl font-mono font-bold text-white">Join Now</p>
                </Link>
                )}
                {user && (
                <div className="flex items-center gap-5">
                    {user && (
                        <button className="bg-[#c60f7b] p-3 rounded-xl font-mono font-bold text-white" onClick={() => {
                            auth.signOut()
                        }}>Sign out</button>
                    )}
                    <h2>{user.displayName}</h2>
                    <Link href={"/mainapp"}>
                        <img className="rounded-full w-12" src={user.photoURL} alt="avatar" referrerPolicy="no-referrer" />
                    </Link>
                </div>
                
                )}
            </ul>
        </nav>
    )
}