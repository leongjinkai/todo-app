import Link from "next/link"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "@/firebase"
import { useRouter } from "next/router"

export default function Nav() {
    
    const router = useRouter()

    const [user] = useAuthState(auth)

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
                <div className="flex items-center gap-3">
                    {user && (
                        <button className="bg-[#c60f7b] p-3 text-sm rounded-xl font-mono font-bold text-white hover:bg-pink-600" onClick={() => {
                            auth.signOut()
                            router.push("/auth/login")
                        }}>Sign out</button>
                    )}
                    <h2 className="text-sm hidden md:block">{user.displayName}</h2>
                    <div className="relative hover:block z-10 flex flex-col items-center">
                        <Link href={"/mainapp"} className="peer">
                            <img className="rounded-full w-12" src={user.photoURL} alt="avatar" referrerPolicy="no-referrer" />
                        </Link>
                        <div className="hidden absolute peer-hover:flex hover:flex flex-col justify-center gap-2 items-center h-[120px]">
                            <Link href={`./profile/${user.displayName.toLowerCase().replaceAll(" ", "")}`} className=" text-bold block text-white bg-[#c60f7b] text-sm rounded-full w-12 h-12 text-center pt-3">Profile</Link>
                            <a className="text-bold block text-white bg-[#c60f7b] text-sm rounded-full w-12 h-12 text-center leading-4 pt-2" href="#">Sign out</a>
                        </div>
                    </div>
                    
                </div>
                
                )}
            </ul>
        </nav>
    )
}