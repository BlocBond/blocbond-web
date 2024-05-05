"use client"

import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Route = {
    id: number;
    name: string;
    imageUrl: string;
};

export default function RouteCard({ id, imageUrl, name }: Route) {
    return (
        <Link href={"/dashboard/routes/" + id}>
        <div className="flex flex-col items-left text-left border">
            <Image src="" width={300} height={100} alt={name} className="mb-4" />
            <div className="mx-4 mb-4">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p>{"{Gym Name}"}</p>
            <div className="flex flex-row gap-2 mt-2">
            <Badge className="bg-teal-900/70">{"{V-Rating}"}</Badge>
            <Badge className="bg-teal-900/70">{"{Type}"}</Badge>
            <Badge className="bg-teal-900/70">{"{Hold Type}"}</Badge></div>
            </div>
        </div> </Link>
    )
}