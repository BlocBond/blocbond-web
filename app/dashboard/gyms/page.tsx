"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";


export default function Map() {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version:"weekly",
        });

        const {Map} = await loader.importLibrary('maps');
        const { AdvancedMarkerElement  } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

        const boulderingGyms = [
          {
              position: { lat: 43.55212, lng: -80.22461 }, 
              title: "Grotto",
              id: '1',
          },
          {
              position: { lat: 43.53363, lng: -80.22412 }, 
              title: "Guelph Athletics Center",
              id: '2',
          },
          {
              position: { lat: 43.47542, lng: -80.52020 }, 
              title: "Grand River Rocks",
              id: '3',
          },
        ];

        const infoWindow = new InfoWindow();

        // map position
        // const position = {
        //   lat: 43.55212,
        //   lng: -80.22461
        // }

        // map options
        const mapOptions: google.maps.MapOptions = {
          center: boulderingGyms.filter(gym => gym.title === "Grotto")[0]?.position,
          zoom: 12,
          mapId: 'MAPID',
        }

        // setup map
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        boulderingGyms.forEach(({position, title}, i) => {
          const marker = new AdvancedMarkerElement({
              position,
              map,
              title: `${i + 1}. ${title}`,
          });
          // Add a click listener for each marker, and set up the info window.
          marker.addListener('click', () => {
              const content = `<div><a href="/dashboard/gyms/${i + 1}">${marker.title}</a></div>`;
              // console.log{marker.id);
              infoWindow.close();
              infoWindow.setContent(content);
              infoWindow.open(marker.map, marker);
          });
      });
    }

    initMap();
  }, []);

  return (
    <div style={{height:'100vh'}} ref={mapRef}/>
  )
}
