"use client"

import Image from "next/image";
import Link from "next/link";

export interface GymProps {
    id: number;
    imageUrl: string;
    name: string;
}

export default function Gym({ id, imageUrl, name }: GymProps) {
    return (
        <Link href={"/dashboard/gyms/" + id}>
        <div className="flex flex-col items-center max-w-[150px] text-center">
                <Image src={imageUrl} width={100} height={100} alt={name} className="rounded-full mb-4" />
            {name}
        </div> </Link>
    )
}