import RouteCardRow from "@/components/RouteCardRow";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { MapIcon, MilestoneIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Gym({ params }: { params: { id: string } }) {
  // Get gym data of gym with ID params.id from Flask server API (or directly from Firebase?)
  // Gym data: header image URL, name, list of routes, etc.

  return (
    <div>
      <div className="relative w-full h-64">
        <div className="absolute w-full h-full z-0">
          <Image
            src="https://static.wixstatic.com/media/98f2ba_035817ecd8ee4e14a57f48320aaa4531~mv2.jpg/v1/fill/w_2500,h_1666,al_c/98f2ba_035817ecd8ee4e14a57f48320aaa4531~mv2.jpg"
            alt=""
            layout="fill"
            className="object-cover object-center"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-white to-75%"></div>
        </div>
        <div className="flex flex-row justify-between w-full absolute z-10 p-4 text-2xl text-black bottom-0 left-0 px-6">
          <div className="flex flex-row items-center">
            <Image
              className="rounded-full mr-4"
              src="https://via.placeholder.com/100"
              alt={params.id}
              width="100"
              height="100"
            />
            <h1 className="mr-1">Gym {params.id}</h1>
            <Toggle aria-label="Toggle bold">
      <StarIcon className="h-4 w-4 opacity-75" />
    </Toggle>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Link
              href="https://www.google.com/maps/dir/?api=1&destination=43.55212,-80.22461"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <MilestoneIcon className="h-4 w-4 mr-2" />
                Driving Directions
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <MapIcon className="h-4 w-4 mr-2" />
                  Indoor Map
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Indoor Map</h4>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="mt-8 pl-9">
        <h2 className="text-xl opacity-80 mb-4">Routes</h2>
        <RouteCardRow
          routes={[
            {
              id: 1,
              name: "Route 1",
              imageUrl: "https://via.placeholder.com/100",
            },
            {
              id: 2,
              name: "Route 2",
              imageUrl: "https://via.placeholder.com/100",
            },
            {
              id: 3,
              name: "Route 3",
              imageUrl: "https://via.placeholder.com/100",
            },
          ]}
        />
      </div>{" "}
    </div>
  );
}
