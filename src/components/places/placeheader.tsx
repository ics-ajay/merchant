"use client";
import { useState } from "react";
import PlaceDrawerData from "./placeDrawerData";

export default function PlaceHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const hanldeDrawerStatus = () => !openDrawer;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Places</h1>

        <button
          onClick={() => setOpenDrawer(true)}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Place
        </button>
      </div>
      {children}
      <PlaceDrawerData open={openDrawer} onClose={hanldeDrawerStatus} />
    </div>
  );
}
