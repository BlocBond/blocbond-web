import React from "react";
import { useRoutes } from "@/hooks/useRoutes";
import { Route } from "@/types/Route";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function RouteCardCarouselRow({ gymId }: any) {
  const { routes, isLoading, isError } = useRoutes(gymId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading gyms</div>;

  const flattenedRoutes = Object.values(routes).flat();

  return (
    <div className="flex flex-row items-start gap-8">
      <Carousel className="w-full max-w-5xl">
        <CarouselContent>
          {flattenedRoutes.map((route, mapIndex) => {
            return (
              <CarouselItem key={mapIndex} className="basis-1/3 max-w-[300px]">
                <Link href={`/dashboard/routes/${route.gym_id}-${route.id}`}>
                  <div className="flex flex-col items-left text-left border">
                    <Image
                      src={route.climb_image_url}
                      width={300}
                      height={100}
                      alt={route.gym_name}
                      className="mb-4"
                    />
                    <div className="mx-4 mb-4">
                      <h3 className="text-lg font-semibold">
                        {route.climb_name}
                      </h3>
                      <p>{route.gym_name}</p>
                      <div className="flex flex-row gap-2 mt-2">
                        <Badge className="bg-teal-900/70">
                          {route.v_rating}
                        </Badge>
                        <Badge className="bg-teal-900/70">
                          {route.climb_type}
                        </Badge>
                        <Badge className="bg-teal-900/70">
                          {route.hold_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
