"use client";

import GymRow from "@/components/GymCardRow";
import RouteCardCarouselRow from "@/components/RouteCardCarouselRow";
import { Toaster } from "@/components/ui/sonner";
import { Route } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <div className="p-10">
        <h2 className="text-2xl mb-8">Gyms</h2>
        <GymRow
          gyms={[
            {
              id: 1,
              name: "The Guelph Grotto",
              logoImageUrl:
                "https://media.licdn.com/dms/image/D560BAQFAsLd-Ma8Akg/company-logo_200_200/0/1693245801216/the_guelph_grotto_logo?e=1723075200&v=beta&t=YafeF7TJL3rT0M3WDD4TXvyfLjVPM71pqGg_IzThdyQ",
            },
            {
              id: 2,
              name: "Guelph Gryphons Athletics Centre",
              logoImageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHgXWkzSNeT_KzVpQCU36ppnn3vuDcyx96yP0RUl-iw&s",
            },
            {
              id: 3,
              name: "Grand River Rocks",
              logoImageUrl:
                "https://grandriverrocks.com/wp-content/themes/grand-river-rocks/images/grand-river-rocks-logo.png",
            },
          ]}
        />

        <h2 className="text-2xl mt-20 mb-8">Routes</h2>
        <RouteCardCarouselRow gymId={"all"} />
      </div>
    </>
  );
}
