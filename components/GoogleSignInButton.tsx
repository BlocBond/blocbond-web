import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter} from "next/navigation";

export default function GoogleSignInButton() {
    const router = useRouter();

    const handleSignIn = async () => {
        await signIn('google');
        router.push('/dashboard');
    };

    return (
        <button onClick={handleSignIn} className="flex flex-row justify-center items-center w-full rounded-lg pl-3">
            <Image src="/google-logo.png" alt="Google Logo" height={30} width={30} />
            <span className="bg-blue-500 text-white px-4 py-3">
                Sign in with Google
            </span>
        </button>
    )
}