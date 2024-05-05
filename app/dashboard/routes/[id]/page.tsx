"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRoutes } from "@/hooks/useRoutes";


export default function RouteDetails({ params }: { params: { id: string } }) {

    // User Rating selection state
    const [selectedValue, setSelectedValue] = useState(null);
  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };

  const [gymId, routeId] = params.id.split("-")

  const { routes, isLoading, isError } = useRoutes(gymId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading gyms</div>;
  console.log(routes);

  var route = null;
  if (!isLoading) {
    route = routes[gymId][Number(routeId) - 1];
    if (!route)
      return (
        <div className="flex items-center justify-center opacity-70 text-center h-5/6">
          <div>
            <h1 className="text-4xl font-semibold mb-2">404</h1>
            <p>Route not found</p>
          </div>
        </div>
      );
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-10">
        <div className="mb-6 col-span-7">
          <h1 className="text-2xl">{route?.climb_name}</h1>
          <p className="text-xl opacity-75 mb-2">{route?.gym_name}</p>
          <div className="flex flex-row gap-2 mb-4">
            <Badge className="bg-teal-900/70">{route?.v_rating}</Badge>
            <Badge className="bg-teal-900/70">{route?.climb_type}</Badge>
            <Badge className="bg-teal-900/70">{route?.hold_type}</Badge>
          </div>

          {/* <p className="text-lg">
            The holds for this route are{" "}
            <span className="text-semibold text-red-500">red</span>.
          </p> */}
          {route && 
          <Image
            src={route?.climb_image_url}
            width={600}
            height={400}
            alt={"{Route Name}"}
          />}
        </div>
        <div className="col-span-3 pl-12 border-l">
          <h3 className="text-xl mb-4">Completed this route?</h3>
          <p className="mb-2">
            Rate its difficulty to help other BlocBond users.
          </p>
          <div className="flex flex-row gap-2">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="User Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="V0">V0</SelectItem>
                <SelectItem value="V1">V1</SelectItem>
                <SelectItem value="V2">V2</SelectItem>
                <SelectItem value="V3">V3</SelectItem>
                <SelectItem value="V4">V4</SelectItem>
                <SelectItem value="V5">V5</SelectItem>
                <SelectItem value="V6">V6</SelectItem>
                <SelectItem value="V7">V7</SelectItem>
                <SelectItem value="V8">V8</SelectItem>
                <SelectItem value="V9">V9</SelectItem>
                <SelectItem value="V10">V10</SelectItem>
                <SelectItem value="V11">V11</SelectItem>
                <SelectItem value="V12">V12</SelectItem>
                <SelectItem value="V13">V13</SelectItem>
                <SelectItem value="V14">V14</SelectItem>
                <SelectItem value="V15">V15</SelectItem>
              </SelectContent>
            </Select>
            <Button disabled={!selectedValue} className="bg-green-700">
              <CheckIcon className="text-white"></CheckIcon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
