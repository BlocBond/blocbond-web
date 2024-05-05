import React from "react";
import { useRoutes } from "@/hooks/useRoutes";
import { Route } from "@/types/Route";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";

export default function RouteCardRow({ gymId }: any) {
  const { routes, isLoading, isError } = useRoutes(gymId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading gyms</div>;

  const routesArray = routes[gymId];
  console.log(routesArray);

  return (
    <div className="flex flex-row items-start gap-8">
      {routesArray.map((route) => {
        return (
          <Link id={`${gymId}-${route.id}`} href={`/dashboard/routes/${gymId}-${route.id}`}>
            <div className="flex flex-col items-left text-left border">
              <Image
                src={route.climb_image_url}
                width={300}
                height={100}
                alt={route.gym_name}
                className="mb-4"
              />
              <div className="mx-4 mb-4">
                <h3 className="text-lg font-semibold">{route.climb_name}</h3>
                <p>{route.gym_name}</p>
                <div className="flex flex-row gap-2 mt-2">
                  <Badge className="bg-teal-900/70">{route.v_rating}</Badge>
                  <Badge className="bg-teal-900/70">{route.climb_type}</Badge>
                  <Badge className="bg-teal-900/70">{route.hold_type}</Badge>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
