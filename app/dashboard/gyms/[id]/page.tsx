import RouteCardRow from "@/components/RouteCardRow";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Gym({ params }: { params: { id: string } }) {
  // Get gym data of gym with ID params.id from Flask server API (or directly from Firebase?)
  // Gym data: header image URL, name, list of routes, etc.

  return (
    <div>
      <div className="relative w-full h-56">
        <div className="absolute w-full h-full z-0">
          <Image
            src="https://static.wixstatic.com/media/98f2ba_035817ecd8ee4e14a57f48320aaa4531~mv2.jpg/v1/fill/w_2500,h_1666,al_c/98f2ba_035817ecd8ee4e14a57f48320aaa4531~mv2.jpg"
            alt=""
            layout="fill"
            className="object-cover object-center"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-white"></div>
        </div>
        <h1 className="absolute z-10 p-4 text-2xl text-black bottom-0 left-4">
          Gym {params.id}
        </h1>
      </div>
      <div className="mt-14 pl-9">
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
