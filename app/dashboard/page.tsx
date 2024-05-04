"use client";

import GymCard from "@/components/GymCard";
import NoResults from "./noresults";
import GymRow from "@/components/GymCardRow";
import RouteCardRow from "@/components/RouteCardRow";

export default function Dashboard() {
  return (
    <div className="p-10">
      <h2 className="text-2xl mb-8">Gyms</h2>
      <GymRow
        gyms={[
          {
            id: 1,
            name: "The Guelph Grotto",
            logoImageUrl: "https://via.placeholder.com/100",
          },
          {
            id: 2,
            name: "Guelph Gryphons Athletics Centre",
            logoImageUrl: "https://via.placeholder.com/100",
          },
          {
            id: 1,
            name: "The Guelph Grotto",
            logoImageUrl: "https://via.placeholder.com/100",
          },
        ]}
      />
      <h2 className="text-2xl mt-20 mb-8">Routes</h2>
      <RouteCardRow
        routes={[
          {
            id: 1,
            name: "Route 1",
            imageUrl: "https://via.placeholder.com/300x100",
          },
          {
            id: 2,
            name: "Route 2",
            imageUrl: "https://via.placeholder.com/300x100",
          },
          {
            id: 3,
            name: "Route 3",
            imageUrl: "https://via.placeholder.com/300x100",
          },
        ]}
      />
    </div>
    // <NoResults />
  );
}
