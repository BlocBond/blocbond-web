"use client"

import Image from "next/image";

export interface GymProps {
    imageUrl: string;
    name: string;
}

export default function Gym({ imageUrl, name }: GymProps) {
    return (
        <div className="flex flex-col items-center max-w-[150px] text-center">
                <Image src={imageUrl} width={100} height={100} alt={name} className="rounded-full mb-4" />
            {name}
        </div>
    )
}