"use client";

import RouteCardRow from "@/components/RouteCardRow";
import RouteCardCarouselRow from "@/components/RouteCardCarouselRow";
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
import { useGyms } from "@/hooks/useGyms";
import { Skeleton } from "@/components/ui/skeleton";

export default function Gym({ params }: { params: { id: string } }) {
  const { gyms, isLoading, isError } = useGyms();
  // if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading gyms</div>;

  var gym = null;
  if (!isLoading) {
    gym = gyms[params.id];
    if (!gym)
      return (
        <div className="flex items-center justify-center opacity-70 text-center h-5/6">
          <div>
            <h1 className="text-4xl font-semibold mb-2">404</h1>
            <p>Gym not found</p>
          </div>
        </div>
      );
  }

  return (
    <div>
      <div className="relative w-full h-64">
        <div className="absolute w-full h-full z-0">
          {gym && (
            <Image
              src={gym.url_custom_gym_header}
              alt=""
              layout="fill"
              className="object-cover object-center"
              priority
            />
          )}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-white to-75%"></div>
        </div>
        <div className="flex flex-row justify-between w-full absolute z-10 p-4 text-2xl text-black bottom-0 left-0 px-6">
          <div className="flex flex-row items-center">
            {gym && (
              <Image
                className="rounded-full mr-4"
                src={gym.logo_image_url}
                alt={params.id}
                width="100"
                height="100"
              />
            )}
            {isLoading && <Skeleton className="h-[100px] w-[100px] rounded-full mr-4" />}
            {gym && <h1 className="mr-1">{gym.gym_name}</h1>}
            {isLoading && <Skeleton className="h-6 w-32" />}
            <Toggle aria-label="Toggle favourite">
              <StarIcon className="h-4 w-4 opacity-75" />
            </Toggle>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Link
              href={
                gym
                  ? `https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lng}`
                  : "#"
              }
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
              <PopoverContent className="w-200">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Indoor Map</h4>
                    {gym && (
                      <Image
                        src={gym.indoor_map_url}
                        width={600}
                        height={400}
                        alt={`Map of ${gym.gym_name}`}
                      />
                    )}
                    {isLoading && <Skeleton className="h-400 w-600" />}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="mt-8 pl-9">
        <h2 className="text-xl opacity-80 mb-4">Routes</h2>
        <RouteCardCarouselRow gymId={params.id} />
      </div>{" "}
    </div>
  );
}
