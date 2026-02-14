"use client";

import { useActionState, useEffect, useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { days } from "@/src/utils/appConstants";
import { IoClose } from "react-icons/io5";
import { createPlace, CreatePlaceState } from "@/src/actions/hotspots";
import LocationAutocomplete from "./LocationAutocomplete";
import { api } from "@/src/lib/api";
import {
  GetUsersResponse,
  LocationStateType,
  PlaceDrawerProps,
  PlaceHotspot,
} from "@/src/types/places";

export default function PlaceDrawer({
  open,
  onClose,
  placeCategories,
  foodCategories,
  neighbourhoods,
  priceRange,
  vibeTypes,
}: PlaceDrawerProps) {
  if (!open) return null;
  const initialState: CreatePlaceState = {
    success: false,
  };
  const [state, formAction, isPending] = useActionState(
    createPlace,
    initialState,
  );
  const [placeDetails, setPlaceDetails] = useState(
    state.values?.placeDetails ?? "",
  );
  const fetchUsers = async (query: string, callback: any) => {
    try {
      if (!query) return callback([]);

      const res = await api.get<GetUsersResponse>(`/user/all?name=${query}`);
      const users = res?.result?.data || [];

      const formattedUsers = users.map((user) => ({
        id: String(user.user_id),
        display: user.user_firstName,
      }));

      callback(formattedUsers);
    } catch (err) {
      console.error("User fetch failed:", err);
      callback([]);
    }
  };

  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});
  const [hours, setHours] = useState<
    Record<string, { open: string; close: string }>
  >({});
  const [location, setLocation] = useState<LocationStateType>(null);

  const toggleDay = (day: string) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const openingHoursData = days.map((day) => ({
    day,
    enabled: !!openDays[day],
    open: hours[day]?.open || "",
    close: hours[day]?.close || "",
  }));

  useEffect(() => {
    const getPlace = async () => {
      const place = await api.get<PlaceHotspot>(
        "/hotspot/36?hotspotType=place",
        {
          cache: "no-cache",
        },
      );
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>place", place);
    };
    getPlace();
  });

  return (
    <div className={`fixed inset-0 z-50`}>
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
          <form
            action={formAction}
            className="space-y-5"
            key={JSON.stringify(state.values)}
          >
            {/* Select Neighborhood */}
            <div>
              <label className="block mb-2 font-medium">
                Select Neighborhood
              </label>
              <select
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
                name="neighborhood"
                defaultValue={state.values?.neighborhood ?? ""}
              >
                <option>Select Neighborhood</option>
                {neighbourhoods?.map((neighbor) => (
                  <option key={neighbor.id} value={neighbor.id}>
                    {neighbor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Name */}

            <div>
              <label className="block mb-2 font-medium">
                Enter Location Name
              </label>

              <LocationAutocomplete onSelect={setLocation} />

              {/* hidden fields sent to server */}
              <input
                type="hidden"
                name="googleLocationName"
                value={location?.name || ""}
              />
              <input
                type="hidden"
                name="googlePlaceId"
                value={location?.placeId || ""}
              />
              <input
                type="hidden"
                name="googleLatitude"
                value={location?.latitude || ""}
              />
              <input
                type="hidden"
                name="googleLongitude"
                value={location?.longitude || ""}
              />
              <input
                type="hidden"
                name="googlePlaceAddress"
                value={location?.address || ""}
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block mb-2 font-medium">
                Select Price Range
              </label>
              <select
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
                name="priceRange"
                defaultValue={state.values?.priceRange ?? ""}
              >
                <option>Select Price Range</option>
                {priceRange?.map((price) => (
                  <option key={price.id}>{price.range}</option>
                ))}
              </select>
            </div>

            {/* Vibe Type */}
            <div>
              <label className="block mb-2 font-medium">Select Vibe Type</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
                name="vibeType"
                defaultValue={state.values?.vibeType ?? ""}
              >
                <option>Select Vibe Type</option>
                {vibeTypes?.map((vibe) => (
                  <option key={vibe.id}>{vibe.name}</option>
                ))}
              </select>
            </div>

            {/* Place Category */}
            <div>
              <label className="block mb-2 font-medium">Place Category</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
                name="placeCategory"
                defaultValue={state.values?.placeCategory ?? ""}
              >
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
              <select
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
                name="foodCategory"
                defaultValue={state.values?.foodCategory ?? ""}
              >
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

              <MentionsInput
                value={placeDetails || ""}
                onChange={(e, newValue) => setPlaceDetails(newValue)}
                placeholder="Enter place details and use @ to mention users..."
                style={{
                  control: { fontSize: 14 },
                  input: { padding: "12px" },
                  highlighter: { padding: "12px" },
                }}
              >
                <Mention
                  trigger="@"
                  data={fetchUsers}
                  markup="@\[__display__](__id__)" // ⭐ REQUIRED FIX
                  displayTransform={(id, display) => `@${display}`}
                  style={{ backgroundColor: "#dbeafe" }}
                />
              </MentionsInput>

              <input
                type="hidden"
                name="placeDetails"
                value={placeDetails || ""}
              />

              {state?.errors?.placeDetails && (
                <p className="text-red-500">{state.errors.placeDetails}</p>
              )}
            </div>

            {/* Upload Image */}
            <div>
              <label className="block mb-2 font-medium">
                Upload Place Image
              </label>
              <input
                type="file"
                className="w-full text-sm file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-gray-100 file:rounded"
                name="image"
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
                          value={hours[day]?.open || ""}
                          onChange={(e) =>
                            setHours((prev) => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                open: e.target.value,
                              },
                            }))
                          }
                          className="w-full border border-slate-200 rounded-lg px-3 py-2"
                        />

                        <input
                          type="time"
                          value={hours[day]?.close || ""}
                          onChange={(e) =>
                            setHours((prev) => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                close: e.target.value,
                              },
                            }))
                          }
                          className="w-full border border-slate-200 rounded-lg px-3 py-2"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <input
              type="hidden"
              name="placeOpeningHours"
              value={JSON.stringify(openingHoursData)}
            />
            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
