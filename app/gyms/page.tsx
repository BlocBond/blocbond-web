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
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;


        // map position
        const position = {
          lat: 43.55212,
          lng: -80.22461
        }

        // map options
        const mapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 17,
          mapId: 'MAPID',
        }

        // setup map
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        const marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: 'Grotto',
          gmpClickable: true
        });
    }

    initMap();
  }, []);

  return (
    <div style={{height:'100vh'}} ref={mapRef}/>
  )
}
