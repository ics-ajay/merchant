"use client";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";

const libraries: "places"[] = ["places"];

interface Props {
  onSelect: (place: {
    name: string;
    placeId: string;
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
}

export default function LocationAutocomplete({ onSelect }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries,
  });

  const ref = useRef<any>(null);

  if (!isLoaded) return <input disabled placeholder="Loading..." />;

  return (
    <Autocomplete
      onLoad={(autocomplete) => {
        ref.current = autocomplete;
        autocomplete.setFields([
          "place_id",
          "name",
          "formatted_address",
          "geometry",
        ]);
      }}
      onPlaceChanged={() => {
        if (!ref.current) return;

        const place = ref.current.getPlace();
        if (!place?.geometry) return;

        onSelect({
          name: place.name,
          placeId: place.place_id,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      }}
    >
      <input
        placeholder="Search for a place"
        className="w-full border border-slate-200 rounded-lg px-4 py-3"
      />
    </Autocomplete>
  );
}
