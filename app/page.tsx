"use client"

import GoogleSignInButton from "@/components/GoogleSignInButton"
import { useSession } from "next-auth/react"
import Image from "next/image";

export default function Login() {
    const { status, data: session } = useSession();
    
    if (status === "authenticated") {
        return (
            <div>
                {session?.user?.image && (<Image src={session.user.image} alt="Profile Picture" width={60} height={60} />)}
                <div>Name: <span>{session?.user?.name}</span></div>
                <div>Email: <span>{session?.user?.email}</span></div>
            </div>
        )
    } else {
        return (
            <div>
                <GoogleSignInButton />
            </div>
        )
    }
}