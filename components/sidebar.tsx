"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  CheckCircle2Icon,
  MapIcon,
  MountainIcon,
  SearchIcon,
} from "lucide-react"
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden bg-white md:block ">
        <div className="flex h-full max-h-screen flex-col bg-stone-400/10">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-secondary">
            <Link href="/" className="flex items-center gap-2 text-white font-bold">
              <MountainIcon className="h-6 w-6 fill-current" fill="" />
              <span className="">Grotto</span>
            </Link>
          </div>
          <div className="flex-1 border-r">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2 pt-4">
              <Link
                href="/"
              >
                <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Explore
                </Button>
              </Link>
              <Link
                href="dashboard/gyms"
              >
                <Button variant={pathname && pathname.startsWith("/gyms") ? "secondary" : "ghost"} className="w-full justify-start">
                <MapIcon className="h-4 w-4 mr-2" />
                Find a Gym
                </Button>
              </Link>
              <Link
                href="dashboard/completed-routes"
              >
                <Button variant={pathname && pathname.startsWith("/completed-routes") ? "secondary" : "ghost"} className="w-full justify-start">
                <CheckCircle2Icon className="h-4 w-4 mr-2" />
                Completed Routes
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900">
                  6
                </Badge>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    );
}