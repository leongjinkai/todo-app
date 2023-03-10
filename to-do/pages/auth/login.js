import { FcGoogle } from "react-icons/fc"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
    const [user] = useAuthState(auth)

    const route = useRouter()
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            route.push("/mainapp")
            console.log(result.user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col shadow-2xl rounded-xl p-10 gap-8 w-[80vw] bg-white">
            <h2 className="text-3xl font-bold">Join Today</h2>
            <div>
                <h3>Sign in with one of the providers</h3>
            </div>
            <div onClick={GoogleLogin} className="cursor-pointer flex gap-5 bg-slate-800 text-white rounded-lg p-5">
                <button>
                    <FcGoogle className="text-2xl"/>
                </button>
                <p>Sign in with Google</p>
            </div>
        </div>
    )
}