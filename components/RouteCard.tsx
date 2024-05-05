"use client"

import Image from "next/image";
import Link from "next/link";

type Route = {
    id: number;
    name: string;
    imageUrl: string;
};

export default function RouteCard({ id, imageUrl, name }: Route) {
    return (
        <Link href={"/dashboard/routes/" + id}>
        <div className="flex flex-col items-center text-center border">
            <Image src="" width={300} height={100} alt={name} className="mb-4" />
            {name}
        </div> </Link>
    )
}