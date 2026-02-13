import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Switch from "../ui/Switch";
import { api } from "@/src/lib/api";
import { HotspotsResponse } from "@/src/types/places";
import { formatToDDMMYYYY } from "@/src/utils/date";

export default async function PlaceTable() {
  const hostspots = await api
    .get<HotspotsResponse>("/hotspot", {
      cache: "no-cache",
    })
    .catch((er) => {
      console.log(":::::::::::::::::::::::::er", er);
    });
  console.log(">>>>>>>>>>>>>>>>>>>hostspotshostspotshostspots>", hostspots);
  return (
    <div className="rounded-xl shadow-sm h-[500px] overflow-y-auto no-scrollbar">
      <table className="w-full table-fixed">
        {/* Header */}
        <thead className="bg-gray-200 text-left sticky top-0 z-10 border border-slate-200">
          <tr>
            <th className="p-4 w-[20%]">Place Name</th>
            <th className="p-4 w-[20%]">Neighborhood</th>
            <th className="p-4 w-[20%]">Deal</th>
            <th className="p-4 w-[15%]">Created</th>
            <th className="p-4 w-[15%]">Shared</th>
            <th className="p-4 w-[10%] text-center">Status</th>
            <th className="p-4 w-[15%] text-center">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {hostspots?.result?.data?.places.length === 0 ? (
            <tr>
              <td colSpan={6} className="h-[300px] text-center text-gray-500">
                <div className="flex items-center justify-center h-full">
                  No rows to show
                </div>
              </td>
            </tr>
          ) : (
            hostspots?.result?.data?.places.map((place) => (
              <tr
                key={place.id}
                className="border-b border-slate-200 hover:bg-gray-50"
              >
                <td className="p-4">{place.googleLocationName}</td>
                <td className="p-4">{place.neighborhood?.name}</td>
                <td className="p-4">
                  {place.isDeal ? "Available" : "Not available"}
                </td>
                <td className="p-4">{formatToDDMMYYYY(place.createdAt)}</td>
                <td className="p-4">{place.sharedCount}</td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <Switch isActive={place.isActive} id={String(place.id)} />
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FiEdit size={18} />
                    </button>

                    <button className="text-red-500 hover:text-red-700">
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
