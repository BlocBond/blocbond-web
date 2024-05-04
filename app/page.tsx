"use client"

import GymCard from "@/components/GymCard"
import NoResults from "./noresults"
import GymRow from "@/components/GymCardRow"

export default function Dashboard() {

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-8">Gyms</h2>
      <GymRow gyms={[{name: "The Guelph Grotto", imageUrl: "https://via.placeholder.com/100"}, {name: "Guelph Gryphons Athletics Centre", imageUrl: "https://via.placeholder.com/100"}, {name: "The Guelph Grotto", imageUrl: "https://via.placeholder.com/100"}]} />
      <h2 className="text-2xl mt-20 mb-8">Routes</h2>
    </div>
    // <NoResults />
  )
}
