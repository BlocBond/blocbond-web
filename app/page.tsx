"use client"

import GoogleSignInButton from "@/components/GoogleSignInButton"
import { useSession } from "next-auth/react"
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="w-screen">
            <div className="flex flex-col justify-center items-center">
                <Image src="/BlocBondLogo.png" alt="Team Logo" width={500} height={500} />
                <p className="text-xl font-medium">BlocBond allows climbers to keep track of all the climbing routes they complete from gyms all around the world</p>
                <Button className="mt-8 text-2xl" size={"lg"}>Get Started</Button>
            </div>
        </div>
    )
}