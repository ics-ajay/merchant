"use client";

import { useState } from "react";
import { days } from "@/src/utils/appConstants";
import { IoClose } from "react-icons/io5";

interface Props {
  open: boolean;
  onClose: () => void;
  placeCategories: Option[];
  foodCategories: Option[];
  neighbourhoods: Option[];
  vibeTypes: Option[];
  priceRange: {
    id: number;
    range: string;
  }[];
}

interface Option {
  id: number;
  name: string;
}

export default function PlaceDrawer({
  open,
  onClose,
  placeCategories,
  foodCategories,
  neighbourhoods,
  priceRange,
  vibeTypes,
}: Props) {
  if (!open) return null;

  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});
  const toggleDay = (day: string) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-screen w-[30vw] min-w-[420px] bg-white shadow-xl flex flex-col animate-slideIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold">Add Place</h2>
          <button onClick={onClose}>
            <IoClose size={22} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="p-6 overflow-y-auto flex-1 no-scrollbar">
          <form className="space-y-5">
            {/* Select Neighborhood */}
            <div>
              <label className="block mb-2 font-medium">
                Select Neighborhood
              </label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-3">
                <option>Select Neighborhood</option>
                {neighbourhoods?.map((neighbor) => (
                  <option key={neighbor.id}>{neighbor.name}</option>
                ))}
              </select>
            </div>

            {/* Location Name */}
            <div>
              <label className="block mb-2 font-medium">
                Enter Location Name
              </label>
              <input
                type="text"
                placeholder="Search for a place"
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block mb-2 font-medium">
                Select Price Range
              </label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-3">
                <option>Select Price Range</option>
                {priceRange?.map((price) => (
                  <option key={price.id}>{price.range}</option>
                ))}
              </select>
            </div>

            {/* Vibe Type */}
            <div>
              <label className="block mb-2 font-medium">Select Vibe Type</label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-3">
                <option>Select Vibe Type</option>
                {vibeTypes?.map((vibe) => (
                  <option key={vibe.id}>{vibe.name}</option>
                ))}
              </select>
            </div>

            {/* Place Category */}
            <div>
              <label className="block mb-2 font-medium">Place Category</label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-3">
                <option value="">Select Place Category</option>
                {placeCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Food Category */}
            <div>
              <label className="block mb-2 font-medium">Food Category</label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-3">
                <option value="">Select Food Category</option>
                {foodCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Place Details */}
            <div>
              <label className="block mb-2 font-medium">Place Details</label>
              <textarea
                placeholder="Enter place details"
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
              />
            </div>

            {/* Upload Image */}
            <div>
              <label className="block mb-2 font-medium">
                Upload Place Image
              </label>
              <input
                type="file"
                className="w-full text-sm file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-gray-100 file:rounded"
              />
            </div>

            {/* Opening Hours */}
            <div>
              <label className="block font-semibold mb-2">Opening Hours</label>
              {days.map((day) => {
                const isOpen = openDays[day];

                return (
                  <div key={day} className="p-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!isOpen}
                        onChange={() => toggleDay(day)}
                      />
                      Open on {day}
                    </label>

                    {isOpen && (
                      <div className="flex gap-3 mt-3">
                        <input
                          type="time"
                          className="w-full border border-slate-200 rounded-lg px-3 py-2"
                        />
                        <input
                          type="time"
                          className="w-full border border-slate-200 rounded-lg px-3 py-2"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Submit */}
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
