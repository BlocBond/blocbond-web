"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  CheckCircle2Icon,
  CropIcon,
  MapIcon,
  MountainIcon,
  SearchIcon,
} from "lucide-react"
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden bg-white md:block ">
        <div className="flex h-full flex-col bg-stone-400/10">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-teal-900">
            <Link href="/" className="flex items-center gap-2 text-white font-bold">
              {/* <MountainIcon className="h-6 w-6 fill-current" fill="" /> */}
              <Image src="/BlocBondLogo-transparent.png" alt="BlockBond Logo" width={50} height={50} />
              <span className="">BlocBond</span>
            </Link>
          </div>
          <div className="flex-1 border-r">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2 pt-4">
              <Link
                href="/dashboard"
              >
                <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} className="w-full justify-start">
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Explore
                </Button>
              </Link>
              <Link
                href="/dashboard/gyms"
              >
                <Button variant={pathname && pathname.startsWith("/dashboard/gyms") ? "secondary" : "ghost"} className="w-full justify-start">
                <MapIcon className="h-4 w-4 mr-2" />
                Find a Gym
                </Button>
              </Link>
              <Link
                href="/dashboard/completed-routes"
              >
                <Button variant={pathname && pathname.startsWith("/dashboard/completed-routes") ? "secondary" : "ghost"} className="w-full justify-start">
                <CheckCircle2Icon className="h-4 w-4 mr-2" />
                Completed Routes
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                  6
                </Badge>
                </Button>
              </Link>
              <Link
                href="/dashboard/upload"
              >
                <Button variant={pathname && pathname.startsWith("/dashboard/upload") ? "secondary" : "ghost"} className="w-full justify-start">
                <CropIcon className="h-4 w-4 mr-2" />
                Route Upload
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    );
}
