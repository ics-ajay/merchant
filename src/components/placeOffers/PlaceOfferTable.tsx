"use client";

import Switch from "../ui/Switch";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const dummyData = [
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
  {
    id: 1,
    place: "Delhi Mall",
    redeemCode: "SAVE50",
    description: "50% discount",
    createdBy: "Admin",
    updatedBy: "Admin",
    active: true,
  },
];

export default function PlaceOfferTable() {
  return (
    <div className="rounded-xl shadow-sm h-[500px] overflow-y-auto no-scrollbar">
      <table className="w-full table-fixed">
        <thead className="bg-gray-200 text-left sticky top-0 z-10 border border-slate-200">
          <tr>
            <th className="p-4 w-[16%]">Place</th>
            <th className="p-4 w-[16%]">Redeem Code</th>
            <th className="p-4 w-[20%]">Description</th>
            <th className="p-4 w-[12%]">Created By</th>
            <th className="p-4 w-[12%]">Updated By</th>
            <th className="p-4 w-[12%] text-center">Status</th>
            <th className="p-4 w-[12%] text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {dummyData.map((item, index) => (
            <tr
              key={index}
              className="border-b border-slate-200 hover:bg-gray-50"
            >
              <td className="p-4">{item.place}</td>
              <td className="p-4">{item.redeemCode}</td>
              <td className="p-4">{item.description}</td>
              <td className="p-4">{item.createdBy}</td>
              <td className="p-4">{item.updatedBy}</td>

              <td className="p-4 flex justify-center">
                <Switch defaultValue={item.active} />
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
