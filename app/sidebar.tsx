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
        <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <MountainIcon className="h-6 w-6" />
              <span className="">Grotto</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Button variant="secondary" className="w-full justify-start bg-emerald-900 text-white">
                  <SearchIcon className="h-4 w-4" />
                  Explore
                </Button>
              </Link>
              <Link
                href="/gyms"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MapIcon className="h-4 w-4" />
                Find a Gym
              </Link>
              <Link
                href="/completed-routes"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CheckCircle2Icon className="h-4 w-4" />
                Completed Routes
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900">
                  6
                </Badge>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    );
}